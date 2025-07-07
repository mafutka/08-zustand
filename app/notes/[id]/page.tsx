import NoteDetailsClient from './NoteDetails.client';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata ({params}: Props) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return { 
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 100),
      url: `https://notehub-public.goit.study/api/notes/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
  }
}

export default async function NoteDetailsPage({
 params}: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id], 
    queryFn: () => fetchNoteById(id),  
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}

// Для файлу сторінки з деталями app\\notes\\[id]\\page.tsx
// реалізуйте експорт асинхронної функції generateMetadata, 
// яка повертатиме об'єкт з полями title та description. 
// Значення цих полів мають містити заголовок і короткий опис відповідної нотатки.
//  Додайте також Open Graph мета-теги title, description, 
//  url та imagesз відповідними значеннями.