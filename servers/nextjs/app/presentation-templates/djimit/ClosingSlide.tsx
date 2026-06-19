import React from 'react'
import * as z from 'zod'
import { ImageSchema } from '../defaultSchemes'

export const layoutId = 'djimit-closing'
export const layoutName = 'Closing Slide'
export const layoutDescription = 'A closing/thank-you slide with gold glow effect, DjimIT branding, contact details, and optional background image.'

const closingSlideSchema = z.object({
  heading: z.string().min(2).max(40).default('Dank u').meta({ description: 'Closing heading' }),
  tagline: z.string().min(5).max(100).default('Van Data naar Doen — AI & Data Consultancy voor de Nederlandse markt').meta({ description: 'Closing tagline' }),
  contactLine1: z.string().min(2).max(80).default('dennis@djimit.nl').optional().meta({ description: 'Contact email' }),
  contactLine2: z.string().min(2).max(80).default('linkedin.com/company/djimit').optional().meta({ description: 'Contact website/linkedin' }),
  backgroundImage: ImageSchema.default({
    __image_url__: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80',
    __image_prompt__: 'Modern office workspace'
  }).optional().meta({ description: 'Optional background image' }),
})

export const Schema = closingSlideSchema
export type ClosingSlideData = z.infer<typeof closingSlideSchema>

const ClosingSlide: React.FC<{ data?: Partial<ClosingSlideData> }> = ({ data: s }) => (
  <>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
    <div className="h-[720px] w-[1280px] flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: 'var(--background-color,#080808)', fontFamily: 'var(--heading-font-family,"Playfair Display")' }}>
      {s?.backgroundImage?.__image_url__ && (
        <img src={s.backgroundImage.__image_url__} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
      )}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(50% 50% at 50% 40%, rgba(212,168,83,0.15) 0%, rgba(232,160,191,0.08) 40%, transparent 70%)' }} />
      <div className="relative z-10 text-center max-w-2xl">
        <div className="flex items-center gap-2 justify-center mb-8">
          {(s as any)?._logo_url__ && <img src={(s as any)._logo_url__} alt="" className="h-8 w-8" />}
          {(s as any)?.__companyName__ && <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: 'var(--background-text,#F0EDE8)', fontFamily: 'var(--body-font-family,Inter)' }}>{(s as any).__companyName__}</span>}
        </div>
        <div className="mx-auto mb-6 h-0.5 w-20 rounded-full" style={{ backgroundColor: 'var(--primary-color,#D4A853)' }} />
        <h1 className="text-7xl font-bold mb-4" style={{ color: 'var(--background-text,#F0EDE8)' }}>{s?.heading}</h1>
        <p className="text-xl mb-10" style={{ color: 'var(--background-text,#999590)', fontFamily: 'var(--body-font-family,Inter)' }}>{s?.tagline}</p>
        {(s?.contactLine1 || s?.contactLine2) && (
          <div className="space-y-1">
            {s?.contactLine1 && <p className="text-sm" style={{ color: 'var(--primary-color,#D4A853)', fontFamily: 'var(--body-font-family,Inter)' }}>{s.contactLine1}</p>}
            {s?.contactLine2 && <p className="text-sm" style={{ color: 'var(--primary-color,#D4A853)', fontFamily: 'var(--body-font-family,Inter)' }}>{s.contactLine2}</p>}
          </div>
        )}
      </div>
    </div>
  </>
)

export default ClosingSlide
