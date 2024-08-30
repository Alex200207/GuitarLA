import React from "react";

//state derivado para ver si el carrito esta vacio o no usando el state cart que se pasa como prop desde el componente padre
//si el carrito esta vacio muestra un mensaje de que esta vacio si no muestra la tabla con los productos 
function Header({cart}) {
  
  const isEmpty = () => cart.length === 0 //funcion para ver si el carrito esta vacio o no
  const carTotal = () => cart.reduce((total,item) => total + ( item.quantity * item.price ),0) 
  //lo que se hace es recorrer el carrito y por cada producto se multiplica el precio por la cantidad y se suma al total
  //reduce recibe una funcion callback que se ejecuta por cada elemento del array y un valor inicial que en este caso es 0

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="./public/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="./public/img/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                
                {isEmpty() ?(//si el carrito esta vacio muestra el mensaje de que esta vacio si no muestra la tabla con los productos
                  <p className="text-center">El carrito esta vacio</p>
                ):(
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
                    {cart.map(guitar => (

                    
                    <tr key={guitar.id}>
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
                        <button type="button" className="btn btn-dark">
                          -
                        </button>
                        {guitar.quantity}
                        <button type="button" className="btn btn-dark">
                          +
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-danger" type="button">
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                
                </table>
                
                
                <p className="text-end">
                  Total pagar: <span className="fw-bold">${carTotal()}</span>
                </p>
                </>
                )}
                <button className="btn btn-dark w-100 mt-3 p-2">
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
