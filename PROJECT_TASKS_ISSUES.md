# BẢNG PHÂN RÃ TOÀN BỘ CÔNG VIỆC DỰ ÁN (1 TASK = 1 GITHUB ISSUE)
## Dự án: Hệ Thống Quản Lý Hồ Sơ Cán Bộ, Công Chức, Viên Chức
**Repository:** https://github.com/VanThan19/QuanLyCongChucVien  
**Quy chuẩn áp dụng:** 1 Task = 1 Issue, có đầy đủ: Mô tả công việc, Thời gian hoàn thành, Input (Là ai - Cái gì - Làm gì - Ở đâu), Output (Cần gì - Làm gì - Kết quả đã đạt chưa / Tiêu chí nghiệm thu), Tên người thực thi.

---

## MỤC LỤC CÁC MILESTONES

- [MILESTONE 1: THIẾT KẾ CƠ SỞ DỮ LIỆU & KIẾN TRÚC DỰ ÁN (TASK 01 - 04)](#milestone-1-thiết-kế-cơ-sở-dữ-liệu--kiến-trúc-dự-án)
- [MILESTONE 2: XÂY DỰNG BACKEND CORE, AUTHENTICATION & PHÂN QUYỀN (TASK 05 - 09)](#milestone-2-xây-dựng-backend-core-authentication--phân-quyền)
- [MILESTONE 3: PHÁT TRIỂN BACKEND API HỒ SƠ & NGHIỆP VỤ BIẾN ĐỘNG (TASK 10 - 14)](#milestone-3-phát-triển-backend-api-hồ-sơ--nghiệp-vụ-biến-động)
- [MILESTONE 4: PHÁT TRIỂN GIAO DIỆN FRONTEND CHUNG & XÁC THỰC (TASK 15 - 18)](#milestone-4-phát-triển-giao-diện-frontend-chung--xác-thực)
- [MILESTONE 5: PHÁT TRIỂN GIAO DIỆN CHỨC NĂNG THEO 5 VAI TRÒ (TASK 19 - 24)](#milestone-5-phát-triển-giao-diện-chức-năng-theo-5-vai-trò)
- [MILESTONE 6: TÍCH HỢP HỆ THỐNG, BÁO CÁO THỐNG KÊ & NGHIỆM THU (TASK 25 - 28)](#milestone-6-tích-hợp-hệ-thống-báo-cáo-thống-kê--nghiệm-thu)

---

## MILESTONE 1: THIẾT KẾ CƠ SỞ DỮ LIỆU & KIẾN TRÚC DỰ ÁN

### [TASK-01] Thiết kế Sơ đồ Thực thể Quan hệ (ERD) và Từ điển Dữ liệu
- **Mô tả công việc:** Phân tích quy trình quản lý hồ sơ công chức theo quy định Bộ Nội vụ, thiết kế cấu trúc 14 bảng quan hệ, xác định khóa chính, khóa ngoại, kiểu dữ liệu và chỉ mục tối ưu.
- **Thời gian hoàn thành:** 3 ngày (Estimate: 24h) | Deadline: Tuần 1
- **Thông tin Input:**
  - *Là ai:* Kỹ sư Thiết kế CSDL (Database Designer) & Phân tích nghiệp vụ (BA).
  - *Cái gì:* Mẫu sơ yếu lý lịch cán bộ công chức (Mẫu 2C-BNV/2008), quy định quản lý ngạch bậc lương, thông tư ngành.
  - *Làm gì:* Chuẩn hóa dữ liệu về dạng 3NF, thiết kế sơ đồ quan hệ thực thể, viết mô tả từ điển trường dữ liệu.
  - *Ở đâu:* Tài liệu thiết kế hệ thống và công cụ thiết kế ERD (dbdocs, Mermaid).
- **Kết quả Output:**
  - *Cần gì:* File sơ đồ `ERD_DIAGRAM.md` hiển thị trực quan và bảng mô tả từ điển dữ liệu 14 bảng.
  - *Làm gì:* Review mô hình quan hệ, kiểm tra các mối liên kết 1-N, N-N, tính toàn vẹn tham chiếu.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [x] Đầy đủ 14 thực thể theo đúng quy chuẩn.
    - [x] Đã chuẩn hóa quan hệ khóa ngoại, ràng buộc CHECK và UNIQUE.
    - [x] Được Tech Lead phê duyệt thông qua.
- **Tên người thực thi:** Nguyễn Văn Thân (Database Designer / Tech Lead)

---

### [TASK-02] Khởi tạo Kịch bản CSDL SQL Server và Dữ liệu mẫu ban đầu
- **Mô tả công việc:** Viết script SQL Server (`CSDL.sql`) tạo Database `QuanLyCongChuc`, bảng, khóa ngoại, chỉ mục tìm kiếm và nạp 10 đơn vị mẫu, 5 vai trò hệ thống.
- **Thời gian hoàn thành:** 2 ngày (Estimate: 16h) | Deadline: Tuần 1
- **Thông tin Input:**
  - *Là ai:* Kỹ sư Cơ sở dữ liệu (Database Engineer).
  - *Cái gì:* Bản thiết kế ERD từ TASK-01.
  - *Làm gì:* Viết câu lệnh DDL (`CREATE TABLE`, `ALTER TABLE`, `CREATE INDEX`) và DML nạp dữ liệu mẫu ban đầu (`INSERT INTO Roles, Units`).
  - *Ở đâu:* SQL Server Management Studio (SSMS) / SQL Server 2019+.
- **Kết quả Output:**
  - *Cần gì:* File script `CSDL.sql` thực thi độc lập không lỗi cú pháp.
  - *Làm gì:* Chạy thử nghiệm script trên môi trường local, kiểm tra bảng và quan hệ phát sinh.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [x] Chạy kịch bản thành công 100%, tự động tạo 14 bảng.
    - [x] Nạp thành công 5 vai trò hệ thống và 10 đơn vị mẫu.
    - [x] Các chỉ mục `IX_EmployeeProfiles_*` hoạt động tối ưu.
- **Tên người thực thi:** Nguyễn Văn Thân (Database Engineer)

---

### [TASK-03] Khởi tạo Khung Dự án Backend Spring Boot (Maven, Java 17+)
- **Mô tả công việc:** Thiết lập cấu trúc dự án Spring Boot `back-end/cong-vien-chuc`, cấu hình các dependency: Spring Web, Spring Data JPA, Spring Security, SQL Server Driver, Validation, Lombok.
- **Thời gian hoàn thành:** 2 ngày (Estimate: 16h) | Deadline: Tuần 1
- **Thông tin Input:**
  - *Là ai:* Backend Developer.
  - *Cái gì:* Cấu trúc package chuẩn 3 lớp (`controller`, `service`, `repository`, `entity`, `dto`, `config`), file `pom.xml`.
  - *Làm gì:* Cấu hình `application.properties` kết nối cơ sở dữ liệu SQL Server `QuanLyCongChuc`.
  - *Ở đâu:* Thư mục `back-end/cong-vien-chuc`.
- **Kết quả Output:**
  - *Cần gì:* Ứng dụng Spring Boot khởi động thành công trên cổng 8080, kết nối thông suốt tới SQL Server.
  - *Làm gì:* Chạy `./mvnw spring-boot:run` và kiểm tra log kết nối cơ sở dữ liệu.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [x] Build thành công không có dependency bị xung đột.
    - [x] Hibernate kết nối được database hiện hữu mà không ghi đè schema ngoài ý muốn.
- **Tên người thực thi:** Nguyễn Văn Thân (Backend Engineer)

---

### [TASK-04] Khởi tạo Khung Dự án Frontend React 19 + Tailwind CSS + Vite
- **Mô tả công việc:** Thiết lập cấu trúc mã nguồn Frontend `front-end` sử dụng Vite, React 19, Tailwind CSS v4, cấu hình React Router v7 điều hướng theo 5 phân hệ vai trò người dùng.
- **Thời gian hoàn thành:** 2 ngày (Estimate: 16h) | Deadline: Tuần 1
- **Thông tin Input:**
  - *Là ai:* Frontend Developer.
  - *Cái gì:* Bản mô tả 5 vai trò người dùng (Admin, HR Manager, Unit Manager, HR Officer, Employee), bộ icon `lucide-react`.
  - *Làm gì:* Cấu hình Router, layout khung Dashboard, header, sidebar điều hướng tương ứng từng vai trò.
  - *Ở đâu:* Thư mục `front-end/src`.
- **Kết quả Output:**
  - *Cần gì:* Khung giao diện chạy mượt mà tại `http://localhost:5173`.
  - *Làm gì:* Chạy lệnh `npm run dev`, kiểm tra routing giữa các trang `/admin`, `/hr-manager`, `/employee`,...
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [x] Ứng dụng frontend chạy không lỗi console.
    - [x] Tailwind CSS render đúng kiểu giao diện chính phủ điện tử hiện đại.
- **Tên người thực thi:** Nguyễn Văn Thân (Frontend Engineer)

---

## MILESTONE 2: XÂY DỰNG BACKEND CORE, AUTHENTICATION & PHÂN QUYỀN

### [TASK-05] Xây dựng các Entity JPA & Repository tương ứng 14 bảng CSDL
- **Mô tả công việc:** Định nghĩa các lớp Entity Java ánh xạ chính xác 14 bảng trong CSDL (`Units`, `Users`, `Roles`, `EmployeeProfiles`,...), thiết lập quan hệ `@ManyToOne`, `@OneToMany`, `@ManyToMany` và các JPA Repository.
- **Thời gian hoàn thành:** 3 ngày (Estimate: 24h) | Deadline: Tuần 2
- **Thông tin Input:**
  - *Là ai:* Backend Developer.
  - *Cái gì:* Cấu trúc bảng từ `CSDL.sql`.
  - *Làm gì:* Tạo class Entity với annotation JPA/Hibernate, viết các interface kế thừa `JpaRepository` hỗ trợ phân trang và tìm kiếm.
  - *Ở đâu:* Package `com.vanthan.congvienchuc.entity` và `repository`.
- **Kết quả Output:**
  - *Cần gì:* Bộ 14 Entity và 14 Repository biên dịch hoàn tất.
  - *Làm gì:* Viết Spring Boot Test kiểm tra truy vấn dữ liệu từ database.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [ ] Ánh xạ chính xác tất cả các trường dữ liệu, ràng buộc Unique, Nullable.
    - [ ] Các phương thức tìm kiếm theo mã, họ tên, trạng thái chạy chính xác.
- **Tên người thực thi:** Backend Engineer

---

### [TASK-06] Xây dựng Module Xác thực Tài khoản JWT & Spring Security
- **Mô tả công việc:** Cài đặt cơ chế bảo mật stateless bằng JSON Web Token (JWT), xử lý đăng nhập, mã hóa mật khẩu bằng BCrypt, phân giải vai trò người dùng vào Security Context.
- **Thời gian hoàn thành:** 3 ngày (Estimate: 24h) | Deadline: Tuần 2
- **Thông tin Input:**
  - *Là ai:* Backend Security Developer.
  - *Cái gì:* Thông tin đăng nhập gồm `Username`, `Password`, mã captcha xác thực.
  - *Làm gì:* Viết `JwtTokenProvider`, `JwtAuthenticationFilter`, `UserDetailsServiceImpl`, cấu hình CORS và bảo vệ các endpoint theo Role.
  - *Ở đâu:* Package `com.vanthan.congvienchuc.security` và Controller `/api/auth/login`.
- **Kết quả Output:**
  - *Cần gì:* API POST `/api/auth/login` trả về JWT token, thông tin User và danh sách vai trò Role.
  - *Làm gì:* Dùng Postman test kịch bản đăng nhập đúng/sai mật khẩu, kiểm tra thời hạn token.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [ ] Mật khẩu được mã hóa an toàn bằng BCrypt.
    - [ ] Chặn truy cập trái phép vào các endpoint bảo mật (HTTP 401/403).
    - [ ] Cập nhật `LastLoginAt` vào bảng `Users` khi đăng nhập thành công.
- **Tên người thực thi:** Backend Engineer

---

### [TASK-07] Xây dựng Module Nhật ký Hoạt động (Audit Logging Service & AOP)
- **Mô tả công việc:** Tự động ghi vết các thao tác thêm, sửa, xóa, duyệt hồ sơ vào bảng `AuditLogs` sử dụng Spring AOP (Aspect-Oriented Programming).
- **Thời gian hoàn thành:** 2 ngày (Estimate: 16h) | Deadline: Tuần 2
- **Thông tin Input:**
  - *Là ai:* Backend Developer.
  - *Cái gì:* UserId người thực hiện, Tên hành động (`ActionName`), Đối tượng (`EntityName`, `EntityId`), Dữ liệu trước/sau biến động (`OldData`, `NewData`), IP Address.
  - *Làm gì:* Tạo Custom Annotation `@AuditLogAction` và Aspect đánh chặn ghi dữ liệu tự động vào bảng `AuditLogs`.
  - *Ở đâu:* Package `com.vanthan.congvienchuc.audit`.
- **Kết quả Output:**
  - *Cần gì:* Mọi thao tác trọng yếu đều được lưu vết đầy đủ trong CSDL.
  - *Làm gì:* Thực hiện cập nhật 1 hồ sơ, kiểm tra bản ghi tương ứng được sinh ra trong `AuditLogs`.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [ ] Ghi lại trung thực UserId, thời gian `SYSDATETIME()`, IP client.
    - [ ] Không làm gián đoạn transaction chính nếu log gặp lỗi.
- **Tên người thực thi:** Backend Engineer

---

### [TASK-08] Xây dựng API Quản lý Tài khoản & Phân quyền Người dùng (Admin)
- **Mô tả công việc:** Cung cấp các API quản trị người dùng cho Quản trị viên hệ thống (Admin): danh sách tài khoản, tạo tài khoản mới, gán vai trò (`UserRoles`), kích hoạt / khóa tài khoản, reset mật khẩu.
- **Thời gian hoàn thành:** 3 ngày (Estimate: 24h) | Deadline: Tuần 3
- **Thông tin Input:**
  - *Là ai:* Quản trị viên hệ thống (Admin).
  - *Cái gì:* Thông tin tài khoản mới, danh sách RoleId cần gán, đơn vị công tác UnitId.
  - *Làm gì:* Xác thực quyền ADMIN, validate trùng lặp username/email, lưu bảng `Users` và `UserRoles`.
  - *Ở đâu:* Endpoint `/api/admin/users/**`.
- **Kết quả Output:**
  - *Cần gì:* Bộ API RESTful CRUD tài khoản và gán quyền đa vai trò.
  - *Làm gì:* Test các trường hợp phân quyền nhiều role cho 1 user, thử khóa tài khoản.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [ ] Phân quyền chặt chẽ: chỉ tài khoản có role `ADMIN` mới truy cập được.
    - [ ] Bắt lỗi trùng username rõ ràng, trả về mã lỗi 400 cùng thông điệp tiếng Việt.
- **Tên người thực thi:** Backend Engineer

---

### [TASK-09] Xây dựng API Quản lý Danh mục Cơ cấu Đơn vị Phòng ban (Units API)
- **Mô tả công việc:** Cung cấp API quản lý danh sách các phòng ban, trung tâm, khoa, viện trực thuộc cơ quan.
- **Thời gian hoàn thành:** 2 ngày (Estimate: 16h) | Deadline: Tuần 3
- **Thông tin Input:**
  - *Là ai:* Quản trị viên (Admin) / Quản lý nhân sự (HR Manager).
  - *Cái gì:* Mã đơn vị (`UnitCode`), Tên đơn vị (`UnitName`), Mô tả (`Description`), Trạng thái (`IsActive`).
  - *Làm gì:* Thêm mới, cập nhật tên đơn vị, tìm kiếm theo mã/tên, kiểm tra ràng buộc trước khi xóa.
  - *Ở đâu:* Endpoint `/api/units/**`.
- **Kết quả Output:**
  - *Cần gì:* API trả về danh sách đơn vị kèm số lượng cán bộ trực thuộc.
  - *Làm gì:* Kiểm tra tính hợp lệ dữ liệu và chặn xóa đơn vị khi vẫn còn công chức đang làm việc.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [ ] Validate không cho phép tạo mã đơn vị trùng lặp.
    - [ ] Trả về thông báo lỗi thân thiện nếu vi phạm ràng buộc dữ liệu.
- **Tên người thực thi:** Backend Engineer

---

## MILESTONE 3: PHÁT TRIỂN BACKEND API HỒ SƠ & NGHIỆP VỤ BIẾN ĐỘNG

### [TASK-10] Xây dựng API Quản lý Hồ sơ Lý lịch Cán bộ (EmployeeProfiles CRUD)
- **Mô tả công việc:** Cung cấp trọn bộ API quản lý hồ sơ: tìm kiếm nâng cao (theo họ tên, mã công chức, phòng ban, ngạch bậc, chức vụ), thêm mới hồ sơ, cập nhật thông tin cá nhân và xóa mềm hồ sơ.
- **Thời gian hoàn thành:** 4 ngày (Estimate: 32h) | Deadline: Tuần 4
- **Thông tin Input:**
  - *Là ai:* Cán bộ tổ chức nhân sự (HR Officer) / Quản lý nhân sự (HR Manager).
  - *Cái gì:* Dữ liệu sơ yếu lý lịch đầy đủ theo mẫu chuẩn (hơn 40 trường thông tin).
  - *Làm gì:* Validate dữ liệu đầu vào (CCCD, ngày sinh, giới tính), lưu trữ bảng `EmployeeProfiles`.
  - *Ở đâu:* Endpoint `/api/employees/**`.
- **Kết quả Output:**
  - *Cần gì:* API phân trang, lọc đa tiêu chí, tạo mới và cập nhật hồ sơ chuẩn xác.
  - *Làm gì:* Kiểm tra với tập dữ liệu thực tế, kiểm tra phân trang `Pageable`.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [ ] Tự động sinh hoặc kiểm tra mã cán bộ duy nhất (`EmployeeCode`).
    - [ ] Xóa mềm: cập nhật cờ `IsDeleted = 1`, không mất dữ liệu vật lý.
- **Tên người thực thi:** Backend Engineer

---

### [TASK-11] Xây dựng API Quản lý Quá trình Đào tạo, Công tác, Quan hệ Gia đình
- **Mô tả công việc:** Cung cấp API quản lý các bảng thành phần gắn liền với hồ sơ công chức: Quá trình đào tạo bồi dưỡng (`TrainingHistories`), Quá trình công tác (`WorkHistories`), Quan hệ gia đình (`FamilyRelations`).
- **Thời gian hoàn thành:** 3 ngày (Estimate: 24h) | Deadline: Tuần 4
- **Thông tin Input:**
  - *Là ai:* HR Officer / Cán bộ nhân viên (khi được phân quyền).
  - *Cái gì:* Thông tin bằng cấp, trường đào tạo, giai đoạn từ ngày - đến ngày, đơn vị công tác, thân nhân gia đình.
  - *Làm gì:* Kiểm tra `ToDate >= FromDate`, lưu và truy xuất theo `EmployeeId`.
  - *Ở đâu:* Endpoint `/api/employees/{id}/training`, `/work-history`, `/family`.
- **Kết quả Output:**
  - *Cần gì:* Dữ liệu con được trả về lồng hoặc tách biệt theo RESTful tiêu chuẩn.
  - *Làm gì:* Test kịch bản nhập thời gian không hợp lệ để kiểm tra ràng buộc CHECK constraint.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [ ] Trả về danh sách được sắp xếp theo thời gian mới nhất lên đầu.
    - [ ] Xử lý đúng phân hệ quan hệ gia đình bản thân (`SELF`) và bên vợ/chồng (`SPOUSE`).
- **Tên người thực thi:** Backend Engineer

---

### [TASK-12] Xây dựng API Quản lý Biến động Lương & Lịch sử Bổ nhiệm Chức vụ
- **Mô tả công việc:** Cung cấp API ghi nhận các quyết định nâng lương, thăng ngạch, bổ nhiệm chức vụ lãnh đạo (`SalaryHistories`, `PositionHistories`).
- **Thời gian hoàn thành:** 3 ngày (Estimate: 24h) | Deadline: Tuần 5
- **Thông tin Input:**
  - *Là ai:* Cán bộ nhân sự (HR Officer).
  - *Cái gì:* Số quyết định, ngày quyết định, ngạch lương, bậc, hệ số lương, hệ số phụ cấp, chức vụ bổ nhiệm.
  - *Làm gì:* Validate `MonthYear` chuẩn ngày mùng 1 đầu tháng, hệ số lương >= 0. Cập nhật chức vụ hiện tại vào hồ sơ chính `EmployeeProfiles`.
  - *Ở đâu:* Endpoint `/api/employees/{id}/salary-histories`, `/position-histories`.
- **Kết quả Output:**
  - *Cần gì:* Bảng theo dõi lịch sử tăng lương và luân chuyển cán bộ xuyên suốt quá trình công tác.
  - *Làm gì:* Test cập nhật quyết định bổ nhiệm mới và đồng bộ chức vụ hiện tại.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [ ] Lịch sử lương được bảo toàn theo thứ tự thời gian.
    - [ ] Tự động cập nhật `CurrentPosition` tại bảng hồ sơ chính khi có quyết định bổ nhiệm mới.
- **Tên người thực thi:** Backend Engineer

---

### [TASK-13] Xây dựng Module Đính kèm Số hóa Hồ sơ & Tài liệu Scan
- **Mô tả công việc:** Cung cấp tính năng upload, download, quản lý tệp đính kèm số hóa: scan văn bằng, quyết định bổ nhiệm, ảnh thẻ cá nhân (`ProfileAttachments`).
- **Thời gian hoàn thành:** 3 ngày (Estimate: 24h) | Deadline: Tuần 5
- **Thông tin Input:**
  - *Là ai:* Cán bộ (Employee) / Cán bộ nhân sự (HR Officer).
  - *Cái gì:* Tệp tin định dạng PDF, JPG, PNG dung lượng dưới 15MB.
  - *Làm gì:* Kiểm tra định dạng file (MIME type), chống upload mã độc, lưu trữ file lên thư mục máy chủ hoặc cloud storage, lưu metadata vào CSDL.
  - *Ở đâu:* Endpoint `/api/employees/{id}/attachments/**`.
- **Kết quả Output:**
  - *Cần gì:* API tải lên trả về URL an toàn để xem trước và tải xuống tài liệu.
  - *Làm gì:* Upload thử các file mẫu (.pdf, .jpg) và kiểm tra khả năng xem lại trên giao diện.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [ ] Validate nghiêm ngặt phần mở rộng file (chỉ cho phép PDF, DOCX, JPG, PNG).
    - [ ] Quản lý file theo `EmployeeId`, lưu lại dung lượng và tên gốc.
- **Tên người thực thi:** Backend Engineer

---

### [TASK-14] Xây dựng Quy trình Tiếp nhận & Phê duyệt Đề xuất Cập nhật Hồ sơ
- **Mô tả công việc:** Cung cấp API tiếp nhận đề xuất cập nhật thông tin từ cá nhân cán bộ, chuyển trạng thái cho Trưởng đơn vị / Nhân sự phê duyệt (`ProfileUpdateRequests`).
- **Thời gian hoàn thành:** 4 ngày (Estimate: 32h) | Deadline: Tuần 5
- **Thông tin Input:**
  - *Là ai:* Cán bộ công chức (`EMPLOYEE`) gửi yêu cầu; Cán bộ nhân sự (`HR_OFFICER`) hoặc Quản lý đơn vị (`UNIT_MANAGER`) phê duyệt.
  - *Cái gì:* Nội dung thay đổi đề xuất đóng gói dưới định dạng JSON (`RequestedChanges`), lý do thay đổi.
  - *Làm gì:* Validate cú pháp JSON, chuyển trạng thái `PENDING` -> `APPROVED` hoặc `REJECTED`, tự động cập nhật dữ liệu vào `EmployeeProfiles` khi được chấp thuận.
  - *Ở đâu:* Endpoint `/api/profile-requests/**`.
- **Kết quả Output:**
  - *Cần gì:* Luồng duyệt hồ sơ tự động hóa, minh bạch, có lưu bình luận phê duyệt và thời gian.
  - *Làm gì:* Giả lập cán bộ gửi yêu cầu sửa số điện thoại, quản lý duyệt và đối soát dữ liệu sau khi duyệt.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [ ] Ràng buộc kiểm tra JSON hợp lệ hoạt động chuẩn xác (`ISJSON`).
    - [ ] Dữ liệu chỉ tự động cập nhật vào bảng chính khi trạng thái chuyển sang `APPROVED`.
- **Tên người thực thi:** Backend Engineer

---

## MILESTONE 4: PHÁT TRIỂN GIAO DIỆN FRONTEND CHUNG & XÁC THỰC

### [TASK-15] Xây dựng Giao diện Trang Đăng nhập & Xác thực Captcha
- **Mô tả công việc:** Thiết kế giao diện đăng nhập hiện đại, phong cách cổng thông tin điện tử, tích hợp form nhập tài khoản, mật khẩu, mã Captcha xác thực chống spam, xử lý lưu JWT token.
- **Thời gian hoàn thành:** 2 ngày (Estimate: 16h) | Deadline: Tuần 2
- **Thông tin Input:**
  - *Là ai:* Người dùng hệ thống mọi cấp bậc.
  - *Cái gì:* Tên đăng nhập, mật khẩu, mã Captcha được sinh ngẫu nhiên.
  - *Làm gì:* Kiểm tra hợp lệ form, gọi API đăng nhập, lưu token vào sessionStorage/localStorage, điều hướng theo vai trò.
  - *Ở đâu:* `front-end/src/shared/pages/login/LoginPage.jsx`.
- **Kết quả Output:**
  - *Cần gì:* Màn hình đăng nhập hoàn chỉnh, responsive trên máy tính và thiết bị di động.
  - *Làm gì:* Thử đăng nhập thành công và đăng nhập sai mật khẩu để kiểm tra thông báo lỗi.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [x] Giao diện có logo cơ quan, tiêu đề hệ thống chuẩn chỉnh.
    - [x] Có chức năng đổi mã Captcha khi bấm icon refresh.
    - [x] Đã xử lý loading spinner khi đang kết nối API.
- **Tên người thực thi:** Frontend Engineer

---

### [TASK-16] Xây dựng Hệ thống Điều hướng & Bảo vệ Tuyến đường theo Vai trò (Route Guard)
- **Mô tả công việc:** Cấu hình `RequireAuth` và `AuthProvider` kiểm soát quyền truy cập: ngăn chặn truy cập trái phép khi chưa đăng nhập hoặc khi không đủ thẩm quyền vai trò.
- **Thời gian hoàn thành:** 2 ngày (Estimate: 16h) | Deadline: Tuần 2
- **Thông tin Input:**
  - *Là ai:* Kỹ sư Frontend.
  - *Cái gì:* Danh sách route được bảo vệ và quyền yêu cầu (`ROLES` config).
  - *Làm gì:* Kiểm tra state đăng nhập và quyền hạn hiện tại trước khi render page, điều hướng về `/login` nếu vi phạm.
  - *Ở đâu:* `front-end/src/shared/auth/RequireAuth.jsx` và `App.jsx`.
- **Kết quả Output:**
  - *Cần gì:* Hệ thống định tuyến an toàn, bảo vệ tuyệt đối các trang quản trị.
  - *Làm gì:* Đăng nhập bằng tài khoản `EMPLOYEE` rồi cố tình gõ link `/admin` trên URL để kiểm tra chặn quyền.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [x] Chặn đúng các trang không có thẩm quyền.
    - [x] Tự động ghi nhớ đường dẫn trước đó để redirect lại sau khi đăng nhập.
- **Tên người thực thi:** Frontend Engineer

---

### [TASK-17] Xây dựng Khung Giao diện Chung (Dashboard Layout, Header, Sidebar)
- **Mô tả công việc:** Thiết kế bộ khung Dashboard dùng chung: thanh Header chứa thông tin người dùng, nút đổi mật khẩu, đăng xuất; thanh Sidebar hiển thị menu nghiệp vụ tùy biến theo vai trò người dùng.
- **Thời gian hoàn thành:** 3 ngày (Estimate: 24h) | Deadline: Tuần 3
- **Thông tin Input:**
  - *Là ai:* Người dùng đã đăng nhập vào hệ thống.
  - *Cái gì:* Vai trò hiện tại của người dùng, tên đầy đủ, ảnh đại diện.
  - *Làm gì:* Render menu tương ứng từng phân hệ: Quản trị, Nhân sự, Đơn vị, Cá nhân.
  - *Ở đâu:* `front-end/src/shared/components/PageHeader.jsx` và layout components.
- **Kết quả Output:**
  - *Cần gì:* Khung dashboard đồng nhất trải nghiệm cho toàn bộ ứng dụng.
  - *Làm gì:* Đổi qua lại giữa các vai trò để kiểm tra sự biến đổi linh hoạt của Sidebar menu.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [x] Tương thích tốt giao diện màn hình từ 1280px trở lên.
    - [x] Hiển thị rõ tên đơn vị và chức vụ của tài khoản đang truy cập.
- **Tên người thực thi:** Frontend Engineer

---

### [TASK-18] Xây dựng Hộp thoại Đổi Mật khẩu & Thông tin Tài khoản Cá nhân
- **Mô tả công việc:** Cung cấp modal cho phép người dùng đổi mật khẩu khi đăng nhập lần đầu (`MustChangePassword = 1`) hoặc theo nhu cầu bảo mật định kỳ.
- **Thời gian hoàn thành:** 1.5 ngày (Estimate: 12h) | Deadline: Tuần 3
- **Thông tin Input:**
  - *Là ai:* Mọi người dùng.
  - *Cái gì:* Mật khẩu cũ, mật khẩu mới (tối thiểu 8 ký tự, có chữ hoa, số), xác nhận mật khẩu mới.
  - *Làm gì:* Validate form realtime, gửi API đổi mật khẩu, buộc đăng nhập lại nếu thành công.
  - *Ở đâu:* Header profile dropdown và Modal popup.
- **Kết quả Output:**
  - *Cần gì:* Giao diện đổi mật khẩu thân thiện, an toàn.
  - *Làm gì:* Kiểm tra xác thực mật khẩu cũ chính xác và kiểm tra khớp mật khẩu mới.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [ ] Bắt buộc đổi mật khẩu thành công ở lần đăng nhập đầu tiên mới được vào chức năng nghiệp vụ.
    - [ ] Thông báo thành công và xóa token cũ an toàn.
- **Tên người thực thi:** Frontend Engineer

---

## MILESTONE 5: PHÁT TRIỂN GIAO DIỆN CHỨC NĂNG THEO 5 VAI TRÒ

### [TASK-19] Giao diện Phân hệ Cán bộ (Employee): Xem & Yêu cầu Cập nhật Hồ sơ Cá nhân
- **Mô tả công việc:** Xây dựng màn hình xem sơ yếu lý lịch cá nhân chi tiết (thông tin chung, quá trình công tác, đào tạo, lương, gia đình) và form gửi đề xuất sửa đổi hồ sơ kèm minh chứng số hóa.
- **Thời gian hoàn thành:** 4 ngày (Estimate: 32h) | Deadline: Tuần 4
- **Thông tin Input:**
  - *Là ai:* Cán bộ, công chức, viên chức (`EMPLOYEE`).
  - *Cái gì:* Dữ liệu hồ sơ cá nhân lấy từ `UserEmployeeLinks`.
  - *Làm gì:* Xem chi tiết thông tin, bấm nút "Yêu cầu chỉnh sửa", điền thông tin thay đổi và đính kèm file bằng cấp/chứng chỉ mới.
  - *Ở đâu:* `front-end/src/roles/employee/pages/`.
- **Kết quả Output:**
  - *Cần gì:* Màn hình hồ sơ chuyên nghiệp chuẩn theo biểu mẫu Nhà nước; tab theo dõi trạng thái đề xuất (Chờ duyệt, Đã duyệt, Bị từ chối).
  - *Làm gì:* Thử nghiệm gửi đề xuất thay đổi địa chỉ thường trú và kiểm tra danh sách yêu cầu.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [x] Giao diện phân chia tab khoa học (Thông tin chung, Gia đình, Quá trình công tác, Tệp đính kèm).
    - [x] Hiển thị rõ trạng thái hồ sơ hiện tại (`ACTIVE`, `PENDING`...).
- **Tên người thực thi:** Frontend Engineer

---

### [TASK-20] Giao diện Phân hệ Cán bộ Tổ chức (HR Officer): Quản lý & Tiếp nhận Hồ sơ
- **Mô tả công việc:** Xây dựng màn hình danh bạ cán bộ, danh sách quản lý hồ sơ theo phòng ban, giao diện thêm mới hồ sơ cán bộ với form đầy đủ các trường thông tin theo quy chuẩn Bộ Nội vụ.
- **Thời gian hoàn thành:** 4 ngày (Estimate: 32h) | Deadline: Tuần 4
- **Thông tin Input:**
  - *Là ai:* Cán bộ tổ chức nhân sự (`HR_OFFICER`).
  - *Cái gì:* Danh sách hồ sơ công chức, bộ lọc tìm kiếm theo họ tên, mã số, phòng ban, ngạch lương.
  - *Làm gì:* Tìm kiếm, xem chi tiết, chỉnh sửa thông tin, nhập quyết định bổ nhiệm, thêm mới hồ sơ cán bộ mới tuyển dụng.
  - *Ở đâu:* `front-end/src/roles/hr-officer/pages/StaffDirectoryPage.jsx` và `StaffPersonalDetailPage.jsx`.
- **Kết quả Output:**
  - *Cần gì:* Bảng danh sách cán bộ có phân trang, thanh tìm kiếm nhanh, nút xuất dữ liệu, form chỉnh sửa tabbed trực quan.
  - *Làm gì:* Thử tìm kiếm lọc theo nhiều điều kiện kết hợp và thực hiện cập nhật một hồ sơ.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [x] Bảng hiển thị thông tin rõ ràng, hỗ trợ sắp xếp.
    - [x] Form nhập liệu có validation đầy đủ, thông báo lỗi cụ thể khi thiếu trường bắt buộc.
- **Tên người thực thi:** Frontend Engineer

---

### [TASK-21] Giao diện Phân hệ Quản lý Đơn vị (Unit Manager): Giám sát Cán bộ Đơn vị
- **Mô tả công việc:** Màn hình dành cho Trưởng đơn vị/Trưởng khoa/Trưởng phòng: theo dõi cơ cấu nhân sự trong đơn vị mình, xem danh sách cán bộ, xem xét các đề xuất bổ sung lý lịch của nhân sự trực thuộc.
- **Thời gian hoàn thành:** 3 ngày (Estimate: 24h) | Deadline: Tuần 5
- **Thông tin Input:**
  - *Là ai:* Trưởng đơn vị (`UNIT_MANAGER`).
  - *Cái gì:* Danh sách cán bộ thuộc đúng `UnitId` của tài khoản quản lý.
  - *Làm gì:* Xem biến động nhân sự nội bộ đơn vị, ký duyệt/xác nhận sơ bộ các yêu cầu cập nhật hồ sơ trước khi gửi lên Phòng Tổ chức cán bộ.
  - *Ở đâu:* `front-end/src/roles/unit-manager/pages/UnitManagerHome.jsx`.
- **Kết quả Output:**
  - *Cần gì:* Dashboard trực quan tóm tắt quân số, ngạch bậc, danh sách yêu cầu cần duyệt của đơn vị.
  - *Làm gì:* Kiểm tra tính bảo mật phạm vi dữ liệu (không được thấy dữ liệu cán bộ ngoài đơn vị).
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [ ] Dữ liệu được lọc nghiêm ngặt theo đơn vị công tác.
    - [ ] Nút duyệt / từ chối có kèm ô nhập ý kiến nhận xét của thủ trưởng đơn vị.
- **Tên người thực thi:** Frontend Engineer

---

### [TASK-22] Giao diện Phân hệ Quản lý Nhân sự (HR Manager): Phê duyệt & Điều hành
- **Mô tả công việc:** Màn hình cấp Quản lý nhân sự toàn cơ quan: xem xét phê duyệt các đề xuất biến động hồ sơ, duyệt quyết định nâng lương, phê duyệt kết nạp Đảng, thăng hạng chức danh nghề nghiệp.
- **Thời gian hoàn thành:** 3 ngày (Estimate: 24h) | Deadline: Tuần 5
- **Thông tin Input:**
  - *Là ai:* Trưởng phòng Tổ chức Cán bộ / Quản lý Nhân sự (`HR_MANAGER`).
  - *Cái gì:* Danh sách các yêu cầu cập nhật hồ sơ trạng thái `PENDING` từ toàn cơ quan.
  - *Làm gì:* So sánh đối soát dữ liệu cũ - dữ liệu mới đề xuất (Diff Viewer), bấm Phê duyệt hoặc Từ chối kèm lý do.
  - *Ở đâu:* `front-end/src/roles/hr-manager/pages/`.
- **Kết quả Output:**
  - *Cần gì:* Màn hình đối chiếu thông tin trực quan dạng 2 cột (Trước và Sau khi đổi).
  - *Làm gì:* Thử nghiệm phê duyệt 1 yêu cầu và kiểm tra dữ liệu gốc được cập nhật tức thì.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [ ] Hiển thị rõ ràng những trường dữ liệu có sự thay đổi (highlight màu).
    - [ ] Cập nhật trạng thái `APPROVED` và ghi nhận `ReviewedBy`, `ReviewedAt`.
- **Tên người thực thi:** Frontend Engineer

---

### [TASK-23] Giao diện Phân hệ Quản trị Hệ thống (Admin): Quản trị Tài khoản & Đơn vị
- **Mô tả công việc:** Màn hình Quản trị viên tối cao: quản lý danh mục Đơn vị phòng ban, quản lý danh sách tài khoản, phân quyền vai trò người dùng, theo dõi màn hình Audit Logs hoạt động hệ thống.
- **Thời gian hoàn thành:** 3 ngày (Estimate: 24h) | Deadline: Tuần 5
- **Thông tin Input:**
  - *Là ai:* Quản trị viên kỹ thuật (`ADMIN`).
  - *Cái gì:* Danh sách tài khoản, danh sách role, danh sách log hoạt động hệ thống.
  - *Làm gì:* Tạo tài khoản mới, gán quyền truy cập, khóa tài khoản vi phạm, tra cứu nhật ký audit.
  - *Ở đâu:* `front-end/src/roles/admin/pages/AdminHome.jsx`.
- **Kết quả Output:**
  - *Cần gì:* Bảng quản trị người dùng, bảng tra cứu Audit Log có phân trang và lọc theo thời gian/tên hành động.
  - *Làm gì:* Kiểm tra thao tác cấp quyền và kiểm tra ngay log ghi lại hành động đó.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [ ] Quản lý đầy đủ trạng thái kích hoạt / tạm ngưng của tài khoản.
    - [ ] Tra cứu Audit Log nhanh chóng dưới 500ms.
- **Tên người thực thi:** Frontend Engineer

---

### [TASK-24] Xây dựng Chức năng Quản lý Số hóa Hồ sơ Đính kèm (Tệp Scan & Giấy tờ)
- **Mô tả công việc:** Giao diện xem, tải lên, xem trước (preview PDF, ảnh) và quản lý tài liệu lưu trữ số hóa của từng cán bộ công chức.
- **Thời gian hoàn thành:** 2 ngày (Estimate: 16h) | Deadline: Tuần 5
- **Thông tin Input:**
  - *Là ai:* Cán bộ công chức và Cán bộ tổ chức.
  - *Cái gì:* File scan bằng tốt nghiệp, chứng chỉ ngoại ngữ/tin học, quyết định bổ nhiệm (PDF, JPG, PNG).
  - *Làm gì:* Chọn tệp từ máy tính, xem thanh tiến trình tải lên, xem trước tài liệu trực tiếp trên trình duyệt mà không cần tải về máy.
  - *Ở đâu:* `front-end/src/roles/employee/components/DigitalFileUpload.jsx`, `DigitalFilePreview.jsx`, `DigitalFileTable.jsx`.
- **Kết quả Output:**
  - *Cần gì:* Trình xem tệp đính kèm tương tác mượt mà, phân loại loại tệp rõ ràng.
  - *Làm gì:* Tải lên 1 file PDF và 1 file ảnh, kiểm tra khả năng mở xem trong modal preview.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [x] Có xem trước tệp trực quan.
    - [x] Có nút tải xuống file gốc an toàn.
- **Tên người thực thi:** Frontend Engineer

---

## MILESTONE 6: TÍCH HỢP HỆ THỐNG, BÁO CÁO THỐNG KÊ & NGHIỆM THU

### [TASK-25] Xây dựng Module Báo cáo Thống kê & Xuất dữ liệu Excel/PDF
- **Mô tả công việc:** Cung cấp chức năng thống kê cơ cấu công chức theo: độ tuổi, giới tính, trình độ chuyên môn, ngạch công chức, chức vụ; hỗ trợ xuất danh sách ra file Excel và xuất sơ yếu lý lịch mẫu 2C ra file PDF/Word.
- **Thời gian hoàn thành:** 4 ngày (Estimate: 32h) | Deadline: Tuần 6
- **Thông tin Input:**
  - *Là ai:* Quản lý nhân sự (`HR_MANAGER`) / Cán bộ tổ chức (`HR_OFFICER`).
  - *Cái gì:* Tiêu chí báo cáo (Toàn cơ quan hoặc từng đơn vị), khoảng thời gian báo cáo.
  - *Làm gì:* Tổng hợp số liệu thống kê bằng SQL Aggregation (`GROUP BY`), xuất file định dạng .xlsx bằng Apache POI và mẫu 2C ra PDF.
  - *Ở đâu:* Backend Controller `/api/reports/**` và Frontend trang Báo cáo thống kê.
- **Kết quả Output:**
  - *Cần gì:* Biểu đồ thống kê trực quan (Recharts / Chart.js) và file Excel định dạng đúng quy chuẩn báo cáo hành chính nhà nước.
  - *Làm gì:* Bấm nút "Xuất báo cáo", kiểm tra nội dung file Excel tải về máy.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [ ] Biểu đồ hiển thị chính xác tỉ lệ phần trăm cơ cấu trình độ học vấn và ngạch bậc.
    - [ ] File Excel xuất ra có đầy đủ tiêu đề, quốc hiệu tiêu ngữ, border bảng và đúng định dạng ngày tháng.
- **Tên người thực thi:** Backend & Frontend Engineers

---

### [TASK-26] Kiểm thử Toàn diện Hệ thống (Unit Test, Integration Test & User Acceptance Test)
- **Mô tả công việc:** Viết và chạy bộ test tự động kiểm tra tính đúng đắn của các nghiệp vụ: đăng nhập sai mật khẩu, phân quyền sai vai trò, thêm trùng mã công chức, nhập sai ngày tháng lương; kiểm thử luồng End-to-End từ gửi yêu cầu đến phê duyệt.
- **Thời gian hoàn thành:** 3 ngày (Estimate: 24h) | Deadline: Tuần 6
- **Thông tin Input:**
  - *Là ai:* Kỹ sư Kiểm thử (QA / QC Tester) & Toàn bộ đội ngũ phát triển.
  - *Cái gì:* Bộ kịch bản kiểm thử (Test Cases Matrix), dữ liệu mẫu kiểm thử.
  - *Làm gì:* Thực thi kiểm thử chức năng, kiểm thử bảo mật lỗ hổng SQL Injection/XSS, kiểm tra tính tương thích giao diện.
  - *Ở đâu:* Test suite backend (`src/test/java`), Postman Collection, Giao diện web.
- **Kết quả Output:**
  - *Cần gì:* Báo cáo kết quả kiểm thử (Test Execution Report), danh sách lỗi được khắc phục 100%.
  - *Làm gì:* Chạy lại toàn bộ test suite sau khi fix bug để đảm bảo không bị lỗi hồi quy (regression).
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [ ] 100% các luồng nghiệp vụ chính chạy thông suốt không có lỗi nghiêm trọng (Critical/Blocker).
    - [ ] Ràng buộc kiểm tra dữ liệu ở cả Frontend và Backend đồng nhất.
- **Tên người thực thi:** QA Tester & Tech Lead

---

### [TASK-27] Tối ưu Hiệu năng, Bảo mật & Xây dựng Kịch bản Triển khai (Docker / CI-CD)
- **Mô tả công việc:** Tối ưu hóa truy vấn SQL, cấu hình index tối ưu cho bảng dữ liệu lớn, đóng gói ứng dụng bằng Docker Compose (gồm backend Spring Boot, frontend Nginx và SQL Server), xây dựng quy trình CI/CD GitHub Actions.
- **Thời gian hoàn thành:** 3 ngày (Estimate: 24h) | Deadline: Tuần 6
- **Thông tin Input:**
  - *Là ai:* DevOps Engineer / Fullstack Developer.
  - *Cái gì:* Mã nguồn hoàn thiện, file `Dockerfile`, cấu hình biến môi trường production.
  - *Làm gì:* Viết `Dockerfile` cho Frontend & Backend, tạo `docker-compose.yml`, viết GitHub Actions workflow tự động build và test khi push code lên nhánh `main`.
  - *Ở đâu:* Thư mục gốc dự án và `.github/workflows/`.
- **Kết quả Output:**
  - *Cần gì:* Khả năng triển khai toàn bộ hệ thống bằng 1 câu lệnh `docker-compose up -d`.
  - *Làm gì:* Chạy thử Docker compose trên máy chủ local và đo thời gian phản hồi API.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [ ] Ứng dụng chạy độc lập ổn định trong container.
    - [ ] GitHub Actions chạy tự động build thành công trên GitHub.
- **Tên người thực thi:** DevOps / Fullstack Engineer

---

### [TASK-28] Hoàn thiện Tài liệu Kỹ thuật, Hướng dẫn Sử dụng & Đưa Dự án lên GitHub
- **Mô tả công việc:** Viết tài liệu `README.md` hoàn chỉnh, cập nhật tài liệu API (Swagger/OpenAPI), hướng dẫn cài đặt từng bước cho người phát triển, khởi tạo Git repository và đẩy toàn bộ mã nguồn lên `https://github.com/VanThan19/QuanLyCongChucVien`.
- **Thời gian hoàn thành:** 2 ngày (Estimate: 16h) | Deadline: Tuần 6
- **Thông tin Input:**
  - *Là ai:* Tech Lead / Tác giả dự án (Nguyễn Văn Thân).
  - *Cái gì:* Toàn bộ mã nguồn `front-end`, `back-end`, `CSDL.sql`, tài liệu `ERD_DIAGRAM.md`, `PROJECT_TASKS_ISSUES.md`.
  - *Làm gì:* Kiểm tra `.gitignore`, tạo commit chuẩn Conventional Commits, push lên GitHub remote, tạo GitHub Milestone và tạo các Issues tương ứng 28 task trên.
  - *Ở đâu:* GitHub repository `https://github.com/VanThan19/QuanLyCongChucVien`.
- **Kết quả Output:**
  - *Cần gì:* Repository công khai/riêng tư trên GitHub với đầy đủ mã nguồn, README chuyên nghiệp, các Issues và Project Board được tổ chức bài bản.
  - *Làm gì:* Truy cập link repo trên trình duyệt để kiểm tra hiển thị markdown, sơ đồ Mermaid và danh sách Issues.
  - *Kết quả đã đạt chưa (Acceptance Criteria):*
    - [x] README.md hiển thị đầy đủ mục tiêu đề tài, kiến trúc, sơ đồ ERD.
    - [x] Có đầy đủ 28 issues tương ứng với các tasks được phân rã chi tiết.
    - [x] Kho lưu trữ sạch sẽ, không chứa `node_modules` hay file rác.
- **Tên người thực thi:** Nguyễn Văn Thân (Project Owner / Lead)

---

## TỔNG HỢP DANH SÁCH 28 TASKS / ISSUES

| STT | Mã Issue | Tên Công Việc (Task Title) | Module / Phân Hệ | Thời Gian | Người Thực Thi |
|:---:|:---|:---|:---|:---:|:---|
| 01 | `[TASK-01]` | Thiết kế Sơ đồ Thực thể Quan hệ (ERD) và Từ điển Dữ liệu | Database | 3 ngày | Database Designer |
| 02 | `[TASK-02]` | Khởi tạo Kịch bản CSDL SQL Server và Dữ liệu mẫu ban đầu | Database | 2 ngày | Database Engineer |
| 03 | `[TASK-03]` | Khởi tạo Khung Dự án Backend Spring Boot (Maven, Java 17+) | Backend | 2 ngày | Backend Engineer |
| 04 | `[TASK-04]` | Khởi tạo Khung Dự án Frontend React 19 + Tailwind CSS + Vite | Frontend | 2 ngày | Frontend Engineer |
| 05 | `[TASK-05]` | Xây dựng các Entity JPA & Repository tương ứng 14 bảng CSDL | Backend | 3 ngày | Backend Engineer |
| 06 | `[TASK-06]` | Xây dựng Module Xác thực Tài khoản JWT & Spring Security | Security | 3 ngày | Backend Engineer |
| 07 | `[TASK-07]` | Xây dựng Module Nhật ký Hoạt động (Audit Logging Service & AOP) | Security | 2 ngày | Backend Engineer |
| 08 | `[TASK-08]` | Xây dựng API Quản lý Tài khoản & Phân quyền Người dùng (Admin) | Admin API | 3 ngày | Backend Engineer |
| 09 | `[TASK-09]` | Xây dựng API Quản lý Danh mục Cơ cấu Đơn vị Phòng ban | Core API | 2 ngày | Backend Engineer |
| 10 | `[TASK-10]` | Xây dựng API Quản lý Hồ sơ Lý lịch Cán bộ (EmployeeProfiles CRUD) | Profile API | 4 ngày | Backend Engineer |
| 11 | `[TASK-11]` | Xây dựng API Đào tạo, Công tác, Quan hệ Gia đình | Profile API | 3 ngày | Backend Engineer |
| 12 | `[TASK-12]` | Xây dựng API Quản lý Biến động Lương & Lịch sử Bổ nhiệm Chức vụ | Profile API | 3 ngày | Backend Engineer |
| 13 | `[TASK-13]` | Xây dựng Module Đính kèm Số hóa Hồ sơ & Tài liệu Scan | Storage API | 3 ngày | Backend Engineer |
| 14 | `[TASK-14]` | Xây dựng Quy trình Tiếp nhận & Phê duyệt Đề xuất Cập nhật Hồ sơ | Workflow API | 4 ngày | Backend Engineer |
| 15 | `[TASK-15]` | Xây dựng Giao diện Trang Đăng nhập & Xác thực Captcha | Auth UI | 2 ngày | Frontend Engineer |
| 16 | `[TASK-16]` | Xây dựng Hệ thống Điều hướng & Bảo vệ Tuyến đường theo Vai trò | Auth UI | 2 ngày | Frontend Engineer |
| 17 | `[TASK-17]` | Xây dựng Khung Giao diện Chung (Dashboard Layout, Header, Sidebar) | Common UI | 3 ngày | Frontend Engineer |
| 18 | `[TASK-18]` | Xây dựng Hộp thoại Đổi Mật khẩu & Thông tin Tài khoản Cá nhân | Common UI | 1.5 ngày | Frontend Engineer |
| 19 | `[TASK-19]` | Giao diện Phân hệ Cán bộ (Employee): Xem & Yêu cầu Cập nhật | Employee UI | 4 ngày | Frontend Engineer |
| 20 | `[TASK-20]` | Giao diện Phân hệ Cán bộ Tổ chức (HR Officer): Quản lý & Tiếp nhận | HR Officer UI | 4 ngày | Frontend Engineer |
| 21 | `[TASK-21]` | Giao diện Phân hệ Quản lý Đơn vị (Unit Manager): Giám sát Cán bộ | Unit Mgr UI | 3 ngày | Frontend Engineer |
| 22 | `[TASK-22]` | Giao diện Phân hệ Quản lý Nhân sự (HR Manager): Phê duyệt Biến động | HR Mgr UI | 3 ngày | Frontend Engineer |
| 23 | `[TASK-23]` | Giao diện Phân hệ Quản trị Hệ thống (Admin): Quản trị Tài khoản | Admin UI | 3 ngày | Frontend Engineer |
| 24 | `[TASK-24]` | Xây dựng Chức năng Quản lý Số hóa Hồ sơ Đính kèm (Tệp Scan & Preview) | Media UI | 2 ngày | Frontend Engineer |
| 25 | `[TASK-25]` | Xây dựng Module Báo cáo Thống kê & Xuất dữ liệu Excel/PDF | Reporting | 4 ngày | Fullstack |
| 26 | `[TASK-26]` | Kiểm thử Toàn diện Hệ thống (Unit Test, Integration & UAT) | Testing / QA | 3 ngày | QA / QC Tester |
| 27 | `[TASK-27]` | Tối ưu Hiệu năng, Bảo mật & Xây dựng Kịch bản Triển khai (Docker) | DevOps | 3 ngày | DevOps Engineer |
| 28 | `[TASK-28]` | Hoàn thiện Tài liệu Kỹ thuật, Hướng dẫn & Đưa Dự án lên GitHub | Documentation | 2 ngày | Project Owner / Lead |

