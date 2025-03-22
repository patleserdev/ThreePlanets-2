import Navbar from "@/components/Navbar.js";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState,useEffect} from "react"

export default function App({ Component, pageProps }: AppProps) {

 
  return (
  <main>
    <Navbar/>
    <Component {...pageProps} />
  </main> 
  )
}

