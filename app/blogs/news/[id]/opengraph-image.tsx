import OpengraphImage from 'components/opengraph-image';
import { getArticle } from 'lib/shopify';

export default async function Image({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);
  const title = article[0]?.title;
  return await OpengraphImage({ title });
}
