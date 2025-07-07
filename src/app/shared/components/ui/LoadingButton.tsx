import type { ButtonHTMLAttributes } from "react"

interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  children: React.ReactNode
}

export function LoadingButton({ loading, children, disabled, ...props }: BotaoProps) {
  return (
    <button
      disabled={loading || disabled}
      className={`px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
      {...props}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  )
}