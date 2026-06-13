import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaEye, FaCalendarAlt } from 'react-icons/fa'
import doctor from '../data/doctorData'

// Dynamically load all images from the HERO folder so new images (1..n) are picked up automatically
const modules = import.meta.glob('/src/assets/image/HERO/*.{png,jpg,jpeg}', { eager: true })
let heroImages = Object.keys(modules).sort().map(k => (modules[k] && (modules[k].default || modules[k])))
// Only use the local HERO folder images. Limit to the first 6 files (1..6).
heroImages = heroImages.slice(0, 6)

export default function Hero() {
  const defaultTexts = [
    'Board-certified ophthalmologist with clinical and surgical expertise. Dedicated to patient-centered care and modern diagnostics.',
    'Advanced surgical and medical ophthalmology with a focus on evidence-based outcomes.',
    'Comprehensive care in cataract, glaucoma, strabismus and refractive treatments.',
    'State-of-the-art diagnostics and patient-centered surgical care.',
    'Holistic follow-up and personalized treatment plans.'
  ]

  // Build slides from discovered images. If none found, fall back to an empty array.
  const slides = heroImages.length > 0 ? heroImages.map((img, i) => ({
    image: img,
    title: doctor.name,
    subtitle: i === 0 ? doctor.title : 'Clinical Excellence • Patient-first Care',
    text: defaultTexts[i % defaultTexts.length]
  })) : [{ image: '', title: doctor.name, subtitle: doctor.title, text: '' }]

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = React.useRef(null)

  useEffect(() => {
    if (slides.length <= 1) return
    if (timerRef.current) clearInterval(timerRef.current)
    if (!paused) {
      timerRef.current = setInterval(() => setIndex(i => (i + 1) % slides.length), 4000)
    }
    return () => clearInterval(timerRef.current)
  }, [slides.length, paused])

  const current = slides[index]

  const go = (i) => {
    setIndex(i)
    setPaused(true)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setIndex(s => (s + 1) % slides.length), 4000)
    setTimeout(() => setPaused(false), 5000)
  }

  const prev = () => go((index - 1 + slides.length) % slides.length)
  const next = () => go((index + 1) % slides.length)

  return (
    <section className="relative w-full h-[70vh] md:h-[75vh] flex items-center overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="absolute inset-0">
        <motion.img
          key={index}
          src={current.image}
          alt={current.title}
          initial={{ opacity: 0.01 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full object-cover filter brightness-95"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6"
      >
        <div className="flex justify-start">
          <div className="w-full md:w-1/2 lg:w-5/12">
                <div className="bg-transparent border border-transparent backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg">
              <div className="flex flex-col">
                <div className="flex-1">
                      <h1 className="text-2xl md:text-3xl font-semibold text-black">{current.title}</h1>
                      <div className="text-sm md:text-base text-black mt-1">{current.subtitle}</div>

                      <p className="mt-3 text-sm text-black leading-relaxed">{current.text}</p>

                  <div className="mt-5 flex flex-wrap gap-3">
                      <a href="#work" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--accent-cyan)] text-white text-sm hover:shadow-md transform hover:-translate-y-0.5 transition">
                      <FaEye /> <span>View Cases</span>
                    </a>

                    <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/30 text-sm text-[var(--text)] bg-white/10 hover:shadow-sm transition">
                      <FaCalendarAlt /> <span>Book Appointment</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Prev/Next controls */}
      <button aria-label="Previous" onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white hover:bg-black/45">‹</button>
      <button aria-label="Next" onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white hover:bg-black/45">›</button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((s, i) => (
          <button key={i} aria-label={`Go to slide ${i+1}`} onClick={() => go(i)} className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`} />
        ))}
      </div>
    </section>
  )
}
