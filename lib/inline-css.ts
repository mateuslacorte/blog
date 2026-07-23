import { readFileSync } from 'fs'
import { join } from 'path'

/** Minify globals.css for inlining into <style> (avoids a render-blocking stylesheet request). */
export function getInlineGlobalCss(): string {
  const raw = readFileSync(
    join(process.cwd(), 'styles', 'globals.css'),
    'utf8'
  )

  return raw
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>~+])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim()
}
