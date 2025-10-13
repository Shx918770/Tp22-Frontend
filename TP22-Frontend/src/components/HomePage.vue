<template>
  <div class="homepage">
    <!-- Header/Hero Section -->
    <header class="hero-section full-height">
      <div class="hero-bg">
        <img
          src="https://images.unsplash.com/photo-1514395462725-fb4566210144?q=80&w=2071&auto=format&fit=crop"
          alt="Melbourne CBD skyline view"
          class="hero-bg-img"
        />
      </div>
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

        <!-- Ten suburb's button -->
        <div class="suburb-buttons">
          <button v-for="suburb in suburbs" 
                  :key="suburb" 
                  class="suburb-btn" 
                  @click="viewSuburbDetails(suburb)">
            {{ suburb }}
          </button>
        </div>

        <!-- Compare Now button -->
        <div class="hero-buttons">
          <button @click="goComparePage" class="btn btn-secondary">
            <svg class="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M8 3V5M16 3V5M3 8H5M19 8H21M3 12H21M3 16H5M19 16H21M8 19V21M16 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 8V16M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Compare Now
          </button>
        </div>
      </div>
    </header>

    <!-- How to Use & Why Choose MelSustain Section -->
    <section class="guide-section full-height">
      <div class="guide-container">
        <!-- How to Use Steps -->
        <div class="steps-section">
          <div class="section-header">
            <h1 class="module-title">How to Explore Sustainability in Melbourne</h1>
            <p class="module-subtitle">Navigate through our platform effortlessly to find your ideal eco-friendly community</p>
          </div>
          
          <h2 class="section-sub-title">Three Simple Steps</h2>
          <div class="steps-grid">
            <!-- Step 1 -->
            <div class="step-card" data-step="1">
              <div class="step-icon-wrapper">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" class="step-icon">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div class="step-number">1</div>
              </div>
              <h3 class="step-title">Choose a Suburb</h3>
              <p class="step-desc">
                Scroll down or use the search bar on the homepage to explore Melbourne suburbs. Click a suburb card to view its <span class="highlight-text">Sustainability Overview</span>, including Environmental, Infrastructure, and Social insights.
              </p>
            </div>

            <!-- Step 2 -->
            <div class="step-card" data-step="2">
              <div class="step-icon-wrapper">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" class="step-icon">
                  <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div class="step-number">2</div>
              </div>
              <h3 class="step-title">Dive into Details</h3>
              <p class="step-desc">
                On each suburb page, navigate between <span class="highlight-text">Environment</span>, <span class="highlight-text">Infrastructure</span>, and <span class="highlight-text">Social</span> tabs to explore detailed data - such as air quality, tree coverage, public transport, and community facilities.
              </p>
            </div>

            <!-- Step 3 -->
            <div class="step-card" data-step="3">
              <div class="step-icon-wrapper">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" class="step-icon">
                  <path d="M9 11L12 14L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div class="step-number">3</div>
              </div>
              <h3 class="step-title">Compare Suburbs</h3>
              <p class="step-desc">
                Open the <span class="highlight-text">Compare</span> page from the top navigation bar. Select two suburbs and click <span class="highlight-text">"Compare Suburbs"</span> to see a side-by-side sustainability comparison.
              </p>
            </div>
          </div>

          <!-- Call to Action for How to Use -->
          <div class="guide-cta">
            <button @click="scrollToTop" class="start-exploring-btn">
              <span>Start Exploring Now</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Divider -->
        <div class="section-divider"></div>

        <!-- Why Choose Section -->
        <div class="why-section">
          <div class="section-header">
            <h1 class="module-title">Why Choose MelSustain?</h1>
            <p class="module-subtitle">Empowering Melbourne families with comprehensive sustainability data for smarter housing decisions</p>
          </div>
          
          <div class="feature-cards">
            <!-- Feature 1 -->
            <div class="feature-card" data-feature="1">
              <h3>Why MelSustain</h3>
              <p>
                The first comprehensive platform dedicated to Melbourne's suburban sustainability data, helping families make environmentally conscious housing choices with confidence and clarity.
              </p>
            </div>

            <!-- Feature 2 -->
            <div class="feature-card" data-feature="2">
              <h3>How It Works</h3>
              <p>
                Simply search for suburbs, explore detailed sustainability profiles, or compare multiple locations side-by-side. Our intuitive platform makes complex environmental data accessible and actionable.
              </p>
            </div>

            <!-- Feature 3 -->
            <div class="feature-card" data-feature="3">
              <h3>Benefits for Families</h3>
              <p>
                Make informed decisions that align with your values. Find suburbs with excellent public transport, green spaces, energy efficiency, and environmental sustainability for your family's future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sustainability News Section -->
    <section class="news-section">
      <div class="container">
        <h2 class="section-title news-main-title">
          <span class="title-accent">Sustainability</span> News
        </h2>
        <p class="news-intro">
          Discover the latest sustainability stories from Melbourne CBD and surrounding areas — 
          <span class="intro-highlight">Environment • Infrastructure • Social</span> 
          <span class="intro-meta">• Updated every 30min</span>
        </p>

        <!-- Filter Section -->
        <div class="news-filters">
          <div class="filter-group">
            <select v-model="selectedNewsCategory" @change="onNewsCategoryChange" class="news-select">
              <option value="">All Categories</option>
              <option value="environment">Environment</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="social">Social</option>
            </select>
          </div>
          
          <div class="search-group">
            <input 
              v-model="newsSearchKeywords" 
              @keyup.enter="searchNews"
              placeholder="Search news..."
              class="news-search-input"
            />
            <button @click="searchNews" class="search-news-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
                <path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="newsLoading" class="news-loading">
          <div class="loading-spinner"></div>
          <p>Loading news...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="newsError" class="news-error">
          <p>{{ newsError }}</p>
          <button @click="fetchNews" class="retry-btn">Try Again</button>
        </div>

        <!-- News Grid -->
        <div v-else-if="newsList.length > 0" class="news-grid">
          <article 
            v-for="article in newsList" 
            :key="article.id"
            class="news-card"
            @click="openNewsArticle(article)"
          >
            <div class="news-card-image">
              <img 
                :src="article.urlToImage || 'https://via.placeholder.com/400x200?text=News'" 
                :alt="article.title"
                @error="handleNewsImageError"
              />
              <div class="news-category-badge" :class="'badge-' + article.category">
                {{ formatCategory(article.category) }}
              </div>
            </div>
            
            <div class="news-card-content">
              <h3 class="news-title">{{ article.title }}</h3>
              <p class="news-description">{{ truncateText(article.description, 100) }}</p>
              
              <div class="news-meta">
                <span class="news-source">{{ article.source }}</span>
                <span class="news-date">{{ formatNewsDate(article.publishedAt) }}</span>
              </div>
            </div>
          </article>
        </div>

        <!-- No News State -->
        <div v-else class="no-news">
          <p>No news articles found</p>
        </div>

        <!-- Enhanced Pagination -->
        <div v-if="newsTotalPages > 1" class="news-pagination">
          <button 
            @click="changePage(1)" 
            :disabled="newsCurrentPage === 1"
            class="page-btn page-first"
            title="Go to first page"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 17L13 12L18 7M11 17L6 12L11 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            First
          </button>

          <button 
            @click="changePage(newsCurrentPage - 1)" 
            :disabled="newsCurrentPage === 1"
            class="page-btn page-prev"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Prev
          </button>
          
          <div class="page-numbers">
            <button
              v-for="page in displayedPages"
              :key="page"
              @click="changePage(page)"
              :class="['page-number', { active: page === newsCurrentPage }]"
            >
              {{ page }}
            </button>
          </div>

          <button 
            @click="changePage(newsCurrentPage + 1)" 
            :disabled="newsCurrentPage === newsTotalPages"
            class="page-btn page-next"
          >
            Next
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <button 
            @click="changePage(newsTotalPages)" 
            :disabled="newsCurrentPage === newsTotalPages"
            class="page-btn page-last"
            title="Go to last page"
          >
            Last
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 17L11 12L6 7M13 17L18 12L13 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <div class="page-jump">
            <span class="page-info">Page {{ newsCurrentPage }} of {{ newsTotalPages }}</span>
            <div class="jump-controls">
              <input 
                v-model.number="jumpToPage" 
                type="number" 
                :min="1" 
                :max="newsTotalPages"
                placeholder="Go to..."
                class="page-input"
                @keyup.enter="jumpToPageNumber"
              />
              <button @click="jumpToPageNumber" class="jump-btn" title="Jump to page">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- News Modal -->
    <div v-if="selectedNewsArticle" class="modal-overlay" @click="closeNewsModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedNewsArticle.title }}</h2>
          <button @click="closeNewsModal" class="close-button">×</button>
        </div>
        <div class="modal-body">
          <div class="modal-meta">
            <span class="modal-source">{{ selectedNewsArticle.source }}</span>
            <span class="modal-date">{{ formatNewsDate(selectedNewsArticle.publishedAt) }}</span>
            <span class="modal-category" :class="'badge-' + selectedNewsArticle.category">
              {{ formatCategory(selectedNewsArticle.category) }}
            </span>
          </div>
          <img 
            v-if="selectedNewsArticle.urlToImage" 
            :src="selectedNewsArticle.urlToImage" 
            :alt="selectedNewsArticle.title"
            class="modal-image"
            @error="handleNewsImageError"
          />
          <p class="modal-description">{{ selectedNewsArticle.description || 'No description available.' }}</p>
          <div class="modal-actions">
            <a 
              :href="selectedNewsArticle.url" 
              target="_blank" 
              rel="noopener noreferrer"
              class="external-link-button"
            >
              Read Full Article on {{ selectedNewsArticle.source }}
              <svg class="external-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M14 3h7v7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 3 12 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                <path d="M20 14v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

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
          </div>

          <!-- Middle Columns - Navigation -->
          <div class="footer-nav">
            <div class="nav-column">
              <h4>Platform</h4>
              <ul>
                <li><a href="#">🔍 All Suburbs</a></li>
                <li><a href="/#compare-section">⚖️ Compare Tool</a></li>
                <li><a href="#">📄 Data Sources</a></li>
              </ul>
            </div>
            
            <div class="nav-column">
              <h4>Support</h4>
              <ul>
                <!-- <li><a href="#">❓ Help Center</a></li> -->
                <li><a href="#"><router-link to="extraservice#contact">✉️ Contact Us</router-link></a></li>
                <li><a href="#"><router-link to="extraservice#privacy">📄 Privacy Policy</router-link></a></li>
                <li><a href="#"><router-link to="extraservice#terms">📄 Terms of Service</router-link></a></li>
              </ul>
            </div>
          </div>

          <!-- Right Column - Newsletter -->
          <!-- <div class="footer-newsletter">
            <h4>Connect</h4>
            <p>Stay updated with the latest sustainability insights</p>
            <div class="newsletter-form">
              <input type="email" placeholder="Your email" class="newsletter-input">
              <button class="newsletter-btn">📤</button>
            </div>
          </div> -->
        </div>
        
        <div class="footer-bottom">
          <p>© 2025 MelSustain. All rights reserved. Made with ❤️ for Melbourne families.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { homepageApi, apiUtils, newsApi } from '../services/api.js'
