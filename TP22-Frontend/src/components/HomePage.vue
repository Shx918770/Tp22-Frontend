<template>
  <div class="homepage">
    <!-- Header/Hero Section -->
    <header class="hero-section">
      <div class="hero-content">
                 <div class="logo">
           <div class="logo-icon">
             <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
               <rect width="40" height="40" rx="8" fill="#4CAF50"/>
               <path d="M20 8C13.37 8 8 13.37 8 20C8 26.63 13.37 32 20 32C26.63 32 32 26.63 32 20C32 13.37 26.63 8 20 8ZM20 30C14.48 30 10 25.52 10 20C10 14.48 14.48 10 20 10C25.52 10 30 14.48 30 20C30 25.52 25.52 30 20 30Z" fill="white"/>
               <path d="M20 12C15.58 12 12 15.58 12 20C12 24.42 15.58 28 20 28C24.42 28 28 24.42 28 20C28 15.58 24.42 12 20 12ZM20 26C16.69 26 14 23.31 14 20C14 16.69 16.69 14 20 14C23.31 14 26 16.69 26 20C26 23.31 23.31 26 20 26Z" fill="white"/>
               <path d="M20 16C17.79 16 16 17.79 16 20C16 22.21 17.79 24 20 24C22.21 24 24 22.21 24 20C24 17.79 22.21 16 20 16Z" fill="white"/>
             </svg>
           </div>
           <span class="logo-text">MelSustain</span>
         </div>
        <h1 class="hero-title">
          Discover Melbourne's Most 
          <span class="highlight">Sustainable Suburbs</span>
        </h1>
        <p class="hero-subtitle">
          Make informed housing decisions with comprehensive sustainability profiles and side-by-side suburb comparisons for Melbourne families.
        </p>
                 <div class="hero-buttons">
                       <button class="btn btn-primary" @click="scrollToSection('explore-section')">
              <svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Explore Suburbs
            </button>
            <button class="btn btn-secondary" @click="scrollToSection('compare-section')">
              <svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M8 3V5M16 3V5M3 8H5M19 8H21M3 12H21M3 16H5M19 16H21M8 19V21M16 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 8V16M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Compare Now
            </button>
         </div>
      </div>
    </header>

    <!-- Explore Sustainable Living Section -->
    <section id="explore-section" class="explore-section">
      <div class="container">
        <h2 class="section-title">Explore Sustainable Living</h2>
        <p class="section-description">
          Discover Melbourne's most sustainable suburbs through our comprehensive sustainability categories.
        </p>
        
        <div class="search-container">
          <div class="search-bar">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <input 
              type="text" 
              placeholder="Enter a suburb name or sustainability feature..."
              class="search-input"
              v-model="suburbInput"
              @keyup.enter="searchSuburb"
            >
            <button class="search-button" @click="searchSuburb">
              <svg class="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

                  <div class="category-filters">
            <button class="category-btn social" @click="navigateToSocial">
              <svg class="category-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Social
            </button>
            <button class="category-btn environment" @click="navigateToEnvironment">
              <svg class="category-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Environment
            </button>
            <button class="category-btn economic">
              <svg class="category-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 3V21H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 9L12 6L16 10L21 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 5V9H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Economic
            </button>
            <button class="category-btn infrastructure">
              <svg class="category-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Infrastructure
            </button>
          </div>

        <!-- Loading state -->
        <div v-if="loading" class="loading-container">
          <div class="loading-spinner"></div>
          <p>Loading suburbs data...</p>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="error-container">
          <div class="error-icon">⚠️</div>
          <p>{{ error }}</p>
          <button class="retry-btn" @click="loadInitialData">Retry</button>
        </div>

        <!-- Suburb cards -->
        <div v-else class="suburb-cards force-horizontal">
          <div 
            v-for="suburb in recommendedSuburbs" 
            :key="suburb.id" 
            class="suburb-card"
          >
            <div class="card-image" :style="{ backgroundImage: `url(${suburb.imageUrl})` }">
              <div class="rating">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                {{ suburb.rating }}
              </div>
            </div>
            <div class="card-content">
              <div class="card-text-content">
                <h3 class="suburb-name">{{ suburb.name }}</h3>
                <p class="suburb-description">{{ suburb.description }}</p>
              </div>
              <div class="card-button-container">
                <button class="view-details-btn" @click="viewSuburbDetails(suburb.name)">
                  <span>View Details</span>
                  <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Fallback cards if no data from API -->
          <div v-if="recommendedSuburbs.length === 0" class="fallback-cards force-horizontal">
            <div class="suburb-card">
              <div class="card-image carlton-image">
                <div class="rating">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  4.8
                </div>
              </div>
              <div class="card-content">
                <div class="card-text-content">
                  <h3 class="suburb-name">Carlton</h3>
                  <p class="suburb-description">A vibrant inner-city suburb known for its cultural diversity and excellent sustainability practices.</p>
                </div>
                <div class="card-button-container">
                  <button class="view-details-btn" @click="viewSuburbDetails('Carlton')">
                    <span>View Details</span>
                    <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div class="suburb-card">
              <div class="card-image fitzroy-image">
                <div class="rating">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  4.7
                </div>
              </div>
              <div class="card-content">
                <div class="card-text-content">
                  <h3 class="suburb-name">Fitzroy</h3>
                  <p class="suburb-description">A trendy and artistic suburb with strong community engagement and green initiatives.</p>
                </div>
                <div class="card-button-container">
                  <button class="view-details-btn" @click="viewSuburbDetails('Fitzroy')">
                    <span>View Details</span>
                    <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="suburb-card">
              <div class="card-image richmond-image">
                <div class="rating">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  4.6
                </div>
              </div>
              <div class="card-content">
                <div class="card-text-content">
                  <h3 class="suburb-name">Richmond</h3>
                  <p class="suburb-description">A dynamic suburb with excellent transport links and growing sustainability infrastructure.</p>
                </div>
                <div class="card-button-container">
                  <button class="view-details-btn" @click="viewSuburbDetails('Richmond')">
                    <span>View Details</span>
                    <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Compare Suburbs Section -->
    <section id="compare-section" class="compare-section">
      <div class="container">
        <h2 class="section-title">Compare Suburbs Side-by-Side</h2>
        <p class="section-description">
          Make confident housing decisions by comparing sustainability metrics between different Melbourne suburbs.
        </p>
        
        <div class="compare-form">
          <div class="suburb-inputs">
            <div class="input-group">
              <label>First Suburb</label>
              <div class="select-wrapper">
                <select class="suburb-select">
                  <option value="">Select first suburb...</option>
                  <option value="carlton">Carlton</option>
                  <option value="fitzroy">Fitzroy</option>
                  <option value="richmond">Richmond</option>
                </select>
                <span class="select-arrow">▼</span>
              </div>
            </div>
            
            <div class="vs-divider">VS</div>
            
            <div class="input-group">
              <label>Second Suburb</label>
              <div class="select-wrapper">
                <select class="suburb-select">
                  <option value="">Select second suburb...</option>
                  <option value="carlton">Carlton</option>
                  <option value="fitzroy">Fitzroy</option>
                  <option value="richmond">Richmond</option>
                </select>
                <span class="select-arrow">▼</span>
              </div>
            </div>
          </div>
          
          <button class="compare-btn">
            <span class="btn-icon">⚖️</span>
            Compare Suburbs
          </button>
        </div>
      </div>
    </section>

    <!-- Why Choose MelSustain Section -->
    <section class="why-section">
      <div class="container">
        <h2 class="section-title">Why Choose MelSustain?</h2>
        <p class="section-description">
          Empowering Melbourne families with comprehensive sustainability data for smarter housing decisions.
        </p>
        
        <div class="feature-cards">
          <div class="feature-card">
            <div class="feature-icon">💡</div>
            <h3>Why MelSustain</h3>
            <p>
              The first comprehensive platform dedicated to Melbourne's suburban sustainability data, 
              helping families make environmentally conscious housing choices with confidence and clarity.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">⚙️</div>
            <h3>How It Works</h3>
            <p>
              Simply search for suburbs, explore detailed sustainability profiles, or compare multiple 
              locations side-by-side. Our intuitive platform makes complex environmental data accessible and actionable.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🏠</div>
            <h3>Benefits for Families</h3>
            <p>
              Make informed decisions that align with your values. Find suburbs with excellent public transport, 
              green spaces, energy efficiency, and environmental sustainability for your family's future.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer Section -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <!-- Left Column - Branding -->
                     <div class="footer-brand">
             <div class="footer-logo">
               <div class="logo-icon">
                 <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                   <rect width="40" height="40" rx="8" fill="#4CAF50"/>
                   <path d="M20 8C13.37 8 8 13.37 8 20C8 26.63 13.37 32 20 32C26.63 32 32 26.63 32 20C32 13.37 26.63 8 20 8ZM20 30C14.48 30 10 25.52 10 20C10 14.48 14.48 10 20 10C25.52 10 30 14.48 30 20C30 25.52 25.52 30 20 30Z" fill="white"/>
                   <path d="M20 12C15.58 12 12 15.58 12 20C12 24.42 15.58 28 20 28C24.42 28 28 24.42 28 20C28 15.58 24.42 12 20 12ZM20 26C16.69 26 14 23.31 14 20C14 16.69 16.69 14 20 14C23.31 14 26 16.69 26 20C26 23.31 23.31 26 20 26Z" fill="white"/>
                   <path d="M20 16C17.79 16 16 17.79 16 20C16 22.21 17.79 24 20 24C22.21 24 24 22.21 24 20C24 17.79 22.21 16 20 16Z" fill="white"/>
                 </svg>
               </div>
               <span class="logo-text">MelSustain</span>
             </div>
            <p class="footer-mission">
              Empowering Melbourne families with sustainability insights for better housing decisions.
            </p>
            <div class="social-icons">
              <a href="#" class="social-icon">🐦</a>
              <a href="#" class="social-icon">📘</a>
              <a href="#" class="social-icon">💼</a>
            </div>
          </div>

          <!-- Middle Columns - Navigation -->
          <div class="footer-nav">
            <div class="nav-column">
              <h4>Platform</h4>
              <ul>
                <li><a href="#">🔍 Search Suburbs</a></li>
                <li><a href="#">⚖️ Compare Tool</a></li>
                <li><a href="#">📊 Sustainability Metrics</a></li>
                <li><a href="#">📄 Data Sources</a></li>
              </ul>
            </div>
            
            <div class="nav-column">
              <h4>Support</h4>
              <ul>
                <li><a href="#">❓ Help Center</a></li>
                <li><a href="#">✉️ Contact Us</a></li>
                <li><a href="#">📄 Privacy Policy</a></li>
                <li><a href="#">📄 Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <!-- Right Column - Newsletter -->
          <div class="footer-newsletter">
            <h4>Connect</h4>
            <p>Stay updated with the latest sustainability insights</p>
            <div class="newsletter-form">
              <input type="email" placeholder="Your email" class="newsletter-input">
              <button class="newsletter-btn">📤</button>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>© 2025 MelSustain. All rights reserved. Made with ❤️ for Melbourne families.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { homepageApi, apiUtils } from '../services/api.js'

