export function safeFileBase(name, fallback = "document") {
  return (
    name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]+/g, "-")
      .replace(/^-+|-+$/g, "") || fallback
  );
}

export function downloadPdf(bytes, filename) {
  const blob = new Blob([bytes], {
    type: "application/pdf",
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}

export function parsePages(
  value,
  maxPages,
  blankMeansAll = true
) {
  const text = value.trim();

  if (!text && blankMeansAll) {
    return Array.from(
      { length: maxPages },
      (_, index) => index
    );
  }

  if (!text) {
    throw new Error("Enter at least one page.");
  }

  const pages = [];

  for (const rawPart of text.split(",")) {
    const part = rawPart.trim();

    if (!part) {
      continue;
    }

    if (part.includes("-")) {
      const pieces = part
        .split("-")
        .map((item) => Number(item.trim()));

      if (
        pieces.length !== 2 ||
        !Number.isInteger(pieces[0]) ||
        !Number.isInteger(pieces[1])
      ) {
        throw new Error(
          "Use page selections like 1,3-5,8."
        );
      }

      const start = pieces[0];
      const end = pieces[1];

      if (
        start < 1 ||
        end < start ||
        end > maxPages
      ) {
        throw new Error(
          `Page ranges must stay between 1 and ${maxPages}.`
        );
      }

      for (
        let page = start;
        page <= end;
        page++
      ) {
        pages.push(page - 1);
      }

    } else {

      const page = Number(part);

      if (
        !Number.isInteger(page) ||
        page < 1 ||
        page > maxPages
      ) {
        throw new Error(
          `Page numbers must stay between 1 and ${maxPages}.`
        );
      }

      pages.push(page - 1);
    }
  }

  return [...new Set(pages)];
}
