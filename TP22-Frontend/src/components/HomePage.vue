<template>
  <div class="homepage">
    <!-- Header/Hero Section -->
    <header class="hero-section full-height">
      <div class="yt-bg">
        <iframe
          id="heroYt"
          class="yt-iframe"
          src="https://www.youtube.com/embed/nwgexI6ZKyY?autoplay=1&mute=1&loop=1&playlist=nwgexI6ZKyY&controls=0&modestbranding=1&showinfo=0&playsinline=1&rel=0&start=291&enablejsapi=1"
          title="YouTube video background"
          frameborder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen
        ></iframe>
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

    <!-- Why Choose MelSustain Section -->
    <section class="why-section">
      <div class="container">
        <h2 class="section-title">Why Choose MelSustain?</h2>
        <p class="section-description">
          Empowering Melbourne families with comprehensive sustainability data for smarter housing decisions.
        </p>
        
        <div class="feature-cards">
          <!-- Why MelSustain -->
          <div class="feature-card">
            <div class="feature-icon why-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M9 21H15M10 17H14M12 2C8.13 2 5 5.13 5 9C5 11.39 6.22 13.47 8.06 14.74C8.55 15.07 9 15.5 9 16V18H15V16C15 15.5 15.45 15.07 15.94 14.74C17.78 13.47 19 11.39 19 9C19 5.13 15.87 2 12 2Z" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <h3>Why MelSustain</h3>
            <p>
              The first comprehensive platform dedicated to Melbourne's suburban sustainability data, 
              helping families make environmentally conscious housing choices with confidence and clarity.
            </p>
          </div>
          <!-- How It Works -->
          <div class="feature-card">
            <div class="feature-icon how-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 15.5C13.3807 15.5 14.5 14.3807 14.5 13C14.5 11.6193 13.3807 10.5 12 10.5C10.6193 10.5 9.5 11.6193 9.5 13C9.5 14.3807 10.6193 15.5 12 15.5Z" stroke="currentColor" stroke-width="2"/>
                <path d="M19.4 15A7.963 7.963 0 0020 13C20 8.58 16.42 5 12 5C7.58 5 4 8.58 4 13C4 14.48 4.43 15.85 5.2 17L3 21L7 18.8C8.15 19.57 9.52 20 11 20C15.42 20 19 16.42 19 12" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <h3>How It Works</h3>
            <p>
              Simply search for suburbs, explore detailed sustainability profiles, or compare multiple 
              locations side-by-side. Our intuitive platform makes complex environmental data accessible and actionable.
            </p>
          </div>
          <!-- Benefits for Families -->
          <div class="feature-card">
            <div class="feature-icon family-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 7C13.6569 7 15 5.65685 15 4C15 2.34315 13.6569 1 12 1C10.3431 1 9 2.34315 9 4C9 5.65685 10.3431 7 12 7Z" stroke="currentColor" stroke-width="2"/>
                <path d="M17 21V19C17 17.3431 15.6569 16 14 16H10C8.34315 16 7 17.3431 7 19V21" stroke="currentColor" stroke-width="2"/>
                <path d="M4 21V19C4 16.7909 5.79086 15 8 15H9" stroke="currentColor" stroke-width="2"/>
                <path d="M20 21V19C20 16.7909 18.2091 15 16 15H15" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <h3>Benefits for Families</h3>
            <p>
              Make informed decisions that align with your values. Find suburbs with excellent public transport, 
              green spaces, energy efficiency, and environmental sustainability for your family's future.
            </p>
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
        "Southbank",
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
    await this.loadAvailableSuburbs()
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

    initHeroVideoHD() {
      const ensureHD = (player) => {
        // 优先尝试 highres，不行就 hd1080
        player.setPlaybackQuality && player.setPlaybackQuality('highres')
        player.setPlaybackQuality && player.setPlaybackQuality('hd1080')
      }

      const mountBadge = () => {
        let el = document.getElementById('yt-quality-badge')
        if (!el) {
          el = document.createElement('div')
          el.id = 'yt-quality-badge'
          el.style.cssText = `
            position: absolute; right: 10px; bottom: 10px; z-index: 5;
            background: rgba(0,0,0,.55); color:#fff; padding:6px 10px;
            border-radius: 12px; font: 600 12px/1.2 Inter,system-ui,sans-serif;
            letter-spacing:.3px; backdrop-filter: blur(4px);
          `
          document.querySelector('.hero-section')?.appendChild(el)
        }
        return el
      }

      const updateBadge = (q) => {
        const el = mountBadge()
        el.textContent = `Come from: https://www.youtube.com/watch?v=nwgexI6ZKyY, Quality: ${q || '—'}`
      }

      const logQualities = (player) => {
        try {
          const cur = player.getPlaybackQuality?.()
          const avl = player.getAvailableQualityLevels?.()
          console.log('[YT] current quality =', cur)
          console.log('[YT] available levels =', avl)
          updateBadge(cur)
        } catch (e) {}
      }

      // 如果当前质量低于 1080，尝试再拉一把
      const nudgeIfBelow1080 = (player) => {
        const order = ['highres','hd2160','hd1440','hd1080','hd720','large','medium','small','tiny','auto']
        const q = player.getPlaybackQuality?.() || ''
        if (order.indexOf(q) > order.indexOf('hd1080')) {
          ensureHD(player)
        }
      }

      const create = () => {
        this.ytPlayer = new window.YT.Player('heroYt', {
          events: {
            onReady: (e) => {
              window.heroPlayer = e.target;
              // 先保证在播，再设清晰度
              e.target.mute()
              e.target.playVideo()
              ensureHD(e.target)
              // 播放开始后再“补打一针”，避免被自适应降回去
              setTimeout(() => {
                logQualities(e.target);
                ensureHD(e.target);}, 800);

                this._qualityTimer && clearInterval(this._qualityTimer)
                this._qualityTimer = setInterval(() => {
                  const q = e.target.getPlaybackQuality?.();
                  updateBadge(q);
                  nudgeIfBelow1080(e.target)
                }, 2000);
            },
            onStateChange: (e) => {
              if (e.data === window.YT.PlayerState.PLAYING) {
                ensureHD(e.target)
                setTimeout(() => ensureHD(e.target), 1200)
                logQualities(e.target)
              }
            },
            onPlaybackQualityChange: (e) => {
              console.log('[YT] onPlaybackQualityChange =>', e.data)
              updateBadge(e.data)
            }
          }
        })
      }

      if (window.YT && window.YT.Player) {
        create()
      } else {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(tag)
        window.onYouTubeIframeAPIReady = create
      }
    },
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

    viewSuburbDetails(suburbName) {
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

.yt-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.9; 
}

.yt-iframe {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120vw; 
  height: 67.5vw;   
  min-width: 177.78vh;  
  min-height: 100vh;
  transform: translate(-50%, -50%);
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

/* Why Choose MelSustain Section */
.why-section {
  padding: 6rem 2rem;
  color: white;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url('/img/why-bg.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
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
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255,255,255,0.4);
}

.feature-icon svg {
  color: currentColor;
}

.feature-icon.why-icon {
  background: linear-gradient(135deg, rgba(33,150,243,0.2), rgba(33,150,243,0.3));
  color: #2196F3;
}

.feature-icon.how-icon {
  background: linear-gradient(135deg, rgba(76,175,80,0.2), rgba(76,175,80,0.3));
  color: #fff;
}

.feature-icon.family-icon {
  background: linear-gradient(135deg, rgba(255,152,0,0.2), rgba(255,152,0,0.3));
  color: #FF9800;
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
