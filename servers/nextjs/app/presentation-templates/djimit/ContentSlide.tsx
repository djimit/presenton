import React from 'react'
import * as z from 'zod'
import { ImageSchema } from '../defaultSchemes'

export const layoutId = 'djimit-content'
export const layoutName = 'Content Slide'
export const layoutDescription = 'Content slide with image on the left, title, gold accent line, paragraph text and optional bullet points on the right.'

const contentSlideSchema = z.object({
  title: z.string().min(3).max(50).default('De Uitdaging').meta({ description: 'Main title' }),
  paragraph: z.string().min(10).max(300).default('Organisaties in de publieke sector staan voor complexe compliance-uitdagingen. De EU AI Act, NIS2-richtlijn, en BIO2-security baseline vereisen een gestructureerde aanpak voor AI-governance en cloud soevereiniteit.').meta({ description: 'Main paragraph text' }),
  bulletPoints: z.array(z.object({
    title: z.string().min(2).max(60).default('Punt').meta({ description: 'Bullet point title' }),
    description: z.string().min(5).max(100).default('Beschrijving van het punt').meta({ description: 'Bullet point description' }),
  })).min(0).max(4).default([
    { title: 'EU AI Act', description: 'Risicoclassificatie en compliance roadmap voor hoog-risico AI-systemen' },
    { title: 'NIS2', description: 'Supply chain security en incident response voor essentiële entiteiten' },
  ]).meta({ description: 'Bullet points' }),
  image: ImageSchema.default({
    __image_url__: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
    __image_prompt__: 'Modern office workspace with computers and natural light'
  }).meta({ description: 'Supporting image' }),
})

export const Schema = contentSlideSchema
export type ContentSlideData = z.infer<typeof contentSlideSchema>

const ContentSlide: React.FC<{ data?: Partial<ContentSlideData> }> = ({ data: s }) => (
  <>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
    <div className="h-[720px] w-[1280px] flex" style={{ backgroundColor: 'var(--background-color,#080808)', fontFamily: 'var(--heading-font-family,"Playfair Display")' }}>
      <div className="w-[540px] h-full flex-shrink-0">
        <img src={s?.image?.__image_url__ || ''} alt="" className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-[540px] h-full pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent 80%, var(--background-color,#080808) 100%)' }} />
      </div>
      <div className="flex-1 flex flex-col justify-center px-16 py-20">
        {(s as any)?.__companyName__ && (
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--background-text,#999590)', fontFamily: 'var(--body-font-family,Inter)' }}>{(s as any).__companyName__}</p>
        )}
        <div className="mb-5 h-0.5 w-16 rounded-full" style={{ backgroundColor: 'var(--primary-color,#D4A853)' }} />
        <h1 className="text-4xl font-bold leading-tight mb-4" style={{ color: 'var(--background-text,#F0EDE8)' }}>{s?.title}</h1>
        <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--background-text,#999590)', fontFamily: 'var(--body-font-family,Inter)' }}>{s?.paragraph}</p>
        {(s?.bulletPoints || []).map((bp, i) => (
          <div key={i} className="flex gap-3 items-start mb-3">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--primary-color,#D4A853)' }} />
            <div>
              <h4 className="text-sm font-semibold" style={{ color: 'var(--background-text,#F0EDE8)' }}>{bp.title}</h4>
              <p className="text-xs mt-0.5" style={{ color: 'var(--background-text,#999590)', fontFamily: 'var(--body-font-family,Inter)' }}>{bp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
)

export default ContentSlide
