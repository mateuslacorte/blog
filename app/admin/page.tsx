'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        setAuthenticated(true)
        setMessage('')
      } else {
        setMessage('Usuário ou senha incorretos')
      }
    } catch (error) {
      setMessage('Erro ao autenticar')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.name.endsWith('.md')) {
        setFile(selectedFile)
        setMessage('')
      } else {
        setMessage('Por favor, selecione um arquivo .md')
        setFile(null)
      }
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!file) {
      setMessage('Por favor, selecione um arquivo')
      return
    }

    setUploading(true)
    setMessage('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`Post "${data.slug}" criado com sucesso!`)
        setFile(null)
        // Reset file input
        const fileInput = document.getElementById('file-input') as HTMLInputElement
        if (fileInput) fileInput.value = ''
      } else {
        setMessage(data.error || 'Erro ao fazer upload')
      }
    } catch (error) {
      setMessage('Erro ao fazer upload do arquivo')
    } finally {
      setUploading(false)
    }
  }

  if (!authenticated) {
    return (
      <>
        <h2>Admin Panel - Login</h2>
        <form onSubmit={handleLogin}>
          <label>Username &gt;&gt;</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <label>Password &gt;&gt;</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <input type="submit" value="Login" />
        </form>
        {message && <p style={{ color: 'red' }}>{message}</p>}
      </>
    )
  }

  return (
    <>
      <h2>Admin Panel - Upload Post</h2>
      <p>
        <a href="/" onClick={(e) => { e.preventDefault(); router.push('/') }}>
          [ Voltar para Home ]
        </a>
      </p>

      <form onSubmit={handleUpload}>
        <label>Markdown File &gt;&gt;</label>
        <input
          id="file-input"
          type="file"
          accept=".md"
          onChange={handleFileChange}
          required
        />
        <br />
        {file && (
          <p>
            Arquivo selecionado: <strong>{file.name}</strong>
          </p>
        )}
        <input
          type="submit"
          value={uploading ? 'Uploading...' : 'Upload Post'}
          disabled={uploading || !file}
        />
      </form>

      {message && (
        <p style={{ color: message.includes('sucesso') ? '#0d0' : 'red' }}>
          {message}
        </p>
      )}

      <h3>Formato do arquivo Markdown:</h3>
      <pre style={{ background: '#1a1a1a', padding: '20px', overflow: 'auto' }}>
{`---
title: "Título do Post"
date: "2025-01-15"
excerpt: "Resumo do post"
tags: ["tag1", "tag2"]
---

Conteúdo do post em Markdown...`}
      </pre>
    </>
  )
}

