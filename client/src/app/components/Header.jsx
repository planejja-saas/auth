'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)] py-6 px-4">
      <Link href="/">
        <img src="/planejjapng.png" alt="Planejja" className="h-5 mx-auto" />
      </Link>
    </header>
  )
}
