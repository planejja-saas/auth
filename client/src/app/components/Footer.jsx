'use client'

export default function Footer() {
  return (
    <footer className="bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Planejja. Todos os direitos reservados.
      </div>
    </footer>
)
}
