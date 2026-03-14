import { useEffect, useRef, useState } from "react";

export default function Minimap({ planets, positionsRef, focus }) {
  const canvasRef = useRef();
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // zoom avec la molette
    const handleWheel = (e) => {
      e.preventDefault(); // fonctionne maintenant car passive: false
      setZoom((z) => {
        const newZoom = z + (e.deltaY > 0 ? -0.1 : 0.1);
        return Math.max(0.1, Math.min(10, newZoom));
      });
    };

    canvas.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const baseScale = 0.05;
      const scale = baseScale * zoom;

      // soleil
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
      ctx.fill();

      planets.forEach((planet) => {
        const pos = positionsRef.current[planet.name];
        if (!pos) return;

        const x = centerX + pos.x * scale;
        const y = centerY + pos.z * scale;

        ctx.fillStyle = focus === planet.name ? "orange" : "white";

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    draw();
  }, [planets, focus, zoom]);

  return (
    <div
      style={{
        zIndex: 100,
        position: "absolute",
        top: '5rem',
        right: '1rem',
        width: 200,
        textAlign: "center",
        fontFamily: "monospace",
        color: "white",
      }}
    >
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        style={{
          background: "rgba(0,0,0,0.7)",
          border: "1px solid white",
          borderRadius: "8px",
          cursor: "zoom-in",
        }}
      />

      {/* planète hover */}
      <div
        style={{
          marginTop: 6,
          padding: "4px",
          background: "rgba(0,0,0,0.6)",
          borderRadius: "4px",
          fontSize: "12px",
        }}
      >
        {focus ? `🪐 ${focus}` : "—"}
      </div>
    </div>
  );
}