import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Modal({ open, onClose, items = [], startIndex = 0 }) {
  const [idx, setIdx] = useState(startIndex)
  const [lightbox, setLightbox] = useState(false)

  useEffect(() => {
    if (open) setIdx(startIndex)
  }, [open, startIndex])

  useEffect(() => {
    const onKey = (e) => {
      if (!open) return
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, idx])

  const images = items.length ? [items[idx].beforeImage, items[idx].afterImage] : []

  const next = () => {
    if (!items.length) return
    // if within the same item's images, cycle them; else move to next item
    setLightbox(false)
    if (idx < items.length - 1) setIdx(i => i + 1)
    else setIdx(0)
  }
  const prev = () => {
    if (!items.length) return
    setLightbox(false)
    if (idx > 0) setIdx(i => i - 1)
    else setIdx(items.length - 1)
  }

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x
    if (offset < -100) next()
    else if (offset > 100) prev()
  }

  if (!open) return null

  const current = items[idx]

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />

          <motion.div className="relative z-50 max-w-4xl w-full mx-4 bg-[var(--card)] rounded-lg overflow-hidden shadow-xl" initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}>
            <div className="p-4 flex flex-col md:flex-row items-start gap-4">
              <div className="flex-1">
                <motion.div className="relative h-72 bg-gray-100 rounded overflow-hidden" drag="x" onDragEnd={handleDragEnd} whileTap={{ cursor: 'grabbing' }}>
                  <motion.img src={images[0]} alt="case before" className="object-cover w-full h-full rounded" onClick={() => setLightbox(true)} />
                </motion.div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex gap-2">
                    <button onClick={prev} className="px-3 py-1 bg-white/90 rounded">Prev Case</button>
                    <button onClick={next} className="px-3 py-1 bg-white/90 rounded">Next Case</button>
                  </div>
                  <div className="text-sm text-[var(--muted)]">Case {idx + 1} / {items.length}</div>
                </div>
              </div>

              <div className="w-full md:w-80">
                <div className="font-semibold">{current.title}</div>
                <div className="text-[var(--muted)] text-sm mb-2">{current.procedure}</div>
                <div className="text-sm text-[var(--muted)]">{current.description}</div>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => setLightbox(true)} className="px-3 py-1 border rounded">View Images</button>
                  <button onClick={onClose} className="px-4 py-2 bg-[var(--accent)] text-white rounded">Close</button>
                </div>
              </div>
            </div>
          </motion.div>

          {lightbox && (
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="absolute inset-0 bg-black/90" onClick={() => setLightbox(false)} />
              <motion.img src={images[0]} className="max-w-[90%] max-h-[90%] rounded" initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
