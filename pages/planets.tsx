"use client";
import styles from "@/styles/planets.module.css";
import planets from "@/datas/planets.js";
import PlanetViewer from "@/components/PlanetViewer.js";
import { useState } from "react";

interface PlanetInterface {
  name: string;
  size?: number;
  position?: number[];
  color?: string;
  speed?: number;
  rotation?: number;
  inclination?: number;
  infos?: string[];
  texture?: string;
  hasRings?: boolean;
  display?: boolean;
  orbitRadius?: number;
  emitsLight?: boolean;
  satellites?: { distance: number; size: number; speed: number; texture: string }[];
  temperature?: number;
  sunDistanceKms?: number;
  sunDistanceUA?: number;
  planetSize?: number;
}

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className={styles.statCard}>
    <span className={styles.statLabel}>{label}</span>
    <span className={styles.statValue}>{value}</span>
  </div>
);

const planetsPage = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetInterface | null>(null);
  const displayPlanets = planets.filter((p) => p.display);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.overlay}>
          <div className={styles.inner}>

            {/* ── Header ── */}
            <div className={styles.header}>
              <span className={styles.badge}>🪐 Système Solaire</span>
              <h1 className={styles.title}>
                Les <span className={styles.gradient}>Planètes</span>
              </h1>
              <p className={styles.subtitle}>
                Sélectionne une planète pour explorer ses données
              </p>
            </div>

            {/* ── Main layout ── */}
            <div className={styles.layout}>

              {/* Sidebar */}
              <nav className={styles.sidebar}>
                <ul className={styles.planetList}>
                  {displayPlanets.map((planet, key) => (
                    <li
                      key={key}
                      className={`${styles.planetItem} ${selectedPlanet?.name === planet.name ? styles.planetItemActive : ""}`}
                      onClick={() => setSelectedPlanet(planet as unknown as PlanetInterface)}
                    >
                      <span className={styles.planetName}>{planet.name}</span>
                      <span className={styles.planetArrow}>→</span>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Detail panel */}
              <div className={styles.detail}>
                {!selectedPlanet ? (
                  <div className={styles.emptyState}>
                    <div className={styles.emptyOrbit}>
                      <div className={styles.emptyOrbitRing} />
                      <div className={styles.emptyOrbitCore} />
                    </div>
                    <p className={styles.emptyText}>
                      Sélectionnez une planète pour découvrir ses secrets
                    </p>
                  </div>
                ) : (
                  <div className={styles.planetDetail}>
                    <div className={styles.detailTop}>

                      {/* Meta + stats */}
                      <div className={styles.detailMeta}>
                        <div>
                          <h2 className={styles.detailName}>{selectedPlanet.name}</h2>
                          {selectedPlanet.color && (
                            <span className={styles.detailTag}>{selectedPlanet.color}</span>
                          )}
                        </div>

                        <div className={styles.statsGrid}>
                          <StatCard label="Diamètre" value={selectedPlanet.planetSize ? `${selectedPlanet.planetSize.toLocaleString()} km` : "—"} />
                          <StatCard label="Distance Soleil" value={selectedPlanet.sunDistanceUA ? `${selectedPlanet.sunDistanceUA} UA` : "—"} />
                          <StatCard label="Température" value={selectedPlanet.temperature ? `${selectedPlanet.temperature}°C` : "—"} />
                          <StatCard label="Anneaux" value={selectedPlanet.hasRings ? "Oui" : "Non"} />
                        </div>

                        {selectedPlanet.infos && selectedPlanet.infos.length > 0 && (
                          <div className={styles.infoSection}>
                            {selectedPlanet.infos.map((info, i) => (
                              <p key={i} className={styles.infoText}>{info}</p>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* 3D viewer */}
                      <div className={styles.viewer3D}>
                        <PlanetViewer planet={selectedPlanet} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default planetsPage;