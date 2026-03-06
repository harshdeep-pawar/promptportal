const tools = [
  {
    name: 'ChatGPT',
    url: 'https://chat.openai.com',
    desc: 'AI chatbot developed by OpenAI used for generating text, answering questions, coding help, and prompt experimentation.',
  },
  {
    name: 'Google Gemini',
    url: 'https://gemini.google.com',
    desc: 'Google’s advanced AI model used for reasoning, research, coding, and generating content.',
  },
  {
    name: 'Claude AI',
    url: 'https://claude.ai',
    desc: 'AI assistant developed by Anthropic focused on safe and helpful conversational AI.',
  },
  {
    name: 'Midjourney',
    url: 'https://www.midjourney.com',
    desc: 'AI image generation tool that creates high-quality images from text prompts.',
  },
  {
    name: 'Perplexity AI',
    url: 'https://www.perplexity.ai',
    desc: 'AI powered search engine that provides answers with citations and real-time web information.',
  },
  {
    name: 'GitHub Copilot',
    url: 'https://github.com/features/copilot',
    desc: 'AI coding assistant that helps developers write code faster inside IDEs.',
  },
  {
    name: 'Leonardo AI',
    url: 'https://leonardo.ai',
    desc: 'AI platform used for generating game assets, images, and creative visuals using prompts.',
  },
  {
    name: 'Notion AI',
    url: 'https://www.notion.so/product/ai',
    desc: 'AI assistant built into Notion for writing, summarizing, and transforming content directly inside your workspace.',
  },
]

export default function AITools() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Popular AI Tools for Prompt Engineering</h1>
      <p className="muted">
        These tools show up across the prompt engineering workflow—from exploring ideas and writing
        content to generating code and images. Learn how each one fits into your toolbox.
      </p>

      <div className="gridCards" style={{ marginTop: 14 }}>
        {tools.map((t) => (
          <a
            key={t.name}
            href={t.url}
            target="_blank"
            rel="noreferrer"
            className="card toolCardLink"
          >
            <div className="toolLogo" aria-hidden="true">
              <span>
                {t.name
                  .split(' ')
                  .map((part) => part[0])
                  .join('')
                  .slice(0, 3)}
              </span>
            </div>
            <h3 className="cardTitle" style={{ textAlign: 'center' }}>
              {t.name}
            </h3>
            <p className="cardText" style={{ textAlign: 'center' }}>
              {t.desc}
            </p>
            <div style={{ marginTop: 14, display: 'flex', justifyContent: 'center' }}>
              <span className="btn btnSecondary">Visit Tool</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

