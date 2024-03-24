import { useState } from 'react';

interface NoteEditorProps {
  notes: string[];
  setNotes: React.Dispatch<React.SetStateAction<string[]>>;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ notes, setNotes }) => {
  const [newNote, setNewNote] = useState<string>('');

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      setNotes([...notes, newNote]);
      setNewNote('');
    }
  };

  const handleDeleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="max-w-sm mx-auto">
      <input
        type="text"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Enter your note..."
        className="w-full border rounded p-2 mb-4"/>
      <button onClick={handleAddNote} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
        Add Note
      </button>
      <ul>
        {notes.map((note, index) => (
          <li key={index} className="flex justify-between items-center border p-2 mb-2 rounded">
            <span>{note}</span>
            <button onClick={() => handleDeleteNote(index)} className="text-red-500">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteEditor;
