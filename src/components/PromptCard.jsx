import { useMemo, useState } from 'react'

export default function PromptCard({ title, prompt, tone = 'neutral' }) {
  const [copied, setCopied] = useState(false)

  const headerHint = useMemo(() => {
    if (tone === 'bad') return 'Bad prompt'
    if (tone === 'good') return 'Good prompt'
    return 'Prompt'
  }, [tone])

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 900)
    } catch {
      // Fallback for older browsers: select-and-copy via a hidden textarea.
      const el = document.createElement('textarea')
      el.value = prompt
      el.setAttribute('readonly', '')
      el.style.position = 'fixed'
      el.style.top = '-9999px'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 900)
    }
  }

  return (
    <div className="card promptCard">
      <div className="promptMeta">
        <div>
          <div className="muted" style={{ fontSize: 12 }}>
            {headerHint}
          </div>
          <h3 className="promptTitle">{title}</h3>
        </div>
        <div className="copyRow">
          {copied ? <div className="toast">Copied</div> : null}
          <button type="button" className="btn" onClick={onCopy}>
            {copied ? 'Copied' : 'Copy Prompt'}
          </button>
        </div>
      </div>

      <pre className="codeBlock">
        <code>{prompt}</code>
      </pre>
    </div>
  )
}