export default {
  name: 'HomePage',
  data() {
    return {
      suburbInput: '',
      recommendedSuburbs: [],
      stats: null,
      loading: false,
      error: null
    }
  },
  async mounted() {
    await this.loadInitialData()
  },
  methods: {
    async loadInitialData() {
      this.loading = true
      this.error = null
      
      try {
        // Load recommended suburbs and stats in parallel
        const [suburbsResponse, statsResponse] = await Promise.allSettled([
          homepageApi.getRecommendedSuburbs(3),
          homepageApi.getStats()
        ])

        // Handle recommended suburbs
        if (suburbsResponse.status === 'fulfilled') {
          const suburbsResult = apiUtils.extractData(suburbsResponse.value)
          if (suburbsResult.success) {
            this.recommendedSuburbs = suburbsResult.data || []
          }
        }

        // Handle stats
        if (statsResponse.status === 'fulfilled') {
          const statsResult = apiUtils.extractData(statsResponse.value)
          if (statsResult.success) {
            this.stats = statsResult.data
          }
        }

      } catch (error) {
        console.error('Error loading initial data:', error)
        this.error = 'Failed to load data from server'
      } finally {
        this.loading = false
      }
    },

    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    },

    viewSuburbDetails(suburbName) {
      const name = (suburbName || '').toString();
      if (!name) return;
      this.$router.push({ path: '/social', query: { suburb: name } });
    },

    async searchSuburb() {
      const name = (this.suburbInput || '').trim();
      if (!name) return;
      
      try {
        // Optionally, you could search for the suburb first to validate it exists
        const response = await homepageApi.searchSuburbs(name)
        const result = apiUtils.extractData(response)
        
        if (result.success && result.data && result.data.length > 0) {
          // Suburb found, navigate to social page
          this.$router.push({ path: '/social', query: { suburb: name } });
        } else {
          // Suburb not found, still navigate but let the social page handle it
          this.$router.push({ path: '/social', query: { suburb: name } });
        }
      } catch (error) {
        console.warn('Search validation failed, proceeding anyway:', error)
        // Even if search fails, still navigate
        this.$router.push({ path: '/social', query: { suburb: name } });
      }
    },

    navigateToSocial() {
      this.$router.push('/social');
    },

    navigateToEnvironment() {
      this.$router.push('/environment');
    }
  }
}
</script>

