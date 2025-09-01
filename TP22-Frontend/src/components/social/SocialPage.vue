<template>
  <div class="social-page">
    <!-- Dynamic Background -->
    <div class="dynamic-background">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
        <div class="shape shape-5"></div>
      </div>
    </div>

    <!-- Header Navigation -->
    <nav class="nav-bar">
      <div class="nav-container">
        <div class="logo">
          <div class="logo-icon">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="8" fill="#4CAF50"/>
              <path d="M20 8C13.37 8 8 13.37 8 20C8 26.63 13.37 32 20 32C26.63 32 32 26.63 32 20C32 13.37 26.63 8 20 8ZM20 30C14.48 30 10 25.52 10 20C10 14.48 14.48 10 20 10C25.52 10 30 14.48 30 20C30 25.52 25.52 30 20 30Z" fill="white"/>
              <path d="M20 12C15.58 12 12 15.58 12 20C12 24.42 15.58 28 20 28C24.42 28 28 24.42 28 20C28 15.58 24.42 12 20 12ZM20 26C16.69 26 14 23.31 14 20C14 16.69 16.69 14 20 14C23.31 14 26 16.69 26 20C26 23.31 23.31 26 20 26Z" fill="white"/>
              <path d="M20 16C17.79 16 16 17.79 16 20C16 22.21 17.79 24 20 24C22.21 24 24 22.21 24 20C24 17.79 22.21 16 20 16Z" fill="white"/>
            </svg>
          </div>
          <span class="logo-text">MelSustain</span>
          <span v-if="selectedSuburb" class="suburb-display"><span class="pin">📍</span>{{ selectedSuburb }}</span>
        </div>
        
        <div class="nav-tabs">
          <router-link :to="{ path: '/', query: $route.query }" class="nav-tab">Overview</router-link>
          <div class="nav-tab active">Social</div>
          <div class="nav-tab">Economic</div>
          <div class="nav-tab">Infrastructure</div>
          <router-link :to="{ path: '/environment', query: $route.query }" class="nav-tab">Environment</router-link>
          <router-link :to="{ path: '/', hash: '#compare-section', query: $route.query }" class="nav-tab">Compare</router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Social Insights Header -->
      <section class="insights-header">
        <div class="container">
          <div class="header-content">
            <div class="title-animation">
              <h1 class="page-title">
                <span class="title-word">Social</span>
                <span class="title-word">Sustainability</span>
                <span class="title-word">Insights</span>
              </h1>
            </div>
            <p class="page-description">
              Explore education, healthcare, recreation, and shopping amenities to evaluate daily convenience and community support in each area.
            </p>
          </div>
        </div>
      </section>

      <!-- Social Facilities - Modern Compact Grid -->
      <section class="social-facilities">
        <div class="container">
          <!-- Header with Total -->
          <div class="facilities-header">
            <div class="total-counter">
              <div class="counter-number">{{ facilityStats?.totalFacilities || 186 }}</div>
              <div class="counter-label">Social Facilities</div>
            </div>
            <div class="header-subtitle">
              <span v-if="selectedSuburb">{{ selectedSuburb }}'s community infrastructure</span>
              <span v-else>Discover Melbourne's community infrastructure</span>
            </div>
          </div>

          <!-- Loading state -->
          <div v-if="loading" class="loading-container">
            <div class="loading-spinner"></div>
            <p>Loading facility data...</p>
          </div>

          <!-- Error state -->
          <div v-else-if="error" class="error-container">
            <div class="error-icon">⚠️</div>
            <p>{{ error }}</p>
            <button class="retry-btn" @click="loadSuburbData(selectedSuburb)">Retry</button>
          </div>

          <!-- Compact Facility Grid -->
          <div v-else class="facilities-grid">
            <!-- Education Bubble -->
            <div class="facility-bubble education">
              <div class="bubble-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M22 10V6C22 4.89543 21.1046 4 20 4H4C2.89543 4 2 4.89543 2 6V10M22 10L12 15L2 10M22 10V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V10" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <div class="bubble-content">
                <div class="bubble-number">{{ facilityStats?.facilityCounts?.EDUCATION || 15 }}</div>
                <div class="bubble-label">Education</div>
                <div class="bubble-details">
                  <span class="detail-pill">{{ facilityStats?.detailedCounts?.EDUCATION?.Primary || 9 }} Primary</span>
                  <span class="detail-pill">{{ facilityStats?.detailedCounts?.EDUCATION?.Secondary || 4 }} Secondary</span>
                  <span class="detail-pill">{{ facilityStats?.detailedCounts?.EDUCATION?.Library || 1 }} Library</span>
                </div>
              </div>
              <div class="bubble-glow"></div>
            </div>

            <!-- Healthcare Bubble -->
            <div class="facility-bubble healthcare">
              <div class="bubble-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M19 14C20.49 12.54 22 10.79 22 8.5C22 7.04131 21.4205 5.64236 20.3891 4.61091C19.3576 3.57946 17.9587 3 16.5 3C15.74 3 15.04 3.16 14.38 3.46L12 5.5L9.62 3.46C8.96 3.16 8.26 3 7.5 3C6.04131 3 4.64236 3.57946 3.61091 4.61091C2.57946 5.64236 2 7.04131 2 8.5C2 10.79 3.51 12.54 5 14L12 21L19 14Z" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <div class="bubble-content">
                <div class="bubble-number">{{ facilityStats?.facilityCounts?.HEALTHCARE || 4 }}</div>
                <div class="bubble-label">Healthcare</div>
                <div class="bubble-details">
                  <span class="detail-pill">{{ facilityStats?.detailedCounts?.HEALTHCARE?.Clinic || 1 }} Clinic</span>
                  <span class="detail-pill">{{ facilityStats?.detailedCounts?.HEALTHCARE?.Pharmacy || 1 }} Pharmacy</span>
                  <span class="detail-pill">Emergency</span>
                </div>
              </div>
              <div class="bubble-glow"></div>
            </div>

            <!-- Recreation Bubble -->
            <div class="facility-bubble recreation">
              <div class="bubble-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <div class="bubble-content">
                <div class="bubble-number">{{ facilityStats?.facilityCounts?.RECREATION || 22 }}</div>
                <div class="bubble-label">Recreation</div>
                <div class="bubble-details">
                  <span class="detail-pill">{{ facilityStats?.detailedCounts?.RECREATION?.Park || 11 }} Parks</span>
                  <span class="detail-pill">{{ facilityStats?.detailedCounts?.RECREATION?.Community || 6 }} Community</span>
                  <span class="detail-pill">{{ facilityStats?.detailedCounts?.RECREATION?.Sports || 4 }} Sports</span>
                </div>
              </div>
              <div class="bubble-glow"></div>
            </div>

            <!-- Shopping Bubble -->
            <div class="facility-bubble shopping">
              <div class="bubble-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M3 7V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V7M3 7L5 19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19L21 7M3 7H21M9 11V17M15 11V17" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <div class="bubble-content">
                <div class="bubble-number">{{ facilityStats?.facilityCounts?.SHOPPING || 145 }}</div>
                <div class="bubble-label">Shopping</div>
                <div class="bubble-details">
                  <span class="detail-pill">{{ facilityStats?.detailedCounts?.SHOPPING?.Mall || 87 }} Mall</span>
                  <span class="detail-pill">{{ facilityStats?.detailedCounts?.SHOPPING?.Supermarket || 29 }} Supermarket</span>
                  <span class="detail-pill">Other</span>
                </div>
              </div>
              <div class="bubble-glow"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Infrastructure Demand Predictions - Creative Wave Design -->
      <section class="demand-predictions">
        <div class="container">
          <div class="prediction-header">
            <h2>Infrastructure Demand Predictions</h2>
            <p>Projected needs for the next 5 years based on population growth</p>
          </div>
          
          <div class="prediction-waves">
            <div class="wave-container">
              <!-- Year Labels -->
              <div class="year-labels">
                <div class="year-label">2024</div>
                <div class="year-label">2025</div>
                <div class="year-label">2026</div>
                <div class="year-label">2027</div>
                <div class="year-label">2028</div>
              </div>
              
              <!-- Demand Waves -->
              <div class="waves">
                <div class="wave education-wave">
                  <div class="wave-path">
                    <svg viewBox="0 0 500 100" preserveAspectRatio="none">
                      <path d="M0,50 Q125,30 250,40 T500,35" stroke="#2196F3" stroke-width="3" fill="none"/>
                      <path d="M0,50 Q125,30 250,40 T500,35 L500,100 L0,100 Z" fill="url(#educationGradient)" opacity="0.3"/>
                    </svg>
                  </div>
                  <div class="wave-label">Education Demand</div>
                </div>
                
                <div class="wave healthcare-wave">
                  <div class="wave-path">
                    <svg viewBox="0 0 500 100" preserveAspectRatio="none">
                      <path d="M0,60 Q125,45 250,50 T500,45" stroke="#f44336" stroke-width="3" fill="none"/>
                      <path d="M0,60 Q125,45 250,50 T500,45 L500,100 L0,100 Z" fill="url(#healthcareGradient)" opacity="0.3"/>
                    </svg>
                  </div>
                  <div class="wave-label">Healthcare Demand</div>
                </div>
                
                <div class="wave recreation-wave">
                  <div class="wave-path">
                    <svg viewBox="0 0 500 100" preserveAspectRatio="none">
                      <path d="M0,70 Q125,50 250,60 T500,55" stroke="#4CAF50" stroke-width="3" fill="none"/>
                      <path d="M0,70 Q125,50 250,60 T500,55 L500,100 L0,100 Z" fill="url(#recreationGradient)" opacity="0.3"/>
                    </svg>
                  </div>
                  <div class="wave-label">Recreation Demand</div>
                </div>
              </div>
              
              <!-- Growth Indicators -->
              <div class="growth-indicators">
                <div class="indicator education">
                  <div class="indicator-value">+25%</div>
                  <div class="indicator-label">Education Growth</div>
                </div>
                <div class="indicator healthcare">
                  <div class="indicator-value">+18%</div>
                  <div class="indicator-label">Healthcare Growth</div>
                </div>
                <div class="indicator recreation">
                  <div class="indicator-value">+32%</div>
                  <div class="indicator-label">Recreation Growth</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Service Accessibility - Distance Timeline -->
      <section class="service-accessibility">
        <div class="container">
          <div class="accessibility-header">
            <h2>Service Accessibility</h2>
            <p class="section-subtitle">Walking distance to essential services</p>
          </div>
          
          <div class="accessibility-timeline">
            <!-- Distance Scale -->
            <div class="distance-scale">
              <div class="scale-line">
                <div class="scale-marker" style="left: 0%;">
                  <div class="marker-line"></div>
                  <div class="marker-label">0 km</div>
                </div>
                <div class="scale-marker" style="left: 25%;">
                  <div class="marker-line"></div>
                  <div class="marker-label">0.5 km</div>
                </div>
                <div class="scale-marker" style="left: 50%;">
                  <div class="marker-line"></div>
                  <div class="marker-label">1.0 km</div>
                </div>
                <div class="scale-marker" style="left: 75%;">
                  <div class="marker-line"></div>
                  <div class="marker-label">1.5 km</div>
                </div>
                <div class="scale-marker" style="left: 100%;">
                  <div class="marker-line"></div>
                  <div class="marker-label">2.0 km</div>
                </div>
              </div>
            </div>

            <!-- Service Items -->
            <div class="service-items">
              <!-- Public Transport -->
              <div class="service-item excellent">
                <div class="service-info">
                  <div class="service-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L3 7V11C3 16 6 19 12 22C18 19 21 16 21 11V7L12 2Z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </div>
                  <div class="service-details">
                    <div class="service-name">Public Transport</div>
                    <div class="service-distance">0.2 km</div>
                  </div>
                </div>
                <div class="distance-bar">
                  <div class="bar-track"></div>
                  <div class="bar-progress excellent" style="width: 10%;"></div>
                  <div class="distance-marker excellent" style="left: 10%;">
                    <div class="marker-dot"></div>
                    <div class="marker-tooltip">
                      <div class="tooltip-content">
                        <div class="tooltip-distance">0.2 km</div>
                        <div class="tooltip-rating excellent">Excellent</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Primary School -->
              <div class="service-item excellent">
                <div class="service-info">
                  <div class="service-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M22 10V6C22 4.89543 21.1046 4 20 4H4C2.89543 4 2 4.89543 2 6V10M22 10L12 15L2 10M22 10V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V10" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </div>
                  <div class="service-details">
                    <div class="service-name">Primary School</div>
                    <div class="service-distance">0.3 km</div>
                  </div>
                </div>
                <div class="distance-bar">
                  <div class="bar-track"></div>
                  <div class="bar-progress excellent" style="width: 15%;"></div>
                  <div class="distance-marker excellent" style="left: 15%;">
                    <div class="marker-dot"></div>
                    <div class="marker-tooltip">
                      <div class="tooltip-content">
                        <div class="tooltip-distance">0.3 km</div>
                        <div class="tooltip-rating excellent">Excellent</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Healthcare -->
              <div class="service-item good">
                <div class="service-info">
                  <div class="service-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M19 14C20.49 12.54 22 10.79 22 8.5C22 7.04131 21.4205 5.64236 20.3891 4.61091C19.3576 3.57946 17.9587 3 16.5 3C15.74 3 15.04 3.16 14.38 3.46L12 5.5L9.62 3.46C8.96 3.16 8.26 3 7.5 3C6.04131 3 4.64236 3.57946 3.61091 4.61091C2.57946 5.64236 2 7.04131 2 8.5C2 10.79 3.51 12.54 5 14L12 21L19 14Z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </div>
                  <div class="service-details">
                    <div class="service-name">Healthcare</div>
                    <div class="service-distance">0.8 km</div>
                  </div>
                </div>
                <div class="distance-bar">
                  <div class="bar-track"></div>
                  <div class="bar-progress good" style="width: 40%;"></div>
                  <div class="distance-marker good" style="left: 40%;">
                    <div class="marker-dot"></div>
                    <div class="marker-tooltip">
                      <div class="tooltip-content">
                        <div class="tooltip-distance">0.8 km</div>
                        <div class="tooltip-rating good">Good</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Shopping Center -->
              <div class="service-item fair">
                <div class="service-info">
                  <div class="service-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M3 7V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V7M3 7L5 19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19L21 7M3 7H21M9 11V17M15 11V17" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </div>
                  <div class="service-details">
                    <div class="service-name">Shopping Center</div>
                    <div class="service-distance">1.2 km</div>
                  </div>
                </div>
                <div class="distance-bar">
                  <div class="bar-track"></div>
                  <div class="bar-progress fair" style="width: 60%;"></div>
                  <div class="distance-marker fair" style="left: 60%;">
                    <div class="marker-dot"></div>
                    <div class="marker-tooltip">
                      <div class="tooltip-content">
                        <div class="tooltip-distance">1.2 km</div>
                        <div class="tooltip-rating fair">Fair</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Accessibility Summary -->
            <div class="accessibility-summary">
              <div class="summary-item excellent">
                <div class="summary-icon"></div>
                <div class="summary-text">
                  <span class="summary-label">Excellent Access</span>
                  <span class="summary-description">0-0.5 km walking distance</span>
                </div>
              </div>
              <div class="summary-item good">
                <div class="summary-icon"></div>
                <div class="summary-text">
                  <span class="summary-label">Good Access</span>
                  <span class="summary-description">0.5-1.0 km walking distance</span>
                </div>
              </div>
              <div class="summary-item fair">
                <div class="summary-icon"></div>
                <div class="summary-text">
                  <span class="summary-label">Fair Access</span>
                  <span class="summary-description">1.0+ km walking distance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { socialApi, apiUtils } from '../../services/api.js'

