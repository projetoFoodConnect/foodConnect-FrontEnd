import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        {...props}
        className="border rounded-md px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
      />
    </div>
  )
}
