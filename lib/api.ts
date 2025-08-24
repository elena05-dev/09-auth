import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

axios.defaults.baseURL = 'http://localhost:3000/api';

export type { Note, NoteTag };

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  results: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export async function fetchNotes(
  params: FetchNotesParams,
): Promise<FetchNotesResponse> {
  try {
    const cleanParams = { ...params };
    if (!cleanParams.search?.trim()) {
      delete cleanParams.search;
    }

    const { data } = await axios.get<{ notes: Note[]; totalPages: number }>(
      '/notes',
      { params: cleanParams },
    );

    return {
      results: data.notes,
      totalPages: data.totalPages,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch notes');
  }
}

export async function fetchNoteById(id: string): Promise<Note> {
  try {
    const { data } = await axios.get<Note>(`/notes/${id}`);
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch note details');
  }
}

export async function createNote(note: CreateNotePayload): Promise<Note> {
  try {
    const { data } = await axios.post<Note>('/notes', note);
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to create note');
  }
}

export async function deleteNote(id: string): Promise<Note> {
  try {
    const { data } = await axios.delete<Note>(`/notes/${id}`);
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to delete note');
  }
}