import ComparePage from './compare/ComparePage.vue';

export default {
  name: 'HomePage',
  data() {
    return {
      suburbInput: '',
      recommendedSuburbs: [],
      stats: null,
      loading: false,
      error: null,
      // Comparison functionality
      firstSuburb: '',
      secondSuburb: '',
      availableSuburbs: [],
      comparisonData: null,
      comparing: false,
      suburbs: [
        "Carlton",
        "Melbourne",
        "Docklands",
        "East Melbourne",
        "Kensington",
        "North Melbourne",
        "Parkville",
        "South Bank",
        "South Yarra",
        "West Melbourne"
      ],
      // News functionality
      newsList: [],
      allNews: [], // Cache all news data
      newsLoading: false,
      newsError: null,
      selectedNewsCategory: '',
      newsSearchKeywords: '',
      newsCurrentPage: 1,
      newsTotalPages: 0,
      newsTotal: 0,
      selectedNewsArticle: null,
      newsCacheTime: null,
      newsCacheDuration: 30 * 60 * 1000, // 30 minutes cache
      jumpToPage: null // For page jump input
    }
  },
  async mounted() {
    await this.loadInitialData()
    // await this.loadAvailableSuburbs() 
    await this.fetchNews()
    this.initHeroVideoHD()
  },
  computed: {
    canCompare() {
      return this.firstSuburb && this.secondSuburb && this.firstSuburb !== this.secondSuburb
    },
    displayedPages() {
      const pages = []
      const maxPagesToShow = 5
      let startPage = Math.max(1, this.newsCurrentPage - 2)
      let endPage = Math.min(this.newsTotalPages, startPage + maxPagesToShow - 1)
      
      if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1)
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }
      
      return pages
    }
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
            this.recommendedSuburbs = (suburbsResult.data || []).map(suburb => 
              apiUtils.formatSuburbData(suburb)
            ).filter(suburb => suburb !== null)
          } else {
            this.recommendedSuburbs = []
          }
        } else {
          this.recommendedSuburbs = []
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

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },

    viewSuburbDetails(suburbName) {
      localStorage.setItem("selectedSuburb", suburbName)
      const name = (suburbName || '').toString();
      if (!name) return;
      this.$router.push({ path: '/social', query: { suburb: name } });
    },
    
    goComparePage(){
      this.$router.push('/compare')
    },

    // News methods
    async fetchNews() {
      // Check if cache is still valid
      const now = Date.now()
      if (this.allNews.length > 0 && this.newsCacheTime && (now - this.newsCacheTime < this.newsCacheDuration)) {
        console.log('Using cached news data')
        this.applyNewsFilters()
        return
      }

      // Fetch new data
      this.newsLoading = true
      this.newsError = null
      
      try {
        // Load all news at once with a large pageSize
        const response = await newsApi.getMelbourneCBDNews(
          null, // No category filter - get all
          null, // No keywords filter - get all
          1,   // Page 1
          100  // Large page size to get all news
        )
        
        console.log('HomePage news response:', response.data)
        
        if (response.data.success) {
          this.allNews = response.data.data || []
          this.newsCacheTime = Date.now()
          console.log(`Cached ${this.allNews.length} news articles`)
          
          // Apply filters and pagination
          this.applyNewsFilters()
        } else {
          this.newsError = response.data.message || 'Failed to load news'
          this.newsList = []
        }
      } catch (error) {
        console.error('Error fetching news:', error)
        this.newsError = 'Failed to load news. Please try again later.'
        this.newsList = []
      } finally {
        this.newsLoading = false
      }
    },

    applyNewsFilters() {
      let filtered = [...this.allNews]
      
      // Filter by category
      if (this.selectedNewsCategory) {
        filtered = filtered.filter(article => 
          article.category === this.selectedNewsCategory
        )
      }
      
      // Filter by search keywords
      if (this.newsSearchKeywords.trim()) {
        const searchLower = this.newsSearchKeywords.toLowerCase()
        filtered = filtered.filter(article => {
          return article.title?.toLowerCase().includes(searchLower) ||
                 article.description?.toLowerCase().includes(searchLower)
        })
      }
      
      // Calculate pagination
      this.newsTotal = filtered.length
      const pageSize = 6
      this.newsTotalPages = Math.ceil(this.newsTotal / pageSize)
      
      // Ensure current page is valid
      if (this.newsCurrentPage > this.newsTotalPages && this.newsTotalPages > 0) {
        this.newsCurrentPage = 1
      }
      
      // Get current page items
      const startIndex = (this.newsCurrentPage - 1) * pageSize
      const endIndex = startIndex + pageSize
      this.newsList = filtered.slice(startIndex, endIndex)
      
      console.log(`Showing ${this.newsList.length} of ${this.newsTotal} news articles (page ${this.newsCurrentPage}/${this.newsTotalPages})`)
    },

    onNewsCategoryChange() {
      this.newsSearchKeywords = ''
      this.newsCurrentPage = 1
      this.applyNewsFilters()
    },

    searchNews() {
      if (!this.newsSearchKeywords.trim()) {
        this.newsCurrentPage = 1
        this.applyNewsFilters()
        return
      }
      
      this.selectedNewsCategory = ''
      this.newsCurrentPage = 1
      this.applyNewsFilters()
    },

    changePage(page) {
      if (page < 1 || page > this.newsTotalPages) return
      this.newsCurrentPage = page
      this.applyNewsFilters()
      
      // Scroll to news section
      const newsSection = document.querySelector('.news-section')
      if (newsSection) {
        newsSection.scrollIntoView({ behavior: 'smooth' })
      }
    },

    jumpToPageNumber() {
      if (!this.jumpToPage || this.jumpToPage < 1 || this.jumpToPage > this.newsTotalPages) {
        alert(`Please enter a valid page number between 1 and ${this.newsTotalPages}`)
        return
      }
      this.changePage(this.jumpToPage)
      this.jumpToPage = null // Clear input after jump
    },

    openNewsArticle(article) {
      this.selectedNewsArticle = article
      document.body.style.overflow = 'hidden'
    },

    closeNewsModal() {
      this.selectedNewsArticle = null
      document.body.style.overflow = 'auto'
    },

    handleNewsImageError(event) {
      event.target.src = 'https://via.placeholder.com/400x200?text=News+Image'
    },

    formatCategory(category) {
      if (!category) return 'General'
      return category.charAt(0).toUpperCase() + category.slice(1)
    },

    formatNewsDate(dateString) {
      if (!dateString) return 'Unknown date'
      
      try {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-AU', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      } catch (error) {
        return 'Unknown date'
      }
    },

    truncateText(text, maxLength) {
      if (!text) return 'No description available.'
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
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
  position:relative;
  background: none;
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

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.hero-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6) saturate(1.1);
  transform: scale(1.1);
  transition: transform 8s ease-in-out;
  animation: zoomBg 16s ease-in-out infinite alternate;
}

