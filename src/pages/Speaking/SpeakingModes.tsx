import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  ArrowRight, 
  Headphones, 
  MessageSquare, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  Volume2, 
  Mic, 
  Activity, 
  Clock, 
  Flame,
  Info
} from 'lucide-react';

export const SpeakingModes = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const isJpd113 = courseId?.toLowerCase() === 'jpd113';
  const courseCode = courseId?.toUpperCase() || 'JPD113';
  const courseTitle = isJpd113 ? 'Sơ Cấp 1 (N5)' : 'Sơ Cấp 2 (N5+)';

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col px-4 md:px-6 pt-2 pb-8 max-w-4xl mx-auto justify-center">
      {/* Dynamic Japanese Aesthetic Atmosphere */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/40 via-white to-purple-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20" />
      <div className="pointer-events-none fixed top-16 left-1/3 -z-10 h-60 w-60 rounded-full bg-purple-300/15 blur-3xl dark:bg-purple-900/10" />

      {/* Top Breadcrumbs & Back button */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => navigate('/speaking')}
          className="group inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white/80 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-xs backdrop-blur-md transition-all hover:border-purple-300 hover:bg-white hover:text-purple-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-purple-500/40 dark:hover:text-purple-300"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          <span>Danh sách giáo trình</span>
        </button>

        <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-200/70 bg-purple-50/90 px-3 py-1 text-[11px] font-black text-purple-700 shadow-xs dark:border-purple-900/50 dark:bg-purple-950/50 dark:text-purple-300">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-ping" />
          {courseCode} • {courseTitle}
        </div>
      </div>

      {/* Main Header */}
      <motion.div 
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-6 text-center space-y-1.5"
      >
        <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200/60 bg-indigo-50/80 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-indigo-600 shadow-xs backdrop-blur-md dark:border-indigo-900/40 dark:bg-indigo-950/60 dark:text-indigo-300">
          <Sparkles size={12} className="text-indigo-500 animate-pulse" />
          Nihongo Speaking Dojo
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase flex flex-row items-center justify-center gap-2">
          CHỌN PHƯƠNG THỨC <span className="font-jp text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600">練習</span>
        </h1>

        <p className="text-slate-600 dark:text-slate-400 font-medium max-w-md mx-auto text-xs sm:text-sm">
          Lựa chọn chế độ rèn luyện phù hợp với mục tiêu học tập của bạn
        </p>
      </motion.div>

      {/* 2 COMPACT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto w-full">
        
        {/* CARD 1: ĐỌC THÀNH TIẾNG (SHADOWING & PHONICS) */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          whileHover={{ y: -5 }}
          onClick={() => navigate(`/speaking/${courseId}/shadowing`)}
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-purple-200/70 bg-gradient-to-b from-white/95 via-purple-50/20 to-white/90 p-5 shadow-[0_12px_30px_rgba(147,51,234,0.08)] backdrop-blur-xl transition-all duration-300 cursor-pointer dark:border-purple-500/20 dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-900 dark:to-purple-950/20 hover:border-purple-400 dark:hover:border-purple-500/50 hover:shadow-[0_16px_36px_rgba(147,51,234,0.16)]"
        >
          {/* Top glowing accent line */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          
          {/* Japanese Watermark */}
          <div className="pointer-events-none absolute -right-2 -bottom-4 select-none font-jp text-[6.5rem] font-black leading-none text-purple-600/[0.05] dark:text-purple-400/[0.03] transition-transform duration-500 group-hover:scale-105">
            音
          </div>

          <div className="relative z-10 flex flex-col h-full">
            {/* Card Header */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800">
                  SHADOWING
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/50">
                  <Activity size={10} /> AI Score
                </span>
              </div>

              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-sm ring-2 ring-purple-100 dark:ring-purple-950 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <Headphones size={18} strokeWidth={2.5} />
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="mb-3">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-purple-600 dark:text-purple-400">
                Luyện phát âm chuẩn
              </h3>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
                Luyện đọc thành tiếng
              </h2>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                Nghe giọng Tokyo chuẩn, nhại theo nhịp điệu và nhận đánh giá độ chính xác qua AI.
              </p>
            </div>

            {/* Visual Element: Audio Soundwave Mockup */}
            <div className="my-2 rounded-xl border border-purple-100 bg-purple-50/50 p-2.5 dark:border-purple-900/30 dark:bg-purple-950/30 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-purple-900 dark:text-purple-200">
                <span className="flex items-center gap-1">
                  <Volume2 size={13} className="text-purple-600" />
                  Waveform Tokyo
                </span>
                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                  Chuẩn 100%
                </span>
              </div>

              {/* Animated Sound Wave Bars */}
              <div className="flex items-center justify-between gap-1 h-6 px-1">
                {[40, 75, 30, 90, 60, 100, 45, 80, 50, 95, 35, 70, 85, 40, 65, 90, 55, 30].map((height, i) => (
                  <div
                    key={i}
                    style={{ height: `${height}%` }}
                    className="w-1 rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 opacity-75 group-hover:opacity-100 transition-all duration-300"
                  />
                ))}
              </div>
            </div>

            {/* Feature Checklist */}
            <div className="my-2.5 space-y-1.5">
              {[
                'Phát âm chuẩn giọng bản xứ Tokyo 100%',
                'Chấm điểm từng âm tiết & khẩu hình AI',
                'Tùy chỉnh tốc độ đọc chậm 0.8x hoặc 1.0x'
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  <CheckCircle2 size={13} className="text-purple-500 shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-auto pt-3">
              <div className="relative flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-4 py-2.5 text-xs font-black text-white shadow-md shadow-purple-500/20 transition-all duration-300 group-hover:shadow-purple-500/35 group-hover:brightness-105 active:scale-[0.98]">
                <Mic size={15} />
                <span>Vào phòng Shadowing</span>
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* CARD 2: PHẢN XẠ VẤN ĐÁP (KAIWA & RAPID DIALOGUE) */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          whileHover={{ y: -5 }}
          onClick={() => navigate(`/speaking/${courseId}/reflex`)}
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-rose-200/70 bg-gradient-to-b from-white/95 via-rose-50/20 to-white/90 p-5 shadow-[0_12px_30px_rgba(244,63,94,0.08)] backdrop-blur-xl transition-all duration-300 cursor-pointer dark:border-rose-500/20 dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-900 dark:to-rose-950/20 hover:border-rose-400 dark:hover:border-rose-500/50 hover:shadow-[0_16px_36px_rgba(244,63,94,0.16)]"
        >
          {/* Top glowing accent line */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-400" />
          
          {/* Japanese Watermark */}
          <div className="pointer-events-none absolute -right-2 -bottom-4 select-none font-jp text-[6.5rem] font-black leading-none text-rose-600/[0.05] dark:text-rose-400/[0.03] transition-transform duration-500 group-hover:scale-105">
            答
          </div>

          <div className="relative z-10 flex flex-col h-full">
            {/* Card Header */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800">
                  KAIWA REFLEX
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/50">
                  <Flame size={10} className="text-orange-500" /> 3s Speed
                </span>
              </div>

              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-sm ring-2 ring-rose-100 dark:ring-rose-950 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <MessageSquare size={18} strokeWidth={2.5} />
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="mb-3">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-rose-600 dark:text-rose-400">
                Phản xạ tình huống
              </h3>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
                Luyện phản xạ vấn đáp
              </h2>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                Đóng vai vào tình huống thực tế tại Nhật và bật ra câu trả lời tự nhiên trong 3 giây.
              </p>
            </div>

            {/* Visual Element: Mini Roleplay Dialogue Snippet Preview */}
            <div className="my-2 rounded-xl border border-rose-100 bg-rose-50/50 p-2.5 dark:border-rose-900/30 dark:bg-rose-950/30 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-rose-900 dark:text-rose-200">
                <span className="flex items-center gap-1">
                  <Zap size={12} className="text-orange-500" />
                  Đàm thoại thực tế
                </span>
                <span className="flex items-center gap-1 text-[10px] font-extrabold text-amber-600 dark:text-amber-400">
                  <Clock size={10} /> Phản xạ 3s
                </span>
              </div>

              {/* Mini Chat Stream */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] bg-white dark:bg-slate-800 px-2 py-1 rounded-lg border border-rose-100 dark:border-slate-700">
                  <span>🌸</span>
                  <span className="font-jp font-bold text-slate-800 dark:text-slate-200 truncate">「となりの席、座ってもいい？」</span>
                </div>
                <div className="flex items-center justify-end text-[11px]">
                  <div className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-2 py-0.5 rounded-lg font-jp font-bold shadow-xs">
                    「ええ、どうぞ！」⚡
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Checklist */}
            <div className="my-2.5 space-y-1.5">
              {[
                'Nhập vai đối thoại hơn 30 ngữ cảnh đời sống',
                'Tập tư duy Nhật - Nhật không cần dịch nhẩm',
                'Tăng tốc phản xạ tự tin khi giao tiếp thực tế'
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  <CheckCircle2 size={13} className="text-rose-500 shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-auto pt-3">
              <div className="relative flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-600 to-orange-500 px-4 py-2.5 text-xs font-black text-white shadow-md shadow-rose-500/20 transition-all duration-300 group-hover:shadow-rose-500/35 group-hover:brightness-105 active:scale-[0.98]">
                <Zap size={15} />
                <span>Bắt đầu Đấu trường Kaiwa</span>
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Pro-tip Banner (Compact) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="mt-6 max-w-3xl mx-auto w-full rounded-xl border border-slate-200/80 bg-white/70 px-3.5 py-2.5 shadow-xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/70 flex items-center gap-2.5 text-[11px] font-medium text-slate-600 dark:text-slate-300"
      >
        <div className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-300">
          <Info size={14} />
        </div>
        <p className="leading-snug">
          <span className="font-bold text-slate-900 dark:text-white">Mẹo:</span> Nên sử dụng tai nghe có mic trong không gian yên tĩnh để AI chấm điểm giọng đọc chính xác nhất.
        </p>
      </motion.div>
    </div>
  );
};


