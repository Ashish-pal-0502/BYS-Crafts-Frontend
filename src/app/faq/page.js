import SEO from "@/components/SEO/SEO";

export default function FAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What types of handicrafts do you sell?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer handmade products including home décor, pottery, textiles, jewelry, and more.",
        },
      },
      {
        "@type": "Question",
        name: "Do you ship internationally?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we offer both domestic and international shipping with varying charges and timelines.",
        },
      },
    ],
  };

  const faqs = [
    {
      q: "What types of handicrafts do you sell?",
      a: "We offer a variety of handmade products, including home décor, pottery, textiles, jewelry, wooden artifacts, and more – all crafted by skilled artisans.",
    },
    {
      q: "Are all products handmade?",
      a: "Yes, every item on our website is handcrafted by artisans, making each piece unique and slightly different from others.",
    },
    {
      q: "Do you ship internationally?",
      a: "Yes, we offer both domestic and international shipping. Shipping charges and delivery timelines vary based on the destination.",
    },
    {
      q: "How can I track my order?",
      a: "Once your order is shipped, you will receive an email with a tracking link to monitor the delivery status.",
    },
    {
      q: "What is your return policy?",
      a: "We accept returns for defective or damaged products within 7 days of delivery. Please read our Return Policy section for detailed terms.",
    },
    {
      q: "How can I contact customer support?",
      a: "You can reach us via email at support@bundelicrafts.com.",
    },
  ];

  return (
    <>
      <SEO
        title="FAQ - Bundeli Crafts"
        description="Find answers to frequently asked questions about Bundeli Crafts, including shipping, returns, and product details."
        keywords="handicrafts FAQ, Bundeli Crafts help, shipping, returns"
        schema={faqSchema}
      />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h1>
        <div className="space-y-6">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="p-5 bg-white rounded-xl shadow hover:shadow-md transition-shadow"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {item.q}
              </h2>
              <p className="text-gray-600">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