<style scoped>
.homepage {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.6) 100%), 
              url('https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.05) 0%, 
    rgba(255, 255, 255, 0.02) 50%, 
    rgba(255, 255, 255, 0.05) 100%);
  animation: float 25s ease-in-out infinite;
}

.hero-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(76, 175, 80, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(33, 150, 243, 0.1) 0%, transparent 50%),
              linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.2) 100%);
  pointer-events: none;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(1deg); }
}

.hero-content {
  max-width: 1000px;
  position: relative;
  z-index: 3;
  animation: fadeInUp 1s ease-out;
  padding: 0 1rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.5rem;
  font-size: 2rem;
  font-weight: 700;
  animation: slideInDown 1s ease-out 0.2s both;
}

.logo-icon {
  font-size: 2.5rem;
  margin-right: 0.8rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  animation: pulse 2s ease-in-out infinite;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  animation: slideInUp 1s ease-out 0.4s both;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.3);
}

.highlight {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border-radius: 2px;
  transform: scaleX(0);
  animation: expandWidth 1s ease-out 1s forwards;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes expandWidth {
  to {
    transform: scaleX(1);
  }
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  opacity: 0.95;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 1.2rem 2.5rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  animation: slideInUp 1s ease-out 0.6s both;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, #4CAF50, #45a049, #2E7D32);
  color: white;
  background-size: 200% 200%;
  animation: slideInUp 1s ease-out 0.6s both, gradientShift 3s ease infinite;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #45a049, #4CAF50, #2E7D32);
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 15px 35px rgba(76, 175, 80, 0.4);
  background-size: 200% 200%;
  animation: gradientShift 2s ease infinite;
}

.btn-secondary {
  background: linear-gradient(135deg, #6c757d, #5a6268);
  color: white;
}

.btn-secondary:hover {
  background: linear-gradient(135deg, #5a6268, #6c757d);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(108, 117, 125, 0.4);
}

.btn-icon {
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.8rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
    max-width: 500px;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .hero-section {
    background-attachment: scroll;
    min-height: 85vh;
  }
}

/* Explore Section */
.explore-section {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, 
    #f8f9fa 0%, 
    #e9ecef 25%, 
    #f1f3f4 50%, 
    #e3f2fd 75%, 
    #f3e5f5 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  position: relative;
  overflow: hidden;
}

.explore-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(76, 175, 80, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(33, 150, 243, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(156, 39, 176, 0.06) 0%, transparent 50%),
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="%23e9ecef" stroke-width="0.5"/></pattern><pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="1" fill="%23d1d5db" opacity="0.3"/></pattern></defs><rect width="1200" height="800" fill="url(%23grid)"/><rect width="1200" height="800" fill="url(%23dots)"/></svg>');
  opacity: 0.7;
}

/* Add floating geometric shapes */
.explore-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><radialGradient id="float1" cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stop-color="%234CAF50" stop-opacity="0.08"/><stop offset="100%" stop-color="%234CAF50" stop-opacity="0"/></radialGradient><radialGradient id="float2" cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stop-color="%232196F3" stop-opacity="0.06"/><stop offset="100%" stop-color="%232196F3" stop-opacity="0"/></radialGradient><radialGradient id="float3" cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stop-color="%239C27B0" stop-opacity="0.05"/><stop offset="100%" stop-color="%239C27B0" stop-opacity="0"/></radialGradient></defs><circle cx="200" cy="150" r="40" fill="url(%23float1)"/><circle cx="1000" cy="250" r="30" fill="url(%23float2)"/><circle cx="600" cy="400" r="50" fill="url(%23float3)"/><path d="M300 300 L350 280 L400 300 L350 320 Z" fill="url(%23float1)" opacity="0.6"/><path d="M900 180 L950 160 L1000 180 L950 200 Z" fill="url(%23float2)" opacity="0.6"/><circle cx="400" cy="500" r="25" fill="url(%23float3)"/></svg>');
  background-size: cover;
  animation: floatBackground 20s ease-in-out infinite;
  opacity: 0.8;
}



@keyframes shimmer {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

@keyframes floatBackground {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg) scale(1);
    opacity: 0.8;
  }
  25% { 
    transform: translateY(-10px) rotate(1deg) scale(1.02);
    opacity: 0.9;
  }
  50% { 
    transform: translateY(-5px) rotate(-1deg) scale(0.98);
    opacity: 0.7;
  }
  75% { 
    transform: translateY(-15px) rotate(2deg) scale(1.01);
    opacity: 0.85;
  }
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 100% 50%;
  }
  50% {
    background-position: 100% 100%;
  }
  75% {
    background-position: 0% 100%;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
}

.section-description {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.search-container {
  margin-bottom: 3rem;
  position: relative;
}

.search-container::before {
  content: '';
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border-radius: 2px;
  opacity: 0.7;
}

.search-bar {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.98));
  backdrop-filter: blur(25px);
  border-radius: 60px;
  padding: 1.2rem 1.5rem;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.08),
    0 8px 25px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.search-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(76, 175, 80, 0.1), transparent);
  transition: left 0.6s ease;
}

