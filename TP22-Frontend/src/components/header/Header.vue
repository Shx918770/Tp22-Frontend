<template>
  <div class="header">
    <!-- Header Navigation -->
    <nav class="nav-bar">
      <div class="nav-container" ref="navContainer">
        <!-- first line logo + suburb -->
        <div class="nav-top">
          <router-link to="/" class="logo">
            <!-- <div class="logo-icon">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="8" fill="#4CAF50"/>
                <path d="M20 8C13.37 8 8 13.37 8 20C8 26.63 13.37 32 20 32C26.63 32 32 26.63 32 20C32 13.37 26.63 8 20 8ZM20 30C14.48 30 10 25.52 10 20C10 14.48 14.48 10 20 10C25.52 10 30 14.48 30 20C30 25.52 25.52 30 20 30Z" fill="white"/>
                <path d="M20 12C15.58 12 12 15.58 12 20C12 24.42 15.58 28 20 28C24.42 28 28 24.42 28 20C28 15.58 24.42 12 20 12ZM20 26C16.69 26 14 23.31 14 20C14 16.69 16.69 14 20 14C23.31 14 26 16.69 26 20C26 23.31 23.31 26 20 26Z" fill="white"/>
                <path d="M20 16C17.79 16 16 17.79 16 20C16 22.21 17.79 24 20 24C22.21 24 24 22.21 24 20C24 17.79 22.21 16 20 16Z" fill="white"/>
              </svg>
            </div> -->
            <span class="logo-text">MelSustain</span>
          </router-link>
          <div v-if="selectedSuburb" class="suburb-selector" @click="toggleSuburbMenu">
            <span class="suburb-display">
              <span class="pin">📍</span>{{ selectedSuburb }}
              <span class="dropdown-icon" :class="{ open: isSuburbMenuOpen }">▼</span>
            </span>
            <transition name="fade-slide">
              <div v-if="isSuburbMenuOpen" class="suburb-dropdown" @click.stop>
                <div class="suburb-search">
                  <input 
                    type="text" 
                    v-model="suburbSearchQuery" 
                    placeholder="Search suburbs..."
                    class="search-input"
                    @click.stop
                  />
                </div>
                <div class="suburb-list">
                  <div 
                    v-for="suburb in filteredSuburbs" 
                    :key="suburb"
                    class="suburb-item"
                    :class="{ active: suburb === selectedSuburb }"
                    @click="selectSuburb(suburb)"
                  >
                    <span class="suburb-name">{{ suburb }}</span>
                    <span v-if="suburb === selectedSuburb" class="check-icon">✓</span>
                  </div>
                  <div v-if="filteredSuburbs.length === 0" class="no-results">
                    No suburbs found
                  </div>
                </div>
              </div>
            </transition>
          </div>
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
      isSuburbMenuOpen: false,
      suburbSearchQuery: '',
      allTabs: [
        { label: "Social", path: "/social" },
        { label: "Infrastructure", path: "/infrastructure" },
        { label: "Environment", path: "/environment" },
        { label: "Compare", path: "/compare" }
        // { label: "Economic", path: "/economic" },
        // { label: "AI Chat", path: "/aichatbox" },
        // { label: "News", path: "/news" },  
      ],
      availableSuburbs: [
        "Carlton",
        "Docklands",
        "East Melbourne",
        "Kensington",
        "Melbourne",
        "North Melbourne",
        "Parkville",
        "South Bank",
        "South Yarra",
        "West Melbourne"
      ],
      visibleTabs: [],
      hiddenTabs: []
    }
  },
  mounted() {
    this.updateTabs();
    window.addEventListener("resize", this.updateTabs);
    document.addEventListener("click", this.handleClickOutside);

    this.$nextTick(() => {
      const navHeight = this.$el.querySelector(".nav-bar").offsetHeight;
      document.documentElement.style.setProperty("--nav-height", navHeight + "px");
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateTabs);
    document.removeEventListener("click", this.handleClickOutside);
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
    },
    toggleSuburbMenu() {
      this.isSuburbMenuOpen = !this.isSuburbMenuOpen;
      if (this.isSuburbMenuOpen) {
        this.suburbSearchQuery = '';
      }
    },
    handleClickOutside(event) {
      const suburbSelector = this.$el.querySelector('.suburb-selector');
      if (suburbSelector && !suburbSelector.contains(event.target)) {
        this.isSuburbMenuOpen = false;
      }
    },
    selectSuburb(suburb) {
      this.isSuburbMenuOpen = false;
      this.suburbSearchQuery = '';
      
      // Update route with new suburb
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          suburb: suburb
        }
      }).then(()=>{
        window.location.reload();
      });
    }
  },
  computed: {
    selectedSuburb() {
      return this.$route?.query?.suburb || '';
    },
    filteredSuburbs() {
      if (!this.suburbSearchQuery) {
        return this.availableSuburbs;
      }
      const query = this.suburbSearchQuery.toLowerCase();
      return this.availableSuburbs.filter(suburb => 
        suburb.toLowerCase().includes(query)
      );
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
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
  color: #4CAF50;
}

.logo-icon {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.suburb-selector {
  position: relative;
  margin-left: 0.8rem;
  cursor: pointer;
  user-select: none;
}

.suburb-display {
  font-size: 1.25rem;
  font-weight: 800;
  background: linear-gradient(135deg, #2c3e50, #4CAF50, #2196F3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.2px;
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
}

.suburb-display::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.suburb-selector:hover .suburb-display::before {
  opacity: 1;
}

.suburb-display .pin {
  margin-right: 0.4rem;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15));
  font-size: 1.1rem;
}

.dropdown-icon {
  margin-left: 0.5rem;
  font-size: 0.75rem;
  color: #4CAF50;
  transition: transform 0.3s ease;
}

.dropdown-icon.open {
  transform: rotate(180deg);
}

/* Suburb Dropdown Menu */
.suburb-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  min-width: 280px;
  max-width: 320px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.08);
  z-index: 3000;
  overflow: hidden;
}

.suburb-search {
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  background: #f8f9fa;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  outline: none;
}

.search-input:focus {
  border-color: #4CAF50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.suburb-list {
  max-height: 320px;
  overflow-y: auto;
  padding: 0.5rem;
}

.suburb-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 0.25rem;
}

.suburb-item:hover {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(33, 150, 243, 0.05));
  transform: translateX(4px);
}

.suburb-item.active {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  font-weight: 600;
}

.suburb-name {
  font-size: 1rem;
  font-weight: 500;
}

.check-icon {
  font-size: 1.1rem;
  font-weight: bold;
}

.no-results {
  padding: 2rem 1rem;
  text-align: center;
  color: #999;
  font-size: 0.95rem;
}

/* Scrollbar styling */
.suburb-list::-webkit-scrollbar {
  width: 6px;
}

.suburb-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.suburb-list::-webkit-scrollbar-thumb {
  background: #4CAF50;
  border-radius: 10px;
}

.suburb-list::-webkit-scrollbar-thumb:hover {
  background: #45a049;
}
</style>
