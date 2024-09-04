conceptos que hay que mencionar sobre react 

Que es un componente?
- Un componente en React es una pieza reutilizable de código que encapsula la lógica
 y la interfaz de usuario relacionada en una unidad cohesiva.
 cada componente debe escribir su primera letra en mayuscula.

Que es JSX?
- JSX es una extensión de sintaxis de JavaScript que permite escribir código HTML similar
 dentro de los componentes de React. Combina HTML y JavaScript en un solo archivo, lo que 
 facilita la creación de interfaces de usuario dinámicas y reactivas.


 Reglas en JSX.

 -a diferencia de HTML, que no es estricto, en JSX si un elemento HTML tiene una etiqueta
  de apertura deberas tener tambien cierre. 

 -las etiquetas de solo apertura como <link> <img> o <input> deberan finalizar con />

 -cada componente debe tener un return.

 -En este return debe haber maximo un solo elemento en el nivel maximo puedes meterlas
  en un div pero esto hara que tengas muchos divs para eso existe fragment no crea divs inecesarios
  hay dos formas importando fragment o usando <></>.

  --------------------------------------------------------------------------------------------------------

  Que son los React Hooks

  Son la base de react estos me van a permitir utilizar las diferentes funciones de React en tus 
  componentes, React tiene una serie de hooks pero tambien puedes crear los tuyos.

  Los Hooks estan disponibles desde la version 16.8, previo a ellos se tenian que crear clases para
  crear y modificar el state, con los Hooks no es necesario solamente utilizamos funciones

  los mas basicos y usados son:
  useState
  useEffect
  useContext


Un hook en React es una función especial que te permite "engancharte" a las características internas de React,
como el estado y el ciclo de vida, dentro de los componentes funcionales. Los hooks te permiten usar estas capacidades
sin necesidad de convertir tus componentes en clases, lo que simplifica y moderniza el manejo de la lógica en tus component

  Hooks disponibles en react

// Conceptos de cada hook:

- useState: Permite agregar estado a un componente funcional. Retorna un par de valores: el estado actual y una función para actualizarlo.

- useEffect: Permite realizar efectos secundarios en un componente funcional. Se ejecuta después de que el componente se haya renderizado.

- useContext: Permite acceder al contexto de un componente en React. Proporciona una forma de pasar datos a través del árbol de componentes
 sin tener que pasar props manualmente en cada nivel.

- useReducer: Permite manejar el estado de un componente utilizando un patrón de reducción. Es similar a useState, pero más adecuado para casos 
donde el estado tiene una lógica más compleja.

- useCallback: Permite memorizar una función para evitar que se vuelva a crear en cada renderizado del componente. Útil cuando se pasa una 
función como prop a componentes hijos.

- useMemo: Permite memorizar un valor calculado para evitar que se recalcule en cada renderizado del componente. Útil cuando se tiene una
operación costosa en términos de rendimiento.

- useRef: Permite crear una referencia mutable que persiste a lo largo de los renderizados del componente. Útil para acceder a elementos
 del DOM o para almacenar valores mutables.

- useImperativeHandle: Permite personalizar la instancia expuesta de un componente hijo cuando se utiliza la función ref. Útil para 
interactuar con componentes hijos de forma imperativa.

- useLayoutEffect: Similar a useEffect, pero se ejecuta de forma síncrona después de que todos los cambios en el DOM han sido realizados. 
Útil para realizar tareas de manipulación del DOM que requieren medidas precisas.

- useInsertionEffect: Permite realizar efectos secundarios después de que un componente se haya insertado en el DOM. Útil para animaciones
 o transiciones.

- useTransition: Permite crear transiciones animadas en React. Útil para crear animaciones fluidas entre diferentes estados de un componente.

- useDeferredValue: Permite retrasar la actualización de un valor de estado hasta que se cumpla una condición. Útil para optimizar 
el rendimiento en casos donde la actualización del estado es costosa.

- useId: Genera un identificador único para su uso en elementos del DOM. Útil para evitar conflictos de identificadores en componentes 
reutilizables.

- useSyncExternalstore: Permite sincronizar el estado de un componente con una fuente de datos externa. Útil para mantener el estado 
del componente actualizado con cambios externos.

