import { Link } from 'react-router-dom'

function matches(query, text) {
  if (!query) return true
  return text.toLowerCase().includes(query.toLowerCase())
}

const topicCards = [
  {
    title: 'What is Prompt Engineering?',
    text: 'Learn the fundamentals and the mental model: instructions, context, constraints, and evaluation.',
    to: '/introduction',
    icon: 'PE',
  },
  {
    title: 'Why it matters',
    text: 'Better prompts produce more reliable outputs, reduce retries, and make AI workflows reproducible.',
    to: '/best-practices',
    icon: '↑',
  },
  {
    title: 'Featured prompt examples',
    text: 'Compare weak vs strong prompts and copy reusable templates for your own projects.',
    to: '/examples',
    icon: '{}',
  },
  {
    title: 'AI tools preview',
    text: 'Explore popular AI tools and when to use them: chat, coding, images, and research.',
    to: '/ai-tools',
    icon: 'AI',
  },
]

export default function Home({ searchQuery }) {
  const filtered = topicCards.filter(
    (c) => matches(searchQuery, c.title) || matches(searchQuery, c.text),
  )

  return (
    <div>
      <section className="hero">
        <h1 className="heroTitle">Learn Prompt Engineering</h1>
        <p className="heroSubtitle">
          Master the art of communicating with AI models. Build prompts that are
          clear, testable, and reusable—like good documentation.
        </p>

        <div className="heroActions">
          <Link className="btn btnPrimary" to="/introduction">
            Start Learning
          </Link>
          <Link className="btn btnGhost" to="/examples">
            Explore Examples
          </Link>
        </div>
      </section>

      <h2 className="sectionTitle">Quick start</h2>
      <p className="muted">
        Use the search bar to filter topics and prompt cards instantly.
      </p>

      <div className="gridCards" style={{ marginTop: 10 }}>
        {(filtered.length ? filtered : topicCards).map((c) => (
          <Link key={c.title} to={c.to} className="card">
            <div className="icon" aria-hidden="true">
              <span style={{ fontWeight: 800 }}>{c.icon}</span>
            </div>
            <h3 className="cardTitle">{c.title}</h3>
            <p className="cardText">{c.text}</p>
          </Link>
        ))}
      </div>

      <h2 className="sectionTitle">What you’ll build</h2>
      <div className="gridCards" style={{ marginTop: 10 }}>
        <div className="card" style={{ gridColumn: 'span 12' }}>
          <h3 className="cardTitle">A reusable prompt workflow</h3>
          <p className="cardText">
            Think in terms of inputs, constraints, and outputs. Define the role,
            the goal, and the format—then test and iterate.
          </p>
          <div style={{ marginTop: 12 }}>
            <pre className="codeBlock">
              <code>{`Role: You are a technical writer.
Goal: Explain the concept to beginners.
Constraints: Use <= 120 words. No jargon.
Output format: 3 bullet points + 1 example.

Topic: "prompt engineering"`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