export default {
  name: 'SocialPage',
  data() {
    return {
      facilityStats: null,
      facilities: [],
      accessibilityData: [],
      loading: false,
      error: null
    }
  },
  computed: {
    selectedSuburb() {
      return this.$route?.query?.suburb || '';
    }
  },
  watch: {
    selectedSuburb: {
      immediate: true,
      handler(newSuburb) {
        if (newSuburb) {
          this.loadSuburbData(newSuburb)
        }
      }
    }
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  methods: {
    async loadSuburbData(suburb) {
      if (!suburb) return
      
      this.loading = true
      this.error = null
      
      try {
        // Load all social data in parallel
        const [statsResponse, facilitiesResponse, accessibilityResponse] = await Promise.allSettled([
          socialApi.getFacilityStats(suburb),
          socialApi.getFacilities(suburb),
          socialApi.getFacilityAccessibility(suburb)
        ])

        // Handle facility stats
        if (statsResponse.status === 'fulfilled') {
          const statsResult = apiUtils.extractData(statsResponse.value)
          if (statsResult.success) {
            this.facilityStats = statsResult.data
          }
        }

        // Handle facilities
        if (facilitiesResponse.status === 'fulfilled') {
          const facilitiesResult = apiUtils.extractData(facilitiesResponse.value)
          if (facilitiesResult.success) {
            this.facilities = facilitiesResult.data || []
          }
        }

        // Handle accessibility
        if (accessibilityResponse.status === 'fulfilled') {
          const accessibilityResult = apiUtils.extractData(accessibilityResponse.value)
          if (accessibilityResult.success) {
            this.accessibilityData = accessibilityResult.data || []
          }
        }

      } catch (error) {
        console.error('Error loading suburb data:', error)
        this.error = `Failed to load data for ${suburb}`
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.social-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #1a1a1a;
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Dynamic Background */
.dynamic-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(
    135deg,
    rgba(240, 248, 255, 0.8) 0%,
    rgba(230, 247, 255, 0.7) 25%,
    rgba(248, 250, 252, 0.8) 50%,
    rgba(243, 244, 246, 0.7) 75%,
    rgba(249, 250, 251, 0.8) 100%
  );
  animation: backgroundShift 20s ease-in-out infinite;
}

@keyframes backgroundShift {
  0%, 100% {
    background: linear-gradient(
      135deg,
      rgba(240, 248, 255, 0.8) 0%,
      rgba(230, 247, 255, 0.7) 25%,
      rgba(248, 250, 252, 0.8) 50%,
      rgba(243, 244, 246, 0.7) 75%,
      rgba(249, 250, 251, 0.8) 100%
    );
  }
  33% {
    background: linear-gradient(
      135deg,
      rgba(243, 244, 246, 0.8) 0%,
      rgba(249, 250, 251, 0.7) 25%,
      rgba(240, 248, 255, 0.8) 50%,
      rgba(230, 247, 255, 0.7) 75%,
      rgba(248, 250, 252, 0.8) 100%
    );
  }
  66% {
    background: linear-gradient(
      135deg,
      rgba(248, 250, 252, 0.8) 0%,
      rgba(240, 248, 255, 0.7) 25%,
      rgba(243, 244, 246, 0.8) 50%,
      rgba(249, 250, 251, 0.7) 75%,
      rgba(230, 247, 255, 0.8) 100%
    );
  }
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  animation: float 15s ease-in-out infinite;
}

.shape-1 {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #2196F3, #1976D2);
  top: 60%;
  right: 15%;
  animation-delay: -5s;
}

.shape-3 {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #FF9800, #F57C00);
  bottom: 30%;
  left: 20%;
  animation-delay: -10s;
}

.shape-4 {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #9C27B0, #7B1FA2);
  top: 40%;
  left: 60%;
  animation-delay: -7s;
}

.shape-5 {
  width: 140px;
  height: 140px;
  background: linear-gradient(135deg, #f44336, #d32f2f);
  bottom: 20%;
  right: 30%;
  animation-delay: -3s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) translateX(10px) rotate(90deg);
  }
  50% {
    transform: translateY(-40px) translateX(-10px) rotate(180deg);
  }
  75% {
    transform: translateY(-20px) translateX(-20px) rotate(270deg);
  }
}

/* Navigation Bar */
.nav-bar {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95));
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.nav-tabs {
  display: flex;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  padding: 0.5rem;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-tab {
  padding: 0.8rem 1.5rem;
  border-radius: 20px;
  font-weight: 500;
  color: #666;
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

/* Main Content */
.main-content {
  position: relative;
  z-index: 1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Insights Header */
.insights-header {
  padding: 6rem 0 4rem;
  text-align: center;
}

.header-content {
  position: relative;
  z-index: 2;
}

.title-animation {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.title-word {
  background: linear-gradient(135deg, #2c3e50, #3498db, #4CAF50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: titleGlow 3s ease-in-out infinite;
}

.title-word:nth-child(2) {
  animation-delay: 0.5s;
}

.title-word:nth-child(3) {
  animation-delay: 1s;
}

@keyframes titleGlow {
  0%, 100% {
    filter: brightness(1);
    transform: scale(1);
  }
  50% {
    filter: brightness(1.2);
    transform: scale(1.05);
  }
}

.page-description {
  font-size: 1.3rem;
  color: rgba(44, 62, 80, 0.8);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem 2rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Social Facilities - Compact Inline Layout */
.social-facilities {
  padding: 2.5rem 0;
}

.facilities-header {
  text-align: center;
  margin-bottom: 2rem;
}

.total-counter {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95));
  backdrop-filter: blur(30px);
  border-radius: 40px;
  padding: 0.8rem 1.5rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 0.8rem;
  animation: counterBounce 3s ease-in-out infinite;
}

@keyframes counterBounce {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
}

.counter-number {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #4CAF50, #2196F3, #FF9800);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: numberGlow 2s ease-in-out infinite alternate;
}

@keyframes numberGlow {
  0% {
    filter: brightness(1);
  }
  100% {
    filter: brightness(1.2);
  }
}

.counter-label {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
}

.header-subtitle {
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
}

.facilities-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.facility-bubble {
  position: relative;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95));
  backdrop-filter: blur(30px);
  border-radius: 20px;
  padding: 1.2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  overflow: hidden;
  animation: bubbleFloat 6s ease-in-out infinite;
}

.facility-bubble:nth-child(1) { animation-delay: 0s; }
.facility-bubble:nth-child(2) { animation-delay: 1.5s; }
.facility-bubble:nth-child(3) { animation-delay: 3s; }
.facility-bubble:nth-child(4) { animation-delay: 4.5s; }

@keyframes bubbleFloat {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-10px) rotate(1deg);
  }
  50% {
    transform: translateY(-5px) rotate(0deg);
  }
  75% {
    transform: translateY(-15px) rotate(-1deg);
  }
}

.facility-bubble:hover {
  transform: translateY(-15px) scale(1.05) rotate(2deg);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
}

.facility-bubble.education:hover {
  box-shadow: 0 25px 60px rgba(33, 150, 243, 0.3);
}

.facility-bubble.healthcare:hover {
  box-shadow: 0 25px 60px rgba(244, 67, 54, 0.3);
}

.facility-bubble.recreation:hover {
  box-shadow: 0 25px 60px rgba(76, 175, 80, 0.3);
}

.facility-bubble.dining:hover {
  box-shadow: 0 25px 60px rgba(255, 152, 0, 0.3);
}

.facility-bubble.shopping:hover {
  box-shadow: 0 25px 60px rgba(255, 152, 0, 0.3);
}

.bubble-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.facility-bubble.education .bubble-icon {
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.2), rgba(33, 150, 243, 0.3));
  color: #2196F3;
}

