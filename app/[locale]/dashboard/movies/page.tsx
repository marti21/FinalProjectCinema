import {getTranslations} from 'next-intl/server';
 
export default async function Index() {
  const t = await getTranslations('LoginRegister');

  return <h1>{t('Password')}</h1>;
}