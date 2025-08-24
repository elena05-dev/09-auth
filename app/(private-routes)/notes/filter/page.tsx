import { fetchNotes } from '@/lib/api/serverApi';
import NoteList from '@/components/NoteList/NoteList';

export const dynamic = 'force-dynamic';

export default async function NotesFilterPage() {
  const { notes } = await fetchNotes('', 1);

  return (
    <div>
      <h1>All Notes</h1>
      <NoteList notes={notes} />
    </div>
  );
}