.search-bar:focus-within {
  box-shadow: 
    0 25px 80px rgba(76, 175, 80, 0.2),
    0 12px 35px rgba(76, 175, 80, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  border-color: rgba(76, 175, 80, 0.4);
  transform: translateY(-5px) scale(1.02);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 1));
}

.search-bar:focus-within::before {
  left: 100%;
}

.search-icon {
  padding: 0 1rem;
  color: #666;
  font-size: 1.2rem;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 1rem;
  font-size: 1rem;
  background: transparent;
}

.search-button {
  background: linear-gradient(135deg, #4CAF50, #45a049, #2E7D32);
  color: white;
  border: none;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 25px rgba(76, 175, 80, 0.3),
    0 4px 15px rgba(76, 175, 80, 0.2);
  position: relative;
  overflow: hidden;
  margin-left: 0.5rem;
}

.search-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.search-button:hover {
  background: linear-gradient(135deg, #45a049, #4CAF50, #2E7D32);
  transform: scale(1.15) rotate(8deg);
  box-shadow: 
    0 12px 35px rgba(76, 175, 80, 0.4),
    0 6px 20px rgba(76, 175, 80, 0.3);
}

.search-button:hover::before {
  opacity: 1;
}

.search-button:active {
  transform: scale(0.95);
}

.arrow-icon {
  font-size: 1.2rem;
  font-weight: bold;
}

.category-filters {
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.3rem 2.8rem;
  border: none;
  border-radius: 35px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.98));
  backdrop-filter: blur(20px);
  color: #333;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.08),
    0 4px 15px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.3);
  min-width: 140px;
  justify-content: center;
}

