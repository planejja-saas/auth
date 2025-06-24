// src/app/cadastro/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function CadastroPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  // Company info
  const [companyName, setCompanyName] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [phone, setPhone] = useState('')
  const [companyEmail, setCompanyEmail] = useState('')

  // User info
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      nextStep()
    } else {
      if (password !== confirmPassword) {
        alert('As senhas não conferem.')
        return
      }
      // TODO: enviar dados para API de cadastro
      router.push('/')
    }
  }

  const renderIndicator = () => (
    <div className="flex justify-center mb-6 space-x-2">
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= i ? 'bg-[#FA8F24] text-white' : 'bg-gray-200 text-gray-500'
          }`}
        >
          {i}
        </div>
      ))}
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">
            Cadastro em 3 passos
          </h1>
          {renderIndicator()}

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                {/* Informações da Empresa */}
                <div>
                  <label htmlFor="companyName" className="block text-base font-medium text-gray-700 mb-1">
                    Nome da empresa
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FA8F24] focus:ring-2 focus:ring-[#FA8F24] text-base"
                  />
                </div>
                <div>
                  <label htmlFor="cnpj" className="block text-base font-medium text-gray-700 mb-1">
                    CNPJ
                  </label>
                  <input
                    id="cnpj"
                    type="text"
                    value={cnpj}
                    onChange={e => setCnpj(e.target.value)}
                    required
                    placeholder="00.000.000/0000-00"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FA8F24] focus:ring-2 focus:ring-[#FA8F24] text-base"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-base font-medium text-gray-700 mb-1">
                    Endereço
                  </label>
                  <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FA8F24] focus:ring-2 focus:ring-[#FA8F24] text-base"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-base font-medium text-gray-700 mb-1">
                      Cidade
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FA8F24] focus:ring-2 focus:ring-[#FA8F24] text-base"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-base font-medium text-gray-700 mb-1">
                      Estado
                    </label>
                    <input
                      id="state"
                      type="text"
                      value={state}
                      onChange={e => setState(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FA8F24] focus:ring-2 focus:ring-[#FA8F24] text-base"
                    />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-base font-medium text-gray-700 mb-1">
                      CEP
                    </label>
                    <input
                      id="zip"
                      type="text"
                      value={zip}
                      onChange={e => setZip(e.target.value)}
                      required
                      placeholder="00000-000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FA8F24] focus:ring-2 focus:ring-[#FA8F24] text-base"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-base font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    placeholder="(00) 00000-0000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FA8F24] focus:ring-2 focus:ring-[#FA8F24] text-base"
                  />
                </div>
                <div>
                  <label htmlFor="companyEmail" className="block text-base font-medium text-gray-700 mb-1">
                    Email da empresa
                  </label>
                  <input
                    id="companyEmail"
                    type="email"
                    value={companyEmail}
                    onChange={e => setCompanyEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FA8F24] focus:ring-2 focus:ring-[#FA8F24] text-base"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                {/* Informações do Usuário */}
                <div>
                  <label htmlFor="userName" className="block text-base font-medium text-gray-700 mb-1">
                    Seu nome
                  </label>
                  <input
                    id="userName"
                    type="text"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FA8F24] focus:ring-2 focus:ring-[#FA8F24] text-base"
                  />
                </div>
                <div>
                  <label htmlFor="userEmail" className="block text-base font-medium text-gray-700 mb-1">
                    Email do usuário
                  </label>
                  <input
                    id="userEmail"
                    type="email"
                    value={userEmail}
                    onChange={e => setUserEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FA8F24] focus:ring-2 focus:ring-[#FA8F24] text-base"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-1">
                    Senha
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FA8F24] focus:ring-2 focus:ring-[#FA8F24] text-base"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-base font-medium text-gray-700 mb-1">
                    Confirmar senha
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#FA8F24] focus:ring-2 focus:ring-[#FA8F24] text-base"
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                {/* Revisão */}
                <div className="space-y-2 text-gray-700">
                  <p><strong>Nome da empresa:</strong> {companyName}</p>
                  <p><strong>CNPJ:</strong> {cnpj}</p>
                  <p><strong>Endereço:</strong> {address}, {city} - {state}, {zip}</p>
                  <p><strong>Telefone:</strong> {phone}</p>
                  <p><strong>Email empresa:</strong> {companyEmail}</p>
                  <p><strong>Nome usuário:</strong> {userName}</p>
                  <p><strong>Email usuário:</strong> {userEmail}</p>
                </div>
              </>
            )}

            <div className="flex justify-between mt-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 text-base text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                >
                  Anterior
                </button>
              ) : <div />}

              <button
                type="submit"
                className="px-6 py-2 text-base text-white bg-[#FA8F24] font-semibold rounded-md hover:bg-[#e38d1f] transition"
              >
                {step < 3 ? 'Próximo' : 'Confirmar Cadastro'}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-base text-gray-600">
            Já tem conta?{' '}
            <Link href="/" className="text-[#FA8F24] font-semibold hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
