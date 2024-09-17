import { useState, useEffect,useMemo} from 'react';//Importa las funciones useState y useEffect de la librería react
import { db } from '../data/db';

const useCart = () => {

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

      const isEmpty = useMemo(() => cart.length === 0, [cart]); //useMemo es un hook que se usa para memorizar un valor y solo se recalcula cuando las dependencias cambian
  //lo ocuparemos para que tenga un mejor rendimiento y no se recalcule en cada renderizado
  /*useMemo es una forma en la cual puedes decir no hagas render completo de mi aplicacion hasta que no cambie algo establecido
  entonces para eso es que es el arreglo de dependencias [cart] vuelve a renderizar hasta que carrito cambie le quitemos o 
  agregemos elementos */

  //state derivado para ver si el carrito esta vacio o no usando el state cart que se pasa como prop desde el componente padre
  //si el carrito esta vacio muestra un mensaje de que esta vacio si no muestra la tabla con los productos
  //porque es derivado ? porque se calcula a partir de otro estado que es el carrito y esta en el componente padre osea app.tsx

  //const carTotal = () => cart.reduce((total,item) => total + ( item.quantity * item.price ),0)

  //lo que se hace es recorrer el carrito y por cada producto se multiplica el precio por la cantidad y se suma al total
  //reduce recibe una funcion callback que se ejecuta por cada elemento del array y un valor inicial que en este caso es 0

  ///utlizamos useMemo para memorizar el valor de la funcion carTotal y solo se recalcule cuando cambie el carrito
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  const totalItems = useMemo(//state derivado para ver cuantos productos hay en el carrito
    () => cart.reduce((total, item) => total + item.quantity, 0),//se recorre el carrito y se suma la cantidad de cada producto
    [cart]//dependencia del useMemo
  );

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal,
        totalItems
    }

}

export default useCart;