import Head from "next/head";

interface ComponentProps {
  title: string;
}
const WebPageTitle = ({ title }: ComponentProps) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content="Seamless Services, Anytime, Anywhere." key="title" />
      </Head>
    </div>
  );
};
export default WebPageTitle;
