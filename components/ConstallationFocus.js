import { useState,useEffect } from "react";

export default function ConstellationFocus({ setFocus }) {

  const [constellations, setConstellations] = useState([]);
     // Chargement des constellations une seule fois au montage
     useEffect(() => {
      fetch("/constellations.json")
        .then((res) => res.json())
        .then((data) => {
          setConstellations(data);
        })
        .catch((error) => console.error("Erreur de chargement des constellations :", error));
    }, []);


    return (
      <div style={{padding:10,display:'flex',flexDirection:'column',alignItems:'flex-start',gap:5, position: "absolute", top: 20, left: 20 ,color:'white',backgroundColor:'rgba(255,255,255,0.2)',zIndex:5000 }}>

        {constellations.map((constellation,i) => <button key={i} onClick={() => setFocus(constellation.name)}>Voir {constellation.name}</button>)}
      </div>
    );
  }