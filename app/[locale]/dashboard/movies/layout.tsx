import {unstable_setRequestLocale} from 'next-intl/server';

export default async function MoviesLayout({
  children, params: {locale}
}: {
  children: React.ReactNode,params: {locale:any}

}) {
  unstable_setRequestLocale(locale);

  return (
    <>
        {children}
    </>
  )
}
