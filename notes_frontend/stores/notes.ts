import { defineStore } from 'pinia';

export type Note = {
  id: string;
  title: string;
  content: string;
  category: string;
  updatedAt: number;
};

type State = {
  notes: Note[];
  categories: string[];
  searchQuery: string;
  currentCategory: string; // 'all' or category name
  activeId: string | null;
  initialized: boolean;
};

const STORAGE_KEY = 'notes_manager.v1';

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function now() { return Date.now(); }

export const useNotesStore = defineStore('notes', {
  state: (): State => ({
    notes: [],
    categories: ['Personal', 'Work', 'Ideas', 'Archive'],
    searchQuery: '',
    currentCategory: 'all',
    activeId: null,
    initialized: false,
  }),
  getters: {
    activeNote(state): Note | null {
      return state.notes.find(n => n.id === state.activeId) ?? null;
    },
    filteredNotes(state): Note[] {
      const q = state.searchQuery.trim().toLowerCase();
      const cat = state.currentCategory;
      let list = state.notes.slice().sort((a, b) => b.updatedAt - a.updatedAt);
      if (cat !== 'all') {
        list = list.filter(n => n.category === cat);
      }
      if (q) {
        list = list.filter(n =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q)
        );
      }
      return list;
    },
    counts(state): { all: number; byCat: Record<string, number> } {
      const map: Record<string, number> = {};
      for (const c of state.categories) map[c] = 0;
      for (const n of state.notes) {
        map[n.category] = (map[n.category] ?? 0) + 1;
      }
      return { all: state.notes.length, byCat: map };
    },
  },
  actions: {
    // PUBLIC_INTERFACE
    init() {
      /** Initialize the store by loading from localStorage and seeding mock notes on first run. */
      if (this.initialized) return;
      if (process.client) {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (raw) {
            const data = JSON.parse(raw);
            this.notes = (data.notes ?? []).map((n: any) => ({ ...n }));
            this.categories = data.categories ?? this.categories;
          } else {
            // Seed mock notes
            this.notes = [
              {
                id: uid(),
                title: 'Welcome to Notes',
                content: 'Start by creating a new note. Use the sidebar to filter by category.',
                category: 'Personal',
                updatedAt: now(),
              },
              {
                id: uid(),
                title: 'Project Ideas',
                content: '- Build a Nuxt app\n- Explore Pinia\n- Add Markdown support later',
                category: 'Ideas',
                updatedAt: now() - 1000 * 60 * 60,
              },
            ];
          }
        } catch {
          // ignore corrupted storage
        }
        this.persist();
      }
      this.initialized = true;
    },
    // PUBLIC_INTERFACE
    setSearchQuery(q: string) {
      /** Update the search query to filter notes by title or content. */
      this.searchQuery = q;
    },
    // PUBLIC_INTERFACE
    setCategory(category: string) {
      /** Set the currently selected category filter. Use 'all' to show everything. */
      this.currentCategory = category;
    },
    // PUBLIC_INTERFACE
    setActive(id: string | null) {
      /** Set the active note id to view/edit. Use null to clear selection. */
      this.activeId = id;
    },
    // PUBLIC_INTERFACE
    clearActive() {
      /** Clear active note selection (used for creating a new note). */
      this.activeId = null;
    },
    // PUBLIC_INTERFACE
    addNote(payload: { title: string; content: string; category: string }) {
      /** Create a new note with the given data. */
      const note: Note = {
        id: uid(),
        title: payload.title,
        content: payload.content,
        category: payload.category,
        updatedAt: now(),
      };
      this.notes.unshift(note);
      this.activeId = note.id;
      this.persist();
    },
    // PUBLIC_INTERFACE
    updateNote(id: string, patch: { title?: string; content?: string; category?: string }) {
      /** Update an existing note by id with provided fields. */
      const idx = this.notes.findIndex(n => n.id === id);
      if (idx === -1) return;
      const current = this.notes[idx];
      const updated: Note = {
        ...current,
        ...patch,
        updatedAt: now(),
      };
      this.notes.splice(idx, 1, updated);
      this.activeId = updated.id;
      this.persist();
    },
    // PUBLIC_INTERFACE
    removeNote(id: string) {
      /** Delete a note by id. */
      this.notes = this.notes.filter(n => n.id !== id);
      if (this.activeId === id) this.activeId = null;
      this.persist();
    },
    persist() {
      // Internal helper to save to localStorage when client-side.
      if (!process.client) return;
      try {
        const data = {
          notes: this.notes,
          categories: this.categories,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {
        // ignore quota errors
      }
    },
  },
});
