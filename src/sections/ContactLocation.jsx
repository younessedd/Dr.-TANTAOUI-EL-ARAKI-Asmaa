import React from 'react'
import { motion } from 'framer-motion'
import doctor from '../data/doctorData'

export default function ContactLocation() {
  return (
    <section id="contact-location" className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 className="text-2xl md:text-3xl font-bold mb-6 text-white" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Contact & Location</motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: contact info */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">{doctor.name}</h3>
                <p className="text-sm text-[var(--muted)] mt-1">{doctor.title}</p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium text-white mb-2">Specialties</h4>
              <div className="flex flex-wrap gap-2">
                {doctor.specialties.map((s, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-full bg-[rgba(0,229,255,0.06)] text-[var(--accent-cyan)]">{s}</span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium text-white mb-2">Contact</h4>
              <div className="text-sm text-[var(--muted)] space-y-1">
                <div>Tel/Fax: <a className="text-[var(--accent-cyan)] hover:underline" href={`tel:${doctor.phone.replace(/\s+/g,'')}`}>{doctor.phone}</a></div>
                <div>Email: <a className="text-[var(--accent-cyan)] hover:underline" href={`mailto:${doctor.email}`}>{doctor.email}</a></div>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium text-white mb-2">Address</h4>
              <p className="text-sm text-[var(--muted)]">{doctor.address}</p>
            </div>
          </motion.div>

          {/* Right: map */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-strong rounded-lg overflow-hidden h-64 md:h-auto">
            <iframe
              title="Casablanca map"
              src={`https://www.google.com/maps?q=Casablanca&output=embed`}
              className="w-full h-full border-0"
              style={{ minHeight: 260, filter: 'grayscale(0.15) contrast(0.9) brightness(0.85)' }}
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
