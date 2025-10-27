<template>
  <div class="min-h-screen bg-ocean-bg text-ocean-text">
    <Head>
      <Title>Personal Notes Manager</Title>
      <Meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta name="description" content="A simple app to create, update, and manage personal notes." />
    </Head>

    <div class="app-grid">
      <NavBar />
      <aside class="sidebar">
        <SidebarCategories />
      </aside>
      <main class="content">
        <NuxtPage />
      </main>
    </div>

    <NuxtRouteAnnouncer />
  </div>
</template>

<script setup lang="ts">
// Root app only wires the shell; content lives in pages/index.vue.
// Using Pinia via definePinia in nuxt.config for store injection (auto-imported).
</script>

<style>
/* Ocean Professional palette */
:root {
  --ocean-primary: #2563EB;
  --ocean-secondary: #F59E0B;
  --ocean-error: #EF4444;
  --ocean-bg: #f9fafb;
  --ocean-surface: #ffffff;
  --ocean-text: #111827;
  --ocean-surface-2: #f3f4f6;
  --ocean-border: #e5e7eb;
}

.bg-ocean-bg { background-color: var(--ocean-bg); }
.text-ocean-text { color: var(--ocean-text); }

.app-grid {
  display: grid;
  grid-template-areas:
    "nav nav"
    "sidebar content";
  grid-template-columns: 280px 1fr;
  grid-template-rows: 64px 1fr;
  min-height: 100vh;
}

@media (max-width: 1024px) {
  .app-grid {
    grid-template-areas:
      "nav"
      "content";
    grid-template-columns: 1fr;
    grid-template-rows: 64px 1fr;
  }
  .sidebar {
    display: none;
  }
}

.sidebar {
  grid-area: sidebar;
  background: var(--ocean-surface);
  border-right: 1px solid var(--ocean-border);
}

.content {
  grid-area: content;
  padding: 16px;
  background:
    linear-gradient(135deg, rgba(59,130,246,0.08), rgba(249,250,251,1));
  min-width: 0;
}

/* Subtle card styling utility */
.card {
  background: var(--ocean-surface);
  border: 1px solid var(--ocean-border);
  border-radius: 12px;
  box-shadow:
    0 1px 2px rgba(17,24,39,0.04),
    0 4px 10px rgba(37,99,235,0.06);
}

/* Focus ring for accessibility */
:focus-visible {
  outline: 2px solid var(--ocean-primary);
  outline-offset: 2px;
}

/* Smooth interactions */
* {
  transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease, box-shadow 120ms ease, transform 120ms ease;
}
</style>
