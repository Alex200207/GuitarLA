// eslint-disable-next-line react/prop-types
function Guitarra({guitarra,addToCart}) {//Recibe como argumento el objeto guitarra que se pasa como propiedad al componente Guitarra en App.jsx

// eslint-disable-next-line react/prop-types, no-unused-vars
const {id,name,image,description,price} = guitarra;//Destructuring de guitarra para obtener los valores de cada propiedad del objeto guitarra
return (
    
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img
          className="img-fluid"
          src={`img/${image}.jpg`}
          alt={"imagen guitarra"}
        />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p>{description}
        </p>
        <p className="fw-black text-primary fs-3">${price}</p>

        {/* vamos a registrar el evento onClick para agregar al carrito */}
        <button 
        type="button" 
        className="btn btn-dark w-100"
        onClick={()=>addToCart(guitarra)}//Al hacer click en el botón, se agrega el objeto guitarra al estado cart
        //este es untemplate aqui se muestra informacion no logica
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}

export default Guitarra;
