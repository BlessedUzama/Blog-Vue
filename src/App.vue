<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <div v-if="error" class="error-box">
      <h2>⚠️ Something went wrong</h2>
      <button @click="resetError">Try Again</button>
    </div>

    <Suspense v-else>
      <template #default>
        <RouterView :key="$route.fullPath" /> 
      </template>
      <template #fallback>
        <div class="loading">Loading content...</div>
      </template>
    </Suspense>
  </main>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'
import { useRouter, useRoute } from 'vue-router' // Import useRoute

const error = ref(null)
const router = useRouter()
const route = useRoute() // Access the current route

onErrorCaptured((err) => {
  error.value = err.message || "An unexpected error occurred."
  return false
})

const resetError = () => {
  error.value = null
  router.push('/')
}
</script>

<style scoped>
header {
  background: #333;
  padding: 1rem;
  margin-bottom: 2rem;
}
nav a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
}
/* ... keep your other styles ... */
</style>