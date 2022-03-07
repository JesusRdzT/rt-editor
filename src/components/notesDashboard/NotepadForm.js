import React, { useState, useRef, useEffect } from 'react'

const NotepadForm = ( { setNotepads } ) => {
    const [ title, setTitle ] = useState("");
    const [ color, setColor ] = useState("#200060");
    const [ failedAttempt, setFailedAttempt ] = useState(false);
    const titleInput = useRef(); 
    const titleField = useRef();
    const colorInput = useRef(); 
    const colorField = useRef(); 

    function closeModal(event){
        if(event.target.id === "modal" || event.target.id === "cancelBtn"){
            event.preventDefault();
            const modalElement = document.getElementById("modal");
            modalElement.style.display = "none";
        }
    }
    
    function createNotepad(event){
        event.preventDefault(); //Prevents page reloading

        if(title !== ""){
            let notepads = window.localStorage.getItem("notepads");
            //Updates the notepad lists
            if(notepads === null){
                notepads = title;
            } else {
                notepads = notepads + ',' + title;
            }
            window.localStorage.setItem("notepads", notepads);
            setNotepads(notepads.split(','));
            
            let notepad = {notepadTitle: title, notepadColor: color, content:'' };
            window.localStorage.setItem(title, JSON.stringify(notepad));
            
            //Restarts the marker for new unsuccesful attempts
            setFailedAttempt(false);
            //Erases the error message from the screen, if it exists
            failedAttempt && titleField.current.removeChild(titleField.current.lastChild);
            setTitle(""); //Sets the title input state to the default value

            //Closes the modal
            const modal = document.getElementById("modal");
            modal.style.display = "none";
        } else {
            if(!failedAttempt){ // Executes only if there has not been any unsuccesfull attempts

                //Displays error message on screen
                const p = document.createElement('p');
                p.appendChild(document.createTextNode("The Notepad's Title can't be empty"))
                titleField.current.appendChild(p);
                
                window.localStorage.clear(); 
                titleInput.current.style.borderColor = "red";
                setFailedAttempt(true); 
            }
        }
    }

    return (
        <div id="modal" className="modalForm" onClick={(event)=>closeModal(event)}>
            <div className="notepadForm">
                <form className="formContent">
                    <h2>New Notepad</h2>
                    <div id="titleField" ref={titleField}>
                        <div>
                            <label>Title</label>
                            <input type="text" id="titleInput" ref={titleInput} placeholder="Notepad Title" value={title} onChange={(event)=>{setTitle(event.target.value)}}/>
                        </div>
                    </div>
                    <div id="colorField" ref={colorField}>
                        <label>Color</label>
                        <input type="color" id ="colorInput" ref={colorInput} defaultValue={color} onChange={(event)=>{setColor(event.target.value)}}/>
                    </div>
                    <button id="formBtn" onClick={(event)=>createNotepad(event)} name="submit">Create Notepad</button>
                    <button id="cancelBtn" onClick={(event)=>closeModal(event)} name='cancel'>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default NotepadForm
