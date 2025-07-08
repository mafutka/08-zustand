import { NoteForm } from '../../../../components/NoteForm/NoteForm';
import type { Metadata } from 'next';
import css from './create.module.css';

export const metadata: Metadata = {
  title: 'Create Note',
  description: 'Create a new note using the form. Add title, content, and tag.',
  openGraph: {
    title: 'Create Note',
    description: 'Create a new note using the form. Add title, content, and tag.',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Create Note Page',
      },
    ],
  },
};


const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;

// Критичні проблеми:

// Відсутній об'єкт metadata. Не відбувається експорт об'єкта metadata, 
// типізованого як Metadata з пакету next, і не надано метаданих SEO або Open Graph.