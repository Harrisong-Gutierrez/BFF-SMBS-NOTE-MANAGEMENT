import { data } from 'autoprefixer';
import axios from 'axios';



export const getNotes = async () => {
    try {
        const response = await axios.get(`/api/notes`);

        return response.data;

    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
};

export const addNote = async (noteData: { user_id?: string; note_text?: string }) => {
    try {
        const response = await axios.post(`/api/notes`, noteData);
        return response.data;
    } catch (error) {
        console.error('Error adding note:', error);
        throw error;
    }
};


export const updateNote = async (noteData: { id: number; user_id: string; note_text: string }) => {
    try {
        const response = await axios.put(`/api/notes`, noteData);
        return response.data;
    } catch (error) {
        console.error('Error updating note:', error);
        throw error;
    }
};

export const deleteNote = async (id: number) => {
    try {
        const response = await axios.delete(`/api/notes`, { data: { id } });
        return response.data;
    } catch (error) {
        console.error('Error deleting note:', error);
        throw error;
    }
};