import Image from "next/image.js";
import styles from "../styles/navbar.module.css";
import Link from "next/link.js";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/map", label: "Carte du système" },
  { href: "/planets", label: "Les planètes" },
  { href: "/quizz", label: "Quizz" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // Ferme le menu mobile au changement de route
  useEffect(() => {
    setOpen(false);
  }, [router.pathname]);

  // Backdrop blur renforcé au scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Empêche le scroll quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        {/* Logo */}
        <div className={styles.logoWrapper}>
          <Image
            src="/pictures/logo.png"
            alt="logo"
            width={52}
            height={52}
            className={styles.logo}
          />
        </div>

        {/* Titre */}
        <div className={styles.title}>
          <span>Three-Planets 2</span>
        </div>

        {/* Liens desktop */}
        <ul className={styles.desktopNav}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href} className={router.pathname === href ? styles.active : ""}>
              <Link href={href}>
                <span className={styles.linkInner}>{label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Burger mobile */}
        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Overlay mobile */}
      <div
        className={`${styles.mobileOverlay} ${open ? styles.mobileOverlayOpen : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer mobile */}
      <div className={`${styles.mobileDrawer} ${open ? styles.mobileDrawerOpen : ""}`}>
        <ul>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href} className={router.pathname === href ? styles.active : ""}>
              <Link href={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}