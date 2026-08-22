export const categoryInfo = {
  calculator: {
    name: "Calculators",
    href: "/calculators/",
    description:
      "Everyday, finance, health-estimate, business, date, salary, and freelance calculators.",
  },
  image: {
    name: "Image Tools",
    href: "/image-tools/",
    description:
      "Convert, compress, resize, crop, rotate, flip, and adjust images.",
  },
  pdf: {
    name: "PDF Tools",
    href: "/pdf-tools/",
    description:
      "Convert, compress, organize, edit, inspect, and create PDF files.",
  },
  text: {
    name: "Text Tools",
    href: "/text-tools/",
    description:
      "Count, clean, sort, and transform text directly in your browser.",
  },
  developer: {
    name: "Developer Tools",
    href: "/developer-tools/",
    description:
      "Format, encode, decode, generate, convert, and validate development data.",
  },
};

export const toolCategories = [
  "calculator",
  "image",
  "pdf",
  "text",
  "developer",
];

function tool(
  category,
  title,
  href,
  description
) {
  return {
    category,
    title,
    href,
    description,
  };
}

export const toolRegistry = [
  tool(
    "calculator",
    "Salary to Hourly Calculator",
    "/salary-to-hourly-calculator/",
    "Convert salary to hourly pay or hourly rate to annual salary."
  ),
  tool(
    "calculator",
    "Percentage Calculator",
    "/percentage-calculator/",
    "Calculate percentages, ratios, increases, and decreases."
  ),
  tool(
    "calculator",
    "Discount Calculator",
    "/discount-calculator/",
    "Calculate discounts, savings, and final sale prices."
  ),
  tool(
    "calculator",
    "Profit Margin Calculator",
    "/profit-margin-calculator/",
    "Calculate profit, profit margin, and markup."
  ),
  tool(
    "calculator",
    "Loan Calculator",
    "/loan-calculator/",
    "Estimate monthly loan payments and total interest."
  ),
  tool(
    "calculator",
    "Age Calculator",
    "/age-calculator/",
    "Calculate age in years, months, days, and total days."
  ),
  tool(
    "calculator",
    "Date Difference Calculator",
    "/date-difference-calculator/",
    "Find the number of days, weeks, and hours between dates."
  ),
  tool(
    "calculator",
    "VAT Calculator",
    "/vat-calculator/",
    "Add VAT or extract VAT from a tax-inclusive amount."
  ),
  tool(
    "calculator",
    "Freelance Hourly Rate Calculator",
    "/freelance-hourly-rate-calculator/",
    "Estimate a sustainable freelance hourly rate."
  ),
  tool(
    "calculator",
    "Project Price Calculator",
    "/project-price-calculator/",
    "Estimate a profitable freelance project price."
  ),
  tool(
    "calculator",
    "Freelance Income Calculator",
    "/freelance-income-calculator/",
    "Estimate freelance revenue, expenses, tax, and take-home income."
  ),

  tool(
    "calculator",
    "BMI Calculator",
    "/bmi-calculator/",
    "Calculate body mass index using metric or US units."
  ),
  tool(
    "calculator",
    "BMR Calculator",
    "/bmr-calculator/",
    "Estimate basal metabolic rate using the Mifflin-St Jeor equation."
  ),
  tool(
    "calculator",
    "Calorie Calculator",
    "/calorie-calculator/",
    "Estimate daily maintenance calories from BMR and activity level."
  ),
  tool(
    "calculator",
    "Tip Calculator",
    "/tip-calculator/",
    "Calculate tip, total bill, and cost per person."
  ),
  tool(
    "calculator",
    "Compound Interest Calculator",
    "/compound-interest-calculator/",
    "Calculate compound growth and total interest."
  ),
  tool(
    "calculator",
    "Simple Interest Calculator",
    "/simple-interest-calculator/",
    "Calculate simple interest and final balance."
  ),
  tool(
    "calculator",
    "Mortgage Calculator",
    "/mortgage-calculator/",
    "Estimate mortgage principal and monthly principal-and-interest payment."
  ),
  tool(
    "calculator",
    "ROI Calculator",
    "/roi-calculator/",
    "Calculate investment profit and return on investment."
  ),
  tool(
    "calculator",
    "Break-even Calculator",
    "/break-even-calculator/",
    "Calculate break-even units and revenue."
  ),
  tool(
    "calculator",
    "Fuel Cost Calculator",
    "/fuel-cost-calculator/",
    "Estimate fuel usage and trip cost using metric or US units."
  ),

  tool(
    "image",
    "Image Converter",
    "/image-converter/",
    "Convert JPG, PNG, and WebP images."
  ),
  tool(
    "image",
    "JPG to PNG",
    "/jpg-to-png/",
    "Convert JPG images to PNG."
  ),
  tool(
    "image",
    "PNG to JPG",
    "/png-to-jpg/",
    "Convert PNG images to JPG."
  ),
  tool(
    "image",
    "JPG to WebP",
    "/jpg-to-webp/",
    "Convert JPG images to WebP."
  ),
  tool(
    "image",
    "PNG to WebP",
    "/png-to-webp/",
    "Convert PNG images to WebP."
  ),
  tool(
    "image",
    "WebP to JPG",
    "/webp-to-jpg/",
    "Convert WebP images to JPG."
  ),
  tool(
    "image",
    "WebP to PNG",
    "/webp-to-png/",
    "Convert WebP images to PNG."
  ),
  tool(
    "image",
    "Image Compressor",
    "/image-compressor/",
    "Compress JPG, PNG, and WebP images."
  ),
  tool(
    "image",
    "Image Resizer",
    "/image-resizer/",
    "Resize images while optionally preserving aspect ratio."
  ),
  tool(
    "image",
    "Image Cropper",
    "/image-cropper/",
    "Crop an image to custom coordinates and dimensions."
  ),
  tool(
    "image",
    "Rotate Image",
    "/rotate-image/",
    "Rotate an image by 90, 180, or 270 degrees."
  ),
  tool(
    "image",
    "Flip Image",
    "/flip-image/",
    "Flip an image horizontally or vertically."
  ),
  tool(
    "image",
    "Grayscale Image",
    "/grayscale-image/",
    "Convert an image to grayscale."
  ),
  tool(
    "image",
    "Image Brightness & Contrast",
    "/image-brightness-contrast/",
    "Adjust image brightness and contrast in your browser."
  ),

  tool(
    "pdf",
    "Merge PDF",
    "/merge-pdf/",
    "Combine multiple PDF files."
  ),
  tool(
    "pdf",
    "Split PDF",
    "/split-pdf/",
    "Split a PDF into two documents."
  ),
  tool(
    "pdf",
    "Extract PDF Pages",
    "/extract-pdf-pages/",
    "Create a new PDF from selected pages."
  ),
  tool(
    "pdf",
    "Remove PDF Pages",
    "/remove-pdf-pages/",
    "Delete selected pages from a PDF."
  ),
  tool(
    "pdf",
    "Organize PDF",
    "/organize-pdf/",
    "Reorder, rotate, and remove PDF pages visually."
  ),
  tool(
    "pdf",
    "Rotate PDF",
    "/rotate-pdf/",
    "Rotate all or selected PDF pages."
  ),
  tool(
    "pdf",
    "Reorder PDF Pages",
    "/reorder-pdf-pages/",
    "Change the sequence of PDF pages."
  ),
  tool(
    "pdf",
    "Compress PDF",
    "/compress-pdf/",
    "Reduce PDF size by rebuilding pages as optimized images."
  ),
  tool(
    "pdf",
    "Crop PDF",
    "/crop-pdf/",
    "Adjust the visible crop area of PDF pages."
  ),
  tool(
    "pdf",
    "Add Page Numbers",
    "/add-page-numbers/",
    "Add customizable page numbers to a PDF."
  ),
  tool(
    "pdf",
    "Watermark PDF",
    "/watermark-pdf/",
    "Add a text watermark to PDF pages."
  ),
  tool(
    "pdf",
    "Sign PDF",
    "/sign-pdf/",
    "Place a signature image on a PDF page."
  ),
  tool(
    "pdf",
    "PDF Metadata Editor",
    "/pdf-metadata-editor/",
    "Edit PDF title, author, subject, creator, and keywords."
  ),
  tool(
    "pdf",
    "PDF to JPG",
    "/pdf-to-jpg/",
    "Convert PDF pages to JPG images."
  ),
  tool(
    "pdf",
    "PDF to PNG",
    "/pdf-to-png/",
    "Convert PDF pages to PNG images."
  ),
  tool(
    "pdf",
    "Images to PDF",
    "/images-to-pdf/",
    "Convert multiple JPG and PNG images into one PDF."
  ),
  tool(
    "pdf",
    "JPG to PDF",
    "/jpg-to-pdf/",
    "Convert JPG images to PDF."
  ),
  tool(
    "pdf",
    "PNG to PDF",
    "/png-to-pdf/",
    "Convert PNG images to PDF."
  ),
  tool(
    "pdf",
    "PDF Page Counter & Info",
    "/pdf-page-counter/",
    "Check PDF page count and available metadata."
  ),

  tool(
    "text",
    "Word Counter",
    "/word-counter/",
    "Count words, characters, sentences, and paragraphs."
  ),
  tool(
    "text",
    "Character Counter",
    "/character-counter/",
    "Count characters with and without spaces."
  ),
  tool(
    "text",
    "Case Converter",
    "/case-converter/",
    "Convert text between common capitalization styles."
  ),
  tool(
    "text",
    "Slug Generator",
    "/slug-generator/",
    "Convert text into clean URL-friendly slugs."
  ),
  tool(
    "text",
    "Duplicate Line Remover",
    "/duplicate-line-remover/",
    "Remove duplicate lines while preserving their first occurrence."
  ),
  tool(
    "text",
    "Text Sorter",
    "/text-sorter/",
    "Sort lines alphabetically in ascending or descending order."
  ),

  tool(
    "developer",
    "JSON Formatter & Validator",
    "/json-formatter/",
    "Format, minify, and validate JSON."
  ),
  tool(
    "developer",
    "URL Encoder & Decoder",
    "/url-encoder-decoder/",
    "Encode or decode URL components."
  ),
  tool(
    "developer",
    "Base64 Encoder & Decoder",
    "/base64-encoder-decoder/",
    "Encode UTF-8 text to Base64 or decode it."
  ),
  tool(
    "developer",
    "UUID Generator",
    "/uuid-generator/",
    "Generate random UUID version 4 identifiers."
  ),
  tool(
    "developer",
    "QR Code Generator",
    "/qr-code-generator/",
    "Generate downloadable QR codes."
  ),
  tool(
    "developer",
    "Password Generator",
    "/password-generator/",
    "Generate secure random passwords with configurable character types."
  ),
  tool(
    "developer",
    "Random Number Generator",
    "/random-number-generator/",
    "Generate one or multiple secure random integers."
  ),
  tool(
    "developer",
    "SHA-256 Generator",
    "/sha256-generator/",
    "Generate a SHA-256 hash from text using Web Crypto."
  ),
  tool(
    "developer",
    "Unix Timestamp Converter",
    "/unix-timestamp-converter/",
    "Convert dates to Unix timestamps and timestamps back to dates."
  ),
  tool(
    "developer",
    "JSON to CSV Converter",
    "/json-to-csv/",
    "Convert arrays of JSON objects into CSV."
  ),
  tool(
    "developer",
    "CSV to JSON Converter",
    "/csv-to-json/",
    "Convert CSV data into formatted JSON."
  ),
  tool(
    "developer",
    "XML Formatter",
    "/xml-formatter/",
    "Validate and pretty-print XML."
  ),
  tool(
    "calculator",
    "Sales Tax Calculator",
    "/sales-tax-calculator/",
    "Calculate sales tax, tax amount, and final purchase price."
  ),
  tool(
    "calculator",
    "Commission Calculator",
    "/commission-calculator/",
    "Calculate sales commission and total earnings."
  ),
  tool(
    "calculator",
    "Savings Goal Calculator",
    "/savings-goal-calculator/",
    "Estimate the monthly saving needed to reach a financial goal."
  ),
  tool(
    "calculator",
    "Pay Raise Calculator",
    "/pay-raise-calculator/",
    "Calculate salary increase, new pay, and monthly increase."
  ),
  tool(
    "calculator",
    "Time Duration Calculator",
    "/time-duration-calculator/",
    "Calculate the duration between two clock times."
  ),
  tool(
    "calculator",
    "Speed Calculator",
    "/speed-calculator/",
    "Calculate average speed from distance and travel time."
  ),
  tool(
    "calculator",
    "Pace Calculator",
    "/pace-calculator/",
    "Calculate pace per kilometer or mile from distance and time."
  ),
  tool(
    "calculator",
    "Electricity Cost Calculator",
    "/electricity-cost-calculator/",
    "Estimate appliance electricity usage and operating cost."
  ),
  tool(
    "calculator",
    "Mean Median Mode Calculator",
    "/mean-median-mode-calculator/",
    "Calculate mean, median, mode, minimum, and maximum."
  ),
  tool(
    "calculator",
    "Ratio Calculator",
    "/ratio-calculator/",
    "Simplify integer ratios and calculate their decimal relationship."
  ),

  tool(
    "text",
    "Line Counter",
    "/line-counter/",
    "Count total, non-empty, and empty lines."
  ),
  tool(
    "text",
    "Sentence Counter",
    "/sentence-counter/",
    "Estimate the number of sentences in a block of text."
  ),
  tool(
    "text",
    "Paragraph Counter",
    "/paragraph-counter/",
    "Count paragraphs separated by blank lines."
  ),
  tool(
    "text",
    "Whitespace Remover",
    "/whitespace-remover/",
    "Clean repeated spaces, tabs, and unnecessary blank lines."
  ),
  tool(
    "text",
    "Text Reverser",
    "/text-reverser/",
    "Reverse characters in text."
  ),
  tool(
    "text",
    "Find and Replace",
    "/find-and-replace/",
    "Find literal text and replace every occurrence."
  ),
  tool(
    "text",
    "Word Frequency Counter",
    "/word-frequency-counter/",
    "Count how often each word appears."
  ),
  tool(
    "text",
    "Text Repeater",
    "/text-repeater/",
    "Repeat text multiple times with line separation."
  ),

  tool(
    "developer",
    "SHA-1 Generator",
    "/sha1-generator/",
    "Generate a SHA-1 digest from text using Web Crypto."
  ),
  tool(
    "developer",
    "SHA-512 Generator",
    "/sha512-generator/",
    "Generate a SHA-512 digest from text using Web Crypto."
  ),
  tool(
    "developer",
    "HTML Encoder & Decoder",
    "/html-encoder-decoder/",
    "Encode HTML special characters or decode HTML entities."
  ),
  tool(
    "developer",
    "JWT Decoder",
    "/jwt-decoder/",
    "Decode JWT header and payload data without verifying its signature."
  ),
  tool(
    "developer",
    "Query String Parser",
    "/query-string-parser/",
    "Convert a URL query string into formatted JSON."
  ),
  tool(
    "developer",
    "Hex Text Converter",
    "/hex-text-converter/",
    "Convert UTF-8 text to hexadecimal or hex back to text."
  ),
  tool(
    "developer",
    "Number Base Converter",
    "/number-base-converter/",
    "Convert integers between binary, octal, decimal, and hexadecimal."
  ),
  tool(
    "developer",
    "Regex Tester",
    "/regex-tester/",
    "Test JavaScript regular expressions against text."
  ),

  tool(
    "image",
    "Sepia Image",
    "/sepia-image/",
    "Apply a sepia effect to JPG, PNG, or WebP images."
  ),
  tool(
    "image",
    "Invert Image",
    "/invert-image/",
    "Invert image colors directly in your browser."
  ),
  tool(
    "image",
    "Blur Image",
    "/blur-image/",
    "Apply adjustable blur to JPG, PNG, or WebP images."
  ),

  tool(
    "pdf",
    "Reverse PDF Pages",
    "/reverse-pdf-pages/",
    "Reverse the order of every page in a PDF."
  ),
  tool(
    "pdf",
    "Duplicate PDF Pages",
    "/duplicate-pdf-pages/",
    "Duplicate a selected PDF page one or more times."
  ),
  tool(
    "pdf",
    "Insert Blank PDF Page",
    "/insert-blank-pdf-page/",
    "Insert a blank page at a selected position in a PDF."
  ),];

export function toolsByCategory(
  category
) {
  return toolRegistry.filter(
    (item) =>
      item.category === category
  );
}

export const toolPathTypeMap =
  Object.fromEntries(
    toolRegistry.map(
      (item) => [
        item.href,
        item.category,
      ]
    )
  );