export const metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-900">
      <div className="max-w-xl text-center">
        <a href="/" aria-label="SoloTools home" className="inline-flex items-center">
  <img
    src="/solotools-logo.png"
    alt="SoloTools"
    className="h-9 w-auto sm:h-10"
  />
</a>

        <p className="mt-10 text-sm font-bold tracking-widest text-blue-600">
          404 ERROR
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          This page could not be found
        </h1>

        <p className="mt-5 text-lg leading-8 text-slate-600">
          The page may have moved, the address may be incorrect, or the tool
          may no longer be available.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="/"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Back to SoloTools
          </a>

          <a
            href="/freelance-hourly-rate-calculator/"
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold hover:border-blue-400"
          >
            Open a Calculator
          </a>
        </div>
      </div>
    </main>
  );
}

