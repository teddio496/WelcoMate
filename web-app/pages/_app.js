import "@/styles/globals.css";
import { StrictMode } from "react";
import Layout from '../component/Layout';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
