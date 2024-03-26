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

  const handleAddNote = async () => {
    try {
      // if (editIndex !== null) {
      //   const updatedNote = await updateNote({
      //     id: editIndex,
      //     user_id: "",
      //   });
      //   setNotes((prevNotes) =>
      //     prevNotes.map((note, index) =>
      //       index === editIndex ? updatedNote : note
      //     )
      //   );
      //   setEditIndex(null);
      // } else {
      //   const addedNote = await addNote({
      //     user_id: "",
      //   });
      //   setNotes((prevNotes) => [...prevNotes, addedNote]);
      // }
      // setNewNote("");

      const addedNote = await addNote(newNote);
      console.log(addedNote);
      setNewNote((prevNotes) => ({ ...prevNotes, note_text: "" }));
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }

    console.log(newNote);
  };

  // const handleDeleteNote = async (index: number) => {
  //   try {
  //     await deleteNote(index);
  //     setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
  //   } catch (error) {
  //     console.error("Error deleting note:", error);
  //   }
  // };

  const handleEditNote = (index: number) => {
    setNewNote(notes[index]);
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

  // console.log(notes)

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
        {notes &&
          notes.map((note, index) => (
            <li
              key={index}
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
                  // onClick={() => handleDeleteNote(index)}
                  className="text-red-500"
                >
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
