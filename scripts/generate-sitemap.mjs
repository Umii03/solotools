import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const appDirectory = path.join(root, "app");
const publicDirectory = path.join(root, "public");

const siteBase =
  "https://solotools-1ou.pages.dev";

const pagePattern =
  /^page\.(js|jsx|ts|tsx)$/;

const routes = new Set();

function walk(directory, segments = []) {
  const entries = fs.readdirSync(
    directory,
    {
      withFileTypes: true,
    }
  );

  const hasPage = entries.some(
    (entry) =>
      entry.isFile() &&
      pagePattern.test(entry.name)
  );

  if (hasPage) {
    const publicSegments =
      segments.filter(
        (segment) =>
          !segment.startsWith("(") &&
          !segment.startsWith("@")
      );

    const invalid =
      publicSegments.some(
        (segment) =>
          segment.startsWith("[") ||
          segment.startsWith("_")
      );

    if (!invalid) {
      const route =
        publicSegments.length === 0
          ? "/"
          : `/${publicSegments.join("/")}/`;

      routes.add(route);
    }
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    if (
      entry.name === "components" ||
      entry.name.startsWith(".")
    ) {
      continue;
    }

    walk(
      path.join(
        directory,
        entry.name
      ),
      [
        ...segments,
        entry.name,
      ]
    );
  }
}

walk(appDirectory);

const sortedRoutes =
  [...routes].sort(
    (a, b) => {
      if (a === "/") return -1;
      if (b === "/") return 1;

      return a.localeCompare(b);
    }
  );

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const entries =
  sortedRoutes
    .map(
      (route) =>
        [
          "  <url>",
          `    <loc>${escapeXml(
            `${siteBase}${route}`
          )}</loc>`,
          "  </url>",
        ].join("\n")
    )
    .join("\n");

const xml =
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    "</urlset>",
    "",
  ].join("\n");

fs.mkdirSync(
  publicDirectory,
  {
    recursive: true,
  }
);

fs.writeFileSync(
  path.join(
    publicDirectory,
    "sitemap.xml"
  ),
  xml,
  "utf8"
);

console.log(
  `Sitemap generated: ${sortedRoutes.length} URLs`
);