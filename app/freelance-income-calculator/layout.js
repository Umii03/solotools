export const metadata = {
  title: "Freelance Income Calculator",

  description:
    "Estimate freelance yearly and monthly income using your hourly rate, billable hours, expenses and estimated taxes.",

  alternates: {
    canonical: "/freelance-income-calculator/",
  },

  openGraph: {
    title: "Freelance Income Calculator | SoloTools",
    description:
      "Estimate freelance revenue, expenses, taxes and take-home income.",
    url: "/freelance-income-calculator/",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Freelance Income Calculator",
  url: "https://solotools-1ou.pages.dev/freelance-income-calculator/",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  description:
    "A free calculator for estimating freelance income and take-home earnings.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function FreelanceIncomeCalculatorLayout({ children }) {
  return (
    <>
      {children}

      <section className="bg-white px-6 py-20 text-slate-900">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold">
            Understanding freelance income
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Gross freelance revenue is not the same as personal take-home
            income. Business expenses and taxes can reduce the amount that is
            ultimately available for personal spending or saving.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            Billable hours affect revenue
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Your income estimate depends heavily on the number of hours you can
            actually bill to clients. A high hourly rate may still produce
            modest yearly revenue if billable workload is inconsistent.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            Expenses reduce business profit
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Software subscriptions, equipment, contractors, marketing,
            professional services and other business expenses should be
            considered when estimating how much income remains.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            Frequently asked questions
          </h2>

          <div className="mt-6 space-y-6">
            <Faq
              question="Is gross revenue the same as take-home income?"
              answer="No. Gross revenue is the total client revenue before business expenses and estimated taxes are deducted."
            />

            <Faq
              question="Why does the calculator use working weeks?"
              answer="Freelancers may take vacation, holidays, sick days or other unpaid time away from client work. Working weeks make the estimate more realistic."
            />

            <Faq
              question="Are the tax estimates exact?"
              answer="No. Tax rules vary widely by country and personal circumstances. The tax input is intended only for simplified planning."
            />
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <a
              href="/freelance-hourly-rate-calculator/"
              className="rounded-xl border border-slate-200 p-5 font-semibold hover:border-blue-400"
            >
              Calculate Your Hourly Rate
            </a>

            <a
              href="/project-price-calculator/"
              className="rounded-xl border border-slate-200 p-5 font-semibold hover:border-blue-400"
            >
              Calculate a Project Price
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
