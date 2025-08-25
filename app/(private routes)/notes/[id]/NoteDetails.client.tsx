'use client';

import css from './NoteDetails.module.css';
import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getNoteById } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';

export default function NoteDetails() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <div>
        <p>Error loading note: {(error as Error).message}</p>
        <button className={css.backBtn} onClick={() => router.back()}>
          ← Back
        </button>
      </div>
    );
  }

  if (!note) {
    return <p>Note not found.</p>;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>

        <div className={css.content}>{note.content}</div>

        <div className={css.date}>
          Created: {new Date(note.createdAt).toLocaleDateString()} <br />
          Updated: {new Date(note.updatedAt).toLocaleDateString()}
        </div>

        <button className={css.backBtn} onClick={() => router.back()}>
          ← Back
        </button>
      </div>
    </div>
  );
}
