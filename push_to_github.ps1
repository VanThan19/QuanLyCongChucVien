# Script tự động khởi tạo Git, thêm remote và hướng dẫn push lên GitHub
# Repository: https://github.com/VanThan19/QuanLyCongChucVien

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  KHOI TAO VA PUSH DU AN LEN GITHUB: QuanLyCongChucVien  " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Chuyen toi thu muc goc du an
Set-Location "D:\ThucTapCN"

# 2. Kiem tra xem da khoi tao Git chua
if (-not (Test-Path ".git")) {
    Write-Host "[1/5] Khoi tao Git repository..." -ForegroundColor Yellow
    git init
} else {
    Write-Host "[1/5] Git repository da ton tai." -ForegroundColor Green
}

# 3. Kiem tra Remote
$remoteUrl = "https://github.com/VanThan19/QuanLyCongChucVien.git"
$existingRemote = git remote get-url origin 2>$null

if ($null -eq $existingRemote) {
    Write-Host "[2/5] Gan Remote origin: $remoteUrl" -ForegroundColor Yellow
    git remote add origin $remoteUrl
} else {
    Write-Host "[2/5] Cap nhat Remote origin thanh: $remoteUrl" -ForegroundColor Yellow
    git remote set-url origin $remoteUrl
}

# 4. Kiem tra branch chinh la main
git branch -M main

# 5. Add va Commit cac tap tin
Write-Host "[3/5] Dua toan bo ma nguon va tai lieu vao staging..." -ForegroundColor Yellow
git add .

Write-Host "[4/5] Tao Commit dau tien..." -ForegroundColor Yellow
git commit -m "feat: khoi tao du an QuanLyCongChucVien voi day du tai lieu ERD, 28 Tasks Issue, Backend Spring Boot va Frontend React 19"

# 6. Push len GitHub
Write-Host "[5/5] Dang day ma nguon len GitHub branch main..." -ForegroundColor Yellow
Write-Host "Luu y: Neu trinh duyet yeu cau dang nhap hoac nhap Personal Access Token (PAT), vui long xac thuc de hoan tat." -ForegroundColor Magenta

git push -u origin main

Write-Host "`n==========================================================" -ForegroundColor Green
Write-Host "  DA HOAN TAT! Vui long kiem tra tai: " -ForegroundColor Green
Write-Host "  https://github.com/VanThan19/QuanLyCongChucVien" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Green

