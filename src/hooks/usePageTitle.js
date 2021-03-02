import { useRouter } from 'next/router';
import { app } from '@util/constants';

export default function usePageTitle(title) {
  const router = useRouter();
  const slug = router?.query?.slug ?? router?.route?.replace('/', '') ?? '';

  if (title) return title;
  if (!slug) return app.meta.title;

  return slug
    .toLowerCase()
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
}
