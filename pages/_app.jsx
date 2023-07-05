import StoreProvider from "@/store/store-context";
import "@/styles/globals.css";
import "@/dist/output.css";

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
 