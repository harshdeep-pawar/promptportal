import PromptCard from '../components/PromptCard.jsx'

function matches(query, text) {
  if (!query) return true
  return text.toLowerCase().includes(query.toLowerCase())
}

const promptExamples = [
  // Quality contrast
  {
    title: 'Explain AI (bad)',
    tone: 'bad',
    prompt: 'Explain AI',
  },
  {
    title: 'Explain AI with clarity (good)',
    tone: 'good',
    prompt:
      'Explain Artificial Intelligence in simple language with three real world examples. Keep it under 120 words.',
  },

  // Summaries
  {
    title: 'Summarize with format control',
    prompt:
      'Summarize the following text in 5 bullet points. Then give a 1-sentence takeaway.\n\nText:\n<PASTE YOUR TEXT HERE>',
  },
  {
    title: 'Executive summary from notes',
    prompt:
      'You are an executive assistant. Turn the following meeting notes into an executive summary.\nInclude: 3 key decisions, 3 risks, and 3 next actions with owners.\n\nNotes:\n<PASTE NOTES>',
  },
  {
    title: 'Compare two articles',
    prompt:
      'Compare the following two articles.\nOutput a table with columns: Aspect, Article A, Article B, Notes.\nFocus on: main claim, evidence, tone, and limitations.\n\nArticle A:\n<PASTE>\n\nArticle B:\n<PASTE>',
  },

  // Frontend & code
  {
    title: 'Generate a test plan (frontend)',
    prompt:
      'You are a QA engineer. Create a concise test plan for a login page.\nInclude: functional tests, accessibility checks, edge cases.\nOutput as a checklist.',
  },
  {
    title: 'Refactor guidance (with constraints)',
    prompt:
      'You are a senior engineer. Refactor the following JavaScript function for readability.\nConstraints: keep behavior identical, no external libraries.\nOutput: revised code + 3 bullet explanations.\n\nCode:\n<PASTE CODE>',
  },
  {
    title: 'Generate React component ideas',
    prompt:
      'You are a senior frontend engineer.\nPropose 10 reusable React component ideas for a design system.\nOutput as a Markdown table with columns: Name, Description, Complexity (1-3).',
  },
  {
    title: 'Code review checklist',
    prompt:
      'Create a code review checklist for a React + TypeScript project.\nInclude sections: correctness, performance, accessibility, DX, security.',
  },
  {
    title: 'Debugging assistant',
    prompt:
      'You are a debugging assistant.\nGiven the following error message and code snippet, think step-by-step to propose 3 likely causes and 3 experiments to run.\nFormat your answer as a Markdown list.\n\nError:\n<PASTE ERROR>\n\nCode:\n<PASTE CODE>',
  },

  // Emails & communication
  {
    title: 'Professional apology email',
    prompt:
      'Write a professional apology email to a client for a delayed delivery.\nTone: honest, concise, and solution-oriented.\nInclude: short apology, explanation (without blame), concrete next steps.',
  },
  {
    title: 'Interview follow-up email',
    prompt:
      'Draft a short follow-up email after a frontend developer interview.\nTone: appreciative and confident.\nLimit to 150 words.',
  },
  {
    title: 'Stakeholder update',
    prompt:
      'You are a product manager.\nWrite a weekly update email for stakeholders about the status of a new dashboard feature.\nInclude sections: Progress, Risks, Next Week.',
  },
  {
    title: 'Rewrite for clarity',
    prompt:
      'Rewrite the following paragraph to be clearer and more concise while preserving all important details.\nHighlight any assumptions you had to make.\n\nText:\n<PASTE PARAGRAPH>',
  },
  {
    title: 'Change tone of message',
    prompt:
      'Change the tone of the following message to be more friendly but still professional.\nProvide 3 alternative rephrasings.\n\nMessage:\n<PASTE MESSAGE>',
  },

  // Product & UX
  {
    title: 'User story generation',
    prompt:
      'Convert the following product requirements into user stories using the format:\n“As a <user>, I want <capability> so that <reason>”.\nGroup by epic when possible.\n\nRequirements:\n<PASTE REQUIREMENTS>',
  },
  {
    title: 'UX copy suggestions',
    prompt:
      'You are a UX writer.\nSuggest microcopy for buttons, empty states, and error messages for a “Team Invitations” screen.\nOutput as a table with: Location, Text, Notes.',
  },
  {
    title: 'Feature naming brainstorm',
    prompt:
      'Brainstorm 20 potential names for a feature that lets teams save and share prompt templates.\nOutput as a Markdown list grouped by naming theme.',
  },
  {
    title: 'Onboarding checklist',
    prompt:
      'Design an onboarding checklist for new users of a prompt engineering portal.\nInclude: 5 quick wins, 5 deeper dives, and 5 “pro tips”.',
  },
  {
    title: 'Persona creation',
    prompt:
      'Create 3 user personas for a prompt engineering learning platform: a student, a junior developer, and a product manager.\nFor each, include: Goals, Frustrations, Tools they use, Success definition.',
  },

  // Learning & teaching
  {
    title: 'Explain concept with analogy',
    prompt:
      'Explain “few-shot prompting” to a non-technical audience using 2 analogies from everyday life.\nThen give one 3-step exercise to practice it.',
  },
  {
    title: 'Guided study plan (7 days)',
    prompt:
      'Create a 7-day study plan to learn prompt engineering fundamentals.\nEach day should have: 1 concept, 1 practice task, and 1 reflection question.',
  },
  {
    title: 'Flashcards generator',
    prompt:
      'From the following text, generate 15 flashcards.\nUse Q: / A: format.\nTry to cover definitions, examples, and subtle details.\n\nText:\n<PASTE TEXT>',
  },
  {
    title: 'Socratic tutor',
    prompt:
      'You are a Socratic tutor.\nAsk me a series of questions to help me understand the difference between zero-shot and few-shot prompting.\nDo NOT give the answer directly until I attempt to answer.',
  },
  {
    title: 'Checklist for good prompts',
    prompt:
      'Create a practical checklist to evaluate whether a prompt is “production ready”.\nGroup checks into: Clarity, Context, Constraints, Evaluation.',
  },

  // Data & analysis
  {
    title: 'Extract structured data',
    prompt:
      'Extract structured data from the following text.\nOutput valid JSON with fields: name, role, company, skills[], location.\nIf a field is missing, use null.\n\nText:\n<PASTE TEXT>',
  },
  {
    title: 'Classify user feedback',
    prompt:
      'Classify each feedback item into one of: bug, feature request, UX issue, praise.\nReturn a JSON array of objects: {\"text\",\"category\"}.\n\nFeedback:\n<PASTE FEEDBACK LIST>',
  },
  {
    title: 'Compare options with pros/cons',
    prompt:
      'Given the following 3 options, create a pros/cons table.\nAdd a final recommendation with reasoning.\n\nOptions:\n1) <OPTION 1>\n2) <OPTION 2>\n3) <OPTION 3>',
  },
  {
    title: 'Risk analysis',
    prompt:
      'Perform a simple risk analysis for launching an AI-powered feature.\nOutput a table with: Risk, Likelihood (Low/Med/High), Impact (Low/Med/High), Mitigation.',
  },
  {
    title: 'Hypothesis generation',
    prompt:
      'From the following dataset description and metric, generate 10 hypotheses we could test.\nEach hypothesis should be clear, falsifiable, and include what data you would check.\n\nContext:\n<PASTE CONTEXT>',
  },

  // Images & creativity
  {
    title: 'Midjourney prompt template',
    prompt:
      'Create a reusable Midjourney prompt template for generating clean dashboard UI screenshots.\nInclude placeholders for: color palette, layout style, data type, and device.',
  },
  {
    title: 'Character concept prompts',
    prompt:
      'Generate 10 prompts for a fantasy game character artist.\nEach prompt should specify: role, visual style, color accents, and a unique twist.',
  },
  {
    title: 'Logo exploration prompts',
    prompt:
      'Write 8 prompts to explore logo ideas for a “Prompt Engineering Portal”.\nVary style (minimalist, playful, futuristic, editorial) and color schemes.',
  },
  {
    title: 'Story starter',
    prompt:
      'Write the opening scene of a short story where a developer discovers a prompt that can change real-world events.\nThen list 3 directions the story could go.',
  },
  {
    title: 'Brainstorm content ideas',
    prompt:
      'Brainstorm 30 content ideas (articles or videos) for teaching prompt engineering to beginners.\nGroup them into 5 themed series.',
  },

  // Workflows & automation
  {
    title: 'Prompted workflow design',
    prompt:
      'Design a 5-step workflow that uses an AI model to help triage incoming support tickets.\nFor each step, specify: Input, Prompt, Output, Tool (if any).',
  },
  {
    title: 'Prompt versioning',
    prompt:
      'Propose a simple versioning scheme for prompts used in production.\nInclude naming conventions, metadata to track, and an example changelog entry.',
  },
  {
    title: 'Prompt debugging script',
    prompt:
      'Given a failing prompt (unreliable outputs), create a debugging script with questions and experiments to run.\nOrganize it as a checklist developers can follow.',
  },
  {
    title: 'System prompt design',
    prompt:
      'You are tasked with writing a system prompt for an AI pair-programmer.\nWrite the system prompt and explain 5 key design choices you made.',
  },
  {
    title: 'Guardrail examples',
    prompt:
      'Create examples of guardrail prompts that:\n1) Politely refuse unsafe requests\n2) Redirect to safe alternatives\n3) Ask for clarification when a request is ambiguous.',
  },

  // Career & self-improvement
  {
    title: 'Career reflection prompts',
    prompt:
      'Generate 15 reflection prompts for a developer who wants to specialize in AI and prompt engineering.\nGroup them into: Skills, Projects, Network, Mindset.',
  },
  {
    title: 'Portfolio project ideas',
    prompt:
      'Suggest 10 portfolio project ideas that showcase prompt engineering skills.\nFor each, add: One-sentence description and primary AI capability demonstrated.',
  },
  {
    title: 'Mock interview questions',
    prompt:
      'Act as an interviewer for a “Prompt Engineer” role.\nAsk me 10 questions (mix of conceptual and practical) and wait for my answers after each.',
  },
  {
    title: 'Learning roadmap',
    prompt:
      'Given my current role and experience (which I will provide), create a learning roadmap for the next 6 months to become strong at prompt engineering.\nUse monthly milestones.',
  },
  {
    title: 'Daily practice prompts',
    prompt:
      'Design a 30-day daily practice plan.\nEach day should have one small prompt engineering exercise I can complete in 15–20 minutes.',
  },
]

export default function Examples({ searchQuery }) {
  const filtered = promptExamples.filter(
    (p) =>
      matches(searchQuery, p.title) || matches(searchQuery, p.prompt) || matches(searchQuery, p.tone ?? ''),
  )

  return (
    <div id="examples">
      <h1 style={{ marginTop: 0 }}>Examples</h1>
      <p className="muted">
        Copy reusable prompt templates. Use search to filter by topic (e.g.
        “email”, “test plan”, “summarize”).
      </p>

      <div className="gridCards" style={{ marginTop: 10 }}>
        {(filtered.length ? filtered : promptExamples).map((p) => (
          <PromptCard
            key={p.title}
            title={p.title}
            prompt={p.prompt}
            tone={p.tone}
          />
        ))}
      </div>
    </div>
  )
}

