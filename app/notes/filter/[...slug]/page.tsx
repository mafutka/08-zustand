import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api';
import NotesClient from './Notes.client';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const rawTag = params.slug?.[0] || '';
  const tag = rawTag.toLowerCase() === 'all' ? '' : rawTag;

  return {
    title: `Notes: ${tag || 'All'}`,
    description: `Filtered notes by tag: ${tag || 'All'}`,
  };
}

export default async function NotesPage({ params }: Props) {
  const { slug } = params; 

  const queryClient = new QueryClient();

  const rawTag = slug?.[0] || '';
  const tag = rawTag.toLowerCase() === 'all' ? '' : rawTag;

  const data = await fetchNotes(1, 12, '', tag);

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => Promise.resolve(data),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialData={data} tag={tag} />
    </HydrationBoundary>
  );
}

// Критичні проблеми:

// Функція generateMetadata повністю відсутня. 
// Немає експорту асинхронної функції generateMetadata, 
// яка повертає Promise<Metadata>, 
// а також відсутня будь-яка логіка динамічних метаданих.
