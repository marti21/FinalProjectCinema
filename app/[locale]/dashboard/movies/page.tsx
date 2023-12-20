import {getTranslations} from 'next-intl/server';
import {unstable_setRequestLocale} from 'next-intl/server';

export default async function Index({params: {locale}}: {params:{locale: string}}) {
  const t = await getTranslations('LoginRegister');
  unstable_setRequestLocale(locale);

  return <h1>{t('Password')}</h1>;
}