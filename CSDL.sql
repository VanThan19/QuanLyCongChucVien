
-- =========================================================
-- DATABASE QUAN LY CONG CHUC, VIEN CHUC
-- SQL SERVER + SPRING BOOT + REACT
-- PHIEN BAN DA CHINH SUA
-- =========================================================

IF DB_ID(N'QuanLyCongChuc') IS NULL
BEGIN
    CREATE DATABASE QuanLyCongChuc;
END;
GO

USE QuanLyCongChuc;
GO

-- =========================================================
-- 1. BANG DON VI
-- =========================================================

CREATE TABLE Units (
    UnitId INT IDENTITY(1,1) PRIMARY KEY,
    UnitCode VARCHAR(20) NOT NULL UNIQUE,
    UnitName NVARCHAR(200) NOT NULL,
    Description NVARCHAR(500) NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);
GO

-- =========================================================
-- 2. BANG VAI TRO
-- =========================================================

CREATE TABLE Roles (
    RoleId INT IDENTITY(1,1) PRIMARY KEY,
    RoleCode VARCHAR(30) NOT NULL UNIQUE,
    RoleName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500) NULL,
    IsActive BIT NOT NULL DEFAULT 1
);
GO

-- =========================================================
-- 3. BANG TAI KHOAN
-- =========================================================

CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    UnitId INT NULL,
    Username NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    FullName NVARCHAR(200) NOT NULL,
    Email NVARCHAR(255) NULL,
    Phone NVARCHAR(20) NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    MustChangePassword BIT NOT NULL DEFAULT 1,
    LastLoginAt DATETIME2 NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    UpdatedAt DATETIME2 NULL,

    CONSTRAINT FK_Users_Units
        FOREIGN KEY (UnitId) REFERENCES Units(UnitId)
);
GO

-- =========================================================
-- 4. MOT TAI KHOAN CO THE CO NHIEU VAI TRO
-- =========================================================

CREATE TABLE UserRoles (
    UserId INT NOT NULL,
    RoleId INT NOT NULL,
    AssignedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

    CONSTRAINT PK_UserRoles PRIMARY KEY (UserId, RoleId),

    CONSTRAINT FK_UserRoles_Users
        FOREIGN KEY (UserId) REFERENCES Users(UserId),

    CONSTRAINT FK_UserRoles_Roles
        FOREIGN KEY (RoleId) REFERENCES Roles(RoleId)
);
GO

-- =========================================================
-- 5. BANG HO SO LY LICH CHINH
-- =========================================================