.category-btn.social {
  border-left: 4px solid #2196F3;
}

.category-btn.social:hover {
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(255, 255, 255, 0.95));
  transform: translateY(-5px);
  box-shadow: 
    0 15px 40px rgba(33, 150, 243, 0.2),
    0 8px 25px rgba(33, 150, 243, 0.15);
  border-color: rgba(33, 150, 243, 0.3);
}

.category-btn.social:hover .category-icon {
  color: #1976D2;
  transform: scale(1.1);
}

.category-btn.environment {
  border-left: 4px solid #4CAF50;
}

.category-btn.environment:hover {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(255, 255, 255, 0.95));
  transform: translateY(-5px);
  box-shadow: 
    0 15px 40px rgba(76, 175, 80, 0.2),
    0 8px 25px rgba(76, 175, 80, 0.15);
  border-color: rgba(76, 175, 80, 0.3);
}

.category-btn.environment:hover .category-icon {
  color: #45a049;
  transform: scale(1.1);
}

.category-btn.economic {
  border-left: 4px solid #9C27B0;
}

.category-btn.economic:hover {
  background: linear-gradient(135deg, rgba(156, 39, 176, 0.1), rgba(255, 255, 255, 0.95));
  transform: translateY(-5px);
  box-shadow: 
    0 15px 40px rgba(156, 39, 176, 0.2),
    0 8px 25px rgba(156, 39, 176, 0.15);
  border-color: rgba(156, 39, 176, 0.3);
}

