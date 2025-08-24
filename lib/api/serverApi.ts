import type { Note, NoteTag } from '@/types/note';
import type { User } from '@/types/user';
import { cookies } from 'next/headers';
import api from './api';

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// Получаем куки для запроса к API
export async function getCookiesHeader(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');
}

// ---------- Notes ----------

export const fetchNotes = async (
  search = '',
  page = 1,
  tag?: string,
): Promise<FetchNotesResponse> => {
  const cookieHeader = await getCookiesHeader();
  const { data } = await api.get('/notes', {
    params: { search, page, perPage: 12, tag },
    headers: { Cookie: cookieHeader },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = await getCookiesHeader();
  const { data } = await api.get(`/notes/${id}`, {
    headers: { Cookie: cookieHeader },
  });
  return data;
};

// ---------- Auth ----------

export const checkServerSession = async (): Promise<boolean> => {
  const cookieHeader = await getCookiesHeader();
  const { data } = await api.get<{ success: boolean }>('/auth/session', {
    headers: { Cookie: cookieHeader },
  });
  return data.success;
};

export const getServerMe = async (): Promise<User> => {
  const cookieHeader = await getCookiesHeader();
  const { data } = await api.get('/users/me', {
    headers: { Cookie: cookieHeader },
  });
  return data;
};