@keyframes zoomBg {
  from {
    transform: scale(1.1);
  }
  to {
    transform: scale(1.2);
  }
}

.hero-section::before,
.hero-section::after { z-index: 1; }
.hero-content { position: relative; z-index: 2; }

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
  text-shadow: none;
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

.full-height {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.suburb-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin: 2rem auto;
  max-width: 1000px;
  justify-content: center;
}

.suburb-btn {
  background: linear-gradient(135deg, #ffffffcc, #ffffffee);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  padding: 1rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.suburb-btn:hover {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(76,175,80,0.4);
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

/* --- Guide Section (How to Use + Why Choose) --- */
.guide-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 50%, #e8f5e9 100%);
  background-size: 400% 400%;
  animation: gradientShift 20s ease infinite;
  position: relative;
  text-align: center;
  padding: 6rem 2rem;
  overflow: hidden;
}

@keyframes gradientShift {
  0%, 100% { 
    background-position: 0% 50%;
  }
  50% { 
    background-position: 100% 50%;
  }
}

.guide-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(76, 175, 80, 0.03) 35px, rgba(76, 175, 80, 0.03) 70px),
    repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(129, 199, 132, 0.03) 35px, rgba(129, 199, 132, 0.03) 70px),
    radial-gradient(circle at 20% 30%, rgba(76, 175, 80, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(129, 199, 132, 0.08) 0%, transparent 50%);
  animation: patternFloat 30s ease-in-out infinite;
  pointer-events: none;
}

