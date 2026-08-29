import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import './mascot.css';

export type MascotState = 'idle' | 'email' | 'password' | 'error' | 'success';

interface JapaneseMascotProps {
  state?: MascotState;
  className?: string;
  showSpeechBubble?: boolean;
  customMessage?: string;
  disableMotion?: boolean;
}

const speechMessages: Record<MascotState, { jp: string; vi: string }> = {
  idle: {
    jp: 'おかえり!',
    vi: 'Chào mừng bạn quay lại JP Forus!',
  },
  email: {
    jp: 'いっしょに学ぼう!',
    vi: 'Hôm nay mình học tiếp nhé!',
  },
  password: {
    jp: '見ないよ',
    vi: 'Tớ che mắt rồi, bạn cứ nhập mật khẩu.',
  },
  error: {
    jp: 'もう一度!',
    vi: 'Kiểm tra lại thông tin một chút nhé.',
  },
  success: {
    jp: 'できた!',
    vi: 'Thành công rồi, vào học thôi!',
  },
};

const mascotMotion = {
  idle: { y: [0, -5, 0], rotate: [0, 0.8, 0] },
  email: { y: [0, -4, 0], rotate: [-1, 1, -1] },
  password: { y: [0, 2, 0], rotate: [0, -0.6, 0] },
  error: { x: [0, -5, 5, -3, 3, 0], y: [0, 2, 0] },
  success: { y: [0, -15, 0, -7, 0], rotate: [0, -3, 3, 0] },
} satisfies Record<MascotState, object>;

