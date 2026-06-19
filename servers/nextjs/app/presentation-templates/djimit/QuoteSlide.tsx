import React from 'react'
import * as z from 'zod'
import { ImageSchema } from '../defaultSchemes'

export const layoutId = 'djimit-quote'
export const layoutName = 'Quote Slide'
export const layoutDescription = 'A dramatic quote slide with large gold quotation mark, bold quote text, gold author divider, and optional dark background image.'

const quoteSlideSchema = z.object({
  quote: z.string().min(10).max(300).default('Het risico zit niet in het gebruik van AI, maar in hoe we AI gebruiken. Governance is geen hindermacht — het is de license to operate.').meta({ description: 'Main quote text' }),
  attribution: z.string().min(2).max(60).default('Dennis Landman').meta({ description: 'Quote attribution / author' }),
  role: z.string().min(2).max(60).default('AI & Data Consultant, DjimIT').optional().meta({ description: 'Optional role or title' }),
  backgroundImage: ImageSchema.default({
    __image_url__: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
    __image_prompt__: 'Modern office interior with subtle lighting'
  }).optional().meta({ description: 'Optional background image' }),
})

export const Schema = quoteSlideSchema
export type QuoteSlideData = z.infer<typeof quoteSlideSchema>

const QuoteSlide: React.FC<{ data?: Partial<QuoteSlideData> }> = ({ data: s }) => (
  <>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
    <div className="h-[720px] w-[1280px] flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: 'var(--background-color,#080808)', fontFamily: 'var(--heading-font-family,"Playfair Display")' }}>
      {s?.backgroundImage?.__image_url__ && (
        <img src={s.backgroundImage.__image_url__} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      )}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(50% 50% at 30% 50%, rgba(212,168,83,0.10) 0%, transparent 60%)' }} />
      <div className="relative z-10 max-w-4xl mx-auto text-center px-20">
        <div className="text-[100px] leading-none mb-4 italic opacity-30 select-none" style={{ color: 'var(--primary-color,#D4A853)' }}>&ldquo;</div>
        <blockquote className="text-3xl font-medium italic leading-relaxed mb-8" style={{ color: 'var(--background-text,#F0EDE8)' }}>
          {s?.quote}
        </blockquote>
        <div className="flex items-center justify-center gap-5">
          <div className="h-px w-16" style={{ backgroundColor: 'var(--primary-color,#D4A853)' }} />
          <div>
            <cite className="text-lg font-semibold not-italic" style={{ color: 'var(--background-text,#F0EDE8)' }}>{s?.attribution}</cite>
            {s?.role && <p className="text-sm mt-1" style={{ color: 'var(--background-text,#999590)', fontFamily: 'var(--body-font-family,Inter)' }}>{s.role}</p>}
          </div>
          <div className="h-px w-16" style={{ backgroundColor: 'var(--primary-color,#D4A853)' }} />
        </div>
      </div>
      <div className="absolute top-8 right-12">
        {(s as any)?.__companyName__ && <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--background-text,#999590)', fontFamily: 'var(--body-font-family,Inter)' }}>{(s as any).__companyName__}</span>}
      </div>
    </div>
  </>
)

export default QuoteSlide
