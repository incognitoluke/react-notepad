import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.SVG'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"

const NotePage = ({match}) => {

    let params = useParams()
    let noteId = params.id
    let [note, setNote] = useState(null)

    useEffect(()=> {
        getNote()
    }, [noteId])

    let getNote = async ()=> {
        if(noteId === 'new') return

        let response = await fetch(`/api/notes/${noteId}/`)
        let data = await response.json()
        setNote(data)
    }

    
    let createNote = async ()=>{
        fetch(`/api/notes/create/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let updateNote = async ()=>{
        fetch(`/api/notes/${noteId}/update/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let navigate = useNavigate();

    const redirect = () => {
        navigate("/")
    }

    let deleteNote = async ()=> {
        fetch(`/api/notes/${noteId}/delete/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        redirect()
    }

    let handleSubmit = ()=> {
        if(noteId !== 'new' && note.body === ''){
            deleteNote()
        }else if(noteId !== 'new'){
            updateNote()
        }else if(noteId === 'new' && note.body !== null){
            createNote()
        }
        redirect()
    }

    let handleChange = (value) =>{
        setNote(note => ({...note, 'body':value}))
        console.log('Handle Change:',note)
    }

    return (
        <div className='note'>
            <div className='note-header'>
                <h3>

                    <ArrowLeft onClick={handleSubmit}/>
                    
                </h3>
                {noteId !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ): (
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
            <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage