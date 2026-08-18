import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load biến môi trường từ file .env
dotenv.config();

// Khởi tạo Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const imagesDir = 'C:\\Users\\ASUS\\Downloads\\jpd123';
const outputFile = path.join(process.cwd(), 'src/data/exam/jpd123_practice.json');

// Hàm tạm dừng để tránh bị chặn vì gửi quá nhiều request cùng lúc (Rate Limit)
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  if (!fs.existsSync(imagesDir)) {
    console.error(`Không tìm thấy thư mục ảnh: ${imagesDir}`);
    return;
  }

  const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));
  console.log(`Tìm thấy ${files.length} ảnh cần xử lý...`);
  
  let results: any[] = [];
  
  // Load dữ liệu cũ nếu có, để nếu script bị lỗi giữa chừng thì chạy lại sẽ không bị mất dữ liệu
  if (fs.existsSync(outputFile)) {
    try {
      const existing = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
      if (Array.isArray(existing)) {
        results = existing;
        console.log(`Đã có ${results.length} câu hỏi từ trước. Tiếp tục xử lý các câu còn lại...`);
      }
    } catch(e) {
      console.log('Không đọc được file cũ, sẽ tạo lại từ đầu.');
    }
  }
  
  let processedCount = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    // Nếu ảnh này đã được xử lý (dựa vào id), bỏ qua
    if (results.length > i && results[i].id === i + 1) {
      continue;
    }

    console.log(`Đang phân tích ảnh ${i + 1}/${files.length}: ${file}`);
    
    const filePath = path.join(imagesDir, file);
    const imageBytes = fs.readFileSync(filePath);
    
    const prompt = `
      Đây là một hình ảnh chứa một câu trắc nghiệm tiếng Nhật, 4 đáp án (thường là A, B, C, D) và đáp án đúng được ghi ở đâu đó trong ảnh.
      Hãy làm các việc sau:
      1. Trích xuất chính xác văn bản câu hỏi.
      2. Trích xuất 4 đáp án thành 1 mảng (chỉ lấy nội dung, không lấy chữ cái A B C D thừa).
      3. Tìm đáp án đúng có trong ảnh và chuyển thành số thứ tự (0, 1, 2, hoặc 3 tương ứng vị trí trong mảng options).
      4. Đóng vai trò là một giáo viên tiếng Nhật, hãy viết một đoạn giải thích thật dễ hiểu bằng tiếng Việt (khoảng 3-4 câu) chỉ ra tại sao đáp án đó lại đúng (giải thích dựa trên cấu trúc ngữ pháp, từ vựng, hoặc ý nghĩa câu).
      
      CHỈ TRẢ VỀ DUY NHẤT MỘT OBJECT JSON ĐÚNG ĐỊNH DẠNG SAU (không có thêm bất kỳ text nào khác):
      {
        "question": "Văn bản câu hỏi",
        "options": ["Đáp án 1", "Đáp án 2", "Đáp án 3", "Đáp án 4"],
        "correctAnswer": 0,
        "explanation": "Giải thích chi tiết..."
      }
    `;

    let retries = 3;
    let success = false;

    while (retries > 0 && !success) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-1.5-flash',
          contents: [
            prompt,
            {
              inlineData: {
                data: imageBytes.toString('base64'),
                mimeType: file.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg'
              }
            }
          ],
          config: {
            responseMimeType: "application/json",
          }
        });
        
        const responseText = response.text || '{}';
        const parsed = JSON.parse(responseText);
        
        results.push({
          id: i + 1,
          question: parsed.question || "N/A",
          options: parsed.options || ["", "", "", ""],
          correctAnswer: parsed.correctAnswer || 0,
          explanation: parsed.explanation || "Không có giải thích."
        });
        
        // Save sau mỗi lần xử lý thành công
        fs.writeFileSync(outputFile, JSON.stringify(results, null, 2), 'utf8');
        console.log(`  -> Thành công! (Nghỉ 4 giây để tránh rate limit...)`);
        
        processedCount++;
        success = true;
        await sleep(4000); // Ngủ 4s
      } catch (error: any) {
        retries--;
        if (retries > 0) {
          console.warn(`  -> Lỗi kết nối/rate limit ở ảnh ${file}. Đang tự động thử lại... (còn ${retries} lần)`);
          await sleep(6000); // Ngủ 6 giây trước khi thử lại
        } else {
          console.error(`  -> LỖI ở ảnh ${file}:`, error.message);
          console.log('--- ĐÃ DỪNG SCRIPT DO LỖI LẶP LẠI QUÁ NHIỀU LẦN ---');
          console.log('Hãy chạy lại lệnh "npx ts-node scripts/extract_exam.ts" để tiếp tục từ vị trí bị lỗi.');
          return; // Thoát hẳn script để tránh bị lỗi liên tiếp
        }
      }
    }
  }
  
  if (processedCount > 0) {
    console.log(`\n🎉 HOÀN THÀNH! Đã phân tích thành công thêm ${processedCount} ảnh.`);
    console.log(`Tổng số câu hỏi hiện có trong hệ thống: ${results.length} câu.`);
  } else if (results.length === files.length) {
    console.log(`\nToàn bộ ${files.length} ảnh đã được phân tích xong từ trước!`);
  }
}

main();
