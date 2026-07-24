import axios from "axios";
import type { Note,NoteTag } from "../types/note";


const BASE_URL = "https://notehub-public.goit.study/api";
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

interface FetchNotesParams{
    page: number;
    search: string;
}

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
    
}

 export interface CreateNoteParams {
    title: string;
    content: string;
    tag: NoteTag;
}

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`,
    }
});

export const fetchNotes = async ({ page, search }:FetchNotesParams): Promise<FetchNotesResponse> => {
    const response = await api.get<FetchNotesResponse>("/notes", {
        params: {
            page,
            ...(search.trim() !== "" && { search }),
        },
    });

    console.log(response.data);
    return response.data;
    
}

export const createNote = async (note: CreateNoteParams): Promise<Note> => {
    const response = await api.post<Note>("/notes", note);

    return response.data;
}

export const deleteNote = async (noteId: string): Promise<Note> => {
    const response = await api.delete<Note>(`/notes/${noteId}`);

    return response.data;
}


