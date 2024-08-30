import { useState } from "react"; // Asegúrate de importar useState
import { db } from "./data/db";
import Footer from "./components/Footer";
import Guitarra from "./components/Guitarra";
import Header from "./components/Header";

function App() {
  const [data] = useState(db);//Inicializa el estado data con el valor de la constante db que contiene la base de datos de guitarras
  const [cart,setCart] = useState([]);//Inicializa el estado cart con un array vacío

  function addToCart(item){
    //Que siginifca la inmutabilidad en react
    //los states no se deben modificar directamente pues son inmutables
    const itemExiste = cart.findIndex(guitar => guitar.id === item.id)//Busca si el objeto guitarra ya existe en el estado cart
    //si un emento existe retornara un numero mayor a -1 si no existe retornara -1 
    //por eso se usa el operador de negacion para saber si el elemento no existe 
    //depues podemos usar una codicion para evitar duplicados y aumentar la cantidad de elementos

    if(itemExiste >= 0){
      console.log("ya existe")
      const updatedCart = [...cart]//Crea una copia del estado cart para no modificarlo directamente es lo ideal
      updatedCart[itemExiste].quantity++//Aumenta la cantidad de la propiedad quantity del objeto guitarra en 1
      setCart(updatedCart)//Actualiza el estado cart con la copia actualizada
    }else{
      item.quantity = 1//Agrega una propiedad quantity al objeto guitarra y le asigna el valor de 1
      setCart([...cart,item])//Agrega el objeto guitarra al estado cart
    }
    
  }

  return (
    <>
      <Header 
      cart={cart}/>

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitarra) => (//Itera sobre el estado data y por cada objeto guitarra en la base de datos, renderiza un componente Guitarra
            <Guitarra 
              key={guitarra.id}  // Agrega una clave única aquí
              guitarra={guitarra}
              setCart ={setCart} // Pasa el objeto guitarra como propiedad al componente Guitarra 
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
