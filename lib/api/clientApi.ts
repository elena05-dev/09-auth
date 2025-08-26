'use client';

import { nextServer } from './api';
import axios from 'axios';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';
import { useAuthStore } from '@/lib/store/authStore';
import type { CreateNoteData } from '@/types/note';
import api from 'axios';

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data } = await api.get<User>('/auth/session');
    if (data) useAuthStore.getState().setAuth?.(data);
    return data;
  } catch {
    useAuthStore.getState().clearAuth?.();
    return null;
  }
}

export async function checkSession(): Promise<boolean> {
  try {
    const response = await nextServer.get('/api/auth/session');

    return response.data?.success === true;
  } catch {
    return false;
  }
}

export async function register(email: string, password: string): Promise<User> {
  try {
    const { data } = await nextServer.post<User>('/auth/register', {
      email,
      password,
    });
    useAuthStore.getState().setAuth?.(data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      throw new Error('this email already exists');
    }
    throw error;
  }
}

export async function loginUser(
  email: string,
  password: string,
): Promise<User> {
  try {
    await nextServer.post('/auth/login', { email, password });

    const user = await getCurrentUser();
    if (!user)
      throw new Error('Не удалось получить данные пользователя после логина');
    return user;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error('Неверный email или пароль');
    }
    throw error;
  }
}
export async function logoutUser(): Promise<void> {
  try {
    await nextServer.post('/auth/logout');
  } finally {
    useAuthStore.getState().clearAuth?.();
  }
}

export async function updateUserProfile(updates: Partial<User>): Promise<User> {
  const { data } = await nextServer.patch<User>('/users/me', updates);
  useAuthStore.getState().setAuth?.(data);
  return data;
}

export type FetchNotesParams = {
  page?: number;
  search?: string;
  tag?: string;
  perPage?: number;
};

export type FetchNotesResponse = {
  notes: Note[];
  totalPages: number;
};

export async function getNotesClient({
  page = 1,
  search = '',
  tag = '',
  perPage = 12,
}: FetchNotesParams = {}): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = { page, perPage };
  if (search) params.search = search;
  if (tag && tag !== 'All') params.tag = tag;

  const res = await nextServer.get<FetchNotesResponse>('/notes', { params });

  return res.data;
}

export async function getNoteById(id: string): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(note: CreateNoteData): Promise<Note> {
  const { data } = await nextServer.post<Note>('/notes', note);
  return data;
}

export async function deleteNote(id: string): Promise<Note | null> {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data ?? null;
}
