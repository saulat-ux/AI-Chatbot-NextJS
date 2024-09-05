'use client'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useEffect, useState } from 'react'
import { useUIState, useAIState } from 'ai/rsc'
import { Message, Session } from '@/lib/types'
import { usePathname, useRouter } from 'next/navigation'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import { toast } from 'sonner'
import { PromptForm } from './prompt-form'
import { FooterText } from './footer'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  session?: Session
  missingKeys: string[]
}

export function Chat({ id, className, session, missingKeys }: ChatProps) {
  const router = useRouter()
  const path = usePathname()
  const [input, setInput] = useState('')
  const [messages] = useUIState()
  const [aiState] = useAIState()

  const [_, setNewChatId] = useLocalStorage('newChatId', id)

  useEffect(() => {
    if (session?.user) {
      if (!path.includes('chat') && messages.length === 1) {
        window.history.replaceState({}, '', `/chat/${id}`)
      }
    }
  }, [id, path, session?.user, messages])

  useEffect(() => {
    const messagesLength = aiState.messages?.length
    if (messagesLength === 2) {
      router.refresh()
    }
  }, [aiState.messages, router])

  useEffect(() => {
    setNewChatId(id)
  })

  useEffect(() => {
    missingKeys.map(key => {
      toast.error(`Missing ${key} environment variable!`)
    })
  }, [missingKeys])

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()

  return (
    <div
      className="group w-full h-screen flex justify-center items-center overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      ref={scrollRef}
    >
      {/* Content container with padding */}
      <div
        className={cn('w-full pt-[100px] md:pt-2', className)}
        ref={messagesRef}
      >
        {messages.length ? (
          <ChatList messages={messages} isShared={false} session={session} />
        ) : (
          <div className="flex justify-center items-center h-full">
            <EmptyScreen
              id={id}
              input={input}
              setInput={setInput}
              isAtBottom={isAtBottom}
              scrollToBottom={scrollToBottom}
            />
          </div>
        )}
        <div className="w-full h-px" ref={visibilityRef} />
        {/* <ChatPanel
          id={id}
          input={input}
          setInput={setInput}
          isAtBottom={isAtBottom}
          scrollToBottom={scrollToBottom}
        /> */}

        <div className="mx-auto w-full sm:max-w-2xl ">
          <PromptForm input={input} setInput={setInput} />
        </div>
        {/* <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <FooterText className="hidden sm:block" />
        </div> */}
        {/* <footer className="w-full border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <FooterText className="hidden sm:block" />
        </footer> */}
      </div>
    </div>
  )
}
