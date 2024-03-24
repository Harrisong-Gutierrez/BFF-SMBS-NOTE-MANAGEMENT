"use client"
import { useState } from 'react';
import NoteEditor from './NoteEditor';

const NoteEditorContainer = () => {
    const [notes, setNotes] = useState<string[]>([]);

    return <NoteEditor notes={notes} setNotes={setNotes} />;
};

export default NoteEditorContainer;


