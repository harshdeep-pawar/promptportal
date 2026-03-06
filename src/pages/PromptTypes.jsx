export default function PromptTypes() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Prompt Types</h1>
      <p className="muted">
        Different prompting patterns help you control quality and consistency.
        Use these templates as building blocks.
      </p>

      <h2 className="sectionTitle">Zero-shot prompting</h2>
      <div className="gridCards">
        <div className="card" style={{ gridColumn: 'span 12' }}>
          <h3 className="cardTitle">No examples, just instruction</h3>
          <p className="cardText">
            Zero-shot works when the task is simple and the model already has
            enough general knowledge.
          </p>
          <pre className="codeBlock">
            <code>{`Explain "prompt engineering" in simple language.
Include 3 real-world examples.
Format: bullet list + a short concluding sentence.`}</code>
          </pre>
        </div>
      </div>

      <h2 className="sectionTitle">Few-shot prompting</h2>
      <div className="gridCards">
        <div className="card" style={{ gridColumn: 'span 12' }}>
          <h3 className="cardTitle">Provide a couple of examples</h3>
          <p className="cardText">
            Few-shot reduces variance by showing the model what “good” looks
            like.
          </p>
          <pre className="codeBlock">
            <code>{`Task: Convert user requests into JSON.

Example:
Input: "Summarize this article in 5 bullets"
Output: {"task":"summarize","format":"bullets","count":5}

Example:
Input: "Write an email apologizing for late delivery"
Output: {"task":"email","tone":"apologetic","topic":"late delivery"}

Now do this:
Input: "Create a 7-day beginner plan to learn prompt engineering"`}</code>
          </pre>
        </div>
      </div>

      <h2 className="sectionTitle">Chain-of-thought prompting</h2>
      <div className="gridCards">
        <div className="card" style={{ gridColumn: 'span 12' }}>
          <h3 className="cardTitle">Encourage structured reasoning</h3>
          <p className="cardText">
            Ask for a step-by-step approach, but keep the final answer concise.
            (In production, you can request a short rationale + final output.)
          </p>
          <pre className="codeBlock">
            <code>{`You are a tutor.
Problem: "How should I evaluate whether a prompt is good?"

Think step-by-step and produce:
1) A checklist
2) A simple scoring rubric (1-5)
3) One worked example`}</code>
          </pre>
        </div>
      </div>

      <h2 className="sectionTitle">Role-based prompting</h2>
      <div className="gridCards">
        <div className="card" style={{ gridColumn: 'span 12' }}>
          <h3 className="cardTitle">Assign a clear role and expertise</h3>
          <p className="cardText">
            Roles help the model choose tone, depth, and assumptions. Pair the
            role with explicit constraints and output format.
          </p>
          <pre className="codeBlock">
            <code>{`Role: You are a senior frontend developer.
Goal: Review my React component for accessibility issues.
Constraints: Provide 5 actionable fixes.
Output format: A table with "Issue" and "Fix".

Component:
<button onClick={...}>Submit</button>`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}

