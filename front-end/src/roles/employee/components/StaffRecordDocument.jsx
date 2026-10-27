import { familyGroups, familyMembersMock, sortFamilyMembers } from '../data/familyRelations'
import { personalProfileMock } from '../data/personalProfileForm'
import { formatDate, positionRecordsMock, sortPositionRecords } from '../data/positionHistory'
import { formatMonthYear as formatTrainingMonth, sortTrainingRecords, trainingRecordsMock } from '../data/trainingHistory'
import { formatMonthYear, sortWorkRecords, workRecordsMock } from '../data/workHistory'
import StaffRecordSection, { FactList, RecordTable } from './StaffRecordSection'

function period(start, end, format) {
  const from = format(start)
  if (!from) return '—'
  return `${from} – ${format(end) || 'Đến nay'}`
}

function Portrait({ src, name }) {
  return (
    <div className="mx-auto h-[148px] w-[108px] shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-50 sm:mx-0">
      {src ? (
        <img src={src} alt={`Ảnh chân dung của ${name}`} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full items-center justify-center px-2 text-center text-xs text-slate-400">Ảnh 4×6</div>
      )}
    </div>
  )
}

export default function StaffRecordDocument() {
  const profile = personalProfileMock
  const trainingRows = sortTrainingRecords(trainingRecordsMock).map((record) => ({
    key: record.id,
    cells: {
      time: period(record.startMonth, record.endMonth, formatTrainingMonth),
      school: record.schoolName,
      major: record.major,
      form: record.trainingForm,
      credential: record.credential,
    },
  }))
  const workRows = sortWorkRecords(workRecordsMock).map((record) => ({
    key: record.id,
    cells: {
      time: period(record.startMonth, record.endMonth, formatMonthYear),
      position: record.position,
      organization: record.organization,
    },
  }))
  const positionRows = sortPositionRecords(positionRecordsMock).map((record) => ({
    key: record.id,
    cells: {
      position: record.position,
      organization: record.organization,
      time: period(record.fromDate, record.toDate, formatDate),
      decision: record.decisionNumber,
      decisionDate: formatDate(record.decisionDate),
    },
  }))

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] print:overflow-visible print:rounded-none print:border-0 print:shadow-none">
      <header className="border-b border-slate-200 bg-gradient-to-r from-blue-50/80 via-white to-white px-5 py-7 sm:px-8">
        <div className="flex flex-col-reverse gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="inline-flex items-center rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-semibold tracking-wide text-brand uppercase">
              Mẫu 2C-BNV/2008
            </p>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Lý lịch viên chức
            </h1>
            <p className="mt-4 text-xl font-semibold text-slate-900">{profile.fullName}</p>
            <p className="mt-1 text-sm text-slate-600">{profile.currentPosition}</p>
          </div>
          <Portrait src={profile.portrait} name={profile.fullName} />
        </div>
      </header>

      <div className="space-y-8 px-5 py-7 sm:px-8">
        <StaffRecordSection index={1} title="Thông tin cá nhân">
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-medium text-slate-800">Bản thân</h3>
              <FactList
                items={[
                  { label: 'Họ và tên khai sinh', value: profile.fullName },
                  { label: 'Tên gọi khác', value: profile.otherName },
                  { label: 'Ngày sinh', value: formatDate(profile.dateOfBirth) },
                  { label: 'Giới tính', value: profile.gender },
                  { label: 'Nơi sinh', value: profile.birthPlace, wide: true },
                  { label: 'Quê quán', value: profile.hometown, wide: true },
                  { label: 'Dân tộc', value: profile.ethnicity },
                  { label: 'Tôn giáo', value: profile.religion },
                  { label: 'Nơi đăng ký hộ khẩu thường trú', value: profile.permanentAddress, wide: true },
                  { label: 'Nơi ở hiện nay', value: profile.currentAddress, wide: true },
                  { label: 'Số CMND/CCCD', value: profile.identityNumber },
                  { label: 'Ngày cấp', value: formatDate(profile.identityIssueDate) },
                  { label: 'Số sổ BHXH', value: profile.socialInsuranceNumber, wide: true },
                ]}
              />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-medium text-slate-800">Tuyển dụng và chức vụ hiện tại</h3>
              <FactList
                items={[
                  { label: 'Nghề nghiệp khi được tuyển dụng', value: profile.recruitmentJob },
                  { label: 'Ngày tuyển dụng', value: formatDate(profile.recruitmentDate) },
                  { label: 'Cơ quan tuyển dụng', value: profile.recruitmentAgency, wide: true },
                  { label: 'Chức vụ hiện tại', value: profile.currentPosition },
                  { label: 'Ngày bổ nhiệm', value: formatDate(profile.appointmentDate) },
                  { label: 'Công việc chính đang làm', value: profile.mainDuty, wide: true },
                  { label: 'Ngạch công chức', value: profile.civilServiceRank },
                  { label: 'Mã ngạch', value: profile.rankCode },
                  { label: 'Ngày bổ nhiệm ngạch', value: formatDate(profile.rankAppointmentDate) },
                  {
                    label: 'Bậc lương, hệ số',
                    value: `Bậc ${profile.salaryGrade}, hệ số ${profile.salaryCoefficient}`,
                  },
                  { label: 'Ngày hưởng lương', value: formatDate(profile.salaryEffectiveDate) },
                  { label: 'Phụ cấp chức vụ', value: profile.positionAllowance },
                  { label: 'Phụ cấp khác', value: profile.otherAllowance },
                ]}
              />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-medium text-slate-800">Trình độ, đảng và khen thưởng</h3>
              <FactList
                items={[
                  { label: 'Giáo dục phổ thông', value: profile.generalEducation },
                  { label: 'Trình độ chuyên môn cao nhất', value: profile.highestQualification },
                  { label: 'Lý luận chính trị', value: profile.politicalTheory },
                  { label: 'Quản lý nhà nước', value: profile.stateManagement },
                  { label: 'Ngoại ngữ', value: profile.foreignLanguage },
                  { label: 'Tin học', value: profile.informationTechnology },
                  { label: 'Ngày vào Đảng', value: formatDate(profile.partyJoinDate) },
                  { label: 'Ngày chính thức', value: formatDate(profile.partyOfficialDate) },
                  { label: 'Tổ chức chính trị - xã hội', value: profile.socialOrgJoinDate, wide: true },
                  { label: 'Khen thưởng', value: profile.rewards, wide: true },
                  { label: 'Kỷ luật', value: profile.discipline, wide: true },
                  { label: 'Ngày nhập ngũ', value: formatDate(profile.enlistmentDate) },
                  { label: 'Ngày xuất ngũ', value: formatDate(profile.dischargeDate) },
                  { label: 'Quân hàm cao nhất', value: profile.highestMilitaryRank },
                  { label: 'Danh hiệu được phong tặng', value: profile.honoraryTitles, wide: true },
                  { label: 'Sở trường công tác', value: profile.strengths, wide: true },
                  { label: 'Tình trạng sức khỏe', value: profile.healthStatus },
                  { label: 'Chiều cao', value: profile.height ? `${profile.height} cm` : '' },
                  { label: 'Cân nặng', value: profile.weight ? `${profile.weight} kg` : '' },
                  { label: 'Nhóm máu', value: profile.bloodType },
                  { label: 'Thương binh', value: profile.warInvalid },
                  { label: 'Con gia đình chính sách', value: profile.policyFamily },
                ]}
              />
            </div>
          </div>
        </StaffRecordSection>

        <StaffRecordSection index={2} title="Quá trình đào tạo">
          <RecordTable
            emptyLabel="Chưa có quá trình đào tạo."
            columns={[
              { key: 'time', label: 'Thời gian', className: 'whitespace-nowrap' },
              { key: 'school', label: 'Cơ sở đào tạo' },
              { key: 'major', label: 'Chuyên ngành' },
              { key: 'form', label: 'Hình thức', className: 'whitespace-nowrap' },
              { key: 'credential', label: 'Văn bằng, chứng chỉ' },
            ]}
            rows={trainingRows}
          />
        </StaffRecordSection>

        <StaffRecordSection index={3} title="Quá trình công tác">
          <RecordTable
            emptyLabel="Chưa có quá trình công tác."
            columns={[
              { key: 'time', label: 'Thời gian', className: 'whitespace-nowrap' },
              { key: 'position', label: 'Chức danh, chức vụ', cellClassName: 'font-medium text-slate-900' },
              { key: 'organization', label: 'Đơn vị công tác' },
            ]}
            rows={workRows}
          />
        </StaffRecordSection>

        <StaffRecordSection index={4} title="Quan hệ gia đình">
          <div className="space-y-6">
            {familyGroups.map((group) => {
              const members = sortFamilyMembers(familyMembersMock.filter((member) => member.groupId === group.id))
              return (
                <div key={group.id}>
                  <h3 className="mb-1 text-sm font-medium text-slate-800">{group.title}</h3>
                  <p className="mb-3 text-xs text-slate-500">{group.description}</p>
                  <RecordTable
                    emptyLabel="Chưa có thông tin."
                    columns={[
                      { key: 'relation', label: 'Quan hệ', className: 'whitespace-nowrap' },
                      { key: 'name', label: 'Họ và tên', cellClassName: 'font-medium text-slate-900' },
                      { key: 'year', label: 'Năm sinh', className: 'whitespace-nowrap' },
                      { key: 'details', label: 'Thông tin khác' },
                    ]}
                    rows={members.map((member) => ({
                      key: member.id,
                      cells: {
                        relation: member.relation,
                        name: member.fullName,
                        year: member.birthYear,
                        details: member.details,
                      },
                    }))}
                  />
                </div>
              )
            })}
          </div>
        </StaffRecordSection>

        <StaffRecordSection index={5} title="Lịch sử chức vụ">
          <RecordTable
            emptyLabel="Chưa có lịch sử chức vụ."
            columns={[
              { key: 'position', label: 'Chức danh / Chức vụ', cellClassName: 'font-medium text-slate-900' },
              { key: 'organization', label: 'Đơn vị công tác' },
              { key: 'time', label: 'Thời gian', className: 'whitespace-nowrap' },
              { key: 'decision', label: 'Số quyết định', className: 'whitespace-nowrap' },
              { key: 'decisionDate', label: 'Ngày quyết định', className: 'whitespace-nowrap' },
            ]}
            rows={positionRows}
          />
        </StaffRecordSection>
      </div>
    </article>
  )
}