.category-btn.economic:hover .category-icon {
  color: #7B1FA2;
  transform: scale(1.1);
}

.category-btn.infrastructure {
  border-left: 4px solid #FF9800;
}

.category-btn.infrastructure:hover {
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(255, 255, 255, 0.95));
  transform: translateY(-5px);
  box-shadow: 
    0 15px 40px rgba(255, 152, 0, 0.2),
    0 8px 25px rgba(255, 152, 0, 0.15);
  border-color: rgba(255, 152, 0, 0.3);
}

.category-btn.infrastructure:hover .category-icon {
  color: #F57C00;
  transform: scale(1.1);
}

.category-icon {
  font-size: 1.2rem;
  transition: all 0.3s ease;
}



/* Horizontal layout for suburb cards - left, center, right */
.suburb-cards,
.fallback-cards {
  margin-top: 2.5rem;
  padding: 0 1rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}

/* Improved horizontal layout - 3 cards in a row with better spacing */
.force-horizontal {
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important;
  gap: 2.5rem !important;
  width: 100% !important;
  justify-content: center !important;
  align-items: stretch !important;
}

.force-horizontal > .suburb-card {
  display: block !important;
  width: 100% !important;
  margin: 0 !important;
  max-width: 400px !important;
  justify-self: center !important;
}

/* Enhanced responsive design */
@media (max-width: 1200px) {
  .force-horizontal {
    gap: 2rem !important;
    padding: 0 0.5rem !important;
  }
}

@media (max-width: 992px) {
  .force-horizontal {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
    gap: 1.5rem !important;
  }
  
  .force-horizontal > .suburb-card {
    max-width: 350px !important;
  }
}

@media (max-width: 768px) {
  .force-horizontal {
    grid-template-columns: 1fr !important;
    gap: 2rem !important;
    padding: 0 !important;
  }
  
  .force-horizontal > .suburb-card {
    max-width: 100% !important;
  }
}

@media (max-width: 480px) {
  .suburb-cards,
  .fallback-cards {
    padding: 0 0.5rem;
  }
  
  .force-horizontal {
    gap: 1.5rem !important;
  }
}

/* Additional improvements for card content alignment */
.card-text-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-button-container {
  margin-top: auto;
  padding-top: 1rem;
}

.suburb-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.98));
  backdrop-filter: blur(25px);
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.08),
    0 8px 25px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transform: translateY(0);
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 420px;
}

.suburb-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 25px;
}

.suburb-card:hover {
  transform: translateY(-15px) scale(1.05);
  box-shadow: 
    0 30px 80px rgba(0, 0, 0, 0.15),
    0 15px 40px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 1));
  border-color: rgba(255, 255, 255, 0.5);
}

.suburb-card:hover::before {
  opacity: 1;
}

.suburb-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.05), rgba(76, 175, 80, 0));
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 25px;
}

.suburb-card:hover::after {
  opacity: 1;
}

.card-image {
  height: 160px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-size: cover;
  background-position: center;
}

.carlton-image {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 50%, rgba(240, 147, 251, 0.1) 100%), 
              url('https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');
  background-size: cover;
  background-position: center;
}

