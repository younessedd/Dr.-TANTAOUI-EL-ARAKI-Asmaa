import React from 'react'
import { motion } from 'framer-motion'
import doctor from '../data/doctorData'

export default function ServicesSection() {
  return (
    <section id="services" className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 className="text-2xl md:text-3xl font-bold mb-6 text-[var(--text)]" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Services & Specialties</motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {doctor.specialties.map((s, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i * 0.06 }} className="glass rounded-lg p-4 cursor-pointer shadow-md">
              <div className="font-semibold text-[var(--text)] mb-2">{s}</div>
              <div className="text-sm text-[var(--muted)]">Professional care in {s.toLowerCase()} with modern surgical and diagnostic techniques.</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