CREATE TABLE EmployeeProfiles (
    EmployeeId INT IDENTITY(1,1) PRIMARY KEY,

    -- Don vi va ma ho so
    UnitId INT NOT NULL,
    EmployeeCode NVARCHAR(30) NOT NULL UNIQUE,

    -- Thong tin ca nhan
    BirthName NVARCHAR(200) NOT NULL,
    OtherName NVARCHAR(200) NULL,
    DateOfBirth DATE NULL,
    Gender NVARCHAR(20) NULL,
    BirthPlace NVARCHAR(500) NULL,
    Hometown NVARCHAR(500) NULL,
    Ethnicity NVARCHAR(100) NULL,
    Religion NVARCHAR(100) NULL,
    PermanentAddress NVARCHAR(500) NULL,
    CurrentAddress NVARCHAR(500) NULL,

    -- Thong tin tuyen dung
    RecruitmentOccupation NVARCHAR(200) NULL,
    RecruitmentDate DATE NULL,
    RecruitmentAgency NVARCHAR(300) NULL,

    -- Chuc vu va cong viec hien tai
    CurrentPosition NVARCHAR(200) NULL,
    AppointmentDate DATE NULL,
    MainDuty NVARCHAR(1000) NULL,

    -- Ngach cong chuc
    CivilServiceRank NVARCHAR(200) NULL,
    RankAppointmentDate DATE NULL,
    RankCode NVARCHAR(50) NULL,

    -- Trinh do
    EducationLevel NVARCHAR(200) NULL,
    HighestQualification NVARCHAR(300) NULL,
    PoliticalTheory NVARCHAR(200) NULL,
    StateManagementLevel NVARCHAR(200) NULL,
    ForeignLanguage NVARCHAR(300) NULL,
    ComputerSkill NVARCHAR(300) NULL,

    -- Thong tin Dang
    PartyJoinDate DATE NULL,
    OfficialPartyDate DATE NULL,

    -- To chuc xa hoi
    SocialOrganizationHistory NVARCHAR(MAX) NULL,

    -- Nghia vu quan su
    MilitaryEnlistmentDate DATE NULL,
    MilitaryDischargeDate DATE NULL,
    HighestMilitaryRank NVARCHAR(200) NULL,

    -- Danh hieu, khen thuong, ky luat
    HighestHonorTitle NVARCHAR(300) NULL,
    WorkStrengths NVARCHAR(1000) NULL,
    Rewards NVARCHAR(MAX) NULL,
    Discipline NVARCHAR(MAX) NULL,

    -- Suc khoe
    HealthStatus NVARCHAR(200) NULL,
    HeightCm DECIMAL(5,2) NULL,
    WeightKg DECIMAL(5,2) NULL,
    BloodType NVARCHAR(10) NULL,
    WarInvalidCategory NVARCHAR(100) NULL,
    PolicyFamilyStatus NVARCHAR(300) NULL,

    -- Giay to
    IdentityNumber NVARCHAR(30) NULL,
    IdentityIssueDate DATE NULL,
    SocialInsuranceNumber NVARCHAR(50) NULL,
    PortraitPhoto NVARCHAR(500) NULL,

    -- Ly lich ca nhan va quan he nuoc ngoai
    PersonalHistory NVARCHAR(MAX) NULL,
    ForeignRelationsHistory NVARCHAR(MAX) NULL,
    ForeignRelativesHistory NVARCHAR(MAX) NULL,

    -- Danh gia co quan
    AgencyAssessment NVARCHAR(MAX) NULL,

    -- Trang thai ho so
    ProfileStatus NVARCHAR(30) NOT NULL DEFAULT N'DRAFT',

    -- Theo doi thao tac
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    UpdatedAt DATETIME2 NULL,
    CreatedBy INT NULL,
    UpdatedBy INT NULL,

    -- Xoa mem
    IsDeleted BIT NOT NULL DEFAULT 0,
    DeletedAt DATETIME2 NULL,

    CONSTRAINT FK_EmployeeProfiles_Units
        FOREIGN KEY (UnitId) REFERENCES Units(UnitId),

    CONSTRAINT FK_EmployeeProfiles_CreatedBy
        FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),

    CONSTRAINT FK_EmployeeProfiles_UpdatedBy
        FOREIGN KEY (UpdatedBy) REFERENCES Users(UserId),

    CONSTRAINT CK_EmployeeProfiles_Gender
        CHECK (
            Gender IS NULL
            OR Gender IN (N'Nam', N'Nữ', N'Khác')
        ),

    CONSTRAINT CK_EmployeeProfiles_Height
        CHECK (HeightCm IS NULL OR HeightCm > 0),

    CONSTRAINT CK_EmployeeProfiles_Weight
        CHECK (WeightKg IS NULL OR WeightKg > 0),

    CONSTRAINT CK_EmployeeProfiles_DateOfBirth
        CHECK (
            DateOfBirth IS NULL
            OR DateOfBirth <= CAST(GETDATE() AS DATE)
        ),

    CONSTRAINT CK_EmployeeProfiles_Status
        CHECK (
            ProfileStatus IN (
                N'DRAFT',
                N'PENDING',
                N'APPROVED',
                N'REJECTED',
                N'ACTIVE',
                N'INACTIVE'
            )
        )
);
GO

-- =========================================================
-- 6. LIEN KET TAI KHOAN VOI HO SO CA NHAN
-- =========================================================

CREATE TABLE UserEmployeeLinks (
    UserId INT NOT NULL PRIMARY KEY,
    EmployeeId INT NOT NULL UNIQUE,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

    CONSTRAINT FK_UserEmployeeLinks_Users
        FOREIGN KEY (UserId) REFERENCES Users(UserId),

    CONSTRAINT FK_UserEmployeeLinks_Employees
        FOREIGN KEY (EmployeeId)
        REFERENCES EmployeeProfiles(EmployeeId)
);
GO

