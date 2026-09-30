# Lab Enigma v3

Webapp que acompanha um escape room físico. Os jogadores resolvem questões estilo Duolingo (múltipla escolha, resposta aberta, etc.) usando pistas encontradas na sala. Cada questão resolvida revela um dígito de um código final. O app também é a **fonte da verdade do timer** da partida.

**Temática:** os jogadores são microbiologistas do departamento de controle de qualidade e precisam avaliar a qualidade de alimentos. A narrativa ainda está sendo definida, então não invente lore; use textos placeholder claros.

Idioma da interface: **pt-BR**.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`, tokens em `@theme` no `src/index.css`)
- React Router (rotas em `src/main.tsx`, páginas em `src/pages/`)
- Sem backend. Sem biblioteca de estado global: use Context + `useReducer`.

## Comandos

```bash
npm run dev      # servidor de desenvolvimento
npm run build    # typecheck (tsc -b) + build
npm run lint     # eslint
npm run preview  # serve o build
```

## Regras de jogo

- **Um único dispositivo** (tablet/PC dentro da sala) por partida.
- **Navegação livre:** os jogadores veem a lista de questões e resolvem em qualquer ordem.
- **Erro:** aplica a penalidade de tempo definida **na própria questão** e a questão continua aberta para nova tentativa.
- **Acerto:** revela o dígito do código final associado àquela questão.
- **Questão final:** só pode ser respondida com um conteúdo físico que é destravado pelo código final. Ao responder corretamente, aparece a **tela de vitória** e o timer para.
- Sem painel de game master por enquanto; apenas um reset básico da partida.

## Arquitetura

### Timer
- Nunca decremente um contador com `setInterval`. O tempo restante é **derivado**:
  `restante = duracaoTotal - (agora - iniciadoEm) - somaDasPenalidades`
- O intervalo serve só para re-renderizar. Isso mantém o timer correto após reload, aba em segundo plano ou tablet suspenso.

### Estado e persistência
- Estado da partida (`iniciadoEm`, questões resolvidas, penalidades aplicadas, `finalizadoEm`) em um reducer, persistido em `localStorage` a cada mudança e reidratado ao carregar.
- Use uma chave versionada (ex: `lab-enigma:v1`) e descarte estado com versão incompatível.
- Um F5 ou queda de energia **não pode** reiniciar a partida.

### Questões
- Conteúdo em arquivos TS no repositório (ex: `src/questions/`), tipado.
- Modele como union discriminada por `type` (`'multiple-choice' | 'open' | ...`), cada variante com seus campos. Campos comuns: `id`, `title`, `penaltySeconds`, `codeDigit`.
- Um componente por tipo de questão; a validação da resposta fica em função pura, testável sem React.
- Respostas ficam em texto puro no bundle; é aceitável (uso presencial, sem incentivo para trapacear via DevTools).
- Respostas abertas: normalize antes de comparar (trim, minúsculas, sem acentos).

## Convenções

- **Identidade visual:** a rota `/design` (`src/pages/Design.tsx`) é o playground e a referência visual. Antes de criar um componente, consulte-a; ao definir um padrão novo, adicione-o lá. Use só os tokens do `@theme` (`bg-primary`, `text-muted`...), nunca cores hex soltas. Títulos (páginas, enunciados de questão) usam `font-serif` (Newsreader) com peso `font-medium`; o resto usa a fonte padrão do corpo.
- Componentes funcionais e hooks. Nada de classes.
- Mantenha simples: sem abstrações especulativas, sem dependências novas sem necessidade.
- Pense em toque: alvos grandes, layout pensado para tablet.

## Em aberto

- O que acontece quando o tempo chega a zero (tela de derrota? jogo trava?).
- A questão final fica visível desde o início ou só após todos os dígitos serem obtidos?
- Duração total da partida.
- Lista completa de tipos de questão além de múltipla escolha e aberta.
- Narrativa e identidade visual.
