export default function ConstellationFocus({ setFocus }) {
    return (
      <div style={{padding:10,display:'flex',flexDirection:'column',alignItems:'flex-start',gap:5, position: "absolute", top: 20, left: 20 ,color:'white',backgroundColor:'rgba(255,255,255,0.2',zIndex:5000 }}>
        <button onClick={() => setFocus("Orion")}>Voir Orion</button>
        <button onClick={() => setFocus("Grande Ourse")}>Voir Grande Ourse</button>
      </div>
    );
  }