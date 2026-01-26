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
      <p>{{ error }}</p>
      <button @click="resetError">Try Again</button>
    </div>

    <Suspense v-else>
      <template #default>
        <RouterView /> 
      </template>
      
      <template #fallback>
        <div class="loading">Loading content...</div>
      </template>
    </Suspense>
  </main>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'
import { useRouter } from 'vue-router'

const error = ref(null)
const router = useRouter()

// This hook catches errors from any component below App.vue
onErrorCaptured((err) => {
  error.value = err.message || "An unexpected error occurred."
  return false // Stop the error from crashing the whole app
})

const resetError = () => {
  error.value = null
  router.push('/') // Send them home on retry
}
</script>

<style scoped>
/* Simple styling to make it look decent */
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
.error-box {
  border: 2px solid red;
  padding: 20px;
  color: red;
  text-align: center;
}
.loading {
  font-size: 1.5rem;
  text-align: center;
  margin-top: 2rem;
  color: #666;
}
</style>