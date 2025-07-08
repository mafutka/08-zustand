import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api';
import NotesClient from './Notes.client';

import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params; 
  const tag = slug[0] === "all" ? "All notes" : slug[0];

  return {
    title: `Notes: ${tag || 'All'}`,
    description: `Filtered notes by tag: ${tag || 'All'}`,
     openGraph: {
      title: `Note: ${tag}`,
      description: `Notes are sorted by ${tag}`,
      url: `https://notehub.app/notes/filter/${(await params).slug.join("/")}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub img`,
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params; 

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

// Повернутий об'єкт метаданих з generateMetadata не містить обов'язкової властивості 
// openGraph з вкладеними полями (title, description, url та images). 
// Ця відсутність означає, що метадані неповні і не повністю відповідають вимогам SEO та соціального поширення.
