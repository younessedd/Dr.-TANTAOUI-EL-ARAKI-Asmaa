import React, { useRef } from 'react'
import heroImg from '../assets/image/HERO/1.png'
import { motion, useInView } from 'framer-motion'
import doctor from '../data/doctorData'

const profile = {
  name: doctor.name,
  title: doctor.title,
  summary: `Board-certified ophthalmologist with clinical and surgical expertise.`,
  education: [
    { year: '2010 - 2016', degree: 'MD, Medicine', institution: 'University of Medicine' },
    { year: '2016 - 2018', degree: 'Residency, Plastic Surgery', institution: 'Regional Medical Center' },
    { year: '2019', degree: 'Fellowship, Oculoplastic Surgery', institution: 'Specialty Eye Institute' },
  ],
  certifications: [
    'Board Certification — Plastic Surgery',
    'Advanced Trauma Life Support (ATLS)',
    'Certificate in Clinical Research Methods'
  ],
  experience: [
    { years: '2022 - Present', role: 'Consultant Surgeon', org: 'City Hospital', details: 'Lead reconstructive surgery team; supervised resident education and research projects.' },
    { years: '2018 - 2022', role: 'Attending Surgeon', org: 'Regional Medical Center', details: 'Performed elective and reconstructive procedures; coordinated outpatient clinic.' },
    { years: '2016 - 2018', role: 'Surgical Resident', org: 'Regional Medical Center', details: 'Rotations across trauma, OR, and outpatient clinics; authored case reports.' }
  ],
  notable: [
    'Published 8 peer-reviewed articles on reconstructive techniques.',
    'Presented at international surgical conferences.',
    'Mentored 15+ surgical residents and fellows.'
  ]
}

export default function ProfileSection() {
  return (
    <section id="profile" className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Professional Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 scene">
          {/* Left column - avatar & summary card */}
          <ProfileCardLeft profile={{
            name: doctor.name,
            title: doctor.title,
            summary: `Board-certified ophthalmologist with clinical and surgical expertise.`,
            phone: doctor.phone,
            email: doctor.email,
            address: doctor.address
          }} />

          {/* Right column - stacked cards */}
          <div className="md:col-span-2 space-y-6">
            <AnimatedCard index={0} direction="right">
              <h3 className="font-semibold mb-3">Education & Training</h3>
              <ul className="space-y-3 text-sm text-[var(--muted)]">
                {profile.education.map((e, i) => (
                  <li key={i} className="">
                    <div className="flex items-baseline justify-between">
                      <div className="font-medium">{e.degree}</div>
                      <div className="text-xs">{e.year}</div>
                    </div>
                    <div className="text-sm">{e.institution}</div>
                  </li>
                ))}
              </ul>
            </AnimatedCard>

            <AnimatedCard index={1} direction="left">
              <h3 className="font-semibold mb-3">Professional Experience</h3>
              <div className="space-y-4 text-sm text-[var(--muted)]">
                {profile.experience.map((ex, i) => (
                  <div key={i}>
                    <div className="flex items-baseline justify-between">
                      <div className="font-medium">{ex.role} — {ex.org}</div>
                      <div className="text-xs">{ex.years}</div>
                    </div>
                    <div className="text-sm">{ex.details}</div>
                  </div>
                ))}
              </div>
            </AnimatedCard>

            <AnimatedCard index={2} direction="up">
              <h3 className="font-semibold mb-3">Certifications & Notable Work</h3>
              <ul className="list-disc pl-5 text-sm text-[var(--muted)] space-y-2">
                {profile.certifications.map((c, i) => <li key={i}>{c}</li>)}
                {profile.notable.map((n, i) => <li key={i}>{n}</li>)}
              </ul>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </section>
  )
}


function ProfileCardLeft({ profile }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.2 })

  const variants = {
    hidden: { opacity: 0, x: -60, rotateY: -8 },
    visible: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.7 } }
  }

  return (
    <motion.div ref={ref} animate={inView ? 'visible' : 'hidden'} variants={variants} className="md:col-span-1 glass rounded-lg p-6 card-3d">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-white/10">
          <img src={profile.image || heroImg} alt={profile.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="font-semibold text-lg">{profile.name}</div>
          <div className="text-[var(--muted)] text-sm">{profile.title}</div>
        </div>
      </div>

      <p className="text-sm text-[var(--muted)] mb-4">{profile.summary}</p>

      <div>
        <h4 className="font-medium mb-2">Contact</h4>
        <div className="text-sm text-[var(--muted)]">Email: <a href={`mailto:${profile.email}`} className="text-[var(--accent-cyan)]">{profile.email}</a></div>
        <div className="text-sm text-[var(--muted)]">Phone: <a href={`tel:${profile.phone.replace(/\s+/g,'')}`} className="text-[var(--accent-cyan)]">{profile.phone}</a></div>
      </div>
    </motion.div>
  )
}

function AnimatedCard({ children, index = 0, direction = 'left' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.2 })

  const base = { opacity: 0 }
  const offsets = {
    left: { x: -80, rotateY: -8 },
    right: { x: 80, rotateY: 8 },
    up: { y: 30 }
  }

  const hidden = { ...base, ...(offsets[direction] || offsets.left) }
  const visible = { opacity: 1, x: 0, y: 0, rotateY: 0, transition: { duration: 0.6, delay: index * 0.08 } }

  return (
    <motion.div ref={ref} animate={inView ? visible : hidden} className="glass rounded-lg p-6 card-3d">
      {children}
    </motion.div>
  )
}
