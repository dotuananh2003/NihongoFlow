import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Swords, X, Copy, Check, RotateCcw, 
  KeyRound, Bot, Zap, 
  ArrowLeft, Shield, Crown, Flame,
  Radio, CheckCircle2, Clipboard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface PKModeSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PKView = 'select' | 'create' | 'join' | 'random';

// Hàm tự động sinh mã phòng 6 ký tự gồm chữ in hoa và số
const generateRoomCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Bỏ I, O, 0, 1 để tránh nhầm lẫn
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const PKModeSelectModal = ({ isOpen, onClose }: PKModeSelectModalProps) => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<PKView>('select');
  
  // State Tạo phòng
  const [createdRoomCode, setCreatedRoomCode] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<'N5' | 'N4' | 'N3'>('N5');

  // State Nhập mã phòng
  const [inputCode, setInputCode] = useState<string>('');
  const [joinError, setJoinError] = useState<string>('');
  const [isJoining, setIsJoining] = useState(false);
  const inputPinRef = useRef<HTMLInputElement>(null);

  // State Ghép ngẫu nhiên
  const [matchSeconds, setMatchSeconds] = useState(0);
  const [matchFound, setMatchFound] = useState(false);

  // Khóa cuộn trang khi Modal mở và mở lại khi đóng
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Khởi tạo mã phòng ngẫu nhiên khi mở view tạo phòng
  useEffect(() => {
    if (currentView === 'create' && !createdRoomCode) {
      setCreatedRoomCode(generateRoomCode());
    }
  }, [currentView, createdRoomCode]);

  // Tự động focus vào ô nhập mã khi mở view Nhập mã
  useEffect(() => {
    if (currentView === 'join') {
      setTimeout(() => inputPinRef.current?.focus(), 150);
    }
  }, [currentView]);

  // Reset state khi mở/đóng modal
  useEffect(() => {
    if (isOpen) {
      setCurrentView('select');
      setCopiedCode(false);
      setInputCode('');
      setJoinError('');
      setMatchSeconds(0);
      setMatchFound(false);
    }
  }, [isOpen]);

  // Timer đếm giây khi ghép ngẫu nhiên
  useEffect(() => {
    let timer: any;
    if (currentView === 'random' && !matchFound) {
      timer = setInterval(() => {
        setMatchSeconds((prev) => {
          if (prev >= 3) {
            setMatchFound(true);
            return prev + 1;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentView, matchFound]);

  // Sao chép mã phòng vào clipboard
  const handleCopyCode = () => {
    if (!createdRoomCode) return;
    navigator.clipboard.writeText(createdRoomCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // Dán mã nhanh từ clipboard
  const handlePasteCode = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const clean = text.trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
      if (clean) {
        setInputCode(clean);
        setJoinError('');
      }
    } catch (e) {
      // ignore
    }
  };

  // Tạo lại mã phòng mới
  const handleRegenerateCode = () => {
    setCreatedRoomCode(generateRoomCode());
    setCopiedCode(false);
  };

  // Xử lý vào phòng bằng mã
  const handleJoinByCode = () => {
    const formatted = inputCode.trim().toUpperCase();
    if (formatted.length < 6) {
      setJoinError('Vui lòng nhập đủ 6 ký tự mã phòng.');
      return;
    }
    setJoinError('');
    setIsJoining(true);
    setTimeout(() => {
      setIsJoining(false);
      setMatchFound(true);
      setCurrentView('random');
    }, 1200);
  };

  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop Mờ Kính Toàn Màn Hình (Che phủ cả Sidebar và Header) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
          style={{ willChange: 'opacity' }}
        />

        {/* Cửa sổ Popup Modal Chính */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
          className="relative w-full max-w-5xl rounded-[32px] sm:rounded-[36px] bg-slate-900/98 border border-slate-700/90 shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-hidden text-white my-auto z-10 flex flex-col max-h-[94vh]"
        >
          {/* Glowing Ambient Backgrounds */}
          <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-purple-600/20 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-orange-600/20 blur-[90px]" />
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-600/10 blur-[100px]" />

          {/* ========================================================================= */}
          {/* HEADER MODAL */}
          {/* ========================================================================= */}
          <div className="relative z-10 px-5 sm:px-8 py-4 sm:py-5 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-950/40">
            <div className="flex items-center gap-3 min-w-0">
              {currentView !== 'select' && (
                <button
                  onClick={() => {
                    setCurrentView('select');
                    setMatchFound(false);
                    setMatchSeconds(0);
                  }}
                  className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700 shrink-0"
                  title="Quay lại"
                >
                  <ArrowLeft size={18} strokeWidth={2.4} />
                </button>
              )}
              
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-orange-500 via-rose-500 to-purple-600 flex items-center justify-center shadow-lg border border-white/20 shrink-0">
                <Swords size={20} strokeWidth={2.4} className="text-white" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-orange-400 font-jp truncate">
                    1v1 バトルアリーナ
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase bg-red-500/20 text-red-300 border border-red-500/40 shrink-0">
                    Live
                  </span>
                </div>
                <h2 className="text-lg sm:text-2xl font-black tracking-tight text-white font-jp truncate">
                  {currentView === 'select' && 'Đấu Trường PK Tiếng Nhật'}
                  {currentView === 'create' && 'Tạo Phòng Đấu Tập Mới'}
                  {currentView === 'join' && 'Nhập Mã Vào Phòng'}
                  {currentView === 'random' && 'Ghép Trận Ngẫu Nhiên 1v1'}
                </h2>
              </div>
            </div>

            {/* Nút Đóng */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-slate-800/90 hover:bg-rose-600 text-slate-400 hover:text-white transition-all cursor-pointer border border-slate-700 shadow-sm shrink-0"
              title="Đóng cửa sổ"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>

          {/* ========================================================================= */}
          {/* BODY MODAL */}
          {/* ========================================================================= */}
          <div className="relative z-10 p-5 sm:p-8 overflow-y-auto flex-1 custom-scrollbar">
            
            {/* VIEW 1: CHỌN 1 TRONG 3 CHẾ ĐỘ (SELECT) */}
            {currentView === 'select' && (
              <div className="space-y-6">
                <div className="text-center max-w-xl mx-auto space-y-1">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 font-jp">
                    対戦モードを選択 • CHỌN CHẾ ĐỘ THI ĐẤU
                  </p>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Chọn cách thức bạn muốn so tài tiếng Nhật
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-400">
                    Thử thách phản xạ từ vựng, ngữ pháp và tốc độ với người chơi thật hoặc AI Kitsune!
                  </p>
                </div>

                {/* LƯỚI 3 THẺ CHẾ ĐỘ CHƠI */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
                  
                  {/* THẺ 1: TẠO PHÒNG GHÉP */}
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                    onClick={() => {
                      setCreatedRoomCode(generateRoomCode());
                      setCurrentView('create');
                    }}
                    className="group relative overflow-hidden rounded-[28px] sm:rounded-[30px] border border-purple-500/40 bg-slate-950 p-6 shadow-xl hover:shadow-[0_16px_36px_rgba(168,85,247,0.25)] cursor-pointer flex flex-col justify-between min-h-[360px] transition-colors duration-300"
                  >
                    {/* Ảnh nền */}
                    <img
                      src="/images/games/pk-create-room.jpg"
                      alt="Tạo phòng ghép"
                      className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-108 group-hover:opacity-65 transition-transform duration-700"
                    />
                    {/* Gradient bảo vệ chữ */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-purple-950/30" />

                    <div className="relative z-10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-purple-500/30 text-purple-300 border border-purple-400/40 backdrop-blur-md">
                          Phòng Riêng
                        </span>
                        <div className="w-9 h-9 rounded-2xl bg-purple-500/30 border border-purple-400/40 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                          <Crown size={18} strokeWidth={2.4} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-black text-purple-300 font-jp tracking-wider">
                          部屋作成 • HOST ROOM
                        </span>
                        <h4 className="text-xl font-black text-white group-hover:text-purple-300 transition-colors leading-tight">
                          Tạo phòng ghép
                        </h4>
                      </div>

                      <p className="text-xs font-semibold text-slate-300 leading-relaxed line-clamp-3">
                        Tự động sinh mã phòng 6 ký tự. Tùy chỉnh bộ câu hỏi N5 - N4 và gửi mã mời bạn bè vào tỷ thí!
                      </p>
                    </div>

                    <div className="relative z-10 pt-4 border-t border-purple-500/30">
                      <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white text-xs font-black shadow-md flex items-center justify-center gap-2 group-hover:shadow-[0_8px_20px_rgba(168,85,247,0.4)] transition-all">
                        <Crown size={15} strokeWidth={2.4} />
                        <span>Tạo phòng ngay</span>
                      </button>
                    </div>
                  </motion.div>


                  {/* THẺ 2: GHÉP THEO MÃ PHÒNG */}
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                    onClick={() => setCurrentView('join')}
                    className="group relative overflow-hidden rounded-[28px] sm:rounded-[30px] border border-cyan-500/40 bg-slate-950 p-6 shadow-xl hover:shadow-[0_16px_36px_rgba(6,182,212,0.25)] cursor-pointer flex flex-col justify-between min-h-[360px] transition-colors duration-300"
                  >
                    {/* Ảnh nền */}
                    <img
                      src="/images/games/pk-join-code.jpg"
                      alt="Ghép theo mã"
                      className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-108 group-hover:opacity-65 transition-transform duration-700"
                    />
                    {/* Gradient bảo vệ chữ */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-cyan-950/30" />

                    <div className="relative z-10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 backdrop-blur-md">
                          Nhập Mã PIN
                        </span>
                        <div className="w-9 h-9 rounded-2xl bg-cyan-500/30 border border-cyan-400/40 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                          <KeyRound size={18} strokeWidth={2.4} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-black text-cyan-300 font-jp tracking-wider">
                          コード参加 • JOIN BY CODE
                        </span>
                        <h4 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors leading-tight">
                          Ghép phòng theo mã
                        </h4>
                      </div>

                      <p className="text-xs font-semibold text-slate-300 leading-relaxed line-clamp-3">
                        Nhập mã phòng 6 ký tự từ bạn bè hoặc đối thủ để tham gia ngay phòng chờ thi đấu trực tiếp.
                      </p>
                    </div>

                    <div className="relative z-10 pt-4 border-t border-cyan-500/30">
                      <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white text-xs font-black shadow-md flex items-center justify-center gap-2 group-hover:shadow-[0_8px_20px_rgba(6,182,212,0.4)] transition-all">
                        <KeyRound size={15} strokeWidth={2.4} />
                        <span>Nhập mã vào phòng</span>
                      </button>
                    </div>
                  </motion.div>


                  {/* THẺ 3: GHÉP NGẪU NHIÊN */}
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                    onClick={() => {
                      setCurrentView('random');
                      setMatchFound(false);
                      setMatchSeconds(0);
                    }}
                    className="group relative overflow-hidden rounded-[28px] sm:rounded-[30px] border border-orange-500/40 bg-slate-950 p-6 shadow-xl hover:shadow-[0_16px_36px_rgba(249,115,22,0.25)] cursor-pointer flex flex-col justify-between min-h-[360px] transition-colors duration-300"
                  >
                    {/* Ảnh nền */}
                    <img
                      src="/images/games/pk-random-match.jpg"
                      alt="Ghép ngẫu nhiên"
                      className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-108 group-hover:opacity-65 transition-transform duration-700"
                    />
                    {/* Gradient bảo vệ chữ */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-orange-950/30" />

                    <div className="relative z-10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-orange-500/30 text-orange-300 border border-orange-400/40 backdrop-blur-md flex items-center gap-1">
                          <Flame size={12} strokeWidth={2.4} className="text-orange-400" /> Trực Tuyến
                        </span>
                        <div className="w-9 h-9 rounded-2xl bg-orange-500/30 border border-orange-400/40 flex items-center justify-center text-orange-300 group-hover:scale-110 transition-transform">
                          <Zap size={18} strokeWidth={2.4} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-black text-orange-300 font-jp tracking-wider">
                          ランダム対戦 • QUICK 1V1
                        </span>
                        <h4 className="text-xl font-black text-white group-hover:text-orange-300 transition-colors leading-tight">
                          Ghép ngẫu nhiên
                        </h4>
                      </div>

                      <p className="text-xs font-semibold text-slate-300 leading-relaxed line-clamp-3">
                        Tự động tìm kiếm đối thủ online trong vài giây hoặc thách đấu Đại Tướng Cáo AI Kitsune tức thì!
                      </p>
                    </div>

                    <div className="relative z-10 pt-4 border-t border-orange-500/30">
                      <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 text-white text-xs font-black shadow-md flex items-center justify-center gap-2 group-hover:shadow-[0_8px_20px_rgba(249,115,22,0.4)] transition-all">
                        <Zap size={15} strokeWidth={2.4} />
                        <span>Tìm trận nhanh ngay</span>
                      </button>
                    </div>
                  </motion.div>

                </div>
              </div>
            )}


            {/* ========================================================================= */}
            {/* VIEW 2: TẠO PHÒNG GHÉP (CREATE ROOM) */}
            {/* ========================================================================= */}
            {currentView === 'create' && (
              <div className="max-w-2xl mx-auto space-y-6">
                
                {/* Hộp Mã Phòng Tự Sinh 6 Ký Tự */}
                <div className="p-6 sm:p-7 rounded-[28px] bg-slate-950/90 border border-purple-500/40 text-center space-y-4 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div>
                    <span className="px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
                      Mã Phòng Tự Động Sinh (6 Ký Tự)
                    </span>
                    <p className="text-xs text-slate-400 font-semibold mt-2">
                      Gửi mã này cho bạn bè để họ nhập vào và cùng thi đấu!
                    </p>
                  </div>

                  {/* Hiển thị 6 Ô Ký Tự Mã Phòng Lớn */}
                  <div className="flex items-center justify-center gap-2 sm:gap-3 py-1">
                    <div className="flex gap-2 sm:gap-2.5">
                      {createdRoomCode.split('').map((char, index) => (
                        <div
                          key={index}
                          className="w-11 h-14 sm:w-13 sm:h-16 rounded-2xl bg-purple-950/60 border-2 border-purple-500/70 shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center justify-center font-mono text-2xl sm:text-3xl font-black text-purple-200"
                        >
                          {char}
                        </div>
                      ))}
                    </div>

                    {/* Nút Copy & Refresh */}
                    <div className="flex flex-col gap-2 pl-2">
                      <button
                        onClick={handleCopyCode}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer shadow-sm ${
                          copiedCode 
                            ? 'bg-emerald-600 border-emerald-400 text-white' 
                            : 'bg-purple-600 hover:bg-purple-500 border-purple-400 text-white'
                        }`}
                        title="Sao chép mã phòng"
                      >
                        {copiedCode ? <Check size={18} strokeWidth={2.5} /> : <Copy size={18} strokeWidth={2.4} />}
                      </button>

                      <button
                        onClick={handleRegenerateCode}
                        className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Đổi mã phòng khác"
                      >
                        <RotateCcw size={18} strokeWidth={2.4} />
                      </button>
                    </div>
                  </div>

                  {copiedCode && (
                    <p className="text-xs font-black text-emerald-400 flex items-center justify-center gap-1.5 animate-fadeIn">
                      <CheckCircle2 size={14} /> Đã sao chép mã phòng vào bộ nhớ tạm!
                    </p>
                  )}
                </div>

                {/* Tùy Chọn Cấp Độ & Chủ Đề */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Cấp độ */}
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Cấp độ JLPT
                    </span>
                    <div className="flex gap-2">
                      {(['N5', 'N4', 'N3'] as const).map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => setSelectedLevel(lvl)}
                          className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                            selectedLevel === lvl
                              ? 'bg-purple-600 text-white shadow-md'
                              : 'bg-slate-700/60 text-slate-400 hover:text-white'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Số câu */}
                  <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Thời lượng trận đấu
                    </span>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-300 pt-1">
                      <span>10 Câu hỏi</span>
                      <span className="text-purple-400 font-mono">15s / câu</span>
                    </div>
                  </div>
                </div>

                {/* Trạng Thái Chờ Người Chơi */}
                <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300 font-black text-lg">
                      {user?.fullName?.charAt(0) || 'H'}
                    </div>
                    <div>
                      <p className="text-sm font-black text-white">{user?.fullName || 'Chủ phòng (Bạn)'}</p>
                      <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Sẵn sàng
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                      <Radio size={14} className="text-orange-400 animate-pulse" /> Đang chờ đối thủ...
                    </span>
                  </div>
                </div>

                {/* Nút Khởi Động Đấu AI hoặc Hủy */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setCurrentView('select')}
                    className="flex-1 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-black transition-colors cursor-pointer border border-slate-700"
                  >
                    Hủy phòng
                  </button>

                  <button
                    onClick={() => {
                      setMatchFound(true);
                      setCurrentView('random');
                    }}
                    className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white text-sm font-black shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer hover:opacity-95"
                  >
                    <Bot size={18} strokeWidth={2.4} />
                    <span>Đấu với AI Kitsune ngay</span>
                  </button>
                </div>

              </div>
            )}


            {/* ========================================================================= */}
            {/* VIEW 3: NHẬP MÃ VÀO PHÒNG (JOIN BY CODE) */}
            {/* ========================================================================= */}
            {currentView === 'join' && (
              <div className="max-w-md mx-auto space-y-6">
                
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 mx-auto rounded-3xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    <KeyRound size={26} strokeWidth={2.4} />
                  </div>
                  <h3 className="text-xl font-black text-white">Nhập Mã Phòng Đấu</h3>
                  <p className="text-xs font-semibold text-slate-400">
                    Nhập mã gồm 6 ký tự chữ & số do bạn bè cung cấp
                  </p>
                </div>

                {/* Ô Nhập PIN 6 Ô Riêng Biệt Đẹp Mắt */}
                <div className="space-y-4">
                  <div 
                    onClick={() => inputPinRef.current?.focus()}
                    className="flex justify-center gap-2 sm:gap-2.5 cursor-text"
                  >
                    {[0, 1, 2, 3, 4, 5].map((index) => {
                      const char = inputCode[index] || '';
                      const isCurrent = inputCode.length === index;
                      return (
                        <div
                          key={index}
                          className={`w-11 h-14 sm:w-13 sm:h-16 rounded-2xl flex items-center justify-center font-mono text-2xl sm:text-3xl font-black transition-all ${
                            char
                              ? 'bg-cyan-950/80 border-2 border-cyan-400 text-cyan-200 shadow-[0_0_16px_rgba(6,182,212,0.35)]'
                              : isCurrent
                                ? 'bg-slate-950 border-2 border-cyan-500/80 ring-2 ring-cyan-500/30'
                                : 'bg-slate-950/80 border border-slate-700/80 text-slate-600'
                          }`}
                        >
                          {char || (isCurrent ? <span className="w-2 h-6 bg-cyan-400 rounded-full animate-pulse" /> : '•')}
                        </div>
                      );
                    })}
                  </div>

                  {/* Input ẩn để hứng sự kiện gõ phím */}
                  <input
                    ref={inputPinRef}
                    type="text"
                    maxLength={6}
                    value={inputCode}
                    onChange={(e) => {
                      setInputCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''));
                      setJoinError('');
                    }}
                    className="opacity-0 absolute -z-50 h-0 w-0 pointer-events-none"
                    autoFocus
                  />

                  {/* Nút Dán Mã Nhanh */}
                  <div className="flex justify-center">
                    <button
                      onClick={handlePasteCode}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 py-1 px-3 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-colors cursor-pointer"
                    >
                      <Clipboard size={13} /> Dán mã từ bộ nhớ tạm
                    </button>
                  </div>

                  {joinError && (
                    <p className="text-xs font-bold text-rose-400 text-center">
                      {joinError}
                    </p>
                  )}
                </div>

                {/* Nút Hành Động */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setCurrentView('select')}
                    className="flex-1 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-black transition-colors cursor-pointer border border-slate-700"
                  >
                    Quay lại
                  </button>

                  <button
                    onClick={handleJoinByCode}
                    disabled={inputCode.length < 6 || isJoining}
                    className={`flex-1 py-3.5 rounded-2xl text-white text-sm font-black shadow-lg flex items-center justify-center gap-2 transition-all ${
                      inputCode.length === 6 && !isJoining
                        ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:opacity-95 shadow-cyan-600/30 cursor-pointer'
                        : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    }`}
                  >
                    {isJoining ? (
                      <>
                        <RotateCcw size={16} className="animate-spin" />
                        <span>Đang kết nối...</span>
                      </>
                    ) : (
                      <>
                        <Zap size={16} strokeWidth={2.4} />
                        <span>Vào phòng đấu</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            )}


            {/* ========================================================================= */}
            {/* VIEW 4: GHÉP NGẪU NHIÊN & KẾT QUẢ TÌM TRẬN (RANDOM MATCH) */}
            {/* ========================================================================= */}
            {currentView === 'random' && (
              <div className="max-w-xl mx-auto py-4 space-y-6 text-center">
                
                {!matchFound ? (
                  /* Đang tìm trận */
                  <div className="space-y-6">
                    <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                      {/* Radar Pulse Rings */}
                      <span className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping" />
                      <span className="absolute -inset-4 rounded-full bg-orange-500/10 animate-pulse" />
                      
                      <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-orange-500 via-rose-500 to-amber-500 p-1 shadow-[0_0_30px_rgba(249,115,22,0.4)] flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                          <Swords size={36} strokeWidth={2.4} className="text-orange-400" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-orange-500/20 text-orange-300 border border-orange-500/40">
                        Đang Quét Đấu Trường 1v1
                      </span>
                      <h3 className="text-2xl font-black text-white">Đang Tìm Kiếm Đối Thủ...</h3>
                      <p className="text-xs font-semibold text-slate-400 font-mono">
                        Thời gian chờ: 00:0{matchSeconds}s
                      </p>
                    </div>

                    <button
                      onClick={() => setCurrentView('select')}
                      className="px-6 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-black border border-slate-700 cursor-pointer"
                    >
                      Hủy tìm trận
                    </button>
                  </div>
                ) : (
                  /* Đã tìm thấy đối thủ - Màn hình VS */
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-md">
                      <CheckCircle2 size={16} /> ĐÃ TÌM THẤY ĐỐI THỦ!
                    </div>

                    {/* Khung VS Đối Kháng */}
                    <div className="grid grid-cols-11 items-center gap-2 p-6 rounded-[28px] bg-slate-950/90 border-2 border-orange-500/50 shadow-2xl">
                      
                      {/* Bạn */}
                      <div className="col-span-5 flex flex-col items-center space-y-2">
                        <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 p-[3px] shadow-lg">
                          <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-blue-400 font-black text-2xl">
                            {user?.fullName?.charAt(0) || 'H'}
                          </div>
                        </div>
                        <p className="text-sm font-black text-white truncate max-w-[120px]">
                          {user?.fullName || 'Học viên'}
                        </p>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                          Cấp 3 • Sơ cấp
                        </span>
                      </div>

                      {/* Biểu tượng VS */}
                      <div className="col-span-1 flex flex-col items-center">
                        <span className="font-jp font-black text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-b from-orange-400 via-rose-500 to-amber-300 drop-shadow-md">
                          VS
                        </span>
                      </div>

                      {/* Đối thủ */}
                      <div className="col-span-5 flex flex-col items-center space-y-2">
                        <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-rose-500 to-orange-500 p-[3px] shadow-lg">
                          <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-rose-400 font-black text-2xl">
                            🦊
                          </div>
                        </div>
                        <p className="text-sm font-black text-white truncate max-w-[120px]">
                          AI Kitsune Ninja
                        </p>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30">
                          Cấp 3 • Cao thủ
                        </span>
                      </div>

                    </div>

                    <p className="text-xs font-bold text-slate-400">
                      Chuẩn bị... Trận đấu sẽ bắt đầu sau 3 giây!
                    </p>

                    <div className="pt-2">
                      <button 
                        onClick={onClose}
                        className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 text-white font-black text-sm shadow-xl shadow-orange-500/30 hover:scale-105 transition-transform cursor-pointer"
                      >
                        Bắt đầu ngay ⚔️
                      </button>
                    </div>
                  </motion.div>
                )}

              </div>
            )}

          </div>

          {/* ========================================================================= */}
          {/* FOOTER MODAL */}
          {/* ========================================================================= */}
          <div className="px-5 sm:px-8 py-3.5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-semibold">
              <Shield size={14} className="text-orange-400" /> Hệ thống đấu xếp hạng công bằng
            </span>
            <span className="font-jp font-bold text-slate-500">
              JP Forus • 1v1 Battle System
            </span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};
