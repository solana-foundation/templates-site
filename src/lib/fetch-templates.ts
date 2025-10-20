/**
 * Fetch templates.json from GitHub and transform to Template format
 */

import { Template, TemplateSource } from './types/templates'
import { markdownToHtml } from './markdown-to-html'

const GITHUB_RAW_URL =
  'https://raw.githubusercontent.com/GuiBibeau/solana-templates/feat/remove-repokit-dependency/templates.json'

const source: TemplateSource = {
  id: 'solana',
  name: 'Solana',
  source: 'gh:solana-foundation/templates',
  provider: 'gh',
  owner: 'solana-foundation',
  repo: 'templates',
}

type TemplatesJsonGroup = {
  description: string
  name: string
  path: string
  templates: {
    description: string
    displayName: string
    id: string
    image: string
    keywords: string[]
    name: string
    path: string
    usecase: string
  }[]
}

/**
 * Fetch templates from GitHub PR branch
 */
export async function fetchTemplatesFromGitHub(): Promise<Template[]> {
  try {
    const response = await fetch(GITHUB_RAW_URL, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch templates: ${response.statusText}`)
    }

    const data: TemplatesJsonGroup[] = await response.json()

    // Transform to Template format
    const templates: Template[] = []

    for (const group of data) {
      for (const template of group.templates) {
        // Fetch readme from GitHub
        const readmePath = `https://raw.githubusercontent.com/GuiBibeau/solana-templates/feat/remove-repokit-dependency/${template.path}/README.md`
        let readme = ''

        try {
          const readmeResponse = await fetch(readmePath, {
            next: { revalidate: 3600 }, // Cache for 1 hour
          })
          if (readmeResponse.ok) {
            const readmeText = await readmeResponse.text()
            // Convert markdown to HTML with syntax highlighting
            readme = await markdownToHtml(readmeText)
          }
        } catch (e) {
          console.warn(`Failed to fetch readme for ${template.name}`, e)
        }

        templates.push({
          source,
          description: template.description,
          displayName: template.displayName,
          id: template.id,
          image: template.image,
          keywords: template.keywords,
          name: template.name,
          path: template.path,
          readme,
          repoUrl: `https://github.com/solana-foundation/templates/tree/main/${template.path}`,
          usecase: template.usecase,
        })
      }
    }

    return templates
  } catch (error) {
    console.error('Failed to fetch templates from GitHub:', error)
    // Fallback to empty array or throw
    throw error
  }
}
