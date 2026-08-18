import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'exam', 'jpd123_practice.json');
const progressFilePath = path.join(process.cwd(), 'docs', 'extraction_progress.json');

let practiceData = [];
if (fs.existsSync(dataFilePath)) {
    const raw = fs.readFileSync(dataFilePath, 'utf8');
    if (raw.trim()) {
        practiceData = JSON.parse(raw);
    }
}
let nextId = practiceData.length > 0 ? Math.max(...practiceData.map(q => q.id)) + 1 : 1;

let progress = { last_processed_index: 810, history: [] };
if (fs.existsSync(progressFilePath)) {
    progress = JSON.parse(fs.readFileSync(progressFilePath, 'utf8'));
}

const imgDir = 'C:\\Users\\ASUS\\Downloads\\jpd123';
const count = 30;
const startIdx = progress.last_processed_index + 1;
const endIdx = startIdx + count - 1;

async function processImage(filePath, retries = 3) {
    const data = fs.readFileSync(filePath);
    const base64Image = Buffer.from(data).toString('base64');

    const prompt = `Trích xuất câu hỏi trắc nghiệm tiếng Nhật từ hình ảnh này thành một object JSON duy nhất, KHÔNG có thẻ markdown (như \`\`\`json).
Định dạng bắt buộc:
{
  "question": "Câu hỏi ở đây...",
  "options": ["Đáp án 1", "Đáp án 2", "Đáp án 3", "Đáp án 4"],
  "correctAnswer": 0, // 0 cho A, 1 cho B, 2 cho C, 3 cho D. (dựa vào ghi chú trong ảnh hoặc tự giải)
  "explanation": "Giải thích chi tiết ý nghĩa, cách đọc Hiragana, Hán tự của các đáp án và câu hỏi."
}
Lưu ý:
- KHÔNG kèm tiền tố A: B: C: D: vào trong options.
- Nếu ảnh không có câu hỏi trắc nghiệm, trả về {}
- Nếu có đáp án viết tay ở dưới cùng của ảnh, hãy dùng nó làm correctAnswer.
- Hãy điền explanation thật chi tiết bằng tiếng Việt.
Chỉ in ra đúng nội dung JSON, không kèm bất kỳ chữ nào khác.`;

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-1.5-flash',
                contents: [
                    prompt,
                    { inlineData: { data: base64Image, mimeType: 'image/png' } }
                ]
            });

            let text = response.text().trim().replace(/^```(json)?|```$/g, '').trim();
            const obj = JSON.parse(text);
            if (obj.options) {
                obj.options = obj.options.map(o => o.replace(/^[A-D]:\s*/, ''));
            }
            return obj;
        } catch (e) {
            console.error(`Attempt ${attempt} error processing ${filePath}:`, e.message);
            if (attempt === retries) return null;
            await new Promise(r => setTimeout(r, 5000 * attempt));
        }
    }
}

async function main() {
    console.log(`Starting extraction of ${count} images from index ${startIdx} to ${endIdx}...`);
    let addedCount = 0;
    
    for (let i = startIdx; i <= endIdx; i++) {
        const fileName = `Screenshot (${i}).png`;
        const filePath = path.join(imgDir, fileName);
        if (fs.existsSync(filePath)) {
            console.log(`Processing ${fileName}...`);
            const res = await processImage(filePath);
            if (res && res.question) {
                practiceData.push({
                    id: nextId++,
                    ...res
                });
                addedCount++;
                console.log(`Added question from ${fileName}`);
                fs.writeFileSync(dataFilePath, JSON.stringify(practiceData, null, 2));
            } else {
                console.log(`No valid question found in ${fileName}`);
            }
        } else {
            console.log(`File not found: ${fileName}`);
        }
        
        // Wait 4 seconds to respect 15 RPM free tier limit
        await new Promise(r => setTimeout(r, 4000));
    }
    
    // Update progress
    progress.last_processed_index = endIdx;
    const today = new Date().toISOString().split('T')[0];
    progress.history.push({
        date: today,
        course: "jpd123",
        start_index: startIdx,
        end_index: endIdx,
        total_extracted: addedCount
    });
    fs.writeFileSync(progressFilePath, JSON.stringify(progress, null, 2));
    
    console.log(`Extraction complete. Added ${addedCount} new questions. Progress saved.`);
}

main();
