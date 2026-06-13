import React from 'react'
import CaseCard from '../components/CaseCard'
import Modal from '../components/Modal'
import { useState } from 'react'
import img1 from '../assets/image/CARDS/1.png'
import img2 from '../assets/image/CARDS/2.png'
import img3 from '../assets/image/CARDS/3.png'
import img4 from '../assets/image/CARDS/4.png'
import img5 from '../assets/image/CARDS/5.png'
import img6 from '../assets/image/CARDS/6.png'

const mockCases = [
  {
    id: 1,
    title: 'Rhinoplasty Case 01',
    beforeImage: img1,
    afterImage: img1,
    procedure: 'Rhinoplasty',
    description: 'Improved nasal symmetry and dorsum refinement with septoplasty.'
  },
  {
    id: 2,
    title: 'Facial Reconstructive Case 02',
    beforeImage: img2,
    afterImage: img2,
    procedure: 'Reconstructive Surgery',
    description: 'Restoration of facial contour after traumatic injury.'
  },
  {
    id: 3,
    title: 'Dermatologic Procedure 03',
    beforeImage: img3,
    afterImage: img3,
    procedure: 'Mohs Surgery',
    description: 'Excision and reconstruction with excellent cosmetic outcome.'
  },
  {
    id: 4,
    title: 'Oculoplastic Case 04',
    beforeImage: img4,
    afterImage: img4,
    procedure: 'Eyelid Reconstruction',
    description: 'Functional and aesthetic eyelid repair following lesion removal.'
  },
  {
    id: 5,
    title: 'Cosmetic Case 05',
    beforeImage: img5,
    afterImage: img5,
    procedure: 'Botulinum Toxin',
    description: 'Non-surgical rejuvenation with predictable outcomes.'
  },
  {
    id: 6,
    title: 'Reconstructive Case 06',
    beforeImage: img6,
    afterImage: img6,
    procedure: 'Skin Grafting',
    description: 'Large defect closure with split-thickness skin graft.'
  }
]

export default function PortfolioSection() {
  const [selectedIndex, setSelectedIndex] = useState(null)

  return (
    <section id="work" className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Clinical Cases</h2>
        <p className="text-[var(--muted)] mb-8">A selection of representative clinical cases with before and after documentation.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCases.map((c, i) => (
            <CaseCard key={c.id} item={c} onOpen={() => setSelectedIndex(i)} />
          ))}
        </div>
      </div>

      <Modal open={selectedIndex !== null} items={mockCases} startIndex={selectedIndex || 0} onClose={() => setSelectedIndex(null)} />
    </section>
  )
}
