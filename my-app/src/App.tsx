//contains styles for the app such as layout, colors
import './App.css';
//classify notes as personal, study, work, or other
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { ThemeContext, themes } from "./themeContext";
import React, { useState, useContext } from 'react';

function App() {
//Initial structure of a note.
  const initialNote = {
    id: -1,
    title: '',
    content: '',
    label: Label.other,
    favorited: false,
  };

  const [createNote, setCreateNote] = useState(initialNote);
  const [notes, setNotes] = useState(dummyNotesList);

  // Create a new note
  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setNotes([
      ...notes,
      {
        id: notes[notes.length - 1]?.id + 1 || 1, // Assign a new ID to the note (based on the last note's ID)
        title: createNote.title,
        content: createNote.content,
        label: createNote.label,
        favorited: false,
      },
    ]);
    setCreateNote(initialNote); // Reset form after submission
  };

  // Toggle favorite status of a note
  const toggleFavorite = (id: number) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, favorited: !note.favorited };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  // Remove a note
  const removeNoteHandler = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Handle Focus (Input turns light blue) and Blur (Reverts to original background)
  const handleFocus = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    event.target.style.backgroundColor = '#e0f7fa'; // Light blue on focus
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    event.target.style.backgroundColor = '#ffffff'; // Revert to white on blur
  };

  return (
    <div className='app-container'>
      {/* Note Creation Form */}
      <form className='note-form' onSubmit={createNoteHandler}>
        <div>
          <input
            className='input-box'
            placeholder='Note Title'
            value={createNote.title}
            onChange={(event) => setCreateNote({ ...createNote, title: event.target.value })}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
        </div>

        <div>
          <textarea
            className='input-box'
            placeholder='Note Content'
            value={createNote.content}
            onChange={(event) => setCreateNote({ ...createNote, content: event.target.value })}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
        </div>

        <div>
          <select
            className='input-box'
            value={createNote.label}
            onChange={(event) => setCreateNote({ ...createNote, label: event.target.value as unknown as Label })}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          >
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>

        <div><button type='submit'>Create Note</button></div>
      </form>

      {/* Notes Grid */}
      <div className='notes-grid'>
        {notes.map((note) => (
          <div key={note.id} className='note-item'>
            <div className='notes-header'>
              {/* Favorite Button */}
              <button onClick={() => toggleFavorite(note.id)}>
                {note.favorited ? '❤️' : '🤍'}
              </button>
              {/* Delete Button */}
              <button onClick={() => removeNoteHandler(note.id)}>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>{note.label}</p>
          </div>
        ))}
      </div>

      {/* Favorite List */}
      <div className='favorites-list'>
        <h3>List of Favorites:</h3>
        {notes.filter(note => note.favorited).map((note) => (
          <p key={note.id}>{note.title}</p>
        ))}
      </div>
    </div>
  );
}

export default App;