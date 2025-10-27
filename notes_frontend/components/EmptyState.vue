<template>
  <div class="empty card">
    <div class="icon" aria-hidden="true">🌊</div>
    <h3 class="title">{{ title }}</h3>
    <p class="desc">{{ description }}</p>
    <button v-if="actionLabel" class="btn" @click="$emit('action')">{{ actionLabel }}</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  actionLabel?: string;
}>();

defineEmits<{ (e: 'action'): void }>();
</script>

<style scoped>
.empty {
  padding: 24px;
  text-align: center;
  border-radius: 12px;
}
.icon { font-size: 28px; margin-bottom: 8px; }
.title { font-weight: 800; margin-bottom: 4px; }
.desc { color: #6b7280; margin-bottom: 12px; }
.btn {
  padding: 8px 12px; border-radius: 10px; border: 1px solid var(--ocean-border); cursor: pointer; font-weight: 700;
  background: var(--ocean-secondary); color: #111827; border-color: rgba(0,0,0,0);
}
.btn:hover { filter: brightness(0.95); transform: translateY(-1px); }
</style>