@keyframes patternFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: translateY(-20px) rotate(2deg);
    opacity: 0.8;
  }
}

.guide-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 15% 20%, rgba(102, 187, 106, 0.15) 8px, transparent 8px),
    radial-gradient(circle at 85% 80%, rgba(139, 195, 74, 0.12) 6px, transparent 6px),
    radial-gradient(circle at 45% 50%, rgba(76, 175, 80, 0.1) 5px, transparent 5px),
    radial-gradient(circle at 70% 25%, rgba(129, 199, 132, 0.13) 7px, transparent 7px),
    radial-gradient(circle at 25% 75%, rgba(165, 214, 167, 0.11) 6px, transparent 6px),
    linear-gradient(90deg, transparent 49.5%, rgba(76, 175, 80, 0.02) 49.5%, rgba(76, 175, 80, 0.02) 50.5%, transparent 50.5%),
    linear-gradient(0deg, transparent 49.5%, rgba(76, 175, 80, 0.02) 49.5%, rgba(76, 175, 80, 0.02) 50.5%, transparent 50.5%);
  background-size: 
    400px 400px,
    500px 500px,
    350px 350px,
    450px 450px,
    380px 380px,
    80px 80px,
    80px 80px;
  background-position: 
    0 0,
    200px 200px,
    100px 100px,
    300px 50px,
    50px 300px,
    0 0,
    0 0;
  animation: leafPattern 40s linear infinite;
  opacity: 0.6;
  pointer-events: none;
}

