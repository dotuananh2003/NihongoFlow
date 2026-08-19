# JP Forus

React + TypeScript + Vite app for Japanese learning.

## Chạy frontend

```bash
npm install
npm run dev
```

Frontend chạy mặc định ở `http://localhost:5173`.

## Tạo database bằng SSMS

1. Mở SQL Server Management Studio.
2. Kết nối SQL Server local hoặc server bạn đang dùng.
3. Mở file `database/001_create_auth.sql`.
4. Chạy toàn bộ script. Script sẽ tạo database `JpForus` và các bảng:
   `Users`, `ExternalLogins`, `RefreshTokens`, `PasswordResetTokens`, `LoginAudits`.

## Cấu hình đăng nhập / đăng ký

Tạo file `.env` từ `.env.example`, sau đó sửa các biến cho đúng máy:

```env
PORT=4000
CLIENT_URL=http://localhost:5173

SQL_SERVER=localhost
SQL_PORT=1433
SQL_DATABASE=JpForus
SQL_USER=
SQL_PASSWORD=
SQL_ENCRYPT=false
SQL_TRUST_SERVER_CERTIFICATE=true

JWT_ACCESS_SECRET=replace-with-a-long-random-access-secret
JWT_REFRESH_SECRET=replace-with-a-long-random-refresh-secret
GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com
```

Khuyến nghị tạo SQL Login riêng cho app rồi điền `SQL_USER` và `SQL_PASSWORD`. SSMS vẫn dùng để quản lý database bình thường; nếu muốn Windows Authentication tích hợp trực tiếp cho Node thì cần bổ sung driver riêng như `msnodesqlv8`.

## Chạy Auth API

```bash
npm run dev:api
```

API chạy ở `http://localhost:4000`, frontend đã proxy `/api` sang port này trong `vite.config.ts`.

## Google Login

Tạo OAuth Client ID tại Google Cloud Console, thêm origin `http://localhost:5173`, rồi đặt cùng client id cho:

```env
GOOGLE_CLIENT_ID=...
VITE_GOOGLE_CLIENT_ID=...
```

Luồng hiện có: đăng ký email/password, đăng nhập email/password, đăng nhập Google, refresh token qua HTTP-only cookie, đăng xuất, quên mật khẩu và reset mật khẩu.
