import React from 'react'
import ReviewCard from '../components/ReviewCard'

const reviews = [
  { id: 1, name: 'Alice M.', rating: 5, text: 'Excellent care and follow-up. Highly recommend.' },
  { id: 2, name: 'Brian K.', rating: 5, text: 'Professional team and great outcomes.' },
  { id: 3, name: 'Catherine P.', rating: 4, text: 'Very satisfied with the results and attentive staff.' },
  { id: 4, name: 'David L.', rating: 5, text: 'Compassionate care and clear explanations.' },
  { id: 5, name: 'Elena R.', rating: 5, text: 'Smooth experience from consultation to recovery.' },
  { id: 6, name: 'Frank S.', rating: 4, text: 'Great results; minor delays but overall excellent.' }
]

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Patient Reviews</h2>
        <p className="text-[var(--muted)] mb-8">Real patient testimonials about their care experience.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map(r => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </div>
    </section>
  )
}
