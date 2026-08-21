export const metadata = {
  title: "Freelance Hourly Rate Calculator",

  description:
    "Calculate your ideal freelance hourly rate using your income goal, expenses, taxes, working schedule and realistic billable hours.",

  alternates: {
    canonical: "/freelance-hourly-rate-calculator/",
  },

  openGraph: {
    title: "Freelance Hourly Rate Calculator | SoloTools",
    description:
      "Estimate how much you should charge per hour as a freelancer.",
    url: "/freelance-hourly-rate-calculator/",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Freelance Hourly Rate Calculator",
  url: "https://solotools-1ou.pages.dev/freelance-hourly-rate-calculator/",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  description:
    "A free browser-based calculator for estimating a freelance hourly rate.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function CalculatorLayout({ children }) {
  return (
    <>
      {children}

      <section className="bg-white px-6 py-20 text-slate-900">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold">
            How to calculate a freelance hourly rate
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            Freelancers cannot usually bill every hour they work. Time spent
            finding clients, writing proposals, answering email, managing
            finances and improving skills still needs to be funded by the hours
            that are actually billable.
          </p>

          <p className="mt-4 leading-8 text-slate-600">
            A useful starting point is to estimate the total yearly revenue
            your business needs and divide that number by the billable hours
            you realistically expect to sell during the year.
          </p>

          <div className="mt-8 rounded-2xl bg-blue-50 p-6 text-blue-950">
            <p className="font-bold">Basic formula</p>
            <p className="mt-3 text-lg">
              Required yearly revenue ÷ yearly billable hours = minimum hourly rate
            </p>
          </div>

          <h2 className="mt-12 text-2xl font-bold">
            Why business expenses matter
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Your freelance revenue may need to pay for software, equipment,
            accounting, internet, marketing, insurance, payment processing and
            other operating costs before it becomes personal income.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            Why billable percentage matters
          </h2>

          <p className="mt-4 leading-8 text-slate-600">
            Someone working forty hours per week may only have twenty or
            twenty-five hours of client-billable work. Using all forty hours in
            a pricing calculation could produce a rate that is too low to
            support the business.
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            Frequently asked questions
          </h2>

          <div className="mt-6 space-y-6">
            <Faq
              question="Should my freelance rate equal an employee hourly wage?"
              answer="Usually not. A freelancer normally has additional business costs and unpaid non-billable time that an employee may not need to cover directly."
            />

            <Faq
              question="Should I include vacation time?"
              answer="Yes. If you do not earn client revenue while taking time off, including expected vacation or other non-working weeks can make your estimate more realistic."
            />

            <Faq
              question="Is the calculated rate the exact amount I must charge?"
              answer="No. The result is a planning estimate. Market demand, specialization, experience, client value and project risk can justify a different rate."
            />
          </div>

          <Related />
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

function Related() {
  return (
    <div className="mt-12 border-t border-slate-200 pt-10">
      <h2 className="text-2xl font-bold">Related resources</h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <a
          href="/billable-hours-for-freelancers/"
          className="rounded-xl border border-slate-200 p-5 font-semibold hover:border-blue-400"
        >
          What Are Billable Hours?
        </a>

        <a
          href="/how-much-should-i-charge-as-a-freelancer/"
          className="rounded-xl border border-slate-200 p-5 font-semibold hover:border-blue-400"
        >
          How Much Should I Charge?
        </a>

        <a
          href="/project-price-calculator/"
          className="rounded-xl border border-slate-200 p-5 font-semibold hover:border-blue-400"
        >
          Project Price Calculator
        </a>

        <a
          href="/freelance-income-calculator/"
          className="rounded-xl border border-slate-200 p-5 font-semibold hover:border-blue-400"
        >
          Freelance Income Calculator
        </a>
      </div>
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
