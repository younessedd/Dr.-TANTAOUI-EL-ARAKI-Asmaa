import React from 'react'
import { FaTwitter, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa'
import doctor from '../data/doctorData'

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 dark:border-gray-800 bg-[var(--card)]">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="font-semibold">{doctor.name}</div>
          </div>
          <p className="text-sm text-[var(--muted)]">Clinical portfolio showcasing cases, research, and professional milestones.</p>
        </div>

        <div className="hidden md:block">
          <h4 className="font-medium mb-2">Quick Links</h4>
          <ul className="text-[var(--muted)] space-y-2 text-sm">
            <li><a href="#work" className="hover:text-[var(--text)]">Clinical Cases</a></li>
            <li><a href="#reviews" className="hover:text-[var(--text)]">Patient Reviews</a></li>
            <li><a href="#contact" className="hover:text-[var(--text)]">Contact</a></li>
            <li><a href="#profile" className="hover:text-[var(--text)]">Profile</a></li>
          </ul>
        </div>

        <div className="flex flex-col items-start md:items-end">
          <div className="flex items-center gap-3 mb-3">
            <FaEnvelope className="text-[var(--muted)]" />
            <a href={`mailto:${doctor.email}`} className="text-sm">{doctor.email}</a>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <a aria-label="Twitter" href="#" className="text-[var(--muted)] hover:text-[var(--text)]"><FaTwitter /></a>
            <a aria-label="LinkedIn" href="#" className="text-[var(--muted)] hover:text-[var(--text)]"><FaLinkedin /></a>
            <a aria-label="Instagram" href="#" className="text-[var(--muted)] hover:text-[var(--text)]"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 text-sm text-[var(--muted)] text-center">{doctor.address} • © {new Date().getFullYear()} {doctor.name}. All rights reserved.</div>
      </div>
    </footer>
  )
}
