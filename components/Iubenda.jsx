import Script from "next/script";

const Iubenda = () => {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }
  return (
    <>
      <Script
        id="iubenda-config-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var _iub = _iub || [];
            _iub.csConfiguration = {
              "siteId": 3809601,
              "cookiePolicyId": 25468910,
              "lang": "it",
              "storage": { "useSiteId": true }
            };
          `,
        }}
      />
      <Script
        src="https://cs.iubenda.com/autoblocking/3809601.js"
        strategy="afterInteractive"
        async
      />
      <Script
        src="//cdn.iubenda.com/cs/gpp/stub.js"
        strategy="afterInteractive"
        async
      />
      <Script
        src="//cdn.iubenda.com/cs/iubenda_cs.js"
        strategy="afterInteractive"
        charset="UTF-8"
        async
      />
    </>
  );
};

export default Iubenda;
