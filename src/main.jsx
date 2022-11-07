import { render } from "preact";
import { App } from "./app";

render(<App />, document.getElementById("app"));
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
