import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Skill Tree & Technologies used by LACORTE Systems',
}

export default function SkillsPage() {
  const skills = [
    'Node.js',
    'React & Next.js',
    'PHP & Laravel',
    'NestJS',
    'Python & Django',
    'Java',
    'Docker & Serverless',
  ]

  return (
    <>
      <h2>Skill Tree & Technologies</h2>

      <ul>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </>
  )
}