.facility-bubble.healthcare .bubble-icon {
  background: linear-gradient(135deg, rgba(244, 67, 54, 0.2), rgba(244, 67, 54, 0.3));
  color: #f44336;
}

.facility-bubble.recreation .bubble-icon {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(76, 175, 80, 0.3));
  color: #4CAF50;
}

.facility-bubble.dining .bubble-icon {
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.2), rgba(255, 152, 0, 0.3));
  color: #FF9800;
}

.facility-bubble.shopping .bubble-icon {
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.2), rgba(255, 152, 0, 0.3));
  color: #FF9800;
}

.facility-bubble:hover .bubble-icon {
  transform: scale(1.1) rotate(360deg);
  border-color: rgba(255, 255, 255, 0.6);
}

.bubble-content {
  text-align: center;
  position: relative;
  z-index: 2;
}

.bubble-number {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 0.4rem;
  animation: numberPop 2s ease-in-out infinite;
}

@keyframes numberPop {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.facility-bubble.education .bubble-number {
  color: #2196F3;
}

.facility-bubble.healthcare .bubble-number {
  color: #f44336;
}

.facility-bubble.recreation .bubble-number {
  color: #4CAF50;
}

.facility-bubble.dining .bubble-number {
  color: #FF9800;
}

.facility-bubble.shopping .bubble-number {
  color: #FF9800;
}

.bubble-label {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.8rem;
}

.bubble-details {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: center;
}

.detail-pill {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  padding: 0.5rem 0.8rem;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #444;
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
  animation: pillFloat 4s ease-in-out infinite;
}

.detail-pill:nth-child(1) { animation-delay: 0s; }
.detail-pill:nth-child(2) { animation-delay: 1.3s; }
.detail-pill:nth-child(3) { animation-delay: 2.6s; }

@keyframes pillFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
}

