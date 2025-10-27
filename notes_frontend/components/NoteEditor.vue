<template>
  <div>
    <header class="flex items-center justify-between mb-3">
      <h2 class="text-lg font-semibold">{{ note ? 'Edit Note' : 'Create Note' }}</h2>
      <button class="btn subtle" @click="$emit('clear')" aria-label="Clear editor">Clear</button>
    </header>

    <form @submit.prevent="onSubmit" class="grid gap-3">
      <label class="field">
        <span class="label">Title</span>
        <input
          v-model="local.title"
          type="text"
          placeholder="Note title"
          class="input"
          required
        />
      </label>

      <label class="field">
        <span class="label">Category</span>
        <select v-model="local.category" class="input" required>
          <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
        </select>
      </label>

      <label class="field">
        <span class="label">Content</span>
        <textarea
          v-model="local.content"
          class="input"
          rows="10"
          placeholder="Write in plain text or Markdown…"
        />
      </label>

      <div class="flex gap-2 mt-2">
        <button type="submit" class="btn primary">
          {{ note ? 'Save Changes' : 'Create Note' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, toRefs } from 'vue';
import type { Note } from '~/stores/notes';

const props = defineProps<{
  note: Note | null | undefined;
  categories: string[];
}>();

const emit = defineEmits<{
  (e: 'create', payload: { title: string; content: string; category: string }): void
  (e: 'update', payload: { id: string; title: string; content: string; category: string }): void
  (e: 'save', payload: { id?: string; title: string; content: string; category: string }): void
  (e: 'clear'): void
}>();

const local = reactive({
  id: '',
  title: '',
  content: '',
  category: props.categories?.[0] || 'Personal',
});

watch(() => props.note, (n) => {
  if (n) {
    local.id = n.id;
    local.title = n.title;
    local.content = n.content;
    local.category = n.category;
  } else {
    local.id = '';
    local.title = '';
    local.content = '';
    local.category = props.categories?.[0] || 'Personal';
  }
}, { immediate: true });

function onSubmit() {
  const payload = {
    title: local.title.trim(),
    content: local.content,
    category: local.category,
  };
  if (local.id) {
    emit('save', { id: local.id, ...payload });
  } else {
    emit('save', payload);
  }
}
</script>

<style scoped>
.field { display: grid; gap: 6px; }
.label { font-weight: 600; color: #374151; }
.input {
  background: var(--ocean-surface);
  border: 1px solid var(--ocean-border);
  border-radius: 10px;
  padding: 10px 12px;
  color: var(--ocean-text);
}
.input:focus { outline: none; box-shadow: 0 0 0 3px rgba(37,99,235,0.18); border-color: var(--ocean-primary); }
textarea.input { resize: vertical; }

.btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 10px 16px; border-radius: 10px; border: 1px solid var(--ocean-border);
  font-weight: 700; cursor: pointer; background: var(--ocean-surface); color: var(--ocean-text);
}
.btn.primary { background: var(--ocean-primary); border-color: transparent; color: white; }
.btn.primary:hover { background: #1d4ed8; transform: translateY(-1px); box-shadow: 0 10px 24px rgba(37,99,235,0.22); }
.btn.subtle:hover { border-color: var(--ocean-primary); color: var(--ocean-primary); }
</style>
