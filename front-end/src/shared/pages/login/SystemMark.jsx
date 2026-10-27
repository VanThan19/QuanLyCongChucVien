export default function SystemMark() {
  return (
    <div className="flex justify-center">
      <svg viewBox="0 0 72 72" className="h-[68px] w-[68px]" aria-hidden="true">
        <circle cx="36" cy="36" r="33.5" fill="none" stroke="#1e3a8a" strokeWidth="1.7" />
        <circle cx="36" cy="36" r="29" fill="none" stroke="#1e3a8a" strokeWidth="0.6" />
        <path
          d="M20.5 34.2 36 21.2l15.5 13"
          fill="none"
          stroke="#1e3a8a"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24.5 34.2h23V51a1.8 1.8 0 0 1-1.8 1.8h-19.4A1.8 1.8 0 0 1 24.5 51V34.2Z"
          fill="none"
          stroke="#1e3a8a"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M29.2 41.2h13.6M29.2 45.6h9.2"
          fill="none"
          stroke="#1e3a8a"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
