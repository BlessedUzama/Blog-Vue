<template>
  <div class="home">
    <h1>Latest Blog Posts</h1>
    
    <div class="post-list">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <h3>{{ post.title }}</h3>
        <p>{{ post.excerpt }}</p>
        <RouterLink :to="{ name: 'post-detail', params: { id: post.id }}">
          Read Article →
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>

console.log("Attempting to fetch posts...");

const response = await fetch('https://api.oluwasetemi.dev/posts');

if (!response.ok) {
  
  throw new Error(`API Failed: ${response.status} ${response.statusText}`);
}

const data = await response.json();
console.log("Data received:", data);


const posts = Array.isArray(data) ? data : (data.data || []);
</script>

<style scoped>
.post-list {
  display: grid;
  gap: 20px;
}
.post-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  background: #f9f9f9;
}
.post-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
a {
  color: #42b883;
  text-decoration: none;
  font-weight: bold;
}
</style>