import axios from "axios";
import type { Note, NewNote } from "../types/note";


const BASE_URL = "https://notehub-public.goit.study/api";
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`,
    }
});

export const fetchNotes = async (page: number, search: string): Promise<FetchNotesResponse> => {
    const response = await api.get<FetchNotesResponse>("/notes", {
        params: {
            page,
            ...(search.trim() !== "" && { search }),
        },
    });

    console.log(response.data);
    return response.data;
    
}

export const createNote = async (note: NewNote): Promise<Note> => {
    const response = await api.post<Note>("/notes", note);

    return response.data;
}

export const deleteNote = async (noteId: string): Promise<Note> => {
    const response = await api.delete<Note>(`/notes/${noteId}`);

    return response.data;
}


