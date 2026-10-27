import {
  CircleCheck,
  ClipboardList,
  CloudUpload,
  FileBadge,
  FileUser,
  Grid2x2,
  Users,
} from 'lucide-react'

function IconFrame({ children }) {
  return <span className="inline-flex items-center justify-center">{children}</span>
}

export function PersonalProfileIcon() {
  return (
    <IconFrame>
      <FileUser className="h-11 w-11 text-slate-800" strokeWidth={1.6} />
    </IconFrame>
  )
}

export function FamilyRelationIcon() {
  return (
    <span className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-[#2563eb] text-[#2563eb]">
      <Users className="h-7 w-7" strokeWidth={1.7} />
    </span>
  )
}

export function TrainingIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
      <rect x="16" y="3" width="16" height="7" rx="1.5" fill="#f5b400" />
      <rect x="7" y="8" width="34" height="36" rx="3" fill="#3b82f6" />
      <rect x="12" y="15" width="12" height="14" rx="1.5" fill="#eff6ff" />
      <circle cx="18" cy="20" r="2.4" fill="#1e3a8a" />
      <path
        d="M14.2 27.2c.9-1.8 2-2.6 3.8-2.6s2.9.8 3.8 2.6"
        stroke="#1e3a8a"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M28 18h8M28 23h8M28 28h6" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function WorkHistoryIcon() {
  return (
    <span className="relative inline-flex text-slate-700">
      <ClipboardList className="h-11 w-11" strokeWidth={1.6} />
      <CircleCheck
        className="absolute -right-0.5 -bottom-0.5 h-[18px] w-[18px] fill-white text-emerald-500"
        strokeWidth={2.25}
      />
    </span>
  )
}

export function LanguageIcon() {
  return (
    <IconFrame>
      <FileBadge className="h-11 w-11 text-slate-800" strokeWidth={1.6} />
    </IconFrame>
  )
}

export function PositionHistoryIcon() {
  return (
    <IconFrame>
      <Grid2x2 className="h-11 w-11 text-slate-900" strokeWidth={1.7} />
    </IconFrame>
  )
}

export function DigitalProfileIcon() {
  return (
    <IconFrame>
      <CloudUpload className="h-12 w-12 text-sky-400" strokeWidth={1.6} />
    </IconFrame>
  )
}

export function StaffRecordIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
      <rect x="6" y="8" width="22" height="28" rx="2" fill="#0f766e" />
      <rect x="16" y="14" width="26" height="28" rx="2" fill="#f8fafc" stroke="#e2e8f0" />
      <path d="M22 24h14M22 29h14M22 34h9" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
