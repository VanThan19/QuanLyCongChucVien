const NOTES = [
  'Liên hệ quản trị hệ thống khi quên mật khẩu hoặc tài khoản bị khóa.',
  'Giờ hỗ trợ: 08:00 – 17:00, thứ Hai đến thứ Sáu.',
  'Môi trường thử nghiệm: dùng tài khoản bất kỳ, mật khẩu từ 6 ký tự và đúng mã xác thực.',
]

export default function LoginSupport() {
  return (
    <aside className="hidden border-l border-slate-200 px-8 py-16 md:block lg:px-10">
      <h2 className="text-[15px] font-medium text-slate-900">Thông tin hỗ trợ hệ thống</h2>
      <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
        {NOTES.map((note) => (
          <li key={note} className="flex gap-2.5">
            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-slate-800" aria-hidden="true" />
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
