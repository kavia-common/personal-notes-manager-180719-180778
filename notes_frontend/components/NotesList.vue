<template>
  <div>
    <ul v-if="notes.length" class="list">
      <li
        v-for="n in notes"
        :key="n.id"
        class="row"
        :class="{ active: n.id === activeId }"
        @click="emit('select', n.id)"
        role="button"
        :aria-label="`Open note ${n.title || 'Untitled'}`"
        tabindex="0"
        @keyup.enter="emit('select', n.id)"
      >
        <div class="title">
          <span class="pill">{{ n.category }}</span>
          <span class="name">{{ n.title || 'Untitled' }}</span>
        </div>
        <div class="meta">
          <time :datetime="n.updatedAt.toString()">
            {{ new Date(n.updatedAt).toLocaleString() }}
          </time>
          <button class="icon danger" @click.stop="emit('delete', n.id)" aria-label="Delete note">
            ✕
          </button>
        </div>
        <p class="excerpt">
          {{ n.content?.slice(0, 140) || 'No content yet...' }}
        </p>
      </li>
    </ul>
    <div v-else class="empty">No notes match your filters.</div>
  </div>
</template>

<script setup lang="ts">
import type { Note } from '~/stores/notes';

defineProps<{
  notes: Note[];
  activeId?: string | null;
}>();

const emit = defineEmits<{
  (e: 'select', id: string): void
  (e: 'delete', id: string): void
}>();
</script>

<style scoped>
.list { display: flex; flex-direction: column; gap: 10px; }
.row {
  border: 1px solid var(--ocean-border);
  border-radius: 12px;
  padding: 12px;
  background: var(--ocean-surface);
  cursor: pointer;
}
.row:hover { transform: translateY(-1px); box-shadow: 0 10px 24px rgba(17,24,39,0.08); }
.row.active { border-color: var(--ocean-primary); box-shadow: 0 0 0 3px rgba(37,99,235,0.18); }

.title { display: flex; align-items: center; gap: 10px; }
.pill {
  font-size: 12px; padding: 2px 8px; border-radius: 999px;
  background: rgba(245,158,11,0.12); color: #B45309;
  border: 1px solid rgba(245,158,11,0.3);
}
.name { font-weight: 700; }

.meta { display: flex; align-items: center; gap: 10px; color: #6b7280; float: right; }
.excerpt { margin-top: 8px; color: #374151; }

.icon {
  border: 1px solid var(--ocean-border);
  background: var(--ocean-surface);
  border-radius: 8px;
  height: 28px; width: 28px; display: grid; place-items: center;
  cursor: pointer;
}
.icon:hover { border-color: var(--ocean-primary); color: var(--ocean-primary); }
.icon.danger:hover { border-color: var(--ocean-error); color: var(--ocean-error); }

.empty {
  padding: 12px;
  border: 1px dashed var(--ocean-border);
  border-radius: 12px;
  text-align: center;
  color: #6b7280;
}
</style>
