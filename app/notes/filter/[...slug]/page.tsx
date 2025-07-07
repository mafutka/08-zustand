import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api';
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{ slug: string[] }>;
};

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

// Для файлу сторінки app\\notes\\filter\\[...slug]\\page.tsx 
// реалізуйте експорт асинхронної функції generateMetadata,
//  яка повертатиме об'єкт з полями title та description. 
//  Значення цих полів мають містити назву і короткий опис сторінки 
//  з вказанням обраного фільтру. Додайте також Open Graph мета-теги title,
//   description, url та imagesз відповідними значеннями.
