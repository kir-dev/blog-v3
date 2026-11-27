'use client'

import { ClipboardIcon, DocumentCheckIcon } from '@heroicons/react/24/outline'
import React, { useMemo, useState } from 'react'
import { refractor } from 'refractor/lib/core.js'
import bash from 'refractor/lang/bash.js'
import css from 'refractor/lang/css.js'
import docker from 'refractor/lang/docker.js'
import java from 'refractor/lang/java.js'
import js from 'refractor/lang/javascript.js'
import json from 'refractor/lang/json.js'
import kt from 'refractor/lang/kotlin.js'
import md from 'refractor/lang/markdown.js'
import markup from 'refractor/lang/markup.js'
import py from 'refractor/lang/python.js'
import rb from 'refractor/lang/ruby.js'
import sql from 'refractor/lang/sql.js'
import tsx from 'refractor/lang/tsx.js'
import ts from 'refractor/lang/typescript.js'
import yaml from 'refractor/lang/yaml.js'

const registeredLangs = [
  bash,
  css,
  docker,
  java,
  js,
  json,
  kt,
  md,
  markup,
  py,
  rb,
  sql,
  tsx,
  ts,
  yaml,
]

let langsLoaded = false
function ensureLangsLoaded() {
  if (langsLoaded) return
  for (const lang of registeredLangs) {
    refractor.register(lang)
  }
  langsLoaded = true
}

function normalizeLanguage(language?: string | null): string {
  switch ((language ?? '').toLowerCase()) {
    case 'sh':
    case 'shell':
    case 'powershell':
    case 'dockerfile':
      return 'bash'
    case 'js':
      return 'javascript'
    case 'ts':
      return 'typescript'
    case 'rb':
      return 'ruby'
    case 'html':
    case 'xml':
      return 'markup'
    case 'py':
      return 'python'
    case 'kt':
      return 'kotlin'
    case 'yml':
      return 'yaml'
    case 'md':
      return 'markdown'
    default:
      return (language ?? '').toLowerCase()
  }
}

interface HastNode {
  type: string
  value?: string
  tagName?: string
  properties?: { className?: string[] }
  children?: HastNode[]
}

function renderHast(nodes: HastNode[], keyPrefix = ''): React.ReactNode {
  return nodes.map((node, index) => {
    const key = `${keyPrefix}-${index}`
    if (node.type === 'text') {
      return node.value ?? ''
    }
    if (node.type === 'element' && node.tagName) {
      const Tag = node.tagName as keyof React.JSX.IntrinsicElements
      const className = Array.isArray(node.properties?.className)
        ? node.properties.className.join(' ')
        : undefined
      return (
        <Tag key={key} className={className}>
          {node.children ? renderHast(node.children, key) : null}
        </Tag>
      )
    }
    return null
  })
}

interface Props {
  code: string
  language?: string | null
}

const PostCodeBlock: React.FC<Props> = ({ code, language }) => {
  const [showSavedIcon, setShowSavedIcon] = useState(false)

  const { highlighted, className } = useMemo(() => {
    ensureLangsLoaded()
    const modLang = normalizeLanguage(language)
    if (modLang && refractor.registered(modLang)) {
      const tree = refractor.highlight(code, modLang) as unknown as {
        children: HastNode[]
      }
      return {
        highlighted: renderHast(tree.children, 'code'),
        className: `language-${modLang}`,
      }
    }
    return {
      highlighted: code,
      className: 'language-text',
    }
  }, [code, language])

  return (
    <div className="relative my-3">
      <button
        type="button"
        aria-label="Copy to clipboard"
        className="absolute top-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-black/30 text-white hover:bg-black/50 transition-colors"
        onClick={() => {
          navigator.clipboard.writeText(code)
          setShowSavedIcon(true)
          setTimeout(() => {
            setShowSavedIcon(false)
          }, 1500)
        }}
      >
        {showSavedIcon ? (
          <DocumentCheckIcon className="w-4 h-4 text-success" />
        ) : (
          <ClipboardIcon className="w-4 h-4" />
        )}
      </button>
      <pre className={className}>
        <code className={className}>{highlighted}</code>
      </pre>
    </div>
  )
}

export default PostCodeBlock
