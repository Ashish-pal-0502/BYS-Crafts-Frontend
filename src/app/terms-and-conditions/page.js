import SEO from "@/components/SEO/SEO";

export default function TermsAndConditions() {
  return (
    <>
      <SEO
        title="Terms & Conditions - Bundeli Crafts"
        description="Read the terms and conditions of using Bundeli Crafts' website, orders, returns, and legal guidelines."
        keywords="terms and conditions, Bundeli Crafts terms, ecommerce policy"
      />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-center mb-8">
          Terms & Conditions
        </h1>

        <div className="bg-white p-6 rounded-xl shadow space-y-6">
          <p>
            Welcome to <strong>Bundeli Crafts</strong>. By accessing or
            purchasing from our website, you agree to abide by the following
            Terms & Conditions.
          </p>

          {[
            {
              title: "Products",
              items: [
                "All products are handcrafted; slight variations in color, size, and design may occur.",
                "Product descriptions and images are for reference; actual items may differ slightly.",
              ],
            },
            {
              title: "Orders & Payments",
              items: [
                "Orders are confirmed only after full payment through our secure payment gateway.",
                "Prices are inclusive/exclusive of applicable taxes (as specified on product pages).",
              ],
            },
            {
              title: "Shipping & Delivery",
              items: [
                "Delivery timelines are estimates and may vary due to external factors.",
                "Any delays caused by courier companies or unforeseen events are beyond our control.",
              ],
            },
            {
              title: "Returns & Refunds",
              items: [
                "Returns are accepted only for defective or damaged items within 7 days of delivery.",
                "Refunds (if approved) will be processed to the original payment method.",
              ],
            },
          ].map((section, index) => (
            <section key={index}>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                {section.title}
              </h2>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                {section.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          ))}

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Limitation of Liability
            </h2>
            <p className="text-gray-600">
              We are not liable for any indirect, incidental, or consequential
              damages arising from the use of our website or products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Governing Law
            </h2>
            <p className="text-gray-600">
              These Terms & Conditions are governed by the laws of India.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
