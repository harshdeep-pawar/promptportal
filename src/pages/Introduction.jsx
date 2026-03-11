export default function Introduction() {
  return (
    <div id="introduction">
      <h1 style={{ marginTop: 0 }}>Introduction</h1>
      <p className="muted">
        Prompt engineering is the practice of designing inputs (prompts) that
        reliably steer an AI model toward a desired output.
      </p>

      <h2 className="sectionTitle">Definition</h2>
      <div className="gridCards">
        <div className="card" style={{ gridColumn: 'span 12' }}>
          <h3 className="cardTitle">What is a prompt?</h3>
          <p className="cardText">
            A prompt is the instruction and context you give an AI model. Great
            prompts reduce ambiguity by specifying the goal, constraints, and
            the expected output format.
          </p>
        </div>
      </div>

      <h2 className="sectionTitle">Use cases</h2>
      <div className="gridCards">
        <div className="card">
          <h3 className="cardTitle">Content & communication</h3>
          <p className="cardText">
            Summaries, blog drafts, emails, documentation, tone rewriting, and
            localization.
          </p>
        </div>
        <div className="card">
          <h3 className="cardTitle">Software engineering</h3>
          <p className="cardText">
            Code explanations, test case ideas, refactoring suggestions, and
            debugging checklists.
          </p>
        </div>
        <div className="card">
          <h3 className="cardTitle">Data & analysis</h3>
          <p className="cardText">
            Insight extraction, classification, structured outputs (JSON), and
            step-by-step problem decomposition.
          </p>
        </div>
        <div className="card">
          <h3 className="cardTitle">Creative tools</h3>
          <p className="cardText">
            Image generation prompts, style controls, story ideation, and
            brainstorming.
          </p>
        </div>
      </div>

      <h2 className="sectionTitle">Benefits</h2>
      <div className="gridCards">
        <div className="card" style={{ gridColumn: 'span 12' }}>
          <h3 className="cardTitle">More predictable outputs</h3>
          <p className="cardText">
            By explicitly defining constraints and format, you get responses
            that are easier to evaluate, compare, and reuse across tasks.
          </p>
          <div style={{ marginTop: 12 }}>
            <pre className="codeBlock">
              <code>{`Task: Create a study guide on "Zero-shot prompting"
Audience: Beginners
Constraints: Use simple language, include 1 analogy, avoid math
Output format: Markdown with headings + bullet lists`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

