'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from './components/Header'
import Footer from './components/Footer'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: chamada real de login
    router.push('/orcamentos')
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <Header />

      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Bem-vindo!
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#FA8F24] focus:ring-2 focus:ring-[#FA8F24] text-base"
              />
            </div>

            {/* Senha */}
            <div>
              <label
                htmlFor="password"
                className="block text-base font-medium text-gray-700 mb-2"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#FA8F24] focus:ring-2 focus:ring-[#FA8F24] text-base"
              />
            </div>

            {/* Botão Entrar */}
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-3 border border-[#FA8F24] text-gray-700 font-semibold rounded-md transition-colors hover:bg-[#FA8F24] hover:text-[#1C140D] text-base"
            >
              Entrar
            </button>
          </form>

          <p className="mt-6 text-center text-base text-gray-600">
            Não tem conta?{' '}
            <Link
              href="/cadastro"
              className="text-[#FA8F24] font-semibold hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
