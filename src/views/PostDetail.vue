<template>
  <div class="container">
    
    <div v-if="loading">Loading...</div>

    <div v-else-if="error" class="error-state">
      <h1>Post Not Found</h1>
      <p>We couldn't find the post you were looking for.</p>
      <button @click="$router.push('/')">Go Home</button>
    </div>

    <div v-else class="post-detail">
      <button @click="$router.push('/')" class="back-btn">← Back to Home</button>
      <h1>{{ post.title }}</h1>
      <p class="meta">Posted on: {{ new Date(post.date).toLocaleDateString() }}</p>
      <div class="content">{{ post.content || post.body }}</div>
    </div>

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const postId = route.params.id


const post = ref(null)
const error = ref(false)
const loading = ref(true)


try {
  const response = await fetch(`https://api.oluwasetemi.dev/posts/${postId}`)
  
  if (!response.ok) {
    
    error.value = true
  } else {
    post.value = await response.json()
  }
} catch (err) {
  error.value = true
} finally {
  loading.value = false
}
</script>

<style scoped>
.container { max-width: 800px; margin: 0 auto; padding: 20px; }
.back-btn { margin-bottom: 20px; padding: 8px 16px; cursor: pointer; }
.error-state { text-align: center; color: red; margin-top: 50px; }
</style>