@keyframes leafPattern {
  0% {
    background-position: 
      0 0,
      200px 200px,
      100px 100px,
      300px 50px,
      50px 300px,
      0 0,
      0 0;
  }
  100% {
    background-position: 
      400px 400px,
      600px 600px,
      500px 500px,
      750px 450px,
      450px 700px,
      80px 80px,
      80px 80px;
  }
}

.guide-container {
  max-width: 1300px;
  width: 100%;
  position: relative;
  z-index: 1;
}

/* Section Header */
.section-header {
  margin-bottom: 4rem;
  animation: fadeInDown 1s ease-out;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.module-title {
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #1b5e20 0%, #388e3c 30%, #66bb6a 70%, #81c784 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  line-height: 1.2;
  letter-spacing: -1px;
  background-size: 200% auto;
  animation: shimmerText 8s ease-in-out infinite;
}

@keyframes shimmerText {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.module-subtitle {
  font-size: 1.25rem;
  color: #4a6e4f;
  font-weight: 500;
  max-width: 750px;
  margin: 0 auto;
  line-height: 1.6;
  opacity: 0.9;
}

/* Steps Section */
.steps-section {
  margin-bottom: 6rem;
}

.section-sub-title {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(120deg, #1976d2 0%, #42a5f5 50%, #64b5f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 3rem;
  position: relative;
  display: inline-block;
}

.section-sub-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #42a5f5, #64b5f6, #90caf9);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(66, 165, 245, 0.3);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
}

/* Step Cards */
.step-card {
  position: relative;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.3) 100%);
  backdrop-filter: blur(50px) saturate(200%);
  -webkit-backdrop-filter: blur(50px) saturate(200%);
  border-radius: 24px;
  padding: 3rem 2.8rem;
  box-shadow: 
    0 8px 40px rgba(76, 175, 80, 0.15),
    0 4px 20px rgba(76, 175, 80, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.6),
    inset 0 -1px 0 rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.4);
  overflow: visible;
  animation: fadeInUp 0.8s ease-out backwards;
}

.step-card[data-step="1"] { animation-delay: 0.1s; }
.step-card[data-step="2"] { animation-delay: 0.2s; }
.step-card[data-step="3"] { animation-delay: 0.3s; }

/* Step Icon Wrapper */
.step-icon-wrapper {
  position: relative;
  width: 90px;
  height: 90px;
  margin: 0 auto 2rem;
}

.step-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.step-card[data-step="1"] .step-icon {
  color: #4caf50;
  filter: drop-shadow(0 2px 8px rgba(76, 175, 80, 0.3));
}

.step-card[data-step="2"] .step-icon {
  color: #2196f3;
  filter: drop-shadow(0 2px 8px rgba(33, 150, 243, 0.3));
}

.step-card[data-step="3"] .step-icon {
  color: #9c27b0;
  filter: drop-shadow(0 2px 8px rgba(156, 39, 176, 0.3));
}

