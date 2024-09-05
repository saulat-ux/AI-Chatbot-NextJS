import * as React from 'react'
import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconOpenAI, IconMessage, IconShare } from '@/components/ui/icons'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { PromptForm } from '@/components/prompt-form'
import { FooterText } from '@/components/footer'
import { ChatShareDialog } from '@/components/chat-share-dialog'
import { useAIState, useActions, useUIState } from 'ai/rsc'
import { nanoid } from 'nanoid'
import { UserMessage } from './stocks/message'
import type { AI } from '@/lib/chat/actions'

import { shareChat } from '@/app/actions'
export interface ChatPanelProps {
  id?: string
  title?: string
  input: string
  setInput: (value: string) => void
  isAtBottom: boolean
  scrollToBottom: () => void
}

export function EmptyScreen({
  id,
  title,
  input,
  setInput,
  isAtBottom,
  scrollToBottom
}: ChatPanelProps) {
  const [aiState] = useAIState()
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)

  const exampleMessages = [
    {
      heading: 'What are the',
      subheading: 'trending memecoins today?',
      message: `What are the trending memecoins today?`
    },
    {
      heading: 'What is the price of',
      subheading: '$DOGE right now?',
      message: 'What is the price of $DOGE right now?'
    },
    {
      heading: 'I would like to buy',
      subheading: '42 $DOGE',
      message: `I would like to buy 42 $DOGE`
    },
    {
      heading: 'What are some',
      subheading: `recent events about $DOGE?`,
      message: `What are some recent events about $DOGE?`
    }
  ]

  return (
    <div className="mx-auto max-w-2xl px-4 bg-stone-800 text-white rounded-lg mb-1 ">
      <div className="items-center justify-center flex pt-2">
        <IconOpenAI className="h-9 w-9 text-green-500" />
      </div>
      <div className="flex flex-col gap-2 rounded-lg p-2 bg-stone-800">
        <h6 className="text-2xl text-center">Hi, how can I help you today?</h6>
        <p className="leading-normal text-muted-foreground text-white text-center">
          This Code will display a prompt asking the user for their name{' '}
          <ExternalLink href="https://nextjs.org">Next.js</ExternalLink>, and
          display a greeting message.
        </p>
      </div>

      {/* Chat Panel Logic Inside the Border */}
      <div className=" space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
        <div className="grid grid-cols-2 gap-2 px-6 sm:px-0 sm:max-w-md mx-auto">
          {messages.length === 0 &&
            exampleMessages.map((example, index) => (
              <div
                key={example.heading}
                className={`cursor-pointer rounded-lg border text-white p-4 hover:bg-zinc-800 bg-stone-800 ${
                  index > 1 && 'hidden md:block'
                }`}
                onClick={async () => {
                  setMessages(currentMessages => [
                    ...currentMessages,
                    {
                      id: nanoid(),
                      display: <UserMessage>{example.message}</UserMessage>
                    }
                  ])

                  const responseMessage = await submitUserMessage(
                    example.message
                  )

                  setMessages(currentMessages => [
                    ...currentMessages,
                    responseMessage
                  ])
                }}
              >
                <div className="items-center justify-center flex">
                  <IconMessage className="h-9 w-9 text-green-500" />
                </div>
                <div className="text-sm font-semibold text-center">
                  {example.heading}
                </div>
                <div className="text-sm text-white text-center">
                  {example.subheading}
                </div>
              </div>
            ))}
        </div>

        {messages?.length >= 2 ? (
          <div className="flex h-12 items-center justify-center">
            <div className="flex space-x-2">
              {id && title ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShareDialogOpen(true)}
                  >
                    <IconShare className="mr-2" />
                    Share
                  </Button>
                  <ChatShareDialog
                    open={shareDialogOpen}
                    onOpenChange={setShareDialogOpen}
                    onCopy={() => setShareDialogOpen(false)}
                    shareChat={shareChat}
                    chat={{
                      id,
                      title,
                      messages: aiState.messages
                    }}
                  />
                </>
              ) : null}
            </div>
          </div>
        ) : null}

        {/* <div>
          <PromptForm input={input} setInput={setInput} />
          <FooterText className="hidden sm:block" />
        </div> */}

        {/* <ButtonScrollToBottom
          isAtBottom={isAtBottom}
          scrollToBottom={scrollToBottom}
        /> */}
      </div>
    </div>
  )
}
