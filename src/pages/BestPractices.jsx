const tips = [
  {
    title: 'Be specific',
    text: 'State the exact task, target audience, length, and boundaries. Ambiguity increases randomness.',
  },
  {
    title: 'Provide context',
    text: 'Include background info, assumptions, and constraints (tools, tone, timeframe, domain).',
  },
  {
    title: 'Use examples',
    text: 'Show 1–2 examples of the desired output style. Few-shot examples reduce variance.',
  },
  {
    title: 'Ask for step-by-step approach',
    text: 'Request a clear process (checklist, plan, rubric) and keep the final answer clean.',
  },
  {
    title: 'Define output format',
    text: 'Specify JSON, Markdown headings, a table, bullet list, or a schema so it’s easy to reuse.',
  },
]

export default function BestPractices() {
  return (
    <div id="best-practices">
      <h1 style={{ marginTop: 0 }}>Best Practices</h1>
      <p className="muted">
        Strong prompts look like good requirements: clear goal, clear context,
        clear output.
      </p>

      <div className="gridCards" style={{ marginTop: 10 }}>
        {tips.map((t) => (
          <div key={t.title} className="card">
            <div className="icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6 9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="cardTitle">{t.title}</h3>
            <p className="cardText">{t.text}</p>
          </div>
        ))}
      </div>

      <h2 className="sectionTitle">A practical template</h2>
      <pre className="codeBlock">
        <code>{`Role: Who should the model act as?
Goal: What exactly should it accomplish?
Context: What does it need to know?
Constraints: What must it avoid / follow?
Output format: How should the answer be structured?
Evaluation: What does "good" look like?`}</code>
      </pre>
    </div>
  )
}

