import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'
import { IconOpenAI } from '@/components/ui/icons'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4 bg-stone-800 text-white rounded-lg">
      <div className=" items-center justify-center flex pt-8 ">
        <IconOpenAI className="h-9 w-9 text-green-500" />
      </div>
      <div className="flex flex-col gap-2 rounded-lg  p-8 bg-stone-800 ">
        <h6 className="text-4xl text-center ">Hi how can i help you Today!</h6>
        <p className="leading-normal text-muted-foreground text-white text-center">
          This Code will display a prompt asking the user for their name{' '}
          <ExternalLink href="https://nextjs.org">Next.js</ExternalLink>, the{' '}
          and it will display a greeting message , and .
        </p>
        <p className="leading-normal text-muted-foreground text-white text-center">
          It uses{' '}
          <ExternalLink href="https://vercel.com/blog/ai-sdk-3-generative-ui">
            React Server Components
          </ExternalLink>{' '}
          to combine text with generative UI as output of the LLM. The UI state
          is synced through the SDK so the model is aware of your interactions
          as they happen.
        </p>
      </div>
    </div>
  )
}
