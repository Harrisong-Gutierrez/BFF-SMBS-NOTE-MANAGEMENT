import { data } from 'autoprefixer';
import axios from 'axios';

const baseURL: string = 'http://localhost:3000';

export const getNotes = async () => {
    try {
        const response = await axios.get(`${baseURL}/api/notes`);

        return response.data;

    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
};

export const addNote = async (noteData: { user_id?: string; note_text?: string }) => {
    try {
        const response = await axios.post(`${baseURL}/api/notes`, noteData);
        return response.data;
    } catch (error) {
        console.error('Error adding note:', error);
        throw error;
    }
};


export const updateNote = async (noteData: { id: number; user_id: string; note_text: string }) => {
    try {
        const response = await axios.put(`${baseURL}/api/notes`, noteData);
        return response.data;
    } catch (error) {
        console.error('Error updating note:', error);
        throw error;
    }
};

export const deleteNote = async (id: number) => {
    try {
        const response = await axios.delete(`${baseURL}/api/notes`, { data: { id } });
        return response.data;
    } catch (error) {
        console.error('Error deleting note:', error);
        throw error;
    }
};