
const GlowMaterial = {
  uniforms: {
    sunPosition: { value: [0, 0, 0] }, // Position du soleil
    glowColor: { value: [1.0, 0.5, 0.0] }, // Couleur du glow
    intensity: { value: 2.0 }, // Intensité du glow
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform vec3 sunPosition;
    uniform vec3 glowColor;
    uniform float intensity;

    void main() {
      vec3 lightDirection = normalize(sunPosition - vPosition); // Direction du Soleil
      float glow = dot(vNormal, lightDirection); // Calcule l'effet lumineux
      glow = clamp(pow(glow, intensity), 0.0, 1.0); // Adoucissement du glow

      gl_FragColor = vec4(glowColor * glow, glow);
    }
  `,
};

export default GlowMaterial