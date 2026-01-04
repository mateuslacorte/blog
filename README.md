# SKIBIDI Systems Blog

Um blog React/Next.js inspirado no terminal do Fallout, migrado do template Ghost CMS original.

## Características

- Design retro inspirado em terminal Fallout
- Posts em Markdown
- Sistema de comentários
- Formulários de contato e newsletter
- Web Workers e WebAssembly
- Animações CSS personalizadas
- SEO otimizado

## Tecnologias

- Next.js 14 (App Router)
- React 18
- TypeScript
- Markdown (gray-matter, remark)
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
├── app/                    # Páginas Next.js (App Router)
│   ├── api/               # API routes
│   ├── posts/             # Páginas de posts
│   └── ...
├── components/            # Componentes React
├── content/               # Posts em Markdown
│   └── posts/
├── hooks/                 # React hooks
├── lib/                   # Utilitários
├── public/                # Assets estáticos
│   └── assets/
│       ├── js/           # JavaScript (Web Workers)
│       ├── wasm/         # WebAssembly
│       └── images/       # Imagens
└── styles/               # CSS global
```

## Criando Posts

Crie arquivos Markdown em `content/posts/` com o seguinte formato:

```markdown
---
title: "Título do Post"
date: "2025-01-15"
excerpt: "Resumo do post"
tags: ["tag1", "tag2"]
---

Conteúdo do post em Markdown...
```

## API Routes

### `/api/contact`
POST - Envia formulário de contato

### `/api/newsletter`
POST - Inscreve email na newsletter

### `/api/comments`
GET - Busca comentários de um post
POST - Adiciona comentário a um post

## Deploy

O projeto está pronto para deploy na Vercel:

```bash
npm run build
```

Ou conecte seu repositório à Vercel para deploy automático.

## Notas

- Atualize o domínio em `app/sitemap.ts` e `app/robots.ts`
- Configure serviços de email para formulários (SendGrid, Resend, etc.)
- Adicione um logo em `public/assets/images/logo.png`

## Licença

MIT

