import React from 'react'
import * as z from 'zod'
import { IconSchema } from '../defaultSchemes'

export const layoutId = 'djimit-agenda'
export const layoutName = 'Agenda Slide'
export const layoutDescription = 'A numbered agenda slide with gold-accented numbers, items with titles and descriptions.'

const agendaSlideSchema = z.object({
  title: z.string().min(2).max(40).default('Agenda').meta({ description: 'Slide heading' }),
  items: z.array(z.object({
    title: z.string().min(2).max(60).meta({ description: 'Agenda item title' }),
    description: z.string().min(5).max(100).meta({ description: 'Agenda item description' }),
    icon: IconSchema.optional().meta({ description: 'Optional icon for the agenda item' }),
  })).min(2).max(6).default([
    { title: 'Introductie', description: 'Achtergrond en context van de opdracht' },
    { title: 'Analyse', description: 'Huidige stand van zaken en uitdagingen' },
    { title: 'Oplossingsrichtingen', description: 'Mogelijke aanpak en strategie' },
    { title: 'Aanbevelingen', description: 'Concrete stappen en roadmap' },
  ]).meta({ description: 'Agenda items' }),
})

export const Schema = agendaSlideSchema
export type AgendaSlideData = z.infer<typeof agendaSlideSchema>

const AgendaSlide: React.FC<{ data?: Partial<AgendaSlideData> }> = ({ data: s }) => (
  <>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
    <div className="h-[720px] w-[1280px] flex flex-col px-20 py-16" style={{ backgroundColor: 'var(--background-color,#080808)', fontFamily: 'var(--heading-font-family,"Playfair Display")' }}>
      {(s as any)?.__companyName__ && (
        <p className="text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--background-text,#999590)', fontFamily: 'var(--body-font-family,Inter)' }}>{(s as any).__companyName__}</p>
      )}
      <div className="mb-3 h-0.5 w-16 rounded-full" style={{ backgroundColor: 'var(--primary-color,#D4A853)' }} />
      <h1 className="text-5xl font-bold tracking-tight mb-12" style={{ color: 'var(--background-text,#F0EDE8)' }}>{s?.title || 'Agenda'}</h1>
      <div className="flex-1 grid grid-cols-2 gap-x-16 gap-y-8">
        {(s?.items || []).map((item, i) => (
          <div key={i} className="flex gap-5 items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold" style={{ backgroundColor: 'var(--primary-color,#D4A853)', color: 'var(--primary-text,#1A1A1A)' }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1" style={{ color: 'var(--background-text,#F0EDE8)' }}>{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--background-text,#999590)', fontFamily: 'var(--body-font-family,Inter)' }}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-8 right-12 text-[120px] font-bold opacity-[0.04] leading-none select-none" style={{ color: 'var(--primary-color,#D4A853)' }}>DJIMIT</div>
    </div>
  </>
)

export default AgendaSlide
