import type { Metadata } from 'next'
import Section from '../../ui/Section'
import Link from 'next/link'
import '@/app/ui/navBar.css'
import Dropdown from '../../ui/Dropdown'
import {unstable_setRequestLocale} from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Generated by create next app',
}

export default async function Dashboard({
  children, params: {locale}
}: {
  children: React.ReactNode,params: {locale:any}

}) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <nav className='min-w-screen sm:h-[100px] h-[80px] dark:bg-black bg-white text-black dark:text-white font-semibold flex items-center justify-around sm:justify-end sm:gap-20 sm:pr-80 text-lg'>
        <div className='sm:hidden'>-</div>
        <Link href="/dashboard" className='hidden sm:block navButton'>Dashboard</Link>
        <Link href="/dashboard/movies" className='hidden sm:block navButton'>Dashboard</Link>
        <Dropdown></Dropdown>
      </nav>
     
      <div className='flex flex-row'>
        <Section />
        {children}
      </div>
    </>
  )
}
