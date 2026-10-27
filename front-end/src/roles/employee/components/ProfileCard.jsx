import { Link } from 'react-router-dom'

export default function ProfileCard({ title, to, icon: Icon }) {
  return (
    <Link
      to={to}
      className="group flex h-full min-h-[208px] flex-col items-center rounded-md border border-[#e5e7eb] bg-white px-3 pt-8 pb-6 text-center shadow-[0_1px_2px_rgba(15,23,42,0.05),0_8px_20px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-[0_14px_28px_rgba(30,64,175,0.14)] focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
    >
      <span className="flex h-[68px] items-center justify-center" aria-hidden="true">
        <Icon />
      </span>
      <span className="mt-auto max-w-[15rem] pt-4 text-[15px] leading-snug text-balance text-slate-800">
        {title}
      </span>
    </Link>
  )
}
