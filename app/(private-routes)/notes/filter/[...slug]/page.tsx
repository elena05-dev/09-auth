import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api/serverApi';
import { Metadata } from 'next';
import type { NoteTag } from '@/types/note';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rawTag = slug?.[0];
  const tag: NoteTag | undefined =
    rawTag === 'All' ? undefined : (rawTag as NoteTag);

  const title = `Notes filtered by: ${tag ?? 'All'} — NoteHub`;
  const description = `Browse your notes filtered by "${tag ?? 'All'}" in NoteHub. Quickly find the ideas and tasks you need.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://09-auth-azure-eight.vercel.app/`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notes filtered by ${tag ?? 'All'}`,
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0] === 'All' ? '' : slug?.[0];
  const rawData = await fetchNotes('', 1, tag);
  return <NotesClient initialData={rawData} initialTag={tag} />;
}
