import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaEye, FaCalendarAlt } from 'react-icons/fa'
import doctor from '../data/doctorData'

// Dynamically load all images from the HERO folder
const modules = import.meta.glob('/src/assets/image/HERO/*.{png,jpg,jpeg}', { eager: true })
let heroImages = Object.keys(modules).sort().map(k => (modules[k] && (modules[k].default || modules[k])))
heroImages = heroImages.slice(0, 6)

export default function Hero() {
  const defaultTexts = [
    'Board-certified ophthalmologist with clinical and surgical expertise. Dedicated to patient-centered care and modern diagnostics.',
    'Advanced surgical and medical ophthalmology with a focus on evidence-based outcomes.',
    'Comprehensive care in cataract, glaucoma, strabismus and refractive treatments.',
    'State-of-the-art diagnostics and patient-centered surgical care.',
    'Holistic follow-up and personalized treatment plans.'
  ]

  const slides = heroImages.length > 0 ? heroImages.map((img, i) => ({
    image: img,
    title: doctor.name,
    subtitle: i === 0 ? doctor.title : 'Clinical Excellence • Patient-first Care',
    text: defaultTexts[i % defaultTexts.length]
  })) : [{ image: '', title: doctor.name, subtitle: doctor.title, text: '' }]

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)
  const dragStartX = useRef(0)

  useEffect(() => {
    if (slides.length <= 1) return
    if (timerRef.current) clearInterval(timerRef.current)
    if (!paused) {
      timerRef.current = setInterval(() => setIndex(i => (i + 1) % slides.length), 5000)
    }
    return () => clearInterval(timerRef.current)
  }, [slides.length, paused])

  const current = slides[index]

  const go = (i) => {
    setIndex(i)
    setPaused(true)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setIndex(s => (s + 1) % slides.length), 5000)
    setTimeout(() => setPaused(false), 5000)
  }

  const prev = () => go((index - 1 + slides.length) % slides.length)
  const next = () => go((index + 1) % slides.length)

  const handleDragStart = (e) => {
    dragStartX.current = e.touches ? e.touches[0].clientX : e.clientX
    setPaused(true)
  }

  const handleDragEnd = (e) => {
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
    const diff = dragStartX.current - endX
    if (Math.abs(diff) > 50) {
      if (diff > 0) next()
      else prev()
    }
    setPaused(false)
  }

  return (
    <section 
      className="relative w-full h-[70vh] md:h-[75vh] flex items-center overflow-hidden" 
      onMouseEnter={() => setPaused(true)} 
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
    >
      <div className="absolute inset-0">
        <motion.img
          key={index}
          src={current.image}
          alt={current.title}
          initial={{ opacity: 0.01 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.01 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6"
      >
        <div className="flex justify-start">
          <div className="w-full md:w-1/2 lg:w-5/12">
                <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-2xl border border-white/10">
              <div className="flex flex-col">
                <div className="flex-1">
                      <h1 className="text-2xl md:text-3xl font-semibold text-white drop-shadow-lg">{current.title}</h1>
                      <div className="text-sm md:text-base text-white/90 mt-1 drop-shadow-md">{current.subtitle}</div>

                      <p className="mt-3 text-sm text-white/90 leading-relaxed drop-shadow-md">{current.text}</p>

                  <div className="mt-5 flex flex-wrap gap-3">
                      <a href="#work" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-yellow-500 text-white text-sm font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
                      <FaEye /> <span>View Cases</span>
                    </a>

                    <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border-2 border-white text-sm text-white bg-white/20 backdrop-blur hover:bg-white/30 transition-all font-semibold">
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
      <button aria-label="Previous" onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-gradient-to-r from-cyan-500 to-yellow-500 text-white shadow-2xl hover:scale-110 transition-all">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button aria-label="Next" onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-gradient-to-r from-cyan-500 to-yellow-500 text-white shadow-2xl hover:scale-110 transition-all">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((s, i) => (
          <button 
            key={i} 
            aria-label={`Go to slide ${i+1}`} 
            onClick={() => go(i)} 
            className={`w-3 h-3 rounded-full transition-all ${i === index ? 'bg-white scale-125' : 'bg-white/40'}`} 
          />
        ))}
      </div>
    </section>
  )
}
