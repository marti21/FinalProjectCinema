import type { Metadata } from 'next'
import '../globals.css'
import { Providers } from '@/app/ui/providers'
import { dir } from 'i18next'
import {notFound} from 'next/navigation';
import {NextIntlClientProvider, useMessages} from 'next-intl';
import {unstable_setRequestLocale} from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Generated by create next app',
}

const locales = ['en', 'es'];
export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default function RootLayout({
  children, params: {locale}
}: {
  children: React.ReactNode, params: {locale:any}
}) {
  if (!locales.includes(locale as any)) notFound();
  unstable_setRequestLocale(locale);

  const messages = useMessages();

  return (
    <html lang={locale}>
      <head />
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}