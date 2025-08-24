export type NoteTag =
  | 'All'
  | 'Todo'
  | 'Work'
  | 'Personal'
  | 'Meeting'
  | 'Shopping';

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}
// Добавляем интерфейсы для API
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
