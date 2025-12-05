import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { Icons } from './Icons'
import { buttonVariants } from './ui/Button'
import { UserAccountNav } from './UserAccountNav'
import SearchBar from './SearchBar'

const Navbar = async () => {
  const session = await getServerSession(authOptions)
  return (
    <header className='fixed top-0 inset-x-0 h-16 bg-white/95 backdrop-blur border-b border-indigo-100 z-[10] py-3'>
      <nav aria-label='Main navigation' className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-3'>
        {/* logo */}
        <Link href='/' aria-label='Threadspace home' className='flex gap-2 items-center text-indigo-600'>
          <Icons.logo className='h-8 w-8' />
          <span className='hidden text-slate-900 text-lg font-bold tracking-tight md:block'>Threadspace</span>
        </Link>

        {/* search bar */}
        <SearchBar />

        {/* actions */}
        <div className='flex items-center gap-3'>
        <Link href='/r/create' className='hidden text-sm font-semibold text-indigo-700 hover:text-indigo-900 lg:block'>Create community</Link>
        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href='/sign-in' className={buttonVariants()}>
            Sign In
          </Link>
        )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
