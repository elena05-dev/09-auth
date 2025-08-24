'use client';

import { useState } from 'react';
import {
  useQuery,
  UseQueryResult,
  keepPreviousData,
} from '@tanstack/react-query';
import { useDebounce } from '@/hooks/useDebouncedValue';
import type { Note } from '@/types/note';
import { fetchNotes, type FetchNotesResponse } from '@/lib/api/clientApi';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import css from './NotesPage.module.css';
import ToastContainer from '@/components/ToastContainer/ToastContainer';
import Link from 'next/link';

interface NotesClientProps {
  initialNotes: Note[];
  initialTotalPages: number;
  tag: string;
}

export default function NotesClient({
  initialNotes,
  initialTotalPages,
  tag,
}: NotesClientProps) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
    error,
  }: UseQueryResult<FetchNotesResponse, Error> = useQuery<FetchNotesResponse>({
    queryKey: ['notes', debouncedSearch, page, tag],
    queryFn: () => fetchNotes(debouncedSearch, page, tag),
    initialData: {
      notes: initialNotes,
      totalPages: initialTotalPages,
    },
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes || [];
  const pageCount = data?.totalPages ?? 1;

  if (isError && error) throw error;

  return (
    <div className={css.app}>
      <ToastContainer />

      <header className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
        {pageCount > 1 && (
          <Pagination
            totalPages={pageCount}
            currentPage={page}
            onPageChange={(nextPage: number) => setPage(nextPage)}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading && <p>Loading...</p>}

      {!isLoading && !isError && (
        <>
          {notes.length > 0 ? (
            <NoteList notes={notes} />
          ) : (
            <p>No notes found.</p>
          )}
        </>
      )}
    </div>
  );
}
