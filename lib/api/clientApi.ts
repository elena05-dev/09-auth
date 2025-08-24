import api from './api';
import type { Note, NoteTag } from '@/types/note';
import type { User } from '@/types/user';

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}
export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
  cookie?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// Регистрация
export const registerUser = async (
  email: string,
  password: string,
): Promise<User> => {
  const { data } = await api.post('/auth/register', { email, password });
  return data;
};

// Вход (login)
export const loginUser = async (
  email: string,
  password: string,
): Promise<User> => {
  const { data } = await api.post<User>(
    '/auth/login',
    { email, password },
    { withCredentials: true },
  );
  return data;
};

// Выход
export const logoutUser = async (): Promise<void> => {
  await api.post('/auth/logout', {}, { withCredentials: true });
};

// Получение текущего пользователя
export const getMe = async (): Promise<User> => {
  const { data } = await api.get('/users/me', { withCredentials: true });
  return data;
};

// Проверка сессии на клиенте
export const checkClientSession = async (): Promise<boolean> => {
  const res = await api.get<{ success: boolean }>('/auth/session', {
    withCredentials: true,
  });
  return res.data.success;
};

// Обновление пользователя
export const updateUser = async ({
  username,
  email,
}: {
  username: string;
  email: string;
}): Promise<User> => {
  const { data } = await api.patch<User>(
    '/users/me',
    { username, email },
    { withCredentials: true },
  );
  return data;
};

// Работа с заметками
export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string,
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page };
  if (search) params.search = search;
  if (tag && tag !== 'All') params.tag = tag;

  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params,
    withCredentials: true,
  });
  return data;
};

export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  const { data } = await api.post('/notes', note, {
    withCredentials: true,
  });
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete(`/notes/${id}`, {
    withCredentials: true,
  });
  return data;
};
