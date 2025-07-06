import { Spinner } from './Spinner'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  children: React.ReactNode
}

export function LoadingButton({ loading, children, ...props }: Props) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700 disabled:opacity-60 ${props.className}`}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}