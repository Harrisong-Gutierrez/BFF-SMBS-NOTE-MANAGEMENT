"use client";
import { useState } from "react";
import NoteEditor from "./NoteEditor";

export type noteType = {
  id: number;
  user_id: string;
  note_text: string;
};

const NoteEditorContainer = () => {
  return <NoteEditor />;
};

export default NoteEditorContainer;
