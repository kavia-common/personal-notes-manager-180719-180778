<template>
  <div class="p-4">
    <h2 class="text-base font-semibold mb-3">Categories</h2>

    <ul class="space-y-2">
      <li>
        <button
          class="cat-btn"
          :class="{ active: current === 'all' }"
          @click="set('all')"
          aria-label="Show all notes"
        >
          <span>All</span>
          <span class="count">{{ counts.all }}</span>
        </button>
      </li>
      <li v-for="cat in categories" :key="cat">
        <button
          class="cat-btn"
          :class="{ active: current === cat }"
          @click="set(cat)"
          :aria-label="`Filter by ${cat}`"
        >
          <span>{{ cat }}</span>
          <span class="count">{{ counts.byCat[cat] ?? 0 }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useNotesStore } from '~/stores/notes';

const store = useNotesStore();
const { categories, currentCategory } = storeToRefs(store);

const counts = computed(() => store.counts);
const current = computed(() => currentCategory.value);

function set(c: string) {
  store.setCategory(c);
}
</script>

<style scoped>
.space-y-2 > * + * { margin-top: 8px; }
.cat-btn {
  width: 100%;
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--ocean-border);
  background: var(--ocean-surface);
  color: var(--ocean-text);
  cursor: pointer;
  font-weight: 600;
}
.cat-btn:hover { border-color: var(--ocean-primary); color: var(--ocean-primary); }
.cat-btn.active {
  background: linear-gradient(135deg, rgba(37,99,235,0.12), rgba(255,255,255,1));
  border-color: var(--ocean-primary);
  color: var(--ocean-primary);
}
.count {
  background: var(--ocean-surface-2);
  border: 1px solid var(--ocean-border);
  border-radius: 8px;
  padding: 2px 8px;
  font-size: 12px;
}
</style>
