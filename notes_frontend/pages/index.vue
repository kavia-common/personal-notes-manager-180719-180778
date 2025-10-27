<template>
  <div class="grid grid-cols-1 gap-4">
    <section class="card p-4">
      <SearchBar
        :query="notesStore.searchQuery"
        @update:query="notesStore.setSearchQuery"
      />
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="card p-4 overflow-hidden">
        <header class="flex items-center justify-between mb-3">
          <h2 class="text-lg font-semibold">Notes</h2>
          <button
            class="btn btn-primary"
            @click="createNew"
            aria-label="Create note"
          >
            + New Note
          </button>
        </header>

        <NotesList
          :notes="filteredNotes"
          :activeId="activeId"
          @select="selectNote"
          @delete="deleteNote"
        />
      </div>

      <div class="card p-4">
        <NoteEditor
          :note="activeNote"
          :categories="notesStore.categories"
          @save="saveNote"
          @create="createFromEditor"
          @update="saveNote"
          @clear="clearSelection"
        />
      </div>
    </section>

    <EmptyState
      v-if="filteredNotes.length === 0 && !notesStore.searchQuery"
      title="No notes yet"
      description="Create your first note to get started."
      class="mt-4"
      :action-label="'Create note'"
      @action="createNew"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useNotesStore } from '~/stores/notes';

const notesStore = useNotesStore();
const { filteredNotes, activeId, activeNote } = storeToRefs(notesStore);

onMounted(() => {
  // Seed and load from localStorage handled in store's init()
  notesStore.init();
});

function selectNote(id: string) {
  notesStore.setActive(id);
}
function deleteNote(id: string) {
  notesStore.removeNote(id);
}
function saveNote(payload: { id?: string; title: string; content: string; category: string }) {
  if (payload.id) {
    notesStore.updateNote(payload.id, {
      title: payload.title,
      content: payload.content,
      category: payload.category,
    });
  } else {
    notesStore.addNote({
      title: payload.title,
      content: payload.content,
      category: payload.category,
    });
  }
}
function createFromEditor(payload: { title: string; content: string; category: string }) {
  notesStore.addNote(payload);
}
function createNew() {
  notesStore.clearActive();
}
function clearSelection() {
  notesStore.clearActive();
}
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid var(--ocean-border);
  background: var(--ocean-surface);
  color: var(--ocean-text);
  font-weight: 600;
  cursor: pointer;
}
.btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(37,99,235,0.12); }
.btn:active { transform: translateY(0); }

.btn-primary {
  background: var(--ocean-primary);
  border-color: transparent;
  color: white;
}
.btn-primary:hover { background: #1d4ed8; }
</style>
