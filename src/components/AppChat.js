import React, {useEffect, useState, useRef} from 'react';
import io from 'socket.io-client';

//Estilos
import '../App.css';

//Componentes
import * as MaterialIcons from "react-icons/md"
import * as FontAwesome from "react-icons/fa"

function AppChat (props){
    const divRef = useRef(null);
    const[message, setMessage] = useState('')
    const[newLine, setNewLine] = useState('')
    const[acumulateLines, setAcumulateLines] = useState('<div></div>')
    const [socket, setSocket] = useState(null);
    const [roomCurrent, setRoomCurrent] = useState(null);
    const [receivedMessages, setReceivedMessages] = useState([]);

    const handlerEventWrite = (e) =>{
        setMessage(e.target.value)

    }

    const handlerEventSend = async () =>{
        if(message != '')
        {   
            if (socket) {
                const payload = { message, room: "Default" };
                console.log(payload);
                socket.emit('event_message', payload);
            }

            //socket.emit('sendMessage', '¡Hola, servidor!');
            if(acumulateLines === '')
            {
                setAcumulateLines(`<div class="App-BodyWebContainerFooterChatWindowsOpenMessageSendMe">` + message + `</div>`)
                console.log(acumulateLines)
                setMessage('')
            }
            else{
                setAcumulateLines(acumulateLines + `<div class="App-BodyWebContainerFooterChatWindowsOpenMessageSendMe">` + message + `</div>`)
                setMessage('')
                //divRef.current.scrollTop = divRef.current.scrollHeight - divRef.current.clientHeight;  
            }
            // Desplázate al último mensaje agregado
            setTimeout(() => {
                const lastMessage = divRef.current.lastChild;
                lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 50); // Ajusta el tiempo según sea necesario
        }
    }  

    const handlerEventSend2 = async (payload) =>{
        if(payload != '')
        {   
            if(acumulateLines === '')
            {
                setAcumulateLines(`<div class="App-BodyWebContainerFooterChatWindowsOpenMessageReceiveMe">` + payload + `</div>`)
                console.log(acumulateLines)
                setMessage('')
            }
            else{
                setAcumulateLines(acumulateLines + `<div class="App-BodyWebContainerFooterChatWindowsOpenMessageReceiveMe">` + payload + `</div>`)
                setMessage('')
                //divRef.current.scrollTop = divRef.current.scrollHeight - divRef.current.clientHeight;  
            }
            // Desplázate al último mensaje agregado
            setTimeout(() => {
                const lastMessage = divRef.current.lastChild;
                lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 50); // Ajusta el tiempo según sea necesario
        }
    }  

    useEffect(() => {
        if (socket) {
          socket.on('thankyou', (msg) => {
            setReceivedMessages((prevMessages) => [...prevMessages, msg]);
          });
        }else{
            console.log("No Socket Connection");
        }
    }, [socket]);    

    useEffect(() => {
        // Establecer la conexión con el servidor WebSocket
        const socketport = process.env.REACT_APP_SOCKET;
        const newSocket = io(socketport); // Cambia la URL a tu servidor WebSocket
        setSocket(newSocket);

        // Escuchar eventos del servidor
        newSocket.on('chatMessage', (message) => {
            console.log('Nuevo mensaje:', message);
        });

        newSocket.on('connect_error', (error) => {
            console.error("Error de conexión:", error.message);
        });
    

        // Desconectar el socket cuando el componente se desmonte
        return () => {
            newSocket.disconnect();
        };
    }, []);   


    useEffect(() => {
        if (receivedMessages.length > 0) {
            // Lógica para manejar los mensajes recibidos
            // Aquí puedes actualizar el acumulateLines con los nuevos mensajes
            const lastReceivedMessage = receivedMessages[receivedMessages.length - 1];
            //setMessage(lastReceivedMessage);
            handlerEventSend2(lastReceivedMessage);
        }
    }, [receivedMessages]);


    return(
        <div className='App-BodyWebContainerFooterChatWindowsOpenContent'>

            <div className='App-BodyWebContainerFooterChatWindowsOpenTimeLine' ref={divRef} dangerouslySetInnerHTML={{ __html: acumulateLines }}>
            </div>

            <div className='App-BodyWebContainerFooterChatWindowsOpenMessageBox'>
                <textarea  value={message} onChange={handlerEventWrite} className='App-BodyWebContainerFooterChatWindowsOpenMessageBoxText'>                               
                </textarea >
                <button onClick={handlerEventSend}><MaterialIcons.MdSend color='brown' size='25'></MaterialIcons.MdSend></button>
            </div>
    
        </div>
    )
}

export default AppChat