-- =========================================================
-- 7. QUA TRINH DAO TAO, BOI DUONG
-- Da doi FromDate, ToDate sang DATE
-- =========================================================

CREATE TABLE TrainingHistories (
    TrainingId INT IDENTITY(1,1) PRIMARY KEY,
    EmployeeId INT NOT NULL,
    SchoolName NVARCHAR(255) NULL,
    Major NVARCHAR(255) NULL,
    FromDate DATE NULL,
    ToDate DATE NULL,
    TrainingType NVARCHAR(100) NULL,
    Certificate NVARCHAR(255) NULL,
    Notes NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

    CONSTRAINT FK_TrainingHistories_Employee
        FOREIGN KEY (EmployeeId)
        REFERENCES EmployeeProfiles(EmployeeId),

    CONSTRAINT CK_TrainingHistories_Dates
        CHECK (
            FromDate IS NULL
            OR ToDate IS NULL
            OR ToDate >= FromDate
        )
);
GO

-- =========================================================
-- 8. QUA TRINH CONG TAC
-- =========================================================

CREATE TABLE WorkHistories (
    WorkId INT IDENTITY(1,1) PRIMARY KEY,
    EmployeeId INT NOT NULL,
    FromDate DATE NULL,
    ToDate DATE NULL,
    PositionTitle NVARCHAR(255) NULL,
    WorkingUnit NVARCHAR(255) NULL,
    JobDescription NVARCHAR(MAX) NULL,
    Notes NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

    CONSTRAINT FK_WorkHistories_Employee
        FOREIGN KEY (EmployeeId)
        REFERENCES EmployeeProfiles(EmployeeId),

    CONSTRAINT CK_WorkHistories_Dates
        CHECK (
            FromDate IS NULL
            OR ToDate IS NULL
            OR ToDate >= FromDate
        )
);
GO

-- =========================================================
-- 9. QUAN HE GIA DINH
-- =========================================================

CREATE TABLE FamilyRelations (
    RelationId INT IDENTITY(1,1) PRIMARY KEY,
    EmployeeId INT NOT NULL,
    Relationship NVARCHAR(50) NULL,
    FullName NVARCHAR(200) NULL,
    YearOfBirth INT NULL,
    Occupation NVARCHAR(300) NULL,
    Workplace NVARCHAR(300) NULL,
    Address NVARCHAR(500) NULL,
    Details NVARCHAR(MAX) NULL,
    Side NVARCHAR(20) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

    CONSTRAINT FK_FamilyRelations_Employee
        FOREIGN KEY (EmployeeId)
        REFERENCES EmployeeProfiles(EmployeeId),

    CONSTRAINT CK_FamilyRelations_Side
        CHECK (
            Side IS NULL
            OR Side IN (N'SELF', N'SPOUSE')
        ),

    CONSTRAINT CK_FamilyRelations_Year
        CHECK (
            YearOfBirth IS NULL
            OR YearOfBirth BETWEEN 1800 AND 2200
        )
);
GO

-- =========================================================
-- 10. LICH SU LUONG
-- MonthYear luu ngay dau tien cua thang
-- Vi du: 2026-10-01
-- =========================================================

CREATE TABLE SalaryHistories (
    SalaryHistoryId INT IDENTITY(1,1) PRIMARY KEY,
    EmployeeId INT NOT NULL,
    MonthYear DATE NOT NULL,
    RankCode NVARCHAR(50) NULL,
    Grade NVARCHAR(20) NULL,
    Coefficient DECIMAL(6,3) NULL,
    AllowanceCoefficient DECIMAL(8,3) NULL,
    DecisionNumber NVARCHAR(100) NULL,
    DecisionDate DATE NULL,
    Notes NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

    CONSTRAINT FK_SalaryHistories_Employee
        FOREIGN KEY (EmployeeId)
        REFERENCES EmployeeProfiles(EmployeeId),

    CONSTRAINT CK_SalaryHistories_FirstDay
        CHECK (DAY(MonthYear) = 1),

    CONSTRAINT CK_SalaryHistories_Coefficient
        CHECK (
            Coefficient IS NULL
            OR Coefficient >= 0
        )
);
GO

-- =========================================================
-- 11. LICH SU CHUC VU
-- =========================================================

