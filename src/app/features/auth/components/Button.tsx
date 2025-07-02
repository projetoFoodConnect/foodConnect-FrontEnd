import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition"
    >
      {children}
    </button>
  )
}