.step-number {
  position: absolute;
  bottom: -10px;
  right: -10px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  color: white;
  font-size: 1.4rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-card[data-step="1"] .step-number {
  background: linear-gradient(135deg, #4caf50, #66bb6a);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

.step-card[data-step="2"] .step-number {
  background: linear-gradient(135deg, #2196f3, #42a5f5);
  box-shadow: 0 6px 20px rgba(33, 150, 243, 0.4);
}

.step-card[data-step="3"] .step-number {
  background: linear-gradient(135deg, #9c27b0, #ba68c8);
  box-shadow: 0 6px 20px rgba(156, 39, 176, 0.4);
}

/* Step Content */
.step-title {
  font-size: 1.9rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
  letter-spacing: -0.5px;
}

.step-card[data-step="1"] .step-title {
  background: linear-gradient(135deg, #2e7d32 0%, #43a047 50%, #66bb6a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.step-card[data-step="2"] .step-title {
  background: linear-gradient(135deg, #1976d2 0%, #2196f3 50%, #42a5f5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.step-card[data-step="3"] .step-title {
  background: linear-gradient(135deg, #7b1fa2 0%, #9c27b0 50%, #ba68c8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.step-desc {
  color: #37474f;
  font-size: 1.1rem;
  line-height: 1.9;
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 400;
}

/* Highlight Text */
.highlight-text {
  font-weight: 700;
}

.step-card[data-step="1"] .highlight-text {
  color: #2e7d32;
}

.step-card[data-step="2"] .highlight-text {
  color: #1976d2;
}

.step-card[data-step="3"] .highlight-text {
  color: #7b1fa2;
}

/* Features List */
.step-features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.step-features-list li {
  display: flex;
  align-items: flex-start;
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(76, 175, 80, 0.08) 100%);
  border-radius: 12px;
  border-left: 4px solid #4caf50;
  transition: all 0.3s ease;
  font-size: 1rem;
  line-height: 1.6;
  color: #37474f;
}

.step-features-list li::before {
  content: '\2713';
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  margin-right: 12px;
  background: linear-gradient(135deg, #4caf50, #66bb6a);
  color: white;
  border-radius: 50%;
  font-size: 0.85rem;
  font-weight: bold;
  flex-shrink: 0;
}


.step-features-list li strong {
  color: #1b5e20;
  font-weight: 700;
  margin-right: 4px;
}

/* Section Divider */
.section-divider {
  width: 100%;
  max-width: 200px;
  height: 4px;
  background: linear-gradient(90deg, transparent, #4caf50, #81c784, #4caf50, transparent);
  margin: 5rem auto;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
}

.section-divider::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
  animation: dividerShimmer 3s ease-in-out infinite;
}

@keyframes dividerShimmer {
  0%, 100% { left: -100%; }
  50% { left: 150%; }
}

/* Why Choose Section */
.why-section {
  margin-top: 0;
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-bottom: 3rem;
}

.feature-card {
  position: relative;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.3) 100%);
  backdrop-filter: blur(50px) saturate(200%);
  -webkit-backdrop-filter: blur(50px) saturate(200%);
  border-radius: 24px;
  padding: 2.5rem 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 8px 40px rgba(76, 175, 80, 0.15),
    0 4px 20px rgba(76, 175, 80, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.6),
    inset 0 -1px 0 rgba(255, 255, 255, 0.3);
  overflow: visible;
  animation: fadeInUp 0.8s ease-out backwards;
}

.feature-card[data-feature="1"] { animation-delay: 0.1s; }
.feature-card[data-feature="2"] { animation-delay: 0.2s; }
.feature-card[data-feature="3"] { animation-delay: 0.3s; }

.feature-card h3 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.feature-card[data-feature="1"] h3 {
  background: linear-gradient(135deg, #1976d2 0%, #2196f3 50%, #42a5f5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.feature-card[data-feature="2"] h3 {
  background: linear-gradient(135deg, #2e7d32 0%, #43a047 50%, #66bb6a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.feature-card[data-feature="3"] h3 {
  background: linear-gradient(135deg, #f57c00 0%, #ff9800 50%, #ffb74d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.feature-card p {
  color: #555;
  line-height: 1.75;
  font-size: 1.05rem;
}

/* Call to Action Button */
.guide-cta {
  text-align: center;
  margin-top: 3.5rem;
  animation: fadeInUp 1s ease-out 0.6s backwards;
}

.start-exploring-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.4rem 3.5rem;
  background: linear-gradient(135deg, #4caf50, #45a049, #2e7d32);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 10px 35px rgba(76, 175, 80, 0.35);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
}

.start-exploring-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}

.start-exploring-btn:hover::before {
  left: 100%;
}

.start-exploring-btn:hover {
  transform: translateY(-6px) scale(1.08);
  box-shadow: 0 18px 50px rgba(76, 175, 80, 0.45);
}

.start-exploring-btn:active {
  transform: translateY(-3px) scale(1.05);
}

.start-exploring-btn svg {
  transition: transform 0.3s ease;
}

.start-exploring-btn:hover svg {
  transform: translateX(6px);
}

/* Responsive Design for Guide Section */
@media (max-width: 1024px) {
  .module-title {
    font-size: 3rem;
  }
  
  .steps-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .feature-cards {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .guide-section {
    padding: 4rem 1.5rem;
  }

  .module-title {
    font-size: 2.5rem;
  }
  
  .module-subtitle {
    font-size: 1.1rem;
  }

  .section-sub-title {
    font-size: 2rem;
  }
  
  .steps-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .step-card {
    max-width: 550px;
    margin: 0 auto;
    padding: 2.5rem 2rem;
  }

  .feature-cards {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .feature-card {
    max-width: 550px;
    margin: 0 auto;
  }

  .start-exploring-btn {
    padding: 1.2rem 2.8rem;
    font-size: 1.1rem;
  }

  .section-divider {
    margin: 4rem auto;
  }

  .steps-section {
    margin-bottom: 4rem;
  }
}

@media (max-width: 480px) {
  .module-title {
    font-size: 2rem;
    letter-spacing: -0.5px;
  }

  .module-subtitle {
    font-size: 1rem;
  }

  .section-sub-title {
    font-size: 1.7rem;
  }

  .step-card {
    padding: 2rem 1.5rem;
  }

  .step-title {
    font-size: 1.4rem;
  }

  .step-desc {
    font-size: 0.95rem;
  }

  .feature-card h3 {
    font-size: 1.3rem;
  }

  .feature-card p {
    font-size: 0.95rem;
  }

  .start-exploring-btn {
    padding: 1rem 2rem;
    font-size: 1rem;
  }

  .section-divider {
    margin: 3rem auto;
  }

  .steps-section {
    margin-bottom: 3rem;
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  background: linear-gradient(135deg, #4CAF50, #45a049);
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
  background: linear-gradient(135deg, #4CAF50, #45a049);
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
}

/* Comparison Results */
.comparison-results {
  margin-top: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.comparison-results h3 {
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.comparison-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.comparison-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  padding: 1.5rem;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}

.comparison-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.comparison-card h4 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
}

.comparison-card .rating {
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #4CAF50;
  margin-bottom: 1.5rem;
}

.scores {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.score-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.score-item span:first-child {
  font-weight: 600;
  color: #2c3e50;
}

.score-item span:last-child {
  font-weight: 700;
  color: #4CAF50;
}

.compare-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.loading-spinner-small {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-left: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
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
  
  .comparison-cards {
    grid-template-columns: 1fr;
  }
  
  .comparison-results {
    padding: 1.5rem;
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

.footer .footer-brand,
.footer .footer-brand * {
  text-align: left;
}

.footer .footer-nav,
.footer .nav-column,
.footer .nav-column h4 {
  text-align: left;
}

.footer .nav-column ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.footer .nav-column a {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: flex-start;
}

.footer .container {
  text-align: left;
}

.footer .footer-bottom {
  text-align: center;
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

/* News Section Styles */
.news-section {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
  overflow: hidden;
}

.news-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(76, 175, 80, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(33, 150, 243, 0.06) 0%, transparent 50%);
  opacity: 0.7;
}

.news-section .container {
  position: relative;
  z-index: 1;
}

/* Beautiful News Title */
.news-main-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
  position: relative;
  display: inline-block;
  width: 100%;
}

.title-accent {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 900;
  position: relative;
}

.title-accent::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border-radius: 2px;
  opacity: 0.5;
}

/* News Introduction */
.news-intro {
  max-width: 800px;
  margin: 0 auto 2.5rem;
  text-align: center;
  font-size: 1.15rem;
  color: #666;
  line-height: 1.8;
  font-weight: 400;
}

.intro-highlight {
  color: #4CAF50;
  font-weight: 600;
}

.intro-meta {
  color: #999;
  font-size: 0.95rem;
}

.news-filters {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.filter-group {
  position: relative;
}

.news-select {
  padding: 0.75rem 2.5rem 0.75rem 1.25rem;
  border: 2px solid rgba(76, 175, 80, 0.3);
  border-radius: 12px;
  background: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234CAF50' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  min-width: 180px;
}

.news-select:hover,
.news-select:focus {
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.2);
}

.search-group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.news-search-input {
  padding: 0.75rem 1.25rem;
  border: 2px solid rgba(76, 175, 80, 0.3);
  border-radius: 12px;
  font-size: 1rem;
  min-width: 250px;
  transition: all 0.3s ease;
}

.news-search-input:focus {
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.2);
}

.search-news-btn {
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-news-btn:hover {
  background: linear-gradient(135deg, #45a049, #4CAF50);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.3);
}

.news-loading {
  text-align: center;
  padding: 4rem 2rem;
}

.news-error {
  text-align: center;
  padding: 3rem 2rem;
  background: rgba(244, 67, 54, 0.1);
  border-radius: 12px;
  margin: 2rem 0;
}

.news-error p {
  color: #d32f2f;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.news-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.news-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.news-card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.news-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-card:hover .news-card-image img {
  transform: scale(1.05);
}

.news-category-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
}

.badge-environment {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.9), rgba(46, 125, 50, 0.9));
}

.badge-infrastructure {
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.9), rgba(25, 118, 210, 0.9));
}

.badge-social {
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.9), rgba(245, 124, 0, 0.9));
}

.news-card-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.news-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.news-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
  flex-grow: 1;
}

.news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #888;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
}

.news-source {
  font-weight: 600;
  color: #4CAF50;
}

.no-news {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  font-size: 1.1rem;
}

.news-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin-top: 3rem;
  flex-wrap: wrap;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.page-btn {
  padding: 0.6rem 1rem;
  background: white;
  border: 2px solid rgba(76, 175, 80, 0.3);
  border-radius: 8px;
  color: #4CAF50;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
}

.page-btn:hover:not(:disabled) {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-btn svg {
  width: 14px;
  height: 14px;
}

.page-numbers {
  display: flex;
  gap: 0.4rem;
}

.page-number {
  min-width: 38px;
  height: 38px;
  padding: 0 0.5rem;
  border: 2px solid rgba(76, 175, 80, 0.3);
  border-radius: 8px;
  background: white;
  color: #4CAF50;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-number:hover {
  background: rgba(76, 175, 80, 0.1);
  border-color: #4CAF50;
  transform: translateY(-2px);
}

.page-number.active {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  border-color: #4CAF50;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

/* Page Jump Controls */
.page-jump {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-left: 1rem;
  border-left: 2px solid rgba(76, 175, 80, 0.2);
  margin-left: 0.5rem;
}

.page-info {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
  white-space: nowrap;
}

.jump-controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.page-input {
  width: 70px;
  padding: 0.5rem 0.75rem;
  border: 2px solid rgba(76, 175, 80, 0.3);
  border-radius: 6px;
  font-size: 0.9rem;
  text-align: center;
  transition: all 0.3s ease;
}

.page-input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.page-input::placeholder {
  color: #aaa;
  font-size: 0.85rem;
}

/* Remove number input arrows */
.page-input::-webkit-outer-spin-button,
.page-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.page-input[type=number] {
  appearance: textfield;
  -moz-appearance: textfield;
}

.jump-btn {
  padding: 0.5rem;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.jump-btn:hover {
  background: linear-gradient(135deg, #45a049, #4CAF50);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.jump-btn svg {
  width: 16px;
  height: 16px;
}

/* News Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.4;
  color: #2c3e50;
  flex: 1;
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  flex-shrink: 0;
}

.close-button:hover {
  background: #f5f5f5;
  color: #333;
}

.modal-body {
  padding: 1rem 2rem 2rem;
}

.modal-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.modal-source {
  font-weight: 600;
  color: #4CAF50;
}

.modal-date {
  color: #666;
}

.modal-category {
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.modal-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.modal-description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #333;
  margin-bottom: 2rem;
}

.modal-actions {
  text-align: center;
}

.external-link-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.external-link-button:hover {
  background: linear-gradient(135deg, #45a049, #4CAF50);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
}

.external-icon {
  font-size: 1.2rem;
}

/* Responsive Design for News Section */
@media (max-width: 768px) {
  .news-section {
    padding: 4rem 1rem;
  }

  .news-main-title {
    font-size: 2.5rem;
  }

  .news-intro {
    font-size: 1rem;
  }

  .intro-highlight {
    display: block;
    margin-top: 0.5rem;
  }

  .intro-meta {
    font-size: 0.85rem;
  }

  .news-filters {
    flex-direction: column;
    gap: 1rem;
  }

  .news-select,
  .news-search-input {
    width: 100%;
    min-width: auto;
  }

  .search-group {
    width: 100%;
  }

  .news-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .news-pagination {
    gap: 0.5rem;
    padding: 1rem;
    flex-direction: column;
  }

  .page-btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }

  .page-btn svg {
    width: 12px;
    height: 12px;
  }

  .page-first,
  .page-last {
    display: none;
  }

  .page-number {
    min-width: 34px;
    height: 34px;
    font-size: 0.9rem;
  }

  .page-jump {
    border-left: none;
    border-top: 2px solid rgba(76, 175, 80, 0.2);
    padding-left: 0;
    padding-top: 1rem;
    margin-left: 0;
    width: 100%;
    flex-direction: column;
    gap: 0.75rem;
  }

  .jump-controls {
    width: 100%;
    justify-content: center;
  }

  .page-input {
    flex: 1;
    max-width: 100px;
  }

  .modal-overlay {
    padding: 1rem;
  }

  .modal-header {
    padding: 1.5rem 1.5rem 1rem;
  }

  .modal-body {
    padding: 1rem 1.5rem 1.5rem;
  }

  .modal-image {
    height: 200px;
  }

  .modal-header h2 {
    font-size: 1.3rem;
  }

  .modal-description {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .news-main-title {
    font-size: 2rem;
  }

  .news-intro {
    font-size: 0.95rem;
  }

  .page-numbers {
    gap: 0.25rem;
  }

  .page-number {
    min-width: 32px;
    height: 32px;
    font-size: 0.85rem;
  }
}
</style>
