'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Send } from 'lucide-react'

export function MessagingWidget() {
  const [message, setMessage] = useState('')

  const messages = [
    {
      id: 1,
      content: 'Hello! How can I help you today?',
      sender: 'bot',
      timestamp: '10:00 AM',
    },
    {
      id: 2,
      content: 'I have a question about my upcoming appointment',
      sender: 'user',
      timestamp: '10:01 AM',
    },
    {
      id: 3,
      content:
        'Of course! I can help you with that. What would you like to know?',
      sender: 'bot',
      timestamp: '10:01 AM',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Assistant</CardTitle>
        <CardDescription>Get quick answers to your questions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <Avatar className='h-8 w-8'>
                <AvatarImage
                  src={
                    msg.sender === 'bot'
                      ? '/bot-avatar.png'
                      : '/user-avatar.png'
                  }
                  alt={msg.sender}
                />
                <AvatarFallback>
                  {msg.sender === 'bot' ? 'AI' : 'ME'}
                </AvatarFallback>
              </Avatar>
              <div
                className={`rounded-lg px-4 py-2 ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className='text-sm'>{msg.content}</p>
                <span className='text-muted-foreground mt-1 text-xs'>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setMessage('')
          }}
          className='flex w-full items-center gap-2'
        >
          <Input
            placeholder='Type your message...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='flex-1'
          />
          <Button type='submit' size='icon'>
            <Send className='h-4 w-4' />
            <span className='sr-only'>Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