.facility-bubble:hover .detail-pill {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-2px);
}

.bubble-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.5s ease;
  pointer-events: none;
  z-index: 1;
}

.facility-bubble.education .bubble-glow {
  background: radial-gradient(circle, rgba(33, 150, 243, 0.1) 0%, transparent 70%);
}

.facility-bubble.healthcare .bubble-glow {
  background: radial-gradient(circle, rgba(244, 67, 54, 0.1) 0%, transparent 70%);
}

.facility-bubble.recreation .bubble-glow {
  background: radial-gradient(circle, rgba(76, 175, 80, 0.1) 0%, transparent 70%);
}

.facility-bubble.dining .bubble-glow {
  background: radial-gradient(circle, rgba(255, 152, 0, 0.1) 0%, transparent 70%);
}

.facility-bubble:hover .bubble-glow {
  opacity: 1;
  animation: glowPulse 2s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.6;
  }
}

/* Demand Predictions - Wave Design */
.demand-predictions {
  padding: 6rem 0;
}

.prediction-header {
  text-align: center;
  margin-bottom: 4rem;
}

.prediction-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #2c3e50, #4CAF50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.prediction-header p {
  font-size: 1.2rem;
  color: rgba(44, 62, 80, 0.7);
}

.prediction-waves {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95));
  backdrop-filter: blur(30px);
  border-radius: 30px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.wave-container {
  position: relative;
}

