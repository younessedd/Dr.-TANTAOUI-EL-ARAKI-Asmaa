import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function CaseCard({ item, onOpen }) {
  const [showBefore, setShowBefore] = useState(true)

  // Preload both images
  useEffect(() => {
    const img1 = new Image()
    img1.src = item.beforeImage
    const img2 = new Image()
    img2.src = item.afterImage
  }, [item.beforeImage, item.afterImage])

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="glass rounded-lg shadow-lg overflow-hidden border border-[var(--border)] hover:scale-105 transform transition-transform duration-200 cursor-pointer"
      onClick={() => onOpen && onOpen(item)}
    >
      <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 relative">
        <img
          src={showBefore ? item.beforeImage : item.afterImage}
          alt={item.title}
          className="object-cover w-full h-full"
          loading="lazy"
        />
        <button
          onClick={(e) => { e.stopPropagation(); setShowBefore(prev => !prev) }}
          className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/80 text-sm px-3 py-1 rounded-full backdrop-blur text-gray-900 dark:text-white shadow-md"
        >
          {showBefore ? 'Show After' : 'Show Before'}
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 text-[var(--text)]">{item.title}</h3>
        <p className="text-[var(--muted)] text-sm mb-2">{item.procedure}</p>
        <p className="text-sm text-[var(--muted)]">{item.description}</p>
      </div>
    </motion.article>
  )
}
