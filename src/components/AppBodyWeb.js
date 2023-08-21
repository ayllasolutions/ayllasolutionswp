import React, {useEffect, useState} from 'react';

//Estilos
import '../App.css';

//Multimedia
import logo from '../Logo.png'


//Componentes
import * as MaterialIcons from "react-icons/md"
import * as FontAwesome from "react-icons/fa"
import AppChat from '../components/AppChat'

//Componentes del sitio
import AppBodyWebHome from '../components/AppBodyWebHome'
import AppBodyWebServicios from '../components/AppBodyWebServicios'
import AppBodyWebProductos from '../components/AppBodyWebProductos'
import AppBodyWebClientes from '../components/AppBodyWebClientes'
import AppBodyWebSobreNosotros from '../components/AppBodyWebSobreNosotros'

function AppBodyWeb (props){

    const[classMenu, setClassMenu] = useState('')
    const[classChatWindows, setClassChatWindows] = useState('')
    const[opcionSeleccionada, setOpcionSeleccionada] = useState('home');

    const changeOpcion = (event) => {
        setOpcionSeleccionada(event);
        console.log(event)
    }

    let componenteDinamico = null;

    if (opcionSeleccionada === 'home') {
      componenteDinamico = <AppBodyWebHome />;
    } else if (opcionSeleccionada === 'servicios') {
      componenteDinamico = <AppBodyWebServicios />;
    } else if (opcionSeleccionada === 'productos') {
      componenteDinamico = <AppBodyWebProductos />;
    } else if (opcionSeleccionada === 'clientes') {
        componenteDinamico = <AppBodyWebClientes />;
    } else if (opcionSeleccionada === 'sobrenosotros') {
        componenteDinamico = <AppBodyWebSobreNosotros />;
    }

  
  
  

    const changeClass = () => {
        if(classMenu === 'App-BodyWebContainerMenuMovilItemNone'){
            setClassMenu('App-BodyWebContainerMenuMovilItemBlock')
        }
        else
        {
            setClassMenu('App-BodyWebContainerMenuMovilItemNone')
        }
    }

    const changeClassChat = () =>{
        if(classChatWindows === 'App-BodyWebContainerFooterChatWindowsClose'){
            setClassChatWindows('App-BodyWebContainerFooterChatWindowsOpen')
        }
        else
        {
            setClassChatWindows('App-BodyWebContainerFooterChatWindowsClose')
        }        
    }

    useEffect(() => {
        setClassMenu('App-BodyWebContainerMenuMovilItemNone')
        setClassChatWindows('App-BodyWebContainerFooterChatWindowsClose')
    }, []);    

        return (
            <div className='App-BodyWeb'>
                <div className='App-BodyWebContainerMenu'>
                    <div>
                        <img src={logo} alt='Logo' title='https://www.ayllasolutions.com' width='80px' height='70px'></img>
                    </div>
                    <div>
                        <button onClick={() => changeOpcion('home')}  className='App-BodyWebContainerMenuButton'>Home</button>
                        <button onClick={() => changeOpcion('servicios')}  className='App-BodyWebContainerMenuButton'>Servicios</button>
                        <button onClick={() => changeOpcion('productos')}  className='App-BodyWebContainerMenuButton'>Productos</button>
                        <button onClick={() => changeOpcion('clientes')}  className='App-BodyWebContainerMenuButton'>Clientes</button>
                        <button onClick={() => changeOpcion('sobrenosotros')}  className='App-BodyWebContainerMenuButton'>Sobre Nosotros</button>
                    </div>
                    <div>
                        <FontAwesome.FaUser size='50' title='Acceso a clientes' color='brown'></FontAwesome.FaUser>
                    </div>
                </div>

                <div className='App-BodyWebContainerMenuMovil'>

                    <ul className='nav'>
                        <li>
                            <MaterialIcons.MdMenu size='50' onClick={changeClass}>
                            </MaterialIcons.MdMenu>                                    
                            <ul className={classMenu}>
                                <li onClick={() => changeOpcion('home')} className='App-BodyWebContainerMenuMovilButton'>Home</li>
                                <li onClick={() => changeOpcion('servicios')} className='App-BodyWebContainerMenuMovilButton'>Servicios</li>
                                <li onClick={() => changeOpcion('productos')} className='App-BodyWebContainerMenuMovilButton'>Productos</li>
                                <li onClick={() => changeOpcion('clientes')} className='App-BodyWebContainerMenuMovilButton'>Clientes</li>
                                <li onClick={() => changeOpcion('sobrenosotros')} className='App-BodyWebContainerMenuMovilButton'>Sobre Nosotros</li>
                            </ul>
                        </li>
                    </ul>


                    <FontAwesome.FaUser size='45'></FontAwesome.FaUser>
                    <img src={logo} alt='Logo' width='70px' height='60px'></img>
                </div>
                
                <div className='App-BodyWebContainerContent'>
                    {componenteDinamico}
                </div>

                <div className='App-BodyWebContainerFooter'>
                    <div className='App-BodyWebContainerFooterCorp'>
                        <div>Sitio Web SPA desarrollado en React JS.</div>
                        <div>Powered by www.ayllasolutions.com - IT Solutions.</div>
                        <div>Copyright www.ayllasolutions.com - IT Solutions.</div>
                    </div>
                    <div className='App-BodyWebContainerFooterDatos'>
                        <div className='App-BodyWebContainerFooterDatosContacto'>


                                <MaterialIcons.MdMail size='23'></MaterialIcons.MdMail>info@ayllasolutionsc.com
                                <MaterialIcons.MdPhone size='23'></MaterialIcons.MdPhone>+ 56 9 25456768
                                <MaterialIcons.MdLocationOn size='23'></MaterialIcons.MdLocationOn>Guardia Vieja 202, Of 403 - Providencia/Santiago

                        </div>
                    </div>
                    <div className='App-BodyWebContainerFooterChat'>
                        <div>
                        <MaterialIcons.MdSupportAgent size='40'></MaterialIcons.MdSupportAgent>
                        </div>
                        Necesitas ayuda?
                        <button onClick={changeClassChat}>Abrir Chat</button>

                        <div className={classChatWindows}>
                            <AppChat></AppChat>
                        </div>
                    </div>
                </div>
            </div>
        )
    
}

export default AppBodyWeb