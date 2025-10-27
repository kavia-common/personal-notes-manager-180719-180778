<template>
  <nav class="navbar" role="navigation" aria-label="Top Navigation Bar">
    <div class="navbar-inner">
      <div class="brand">
        <div class="logo" aria-hidden="true">🗒️</div>
        <span class="brand-name">Notes</span>
      </div>
      <div class="actions">
        <a href="https://nuxt.com" target="_blank" rel="noreferrer" class="link">Nuxt</a>
        <a href="https://pinia.vuejs.org" target="_blank" rel="noreferrer" class="link">Pinia</a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
.navbar {
  grid-area: nav;
  position: sticky;
  top: 0;
  background:
    linear-gradient(180deg, rgba(37,99,235,0.06), rgba(255,255,255,0.9)),
    var(--ocean-surface);
  border-bottom: 1px solid var(--ocean-border);
  backdrop-filter: saturate(180%) blur(8px);
  z-index: 40;
}
.navbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  height: 64px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 16px;
}

.brand { display: flex; align-items: center; gap: 10px; }
.logo {
  width: 36px; height: 36px; border-radius: 10px;
  display: grid; place-items: center;
  background: linear-gradient(135deg, rgba(37,99,235,0.18), rgba(245,158,11,0.18));
  box-shadow: inset 0 0 0 1px rgba(17,24,39,0.06);
}
.brand-name { font-weight: 800; color: var(--ocean-text); }

.actions { display: flex; gap: 12px; }
.link {
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid var(--ocean-border);
  background: var(--ocean-surface);
  color: var(--ocean-text);
  text-decoration: none;
  font-weight: 600;
}
.link:hover {
  border-color: var(--ocean-primary);
  color: var(--ocean-primary);
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(37,99,235,0.12);
}
</style>
