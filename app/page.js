import ThemeToggle from "./components/ThemeToggle";

import {
  categoryInfo,
  toolCategories,
  toolRegistry,
} from "./lib/toolRegistry";

const toolCount =
  toolRegistry.length;

export const metadata = {
  title: {
    absolute:
      `SoloTools - ${toolCount}+ Free Online Tools & Calculators`,
  },

  description:
    `Use ${toolCount}+ free online tools including calculators, PDF tools, image utilities, unit converters, color tools, time tools, text tools, and developer tools. Fast, practical, and no signup required.`,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title:
      `SoloTools - ${toolCount}+ Free Online Tools`,
    description:
      "Free calculators, PDF tools, image utilities, unit converters, color tools, time tools, text tools, and developer tools in one clean browser-based toolkit.",
    url:
      "https://solotools-1ou.pages.dev/",
    type:
      "website",
  },
};

const categoryDesign = {
  calculator: {
    eyebrow:
      "Everyday & finance",
    icon:
      "calculator",
    gradient:
      "from-blue-500/20 via-blue-500/5 to-transparent",
    iconStyle:
      "bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300",
  },

  image: {
    eyebrow:
      "Photos & graphics",
    icon:
      "image",
    gradient:
      "from-violet-500/20 via-violet-500/5 to-transparent",
    iconStyle:
      "bg-violet-500/10 text-violet-600 dark:bg-violet-400/10 dark:text-violet-300",
  },

  pdf: {
    eyebrow:
      "Documents",
    icon:
      "pdf",
    gradient:
      "from-rose-500/20 via-rose-500/5 to-transparent",
    iconStyle:
      "bg-rose-500/10 text-rose-600 dark:bg-rose-400/10 dark:text-rose-300",
  },

  text: {
    eyebrow:
      "Writing",
    icon:
      "text",
    gradient:
      "from-emerald-500/20 via-emerald-500/5 to-transparent",
    iconStyle:
      "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300",
  },

  developer: {
    eyebrow:
      "Developer utilities",
    icon:
      "code",
    gradient:
      "from-cyan-500/20 via-cyan-500/5 to-transparent",
    iconStyle:
      "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-300",
  },
  unit: {
    eyebrow:
      "Measurements",
    icon:
      "calculator",
    gradient:
      "from-amber-500/20 via-amber-500/5 to-transparent",
    iconStyle:
      "bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300",
  },
  color: {
    eyebrow:
      "Design & accessibility",
    icon:
      "image",
    gradient:
      "from-fuchsia-500/20 via-fuchsia-500/5 to-transparent",
    iconStyle:
      "bg-fuchsia-500/10 text-fuchsia-700 dark:bg-fuchsia-400/10 dark:text-fuchsia-300",
  },
  time: {
    eyebrow:
      "Focus & dates",
    icon:
      "calculator",
    gradient:
      "from-orange-500/20 via-orange-500/5 to-transparent",
    iconStyle:
      "bg-orange-500/10 text-orange-700 dark:bg-orange-400/10 dark:text-orange-300",
  },
};

const featuredPaths = [
  "/percentage-calculator/",
  "/salary-to-hourly-calculator/",
  "/mortgage-calculator/",
  "/compound-interest-calculator/",
  "/compress-pdf/",
  "/merge-pdf/",
  "/image-converter/",
  "/image-compressor/",
  "/word-counter/",
  "/case-converter/",
  "/json-formatter/",
  "/password-generator/",
];

const featuredTools =
  featuredPaths
    .map(
      (path) =>
        toolRegistry.find(
          (tool) =>
            tool.href === path
        )
    )
    .filter(Boolean);