.year-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.year-label {
  font-weight: 600;
  color: #2c3e50;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  backdrop-filter: blur(10px);
}

.waves {
  position: relative;
  margin-bottom: 3rem;
}

.wave {
  margin-bottom: 2rem;
  position: relative;
}

.wave-path {
  height: 100px;
  position: relative;
}

.wave-path svg {
  width: 100%;
  height: 100%;
}

.wave-label {
  position: absolute;
  top: -30px;
  left: 20px;
  font-weight: 600;
  color: #2c3e50;
  background: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 10px;
  backdrop-filter: blur(10px);
}

.education-wave .wave-label {
  color: #2196F3;
}

.healthcare-wave .wave-label {
  color: #f44336;
}

.recreation-wave .wave-label {
  color: #4CAF50;
}

.growth-indicators {
  display: flex;
  justify-content: space-around;
  gap: 2rem;
  flex-wrap: wrap;
}

.indicator {
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(15px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  min-width: 150px;
}

.indicator:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.indicator-value {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.indicator.education .indicator-value {
  color: #2196F3;
}

.indicator.healthcare .indicator-value {
  color: #f44336;
}

.indicator.recreation .indicator-value {
  color: #4CAF50;
}

.indicator-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

/* Service Accessibility - Distance Timeline */
.service-accessibility {
  padding: 6rem 0;
}

.accessibility-header {
  text-align: center;
  margin-bottom: 4rem;
}

.accessibility-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #2c3e50, #4CAF50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  color: rgba(44, 62, 80, 0.7);
  font-size: 1.2rem;
}

.accessibility-timeline {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95));
  backdrop-filter: blur(30px);
  border-radius: 30px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  max-width: 1000px;
  margin: 0 auto;
}

