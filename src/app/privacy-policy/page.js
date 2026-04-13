import SEO from "@/components/SEO/SEO";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy - Bundeli Crafts"
        description="Read Bundeli Crafts privacy policy to learn how we collect, use, and safeguard your personal information."
        keywords="privacy policy, Bundeli Crafts privacy, data protection"
      />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>

        <div className="bg-white p-6 rounded-xl shadow space-y-6">
          <p>
            At <strong>Bundeli Crafts</strong>, we respect your privacy and are
            committed to protecting your personal information. This policy
            explains how we collect, use, and safeguard your data.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-1 text-gray-600">
              <li>
                Personal details such as name, email, and shipping address.
              </li>
              <li>
                Payment information for completing purchases (secured through
                encrypted payment gateways).
              </li>
              <li>
                Browsing data such as IP address and cookies for better user
                experience.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-1 text-gray-600">
              <li>To process and deliver your orders.</li>
              <li>
                To improve our products, services, and website experience.
              </li>
              <li>
                To send order updates, promotional offers, and newsletters (only
                with your consent).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Data Security
            </h2>
            <p className="text-gray-600">
              We implement strict security measures to protect your personal
              data. However, no transmission over the Internet is completely
              secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Sharing of Information
            </h2>
            <p className="text-gray-600">
              We do not sell or trade your personal information. It may only be
              shared with trusted service providers (e.g., shipping and payment
              partners) to fulfill your orders.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Your Rights
            </h2>
            <p className="text-gray-600">
              You can request to access, update, or delete your personal data by
              contacting us at <strong>support@bundelicrafts.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
