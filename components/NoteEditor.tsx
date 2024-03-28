import React, { useState, useEffect } from "react";
import {
  addNote,
  deleteNote,
  getNotes,
  updateNote,
} from "@/app/services/apiCalls";
import { noteType } from "./NoteEditorContainer";
import { createClient } from "@/utils/supabase/client";

export type newNoteType = {
  user_id?: string;
  note_text?: string;
};

const NoteEditor: React.FC = () => {
  const [notes, setNotes] = useState<Array<noteType>>([]);
  const [newNote, setNewNote] = useState<newNoteType>({
    user_id: "",
    note_text: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const getCurrentUser = async () => {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    setNewNote((prevState) => ({ ...prevState, user_id: user?.id }));
  };

  const fetchNotes = async () => {
    try {
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
    fetchNotes();
  }, []);

  const handleDeleteNote = async (id: number, index: number) => {
    try {
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleAddNote = async () => {
    try {
      if (editIndex !== null) {
        const editedNote = { id: notes[editIndex].id, ...newNote };
        if (!editedNote.user_id || editedNote.note_text === undefined) {
          throw new Error("User ID or note text is missing");
        }
        await updateNote({
          id: editedNote.id,
          user_id: editedNote.user_id,
          note_text: editedNote.note_text,
        });
        setEditIndex(null);
      } else {
        if (newNote.user_id === undefined || newNote.note_text === undefined) {
          throw new Error("User ID or note text is missing");
        }
        await addNote(newNote);
      }
      setNewNote({ ...newNote, note_text: "" });
      fetchNotes();
    } catch (error) {
      console.error("Error adding/editing note:", error);
    }
  };

  const handleEditNote = (index: number) => {
    setNewNote({ ...notes[index] });
    setEditIndex(index);
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setNewNote({
      ...newNote,
      [event.target.name]: event.target.value,
    });
  };

  const renderNotes = () => {
    return notes &&
      notes.map((note, index) => (
        <li
          key={note.id}
          className="flex justify-between items-center border p-2 mb-2 rounded"
        >
          <span>{note.note_text}</span>
          <div>
            <button
              onClick={() => handleEditNote(index)}
              className="text-blue-500 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteNote(note.id, index)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        </li>
      ))
  }



  return (
    <div className="max-w-sm mx-auto">
      <input
        type="text"
        value={newNote?.note_text}
        name="note_text"
        onChange={handleChange}
        placeholder="Enter your note..."
        className="w-full border rounded p-2 mb-4 text-black"
      />
      <button
        onClick={handleAddNote}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        {editIndex !== null ? "Edit Note" : "Add Note"}
      </button>
      <ul className="m-4">
        {renderNotes()}
      </ul>
    </div>
  );
};

export default NoteEditor;
