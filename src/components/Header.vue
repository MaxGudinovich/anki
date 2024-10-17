<template>
  <div class="nav">
    <img src="/svg-gobbler.png" alt="logo" class="nav--logo" @click="handleNavToHome" />
    <RouterLink to="/" class="nav--link">Groups</RouterLink>
    <RouterLink to="/add" class="nav--link">Add</RouterLink>
    <RouterLink to="/account" class="nav--link nav--link-last">Account</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { jwtDecode } from 'jwt-decode'
import { Message } from '@/helpers/types'
import { useMessagesStore } from '@/stores/messages'
import { requestWithTokenValidation } from '@/helpers/requestWithTokenValidation'

const router = useRouter()
const messagesStore = useMessagesStore()

const getAccessToken = (): string | null => {
  return localStorage.getItem('access')
}

const longPolling = async () => {
  try {
    const response = await requestWithTokenValidation<[Message]>({
      method: 'get',
      url: `/messages`
    })
    const newMessages = response.data
    console.log(newMessages)
    messagesStore.setMessages(newMessages)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  const userStore = useUserStore()
  const token = getAccessToken()

  if (token) {
    const decodedToken: any = jwtDecode(token)
    const { id, username, role } = decodedToken
    userStore.setUser({ id, username, role })

    /* setInterval(longPolling, 5000) */
  }
})

const handleNavToHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  align-items: center;
  gap: 40px;
  background-color: var(--gray-200);
  padding: 10px 15%;
  height: 70px;
  border-bottom: 1px solid var(--gray-300);

  &--link {
    color: var(--gray-600);
    text-decoration: none;
    font-size: 20px;
    font-weight: 500;

    &-last {
      margin-left: auto;
    }

    &:hover {
      color: var(--gray-800);
    }
  }

  &--logo {
    cursor: pointer;
    width: 250px;
    height: 40px;
  }
}

.router-link-exact-active {
  color: var(--gray-800);
}
</style>
