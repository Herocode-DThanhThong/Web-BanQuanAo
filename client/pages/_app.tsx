import type { AppProps } from "next/app";
import "../styles/globals.css";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

// import font from materials ui
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useRouter } from "next/router";

// import css toast from react-toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SWRConfig } from "swr";
import axiosInstance from "@/utils/axiosInstance";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  return (
    <>
      <SWRConfig
        value={{
          fetcher: (url) => axiosInstance.get(url),
          shouldRetryOnError: false,
        }}
      >
        <ToastContainer />
        {!pathname.includes("admin") ? <Header /> : null}
        <Component {...pageProps} />
        {!pathname.includes("admin") ? <Footer /> : null}
      </SWRConfig>
    </>
  );
}
