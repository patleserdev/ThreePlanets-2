import Navbar from "@/components/Navbar.js";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState,useEffect} from "react"
import { Analytics } from "@vercel/analytics/react"
import footerStyles from "@/styles/footer.module.css";

import Footer from "@/components/Footer.js"

export default function App({ Component, pageProps }: AppProps) {

 
  return (
  <main>
    <Navbar/>
    <Component {...pageProps} />
    <Analytics />
    <Footer/>
  </main> 
  )
}

