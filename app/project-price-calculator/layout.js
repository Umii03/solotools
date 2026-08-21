export const metadata = {
  title: "Project Price Calculator",

  description:
    "Calculate a freelance project price using your hourly rate, estimated hours, expenses, contingency buffer and desired profit margin.",

  alternates: {
    canonical: "/project-price-calculator/",
  },

  openGraph: {
    title: "Project Price Calculator | SoloTools",
    description:
      "Estimate a profitable freelance project quote using this free calculator.",
    url: "/project-price-calculator/",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Project Price Calculator",
  url: "https://solotools-1ou.pages.dev/project-price-calculator/",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  description:
    "A free calculator for estimating freelance project pricing.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function ProjectPriceCalculatorLayout({ children }) {
  return (
    <>
      {children}

      <section className="bg-white px-6 py-20 text-slate-900">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold">
            How to price a freelance project
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            A project quote should account for more than the hours you expect
            to spend producing the final work. Expenses, uncertainty, client
            communication, revisions and desired profit can all affect whether
            a project is financially worthwhile.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            Start with labor cost
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Estimate the number of hours required and multiply that figure by
            your target hourly rate. This creates a baseline value for the time
            involved in the project.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            Add direct project expenses
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Include costs that exist specifically because of the project, such
            as subcontractors, licensed assets, specialist software, travel or
            other purchased resources.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            Use a contingency buffer
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Even well-planned projects can take longer than expected. A
            contingency buffer creates room for reasonable uncertainty without
            immediately eliminating your planned profit.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            Frequently asked questions
          </h2>

          <div className="mt-6 space-y-6">
            <Faq
              question="What is a contingency buffer?"
              answer="It is an additional amount included to account for uncertainty such as unexpected revisions, additional coordination or underestimated work."
            />

            <Faq
              question="Why is profit different from my hourly labor cost?"
              answer="Your hourly labor value compensates you for your time. A profit margin provides additional return above the underlying project cost."
            />

            <Faq
              question="Should every freelance project use fixed pricing?"
              answer="No. Hourly billing can be more appropriate when the scope is uncertain or the client needs open-ended ongoing support."
            />
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <a
              href="/hourly-vs-fixed-project-pricing/"
              className="rounded-xl border border-slate-200 p-5 font-semibold hover:border-blue-400"
            >
              Hourly vs Fixed Pricing
            </a>

            <a
              href="/freelance-hourly-rate-calculator/"
              className="rounded-xl border border-slate-200 p-5 font-semibold hover:border-blue-400"
            >
              Hourly Rate Calculator
            </a>
          </div>
        </div>
      </section>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </>
  );
}

function Faq({ question, answer }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-6">
      <h3 className="font-bold">{question}</h3>
      <p className="mt-3 leading-7 text-slate-600">{answer}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 px-6 py-10 text-sm text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-5">
        <p>© 2026 SoloTools.</p>
        <div className="flex flex-wrap gap-5">
          <a href="/about/">About</a>
          <a href="/contact/">Contact</a>
          <a href="/privacy-policy/">Privacy</a>
          <a href="/terms/">Terms</a>
        </div>
      </div>
    </footer>
  );
}
