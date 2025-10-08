import { AnimatePresence, motion } from 'framer-motion'
import { Bone, PartyPopper, Trophy } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

/**
 * BedrockFinalScreen
 * A full-screen celebrational end screen in a Flintstones-esque (Frédi & Béni) theme.
 * - Stone door opening animation
 * - Floating confetti (stone shards & bones)
 * - Big centered Drive link
 *
 * Props:
 *  - driveUrl: string (Google Drive link)
 *  - title?: string
 *  - subtitle?: string
 */
export default function BedrockFinalScreen({
  driveUrl = 'https://drive.google.com/drive/folders/19DdfzUj2hWU7neLIrbRc909MXbrbLjx8?usp=sharing',
  title = 'Yabba-dabba-doo!',
  subtitle = 'Feltárult a következő lépés',
}: {
  driveUrl?: string
  title?: string
  subtitle?: string
}) {
  const [doorsOpen, setDoorsOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDoorsOpen(true), 600) // a tiny dramatic pause
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#f4c27f] via-[#e7b373] to-[#c48c55]">
      {/* Subtle rock texture using layered radial-gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(#00000022 1px, transparent 1px), radial-gradient(#00000018 1px, transparent 1px)',
          backgroundSize: '18px 18px, 24px 24px',
          backgroundPosition: '0 0, 12px 12px',
        }}
      />

      {/* Stone Door Overlay */}
      <StoneDoors isOpen={doorsOpen} />

      {/* Confetti appears when doors open */}
      <AnimatePresence>{doorsOpen && <BedrockConfetti />}</AnimatePresence>

      {/* Center Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 90,
            damping: 14,
            delay: 0.4,
          }}
          className="mx-auto w-full max-w-2xl rounded-2xl bg-[#3b2a1a]/85 p-8 shadow-2xl backdrop-blur-sm border border-[#775536]/40"
        >
          <div className="flex items-center justify-center gap-3 text-yellow-300">
            <PartyPopper className="h-8 w-8" />
            <Trophy className="h-8 w-8" />
            <Bone className="h-8 w-8" />
          </div>

          <h1 className="mt-4 text-center text-4xl font-extrabold tracking-wide text-yellow-200 drop-shadow-sm">
            {title}
          </h1>
          <p className="mt-2 text-center text-lg text-[#ffe9c7]">{subtitle}</p>

          <div className="mt-8 flex justify-center">
            <Link
              href={driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer inline-flex items-center gap-3 rounded-2xl bg-yellow-400 px-6 py-4 font-bold text-black shadow-lg ring-4 ring-yellow-900/30 transition hover:translate-y-[-1px] hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-200"
              aria-label="Open Google Drive link"
            >
              <span className="text-xl">Következő fázis</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function StoneDoors({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className={`absolute inset-0 z-20 ${isOpen ? 'pointer-events-none' : ''}`}
    >
      {/* Left Door */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpen ? '-100%' : 0 }}
        transition={{ type: 'tween', duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 top-0 h-full w-1/2 bg-[#6b4b2b] shadow-2xl"
        style={{
          backgroundImage:
            'repeating-linear-gradient(30deg, #6b4b2b 0 10px, #775536 10px 20px)',
        }}
      >
        <DoorTexture />
      </motion.div>

      {/* Right Door */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpen ? '100%' : 0 }}
        transition={{ type: 'tween', duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-0 top-0 h-full w-1/2 bg-[#6b4b2b] shadow-2xl"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-30deg, #6b4b2b 0 10px, #775536 10px 20px)',
        }}
      >
        <DoorTexture />
      </motion.div>
    </div>
  )
}

function DoorTexture() {
  return (
    <div
      className="absolute inset-0 opacity-25"
      style={{
        backgroundImage:
          'radial-gradient(circle at 20% 30%, #000000 2px, transparent 2px), radial-gradient(circle at 70% 60%, #000000 2px, transparent 2px)',
      }}
    />
  )
}

function BedrockConfetti() {
  const pieces = useMemo(() => Array.from({ length: 70 }, (_, i) => i), [])
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {pieces.map((i) => (
        <ConfettiPiece key={i} index={i} />
      ))}
    </div>
  )
}

function ConfettiPiece({ index }: { index: number }) {
  const left = `${Math.random() * 100}%`
  const delay = Math.random() * 1.2
  const duration = 4 + Math.random() * 3
  const size = 6 + Math.random() * 16
  const isBone = Math.random() < 0.25

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: '110vh', opacity: [0, 1, 1, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeIn' }}
      className="absolute top-0"
      style={{ left }}
      aria-hidden
    >
      {isBone ? (
        <Bone className="opacity-80" style={{ width: size, height: size }} />
      ) : (
        <div
          className="rotate-12 rounded-[3px] opacity-80"
          style={{
            width: size,
            height: size,
            background:
              'linear-gradient(135deg, #f4c27f, #ffe0a8 35%, #8a5c35 100%)',
            boxShadow: '0 1px 0 #00000033',
          }}
        />
      )}
    </motion.div>
  )
}
