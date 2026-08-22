import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const imgDir = 'E:\\All App\\Coding_Workspace\\universal-web-capture\\output\\JPD123 - SP25 - RE';
const outputFilePath = path.join(__dirname, '../src/data/mockExams/JPD123_SP25_RE.ts');

async function processImage(filePath) {
    const data = fs.readFileSync(filePath);
    const base64Image = Buffer.from(data).toString('base64');

    const prompt = `Trích xuất câu hỏi trắc nghiệm tiếng Nhật từ hình ảnh này thành một object JSON duy nhất, KHÔNG có thẻ markdown (như \`\`\`json).
Định dạng bắt buộc:
{
  "id": 1, // Lấy số thứ tự câu hỏi ở góc dưới cùng bên phải ảnh (ví dụ: Q: 8 thì điền 8)
  "questionText": "Câu hỏi ở đây...",
  "options": ["Đáp án 1", "Đáp án 2", "Đáp án 3", "Đáp án 4"],
  "correctAnswerIndex": 0 // 0 cho A, 1 cho B, 2 cho C, 3 cho D. Nhìn vào checkbox được tick màu xanh hoặc xanh dương trong ảnh.
}
Lưu ý:
- KHÔNG kèm tiền tố A., B., C., D. vào trong options.
- Lấy chính xác số câu hỏi ở góc dưới cùng bên phải.
- Nếu có câu hỏi dạng "Chọn từ khác loại..." hoặc tương tự, nhớ ghi đầy đủ.
Chỉ in ra đúng nội dung JSON, không kèm bất kỳ chữ nào khác.`;

    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.0-flash',
                contents: [
                    prompt,
                    { inlineData: { data: base64Image, mimeType: 'image/png' } }
                ]
            });

            let text = response.text().trim().replace(/^```(json)?|```$/g, '').trim();
            const obj = JSON.parse(text);
            return obj;
        } catch (e) {
            console.error(`Error processing ${path.basename(filePath)} on attempt ${attempt}: ${e.message}`);
            if (attempt === 3) return null;
            await new Promise(r => setTimeout(r, 2000));
            // fallback to 1.5 if 2.0 fails for some reason
            if (e.message.includes('not found') || e.message.includes('model')) {
                try {
                    const response = await ai.models.generateContent({
                        model: 'gemini-1.5-flash',
                        contents: [
                            prompt,
                            { inlineData: { data: base64Image, mimeType: 'image/png' } }
                        ]
                    });
                    let text = response.text().trim().replace(/^```(json)?|```$/g, '').trim();
                    return JSON.parse(text);
                } catch (err) {}
            }
        }
    }
}

async function main() {
    let questions = [];
    console.log('Starting extraction of 30 images...');
    for (let i = 1; i <= 30; i++) {
        const fileName = `capture_${String(i).padStart(4, '0')}.png`;
        const filePath = path.join(imgDir, fileName);
        if (fs.existsSync(filePath)) {
            console.log(`Processing ${fileName}...`);
            const res = await processImage(filePath);
            if (res && res.options) {
                questions.push(res);
            }
        }
        await new Promise(r => setTimeout(r, 2000)); // prevent rate limit
    }
    
    // Sort by id to order from 1 to 30 based on the corner text
    questions.sort((a, b) => a.id - b.id);
    
    // Ensure IDs are sequentially 1 to 30 for the app
    questions.forEach((q, index) => {
        q.id = index + 1;
    });

    const fileContent = `import type { MockQuestion } from "../../types/exam";

export const JPD123_SP25_RE: MockQuestion[] = ${JSON.stringify(questions, null, 2)};
`;
    
    fs.writeFileSync(outputFilePath, fileContent, 'utf8');
    console.log('Successfully generated JPD123_SP25_RE.ts with correctly ordered questions.');
}

main();