CREATE TABLE PositionHistories (
    PositionHistoryId INT IDENTITY(1,1) PRIMARY KEY,
    EmployeeId INT NOT NULL,
    PositionTitle NVARCHAR(255) NOT NULL,
    UnitName NVARCHAR(255) NULL,
    FromDate DATE NULL,
    ToDate DATE NULL,
    DecisionNumber NVARCHAR(100) NULL,
    DecisionDate DATE NULL,
    Notes NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

    CONSTRAINT FK_PositionHistories_Employee
        FOREIGN KEY (EmployeeId)
        REFERENCES EmployeeProfiles(EmployeeId),

    CONSTRAINT CK_PositionHistories_Dates
        CHECK (
            FromDate IS NULL
            OR ToDate IS NULL
            OR ToDate >= FromDate
        )
);
GO

-- =========================================================
-- 12. HO SO DINH KEM / SO HOA
-- FileUrl co the la duong dan luu tru hoac URL
-- =========================================================

CREATE TABLE ProfileAttachments (
    AttachmentId BIGINT IDENTITY(1,1) PRIMARY KEY,
    EmployeeId INT NOT NULL,
    FileName NVARCHAR(255) NOT NULL,
    OriginalFileName NVARCHAR(255) NULL,
    FileUrl NVARCHAR(1000) NOT NULL,
    FileType NVARCHAR(100) NULL,
    FileSize BIGINT NULL,
    Description NVARCHAR(500) NULL,
    UploadedBy INT NULL,
    UploadedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    IsDeleted BIT NOT NULL DEFAULT 0,

    CONSTRAINT FK_ProfileAttachments_Employee
        FOREIGN KEY (EmployeeId)
        REFERENCES EmployeeProfiles(EmployeeId),

    CONSTRAINT FK_ProfileAttachments_User
        FOREIGN KEY (UploadedBy)
        REFERENCES Users(UserId),

    CONSTRAINT CK_ProfileAttachments_FileSize
        CHECK (FileSize IS NULL OR FileSize >= 0)
);
GO

-- =========================================================
-- 13. YEU CAU BO SUNG / CAP NHAT LY LICH
-- =========================================================

CREATE TABLE ProfileUpdateRequests (
    RequestId BIGINT IDENTITY(1,1) PRIMARY KEY,
    EmployeeId INT NOT NULL,
    RequestedBy INT NOT NULL,
    RequestTitle NVARCHAR(200) NOT NULL,
    RequestDescription NVARCHAR(MAX) NULL,

    -- Noi dung de nghi cap nhat dang JSON
    RequestedChanges NVARCHAR(MAX) NULL,

    RequestStatus NVARCHAR(30) NOT NULL DEFAULT N'PENDING',
    ReviewedBy INT NULL,
    ReviewedAt DATETIME2 NULL,
    ReviewComment NVARCHAR(MAX) NULL,

    CreatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    UpdatedAt DATETIME2 NULL,

    CONSTRAINT FK_ProfileUpdateRequests_Employee
        FOREIGN KEY (EmployeeId)
        REFERENCES EmployeeProfiles(EmployeeId),

    CONSTRAINT FK_ProfileUpdateRequests_Requester
        FOREIGN KEY (RequestedBy)
        REFERENCES Users(UserId),

    CONSTRAINT FK_ProfileUpdateRequests_Reviewer
        FOREIGN KEY (ReviewedBy)
        REFERENCES Users(UserId),

    CONSTRAINT CK_ProfileUpdateRequests_Status
        CHECK (
            RequestStatus IN (
                N'PENDING',
                N'APPROVED',
                N'REJECTED',
                N'CANCELLED'
            )
        ),

    CONSTRAINT CK_ProfileUpdateRequests_JSON
        CHECK (
            RequestedChanges IS NULL
            OR ISJSON(RequestedChanges) = 1
        )
);
GO

-- =========================================================
-- 14. NHAT KY HOAT DONG HE THONG
-- =========================================================

CREATE TABLE AuditLogs (
    AuditLogId BIGINT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NULL,
    ActionName NVARCHAR(100) NOT NULL,
    EntityName NVARCHAR(100) NULL,
    EntityId NVARCHAR(100) NULL,
    OldData NVARCHAR(MAX) NULL,
    NewData NVARCHAR(MAX) NULL,
    IpAddress VARCHAR(50) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

    CONSTRAINT FK_AuditLogs_Users
        FOREIGN KEY (UserId) REFERENCES Users(UserId)
);
GO

