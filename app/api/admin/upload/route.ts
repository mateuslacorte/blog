import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content', 'posts')
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

// Garantir que o diretório existe
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true })
}

function sanitizeFilename(filename: string): string {
  // Remove extensão .md
  const name = filename.replace(/\.md$/, '')
  // Remove caracteres especiais e espaços, substitui por hífens
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação (simplificado - em produção use sessões/JWT)
    const authHeader = request.headers.get('authorization')
    // Por enquanto, vamos confiar que o usuário está autenticado
    // Em produção, implemente verificação de sessão adequada

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo fornecido' },
        { status: 400 }
      )
    }

    if (!file.name.endsWith('.md')) {
      return NextResponse.json(
        { error: 'Apenas arquivos .md são permitidos' },
        { status: 400 }
      )
    }

    // Ler conteúdo do arquivo
    const fileContent = await file.text()

    // Validar front matter
    let frontMatter
    try {
      const parsed = matter(fileContent)
      frontMatter = parsed.data
      
      if (!frontMatter.title) {
        return NextResponse.json(
          { error: 'O arquivo deve conter um campo "title" no front matter' },
          { status: 400 }
        )
      }
    } catch (error) {
      return NextResponse.json(
        { error: 'Erro ao processar front matter do arquivo' },
        { status: 400 }
      )
    }

    // Gerar slug baseado no título ou nome do arquivo
    const slug = frontMatter.slug || sanitizeFilename(frontMatter.title || file.name)

    // Verificar se já existe um post com esse slug
    const filePath = path.join(postsDirectory, `${slug}.md`)
    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `Já existe um post com o slug "${slug}". Use um título diferente.` },
        { status: 400 }
      )
    }

    // Salvar arquivo
    fs.writeFileSync(filePath, fileContent, 'utf8')

    return NextResponse.json(
      {
        success: true,
        slug,
        message: `Post "${slug}" criado com sucesso!`,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error uploading post:', error)
    return NextResponse.json(
      { error: 'Erro ao processar o arquivo' },
      { status: 500 }
    )
  }
}

