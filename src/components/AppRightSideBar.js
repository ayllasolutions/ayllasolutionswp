import React from 'react';

//Estilos
import '../App.css';

//Multimedia


//Componentes
import * as FontAwesome from "react-icons/fa";

function AppRightSideBar (props){
    return (
        <div className='App-RightSideBar'>
            <FontAwesome.FaLinkedin size="30" color='white'></FontAwesome.FaLinkedin>
            <FontAwesome.FaGooglePlus size="30" color='white'></FontAwesome.FaGooglePlus>
            <FontAwesome.FaReact size="30" color='white'></FontAwesome.FaReact>
            <FontAwesome.FaNode size="30" color='white'></FontAwesome.FaNode>
            <FontAwesome.FaJava size="30" color='white'></FontAwesome.FaJava>
            <FontAwesome.FaStackOverflow size="30" color='white'></FontAwesome.FaStackOverflow>
            <FontAwesome.FaGithub size="30" color='white'></FontAwesome.FaGithub>
            <FontAwesome.FaOpenid size="30" color='white'></FontAwesome.FaOpenid>
        </div>
    )
}

export default AppRightSideBar