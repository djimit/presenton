import React from 'react'
import * as z from 'zod'

export const layoutId = 'djimit-section-divider'
export const layoutName = 'Section Divider'
export const layoutDescription = 'A dramatic section divider slide with large title and gold accent line. Used to transition between presentation sections.'

const sectionDividerSchema = z.object({
  sectionNumber: z.string().min(1).max(10).default('01').meta({ description: 'Section number' }),
  title: z.string().min(2).max(50).default('Strategie & Governance').meta({ description: 'Section title' }),
  description: z.string().min(5).max(120).default('Hoe organiseren we AI-compliance en behouden we cloud soevereiniteit').optional().meta({ description: 'Optional section description' }),
})

export const Schema = sectionDividerSchema
export type SectionDividerData = z.infer<typeof sectionDividerSchema>

const SectionDividerSlide: React.FC<{ data?: Partial<SectionDividerData> }> = ({ data: s }) => (
  <>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
    <div className="h-[720px] w-[1280px] flex items-center justify-center px-20 relative overflow-hidden" style={{ backgroundColor: 'var(--background-color,#080808)', fontFamily: 'var(--heading-font-family,"Playfair Display")' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(50% 50% at 80% 20%, rgba(212,168,83,0.08) 0%, transparent 60%)' }} />
      <div className="relative z-10 text-center">
        <p className="text-lg tracking-[0.3em] uppercase mb-6" style={{ color: 'var(--primary-color,#D4A853)', fontFamily: 'var(--body-font-family,Inter)' }}>Deel {s?.sectionNumber}</p>
        <div className="mx-auto mb-8 h-0.5 w-24 rounded-full" style={{ backgroundColor: 'var(--primary-color,#D4A853)' }} />
        <h1 className="text-[80px] font-bold leading-[1.05] tracking-[-0.02em]" style={{ color: 'var(--background-text,#F0EDE8)' }}>{s?.title}</h1>
        {s?.description && (
          <p className="mt-6 text-xl font-light max-w-xl mx-auto" style={{ color: 'var(--background-text,#999590)', fontFamily: 'var(--body-font-family,Inter)' }}>{s.description}</p>
        )}
      </div>
      <div className="absolute top-8 right-12">
        {(s as any)?.__companyName__ && <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--background-text,#999590)', fontFamily: 'var(--body-font-family,Inter)' }}>{(s as any).__companyName__}</span>}
      </div>
    </div>
  </>
)

export default SectionDividerSlide
