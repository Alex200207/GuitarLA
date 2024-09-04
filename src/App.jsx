import { useState,useEffect } from "react"; // Asegúrate de importar useState
import { db } from "./data/db";
import Footer from "./components/Footer";
import Guitarra from "./components/Guitarra";
import Header from "./components/Header";

function App() {

const initialCart = () => {
  const localStorageCart = localStorage.getItem('cart')//Obtiene el valor del localStorage con la clave 'cart'
  return localStorageCart ? JSON.parse(localStorageCart) : []//Si el valor del localStorage es diferente de nulo, retorna el valor del localStorage como un objeto
}

  const [data] = useState(db);//Inicializa el estado data con el valor de la constante db que contiene la base de datos de guitarras
  const [cart,setCart] = useState(initialCart);//Inicializa el estado cart con un array vacío

  const MAX_ITEMS = 5;//Establece la cantidad máxima de guitarras que se pueden agregar al carrito
  const MIN_ITEMS = 1;//Establece la cantidad mínima de guitarras que se pueden agregar al carrito

  useEffect(()=>{//usamos useEffect para guardar el estado cart en el localStorage cada vez que cambie el estado cart
    localStorage.setItem('cart',JSON.stringify(cart))
    //guarda el estado cart en el localStorage como un string se pasa un nombre y el valor que se quiere guardar 
    //no se puede guardar un objeto directamente en el localStorage por eso se usa JSON.stringify para convertir el objeto en un string
    //Ni arreglos ni objetos se pueden guardar en el localStorage.
  },[cart])

  function addToCart(item){
    //Que siginifca la inmutabilidad en react
    //los states no se deben modificar directamente pues son inmutables
    const itemExiste = cart.findIndex(guitar => guitar.id === item.id)//Busca si el objeto guitarra ya existe en el estado cart
    //si un emento existe retornara un numero mayor a -1 si no existe retornara -1 
    //por eso se usa el operador de negacion para saber si el elemento no existe 
    //depues podemos usar una codicion para evitar duplicados y aumentar la cantidad de elementos

    if(itemExiste >= 0){
      if(cart[itemExiste].quantity >= MAX_ITEMS) return //Si la cantidad del objeto guitarra es mayor o igual a la cantidad máxima permitida, no hace nada
      const updatedCart = [...cart]//Crea una copia del estado cart para no modificarlo directamente es lo ideal
      updatedCart[itemExiste].quantity++//Aumenta la cantidad de la propiedad quantity del objeto guitarra en 1
      setCart(updatedCart)//Actualiza el estado cart con la copia actualizada
    }else{
      item.quantity = 1//Agrega una propiedad quantity al objeto guitarra y le asigna el valor de 1
      setCart([...cart,item])//Agrega el objeto guitarra al estado cart
    }
    
  }

  //funcion para eliminar un elemento del carrito
  function removeFromCart(id){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))//Actualiza el estado cart eliminando el objeto guitarra con 
    //el id que se pasa como argumento 
    /*Decimos que filtre las guitarras cuyo id sea diferente al id pasado porque diferente ?? pxq al precionar una y quitarla
    mantendremos las otras dos*/
  }


  //este es otro state derivado de cart
  //funcion para aumentar la cantidad de un elemento del carrito
  function increaseQuantity(id){//Recibe como argumento el id del objeto guitarra
    const updateCart = cart.map(item =>{//Crea un nuevo array con el estado cart actualizado 
      if(item.id === id && item.quantity < MAX_ITEMS ){//Si el id del objeto guitarra es igual al id pasado como argumento
        return{//Retorna el objeto guitarra con la cantidad aumentada en 1
          ...item//Copia el objeto guitarra
          ,quantity:item.quantity + 1//Aumenta la cantidad del objeto guitarra en 1
        }
      }
      return item//Retorna el objeto guitarra sin modificar
    })
    setCart(updateCart)//Actualiza el estado cart con el nuevo array
  }

  //creamos una funcion para decrementar la cantidad de un elemento del carrito
function decreaseQuantity(id){
  const updateCart = cart.map(item => {
    if(item.id === id && item.quantity > MIN_ITEMS){
      return{
        ...item,
        quantity:item.quantity - 1
      }
      
    }
    return item
  })
  setCart(updateCart)
}

function clearCart(){
  setCart([])
}





  return (
    <>
      <Header 
      cart={cart}
      removeFromCart={removeFromCart }
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      clearCart={clearCart}
      />

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
