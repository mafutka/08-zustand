import { Metadata } from 'next';
import css from './not-found.module.css';

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "Sorry, the page you are looking for does not exist.",
  openGraph: {
    title: "404 - Page Not Found",
    description: "Sorry, the page you are looking for does not exist.",
    url: "https://notehub-public.goit.study/not-found", // або свій домен
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notehub 404 preview",
      },
    ],
  },
};

const NotFound = () => {


return (
    <div className={css.container}>
        <h1 className={css.title}>
            404 - Page not found
        </h1>
        <p className={css.description}>
            Sorry, the page you are looking for does not exist.
        </p>
    </div>
    )}

    export default NotFound;

    // Для файлу сторінки app\\not-found.tsx реалізуйте експорт об’єкта metadata
    //  з полями title, description та url. 
    //  Значення цих полів мають містити назву і короткий опис сторінки
    //   з вказанням того, що такої сторінки не існує. 
    //   Додайте також Open Graph мета-теги title, description, url 
    //   та imagesз відповідними значеннями.

