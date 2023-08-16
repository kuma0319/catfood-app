import Head from "next/head";

export default function CommonMeta({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url?: string;
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:image" content={`${process.env.SITE_IMAGE_URL}`} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}
