# Sơ Đồ Thực Thể Quan Hệ (ERD) - Hệ Thống Quản Lý Cán Bộ, Công Chức, Viên Chức

## 1. Sơ Đồ ERD Trực Quan (Entity Relationship Diagram)

```mermaid
erDiagram
    Units ||--o{ Users : "thuoc_ve"
    Units ||--o{ EmployeeProfiles : "truc_thuoc"
    Users ||--o{ UserRoles : "co_vai_tro"
    Roles ||--o{ UserRoles : "duoc_gan"
    Users ||--o| UserEmployeeLinks : "lien_ket_1_1"
    EmployeeProfiles ||--o| UserEmployeeLinks : "gan_tai_khoan"
    EmployeeProfiles ||--o{ TrainingHistories : "qua_trinh_dao_tao"
    EmployeeProfiles ||--o{ WorkHistories : "qua_trinh_cong_tac"
    EmployeeProfiles ||--o{ FamilyRelations : "quan_he_gia_dinh"
    EmployeeProfiles ||--o{ SalaryHistories : "lich_su_luong"
    EmployeeProfiles ||--o{ PositionHistories : "lich_su_chuc_vu"
    EmployeeProfiles ||--o{ ProfileAttachments : "ho_so_so_hoa"
    EmployeeProfiles ||--o{ ProfileUpdateRequests : "yeu_cau_chinh_sua"
    Users ||--o{ ProfileUpdateRequests : "nguoi_gui_yeu_cau"
    Users ||--o{ ProfileUpdateRequests : "nguoi_phe_duyet"
    Users ||--o{ ProfileAttachments : "nguoi_tai_len"
    Users ||--o{ AuditLogs : "thuc_hien_tac_vu"
    Users ||--o{ EmployeeProfiles : "nguoi_tao_ho_so"
    Users ||--o{ EmployeeProfiles : "nguoi_cap_nhat_ho_so"

    Units {
        int UnitId PK
        string UnitCode UK
        string UnitName
        string Description
        boolean IsActive
        datetime CreatedAt
    }

    Roles {
        int RoleId PK
        string RoleCode UK
        string RoleName
        string Description
        boolean IsActive
    }

    Users {
        int UserId PK
        int UnitId FK
        string Username UK
        string PasswordHash
        string FullName
        string Email
        string Phone
        boolean IsActive
        boolean MustChangePassword
        datetime LastLoginAt
        datetime CreatedAt
        datetime UpdatedAt
    }

    UserRoles {
        int UserId PK,FK
        int RoleId PK,FK
        datetime AssignedAt
    }

    EmployeeProfiles {
        int EmployeeId PK
        int UnitId FK
        string EmployeeCode UK
        string BirthName
        string OtherName
        date DateOfBirth
        string Gender
        string BirthPlace
        string Hometown
        string Ethnicity
        string Religion
        string PermanentAddress
        string CurrentAddress
        string RecruitmentOccupation
        date RecruitmentDate
        string RecruitmentAgency
        string CurrentPosition
        date AppointmentDate
        string MainDuty
        string CivilServiceRank
        date RankAppointmentDate
        string RankCode
        string EducationLevel
        string HighestQualification
        string PoliticalTheory
        string StateManagementLevel
        string ForeignLanguage
        string ComputerSkill
        date PartyJoinDate
        date OfficialPartyDate
        string HighestHonorTitle
        string Rewards
        string Discipline
        string HealthStatus
        string IdentityNumber
        string SocialInsuranceNumber
        string PortraitPhoto
        string ProfileStatus
        int CreatedBy FK
        int UpdatedBy FK
        boolean IsDeleted
    }

    UserEmployeeLinks {
        int UserId PK,FK
        int EmployeeId UK,FK
        datetime CreatedAt
    }

    TrainingHistories {
        int TrainingId PK
        int EmployeeId FK
        string SchoolName
        string Major
        date FromDate
        date ToDate
        string TrainingType
        string Certificate
        string Notes
    }

    WorkHistories {
        int WorkId PK
        int EmployeeId FK
        date FromDate
        date ToDate
        string PositionTitle
        string WorkingUnit
        string JobDescription
        string Notes
    }

    FamilyRelations {
        int RelationId PK
        int EmployeeId FK
        string Relationship
        string FullName
        int YearOfBirth
        string Occupation
        string Workplace
        string Address
        string Side
    }

    SalaryHistories {
        int SalaryHistoryId PK
        int EmployeeId FK
        date MonthYear
        string RankCode
        string Grade
        decimal Coefficient
        decimal AllowanceCoefficient
        string DecisionNumber
        date DecisionDate
    }

    PositionHistories {
        int PositionHistoryId PK
        int EmployeeId FK
        string PositionTitle
        string UnitName
        date FromDate
        date ToDate
        string DecisionNumber
        date DecisionDate
    }

    ProfileAttachments {
        bigint AttachmentId PK
        int EmployeeId FK
        string FileName
        string OriginalFileName
        string FileUrl
        string FileType
        bigint FileSize
        int UploadedBy FK
        datetime UploadedAt
        boolean IsDeleted
    }

    ProfileUpdateRequests {
        bigint RequestId PK
        int EmployeeId FK
        int RequestedBy FK
        string RequestTitle
        string RequestDescription
        string RequestedChanges
        string RequestStatus
        int ReviewedBy FK
        datetime ReviewedAt
        string ReviewComment
    }

    AuditLogs {
        bigint AuditLogId PK
        int UserId FK
        string ActionName
        string EntityName
        string EntityId
        string OldData
        string NewData
        string IpAddress
        datetime CreatedAt
    }
```

