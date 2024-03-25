import React, { useState } from 'react';

interface NoteEditorProps {
  notes: string[];
  setNotes: React.Dispatch<React.SetStateAction<string[]>>;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ notes, setNotes }) => {
  const [newNote, setNewNote] = useState<string>('');
  const [editIndex, setEditIndex] = useState<number | null>(null); 

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      if (editIndex !== null) {
        const updatedNotes = [...notes];
        updatedNotes[editIndex] = newNote;
        setNotes(updatedNotes);
        setEditIndex(null);
      } else {
        setNotes([...notes, newNote]);
      }
      setNewNote('');
    }
  };

  const handleDeleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const handleEditNote = (index: number) => {
    setNewNote(notes[index]);
    setEditIndex(index);
  };

  return (
    <div className="max-w-sm mx-auto">
      <input
        type="text"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Enter your note..."
        className="w-full border rounded p-2 mb-4 text-black"
      />
      <button onClick={handleAddNote} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
        {editIndex !== null ? 'Edit Note' : 'Add Note'}
      </button>
      <ul className="m-4">
        {notes.map((note, index) => (
          <li key={index} className="flex justify-between items-center border p-2 mb-2 rounded">
            <span>{note}</span>
            <div>
              <button onClick={() => handleEditNote(index)} className="text-blue-500 mr-2">
                Edit
              </button>
              <button onClick={() => handleDeleteNote(index)} className="text-red-500">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteEditor;
