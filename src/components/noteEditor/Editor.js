import React, { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import "../../styles/notepadEditor.css"

const Editor = () => {

    let [text, setText] = useState("hola este es un texto");
    const [ notepadInfo, setNotepadInfo ] = useState({});
    const [ storedInfo, setStoredInfo ] = useState("");

    let page = useRef();

    let params = useParams(); 

    let shift = false;

    function keyDownEvent(event){
        var key = event.keyCode || event.which;
        var keychar = String.fromCharCode(key);
        console.log(key);
        if(key === 9 && !shift){ //Indent content
            event.preventDefault(); //Prevents tab default behaviour
            console.log("tab");
            document.execCommand("indent", false, null);
        }else if(key===9 && shift){ //Outdent content
            event.preventDefault(); //Prevents tab default behaviour
            document.execCommand("outdent", false, null);
        }else if(key === 16){
            shift = true;
        }
        page.current.focus();
    }

    function keyUpEvent(event){
        var key = event.keyCode || event.which;
        if(key === 16){
            shift = false;
        }
    }

    useEffect(()=>{
        //Allows images to be edited. 
        document.execCommand('enableObjectResizing', false, true);
        // page.current.addEventListener("keydown", keyDownEvent, false);
        // page.current.addEventListener("keyup", keyUpEvent, false);

        let storedData = window.localStorage.getItem(params.title);
        setStoredInfo(storedData);
        setNotepadInfo(JSON.parse(storedData));
        setText(notepadInfo.content);
        console.log(storedData);
        console.log(JSON.parse(storedData));
        page.current.innerHTML = notepadInfo.content;

        window.addEventListener('beforeunload', function (e){
            e.preventDefault(); 
            let auxNotepadInfo = JSON.parse(storedData); 
            auxNotepadInfo['content'] = page.current.innerHTML;
            // setNotepadInfo(auxNotepadInfo);
            // window.localStorage.setItem(params.title, JSON.stringify(notepadInfo));
            console.log(auxNotepadInfo);    
            // alert("note salgas");
        });
    },[]);

    function applyEffect(event){
        document.execCommand(event.target.id, false, null);
        document.execCommand('enableObjectResizing', false, true);
        console.log(event.target.id);
        page.current.focus();
    }

    function changeFont(event){
        document.execCommand(event.target.id, false, event.target.value);
        console.log(event.target.id);
        page.current.focus();
    }

    function exportToWord(event){
        var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
                "xmlns:w='urn:schemas-microsoft-com:office:word' "+
                "xmlns='http://www.w3.org/TR/REC-html40'>"+
                "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
        var footer = "</body></html>";
        var sourceHTML = header+document.getElementById("page").innerHTML+footer;
        
        var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        var fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = 'document.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);
    }



    return (
        <div className="editor" >
            {/* Start of toolbar */}
            <div className="toolbar" onChange={(event)=>{changeFont(event)}}>
                <button type="button" className='btn' id='word' onClick={(event)=>{exportToWord(event)}}></button>
                <select id="fontName" className='btn'>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Arial">Arial</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Segoe UI">Segoe UI</option>
                    <option value="Segoe UI">Segoe UI</option>
                </select>
                <input type="number" className='btn' id="fontSize" onChange={(event)=>{changeFont(event)}}></input>
                <input type="color" className='btn' id="foreColor" onChange={(event)=>{changeFont(event)}}></input>
                <input type="color" className='btn' id="backColor" onChange={(event)=>{changeFont(event)}}></input>
                <button type="button" className='btn' id='decreaseFontSize' onClick={(event)=>{applyEffect(event)}}>
                    <span>A-</span>
                </button>
                <button type="button" className='btn' id='increaseFontSize' onClick={(event)=>{applyEffect(event)}}>
                    <span>A+</span>
                </button>
                <button type="button" className='btn' id='bold' onClick={(event)=>{applyEffect(event)}}>
                    <b>B</b>
                </button>
                <button type="button" className='btn' id='italic' onClick={(event)=>{applyEffect(event)}}>
                    <i>I</i>
                </button>
                <button type="button" className='btn' id='underline' onClick={(event)=>{applyEffect(event)}}>
                    <u>U</u>
                </button>
                <button type="button" className='btn' id='insertUnorderedList' onClick={(event)=>{applyEffect(event)}}>
                    <span>ul</span>
                </button>
                <button type="button" className='btn' id='insertOrderedList' onClick={(event)=>{applyEffect(event)}}>
                    <span>ol</span>
                </button>
                <button type="button" className='btn' id='createLink' onClick={(event)=>{applyEffect(event)}}>
                    <span>link</span>
                </button>
                <button type="button" className='btn' id='justifyLeft' onClick={(event)=>{applyEffect(event)}}>
                    <span>left</span>
                </button>
                <button type="button" className='btn' id='justifyCenter' onClick={(event)=>{applyEffect(event)}}>
                    <span>center</span>
                </button>
                <button type="button" className='btn' id='justifyRight' onClick={(event)=>{applyEffect(event)}}>
                    <span>right</span>
                </button>
                <button type="button" className='btn' id='justifyFull' onClick={(event)=>{applyEffect(event)}}>
                    <span>full</span>
                </button>
                <button type="button" className='btn' id='insertImage' onClick={(event)=>{applyEffect(event)}}>
                    <span>Image</span>
                </button>
            </div> {/* End of toolbar */}
            <div className="page" id="page" contentEditable="true" ref={page} onChange={(event)=>setText(event.target.innerHTML)}>
            </div>
        </div>
    )
}

export default Editor
