const planets = [
  { 
    name: 'Soleil',
    planetSize:'1 392 700',
    size: 1,  
    position: [11, 0, 0],  // Position ajustée
    color: 'yellow', 
    speed: 0.001, 
    rotation: 5.88,  
    inclination: 0.03,  // Très faible inclinaison
    infos: ["Le soleil n'est pas une planète ,c'est une étoile très chaude 🌞","toute les planètes du système solaire tournent autour du soleil mais pas a la même vitesse ✨"] ,
    texture: '/textures/2k_sun.jpg', 
    hasRings: false,
    display:false,

  },
  { 
    name: 'Mercure',
    planetSize:'4879',  
    size: 0.035,  
    position: [13, 0, 0],  // Position ajustée
    color: 'gray', 
    speed: 0.024, 
    rotation: 5.88,  
    inclination: 0.03,  // Très faible inclinaison
    infos: ['Mercure tourne très lentement sur elle-même : une journée sur Mercure dure environ 58,8 jours terrestres. 🌑', 
    'Mercure est la plus petite planète du système solaire et la plus proche du Soleil. 🌑'], 
    texture: '/textures/2k_mercury.jpg', 
    hasRings: false,
    display:true,
    orbitRadius: 13, // Rayon de l'orbite
    sunDistanceKms:57900000,
    sunDistanceUA:0.39,
    temperature:167,
  },
  { 
    name: 'Vénus', 
    planetSize:'12104', 
    size: 0.087,  
    position: [24, 0, 0],  // Position ajustée
    color: 'yellow', 
    speed: 0.0615, 
    rotation: 24.3,  
    inclination: 0,  // Rotation rétrograde, inclinaison proche de 180°
    infos: ['Vénus a une rotation rétrograde et tourne extrêmement lentement : un jour vénusien dure plus longtemps qu’une année vénusienne ! 🌡️',
    , 'Vénus possède une atmosphère dense provoquant un effet de serre extrême. 🌡️'], 
    texture: '/textures/2k_venus_atmosphere.jpg', 
    hasRings: false,
    emitsLight: true,
    display:true,
    orbitRadius: 24, // Rayon de l'orbite,
    sunDistanceKms:108200000,
    sunDistanceUA:0.72,
    temperature:464,

  },
  { 
    name: 'Terre', 
    planetSize:'12742', 
    size: 0.091,  
    position: [33, 0, 0],  
    color: 'blue', 
    speed: 0.1, 
    rotation: 1,  
    inclination: 0,  // Inclinaison terrestre
    infos: [
      'La Terre effectue une rotation complète en 24 heures, ce qui rythme le cycle jour-nuit. 🌍',
      'La Terre est la seule planète connue à abriter la vie. 🌍'],
    texture: '/textures/2k_earth_daymap.jpg', 
    hasRings: false,
    display:true,
    satellites: [
      { distance: 0.5, size: 0.05, speed: 0.05, texture: "/textures/2k_moon.jpg" }
    ],
    orbitRadius: 33, // Rayon de l'orbite
    sunDistanceKms:149600000,
    sunDistanceUA:1,
    temperature:15,
  },
  { 
    name: 'Mars', 
    planetSize:'6779', 
    size: 0.049,  
    position: [51, 0, 0],  
    color: 'red', 
    speed: 0.053, 
    rotation: 1.03,  
    inclination: 25.19,  // Très proche de la Terre
    infos:
    ['Un jour sur Mars dure environ 24h37, presque comme sur Terre ! 🚀',
    'Mars est la planète rouge et abrite le plus haut volcan du système solaire. 🚀'] ,
    texture: '/textures/2k_mars.jpg', 
    hasRings: false,
    display:true,
    orbitRadius: 51, // Rayon de l'orbite
    sunDistanceKms:227900000,
    sunDistanceUA:1.52,
    temperature:-63,
  },
  { 
    name: 'Jupiter',
    planetSize:'139820',  
    size: 0.1,  
    position: [173, 0, 0],  
    color: 'brown', 
    speed: 0.0084, 
    rotation: 0.99,  
    inclination: 3.13,  // Très faible inclinaison
    infos: ['Jupiter tourne extrêmement vite sur elle-même : un jour ne dure que 9h50 ! 🌪️',
     'Jupiter est la plus grande planète et possède une énorme tempête appelée la Grande Tache Rouge. 🌪️'],
    texture: '/textures/2k_jupiter.jpg', 
    hasRings: false,
    display:true,
    orbitRadius: 173, // Rayon de l'orbite
    sunDistanceKms:778500000,
    sunDistanceUA:5.2,
    temperature:-110,
  },
  { 
    name: 'Saturne', 
    planetSize:'116460', 
    size: 0.083,  
    position: [319, 0, 0],  
    color: 'goldenrod', 
    speed: 0.0034, 
    rotation: 1.07,  
    inclination: 26.73,  // Assez incliné
    infos: [
    'Saturne a une rotation rapide : un jour dure environ 10h42. 💍',
     'Saturne est célèbre pour ses magnifiques anneaux faits de glace et de roche. 💍'],
    texture: '/textures/2k_saturn.jpg', 
    hasRings: true,
    display:true,
    orbitRadius: 319, // Rayon de l'orbite
    sunDistanceKms:1433500000,
    sunDistanceUA:9.58,
    temperature:-140,
  },
  { 
    name: 'Uranus', 
    planetSize:'50724', 
    size: 0.036,  
    position: [640, 0, 0],  
    color: 'lightblue', 
    speed: 0.0012, 
    rotation: 1.77,  
    inclination: 97.77,  // Presque couché sur son orbite
    infos: [
    'Uranus est inclinée sur le côté et tourne en 17h environ. 🌀',
    'Uranus tourne presque sur le côté avec une inclinaison de 98°. 🌀',
    "c'est la planete la plus froide"
  ],
    texture: '/textures/2k_uranus.jpg', 
    hasRings: true,
    display:true,
    orbitRadius: 640, // Rayon de l'orbite
    temperature:-224,
    sunDistanceKms:2872500000,
    sunDistanceUA:19.18,
    temperature:-195,
  },
  { 
    name: 'Neptune', 
    planetSize:'49244', 
    size: 0.035,  
    position: [1000, 0, 0],  
    color: 'blue', 
    speed: 0.0006,
    rotation: 1.63,  
    inclination: 28.32,  // Plus incliné que Jupiter
    infos: ['Neptune tourne rapidement avec des vents ultra-violents, un jour dure 16h environ. 🌊', 
     'Neptune est la planète la plus lointaine et possède des vents ultra-rapides. 🌊'],
    texture: '/textures/2k_neptune.jpg', 
    hasRings: true,
    display:true,
    orbitRadius: 1000, // Rayon de l'orbite
    temperature:-220,
    sunDistanceKms:4495100000,
    sunDistanceUA:30.07,
    temperature:-200,
  }
];

export default planets;
