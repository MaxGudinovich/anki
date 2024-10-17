import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Message } from '@/helpers/types'

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref([] as Message[])
  const setMessages = (newMessages: Message[]) => {
    messages.value = newMessages
  }
  return { messages, setMessages }
})
