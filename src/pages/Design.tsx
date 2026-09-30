import { useState, type ReactNode } from 'react'
import logo from '../assets/logo-dcq.png'

// Playground da identidade visual. Referência para novos componentes.

// Classes listadas por extenso para o Tailwind detectá-las.
const brand = [
  ['50', 'bg-brand-50'],
  ['100', 'bg-brand-100'],
  ['200', 'bg-brand-200'],
  ['300', 'bg-brand-300'],
  ['400', 'bg-brand-400'],
  ['500', 'bg-brand-500'],
  ['600', 'bg-brand-600'],
  ['700', 'bg-brand-700'],
  ['800', 'bg-brand-800'],
  ['900', 'bg-brand-900'],
  ['950', 'bg-brand-950'],
]

const colors = [
  ['surface', 'bg-surface'],
  ['panel', 'bg-panel'],
  ['ink', 'bg-ink'],
  ['muted', 'bg-muted'],
  ['line', 'bg-line'],
  ['primary', 'bg-primary'],
  ['primary-strong', 'bg-primary-strong'],
  ['accent', 'bg-accent'],
  ['success', 'bg-success'],
  ['danger', 'bg-danger'],
]

const options = ['Salmonella spp.', 'Lactobacillus casei', 'Bacillus subtilis', 'Saccharomyces cerevisiae']
const correct = 0

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">{title}</h2>
      {children}
    </section>
  )
}

export default function Design() {
  const [picked, setPicked] = useState<number | null>(null)

  return (
    <main className="mx-auto max-w-4xl space-y-12 p-8">
      <header className="flex items-center gap-6">
        <img src={logo} alt="Logo do DCQ" className="h-24 w-auto" />
        <div>
          <p className="font-mono text-sm text-primary">DCQ / DESIGN</p>
          <h1 className="font-serif text-5xl font-medium tracking-tight">Identidade visual</h1>
        </div>
      </header>

      <Section title="Marca">
        <div className="flex overflow-hidden rounded-lg border border-line">
          {brand.map(([step, bg]) => (
            <div key={step} className="flex-1">
              <div className={`h-16 ${bg} ${step === '500' ? 'ring-2 ring-ink ring-inset' : ''}`} />
              <p className="bg-panel py-1 text-center font-mono text-xs">{step}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted">500 é a cor da logo (#5eaea1). Texto branco só a partir de 700.</p>
      </Section>

      <Section title="Cores">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {colors.map(([name, bg]) => (
            <div key={name} className="overflow-hidden rounded-lg border border-line bg-panel">
              <div className={`h-16 ${bg}`} />
              <p className="p-2 font-mono text-xs">{name}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Tipografia">
        <div className="space-y-2">
          <p className="font-serif text-5xl font-medium tracking-tight">Relatório de qualidade</p>
          <p className="font-serif text-3xl font-medium">Análise microbiológica</p>
          <p className="font-serif text-xl italic text-muted">Amostra de laticínio, lote 0427</p>
          <p className="text-lg">Corpo lg: a amostra 07 apresentou contagem acima do limite.</p>
          <p>Corpo base: resultados devem ser registrados antes do descarte das placas.</p>
          <p className="text-muted">Texto secundário (muted)</p>
          <p className="font-mono">Mono: AMOSTRA-0427 · 10⁵ UFC/g</p>
        </div>
      </Section>

      <Section title="Botões">
        <div className="flex flex-wrap gap-3">
          <button className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-strong">
            Confirmar
          </button>
          <button className="rounded-lg border-2 border-primary px-6 py-3 font-semibold text-primary hover:bg-primary/10">
            Secundário
          </button>
          <button className="rounded-lg px-6 py-3 font-semibold text-muted hover:bg-line/50">Terciário</button>
          <button disabled className="rounded-lg bg-primary px-6 py-3 font-semibold text-white opacity-40">
            Desabilitado
          </button>
        </div>
      </Section>

      <Section title="Timer">
        <div className="flex flex-wrap gap-4">
          <div className="rounded-xl bg-ink px-6 py-4 font-mono text-5xl text-white tabular-nums">42:17</div>
          <div className="rounded-xl bg-ink px-6 py-4 font-mono text-5xl text-accent tabular-nums">04:59</div>
          <div className="animate-pulse rounded-xl bg-danger px-6 py-4 font-mono text-5xl text-white tabular-nums">
            00:48
          </div>
        </div>
        <p className="text-sm text-muted">Normal · menos de 5 min · menos de 1 min</p>
      </Section>

      <Section title="Código final">
        <div className="flex gap-2">
          {['3', '7', null, '1', null].map((d, i) => (
            <div
              key={i}
              className={`flex h-16 w-12 items-center justify-center rounded-lg border-2 font-mono text-3xl font-bold ${
                d ? 'border-primary bg-primary/10 text-primary' : 'border-dashed border-line text-line'
              }`}
            >
              {d ?? '?'}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Questão: múltipla escolha">
        <div className="space-y-4 rounded-2xl border border-line bg-panel p-6">
          <p className="font-mono text-xs text-muted">QUESTÃO 03 · penalidade 2 min</p>
          <p className="font-serif text-2xl font-medium">Qual microrganismo foi isolado na placa B?</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {options.map((opt, i) => {
              const state =
                picked === null || picked !== i
                  ? 'border-line hover:border-primary'
                  : i === correct
                    ? 'border-success bg-success/10 text-success'
                    : 'border-danger bg-danger/10 text-danger'
              return (
                <button
                  key={opt}
                  onClick={() => setPicked(i)}
                  className={`rounded-xl border-2 p-4 text-left text-lg italic transition-colors ${state}`}
                >
                  {opt}
                </button>
              )
            })}
          </div>
          <p className="text-sm text-muted">Toque numa opção para ver os estados de acerto/erro.</p>
        </div>
      </Section>

      <Section title="Questão: resposta aberta">
        <div className="space-y-4 rounded-2xl border border-line bg-panel p-6">
          <p className="font-mono text-xs text-muted">QUESTÃO 05 · penalidade 1 min</p>
          <p className="font-serif text-2xl font-medium">Qual a temperatura de incubação indicada no rótulo?</p>
          <div className="flex gap-3">
            <input
              placeholder="Digite a resposta"
              className="flex-1 rounded-xl border-2 border-line bg-surface px-4 py-3 text-lg outline-none focus:border-primary"
            />
            <button className="rounded-xl bg-primary px-6 font-semibold text-white hover:bg-primary-strong">
              Enviar
            </button>
          </div>
        </div>
      </Section>

      <Section title="Feedback">
        <div className="space-y-3">
          <div className="rounded-xl border-l-4 border-success bg-success/10 p-4">
            <p className="font-semibold text-success">Análise correta!</p>
            <p className="text-sm">Dígito do código liberado: <span className="font-mono font-bold">7</span></p>
          </div>
          <div className="rounded-xl border-l-4 border-danger bg-danger/10 p-4">
            <p className="font-semibold text-danger">Resultado incorreto</p>
            <p className="text-sm">Penalidade aplicada: <span className="font-mono font-bold">−2:00</span></p>
          </div>
        </div>
      </Section>
    </main>
  )
}