Es posible crear nuestros propios hooks de esta forma podras separar tu codigo en funciones reutilizables y sacar todo el beneficio
de lo que React ofrece...

------------------------------------------------------------------------------------------------------------------------------------------

Que es State??

o Estado en React seguro es una de las partes mas importantes de React..

El estado es un varible con informacion relevante en nuestra aplicacion de React algunas veces el state
pertenece a un componente en especifico o algunas veces deseas compartirlo a lo largo de diferentes componentes

piensa en state como el resultado de alguna interaccion en el sitio o aplicacion web: el listado de clientes
la imagen a mostrar en una galeria si un usuario esta autenticado o no.

-es creado con el hook de useState().

Anatomia de useState:

const [customer,setCustomer] = useState({})
customer: es el state es la variable que tendra toda la informacion

setCustomber: es la funcion que modifica el state siempre se utilizara cuando quieras realizar cambios.
({}): este es el obejto vacio  el valor incial.

cada ves que tu state cambia tu aplicacion de react va a renderzar y actualizarse con esos cambios
no es necesarioa hacer nada mas  y tu interfaz siempre estara sincronizada con el state.

Para modificar el state , se utiliza la funcion que extraemos cuando declaramos el state en nuestro componente
setCustomber.

El estado es sincrono o es asincrono

el state de react es asincrono significa que el state significa que el state no se actualiza inmediatamente si no despues 
unos millisegundos despues


Reglas de los Hooks..

-Los hooks se colocan en la parte superior de tus componentes de React.
-No se deben colocar dentro de condicionales y tampoco despues de return.

--------------------------------------------------------------------------------------------------------------------------------------------------

Que es useEffect???

Es un hook muy comun..
                                                        
Despues del useState es el mas utilizado.

Es el sustituto de lo que antes era un componentDidMount() y componentDidUpdate.

sintaxis
import {useEffect} from "react" : importacion

useEffect(() => {
  console.log('El componente esta listo')
},[]);

Usos de useEffect :

Al ejecutarse automaticamente cuando el componente esta listo , es un 
buen lugar para colocar codigo para consultar una API o LocalStorage.

Debido a que le podemos pasar una dependencia y estar escuchando por los
cambios que sucedan en una varible, puede actualizar el componente cuando
este cambio suceda

------------------------------------------------------------------------------------------

Que son los Statements en JavaScript

Una app de js es una serie de statements ,cada statement es una instruccion
para hacer algo.
Algunos Statements son:

-creacion de variables
-codigo condicionales con if 
-Lanzar errores con throw new Error()
-iterar con while o forma

estos se deben escribir antes del return en React

Expresiones en JavaScript

Una expresion es algo que produce valor.
Alguna Expresiones son:
-Ternarios
-Utilizar un Array Method que genere un nuevo Array
-.map que genera un nuevo array a diferencia de forEach

//-------------------------------------------------------------------------------------------------

Que son los props en react

puedes pasarle informacion de un componente padre al hijo por medio
de estas props.

Los props se parecen a los atributos en HTML, pero puedes pasarles arrays, objetos o funciones

los props se pasan del padre al hijo , nunca se pueden pasar del hijo al padre

//-------------------------------------------------------------------------------------------------

Eventos en React

La forma en que react manjea los eventos es muy similar a como lo hace JavaScript de forma nativa con algunos cambios

Los elementos son camelCase , es decir en lugar de onchange se utiliza onChange, en lugar de onclick se utiliza onClick.

tambien a diferencia de JS y HTML, donde se coloca el nombre de las funciones en un string en React(JSX) se utiliza funcion entre
{}.

ejem.

HTML----base
<button onclick="getLatesOrders()">
    Descargar pedidos
</button>


JSX(React) : recordar que en react en ves de tener comillas sencillas o disponibles
se usan llaves para dar a entender a react que es codigo JS.

<button onClick={getLatesOrders()}>
    Descargar pedidos
</button>

ejem sintaxis de evento submit 

HTML:
<form onsubmit = "agregarClientes(); return false">
    <button type = "submit">Submit</button>
</form>



JSX el evento onSubmit:

<form onSubmit={handleSubmit}> handleSubmit es una convencion de react
    <button type="submit"> agregar cliente</button>
</form>






