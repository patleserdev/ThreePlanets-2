import Navbar from "@/components/Navbar.js";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>ThreePlanets 2</title>
      </Head>
      
      <body className="antialiased">
              <Main />
        <NextScript />
      </body>
    </Html>
  );
}
