<template>
  <div class="compare-page">
    <!-- Sustainable background -->
    <div class="eco-background">
      <div class="leaves-container">
        <div class="leaf leaf-1"></div>
        <div class="leaf leaf-2"></div>
        <div class="leaf leaf-3"></div>
      </div>
    </div>

    <!-- Return button -->
    <button class="back-btn" @click="$router.push('/')">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      Back to Home
    </button>

    <main class="main-content">
      <!-- Hero Section -->
      <section class="compare-hero">
        <h1 class="page-title">
          <span class="title-main">Compare Suburbs</span>
          <span class="title-sub">Side-by-Side</span>
        </h1>
        <p class="page-description">
          Make confident housing decisions by comparing sustainability metrics between different Melbourne suburbs.
        </p>
      </section>

      <!-- Selection Section -->
      <section class="compare-section">
        <div class="compare-container">
          <!-- First Suburb -->
          <div class="suburb-column">
            <label class="suburb-label">First Suburb</label>
            <div class="select-wrapper">
              <select v-model="firstSuburb" class="suburb-select first-select">
                <option disabled value="">Select suburb...</option>
                <option v-for="s in availableFirstSuburbs" :key="s" :value="s">{{ s }}</option>
              </select>
              <div class="select-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- VS Badge -->
          <div class="vs-badge">
            <span class="vs-text">VS</span>
          </div>

          <!-- Second Suburb -->
          <div class="suburb-column">
            <label class="suburb-label">Second Suburb</label>
            <div class="select-wrapper">
              <select v-model="secondSuburb" class="suburb-select second-select">
                <option disabled value="">Select suburb...</option>
                <option v-for="s in availableSecondSuburbs" :key="s" :value="s">{{ s }}</option>
              </select>
              <div class="select-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Compare Button -->
        <div class="button-container">
          <button 
            class="compare-btn" 
            :disabled="!firstSuburb || !secondSuburb || firstSuburb === secondSuburb" 
            @click="handleCompareClick"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              <path d="M9 12h6m-6 4h6"/>
            </svg>
            <span>Compare Suburbs</span>
          </button>
        </div>
      </section>

      <!-- Results Section - Two Column Comparison -->
      <section v-if="result && firstSuburb && secondSuburb && firstSuburb !== secondSuburb" class="result-section">
        <!-- Tip -->
        <div class="tip-wrap">
          <div class="tip-info">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4M12 8h.01" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>Click on suburb names to view detailed social insights</span>
          </div>
        </div>

        <!-- Comparison Table -->
        <div class="comparison-table">
          <!-- Header Row -->
          <div class="table-header">
            <div class="header-cell metric-label-header">
              <span class="metric-title">METRICS</span>
            </div>
            <div class="header-cell suburb-column first-column" @click="goToSocial(firstSuburb)">
              <div class="suburb-header-badge first-badge suburb-chip">
                <span class="chip-dot"></span>
                <span class="chip-text">{{ firstSuburb }}</span>
              </div>
            </div>
            <div class="header-cell suburb-column second-column" @click="goToSocial(secondSuburb)">
              <div class="suburb-header-badge second-badge suburb-chip">
                <span class="chip-dot"></span>
                <span class="chip-text">{{ secondSuburb }}</span>
              </div>
            </div>
          </div>

          <!-- Main Metrics Rows -->
          <div 
            v-for="(metric, index) in metrics"
            :key="'main-' + index"
            class="table-row main-row compact-main"
            :class="'row-' + metric.key"
          >
            <div class="row-cell metric-label-cell">
              <div class="metric-line" :class="'ml-' + metric.key">
                <span class="metric-dot"></span>
                <span class="metric-name">{{ metric.label }}</span>
              </div>
            </div>
            <div class="row-cell value-cell first-value">
              <div class="score-plate first" :class="{ win: isHigher(firstSuburb, secondSuburb, metric.key) }">
                <div class="score-main">
                  <span class="score-number">{{ formatScore(result[firstSuburb][metric.key]) }}</span>
                  <span class="score-unit">/100</span>
                </div>
              </div>
            </div>
            <div class="row-cell value-cell second-value">
              <div class="score-plate second" :class="{ win: isHigher(secondSuburb, firstSuburb, metric.key) }">
                <div class="score-main">
                  <span class="score-number">{{ formatScore(result[secondSuburb][metric.key]) }}</span>
                  <span class="score-unit">/100</span>
                </div>
              </div>
            </div>
          </div>

          
        </div>
        
        <!-- Details Section (separate, narrower) -->
        <div class="details-section">
          <div class="details-toggle">
            <button class="details-toggle-btn show-more-pill" @click="toggleDetails">
              <span class="pill-text">{{ showDetails ? 'Hide Details' : 'Show More Details' }}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" :class="{ 'rotate': showDetails }">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
          </div>

          <transition name="expand-rows">
            <div v-if="showDetails" class="details-content-wrapper">
              <div class="detail-rows">
                <div 
                  v-for="(metric, index) in detailMetrics"
                  :key="'detail-' + index"
                    class="mini-row"
                    :data-group="metric.group"
                >
                    <div class="mini-label">
                      <span class="mini-emoji">{{ metric.icon }}</span>
                      <span class="mini-name">{{ metric.label }}</span>
                    </div>
                  <div class="mini-value first" :class="{ win: isHigherDetail(firstSuburb, secondSuburb, metric.key) }">
                    <span class="mini-num">{{ result[firstSuburb][metric.key] ?? '-' }}</span>
                  </div>
                  <div class="mini-value second" :class="{ win: isHigherDetail(secondSuburb, firstSuburb, metric.key) }">
                    <span class="mini-num">{{ result[secondSuburb][metric.key] ?? '-' }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Tetris Game -->
              <div class="tetris-wrapper">
                <TetrisGame />
              </div>
            </div>
          </transition>
        </div>
      </section>

      <!-- AI Analysis Section -->
      <section v-if="aiResult.length && firstSuburb && secondSuburb && firstSuburb !== secondSuburb" class="ai-section">
        <div class="ai-header">
          <h2 class="ai-title">AI Comparison Insight</h2>
          <p class="ai-subtitle">Concise AI-generated comparison across key sustainability pillars</p>
        </div>
        <div class="insights-box">
          <div class="insights-text">
            <p v-for="(point, i) in aiResult" :key="i" class="insight-paragraph">{{ point }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- Back to Top Button -->
    <button class="back-to-top" @click="scrollToTop" :class="{ 'visible': showBackToTop }">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M7 14L12 9L17 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <!-- Scroll to Bottom Button -->
    <button class="scroll-to-bottom" @click="scrollToBottom" :class="{ 'visible': showScrollToBottom }">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>

<script>
import { infrastructureApi, environmentApi, socialApi, schoolApi, childCareApi, healthApi, recreationApi, hospitalityApi,apiUtils, aiApi } from "@/services/api.js";
import TetrisGame from "./TetrisGame.vue";

export default {
  name: "ComparePage",
  components: {
    TetrisGame
  },
  data() {
    return {
      firstSuburb: "",
      secondSuburb: "",
      suburbs: [
        "Carlton",
        "Parkville",
        "East Melbourne",
        "West Melbourne",
        "North Melbourne",
        "Kensington",
        "Docklands",
        "South Yarra",
        "South Bank",
        "Melbourne"
      ],
      result: null,
      aiResult:[],
      loading: false,

      metrics: [
        {key: "environment", label: "Environment Score", icon: "🌿" },
        {key: "social", label: "Social Score", icon: "🚋"},
        { key: "infrastructure", label: "Infrastructure Score", icon: "🚧" },
      ],

      detailMetrics: [
        { group: "infrastructure", key: "tramStops", label: "Tram Stops", icon: "🚋" },
        { group: "infrastructure", key: "trainStations", label: "Train Stations", icon: "🚆" },
        { group: "infrastructure", key: "busStops", label: "Bus Stops", icon: "🚌" },
        { group: "infrastructure", key: "bikeLanes", label: "Bike Lanes", icon: "🚴" },
        { group: "infrastructure", key: "parking", label: "Parking", icon: "🅿️" },
        { group: "environment", key: "numberOfTree", label: "NumberOfTree", icon: "🌳"},
        { group: "environment", key: "aqi", label: "AQI", icon: "🌬️"},
        { group: "environment", key: "ses", label: "SES", icon: "⚡"},
        { group: "social", key: "schools", label: "Schools", icon: "🏫" },
        { group: "social", key: "childcare", label: "Childcare", icon: "🧸" },
        { group: "social", key: "hospitals", label: "Hospitals", icon: "🏥" },
        { group: "social", key: "practitioners", label: "Practitioners", icon: "🩺" },
        { group: "social", key: "playgrounds", label: "Playgrounds", icon: "🎠" },
        { group: "social", key: "communityCenters", label: "Community Centers", icon: "🏛️" },
        { group: "social", key: "cafes", label: "Cafes & Restaurants", icon: "☕" },
        { group: "social", key: "bars", label: "Bars", icon: "🍸" },
      ],
      showDetails: false,
      showBackToTop: false,
      showScrollToBottom: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {

    async loadEnvironmentScore(suburb) {
      try {
        const res = await environmentApi.getEnvironmentScore(suburb)
        const data = res.data?.data
        return data?.environment_score ?? null
      } catch (e) {
        console.error("❌ Failed to load environment score:", e)
        return null
      }
    },

    async loadSocialScore(suburb) {
      try {
        const res = await socialApi.getSocialScore(suburb);
        const data = res.data?.data;
        console.log("📊 Social API result:", data);
        return (
          data?.social_sustainability_score ??
          data?.socialSustainabilityScore ??
          data?.score ??
          null
        );
      } catch (e) {
        console.error("❌ Failed to load social score:", e);
        return null;
      }
    },

    async loadInfrastructureScore(suburb) {
      try {
        const res = await infrastructureApi.getInfrastructureScore(suburb)
        const data = res.data?.data
        if (Array.isArray(data) && data.length > 0)
          return data[0].infrastructure_sustainability_score
        return null
      } catch (e) {
        console.error("❌ Failed to load infrastructure score:", e)
        return null
      }
    },

    async loadTransportData(suburb) {
      try {
        const res = await infrastructureApi.getTransportStats(suburb);
        const rows = apiUtils.extractData(res).data || [];
        return {
          trainStations: rows.filter(r => /(TRAIN)/i.test(r.MODE)).length,
          tramStops: rows.filter(r => /(TRAM)/i.test(r.MODE)).length,
          busStops: rows.filter(r => /(BUS|COACH)/i.test(r.MODE)).length
        };
      } catch (e) {
        console.error("Load failed:", e);
        return { trainStations: 0, tramStops: 0, busStops: 0 };
      }
    },
    async loadCyclingData(suburb) {
      try {
        const [statsRes, lengthRes] = await Promise.all([
          infrastructureApi.getCyclingStats(suburb),
          infrastructureApi.getCyclingLenth(suburb),
        ]);

        const statsRows = apiUtils.extractData(statsRes).data || [];
        const totalKm = lengthRes?.data?.bike_km_total ?? 0;

        return {
          bikeLanes: totalKm || statsRows.length || 0,
        };
      } catch (e) {
        console.error("Cycling data load failed:", e);
        return { bikeLanes: 0 };
      }
    },
    async loadParkingData(suburb) {
      try {
        const res = await infrastructureApi.getParkingStats(suburb);
        const rows = apiUtils.extractData(res).data || [];
        return {
          parking: rows.length || 0,
        };
      } catch (e) {
        console.error("Parking data load failed:", e);
        return { parking: 0 };
      }
    },
    async loadEnvironmentData(suburb) {
      try {
        const [treeRes, airRes, energyRes] = await Promise.all([
          environmentApi.getTreeCardBySuburb(suburb),
          environmentApi.getAirBySuburb(suburb),
          environmentApi.getEnergyCardBySuburb(suburb),
        ]);

        return {
          numberOfTree: treeRes?.data?.data?.score ?? 0,
          aqi: airRes?.data?.data?.score ?? 0,
          ses: energyRes?.data?.data?.score ?? 0,
        };
      } catch (e) {
        console.error("Environment data load failed:", e);
        return { numberOfTree: 0, aqi: 0, ses: 0 };
      }
    },
    
    async loadSocialData(suburb) {
      try {
        console.log("🔍 Loading social data for:", suburb);

        const [
          schoolsRes,
          childcareRes,
          hospitalRes,
          practitionerRes,
          cafeRes,
          barRes,
          playgroundRes,
          communityRes
        ] = await Promise.all([
          schoolApi.getSchoolsBySuburb(suburb),
          childCareApi.getChildCareBySuburb(suburb),
          healthApi.getHospitals(suburb),
          healthApi.getPractitioners(suburb),
          hospitalityApi.getCafesBySuburb(suburb),
          hospitalityApi.getBarsBySuburb(suburb),
          recreationApi.getPlaygroundsBySuburb(suburb),
          recreationApi.getCommunityCentersBySuburb(suburb)
        ]);

        return {
          schools: apiUtils.extractData(schoolsRes).data?.length || 0,
          childcare: apiUtils.extractData(childcareRes).data?.length || 0,
          hospitals: apiUtils.extractData(hospitalRes).data?.length || 0,
          practitioners: apiUtils.extractData(practitionerRes).data?.length || 0,
          cafes: apiUtils.extractData(cafeRes).data?.length || 0,
          bars: apiUtils.extractData(barRes).data?.length || 0,
          playgrounds: apiUtils.extractData(playgroundRes).data?.length || 0,
          communityCenters: apiUtils.extractData(communityRes).data?.length || 0
        };
      } catch (e) {
        console.error("❌ Social data load failed:", e);
        return {
          schools: 0,
          childcare: 0,
          hospitals: 0,
          practitioners: 0,
          cafes: 0,
          bars: 0,
          playgrounds: 0,
          communityCenters: 0
        };
      }
    },

    async handleCompareClick() {
      // Prevent comparing the same suburb
      if (this.firstSuburb === this.secondSuburb) {
        alert('Please select two different suburbs to compare.');
        return;
      }
      await this.compareSuburbs();
      await this.getAIComparison();
      
      // Scroll to results section after comparison
      this.$nextTick(() => {
        const resultsSection = document.querySelector('.result-section');
        if (resultsSection) {
          const yOffset = -80;
          const y = resultsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    },

    async compareSuburbs() {
      // Extra safety check: prevent comparing same suburb
      if (this.firstSuburb === this.secondSuburb) {
        console.warn("Cannot compare the same suburb");
        return;
      }
      
      this.loading = true;
      this.result = null;
      try {
        const [first, second] = await Promise.all([
          this.aggregateAllData(this.firstSuburb),
          this.aggregateAllData(this.secondSuburb)
        ]);
        this.result = {
          [this.firstSuburb]: first,
          [this.secondSuburb]: second
        };
        console.log("Compare result:", this.result);
      } catch (e){
        console.error("Compare failed:", e);
      } finally {
        this.loading = false;
      }
    },

    async aggregateAllData(suburb) {
      const [
        envScore,
        socScore,
        infraScore,
        transport,
        cycling,
        parking,
        environment,
        social
      ] = await Promise.all([
        this.loadEnvironmentScore(suburb),
        this.loadSocialScore(suburb),
        this.loadInfrastructureScore(suburb),
        this.loadTransportData(suburb),
        this.loadCyclingData(suburb),
        this.loadParkingData(suburb),
        this.loadEnvironmentData(suburb),
        this.loadSocialData(suburb),
      ]);

      return {
        environment: envScore,
        social: socScore,
        infrastructure: infraScore,
        ...transport,
        ...cycling,
        ...parking,
        ...environment,
        ...social,
      };
    },

    async getAIComparison() {
      this.aiResult = ["Thinking... 🤔"];
      try {
        const prompt = `Compare ${this.firstSuburb} and ${this.secondSuburb} in terms of social, infrastructure, and environmental sustainability.`;
        const res = await aiApi.chat(prompt);
        const rawText = res.data.reply || "";

        this.aiResult = rawText
          .replace(/\*\*/g, "")
          .replace(/\*/g, "")
          .split(/\r?\n/)
          .map(line => line.trim())
          .filter(line => line.length > 0);
      } catch (err) {
        console.error("AI compare failed:", err);
        this.aiResult = ["❌ AI comparison failed. Please try again later."];
      }
    },
    goToSocial(suburb){
      this.$router.push(`/social?suburb=${encodeURIComponent(suburb)}`);
    },

    toggleDetails() {
      this.showDetails = !this.showDetails;
      
      // Scroll to detail rows when opening
      if (this.showDetails) {
        this.$nextTick(() => {
          const detailRows = document.querySelector('.detail-rows');
          if (detailRows) {
            const yOffset = -80;
            const y = detailRows.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        });
      }
    },

    handleScroll() {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show back to top when scrolled down
      this.showBackToTop = scrollY > 300;
      
      // Show scroll to bottom when not at bottom (with 100px threshold)
      this.showScrollToBottom = scrollY + windowHeight < documentHeight - 100;
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    scrollToBottom() {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    },

    getScorePercentage(score) {
      if (!score || score === "-") return 0;
      return Math.min(Math.max(parseFloat(score), 0), 100);
    },
    // Compare scores between two suburbs for the given key
    isHigher(a, b, key) {
      const va = parseFloat(this.result?.[a]?.[key] ?? -Infinity);
      const vb = parseFloat(this.result?.[b]?.[key] ?? -Infinity);
      return va > vb;
    },
    // Compare detail metrics between two suburbs
    isHigherDetail(a, b, key) {
      const va = parseFloat(this.result?.[a]?.[key] ?? -Infinity);
      const vb = parseFloat(this.result?.[b]?.[key] ?? -Infinity);
      // Only highlight if both values are valid and different
      if (va === -Infinity || vb === -Infinity || va === vb) return false;
      return va > vb;
    },
    formatScore(value) {
      if (value === undefined || value === null || value === '-') return '-';
      const num = Number(value);
      if (Number.isNaN(num)) return String(value);
      return num.toFixed(1);
    },
    deltaString(winner, loser, key) {
      const va = parseFloat(this.result?.[winner]?.[key] ?? 0);
      const vb = parseFloat(this.result?.[loser]?.[key] ?? 0);
      const d = Math.max(0, va - vb);
      return `+${d.toFixed(1)}`;
    },
    scaledFive(value) {
      const num = parseFloat(value);
      if (isNaN(num)) return 0;
      // map 0..100 -> 0..5 (1..5 visually)
      const s = Math.round(Math.max(0, Math.min(100, num)) / 20);
      return s; // 0..5
    }
  },
  computed: {
    // Filter out the second selected suburb from first suburb options
    availableFirstSuburbs() {
      if (!this.secondSuburb) {
        return this.suburbs;
      }
      return this.suburbs.filter(s => s !== this.secondSuburb);
    },
    // Filter out the first selected suburb from second suburb options
    availableSecondSuburbs() {
      if (!this.firstSuburb) {
        return this.suburbs;
      }
      return this.suburbs.filter(s => s !== this.firstSuburb);
    }
  },
  watch: {
    // Reset second suburb if it becomes the same as first suburb
    firstSuburb(newVal) {
      if (newVal && newVal === this.secondSuburb) {
        this.secondSuburb = '';
        // Also clear result if suburbs become the same
        this.result = null;
      }
    },
    // Reset first suburb if it becomes the same as second suburb
    secondSuburb(newVal) {
      if (newVal && newVal === this.firstSuburb) {
        this.firstSuburb = '';
        // Also clear result if suburbs become the same
        this.result = null;
      }
    }
  }
};
</script>

<style scoped>
/* ============================================
   Global & Background Styles
   ============================================ */
.compare-page {
  font-family: 'Inter', -apple-system, system-ui, sans-serif;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f0fdf4, #dcfce7, #f0fdf4);
  position: relative;
  overflow-x: hidden;
}

.eco-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.leaves-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.leaf {
  position: absolute;
  width: 80px;
  height: 80px;
  background: radial-gradient(ellipse at center, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 70%, transparent 100%);
  border-radius: 0 100% 0 100%;
  animation: float-leaf 15s infinite ease-in-out;
}

.leaf-1 {
  top: 10%;
  left: 15%;
  animation-delay: 0s;
  transform: rotate(45deg);
}

.leaf-2 {
  top: 60%;
  right: 10%;
  animation-delay: -5s;
  transform: rotate(-30deg);
}

.leaf-3 {
  bottom: 20%;
  left: 70%;
  animation-delay: -10s;
  transform: rotate(120deg);
}

@keyframes float-leaf {
  0%, 100% {
    transform: translateY(0) rotate(45deg);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-30px) rotate(55deg);
    opacity: 0.3;
  }
}

/* ============================================
   Main Content & Back Button
   ============================================ */
.main-content {
  position: relative;
  z-index: 1;
  padding: 2rem 1.5rem;
  max-width: 1300px;
  margin: 0 auto;
}

.back-btn {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  border: 2px solid #22c55e;
  color: #16a34a;
  padding: 0.65rem 1.25rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.15);
}

.back-btn:hover {
  background: #22c55e;
  color: white;
  transform: translateX(-3px);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.25);
}

/* ============================================
   Hero Section
   ============================================ */
.compare-hero {
  text-align: center;
  padding: 3rem 0 3rem;
}

.page-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.title-main {
  font-size: 3.75rem;
  font-weight: 900;
  color: #1e293b;
  line-height: 1;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-sub {
  font-size: 3.75rem;
  font-weight: 900;
  color: #22c55e;
  line-height: 1;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.title-sub::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 120%;
  height: 4px;
  background: linear-gradient(90deg, transparent, #22c55e, transparent);
  border-radius: 10px;
  animation: pulse-line 2s ease-in-out infinite;
  opacity: 0.9;
  filter: blur(0.1px);
}

@keyframes pulse-line {
  0%, 100% {
    opacity: 0.6;
    width: 100%;
  }
  50% {
    opacity: 1;
    width: 120%;
  }
}

.page-description {
  color: #64748b;
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 650px;
  margin: 0 auto;
  font-weight: 400;
}

/* ============================================
   Compare Selection Section
   ============================================ */
.compare-section {
  margin: 0;
  padding: 2rem 0;
}

.compare-container {
  max-width: 1000px;
  margin: 0 auto 2.5rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  align-items: end;
}

.suburb-column {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.suburb-label {
  font-size: 0.95rem;
  font-weight: 700;
  color: #334155;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  padding-left: 0.25rem;
}

.select-wrapper {
  position: relative;
  width: 100%;
}

.suburb-select {
  width: 100%;
  padding: 1.25rem 3rem 1.25rem 1.5rem;
  background: white;
  border: 3px solid #e2e8f0;
  border-radius: 16px;
  color: #1e293b;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  appearance: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
}

.first-select {
  border-color: #3b82f6;
}

.second-select {
  border-color: #f97316;
}

.suburb-select:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

.first-select:hover {
  border-color: #2563eb;
  background: #eff6ff;
}

.second-select:hover {
  border-color: #ea580c;
  background: #fff7ed;
}

.suburb-select:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.15);
  transform: translateY(-2px);
}

.first-select:focus {
  border-color: #1d4ed8;
  background: #eff6ff;
}

.second-select:focus {
  border-color: #c2410c;
  background: #fff7ed;
}

.suburb-select option {
  background: white;
  color: #1e293b;
  padding: 1rem;
  font-weight: 500;
}

.select-icon {
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  transition: all 0.3s ease;
}

.first-select + .select-icon {
  color: #3b82f6;
}

.second-select + .select-icon {
  color: #f97316;
}

.suburb-select:focus + .select-icon {
  transform: translateY(-50%) rotate(180deg);
}

.vs-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  box-shadow: 0 8px 30px rgba(34, 197, 94, 0.25);
  position: relative;
  animation: pulse-badge 2.5s ease-in-out infinite;
}

.vs-badge::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  opacity: 0.3;
  z-index: -1;
  animation: pulse-ring 2.5s ease-in-out infinite;
}

@keyframes pulse-badge {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes pulse-ring {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.2);
    opacity: 0;
  }
}

.vs-text {
  font-size: 1.15rem;
  font-weight: 900;
  color: white;
  letter-spacing: 0.1em;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.compare-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  border: none;
  padding: 1.25rem 3.5rem;
  border-radius: 16px;
  font-size: 1.15rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 30px rgba(34, 197, 94, 0.35);
  position: relative;
  overflow: hidden;
}

.compare-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.compare-btn:hover::before {
  opacity: 1;
}

.compare-btn:hover:not(:disabled) {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 12px 40px rgba(34, 197, 94, 0.45);
}

.compare-btn:active:not(:disabled) {
  transform: translateY(-1px) scale(0.98);
}

.compare-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.compare-btn svg,
.compare-btn span {
  position: relative;
  z-index: 1;
}

/* ============================================
   Results Section - Two Column Table
   ============================================ */
.result-section {
  margin: 3rem 0;
}

.tip-wrap { max-width: 1100px; margin: 0 auto 0.75rem; display: flex; justify-content: flex-start; padding-left: 2rem; }


.tip-info {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  color: #b45309;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  margin: 0;
  font-size: 0.8rem;
  font-weight: 700;
}

.tip-info svg {
  color: #f59e0b;
  flex-shrink: 0;
}

/* Comparison Table */
.comparison-table {
  max-width: 1100px;
  margin: 0 auto;
  background: white;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(34, 197, 94, 0.12);
  overflow: hidden;
  border: 3px solid #d1fae5;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr;
  gap: 1.5rem;
  padding: 1.75rem 2rem;
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
  border-bottom: 3px solid #a7f3d0;
}

.header-cell {
  display: flex;
  align-items: center;
  justify-content: center;
}

.metric-label-header {
  justify-content: flex-start;
  font-size: 0.95rem;
  font-weight: 800;
  color: #166534;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.metric-title {
  background: linear-gradient(135deg, #16a34a, #22c55e);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.suburb-column {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px;
  padding: 0.5rem;
}

.suburb-column:hover {
  background: rgba(34, 197, 94, 0.1);
  transform: scale(1.05);
}

.suburb-header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.5rem;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.suburb-header-badge.first-badge {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
}

.suburb-header-badge.second-badge {
  background: linear-gradient(135deg, #f97316, #ea580c);
  color: white;
}

.suburb-chip {
  position: relative;
  padding-left: 1rem;
}

.suburb-chip .chip-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.35) inset;
}

.suburb-chip .chip-text {
  letter-spacing: 0.02em;
}

.suburb-column:hover .suburb-header-badge {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

/* Table Rows */
.table-row {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr;
  gap: 1.5rem;
  padding: 1.75rem 2rem;
  transition: all 0.3s ease;
  border-bottom: 2px solid #f0fdf4;
}

.table-row:hover {
  background: #f9fafb;
}

.main-row {
  background: transparent;
}

.compact-main {
  padding: 1.25rem 1.5rem;
}

.row-cell {
  display: flex;
  align-items: center;
}

.metric-label-cell {
  justify-content: flex-start;
}

.value-cell {
  justify-content: center;
}

.metric-badge {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background: #f0fdf4;
  border-radius: 12px;
  border-left: 4px solid #22c55e;
}

.metric-line { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.6rem 1rem; border-radius: 12px; background: transparent; }
.metric-dot { width: 14px; height: 14px; border-radius: 50%; background: linear-gradient(135deg,#22c55e,#16a34a); box-shadow: 0 0 0 6px rgba(34,197,94,0.12); }
.metric-name { font-size: 1rem; font-weight: 800; color: #14532d; letter-spacing: 0.01em; }

/* Per-metric color accents */
.ml-environment .metric-dot { background: linear-gradient(135deg,#16a34a,#22c55e); box-shadow: 0 0 0 6px rgba(34,197,94,0.15); }
.ml-social .metric-dot { background: linear-gradient(135deg,#2563eb,#60a5fa); box-shadow: 0 0 0 6px rgba(59,130,246,0.15); }
.ml-infrastructure .metric-dot { background: linear-gradient(135deg,#f59e0b,#f97316); box-shadow: 0 0 0 6px rgba(249,115,22,0.15); }
.row-environment .metric-name { color:#14532d; }
.row-social .metric-name { color:#1e3a8a; }
.row-infrastructure .metric-name { color:#7c2d12; }

.metric-emoji {
  font-size: 1.75rem;
  line-height: 1;
}

.metric-emoji.small {
  font-size: 1.25rem;
}

.metric-text {
  font-size: 1.05rem;
  font-weight: 700;
  color: #166534;
}

.detail-badge {
  background: #f9fafb;
  border-left-color: #86efac;
  padding: 0.6rem 1rem;
}

.detail-badge .metric-text {
  font-size: 0.95rem;
  font-weight: 600;
}

/* Compact detail style */
.compact {
  background: transparent;
}

.compact-badge {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-left: 4px solid #86efac;
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
}

.compact-text {
  font-size: 0.95rem;
  font-weight: 700;
  color: #334155;
}

.compact-value {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 0.75rem 0.5rem;
}

.compact-number {
  color: #0f172a;
}

/* Value Cells with Progress Bars */
.value-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.value-number {
  font-size: 2rem;
  font-weight: 800;
  color: #166534;
  font-variant-numeric: tabular-nums;
}

.value-number.small {
  font-size: 1.5rem;
}

/* Compact score plate for main metrics (non-card) */
.score-plate { position: relative; display: inline-flex; flex-direction: column; align-items: center; gap: 0.25rem; padding: 0.6rem 1rem; border-radius: 14px; border: 2px solid transparent; background: white; min-width: 128px; box-shadow: 0 6px 16px rgba(0,0,0,0.05); }
.score-plate.first { border-color: #bfdbfe; background: linear-gradient(180deg,#f7fbff,#eef6ff); }
.score-plate.second { border-color: #fed7aa; background: linear-gradient(180deg,#fff9f4,#fff2e9); }
.row-environment .score-plate.first { border-color:#86efac; background: linear-gradient(180deg,#f4fff8,#e9ffee); }
.row-environment .score-plate.second { border-color:#fed7aa; background: linear-gradient(180deg,#fff9f4,#fff2e9); }
.row-social .score-plate.first { border-color:#bfdbfe; background: linear-gradient(180deg,#f7fbff,#eef6ff); }
.row-social .score-plate.second { border-color:#d6e3ff; background: linear-gradient(180deg,#f8fbff,#eef4ff); }
.row-infrastructure .score-plate.first { border-color:#ffe3b3; background: linear-gradient(180deg,#fff7ec,#fff1df); }
.row-infrastructure .score-plate.second { border-color:#fed7aa; background: linear-gradient(180deg,#fff9f4,#fff2e9); }
.score-plate .score-main { display: inline-flex; align-items: baseline; gap: 0.35rem; }
.score-plate .score-number { font-size: 2.05rem; font-weight: 900; letter-spacing: -0.02em; color: #0f172a; }
.score-plate .score-unit { font-size: 0.8rem; color: #64748b; font-weight: 800; }
.score-plate.win { outline: 4px solid rgba(34,197,94,0.25); box-shadow: 0 0 0 6px rgba(34,197,94,0.18), 0 16px 32px rgba(34,197,94,0.25); transform: translateY(-2px) scale(1.02); }

.value-bar {
  width: 100%;
  height: 10px;
  background: #e5e7eb;
  border-radius: 50px;
  overflow: hidden;
  position: relative;
}

.bar-progress {
  height: 100%;
  border-radius: 50px;
  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.bar-progress::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.first-bar {
    background: linear-gradient(90deg, #3b82f6, #60a5fa);
}

.second-bar {
    background: linear-gradient(90deg, #f97316, #fb923c);
}

.score-card {
  border-radius: 18px;
  padding: 1.25rem;
  position: relative;
  overflow: hidden;
}

.score-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 18px;
  background: radial-gradient(1200px 200px at -10% -20%, rgba(255,255,255,0.7) 0%, transparent 40%),
              linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%);
  pointer-events: none;
}

.first-value.score-card {
  background: linear-gradient(135deg, #eef2ff 0%, #e0eaff 35%, #f5f9ff 100%);
  border: 2px solid #bfdbfe;
  box-shadow: 0 10px 28px rgba(59, 130, 246, 0.18);
}

.second-value.score-card {
  background: linear-gradient(135deg, #fff1e6 0%, #ffe6d5 35%, #fff8f2 100%);
  border: 2px solid #fed7aa;
  box-shadow: 0 10px 28px rgba(249, 115, 22, 0.18);
}

.score-card {
  padding: 0.75rem;
}

.first-value {
  background: transparent;
}

.second-value {
  background: transparent;
}

.detail-value {
  padding: 0.75rem;
}

.detail-value .value-number {
  color: #166534;
}

/* Toggle Button */
.toggle-row {
  padding: 2rem;
  display: flex;
  justify-content: center;
  background: #f9fafb;
}

/* Separate details block under main table */
.details-section { max-width: 1100px; margin: 0 auto; }
.details-toggle { display: flex; justify-content: flex-start; padding: 0.25rem 0 0.5rem; }
.details-section .show-more-pill { margin-left: 0; }

.details-toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: white;
  border: 2px solid #86efac;
  color: #16a34a;
  padding: 0.9rem 2.25rem;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.1);
}

.details-toggle-btn:hover {
  background: #f0fdf4;
  border-color: #22c55e;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(34, 197, 94, 0.15);
}

.details-toggle-btn svg {
  transition: transform 0.3s ease;
}

.details-toggle-btn svg.rotate {
  transform: rotate(180deg);
}

/*. Fancy pill style for show more */
.show-more-pill {
  border-radius: 999px;
  padding: 0.85rem 1.5rem;
  background: linear-gradient(180deg, #ffffff, #f6fff9);
  border: 2px solid #86efac;
  box-shadow: 0 8px 24px rgba(34, 197, 94, 0.15);
}

.show-more-pill:hover {
  background: linear-gradient(180deg, #f8fffb, #ecfff5);
  transform: translateY(-2px);
}

.show-more-pill .pill-text {
  font-weight: 800;
  letter-spacing: 0.02em;
}

/* Details Content Wrapper - Flex container for table and game */
.details-content-wrapper {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

/* Detail Rows */
.detail-rows { 
  background: linear-gradient(180deg, #fbfdfb, #f7faf8); 
  max-width: 640px; 
  flex: 0 0 640px;
  margin-left: 0; 
  border-left: 3px solid #e2e8f0; 
  border-radius: 12px; 
  box-shadow: 0 6px 18px rgba(0,0,0,0.04); 
  overflow: hidden; 
}

/* Tetris Game Wrapper */
.tetris-wrapper {
  flex: 0 0 auto;
  min-height: 100%;
}

/* Minimal two-column mini stats */
.mini-row { display: grid; grid-template-columns: 1.7fr 1fr 1fr; align-items: center; gap: 0.6rem; padding: 0.6rem 0.9rem; border-top: 1px dashed #e2e8f0; }
.mini-row:first-child { border-top: none; }
.mini-label { display: inline-flex; align-items: center; gap: 0.5rem; }
.mini-emoji { font-size: 1.05rem; line-height: 1; }
.mini-name { font-size: 0.95rem; font-weight: 700; color: #334155; }
.mini-value { display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; }
.mini-num { font-size: 0.95rem; font-weight: 900; color: #0f172a; padding: 0.2rem 0.45rem; border-radius: 8px; background: #fff; border: 1px solid #e2e8f0; min-width: 48px; text-align: center; transition: all 0.3s ease; }

/* Highlight winner in detail rows */
.mini-value.win .mini-num {
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
  border: 2px solid #86efac;
  color: #166534;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.15), 0 0 0 3px rgba(34, 197, 94, 0.1);
  transform: scale(1.05);
  font-weight: 900;
}

/* Group accent colors for left dot */
.mini-row[data-group="environment"] .mini-dot { background: #16a34a; box-shadow: 0 0 0 4px rgba(22,163,74,0.18); }
.mini-row[data-group="social"] .mini-dot { background: #2563eb; box-shadow: 0 0 0 4px rgba(37,99,235,0.18); }
.mini-row[data-group="infrastructure"] .mini-dot { background: #f97316; box-shadow: 0 0 0 4px rgba(249,115,22,0.18); }

/* Expand Rows Transition */
.expand-rows-enter-active,
.expand-rows-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 2000px;
  overflow: hidden;
}

.expand-rows-enter-from,
.expand-rows-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-20px);
}

/* ============================================
   AI Analysis Section
   ============================================ */
.ai-section {
  max-width: 900px;
  margin: 4rem auto 2rem;
  background: transparent;
}

.ai-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.ai-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.25);
}

.ai-title {
  font-size: 2.2rem;
  font-weight: 900;
  margin: 0 0 0.35rem 0;
  letter-spacing: -0.015em;
  position: relative;
  background: linear-gradient(135deg, #0ea5e9 0%, #22c55e 60%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 10px 24px rgba(45,212,191,0.25);
}

.ai-subtitle {
  font-size: 1rem;
  color: #166534;
  font-weight: 700;
  letter-spacing: 0.01em;
}

/* Decorative underline for AI title */
.ai-title::after { content: none; }

.ai-insights {
  display: none;
}

.insight-item {
  display: none;
}

.insight-number { display: none; }

.insight-text {
  display: none;
}

/* New single-box AI insights */
.insights-box {
  background: white;
  border: 3px solid #d1fae5;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.12);
  padding: 1.25rem 1.5rem;
}

.insights-text { display: block; }
.insight-paragraph { margin: 0 0 0.9rem 0; color: #14532d; font-size: 1rem; line-height: 1.85; font-weight: 600; }
.insight-paragraph:last-child { margin-bottom: 0; }

/* ============================================
   Responsive Design
   ============================================ */
@media (max-width: 1024px) {
  .compare-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .vs-badge {
    width: 60px;
    height: 60px;
    order: 2;
    margin: 0.5rem auto;
  }
  
  .vs-text {
    font-size: 1rem;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
  }
  
  .metric-text {
    font-size: 0.95rem;
  }
  
  .value-number {
    font-size: 1.5rem;
  }

  .details-content-wrapper {
    flex-direction: column;
    gap: 1.5rem;
  }

  .detail-rows {
    flex: 1 1 auto;
    max-width: 100%;
  }

  .tetris-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .title-main,
  .title-sub {
    font-size: 2.75rem;
  }
  
  .page-description {
    font-size: 1rem;
    padding: 0 1rem;
  }
  
  .suburb-select {
    padding: 1.1rem 2.5rem 1.1rem 1.25rem;
    font-size: 1rem;
  }
  
  .compare-btn {
    padding: 1.15rem 2.75rem;
    font-size: 1.05rem;
  }
  
  .comparison-table {
    border-radius: 16px;
    border-width: 2px;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.75rem;
    padding: 1rem;
  }
  
  .metric-badge {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
    text-align: center;
  }
  
  .metric-emoji {
    font-size: 1.5rem;
  }
  
  .metric-text {
    font-size: 0.85rem;
  }
  
  .value-number {
    font-size: 1.25rem;
  }
  
  .value-number.small {
    font-size: 1rem;
  }
  
  .value-bar {
    height: 6px;
  }
  
  .suburb-header-badge {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
  
  .ai-section {
    padding: 1.5rem;
    border-radius: 16px;
  }
  
  .back-btn {
    position: static;
    margin-bottom: 1rem;
    width: fit-content;
  }
  
  .detail-row {
    padding: 1rem;
  }
  
  .toggle-row {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .title-main,
  .title-sub {
    font-size: 2rem;
  }
  
  .compare-section {
    padding: 1rem 0;
  }
  
  .compare-container {
    gap: 1rem;
  }
  
  .suburb-label {
    font-size: 0.85rem;
  }
  
  .suburb-select {
    padding: 1rem 2.25rem 1rem 1rem;
    font-size: 0.95rem;
  }
  
  .vs-badge {
    width: 50px;
    height: 50px;
  }
  
  .vs-text {
    font-size: 0.9rem;
  }
  
  .compare-btn {
    padding: 1rem 2.25rem;
    font-size: 1rem;
  }
  
  .table-header {
    padding: 1rem 0.75rem;
  }
  
  .metric-label-header {
    font-size: 0.75rem;
  }
  
  .table-row {
    padding: 0.75rem;
  }
  
  .metric-badge {
    padding: 0.4rem;
  }
  
  .metric-emoji {
    font-size: 1.25rem;
  }
  
  .metric-text {
    font-size: 0.75rem;
  }
  
  .value-number {
    font-size: 1.1rem;
  }
  
  .first-value,
  .second-value {
    padding: 0.5rem;
  }
}

/* Back to Top Button */
.back-to-top {
  position: fixed;
  bottom: 6rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(76, 175, 80, 0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  z-index: 1000;
}

.back-to-top.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.back-to-top:hover {
  background: linear-gradient(135deg, #45a049, #4CAF50);
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 8px 30px rgba(76, 175, 80, 0.4);
}

.back-to-top svg {
  transition: transform 0.3s ease;
}

.back-to-top:hover svg {
  transform: translateY(-2px);
}

/* Scroll to Bottom Button */
.scroll-to-bottom {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(76, 175, 80, 0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  z-index: 1000;
}

.scroll-to-bottom.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.scroll-to-bottom:hover {
  background: linear-gradient(135deg, #45a049, #4CAF50);
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 8px 30px rgba(76, 175, 80, 0.4);
}

.scroll-to-bottom svg {
  transition: transform 0.3s ease;
}

.scroll-to-bottom:hover svg {
  transform: translateY(2px);
}

@media (max-width: 768px) {
  .back-to-top {
    width: 50px;
    height: 50px;
    bottom: 4.5rem;
    right: 1rem;
  }

  .scroll-to-bottom {
    width: 50px;
    height: 50px;
    bottom: 1rem;
    right: 1rem;
  }
}
</style>