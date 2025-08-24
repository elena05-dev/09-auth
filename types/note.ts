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

// Інтерфейс для створення нотатки
export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

// Інтерфейс для оновлення нотатки
export interface UpdateNoteData {
  title?: string;
  content?: string;
  tag?: NoteTag;
}
