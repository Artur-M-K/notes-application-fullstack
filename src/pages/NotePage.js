import React, {useState, useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';

const NotePage = ({match, history}) => {
    let noteId = match.params.id;

    const [note, setNote] = useState(null);

    let getNote = useCallback(async() => {
        if (noteId === 'new') {
            return;
        }
        const response = await fetch(`https://127.0.0.1:8000/api/notes/${noteId}/`);
        const data = await response.json();
        setNote(data);
    }, [noteId]);

    useEffect(() => {
        getNote();
    }, [noteId, getNote]);

    const createNote = async () => {
        
            await fetch(`https://127.0.0.1:8000/api/notes/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            });
    };

    const updateNote = async () => {
        await fetch(`https://127.0.0.1:8000/api/notes/${noteId}/update/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        });
    };

    const deleteNote = async () => {
        await fetch(`https://127.0.0.1:8000/api/notes/${noteId}/delete/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        history.push('/');
    };

    const handleSubmit = () => {

        if (noteId === 'new' && note === null) return;
        
        if(noteId !== 'new' && note.body === "") {
            deleteNote();
        }else if (noteId !== 'new') {
            updateNote();
        }else if (noteId === 'new' && note.body !== null) {
            createNote();
        } 
        history.push('/');
    };
    
    return (
        <div className='note'>
            <div className="note-header">
                <h3>
                    <Link to="/">
                        <ArrowLeft onClick={handleSubmit}/>
                    </Link>
                </h3>
                {noteId !== 'new' ? (<button onClick={deleteNote}>Delete</button>)
                :
                (<button onClick={handleSubmit}>Done</button>)
                }
            </div>
            <div className="textarea-container">
                <textarea onChange={(e)=> {setNote({...note, 'body':e.target.value})}} value={note?.body}></textarea>
            </div>
            
        </div>
    )
}

export default NotePage;
