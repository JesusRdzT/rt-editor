import React, { useEffect, useState } from 'react'

const NotepadView = ( { notepadInfo } ) => {
    const [ notepad, setNotepad ] = useState({});

    useEffect(()=>{
        let notepadTxt = window.localStorage.getItem(notepadInfo);
        let notepadJson = JSON.parse(notepadTxt);
        setNotepad(notepadJson);
    },[])

    return (
        <div className="notepadView">
            <a id="anchor"href={"/notepad/" + notepad.notepadTitle}>
                <div className="banner" style={{backgroundColor: notepad.notepadColor}}></div>
                <div className="notepadInfo">
                    <h1 className="notepadTitle">{notepad.notepadTitle}</h1>
                </div>
            </a>
        </div>
    )
}

export default NotepadView
