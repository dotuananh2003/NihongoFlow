import fs from 'fs';
import path from 'path';

/**
 * HƯỚNG DẪN SỬ DỤNG SCRIPT TỰ ĐỘNG ĐỌC 219 HÌNH ẢNH:
 * 
 * 1. Lấy API Key miễn phí:
 *    - Truy cập: https://aistudio.google.com/
 *    - Đăng nhập bằng tài khoản Google.
 *    - Chọn "Get API key" ở menu bên trái -> "Create API key".
 * 
 * 2. Cài đặt thư viện Google GenAI:
 *    Mở terminal (PowerShell/CMD) tại thư mục dự án và chạy lệnh:
 *    npm install @google/genai dotenv
 * 
 * 3. Tạo file .env:
 *    Tạo một file tên là `.env` ở thư mục gốc (ngang hàng package.json).
 *    Thêm dòng sau vào file:
 *    GEMINI_API_KEY=điền_api_key_của_bạn_vào_đây
 * 
 * 4. Chạy script này:
 *    Mở terminal và chạy lệnh:
 *    npx ts-node scripts/extract_exam.ts
 * 
 * (Dưới đây là mã nguồn gợi ý để đọc ảnh bằng Gemini API)
 */

/*
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const imagesDir = 'C:\\Users\\ASUS\\Downloads\\jpd123';
const outputFile = path.join(__dirname, '../src/data/exam/jpd123_practice.json');

// ... (logic gửi từng ảnh lên API bằng ai.models.generateContent)
*/

console.log('Script này là bản nháp hướng dẫn. Vui lòng đọc comment trong file để biết cách chạy thực tế với Google Gemini API.');
