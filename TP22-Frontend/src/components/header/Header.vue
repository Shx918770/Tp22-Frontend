<template>
  <div class="header">
    <!-- Header Navigation -->
    <nav class="nav-bar">
      <div class="nav-container" ref="navContainer">
        <!-- first line logo + suburb -->
        <div class="nav-top">
          <div class="logo">
            <!-- <div class="logo-icon">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="8" fill="#4CAF50"/>
                <path d="M20 8C13.37 8 8 13.37 8 20C8 26.63 13.37 32 20 32C26.63 32 32 26.63 32 20C32 13.37 26.63 8 20 8ZM20 30C14.48 30 10 25.52 10 20C10 14.48 14.48 10 20 10C25.52 10 30 14.48 30 20C30 25.52 25.52 30 20 30Z" fill="white"/>
                <path d="M20 12C15.58 12 12 15.58 12 20C12 24.42 15.58 28 20 28C24.42 28 28 24.42 28 20C28 15.58 24.42 12 20 12ZM20 26C16.69 26 14 23.31 14 20C14 16.69 16.69 14 20 14C23.31 14 26 16.69 26 20C26 23.31 23.31 26 20 26Z" fill="white"/>
                <path d="M20 16C17.79 16 16 17.79 16 20C16 22.21 17.79 24 20 24C22.21 24 24 22.21 24 20C24 17.79 22.21 16 20 16Z" fill="white"/>
              </svg>
            </div> -->
            <span class="logo-text">MelSustain</span>
          </div>
          <span v-if="selectedSuburb" class="suburb-display">
            <span class="pin"></span>{{ selectedSuburb }}
          </span>
        </div>
        
        <!-- second line Navigation -->
        <div class="nav-bottom">
          <div class="nav-tabs" ref="navTabs">
            <template v-for="tab in visibleTabs" :key="tab.label">
              <router-link
                v-if="tab.path.startsWith('/')"
                :to="{ path: tab.path, query: $route.query }"
                class="nav-tab"
                :class="{ active: $route.path === tab.path || ($route.hash && tab.path.includes($route.hash)) }"
              >
                {{ tab.label }}
              </router-link>
              <div v-else class="nav-tab">{{ tab.label }}</div>
            </template>
          </div>

          <!-- Menu list, only show when some navigation hide -->
          <div v-if="hiddenTabs.length" class="more-menu">
            <button class="menu-toggle" @click="isMenuOpen = !isMenuOpen">&#9776;</button>
            <transition name="fade-slide">
              <div v-if="isMenuOpen" class="dropdown">
                <div v-for="tab in hiddenTabs" :key="tab.label" class="nav-tab" @click="goTo(tab)">
                  {{ tab.label }}
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isMenuOpen: false,
      allTabs: [
        { label: "HomePage", path: "/" },
        { label: "Social", path: "/social" },
        // { label: "Economic", path: "/economic" },
        // { label: "AI Chat", path: "/aichatbox" },
        { label: "Infrastructure", path: "/infrastructure" },
        { label: "Environment", path: "/environment" },
        // { label: "News", path: "/news" },  
        // { label: "Compare", path: "/#compare-section" }
      ],
      visibleTabs: [],
      hiddenTabs: []
    }
  },
  mounted() {
    this.updateTabs();
    window.addEventListener("resize", this.updateTabs);

    this.$nextTick(() => {
      const navHeight = this.$el.querySelector(".nav-bar").offsetHeight;
      document.documentElement.style.setProperty("--nav-height", navHeight + "px");
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateTabs);
  },
  methods: {
    updateTabs() {
      const containerWidth = this.$refs.navContainer?.offsetWidth || 0;

      let totalWidth = 0;
      this.visibleTabs = [];
      this.hiddenTabs = [];

      const leftWidth = this.$el.querySelector(".nav-top")?.offsetWidth || 0;
      const moreMenuWidth = 60;
      const containerPadding = 32 * 2;

      const availableWidth = Math.max(
        0,
        containerWidth - leftWidth - moreMenuWidth - containerPadding
      );

      const hiddenMeasure = document.createElement("div");
      hiddenMeasure.style.visibility = "hidden";
      hiddenMeasure.style.position = "absolute";
      hiddenMeasure.style.whiteSpace = "nowrap";
      document.body.appendChild(hiddenMeasure);

      this.allTabs.forEach((tab) => {
        const tabEl = document.createElement("span");
        tabEl.className = "nav-tab";
        tabEl.innerText = tab.label;
        hiddenMeasure.appendChild(tabEl);

        const tabWidth = tabEl.offsetWidth + 24;

        if (totalWidth + tabWidth <= availableWidth) {
          this.visibleTabs.push(tab);
          totalWidth += tabWidth;
        } else {
          this.hiddenTabs.push(tab);
        }
      });

      document.body.removeChild(hiddenMeasure);
    },
    goTo(tab) {
      this.$router.push(tab.path);
      this.isMenuOpen = false;
    }
  },
  computed: {
    selectedSuburb() {
      return this.$route?.query?.suburb || '';
    }
  }
}
</script>

<style scoped>
/* fixed on top */
/* Navigation Bar */
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95));
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 30px rgba(0,0,0,0.1);
}

.nav-container {
  width: 80%;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

@media (max-width: 768px){
  .nav-container{
    width: 95%;
    padding: 0.75rem 1rem;
  }
}
/* first line */
.nav-top {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 0 0 auto;
}

/* second line */
.nav-bottom {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1 1 auto;
  width: 100%;
}

.nav-tabs {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: .25rem;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  flex: 0 1 auto;
}

.nav-tab {
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-weight: 500;
  color: #444;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.nav-tab.active {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.nav-tab:hover:not(.active) {
  background: rgba(255, 255, 255, 0.5);
  color: #333;
}

/* Menu list + pull down */
.more-menu {
  position: relative;
  transform: none;
  right: auto;
  top: auto;
  margin-left: .5rem;
}

.menu-toggle {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}

.dropdown {
  position: absolute;
  right: 0;
  top: 2.2rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  z-index: 2000;
}

/* cartoon */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
}

.logo-icon {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.suburb-display {
  margin-left: 0.8rem;
  font-size: 1.25rem;
  font-weight: 800;
  background: linear-gradient(135deg, #2c3e50, #4CAF50, #2196F3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.2px;
  display: inline-flex;
  align-items: center;
}

.suburb-display .pin {
  margin-right: 0.4rem;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15));
}
</style>
