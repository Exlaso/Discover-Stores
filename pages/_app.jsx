import StoreProvider from "@/store/store-context";
import "@/styles/globals.css";
import "@/dist/output.css";
import React from 'react';  



export default function App({ Component, pageProps }) { 

  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
 