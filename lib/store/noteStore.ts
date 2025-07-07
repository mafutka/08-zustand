import  { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NewNoteData } from '../api';

type NoteDraftStore = {
  draft: NewNoteData;
  setDraft: (note: NewNoteData) => void;
  clearDraft: () => void;
};


const initialDraft: NewNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
       name: 'note-draft',
       partialize: (state) => ({ draft: state.draft }),
    }
  )
)


// Створіть у папці lib/store файл noteStore.ts і реалізуйте в ньому
//  Zustand-стор з наступними функціями:

// draft: об’єкт, що містить тимчасові дані форми нотатки 
// (title, content, tag).
// setDraft(note): функція для оновлення полів чернетки.
// clearDraft(): функція для очищення чернетки до початкового стану. 
// У якості початкового стану використовуйте наступний об’єкт


// Інтегруйте цей стор у компонент NoteForm. Щоразу при переході 
// на маршрут /notes/action/create перевіряйте, чи існує draft в Zustand. 
// Якщо draft є — завантажуйте саме його в початкові значення форми, 
// якщо немає — то в початкові значення форми підставляйте об’єкт initialDraft.

// У процесі створенні нотатки всі зміни мають зберігатися у draft 
// в Zustand одразу при зміні полів.
//  Для цього використайте подію елементів форми onChange
//  і викликайте setDraft у сторі з актуальними даними.

// При сабміті форми, коли нотатку успішно створено на сервері, 
// очистіть draft через метод clearDraft. 
// При цьому користувач має повернутися на попередній маршрут.

// При натисканні кнопки «Cancel» draft не має очищатися, 
// щоб можна було повернутися до створення пізніше з попереднім прогресом. 
// При цьому користувач має повернутися на попередній маршрут.

// Реалізуйте збереження чернетки нотатки в localStorage 
// за допомогою middleware persist з пакету zustand/middleware. 
// Це дозволить зберігати стан draft навіть після перезавантаження сторінки.