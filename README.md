# LACORTE Systems Blog

Um blog React/Next.js inspirado no terminal do Fallout.

## Características

- Design retro inspirado em terminal Fallout
- Posts em Markdown
- Sistema de comentários
- Formulários de contato e newsletter
- Web Workers e WebAssembly
- Animações CSS personalizadas
- SEO otimizado

## Tecnologias

- Next.js
- React 18
- TypeScript
- Markdown
- date-fns

## Instalação

1. Instale as dependências:

```bash
npm install
```

2. Adicione um logo (opcional):

Coloque uma imagem `logo.png` em `public/assets/images/`

3. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Estrutura de Pastas

```
blog/
├── app/                   # Páginas
│   ├── api/               # API
│   └── ...
├── components/            # Componentes
├── content/               # Posts em Markdown
│   └── posts/
├── hooks/                 # Hooks
├── lib/                   # Utilitários
├── public/                # Assets
│   └── assets/
│       ├── js/           # JavaScript
│       ├── wasm/         # WebAssembly
│       └── images/       # Imagens
└── styles/               # CSS
```

## Criando Posts

Crie um arquivo Markdown em `content/posts/` com o seguinte formato:

```markdown
---
title: "Título do Post"
date: "2025-01-15"
excerpt: "Resumo do post"
tags: ["tag1", "tag2"]
---

Conteúdo do post em Markdown...
```

## API

### `/api/contact`
POST - Envia formulário de contato

### `/api/newsletter`
POST - Inscreve email na newsletter

### `/api/comments`
GET - Busca comentários de um post
POST - Adiciona comentário a um post

## Notas

- Defina `NEXT_PUBLIC_SITE_URL` (ver `.env.example`) para canonicals, sitemap, robots e Open Graph
- RSS em `/feed.xml`
- Configure serviços de email para formulários (SendGrid, Resend, etc.)
- Adicione um logo em `public/assets/images/logo.webp`

## Google Search Console (após deploy)

1. Property deve ser **`https://www.lacorte.dev`** (alinhar com `NEXT_PUBLIC_SITE_URL`; apex sem www só se redirecionar 301 para www).
2. Em **Sitemaps**, envie/reenvie `https://www.lacorte.dev/sitemap.xml`.
3. Em **URL Inspection**, teste `/posts` e 2–3 posts individuais → **Request indexing**.
4. Confirme no Vercel que Attack Challenge / Bot Protection não bloqueia o Googlebot (403 em crawlers).
5. Indexação não é imediata — “Crawled – currently not indexed” em site pequeno pode levar dias mesmo após os fixes.

## Licença

MIT