.fitzroy-image {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(69, 160, 73, 0.1) 50%, rgba(46, 125, 50, 0.1) 100%), 
              url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');
  background-size: cover;
  background-position: center;
}

.richmond-image {
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(245, 124, 0, 0.1) 50%, rgba(230, 81, 0, 0.1) 100%), 
              url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');
  background-size: cover;
  background-position: center;
}


.card-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent 50%, rgba(255, 255, 255, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.suburb-card:hover .card-image::after {
  opacity: 1;
}

.rating {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9));
  backdrop-filter: blur(10px);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.3),
    0 4px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.rating svg {
  color: #FFD700;
  filter: drop-shadow(0 2px 4px rgba(255, 215, 0, 0.3));
}

.card-content {
  padding: 1.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
}

.suburb-name {
  font-size: 1.5rem;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 1.2rem;
  text-align: center;
  position: relative;
}

.suburb-name::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border-radius: 2px;
  opacity: 0.7;
}

.suburb-description {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  text-align: center;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
}



.view-details-btn {
  width: 100%;
  background: linear-gradient(135deg, #4CAF50, #45a049, #2E7D32);
  color: white;
  border: none;
  padding: 1.2rem;
  border-radius: 16px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(76, 175, 80, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.2);
}

.view-details-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
  z-index: 1;
}

.view-details-btn:hover {
  background: linear-gradient(135deg, #45a049, #4CAF50, #2E7D32);
  transform: translateY(-6px) scale(1.02);
  box-shadow: 
    0 20px 50px rgba(76, 175, 80, 0.35),
    0 12px 30px rgba(76, 175, 80, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.3);
}

.view-details-btn:hover::before {
  left: 100%;
}

.view-details-btn:active {
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 12px 30px rgba(76, 175, 80, 0.3);
}

.view-details-btn .btn-icon {
  transition: all 0.3s ease;
}

.view-details-btn:hover .btn-icon {
  transform: translateX(4px) scale(1.1);
}

/* Responsive Design for Cards */
@media (max-width: 768px) {
  .suburb-cards {
    padding: 0 0.5rem;
  }
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

/* Compare Section */
.compare-section {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, 
    #f3e5f5 0%, 
    #e3f2fd 25%, 
    #f1f3f4 50%, 
    #e9ecef 75%, 
    #f8f9fa 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite reverse;
  position: relative;
  overflow: hidden;
}

.compare-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(76, 175, 80, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(33, 150, 243, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(156, 39, 176, 0.06) 0%, transparent 50%),
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="%23e9ecef" stroke-width="0.5"/></pattern><pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="1" fill="%23d1d5db" opacity="0.3"/></pattern></defs><rect width="1200" height="800" fill="url(%23grid)"/><rect width="1200" height="800" fill="url(%23dots)"/></svg>');
  opacity: 0.7;
}

.compare-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><radialGradient id="float4" cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stop-color="%234CAF50" stop-opacity="0.08"/><stop offset="100%" stop-color="%234CAF50" stop-opacity="0"/></radialGradient><radialGradient id="float5" cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stop-color="%232196F3" stop-opacity="0.06"/><stop offset="100%" stop-color="%232196F3" stop-opacity="0"/></radialGradient><radialGradient id="float6" cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stop-color="%239C27B0" stop-opacity="0.05"/><stop offset="100%" stop-color="%239C27B0" stop-opacity="0"/></radialGradient></defs><circle cx="150" cy="200" r="35" fill="url(%23float4)"/><circle cx="950" cy="150" r="45" fill="url(%23float5)"/><circle cx="700" cy="350" r="30" fill="url(%23float6)"/><path d="M250 400 L300 380 L350 400 L300 420 Z" fill="url(%23float4)" opacity="0.6"/><path d="M800 250 L850 230 L900 250 L850 270 Z" fill="url(%23float5)" opacity="0.6"/><circle cx="500" cy="450" r="20" fill="url(%23float6)"/></svg>');
  background-size: cover;
  animation: floatBackground 20s ease-in-out infinite reverse;
  opacity: 0.8;
}

.compare-form {
  max-width: 800px;
  margin: 0 auto;
  margin-top: 3rem;
}

.suburb-inputs {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.input-group {
  flex: 1;
  min-width: 250px;
}

.input-group label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.select-wrapper {
  position: relative;
}

.suburb-select {
  width: 100%;
  padding: 1.2rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  font-size: 1rem;
  appearance: none;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.suburb-select:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.15);
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.98);
}

