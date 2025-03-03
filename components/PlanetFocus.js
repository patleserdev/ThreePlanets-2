import planets from "@/datas/planets.js"
export default function PlanetFocus({setFocus}){

    return (
        <div style={{padding:20,display:'flex',flexDirection:'column',alignItems:'flex-start',gap:5, position: "absolute", bottom: 20, left: 20 ,color:'white',backgroundColor:'rgba(255,255,255,0.2)',zIndex:10000,fontSize:'120%' }}>
            <h3>Cibler une planète :</h3>
            {planets.map((planet,i) => <button key={i} onClick={() => setFocus(planet.name)}> {planet.name}</button> )}

      </div>
    )
}