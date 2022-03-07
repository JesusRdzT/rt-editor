import React, { useEffect, useState, useRef } from 'react'
import '../../styles/dashboard.css'

import NotepadForm from './NotepadForm'
import NotepadView from './NotepadView'
const Dashboard = () => {
    const [ modal, setModal ] = useState(false);
    const [ notepads, setNotepads ] = useState([]);
    const banner = useRef(); 

    document.addEventListener('scroll', function(e){
        // let mainBanner = document.getElementById("mainBanner");
        // if(banner.current.getBoundingRect().top == 0){
        //     banner.current.style.position = "fixed";
        // }
        
    });

    //let notepads = window.localStorage.getItem("notepads");
    //let notepadArray = notepads && (JSON.parse(notepads.split(',')));

    /* function updateNotepads(){
        notepads = window.localStorage.getItem("notepads");
        //notepadArray = notepads.split(',');
    } */
    
    function getElementF(){
    }

    useEffect(()=>{
        let modal = document.getElementById("modal");
        const storedNotepads = window.localStorage.getItem("notepads");
        storedNotepads ? setNotepads(storedNotepads.split(',')) : setNotepads([]);
        setModal(modal);
        console.log(notepads);
    }, []);

    function newNotepadForm(event){
        modal.style.display = "block";
        document.getElementById('titleInput').focus();
    }
    
    return (
        <div className="dashboard" >
            <div className="mainBanner" ref={banner}>
                <h1>Saved Notepads</h1>
                <button id="newNotepadBtn"onClick={(event)=>newNotepadForm(event)}>New notepad</button>
            </div>
            <NotepadForm setNotepads={setNotepads}/>
            <div className="notepadList">
               {notepads.length > 0 ? (notepads.map((notepad, index)=><NotepadView key={index} notepadInfo={notepad}/>)) : (<p>You dont have any notepads yet</p>)}
            </div>
        </div>
    )
}

export default Dashboard
