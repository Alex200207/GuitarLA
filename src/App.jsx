import { useState } from "react"; // Asegúrate de importar useState
import { db } from "./data/db";
import Footer from "./components/Footer";
import Guitarra from "./components/Guitarra";
import Header from "./components/Header";

function App() {
  const [data] = useState(db);//Inicializa el estado data con el valor de la constante db que contiene la base de datos de guitarras

  return (
    <>
      <Header />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitarra) => (//Itera sobre el estado data y por cada objeto guitarra en la base de datos, renderiza un componente Guitarra
            <Guitarra 
              key={guitarra.id}  // Agrega una clave única aquí
              guitarra={guitarra} // Pasa el objeto guitarra como propiedad al componente Guitarra 
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