export const JapaneseMascot = ({
  state = 'idle',
  className = '',
  showSpeechBubble = true,
  customMessage,
  disableMotion = false,
}: JapaneseMascotProps) => {
  const currentMessage = customMessage
    ? { jp: customMessage, vi: '' }
    : speechMessages[state] ?? speechMessages.idle;

  return (
    <div className={`jp-mascot auth-gpu-card ${className}`} data-state={state}>
      {showSpeechBubble && (
        <div className="jp-mascot__bubble-slot">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${state}-${customMessage ?? ''}`}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="jp-mascot__bubble"
            >
              <p className="jp-mascot__bubble-jp">
                {state === 'success' && <Sparkles size={14} />}
                {currentMessage.jp}
              </p>
              {currentMessage.vi && <p className="jp-mascot__bubble-vi">{currentMessage.vi}</p>}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      <div className="jp-mascot__stage">
        <motion.svg
          viewBox="0 0 260 260"
          role="img"
          aria-label="JP Forus fox mascot"
          className="jp-mascot__svg"
          animate={disableMotion ? undefined : mascotMotion[state]}
          transition={disableMotion ? undefined : {
            duration: state === 'error' ? 0.45 : state === 'success' ? 1.25 : 3.2,
            repeat: state === 'error' ? 0 : Infinity,
            ease: 'easeInOut',
          }}
        >
          <defs>
            <linearGradient id="foxFurMain" x1="74" x2="186" y1="30" y2="218" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#FDBA74" />
              <stop offset="0.52" stopColor="#F97316" />
              <stop offset="1" stopColor="#EA580C" />
            </linearGradient>
            <linearGradient id="foxTailTip" x1="36" x2="102" y1="86" y2="168" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#FFF7ED" />
            </linearGradient>
            <linearGradient id="foxCardGrad" x1="178" x2="224" y1="54" y2="102" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#EFF6FF" />
              <stop offset="1" stopColor="#DBEAFE" />
            </linearGradient>
            <filter id="foxSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="12" stdDeviation="9" floodColor="#9A3412" floodOpacity="0.16" />
            </filter>
          </defs>

          <ellipse id="Ground_Shadow" cx="130" cy="226" rx="68" ry="11" fill="#0F172A" opacity="0.1" />

          <motion.g
            id="Tail"
            animate={disableMotion ? undefined : { rotate: state === 'success' ? [-8, 13, -8] : [-5, 7, -5] }}
            transition={disableMotion ? undefined : { duration: state === 'success' ? 1.1 : 2.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originX: '91px', originY: '174px' }}
          >
            <path
              id="Tail_Fur"
              d="M96 181c-39 25-82 7-90-32-7-36 14-73 52-84 35-10 68 11 74 45-26 9-43 27-36 71Z"
              fill="url(#foxFurMain)"
              filter="url(#foxSoftShadow)"
            />
            <path
              id="Tail_White_Tip"
              d="M58 65c-29 10-49 39-47 70 18-15 39-22 62-19-8-19-13-35-15-51Z"
              fill="url(#foxTailTip)"
            />
            <path
              id="Tail_Glow"
              d="M103 105c16 28 13 58-7 76"
              fill="none"
              stroke="#FED7AA"
              strokeWidth="7"
              strokeLinecap="round"
              opacity="0.5"
            />
          </motion.g>

          <g id="Body" filter="url(#foxSoftShadow)">
            <path
              id="Kimono_Body"
              d="M78 153c0-28 23-50 52-50s52 22 52 50l13 60c2 11-7 20-18 20H83c-11 0-20-9-18-20l13-60Z"
              fill="#2563EB"
            />
            <path id="Kimono_Left_Fold" d="M99 112l31 54-52 45 10-56c2-18 4-32 11-43Z" fill="#38BDF8" opacity="0.62" />
            <path id="Kimono_Right_Fold" d="M161 112l-31 54 52 45-10-56c-2-18-4-32-11-43Z" fill="#1D4ED8" opacity="0.74" />
            <path id="Collar_Left" d="M105 111l25 42" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
            <path id="Collar_Right" d="M155 111l-25 42" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
            <rect id="Obi_Belt" x="79" y="171" width="102" height="20" rx="8" fill="#FACC15" />
            <path id="Obi_Line" d="M85 181h90" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
          </g>

          <motion.g
            id="Left_Paw"
            animate={disableMotion ? undefined : (
              state === 'password'
                ? { x: 28, y: -45, rotate: 18 }
                : state === 'success'
                  ? { x: -12, y: -36, rotate: -34 }
                  : { x: 0, y: 0, rotate: -3 }
            )}
            transition={disableMotion ? undefined : { type: 'spring', stiffness: 340, damping: 24 }}
            style={{ originX: '84px', originY: '157px' }}
          >
            <ellipse cx="82" cy="157" rx="20" ry="17" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="4" />
            <circle cx="82" cy="158" r="5" fill="#FDA4AF" />
            <circle cx="73" cy="151" r="2.5" fill="#FDA4AF" />
            <circle cx="82" cy="149" r="2.5" fill="#FDA4AF" />
            <circle cx="91" cy="151" r="2.5" fill="#FDA4AF" />
          </motion.g>

          <motion.g
            id="Right_Paw"
            animate={disableMotion ? undefined : (
              state === 'password'
                ? { x: -28, y: -45, rotate: -18 }
                : state === 'email'
                  ? { x: 12, y: -18, rotate: 26 }
                  : state === 'success'
                    ? { x: 12, y: -36, rotate: 34 }
                    : { x: 0, y: 0, rotate: 3 }
            )}
            transition={disableMotion ? undefined : { type: 'spring', stiffness: 340, damping: 24 }}
            style={{ originX: '176px', originY: '157px' }}
          >
            <ellipse cx="178" cy="157" rx="20" ry="17" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="4" />
            <circle cx="178" cy="158" r="5" fill="#93C5FD" />
            <circle cx="169" cy="151" r="2.5" fill="#93C5FD" />
            <circle cx="178" cy="149" r="2.5" fill="#93C5FD" />
            <circle cx="187" cy="151" r="2.5" fill="#93C5FD" />
          </motion.g>

          <motion.g
            id="Head"
            animate={disableMotion ? undefined : (
              state === 'email'
                ? { rotate: 4, x: 3 }
                : state === 'error'
                  ? { rotate: -4, y: 3 }
                  : { rotate: 0, x: 0, y: 0 }
            )}
            transition={disableMotion ? undefined : { type: 'spring', stiffness: 300, damping: 24 }}
            style={{ originX: '130px', originY: '123px' }}
          >
            <g id="Ears">
              <path id="Left_Ear" d="M73 84C56 43 72 18 107 46c0 23-11 42-26 51Z" fill="url(#foxFurMain)" />
              <path id="Left_Inner_Ear" d="M80 76c-8-23 2-38 20-26-1 16-8 27-20 26Z" fill="#FDB4C4" />
              <path id="Right_Ear" d="M187 84c17-41 1-66-34-38 0 23 11 42 26 51Z" fill="url(#foxFurMain)" />
              <path id="Right_Inner_Ear" d="M180 76c8-23-2-38-20-26 1 16 8 27 20 26Z" fill="#FDB4C4" />
              <path id="Left_Ear_Tip" d="M73 33c5 5 9 12 11 20-8-5-12-12-11-20Z" fill="#7C2D12" opacity="0.82" />
              <path id="Right_Ear_Tip" d="M187 33c-5 5-9 12-11 20 8-5 12-12 11-20Z" fill="#7C2D12" opacity="0.82" />
            </g>

            <path
              id="Face_Orange"
              d="M61 110c0-43 34-75 69-75s69 32 69 75c0 41-31 67-69 67s-69-26-69-67Z"
              fill="url(#foxFurMain)"
              filter="url(#foxSoftShadow)"
            />
            <path
              id="Face_White"
              d="M65 121c16-22 42-24 65-3 23-21 49-19 65 3-4 35-32 56-65 56s-61-21-65-56Z"
              fill="#FFF7ED"
            />
            <path id="Forehead_Mark" d="M130 64c-5 12-5 22 0 30 5-8 5-18 0-30Z" fill="#DC2626" />
            <circle id="Left_Cheek" cx="92" cy="131" r="9" fill="#FDA4AF" opacity={state === 'password' ? 0.9 : 0.6} />
            <circle id="Right_Cheek" cx="168" cy="131" r="9" fill="#FDA4AF" opacity={state === 'password' ? 0.9 : 0.6} />

            {state === 'success' ? (
              <g id="Eyes_Happy">
                <path d="M88 111q12-13 24 0" fill="none" stroke="#172033" strokeWidth="5.5" strokeLinecap="round" />
                <path d="M148 111q12-13 24 0" fill="none" stroke="#172033" strokeWidth="5.5" strokeLinecap="round" />
              </g>
            ) : state === 'password' ? (
              <g id="Eyes_Closed">
                <path d="M89 113h23" stroke="#172033" strokeWidth="5.5" strokeLinecap="round" />
                <path d="M148 113h23" stroke="#172033" strokeWidth="5.5" strokeLinecap="round" />
              </g>
            ) : (
              <g id="Eyes_Open" className="jp-mascot__eyes">
                <ellipse cx="101" cy="111" rx="9" ry="12" fill="#172033" />
                <ellipse cx="159" cy="111" rx="9" ry="12" fill="#172033" />
                <circle cx="104" cy="106" r="3" fill="#FFFFFF" />
                <circle cx="162" cy="106" r="3" fill="#FFFFFF" />
              </g>
            )}

            <path id="Snout" d="M118 130q12 10 24 0" fill="#7C2D12" />
            <path id="Nose" d="M123 127q7 6 14 0q-7-7-14 0Z" fill="#172033" />
            <path
              id="Mouth"
              d={state === 'error' ? 'M118 146q12-8 24 0' : 'M117 140q13 14 26 0'}
              fill="none"
              stroke="#172033"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
          </motion.g>

          <motion.g
            id="Learning_Card"
            animate={disableMotion ? undefined : { rotate: state === 'email' ? [-7, 7, -7] : [-3, 3, -3] }}
            transition={disableMotion ? undefined : { duration: state === 'email' ? 1.1 : 2.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originX: '205px', originY: '78px' }}
          >
            <rect x="181" y="52" width="49" height="52" rx="17" fill="url(#foxCardGrad)" stroke="#BFDBFE" strokeWidth="3" />
            <text x="205.5" y="84" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="23" fontWeight="900" fill="#2563EB">
              あ
            </text>
          </motion.g>

          {state === 'success' && (
            <g id="Success_Sparkles">
              <path d="M49 75l5 10 10 5-10 5-5 10-5-10-10-5 10-5 5-10Z" fill="#FACC15" />
              <path d="M209 117l4 8 8 4-8 4-4 8-4-8-8-4 8-4 4-8Z" fill="#22C55E" />
              <circle cx="55" cy="178" r="4" fill="#38BDF8" />
              <circle cx="204" cy="174" r="4" fill="#A855F7" />
            </g>
          )}
        </motion.svg>
      </div>
    </div>
  );
};
