export const metadata = {
  title: "Project Price Calculator",

  description:
    "Calculate a profitable freelance project price using your hourly rate, estimated hours, expenses, contingency buffer and desired profit margin.",

  alternates: {
    canonical: "/project-price-calculator/",
  },

  openGraph: {
    title: "Project Price Calculator | SoloTools",
    description:
      "Use this free calculator to estimate how much you should charge for a freelance project.",
    url: "/project-price-calculator/",
  },
};

export default function ProjectPriceCalculatorLayout({ children }) {
  return children;
}