const guides = [
  {
    title:
      "How Much Should I Charge as a Freelancer?",
    description:
      "A practical framework for setting a sustainable freelance rate.",
    href:
      "/how-much-should-i-charge-as-a-freelancer/",
  },
  {
    title:
      "Hourly Rate vs Fixed Project Pricing",
    description:
      "Compare two common pricing models and when each one makes sense.",
    href:
      "/hourly-vs-fixed-project-pricing/",
  },
  {
    title:
      "How to Estimate a Freelance Project",
    description:
      "Break a project into time, costs, risk, and profit before quoting.",
    href:
      "/how-to-estimate-a-freelance-project/",
  },
];

function Icon({
  type,
  className =
    "h-6 w-6",
}) {
  if (
    type === "calculator"
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={className}
      >
        <rect
          x="4"
          y="2.75"
          width="16"
          height="18.5"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M7.5 7h9M8 11.5h.01M12 11.5h.01M16 11.5h.01M8 15.5h.01M12 15.5h.01M16 15.5h.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (
    type === "image"
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={className}
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="16"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <circle
          cx="8.5"
          cy="9"
          r="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <path
          d="m5.5 17 4-4 2.7 2.7 2.2-2.2 4.1 3.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (
    type === "pdf"
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={className}
      >
        <path
          d="M6 2.75h8l4 4V21.25H6V2.75Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />

        <path
          d="M14 2.75v4h4M8.5 16.5h7M8.5 13h7"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (
    type === "text"
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={className}
      >
        <path
          d="M5 5h14M9 5v14M15 5v14M6.5 19h5M12.5 19h5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (
    type === "code"
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={className}
      >
        <path
          d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M13.5 4l-3 16"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return null;
}

function Arrow() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  const categories =
    toolCategories.map(
      (category) => ({
        key:
          category,

        ...categoryInfo[
          category
        ],

        ...categoryDesign[
          category
        ],

        count:
          toolRegistry.filter(
            (tool) =>
              tool.category ===
              category
          ).length,
      })
    );

  const websiteSchema = {
    "@context":
      "https://schema.org",

    "@type":
      "WebSite",

    name:
      "SoloTools",

    url:
      "https://solotools-1ou.pages.dev/",

    description:
      `${toolCount}+ free online calculators and browser-based utilities.`,

    publisher: {
      "@type":
        "Organization",

      name:
        "SoloTools",
    },
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-950 transition-colors duration-300 dark:bg-[#070b14] dark:text-slate-50">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              websiteSchema
            ),
        }}
      />

      <div
        aria-hidden="true"
        className="home-grid pointer-events-none absolute inset-x-0 top-0 h-[760px]"
      />

      <div
        aria-hidden="true"
        className="home-orb-one pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl dark:bg-blue-500/20"
      />

      <div
        aria-hidden="true"
        className="home-orb-two pointer-events-none absolute -right-24 top-40 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl dark:bg-violet-500/20"
      />

      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-[#070b14]/75">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6">

          <a
            href="/"
            aria-label="SoloTools home"
            className="inline-flex items-center"
          >
            <img
              src="/solotools-logo.png"
              alt="SoloTools"
              className="h-9 w-auto dark:brightness-0 dark:invert sm:h-10"
            />
          </a>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300 lg:flex">

            <a
              href="/tools/"
              className="transition hover:text-blue-600 dark:hover:text-blue-300"
            >
              All Tools
            </a>

            <a
              href="/calculators/"
              className="transition hover:text-blue-600 dark:hover:text-blue-300"
            >
              Calculators
            </a>

            <a
              href="/pdf-tools/"
              className="transition hover:text-blue-600 dark:hover:text-blue-300"
            >
              PDF
            </a>

            <a
              href="/image-tools/"
              className="transition hover:text-blue-600 dark:hover:text-blue-300"
            >
              Images
            </a>

            <details className="group relative">
              <summary className="cursor-pointer list-none transition hover:text-blue-600 dark:hover:text-blue-300">
                More
              </summary>

              <div className="absolute right-0 top-9 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-white/10 dark:bg-slate-900">

                <a
                  href="/text-tools/"
                  className="block rounded-xl px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/5"
                >
                  Text Tools
                </a>

                <a
                  href="/developer-tools/"
                  className="block rounded-xl px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/5"
                >
                  Developer Tools
                </a>

                <a
                  href="/guides/"
                  className="block rounded-xl px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/5"
                >
                  Guides
                </a>

                <a
                  href="/about/"
                  className="block rounded-xl px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/5"
                >
                  About
                </a>
              </div>
            </details>
          </nav>

          <div className="flex items-center gap-2">

            <ThemeToggle />

            <details className="relative lg:hidden">
              <summary
                aria-label="Open navigation"
                className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </summary>

              <div className="absolute right-0 top-14 w-64 rounded-2xl border border-slate-200 bg-white p-2 text-sm font-semibold text-slate-700 shadow-2xl dark:border-white/10 dark:bg-slate-900 dark:text-slate-200">

                {[
                  [
                    "All Tools",
                    "/tools/",
                  ],
                  [
                    "Calculators",
                    "/calculators/",
                  ],
                  [
                    "PDF Tools",
                    "/pdf-tools/",
                  ],
                  [
                    "Image Tools",
                    "/image-tools/",
                  ],
                  [
                    "Text Tools",
                    "/text-tools/",
                  ],
                  [
                    "Developer Tools",
                    "/developer-tools/",
                  ],
                  [
                    "Guides",
                    "/guides/",
                  ],
                  [
                    "About",
                    "/about/",
                  ],
                ].map(
                  ([
                    label,
                    href,
                  ]) => (
                    <a
                      key={href}
                      href={href}
                      className="block rounded-xl px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/5"
                    >
                      {label}
                    </a>
                  )
                )}
              </div>
            </details>
          </div>
        </div>
      </header>

      {/* HERO */}

      <section className="relative z-10 px-5 pb-20 pt-20 sm:px-6 sm:pb-28 sm:pt-28">

        <div className="mx-auto max-w-5xl text-center">

          <div className="home-reveal inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-200">

            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>

            {toolCount}+ free tools.
            No signup.
          </div>

          <h1 className="home-reveal home-reveal-delay-1 mx-auto mt-7 max-w-5xl text-5xl font-bold tracking-[-0.045em] sm:text-6xl lg:text-7xl">

            One clean place for

            <span className="home-gradient-text block bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-violet-400 dark:to-cyan-300">
              everyday online tools.
            </span>
          </h1>

          <p className="home-reveal home-reveal-delay-2 mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl">

            Calculate, convert,
            compress, edit, format,
            and simplify everyday
            tasks with free
            calculators, PDF tools,
            image utilities, text
            tools, and developer
            tools.
          </p>

          <div className="home-reveal home-reveal-delay-3 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

            <a
              href="/tools/"
              className="inline-flex min-w-48 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Browse All Tools
              <Arrow />
            </a>

            <a
              href="#categories"
              className="inline-flex min-w-48 items-center justify-center rounded-2xl border border-slate-200 bg-white/70 px-6 py-3.5 font-bold text-slate-800 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-blue-300 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-blue-400/40"
            >
              Explore Categories
            </a>
          </div>
        </div>

        {/* STATS */}

        <div className="home-reveal home-reveal-delay-3 mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-3 lg:grid-cols-4">

          {[
            [
              `${toolCount}+`,
              "Working tools",
            ],
            [
              toolCategories.length,
              "Tool categories",
            ],
            [
              "Free",
              "No subscription",
            ],
            [
              "Fast",
              "Browser-first",
            ],
          ].map(
            ([
              value,
              label,
            ]) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200/80 bg-white/65 p-5 text-center shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.04]"
              >
                <p className="text-2xl font-bold">
                  {value}
                </p>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {label}
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* CATEGORIES */}

      <section
        id="categories"
        className="relative z-10 border-y border-slate-200/70 bg-slate-50/70 px-5 py-20 dark:border-white/10 dark:bg-white/[0.02] sm:px-6 sm:py-24"
      >
        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300">
              Tool categories
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Find the right tool fast
            </h2>

            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
              Every SoloTools utility
              is organized into a
              focused category so you
              can get straight to the
              task.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {categories.map(
              (category) => (
                <a
                  key={category.key}
                  href={category.href}
                  className={`home-card group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30`}
                >
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 transition group-hover:opacity-100`}
                  />

                  <div className="relative">

                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${category.iconStyle}`}>
                      <Icon
                        type={
                          category.icon
                        }
                      />
                    </div>

                    <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
                      {category.eyebrow}
                    </p>

                    <h3 className="mt-2 text-xl font-bold">
                      {category.name}
                    </h3>

                    <p className="mt-3 min-h-20 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {category.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between">

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                        {category.count} tools
                      </span>

                      <span className="text-blue-600 transition group-hover:translate-x-1 dark:text-blue-300">
                        <Arrow />
                      </span>
                    </div>
                  </div>
                </a>
              )
            )}
          </div>
        </div>
      </section>

      {/* FEATURED TOOLS */}

      <section className="relative z-10 px-5 py-20 sm:px-6 sm:py-24">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div className="max-w-2xl">

              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300">
                Popular tools
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Useful tools for everyday tasks
              </h2>
            </div>

            <a
              href="/tools/"
              className="inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-500 dark:text-blue-300"
            >
              View all {toolCount}
              <Arrow />
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {featuredTools.map(
              (tool) => {
                const info =
                  categoryInfo[
                    tool.category
                  ];

                return (
                  <a
                    key={tool.href}
                    href={tool.href}
                    className="home-card group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                  >
                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600 dark:text-blue-300">
                          {info.name}
                        </p>

                        <h3 className="mt-2 text-lg font-bold">
                          {tool.title}
                        </h3>
                      </div>

                      <span className="mt-1 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-300">
                        <Arrow />
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {tool.description}
                    </p>
                  </a>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* WHY */}

      <section className="relative z-10 px-5 pb-20 sm:px-6 sm:pb-24">

        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 text-white shadow-2xl shadow-slate-900/10 dark:border-white/10 lg:grid-cols-[1.1fr_1fr]">

          <div className="relative overflow-hidden p-8 sm:p-12 lg:p-14">

            <div
              aria-hidden="true"
              className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl"
            />

            <div className="relative">

              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-300">
                Built differently
              </p>

              <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
                Get the result without the clutter.
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-slate-300">
                SoloTools focuses on
                practical utilities,
                clear interfaces, fast
                results, and useful
                explanations instead
                of unnecessary signup
                flows.
              </p>

              <a
                href="/tools/"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-slate-950 transition hover:-translate-y-0.5"
              >
                Explore the toolkit
                <Arrow />
              </a>
            </div>
          </div>

          <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">

            {[
              [
                "No signup",
                "Open a tool and start working immediately.",
              ],
              [
                "Free access",
                "Core SoloTools utilities are available without a subscription.",
              ],
              [
                "Browser-first",
                "Many document and image operations run directly on your device.",
              ],
              [
                "Clear results",
                "Tools are designed around the answer you actually need.",
              ],
            ].map(
              ([
                title,
                description,
              ]) => (
                <div
                  key={title}
                  className="bg-slate-900/90 p-7"
                >
                  <div className="mb-4 h-2 w-2 rounded-full bg-blue-400" />

                  <h3 className="font-bold">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {description}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* GUIDES */}

      <section className="relative z-10 border-y border-slate-200/70 bg-slate-50/70 px-5 py-20 dark:border-white/10 dark:bg-white/[0.02] sm:px-6 sm:py-24">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300">
              Practical guides
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Learn the thinking behind the numbers
            </h2>

            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
              Helpful explanations for
              pricing, income planning,
              billable time, and
              freelance decisions.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">

            {guides.map(
              (guide) => (
                <a
                  key={guide.href}
                  href={guide.href}
                  className="home-card group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-400/30"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-300">
                    Guide
                  </p>

                  <h3 className="mt-3 text-xl font-bold">
                    {guide.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                    {guide.description}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 font-bold text-blue-600 dark:text-blue-300">
                    Read guide
                    <Arrow />
                  </span>
                </a>
              )
            )}
          </div>

          <a
            href="/guides/"
            className="mt-7 inline-flex items-center gap-2 font-bold text-blue-600 dark:text-blue-300"
          >
            Browse all guides
            <Arrow />
          </a>
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="relative z-10 px-5 py-20 sm:px-6 sm:py-28">

        <div className="mx-auto max-w-4xl text-center">

          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300">
            One toolkit
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {toolCount}+ tools.
            One simple place.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Browse the complete
            SoloTools directory and
            find the calculator,
            converter, document tool,
            or utility you need.
          </p>

          <a
            href="/tools/"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
          >
            View All {toolCount} Tools
            <Arrow />
          </a>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="relative z-10 border-t border-slate-200 bg-slate-950 text-slate-300 dark:border-white/10">

        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5">

          <div className="lg:col-span-2">

            <a
              href="/"
              aria-label="SoloTools home"
              className="inline-flex"
            >
              <img
                src="/solotools-logo.png"
                alt="SoloTools"
                className="h-9 w-auto brightness-0 invert"
              />
            </a>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Free calculators and
              practical browser-based
              tools for everyday work,
              documents, images, text,
              and development.
            </p>

            <p className="mt-5 text-sm font-semibold text-slate-500">
              {toolCount}+ tools.
              No signup required.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white">
              Tools
            </h3>

            <div className="mt-4 space-y-3 text-sm text-slate-400">

              <a
                href="/tools/"
                className="block hover:text-white"
              >
                All Tools
              </a>

              <a
                href="/calculators/"
                className="block hover:text-white"
              >
                Calculators
              </a>

              <a
                href="/pdf-tools/"
                className="block hover:text-white"
              >
                PDF Tools
              </a>

              <a
                href="/image-tools/"
                className="block hover:text-white"
              >
                Image Tools
              </a>

              <a
                href="/text-tools/"
                className="block hover:text-white"
              >
                Text Tools
              </a>

              <a
                href="/developer-tools/"
                className="block hover:text-white"
              >
                Developer Tools
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white">
              Popular
            </h3>

            <div className="mt-4 space-y-3 text-sm text-slate-400">

              <a
                href="/percentage-calculator/"
                className="block hover:text-white"
              >
                Percentage Calculator
              </a>

              <a
                href="/salary-to-hourly-calculator/"
                className="block hover:text-white"
              >
                Salary to Hourly
              </a>

              <a
                href="/compress-pdf/"
                className="block hover:text-white"
              >
                Compress PDF
              </a>

              <a
                href="/image-converter/"
                className="block hover:text-white"
              >
                Image Converter
              </a>

              <a
                href="/word-counter/"
                className="block hover:text-white"
              >
                Word Counter
              </a>

              <a
                href="/json-formatter/"
                className="block hover:text-white"
              >
                JSON Formatter
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white">
              SoloTools
            </h3>

            <div className="mt-4 space-y-3 text-sm text-slate-400">

              <a
                href="/guides/"
                className="block hover:text-white"
              >
                Guides
              </a>

              <a
                href="/about/"
                className="block hover:text-white"
              >
                About
              </a>

              <a
                href="/contact/"
                className="block hover:text-white"
              >
                Contact
              </a>

              <a
                href="/privacy-policy/"
                className="block hover:text-white"
              >
                Privacy Policy
              </a>

              <a
                href="/terms/"
                className="block hover:text-white"
              >
                Terms
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">

          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">

            <p>
              Copyright 2026 SoloTools.
            </p>

            <p>
              Free practical online tools.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}