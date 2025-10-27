<template>
  <div class="search">
    <div class="left">
      <input
        type="search"
        class="input"
        :value="query"
        @input="$emit('update:query', ($event.target as HTMLInputElement).value)"
        placeholder="Search notes by title or content…"
        aria-label="Search notes"
      />
    </div>
    <div class="right">
      <span class="hint">Tip: Use keywords to filter results.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ query: string }>();
defineEmits<{ (e: 'update:query', value: string): void }>();
</script>

<style scoped>
.search {
  display: flex; gap: 12px; align-items: center; justify-content: space-between;
}
.left { flex: 1; }
.right { color: #6b7280; }
.input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--ocean-border);
  background: var(--ocean-surface);
  color: var(--ocean-text);
}
.input:focus { outline: none; border-color: var(--ocean-primary); box-shadow: 0 0 0 3px rgba(37,99,235,0.18); }
.hint { font-size: 12px; }
</style>
