// ─── Échelle de référence ────────────────────────────────────────────────────
// Terre = 1 unité de référence → size: 0.1
// Toutes les tailles sont proportionnelles au rayon réel (km) divisé par 6371
// Multiplicateur global : 0.1 / 1.0 = 0.1
// Soleil : 696 340 km → ratio 109.3 → 10.93 (géré séparément dans <Sun size={10.9}>)
// ─────────────────────────────────────────────────────────────────────────────

const EARTH_RADIUS_KM = 6371;
const SCALE = 0.1; // Terre = 0.1 unité dans la scène

const r = (radiusKm) => parseFloat(((radiusKm / EARTH_RADIUS_KM) * SCALE).toFixed(4));

const planets = [
  {
    name: "Soleil",
    planetSize: "1 392 700",
    size: 1, // Géré dans <Sun size={10.9}> directement
    position: [11, 0, 0],
    color: "yellow",
    speed: 0.001,
    rotation: 5.88,
    inclination: 0.03,
    infos: [
      "Le Soleil n'est pas une planète, c'est une étoile très chaude 🌞",
      "Toutes les planètes du système solaire tournent autour du Soleil, mais pas à la même vitesse ✨",
      "Il est composé principalement d'hydrogène et d'hélium, et c'est la source principale d'énergie du système solaire.",
    ],
    texture: "/textures/2k_sun.jpg",
    hasRings: false,
    display: false,
    type: "étoile",
  },
  {
    name: "Mercure",
    planetSize: "4 879",
    size: r(2440),   // 0.0383 — la plus petite planète
    position: [13, 0, 0],
    color: "gray",
    speed: 0.024,
    rotation: 58.6,
    inclination: 0.03,
    infos: [
      "Mercure tourne très lentement sur elle-même : une journée dure environ 58,8 jours terrestres. 🌑",
      "C'est la plus petite planète du système solaire et la plus proche du Soleil. 🌑",
      "Elle connaît une très forte amplitude thermique (-180 °C à +430 °C) et ne possède pas d'atmosphère significative.",
      "Sa surface est parsemée de nombreux cratères.",
    ],
    texture: "/textures/2k_mercury.jpg",
    hasRings: false,
    display: true,
    orbitRadius: 13,
    sunDistanceKms: 57_900_000,
    sunDistanceUA: 0.39,
    temperature: 167,
    type: "tellurique",
  },
  {
    name: "Vénus",
    planetSize: "12 104",
    size: r(6051),   // 0.095 — presque la Terre
    position: [24, 0, 0],
    color: "yellow",
    speed: 0.0615,
    rotation: 243,
    inclination: 177.4, // Rotation rétrograde
    infos: [
      "Vénus a une rotation rétrograde (sens opposé aux autres planètes) et tourne très lentement : un jour vénusien dure plus longtemps qu'une année vénusienne ! 🌡️",
      "Son atmosphère dense, composée de CO₂ et d'acide sulfurique, provoque un effet de serre extrême. 🌡️",
    ],
    texture: "/textures/2k_venus_atmosphere.jpg",
    hasRings: false,
    display: true,
    orbitRadius: 24,
    sunDistanceKms: 108_200_000,
    sunDistanceUA: 0.72,
    temperature: 464,
    type: "tellurique",
  },
  {
    name: "Terre",
    planetSize: "12 742",
    size: r(6371),   // 0.1 — référence
    position: [33, 0, 0],
    color: "blue",
    speed: 0.1,
    rotation: 1,
    inclination: 23.44,
    infos: [
      "La Terre effectue une rotation complète en 24 heures, ce qui rythme le cycle jour-nuit. 🌍",
      "C'est la seule planète connue abritant une vie confirmée. 🌍",
      "Son atmosphère est riche en oxygène et azote, et sa surface est recouverte à 71 % d'eau.",
    ],
    texture: "/textures/2k_earth_daymap.jpg",
    hasRings: false,
    display: true,
    satellites: [
      {
        distance: 0.5,
        size: r(1737),  // 0.0273 — la Lune
        speed: 0.05,
        texture: "/textures/2k_moon.jpg",
      },
    ],
    orbitRadius: 33,
    sunDistanceKms: 149_600_000,
    sunDistanceUA: 1,
    temperature: 15,
    type: "tellurique",
  },
  {
    name: "Mars",
    planetSize: "6 779",
    size: r(3390),   // 0.0532 — moitié de la Terre
    position: [51, 0, 0],
    color: "red",
    speed: 0.053,
    rotation: 1.03,
    inclination: 25.19,
    infos: [
      "Un jour sur Mars dure environ 24h37, presque comme sur Terre ! 🚀",
      "Mars abrite le plus haut volcan du système solaire : l'Olympus Mons. 🚀",
      "Son atmosphère très fine est composée principalement de CO₂.",
      "Surnommée la 'planète rouge' en raison de l'oxyde de fer présent sur sa surface.",
      "On y observe des calottes polaires et d'anciens lits de rivières.",
    ],
    texture: "/textures/2k_mars.jpg",
    hasRings: false,
    display: true,
    orbitRadius: 51,
    sunDistanceKms: 227_900_000,
    sunDistanceUA: 1.52,
    temperature: -63,
    type: "tellurique",
  },
  {
    name: "Jupiter",
    planetSize: "139 820",
    size: r(69_911),  // 1.098 — géante, ~11× la Terre
    position: [173, 0, 0],
    color: "brown",
    speed: 0.0084,
    rotation: 0.41,
    inclination: 3.13,
    infos: [
      "Jupiter tourne extrêmement vite sur elle-même : un jour ne dure que 9h50 ! 🌪️",
      "C'est la plus grande planète du système solaire, avec une énorme tempête appelée la Grande Tache Rouge. 🌪️",
      "Elle est composée principalement d'hydrogène et d'hélium.",
      "Elle possède plus de 90 lunes, dont Ganymède — la plus grande lune du système solaire.",
    ],
    texture: "/textures/2k_jupiter.jpg",
    hasRings: false,
    display: true,
    orbitRadius: 173,
    sunDistanceKms: 778_500_000,
    sunDistanceUA: 5.2,
    temperature: -110,
    type: "gazeuse",
  },
  {
    name: "Saturne",
    planetSize: "116 460",
    size: r(58_232),  // 0.914 — ~9.5× la Terre
    position: [319, 0, 0],
    color: "goldenrod",
    speed: 0.0034,
    rotation: 0.44,
    inclination: 26.73,
    infos: [
      "Saturne a une rotation rapide : un jour dure environ 10h42. 💍",
      "Elle est célèbre pour ses magnifiques anneaux composés de glace et de roches. 💍",
      "Majoritairement composée d'hydrogène et d'hélium.",
      "Titan, sa plus grande lune, possède une atmosphère dense et des lacs de méthane.",
    ],
    texture: "/textures/2k_saturn.jpg",
    hasRings: true,
    display: true,
    orbitRadius: 319,
    sunDistanceKms: 1_433_500_000,
    sunDistanceUA: 9.58,
    temperature: -140,
    type: "gazeuse",
  },
  {
    name: "Uranus",
    planetSize: "50 724",
    size: r(25_362),  // 0.398 — ~4× la Terre
    position: [640, 0, 0],
    color: "lightblue",
    speed: 0.0012,
    rotation: 0.72,
    inclination: 97.77,
    infos: [
      "Uranus a une inclinaison extrême (97,8°) : elle 'roule' littéralement sur son orbite. Un jour dure environ 17h. 🌀",
      "Son atmosphère contient du méthane, lui donnant sa couleur bleu-vert caractéristique.",
      "C'est la planète la plus froide du système solaire (-224 °C).",
    ],
    texture: "/textures/2k_uranus.jpg",
    hasRings: true,
    display: true,
    orbitRadius: 640,
    sunDistanceKms: 2_872_500_000,
    sunDistanceUA: 19.18,
    temperature: -195,
    type: "gazeuse",
  },
  {
    name: "Neptune",
    planetSize: "49 244",
    size: r(24_622),  // 0.387 — ~3.9× la Terre
    position: [1000, 0, 0],
    color: "blue",
    speed: 0.0006,
    rotation: 0.67,
    inclination: 28.32,
    infos: [
      "Neptune possède des vents ultra-violents (jusqu'à 2 100 km/h) et un jour y dure environ 16h. 🌊",
      "C'est la planète la plus éloignée du Soleil. 🌊",
      "Elle abrite une Grande Tache Sombre, une gigantesque tempête.",
      "Triton, sa plus grande lune, orbite en sens inverse — signe qu'elle a été capturée.",
    ],
    texture: "/textures/2k_neptune.jpg",
    hasRings: true,
    display: true,
    orbitRadius: 1000,
    sunDistanceKms: 4_495_100_000,
    sunDistanceUA: 30.07,
    temperature: -200,
    type: "gazeuse",
  },
];

export default planets;