import SEO from "@/components/SEO/SEO";

export default function ShippingReturns() {
  return (
    <>
      <SEO
        title="Shipping & Returns - Bundeli Crafts"
        description="Learn about Bundeli Crafts shipping policies, delivery times, and how to return products easily."
        keywords="shipping, returns, Bundeli Crafts delivery, return policy"
      />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-center mb-8">Shipping & Returns</h1>

        <div className="bg-white p-6 rounded-xl shadow space-y-6">
          {/* SHIPPING POLICY */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Shipping Policy</h2>
            <p className="text-gray-600">
              We are dedicated to delivering your unique handmade crafts with care.
              Please review our shipping policy below.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-1">Processing Time</h3>
            <p className="text-gray-600">
              Orders are processed within 1-3 business days. You will receive a
              notification once your order has shipped.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-1">Shipping Rates & Delivery Estimates</h3>
            <p className="text-gray-600">
              Shipping charges for your order will be calculated and displayed at checkout.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>Standard Shipping: 5-7 business days</li>
              <li>Express Shipping: 2-3 business days</li>
            </ul>
            <p className="text-gray-500 mt-1">Delivery delays can occasionally occur.</p>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-1">Shipment Confirmation & Order Tracking</h3>
            <p className="text-gray-600">
              You will receive a shipment confirmation email once your order has
              shipped, containing your tracking number(s).
            </p>
          </section>

          {/* RETURN POLICY */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Return Policy</h2>
            <p className="text-gray-600">
              Your satisfaction is our priority. If you're not completely happy with
              your purchase, we're here to help.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-1">Eligibility</h3>
            <p className="text-gray-600">
              You have 30 calendar days to return an item from the date you received
              it. To be eligible, your item must be unused and in the same condition
              that you received it.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-1">How to Initiate a Return</h3>
            <p className="text-gray-600">
              To start a return, please contact our support team with your order
              number and reason for return. We will provide you with instructions on
              how to proceed.
            </p>
            <p className="text-gray-600 mt-2">
              Contact us at <strong>support@bundelicrafts.com</strong> to initiate a return.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-1">Refunds</h3>
            <p className="text-gray-600">
              Once we receive your item, we will inspect it and notify you. If your
              return is approved, we will initiate a refund to your original method
              of payment.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