.select-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  pointer-events: none;
  font-size: 0.8rem;
}

.vs-divider {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-weight: bold;
  font-size: 1rem;
  white-space: nowrap;
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.3);
  animation: pulse 2s ease-in-out infinite;
}

.compare-btn {
  width: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 1.2rem 2rem;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
}

.compare-btn:hover {
  background: linear-gradient(135deg, #764ba2, #667eea);
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
}

/* Responsive Design for Compare */
@media (max-width: 768px) {
  .suburb-inputs {
    flex-direction: column;
    gap: 1rem;
  }
  
  .vs-divider {
    align-self: center;
  }
}

/* Why Choose MelSustain Section */
.why-section {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.why-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400"><defs><radialGradient id="b" cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stop-color="%23ffffff" stop-opacity="0.1"/><stop offset="100%" stop-color="%23ffffff" stop-opacity="0"/></radialGradient></defs><circle cx="300" cy="100" r="60" fill="url(%23b)"/><circle cx="900" cy="200" r="40" fill="url(%23b)"/><circle cx="600" cy="300" r="80" fill="url(%23b)"/><path d="M200 250 L250 200 L300 250 L250 300 Z" fill="url(%23b)" opacity="0.3"/><path d="M1000 150 L1050 100 L1100 150 L1050 200 Z" fill="url(%23b)" opacity="0.3"/></svg>');
  background-size: cover;
  animation: float 25s ease-in-out infinite reverse;
}

.why-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400"><rect width="1200" height="400" fill="%231e3c72"/><circle cx="200" cy="100" r="30" fill="%23fff" opacity="0.05"/><circle cx="1000" cy="150" r="20" fill="%23fff" opacity="0.05"/><path d="M300 200 L350 180 L400 200 L350 220 Z" fill="%23fff" opacity="0.05"/><path d="M800 120 L850 100 L900 120 L850 140 Z" fill="%23fff" opacity="0.05"/><circle cx="600" cy="300" r="25" fill="%23fff" opacity="0.05"/></svg>');
  background-size: cover;
  opacity: 0.3;
}

.why-section .container {
  position: relative;
  z-index: 1;
}

.why-section .section-title {
  color: white;
}

.why-section .section-description {
  color: rgba(255, 255, 255, 0.9);
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.feature-card:hover {
  transform: translateY(-8px) scale(1.02);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  animation: float 3s ease-in-out infinite;
}

.feature-card h3 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: white;
}

.feature-card p {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

/* Responsive Design for Why Section */
@media (max-width: 768px) {
  .feature-cards {
    grid-template-columns: 1fr;
  }
}

/* Footer Section */
.footer {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 4rem 2rem 1rem;
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="1200" height="300" fill="url(%23dots)"/></svg>');
  opacity: 0.3;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-brand {
  max-width: 300px;
}

.footer-logo {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
}

.footer-mission {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1.3rem;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
}

.social-icon:hover {
  background: linear-gradient(135deg, #2980b9, #3498db);
  transform: translateY(-4px) scale(1.1);
  box-shadow: 0 8px 25px rgba(52, 152, 219, 0.4);
}

.footer-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.nav-column h4 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: white;
}

.nav-column ul {
  list-style: none;
  padding: 0;
}

.nav-column li {
  margin-bottom: 0.5rem;
}

.nav-column a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-column a:hover {
  color: white;
}

.footer-newsletter h4 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: white;
}

.footer-newsletter p {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.newsletter-form {
  display: flex;
  gap: 0.5rem;
}

.newsletter-input {
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  outline: none;
}

.newsletter-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.newsletter-btn {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.newsletter-btn:hover {
  background: linear-gradient(135deg, #45a049, #4CAF50);
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 1rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

/* Responsive Design for Footer */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-nav {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .footer-brand {
    max-width: none;
    text-align: center;
  }
  
  .social-icons {
    justify-content: center;
  }
}
</style>