---

## 2. Danh Sách & Mô Tả Chi Tiết 14 Bảng Thực Thể

| STT | Tên Bảng (Entity) | Khóa Chính (PK) | Khóa Ngoại (FK) | Ý Nghĩa Nghiệp Vụ |
|:---:|:---|:---|:---|:---|
| 1 | **Units** | `UnitId` | Không | Quản lý cây phòng ban / đơn vị trực thuộc cơ quan |
| 2 | **Roles** | `RoleId` | Không | Danh mục vai trò trong hệ thống (ADMIN, HR_MANAGER, UNIT_MANAGER, HR_OFFICER, EMPLOYEE) |
| 3 | **Users** | `UserId` | `UnitId` | Tài khoản đăng nhập hệ thống, mật khẩu mã hóa BCrypt |
| 4 | **UserRoles** | `UserId, RoleId` | `UserId, RoleId` | Phân quyền đa vai trò (N - N giữa Users và Roles) |
| 5 | **EmployeeProfiles** | `EmployeeId` | `UnitId, CreatedBy, UpdatedBy` | Bảng lõi quản lý đầy đủ thông tin sơ yếu lý lịch cán bộ, công chức, viên chức (mẫu 2C-BNV/2008 và chuẩn TT 06/2023/TT-BNV) |
| 6 | **UserEmployeeLinks** | `UserId` | `UserId, EmployeeId` | Liên kết 1 - 1 giữa tài khoản đăng nhập và hồ sơ cá nhân |
| 7 | **TrainingHistories** | `TrainingId` | `EmployeeId` | Quá trình đào tạo, bồi dưỡng chuyên môn, văn bằng, chứng chỉ |
| 8 | **WorkHistories** | `WorkId` | `EmployeeId` | Quá trình công tác, cơ quan, chức vụ và nhiệm vụ đảm nhiệm |
| 9 | **FamilyRelations** | `RelationId` | `EmployeeId` | Quan hệ gia đình (về bản thân: bố, mẹ, vợ/chồng, con; và về bên vợ/chồng) |
| 10 | **SalaryHistories** | `SalaryHistoryId` | `EmployeeId` | Quá trình diễn biến tiền lương: ngạch, bậc, hệ số, phụ cấp và số quyết định |
| 11 | **PositionHistories** | `PositionHistoryId` | `EmployeeId` | Lịch sử bổ nhiệm, điều động, giữ các chức vụ lãnh đạo/quản lý |
| 12 | **ProfileAttachments** | `AttachmentId` | `EmployeeId, UploadedBy` | Số hóa hồ sơ: tài liệu, bằng cấp scan, quyết định bổ nhiệm, ảnh thẻ |
| 13 | **ProfileUpdateRequests** | `RequestId` | `EmployeeId, RequestedBy, ReviewedBy` | Quy trình tiếp nhận, phê duyệt đề xuất chỉnh sửa thông tin hồ sơ (lưu delta dưới dạng JSON) |
| 14 | **AuditLogs** | `AuditLogId` | `UserId` | Nhật ký hoạt động toàn hệ thống (Audit Trail) phục vụ giám sát, bảo mật |

---

## 3. Các Ràng Buộc Dữ Liệu Quan Trọng (Constraints & Rules)

1. **Ràng buộc toàn vẹn quan hệ (Referential Integrity):**
   - Không được xóa đơn vị (`Units`) khi còn hồ sơ công chức thuộc đơn vị đó.
   - Khi xóa hồ sơ công chức (`EmployeeProfiles`), thực hiện **Xóa mềm (Soft Delete)** qua cờ `IsDeleted = 1`, không xóa vật lý để bảo toàn lịch sử công tác và kiểm toán.
2. **Ràng buộc kiểm tra (Check Constraints):**
   - Giới tính: `Nam`, `Nữ`, `Khác`.
   - Chiều cao `HeightCm > 0`, Cân nặng `WeightKg > 0`.
   - Ngày sinh `DateOfBirth <= ngày hiện tại`.
   - Trạng thái hồ sơ: `DRAFT`, `PENDING`, `APPROVED`, `REJECTED`, `ACTIVE`, `INACTIVE`.
   - Thời gian đào tạo & công tác: `ToDate >= FromDate`.
   - Chu kỳ lương: `DAY(MonthYear) = 1` (chuẩn hóa về ngày mùng 1 hàng tháng).
   - Dữ liệu đề xuất thay đổi: `ISJSON(RequestedChanges) = 1`.

