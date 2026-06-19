import React from 'react'
import * as z from 'zod'
import { ImageSchema } from '../defaultSchemes'

export const layoutId = 'djimit-cover'
export const layoutName = 'Cover Slide'
export const layoutDescription = 'Dark cover slide with a gold accent line, large title, subtitle, DjimIT logo, and optional background image.'

const coverSlideSchema = z.object({
  titleLine1: z.string().min(2).max(40).default('Van Data naar Doen').meta({ description: 'First line of the cover title' }),
  titleLine2: z.string().min(2).max(40).default('AI Governance Strategie').meta({ description: 'Second line of the cover title' }),
  subtitle: z.string().min(5).max(100).default('Pragmatische AI & data consultancy met 20+ jaar ervaring').meta({ description: 'Subtitle below the main title' }),
  date: z.string().min(3).max(30).default('Mei 2026').meta({ description: 'Presentation date' }),
  backgroundImage: ImageSchema.default({
    __image_url__: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    __image_prompt__: 'Mountain landscape at dusk with dramatic sky'
  }).optional().meta({ description: 'Optional background image' }),
})

export const Schema = coverSlideSchema
export type CoverSlideData = z.infer<typeof coverSlideSchema>

const CoverSlide: React.FC<{ data?: Partial<CoverSlideData> }> = ({ data: s }) => (
  <>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
    <div className="relative h-[720px] w-[1280px] overflow-hidden" style={{ backgroundColor: 'var(--background-color,#080808)', fontFamily: 'var(--heading-font-family,"Playfair Display")' }}>
      {s?.backgroundImage?.__image_url__ && (
        <img src={s.backgroundImage.__image_url__} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
      )}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(50% 50% at 50% 80%, rgba(212,168,83,0.12) 0%, transparent 70%)' }} />
      <div className="absolute top-8 right-12 z-20">
        {(s as any)?.__companyName__ && <span className="text-sm font-medium tracking-wider uppercase" style={{ color: 'var(--background-text,#999590)', fontFamily: 'var(--body-font-family,Inter)' }}>{(s as any).__companyName__}</span>}
      </div>
      <div className="absolute top-8 left-12 z-20 flex items-center gap-2">
        {(s as any)?._logo_url__ && <img src={(s as any)._logo_url__} alt="" className="h-6 w-6" />}
      </div>
      <div className="relative z-10 flex flex-col justify-center h-full px-20 pb-12">
        <div className="mb-8 h-0.5 w-24 rounded-full" style={{ backgroundColor: 'var(--primary-color,#D4A853)' }} />
        <h1 className="text-[72px] font-bold leading-[1.08] tracking-[-0.02em] mb-6" style={{ color: 'var(--background-text,#F0EDE8)' }}>
          <span>{s?.titleLine1}</span><br />
          <span>{s?.titleLine2}</span>
        </h1>
        <p className="text-xl font-light leading-relaxed max-w-2xl" style={{ color: 'var(--background-text,#999590)', fontFamily: 'var(--body-font-family,Inter)' }}>
          {s?.subtitle}
        </p>
        <div className="mt-10 flex items-center gap-4">
          <div className="h-px w-12" style={{ backgroundColor: 'var(--primary-color,#D4A853)' }} />
          <span className="text-sm tracking-widest uppercase" style={{ color: 'var(--background-text,#999590)', fontFamily: 'var(--body-font-family,Inter)' }}>{s?.date}</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(0deg, var(--background-color,#080808) 0%, transparent 100%)' }} />
    </div>
  </>
)

export default CoverSlide
