import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const siteBase =
  "https://solotools-1ou.pages.dev";

const publicDirectory =
  path.join(root, "public");

const outDirectory =
  path.join(root, "out");

const sitemapPath =
  path.join(
    publicDirectory,
    "sitemap.xml"
  );

const robotsPath =
  path.join(
    publicDirectory,
    "robots.txt"
  );

const adsPath =
  path.join(
    publicDirectory,
    "ads.txt"
  );

const layoutPath =
  path.join(
    root,
    "app",
    "layout.js"
  );

const critical = [];
const warnings = [];

function normalizeUrl(value) {
  try {
    const url =
      new URL(value);

    let pathname =
      url.pathname;

    if (pathname !== "/") {
      pathname =
        pathname.replace(
          /\/+$/,
          ""
        ) + "/";
    }

    return `${url.origin}${pathname}`;
  } catch {
    return value;
  }
}

function getAttribute(
  tag,
  attribute
) {
  const expression =
    new RegExp(
      `${attribute}\\s*=\\s*["']([^"']*)["']`,
      "i"
    );

  const match =
    tag.match(expression);

  return match
    ? match[1]
    : "";
}

function extractDescription(html) {
  const tags =
    html.match(
      /<meta\b[^>]*>/gi
    ) || [];

  for (const tag of tags) {
    if (
      getAttribute(
        tag,
        "name"
      ).toLowerCase() ===
      "description"
    ) {
      return getAttribute(
        tag,
        "content"
      );
    }
  }

  return "";
}

function extractCanonical(html) {
  const tags =
    html.match(
      /<link\b[^>]*>/gi
    ) || [];

  for (const tag of tags) {
    if (
      getAttribute(
        tag,
        "rel"
      ).toLowerCase() ===
      "canonical"
    ) {
      return getAttribute(
        tag,
        "href"
      );
    }
  }

  return "";
}

function htmlPathForUrl(value) {
  const url =
    new URL(value);

  if (url.pathname === "/") {
    return path.join(
      outDirectory,
      "index.html"
    );
  }

  const clean =
    url.pathname.replace(
      /^\/|\/$/g,
      ""
    );

  return path.join(
    outDirectory,
    ...clean.split("/"),
    "index.html"
  );
}

if (
  !fs.existsSync(
    sitemapPath
  )
) {
  critical.push(
    "public/sitemap.xml is missing."
  );
}

let urls = [];

if (
  fs.existsSync(
    sitemapPath
  )
) {
  const sitemap =
    fs.readFileSync(
      sitemapPath,
      "utf8"
    );

  urls =
    [
      ...sitemap.matchAll(
        /<loc>(.*?)<\/loc>/g
      ),
    ].map(
      (match) =>
        match[1].trim()
    );

  if (
    urls.length === 0
  ) {
    critical.push(
      "Sitemap contains no URLs."
    );
  }

  const duplicates =
    urls.filter(
      (url, index) =>
        urls.indexOf(url) !==
        index
    );

  if (
    duplicates.length > 0
  ) {
    critical.push(
      `Duplicate sitemap URLs found: ${[
        ...new Set(
          duplicates
        ),
      ].join(", ")}`
    );
  }
}

const titles = new Map();

for (const url of urls) {

  const file =
    htmlPathForUrl(url);

  if (
    !fs.existsSync(file)
  ) {
    critical.push(
      `Missing exported HTML: ${url}`
    );

    continue;
  }

  const html =
    fs.readFileSync(
      file,
      "utf8"
    );

  const titleMatch =
    html.match(
      /<title>(.*?)<\/title>/i
    );

  const title =
    titleMatch
      ? titleMatch[1]
          .replace(
            /&amp;/g,
            "&"
          )
          .trim()
      : "";

  if (!title) {
    warnings.push(
      `Missing title: ${url}`
    );
  } else {

    if (
      !titles.has(title)
    ) {
      titles.set(
        title,
        []
      );
    }

    titles.get(title).push(
      url
    );
  }

  const description =
    extractDescription(html);

  if (!description) {
    warnings.push(
      `Missing meta description: ${url}`
    );
  }

  if (
    !/<h1\b/i.test(html)
  ) {
    warnings.push(
      `Missing H1: ${url}`
    );
  }

  const canonical =
    extractCanonical(html);

  if (!canonical) {

    warnings.push(
      `Missing canonical: ${url}`
    );

  } else if (
    normalizeUrl(
      canonical
    ) !==
    normalizeUrl(url)
  ) {

    warnings.push(
      `Canonical mismatch: ${url} -> ${canonical}`
    );
  }

  if (
    html.includes(
      "localhost:3000"
    )
  ) {
    critical.push(
      `localhost reference found: ${url}`
    );
  }
}

