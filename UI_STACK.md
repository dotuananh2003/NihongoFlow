# UI_STACK.md - Tài liệu Kiến trúc Giao diện Hệ thống Học Tiếng Nhật

## 1. Tổng quan dự án
- **Tên dự án:** Hệ thống học tiếng Nhật jp-forus
- **Mục tiêu:** Cung cấp nền tảng học tiếng Nhật trực quan, tương tác và cá nhân hóa.
- **Đối tượng người dùng:** Người học tiếng Nhật ở các cấp độ (JPD113, JPD123, v.v.).
- **Theme tổng thể:** Mang phong cách Nhật Bản, hiện đại, nhẹ nhàng (Japanese pastel style).

## 2. Design System

### Màu sắc chính
**JPD113:**
- Primary: `#FF4D7A`
- Secondary: `#FF7FA5`
- Background: `#FFF5F8`

**JPD123:**
- Primary: `#2D6BFF`
- Secondary: `#5A8CFF`
- Background: `#F5F9FF`

**Global:**
- Glassmorphism
- Soft shadow
- Rounded corner 20-28px
- Blur backdrop
- Japanese pastel style

## 3. Layout Structure

### Dashboard
Bao gồm:
- Sidebar
- Search Bar
- Welcome Banner
- Progress Cards
- Learning Roadmap
- Daily Activities
- Weekly Statistics

### Sidebar Menu
- Trang chủ
- Nhập môn
- Hán tự
- Từ vựng
- Ngữ pháp
- Ghi nhớ
- Từ vựng chủ động
- Luyện nói

## 4. Hán tự Module

**Flow:**
Kanji Course → Lesson → Kanji Core + Vocabulary

**Kanji Detail gồm:**
- Kanji
- Stroke Count
- Onyomi
- Kunyomi
- Meaning
- Components
- Stroke Animation
- Memory Hint

**Flashcard:**
- **Front:** Kanji
- **Back:** Vietnamese Meaning

**Progress:**
- Chưa thuộc
- Đang học
- Đã thuộc

## 5. Từ vựng Module

**Flow:**
Vocabulary → JPD113/JPD123 → Lesson List → Vocabulary List

**Vocabulary Item:**
- Kanji
- Hiragana
- Romaji
- Meaning
- Type
- Memory Status

**Practice Modes:**

### Flashcard
- **Front:** Japanese
- **Back:** Vietnamese

### Typing
**Options:**
- Hiragana
- Katakana

### Multiple Choice
**Modes:**
1. VN → JP
2. JP → VN
3. Mixed

**Answers:**
- 1 đúng
- 3 nhiễu

**Scope:**
- Selected Words
- Entire Lesson

## 6. Ngữ pháp Module

**Flow:**
Grammar → Course → Lesson → Grammar Pattern → Pattern Detail

**Pattern Detail:**
- Structure
- Meaning
- Usage
- Notes
- Examples

**Theme:**
- JPD113 = Red
- JPD123 = Blue
- No dark borders.
- Use soft cards.

## 7. Typing System

**Hiragana:**
- Main Kana
- Dakuten Kana
- Combination Kana

**Katakana:**
- Main Kana
- Dakuten Kana
- Combination Kana

**Selection Logic:**
*Example: KA Group*
- か
- き
- く
- け
- こ

*If selected:*
- Question pool only contains those kana.
- Typing UI must remain unchanged.
- Only selection UI changes.

## 8. Learning Progress

**Each item stores:**
- id
- lesson
- status
- reviewCount
- lastReview
- accuracy

**Status:**
- unknown
- learning
- mastered

## 9. Reusable Components

**Components:**
- GlassCard
- CourseCard
- LessonCard
- Flashcard
- ProgressCard
- Modal
- Banner
- QuizCard
- TypingInput
- KanjiCard

## 10. UI Rules

**Always maintain:**
- Glassmorphism
- Soft gradients
- Japanese aesthetic
- Responsive design
- Consistent spacing
- Rounded corners
- Theme synchronization

**Never:**
- Use heavy black borders
- Use harsh colors
- Break existing logic
- Modify database structure without request

## 11. Development Rules

**When generating new UI:**
1. Preserve existing business logic.
2. Preserve existing data structures.
3. Only improve visual layer.
4. Maintain theme consistency.
5. Mobile responsive required.
6. Use reusable components.
7. Follow UI_STACK.md before implementing.
