import NoteDetailsClient from './NoteDetails.client';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetailsPage({
 params}: NoteDetailsProps) {
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