for (
  const [
    title,
    titleUrls,
  ] of titles
) {
  if (
    titleUrls.length > 1
  ) {
    warnings.push(
      `Duplicate title "${title}" on: ${titleUrls.join(", ")}`
    );
  }
}

const requiredUrls = [
  `${siteBase}/`,
  `${siteBase}/about/`,
  `${siteBase}/contact/`,
  `${siteBase}/privacy-policy/`,
  `${siteBase}/terms/`,
  `${siteBase}/tools/`,
  `${siteBase}/calculators/`,
  `${siteBase}/image-tools/`,
  `${siteBase}/pdf-tools/`,
  `${siteBase}/text-tools/`,
  `${siteBase}/developer-tools/`,
];

for (
  const requiredUrl of
  requiredUrls
) {
  if (
    !urls.includes(
      requiredUrl
    )
  ) {
    critical.push(
      `Required sitemap URL missing: ${requiredUrl}`
    );
  }
}

if (
  !fs.existsSync(
    robotsPath
  )
) {

  critical.push(
    "robots.txt is missing."
  );

} else {

  const robots =
    fs.readFileSync(
      robotsPath,
      "utf8"
    );

  if (
    !robots.includes(
      `${siteBase}/sitemap.xml`
    )
  ) {
    critical.push(
      "robots.txt does not reference the production sitemap."
    );
  }
}

if (
  !fs.existsSync(
    adsPath
  )
) {

  critical.push(
    "ads.txt is missing."
  );

} else {

  const ads =
    fs.readFileSync(
      adsPath,
      "utf8"
    );

  if (
    !ads.includes(
      "pub-3494912159540254"
    )
  ) {
    critical.push(
      "Expected AdSense publisher ID is missing from ads.txt."
    );
  }
}

if (
  !fs.existsSync(
    layoutPath
  )
) {

  critical.push(
    "app/layout.js is missing."
  );

} else {

  const layout =
    fs.readFileSync(
      layoutPath,
      "utf8"
    );

  if (
    !layout.includes(
      "ca-pub-3494912159540254"
    )
  ) {
    critical.push(
      "AdSense publisher ID is missing from app/layout.js."
    );
  }

  if (
    !layout.includes(
      "G-2JQK2RGBJJ"
    )
  ) {
    critical.push(
      "GA4 Measurement ID is missing from app/layout.js."
    );
  }

  if (
    !layout.includes(
      "AnalyticsEvents"
    )
  ) {
    critical.push(
      "AnalyticsEvents is missing from app/layout.js."
    );
  }
}

console.log("");
console.log(
  "=========================================="
);

console.log(
  "SOLOTOOLS SITE AUDIT"
);

console.log(
  "=========================================="
);

console.log(
  `Sitemap URLs checked: ${urls.length}`
);

console.log(
  `Critical issues: ${critical.length}`
);

console.log(
  `SEO warnings: ${warnings.length}`
);

if (
  warnings.length > 0
) {
  console.log("");
  console.log(
    "SEO warnings:"
  );

  warnings
    .slice(0, 25)
    .forEach(
      (warning) =>
        console.log(
          `- ${warning}`
        )
    );

  if (
    warnings.length > 25
  ) {
    console.log(
      `- ... plus ${
        warnings.length - 25
      } more warning(s)`
    );
  }
}

if (
  critical.length > 0
) {
  console.log("");
  console.log(
    "CRITICAL ISSUES:"
  );

  critical.forEach(
    (issue) =>
      console.log(
        `- ${issue}`
      )
  );

  console.log("");
  console.log(
    "AUDIT FAILED"
  );

  process.exit(1);
}

console.log("");
console.log(
  "AUDIT PASSED - no critical SEO, sitemap, analytics, or AdSense setup issues found."
);