import React from 'react'
import * as z from 'zod'

export const layoutId = 'djimit-metrics'
export const layoutName = 'Metrics Slide'
export const layoutDescription = 'KPI and metrics display with 3 large numeric cards in gold and rose tints, suitable for data-driven presentations.'

const metricsSlideSchema = z.object({
  title: z.string().min(3).max(50).default('Resultaten in Cijfers').meta({ description: 'Slide title' }),
  description: z.string().min(5).max(150).default('Onze impact in de Nederlandse publieke sector').optional().meta({ description: 'Optional description' }),
  metrics: z.array(z.object({
    value: z.string().min(1).max(20).default('98%').meta({ description: 'Metric value (number with unit)' }),
    label: z.string().min(2).max(50).default('Compliance Score').meta({ description: 'Metric label' }),
    description: z.string().min(5).max(100).default('NIS2 en EU AI Act compliant').optional().meta({ description: 'Optional metric description' }),
  })).min(2).max(4).default([
    { value: '98%', label: 'Compliance Score', description: 'NIS2 en EU AI Act audit gereed' },
    { value: '250+', label: 'Organisaties', description: 'Overheidsinstanties en publieke sector' },
    { value: '20+', label: 'Jaar Ervaring', description: 'In data, AI en security consultancy' },
  ]).meta({ description: 'Metric cards' }),
})

export const Schema = metricsSlideSchema
export type MetricsSlideData = z.infer<typeof metricsSlideSchema>

const ACCENT_COLORS = ['var(--primary-color,#D4A853)', 'var(--graph-1,#E8A0BF)', 'var(--graph-2,#C9963B)']

const MetricsSlide: React.FC<{ data?: Partial<MetricsSlideData> }> = ({ data: s }) => (
  <>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
    <div className="h-[720px] w-[1280px] flex flex-col px-20 py-16" style={{ backgroundColor: 'var(--background-color,#080808)', fontFamily: 'var(--heading-font-family,"Playfair Display")' }}>
      {(s as any)?.__companyName__ && (
        <p className="text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--background-text,#999590)', fontFamily: 'var(--body-font-family,Inter)' }}>{(s as any).__companyName__}</p>
      )}
      <div className="mb-3 h-0.5 w-16 rounded-full" style={{ backgroundColor: 'var(--primary-color,#D4A853)' }} />
      <h1 className="text-5xl font-bold tracking-tight mb-2" style={{ color: 'var(--background-text,#F0EDE8)' }}>{s?.title}</h1>
      {s?.description && (
        <p className="text-base mb-10" style={{ color: 'var(--background-text,#999590)', fontFamily: 'var(--body-font-family,Inter)' }}>{s.description}</p>
      )}
      <div className="flex-1 flex items-center justify-center gap-8">
        {(s?.metrics || []).map((m, i) => (
          <div key={i} className="flex-1 rounded-xl p-8 text-center flex flex-col justify-center items-center" style={{ backgroundColor: 'var(--card-color,#0F0F0F)', borderColor: 'var(--stroke,rgba(255,255,255,0.06))', borderWidth: 1 }}>
            <p className="text-[56px] font-bold leading-none mb-3" style={{ color: ACCENT_COLORS[i % ACCENT_COLORS.length] }}>{m.value}</p>
            <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--background-text,#F0EDE8)' }}>{m.label}</h3>
            {m.description && <p className="text-sm" style={{ color: 'var(--background-text,#999590)', fontFamily: 'var(--body-font-family,Inter)' }}>{m.description}</p>}
            <div className="mt-4 h-0.5 w-12 rounded-full" style={{ backgroundColor: ACCENT_COLORS[i % ACCENT_COLORS.length] }} />
          </div>
        ))}
      </div>
      <div className="absolute bottom-8 right-12 text-[120px] font-bold opacity-[0.03] leading-none select-none" style={{ color: 'var(--primary-color,#D4A853)' }}>DJIMIT</div>
    </div>
  </>
)

export default MetricsSlide
