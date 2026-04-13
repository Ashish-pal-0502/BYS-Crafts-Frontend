import Head from "next/head";

const StructuredData = ({ data }) => {
  if (!data) return null;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data),
        }}
      />
    </Head>
  );
};

export default StructuredData;
