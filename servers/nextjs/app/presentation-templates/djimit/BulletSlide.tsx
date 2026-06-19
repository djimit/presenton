import React from 'react'
import * as z from 'zod'
import { IconSchema } from '../defaultSchemes'

export const layoutId = 'djimit-bullet'
export const layoutName = 'Bullet Slide'
export const layoutDescription = 'Structured bullet point slide with gold-accented icons, title, and description per bullet. Clean dark theme with gold highlights.'

const bulletSlideSchema = z.object({
  title: z.string().min(3).max(50).default('Kernpunten').meta({ description: 'Slide title' }),
  description: z.string().min(5).max(150).default('De belangrijkste bevindingen en aanbevelingen op een rij').optional().meta({ description: 'Optional slide description' }),
  bulletPoints: z.array(z.object({
    title: z.string().min(2).max(60).meta({ description: 'Bullet title' }),
    description: z.string().min(5).max(120).meta({ description: 'Bullet description' }),
    icon: IconSchema.optional().meta({ description: 'Optional icon' }),
  })).min(2).max(4).default([
    { title: 'Risicoclassificatie', description: 'Classificeer AI-systemen volgens de EU AI Act risicocategorieen: minimaal, beperkt, hoog, onacceptabel' },
    { title: 'Zero Trust Architectuur', description: 'Implementeer zero trust principes voor AI-infrastructuur: verifieer elke request, minimaliseer blast radius' },
    { title: 'Supply Chain Security', description: 'Breng de AI-toeleveringsketen in kaart: van modelproviders tot MCP-servers en agent-tool integraties' },
    { title: 'Continuous Monitoring', description: 'Monitor AI-agents op gedragsdrift: log alle acties, detecteer anomalieen, automatiseer incident response' },
  ]).meta({ description: 'Bullet points with icons' }),
})

export const Schema = bulletSlideSchema
export type BulletSlideData = z.infer<typeof bulletSlideSchema>

const BulletSlide: React.FC<{ data?: Partial<BulletSlideData> }> = ({ data: s }) => (
  <>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
    <div className="h-[720px] w-[1280px] flex flex-col px-20 py-16" style={{ backgroundColor: 'var(--background-color,#080808)', fontFamily: 'var(--heading-font-family,"Playfair Display")' }}>
      {(s as any)?.__companyName__ && (
        <p className="text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--background-text,#999590)', fontFamily: 'var(--body-font-family,Inter)' }}>{(s as any).__companyName__}</p>
      )}
      <div className="mb-3 h-0.5 w-16 rounded-full" style={{ backgroundColor: 'var(--primary-color,#D4A853)' }} />
      <h1 className="text-5xl font-bold tracking-tight mb-2" style={{ color: 'var(--background-text,#F0EDE8)' }}>{s?.title}</h1>
      {s?.description && (
        <p className="text-base mb-8" style={{ color: 'var(--background-text,#999590)', fontFamily: 'var(--body-font-family,Inter)' }}>{s.description}</p>
      )}
      <div className="flex-1 grid grid-cols-2 gap-x-12 gap-y-6 content-center">
        {(s?.bulletPoints || []).map((bp, i) => (
          <div key={i} className="flex gap-4 items-start p-4 rounded-lg" style={{ backgroundColor: 'var(--card-color,#0F0F0F)', borderColor: 'var(--stroke,rgba(255,255,255,0.06))', borderWidth: 1 }}>
            {bp.icon?.__icon_url__ && <img src={bp.icon.__icon_url__} alt="" className="w-8 h-8 mt-1 flex-shrink-0" />}
            <div>
              <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--primary-color,#D4A853)' }}>{bp.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--background-text,#999590)', fontFamily: 'var(--body-font-family,Inter)' }}>{bp.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-8 right-12 text-[120px] font-bold opacity-[0.03] leading-none select-none" style={{ color: 'var(--primary-color,#D4A853)' }}>DJIMIT</div>
    </div>
  </>
)

export default BulletSlide