.distance-scale {
  margin-bottom: 3rem;
}

.scale-line {
  position: relative;
  height: 2px;
  background: linear-gradient(90deg, #4CAF50, #2196F3, #FF9800, #f44336);
  border-radius: 1px;
  margin: 2rem 0;
}

.scale-marker {
  position: absolute;
  transform: translateX(-50%);
}

.marker-line {
  width: 2px;
  height: 20px;
  background: rgba(44, 62, 80, 0.3);
  margin: 0 auto;
  margin-bottom: 0.5rem;
}

.marker-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
  text-align: center;
}

.service-items {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
}

.service-item {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.service-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.7);
}

.service-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 200px;
}

.service-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.service-item.excellent .service-icon {
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
}

.service-item.good .service-icon {
  background: rgba(33, 150, 243, 0.2);
  color: #2196F3;
}

.service-item.fair .service-icon {
  background: rgba(255, 152, 0, 0.2);
  color: #FF9800;
}

.service-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.2rem;
}

.service-distance {
  font-size: 0.95rem;
  color: #666;
  font-weight: 500;
}

.distance-bar {
  flex: 1;
  position: relative;
  height: 8px;
  margin: 0 1rem;
}

.bar-track {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.bar-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s ease;
}

.bar-progress.excellent {
  background: linear-gradient(90deg, #4CAF50, #45a049);
}

.bar-progress.good {
  background: linear-gradient(90deg, #2196F3, #1976D2);
}

.bar-progress.fair {
  background: linear-gradient(90deg, #FF9800, #F57C00);
}

.distance-marker {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}

.marker-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
}

.distance-marker.excellent .marker-dot {
  background: #4CAF50;
}

.distance-marker.good .marker-dot {
  background: #2196F3;
}

.distance-marker.fair .marker-dot {
  background: #FF9800;
}

.marker-dot:hover {
  transform: scale(1.2);
}

.marker-tooltip {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 10;
}

.distance-marker:hover .marker-tooltip {
  opacity: 1;
  visibility: visible;
  bottom: 35px;
}

.tooltip-content {
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  text-align: center;
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.tooltip-distance {
  font-weight: 600;
  margin-bottom: 0.2rem;
}

.tooltip-rating {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tooltip-rating.excellent {
  color: #4CAF50;
}

.tooltip-rating.good {
  color: #2196F3;
}

.tooltip-rating.fair {
  color: #FF9800;
}

.accessibility-summary {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  min-width: 200px;
}

.summary-icon {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.summary-item.excellent .summary-icon {
  background: #4CAF50;
}

.summary-item.good .summary-icon {
  background: #2196F3;
}

.summary-item.fair .summary-icon {
  background: #FF9800;
}

.summary-text {
  display: flex;
  flex-direction: column;
}

.summary-label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.95rem;
  margin-bottom: 0.2rem;
}

.summary-description {
  font-size: 0.85rem;
  color: #666;
}

/* SVG Gradients */
.prediction-waves svg defs,
.radar-svg defs {
  display: none;
}

/* Add gradients for wave charts */
.prediction-waves::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="educationGradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%232196F3" stop-opacity="0.3"/><stop offset="100%" stop-color="%232196F3" stop-opacity="0"/></linearGradient><linearGradient id="healthcareGradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%23f44336" stop-opacity="0.3"/><stop offset="100%" stop-color="%23f44336" stop-opacity="0"/></linearGradient><linearGradient id="recreationGradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%234CAF50" stop-opacity="0.3"/><stop offset="100%" stop-color="%234CAF50" stop-opacity="0"/></linearGradient></defs></svg>');
  pointer-events: none;
  z-index: -1;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .nav-tabs {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .page-title {
    font-size: 2.5rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .page-description {
    font-size: 1.1rem;
    padding: 1rem 1.5rem;
  }
  
  .counter-number {
    font-size: 2rem;
  }
  
  .total-counter {
    padding: 0.8rem 1.5rem;
    gap: 0.8rem;
  }
  
  .counter-label {
    font-size: 1rem;
  }
  
  .facilities-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .facility-bubble {
    padding: 1rem;
    border-radius: 18px;
  }
  
  .bubble-icon {
    width: 45px;
    height: 45px;
    margin-bottom: 0.8rem;
  }
  
  .bubble-number {
    font-size: 1.8rem;
  }
  
  .bubble-label {
    font-size: 0.9rem;
    margin-bottom: 0.6rem;
  }
  
  .detail-pill {
    font-size: 0.75rem;
    padding: 0.4rem 0.6rem;
  }
  
  .prediction-waves,
  .accessibility-timeline {
    padding: 2rem 1rem;
  }
  
  .year-labels {
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }
  
  .growth-indicators {
    flex-direction: column;
    gap: 1rem;
  }
  
  .service-item {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .service-info {
    min-width: auto;
    justify-content: center;
  }
  
  .distance-bar {
    margin: 1rem 0;
  }
  
  .accessibility-summary {
    flex-direction: column;
    gap: 1rem;
  }
  
  .summary-item {
    min-width: auto;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .prediction-header h2,
  .accessibility-header h2 {
    font-size: 2rem;
  }
  
  .counter-number {
    font-size: 1.8rem;
  }
  
  .total-counter {
    padding: 0.6rem 1.2rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .counter-label {
    font-size: 0.9rem;
  }
  
  .facilities-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
  
  .facility-bubble {
    padding: 1rem;
    border-radius: 16px;
  }
  
  .bubble-icon {
    width: 40px;
    height: 40px;
  }
  
  .bubble-number {
    font-size: 1.6rem;
  }
  
  .bubble-label {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
  }
  
  .detail-pill {
    font-size: 0.7rem;
    padding: 0.3rem 0.5rem;
  }
  
  .prediction-waves,
  .accessibility-timeline {
    padding: 1.5rem 1rem;
  }
  
  .service-item {
    padding: 1rem;
  }
}
.selected-suburb-pill {
  margin-left: 0.8rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: #2c3e50;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.06);
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
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

/* Loading and Error States */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(76, 175, 80, 0.1);
  border-left: 4px solid #4CAF50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-container p {
  color: #666;
  font-size: 1.1rem;
  font-weight: 500;
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  background: rgba(244, 67, 54, 0.1);
  border-radius: 15px;
  margin: 2rem 0;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-container p {
  color: #d32f2f;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.retry-btn {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.retry-btn:hover {
  background: linear-gradient(135deg, #45a049, #4CAF50);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
}
</style>

