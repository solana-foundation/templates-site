'use client'

import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { AppHero } from '@/components/app-hero'
import { TemplatesUiImage } from '@/lib/templates'
import { TemplatesUiSidebarDetail } from './templates-ui-sidebar-detail'
import { Template } from '@/lib/types/templates'
import { TemplatesProvider } from '@/lib/templates/templates-context'

export function TemplatesUiLayoutDetail({
  name,
  source,
  templates,
}: {
  name: string
  source: string
  templates: Template[]
}) {
  const template = templates.find((t) => t.name === name && t.source.id === source)

  if (!template) {
    return (
      <div>
        <AppHero title="Not Found" subtitle={`Template "${source}/${name}" not found.`} />
        <div className="text-center">
          <Button asChild>
            <Link href="/">Back to templates</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <TemplatesProvider templates={templates}>
      <div>
        <div className="md:col-span-3 gap-4">
          <div>
            <div>
              <div className="max-w-5xl mx-auto mb-4">
                <Button asChild variant="ghost" className="mb-4 px-2">
                  <Link href="/">← Back to templates</Link>
                </Button>
                <h1 className="text-3xl font-bold mb-4">{template.displayName || template.name}</h1>
              </div>
              <div className="border rounded-lg overflow-hidden mb-4 max-w-5xl mx-auto">
                <div className="w-full max-h-96 flex items-center justify-center">
                  <TemplatesUiImage template={template} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-8 max-w-5xl mx-auto">
              <div className="col-span-2">
                <div className="hidden md:block md:sticky md:top-4 md:self-start">
                  <TemplatesUiSidebarDetail template={template} />
                </div>
                <div className="md:hidden ">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Template details</AccordionTrigger>
                      <AccordionContent>
                        <TemplatesUiSidebarDetail template={template} />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
              <div className="col-span-2 md:col-span-3 prose dark:prose-invert max-w-none border rounded-lg p-4 bg-neutral-50 dark:bg-violet-950/5 backdrop-blur-md">
                <div dangerouslySetInnerHTML={{ __html: template.readme }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </TemplatesProvider>
  )
}
