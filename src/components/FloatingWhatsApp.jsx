import React from 'react'
import doctor from '../data/doctorData'

export default function FloatingWhatsApp() {
  const phoneDigits = doctor.phone.replace(/\D/g, '')
  const href = `tel:${phoneDigits}`

  return (
    <div className="fixed right-5 bottom-5 z-[9999]">
      <a href={href} aria-label="Call Now" className="block">
        <div className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer shadow-2xl pulse hover:scale-110 transition-transform" style={{background: '#10B981'}}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
            <path d="M22 16.92V21a1 1 0 01-1.11 1A19 19 0 013 3.11 1 1 0 014 2h4.09a1 1 0 011 .75 12.75 12.75 0 00.7 2.63 1 1 0 01-.23 1l-2.1 2.1a16 16 0 006.98 7l2.09-2.09a1 1 0 011-.24 12.7 12.7 0 002.66.7 1 1 0 01.76 1V16.92z" fill="currentColor" />
          </svg>
        </div>
      </a>
    </div>
  )
}
