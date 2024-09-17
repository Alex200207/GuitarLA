import useCart from "./hooks/useCart";
import Footer from "./components/Footer";
import Guitarra from "./components/Guitarra";
import Header from "./components/Header";

function App() {
  const {
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
  } = useCart(); //Extrae las propiedades del estado data y cart y las funciones addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart del hook useCart

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
        totalItems={totalItems}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map(
            (
              guitarra //Itera sobre el estado data y por cada objeto guitarra en la base de datos, renderiza un componente Guitarra
            ) => (
              <Guitarra
                key={guitarra.id} // Agrega una clave única aquí
                guitarra={guitarra}
                addToCart={addToCart}
              />
            )
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
