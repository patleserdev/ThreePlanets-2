const planets = [
  { 
    name: 'Mercure', 
    size: 0.038,  
    position: [11, 0, 0],  // Position ajustée
    color: 'gray', 
    speed: 0.024, 
    rotation: 5.88,  
    inclination: 0.03,  // Très faible inclinaison
    infos: ['Mercure tourne très lentement sur elle-même : une journée sur Mercure dure environ 58,8 jours terrestres. 🌑', 
    'Mercure est la plus petite planète du système solaire et la plus proche du Soleil. 🌑'], 
    texture: '/textures/2k_mercury.jpg', 
    hasRings: false
  },
  { 
    name: 'Vénus', 
    size: 0.095,  
    position: [12.0, 0, 0],  // Position ajustée
    color: 'yellow', 
    speed: 0.0615, 
    rotation: 24.3,  
    inclination: 177.4,  // Rotation rétrograde, inclinaison proche de 180°
    infos: ['Vénus a une rotation rétrograde et tourne extrêmement lentement : un jour vénusien dure plus longtemps qu’une année vénusienne ! 🌡️',
    , 'Vénus possède une atmosphère dense provoquant un effet de serre extrême. 🌡️'], 
    texture: '/textures/2k_venus_atmosphere.jpg', 
    hasRings: false,
    emitsLight: true
  },
  { 
    name: 'Terre', 
    size: 0.1,  
    position: [14.96, 0, 0],  
    color: 'blue', 
    speed: 0.1, 
    rotation: 1,  
    inclination: 23.44,  // Inclinaison terrestre
    infos: [
      'La Terre effectue une rotation complète en 24 heures, ce qui rythme le cycle jour-nuit. 🌍',
      'La Terre est la seule planète connue à abriter la vie. 🌍'],
    texture: '/textures/2k_earth_daymap.jpg', 
    hasRings: false,
    satellites: [
      { distance: 0.5, size: 0.05, speed: 0.05, texture: "/textures/2k_moon.jpg" }
    ]
  },
  { 
    name: 'Mars', 
    size: 0.053,  
    position: [22.79, 0, 0],  
    color: 'red', 
    speed: 0.053, 
    rotation: 1.03,  
    inclination: 25.19,  // Très proche de la Terre
    infos:
    ['Un jour sur Mars dure environ 24h37, presque comme sur Terre ! 🚀',
    'Mars est la planète rouge et abrite le plus haut volcan du système solaire. 🚀'] ,
    texture: '/textures/2k_mars.jpg', 
    hasRings: false
  },
  { 
    name: 'Jupiter', 
    size: 1.12,  
    position: [77.85, 0, 0],  
    color: 'brown', 
    speed: 0.0084, 
    rotation: 0.99,  
    inclination: 3.13,  // Très faible inclinaison
    infos: ['Jupiter tourne extrêmement vite sur elle-même : un jour ne dure que 9h50 ! 🌪️',
     'Jupiter est la plus grande planète et possède une énorme tempête appelée la Grande Tache Rouge. 🌪️'],
    texture: '/textures/2k_jupiter.jpg', 
    hasRings: false
  },
  { 
    name: 'Saturne', 
    size: 0.945,  
    position: [143.4, 0, 0],  
    color: 'goldenrod', 
    speed: 0.0034, 
    rotation: 1.07,  
    inclination: 26.73,  // Assez incliné
    infos: [
    'Saturne a une rotation rapide : un jour dure environ 10h42. 💍',
     'Saturne est célèbre pour ses magnifiques anneaux faits de glace et de roche. 💍'],
    texture: '/textures/2k_saturn.jpg', 
    hasRings: true 
  },
  { 
    name: 'Uranus', 
    size: 0.401,  
    position: [287.1, 0, 0],  
    color: 'lightblue', 
    speed: 0.0012, 
    rotation: 1.77,  
    inclination: 97.77,  // Presque couché sur son orbite
    infos: ['Uranus est inclinée sur le côté et tourne en 17h environ. 🌀',
    'Uranus tourne presque sur le côté avec une inclinaison de 98°. 🌀'],
    texture: '/textures/2k_uranus.jpg', 
    hasRings: false
  },
  { 
    name: 'Neptune', 
    size: 0.388,  
    position: [449.5, 0, 0],  
    color: 'blue', 
    speed: 0.0006,
    rotation: 1.63,  
    inclination: 28.32,  // Plus incliné que Jupiter
    infos: ['Neptune tourne rapidement avec des vents ultra-violents, un jour dure 16h environ. 🌊', 
     'Neptune est la planète la plus lointaine et possède des vents ultra-rapides. 🌊'],
    texture: '/textures/2k_neptune.jpg', 
    hasRings: false
  }
];

export default planets;
