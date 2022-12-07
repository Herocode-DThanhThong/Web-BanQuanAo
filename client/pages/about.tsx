import AboutPage from "@/components/About/Index";
import Head from "next/head";

export default function About() {
  return (
    <div>
      <Head>
        <title>About</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AboutPage />
      </main>
    </div>
  );
}
