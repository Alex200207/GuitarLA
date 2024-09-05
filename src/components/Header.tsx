import { useMemo } from "react";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
function Header({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
}) {
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


  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="/img/carrito.png"
                alt="imagen carrito"
              />
          
              {totalItems > 0 && (
                <span className="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle">
                  {totalItems}
                </span>
              )}

              <div id="carrito" className="bg-white p-3">
                {isEmpty ? ( //si el carrito esta vacio muestra el mensaje de que esta vacio si no muestra la tabla con los productos
                  <p className="text-center">El carrito esta vacio</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((guitar) => (
                          <tr key={guitar.name}>
                            <td>
                              <img
                                className="img-fluid"
                                src={`/img/${guitar.image}.jpg`}
                                alt="imagen guitarra"
                              />
                            </td>
                            <td>{guitar.name}</td>
                            <td className="fw-bold">{guitar.price}</td>
                            <td className="flex align-items-start gap-4">
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => decreaseQuantity(guitar.id)}
                              >
                                -
                              </button>
                              {guitar.quantity}
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => increaseQuantity(guitar.id)}
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger button-delete"
                                type="button"
                                onClick={() => removeFromCart(guitar.id)}
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <p className="text-end">
                      Total pagar: <span className="fw-bold">${cartTotal}</span>
                    </p>
                  </>
                )}
                <button
                  className="btn btn-dark w-100 mt-3 p-2"
                  onClick={clearCart}
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
