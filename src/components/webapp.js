import React, {useEffect, useState} from 'react';
import '../App.css';
import AppBodyWeb  from '../components/AppBodyWeb'
import AppRightSideBar from '../components/AppRightSideBar'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Webapp (props){
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hubMode = searchParams.get('hub.mode');
  const hubVerifyToken = searchParams.get('hub.verify_token');
  const hubChallenge = searchParams.get('hub.challenge');
  // Comprueba si la ruta contiene "/webhook"
  const [data, setData] = useState(null);

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (currentPath.includes('/webhook')) {

        //Debe comprobar el token
        console.log('El usuario accedió a una URL con "webhook"');


        const backwebhook = process.env.REACT_APP_APIWEBHOOK;

        axios.get(`${backwebhook}?hub.mode=${hubMode}&hub.verify_token=${hubVerifyToken}&hub.challenge=${hubChallenge}`)
        .then(response => {
          setData(response.data);
          console.log(response.data)//return sendStatus(200).send("Hook Verificado");
        })
        .catch(error => {
          console.error('Error al hacer la solicitud GET:', error);
          //return sendStatus(403);
        });
    }
  }, [searchParams]);
  
  return(
    <div className="App">        
    <AppBodyWeb/>
    <AppRightSideBar/>
  </div>
  );
}

export default Webapp

// export class Webapp extends React.Component {
//   constructor(props) {
//     super(props);

//     useEffect(() => {
//       const currentPath = window.location.pathname;
//       // Comprueba si la ruta contiene "/webhook"
//       if (currentPath.includes('/webhook')) {
//           // Realiza la acción que deseas cuando se accede a la ruta con "/webhook"
//           console.log('El usuario accedió a una URL con "webhook"');
//       }
//     }, []);
// }
//   render(){
//     return (
//       <div className="App">        
//         <AppBodyWeb/>
//         <AppRightSideBar/>
//       </div>
//     );
//   }
// }
