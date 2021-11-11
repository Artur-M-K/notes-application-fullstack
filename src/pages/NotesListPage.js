import React, {useState, useEffect} from 'react';
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton';

const NotesListPage = () => {

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async() => {
     const response = await fetch('https://127.0.0.1:8000/api/notes/')
     const data = await response.json();
     setNotes(data);
    }

    const notesData = notes.map(note => (
        <ListItem key={note.id} note={note}/>
    ))

    return (
        <div className='notes'>
            <div className="notes-header">
                <h2 className='notes-title'>&#9782; NOTES</h2>
                <div className='notes-count-header'>
                    <p className='notes-count'>{notes.length}</p>
                </div>
            </div>
            <div className="notes-list">
                {notesData}
            </div>
            <div className="button"></div>
                <AddButton />
            
        </div>
    )
}

export default NotesListPage;
