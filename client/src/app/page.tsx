'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from './components/Header'
import Footer from './components/Footer'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_API_URL}/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      )
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json.error || 'Falha no login')
      }

      localStorage.setItem('authToken', json.token)

      window.location.href = 'https://dashboard.planejja.com.br'
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro inesperado'
      alert(message)
      setLoading(false)
    }
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
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#FA8F24] focus:ring-2 focus:ring-[#FA8F24] text-base"
              />
            </div>

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
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#FA8F24] focus:ring-2 focus:ring-[#FA8F24] text-base"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center px-4 py-3 border border-[#FA8F24] font-semibold rounded-md text-base transition-colors ${
                loading
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-[#FA8F24] hover:text-[#1C140D]'
              }`}
            >
              {loading ? 'Entrando…' : 'Entrar'}
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