-- =========================================================
-- 15. DU LIEU MAU VAI TRO
-- =========================================================

INSERT INTO Roles (RoleCode, RoleName, Description)
VALUES
(
    'ADMIN',
    N'Quản trị hệ thống',
    N'Quản lý hệ thống, đơn vị, tài khoản và phân quyền'
),
(
    'HR_MANAGER',
    N'Quản lý nhân sự',
    N'Quản lý nghiệp vụ nhân sự và báo cáo theo phạm vi được cấp'
),
(
    'UNIT_MANAGER',
    N'Trưởng đơn vị',
    N'Quản lý, xem xét hồ sơ trong đơn vị mình'
),
(
    'HR_OFFICER',
    N'Cán bộ tổ chức',
    N'Nhập liệu, cập nhật và quản lý hồ sơ theo phạm vi được cấp'
),
(
    'EMPLOYEE',
    N'Cán bộ',
    N'Xem hồ sơ cá nhân và gửi yêu cầu cập nhật'
);
GO

-- =========================================================
-- 16. TAO 10 DON VI MAU
-- =========================================================

DECLARE @i INT = 1;
DECLARE @UnitCode VARCHAR(20);

WHILE @i <= 10
BEGIN
    SET @UnitCode =
        'DV' + RIGHT('00' + CAST(@i AS VARCHAR(2)), 2);

    INSERT INTO Units (UnitCode, UnitName, Description)
    VALUES (
        @UnitCode,
        CONCAT(N'Đơn vị ', @i),
        CONCAT(N'Đơn vị mẫu số ', @i)
    );

    SET @i = @i + 1;
END;
GO

-- =========================================================
-- 17. CHI MUC TIM KIEM
-- =========================================================

CREATE INDEX IX_EmployeeProfiles_UnitId
ON EmployeeProfiles(UnitId);
GO

CREATE INDEX IX_EmployeeProfiles_BirthName
ON EmployeeProfiles(BirthName);
GO

CREATE INDEX IX_EmployeeProfiles_IsDeleted
ON EmployeeProfiles(IsDeleted);
GO

CREATE INDEX IX_TrainingHistories_EmployeeId
ON TrainingHistories(EmployeeId);
GO

CREATE INDEX IX_WorkHistories_EmployeeId
ON WorkHistories(EmployeeId);
GO

CREATE INDEX IX_FamilyRelations_EmployeeId
ON FamilyRelations(EmployeeId);
GO

CREATE INDEX IX_SalaryHistories_EmployeeId
ON SalaryHistories(EmployeeId);
GO

CREATE INDEX IX_PositionHistories_EmployeeId
ON PositionHistories(EmployeeId);
GO

CREATE INDEX IX_ProfileAttachments_EmployeeId
ON ProfileAttachments(EmployeeId);
GO

CREATE INDEX IX_ProfileUpdateRequests_Status
ON ProfileUpdateRequests(RequestStatus);
GO

CREATE INDEX IX_AuditLogs_CreatedAt
ON AuditLogs(CreatedAt);
GO

-- =========================================================
-- 18. KIEM TRA CAC BANG
-- =========================================================

SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_NAME;
GO

-- =========================================================
-- 19. KIEM TRA 10 DON VI
-- =========================================================

SELECT *
FROM Units
ORDER BY UnitId;
GO

-- =========================================================
-- 20. KIEM TRA CAC VAI TRO
-- =========================================================

SELECT *
FROM Roles
ORDER BY RoleId;
GO

-- =========================================================
-- 21. TRUY VAN DANH SACH HO SO
-- =========================================================

SELECT
    E.EmployeeId,
    E.EmployeeCode,
    E.BirthName,
    E.DateOfBirth,
    E.Gender,
    U.UnitName,
    E.CurrentPosition,
    E.ProfileStatus
FROM EmployeeProfiles E
INNER JOIN Units U
    ON E.UnitId = U.UnitId
WHERE E.IsDeleted = 0
ORDER BY E.BirthName;
GO
