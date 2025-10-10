<template>
  <div class="news-page">
    <!-- Navigation Header -->
    <Header />
    
    <!-- Header Section -->
    <div class="news-header">
      <div class="header-content">
        <h1 class="page-title">
          <svg class="icon-news" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M4 5h12a2 2 0 0 1 2 2v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V5z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M6 7h8M6 10h10M6 13h7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M18 7h2v10a2 2 0 0 1-2 2v-12z" fill="currentColor" opacity=".2"/>
          </svg>
          Sustainability News
        </h1>
        <p class="page-subtitle">
          Stay updated with the latest news about sustainability, infrastructure, and social developments
          <span v-if="selectedSuburb"> in {{ selectedSuburb }}</span>
        </p>
        <div class="quick-chips">
          <button class="chip" @click="selectCategoryChip('environment')">Environment</button>
          <button class="chip" @click="selectCategoryChip('infrastructure')">Infrastructure</button>
          <button class="chip" @click="selectCategoryChip('social')">Social</button>
          <button class="chip" @click="selectCategoryChip('general')">General</button>
        </div>
      </div>
    </div>

    <!-- Filter Section -->
    <div class="filter-section">
      <div class="filter-container">
        <div class="filter-group">
          <label class="filter-label">Category:</label>
          <select v-model="selectedCategory" @change="onCategoryChange" class="filter-select">
            <option value="all">All Categories</option>
            <option value="environment">Environment</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="social">Social</option>
            <option value="general">General</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label class="filter-label">Search:</label>
          <div class="search-container">
            <input 
              v-model="searchKeywords" 
              @keyup.enter="searchNews"
              placeholder="Search news..."
              class="search-input"
            />
            <button @click="searchNews" class="search-button" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8"/>
                <path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        <button @click="refreshNews" class="refresh-button" :disabled="loading">
          <svg class="refresh-icon" :class="{ spinning: loading }" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 12a8 8 0 1 1-2.343-5.657" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
            <path d="M20 6v4h-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Refresh
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading news...</p>
    </div>

    <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <div class="error-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9v4" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round"/>
            <path d="M12 17h.01" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round"/>
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="#ff6b6b" stroke-width="1.5"/>
          </svg>
        </div>
      <h3>Unable to Load News</h3>
      <p>{{ error }}</p>
      <button @click="fetchNews" class="retry-button">Try Again</button>
    </div>

    <!-- News Grid -->
      <div v-else class="news-content">
      <div v-if="filteredNews.length === 0" class="no-news">
        <div class="no-news-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 7h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z" stroke="#9aa1ac" stroke-width="1.5"/>
            <path d="M7 7V6a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1" stroke="#9aa1ac" stroke-width="1.5"/>
          </svg>
        </div>
        <h3>No News Found</h3>
        <p>Try adjusting your filters or search terms.</p>
      </div>

      <div v-else class="news-grid">
        <article 
          v-for="article in filteredNews" 
          :key="article.id"
          class="news-card"
          @click="openArticle(article)"
        >
          <div class="card-image">
            <img 
              :src="article.urlToImage || '/api/placeholder/400/200'" 
              :alt="article.title"
              @error="handleImageError"
              loading="lazy"
            />
            <div class="category-badge" :class="getCategoryClass(article.category)">
              {{ formatCategory(article.category) }}
            </div>
          </div>
          
          <div class="card-content">
            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-description">{{ truncateDescription(article.description) }}</p>
            
            <div class="article-meta">
              <span class="source">{{ article.source }}</span>
              <span class="date">{{ formatDate(article.publishedAt) }}</span>
            </div>
          </div>
          
          <div class="card-footer">
            <button class="read-more-btn">
              Read Full Article
              <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </article>
      </div>

      <!-- Load More Button -->
      <div v-if="hasMoreNews" class="load-more-container">
        <button @click="loadMoreNews" class="load-more-button" :disabled="loadingMore">
          <span v-if="loadingMore" class="loading-spinner small"></span>
          {{ loadingMore ? 'Loading...' : 'Load More News' }}
        </button>
      </div>
    </div>

    <!-- News Modal -->
    <div v-if="selectedArticle" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedArticle.title }}</h2>
          <button @click="closeModal" class="close-button">×</button>
        </div>
        <div class="modal-body">
          <div class="modal-meta">
            <span class="modal-source">{{ selectedArticle.source }}</span>
            <span class="modal-date">{{ formatDate(selectedArticle.publishedAt) }}</span>
          </div>
          <img 
            v-if="selectedArticle.urlToImage" 
            :src="selectedArticle.urlToImage" 
            :alt="selectedArticle.title"
            class="modal-image"
          />
          <p class="modal-description">{{ selectedArticle.description }}</p>
          <div class="modal-actions">
            <a 
              :href="selectedArticle.url" 
              target="_blank" 
              rel="noopener noreferrer"
              class="external-link-button"
            >
              Read Full Article on {{ selectedArticle.source }}
              <svg class="external-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 3h7v7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 3 12 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                <path d="M20 14v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { newsApi } from '@/services/api'
import Header from '@/components/header/Header.vue'

export default {
  name: 'NewsPage',
  components: {
    Header
  },
  data() {
    return {
      news: [],
      filteredNews: [],
      loading: false,
      loadingMore: false,
      error: null,
      selectedCategory: 'all',
      searchKeywords: '',
      selectedArticle: null,
      currentPage: 1,
      hasMoreNews: false,
      totalNews: 0
    }
  },
  computed: {
    selectedSuburb() {
      return this.$route?.query?.suburb || ''
    }
  },
  mounted() {
    this.fetchNews()
  },
  watch: {
    '$route.query.suburb'() {
      this.fetchNews()
    }
  },
  methods: {
    async fetchNews() {
      this.loading = true
      this.error = null
      this.currentPage = 1
      
      try {
        let response
        
        // Always get all news for the suburb first
        response = await newsApi.getNewsBySuburb(this.selectedSuburb || 'Melbourne')
        
        if (response.data.success) {
          this.news = response.data.data || []
          this.totalNews = response.data.total || 0
          // Apply frontend filtering based on category and search
          this.applyFilters()
          this.hasMoreNews = false
        } else {
          throw new Error(response.data.message || 'Failed to fetch news')
        }
      } catch (error) {
        console.error('Error fetching news:', error)
        this.error = 'Failed to load news. Please try again later.'
        this.news = []
        this.filteredNews = []
      } finally {
        this.loading = false
      }
    },
    
    applyFilters() {
      let filtered = [...this.news]
      
      // Filter by category
      if (this.selectedCategory === 'all') {
        // All category: exclude General type
        filtered = filtered.filter(article => article.category !== 'general')
      } else {
        // Specific category: only show that category
        filtered = filtered.filter(article => article.category === this.selectedCategory)
      }
      
      // Filter by search keywords
      if (this.searchKeywords.trim()) {
        const searchLower = this.searchKeywords.toLowerCase()
        filtered = filtered.filter(article => {
          return article.title?.toLowerCase().includes(searchLower) ||
                 article.description?.toLowerCase().includes(searchLower)
        })
      }
      
      this.filteredNews = filtered
    },
    
    onCategoryChange() {
      // Clear search when changing category
      this.searchKeywords = ''
      this.applyFilters()
    },
    
    selectCategoryChip(category) {
      // Clear search and set category
      this.searchKeywords = ''
      this.selectedCategory = category
      this.applyFilters()
    },

    async searchNews() {
      if (!this.searchKeywords.trim()) {
        this.applyFilters()
        return
      }
      
      // Apply filters with search keywords
      this.applyFilters()
    },

    async loadMoreNews() {
      if (this.loadingMore || !this.hasMoreNews) return
      
      this.loadingMore = true
      this.currentPage++
      
      try {
        // In a real implementation, you would pass page parameter to API
        // For now, we'll simulate loading more news
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.hasMoreNews = false // Simulate no more news
      } catch (error) {
        console.error('Error loading more news:', error)
        this.currentPage--
      } finally {
        this.loadingMore = false
      }
    },


    refreshNews() {
      this.fetchNews()
    },

    openArticle(article) {
      this.selectedArticle = article
      document.body.style.overflow = 'hidden'
    },

    closeModal() {
      this.selectedArticle = null
      document.body.style.overflow = 'auto'
    },

    handleImageError(event) {
      event.target.src = 'https://via.placeholder.com/400x200?text=News+Image'
    },

    truncateDescription(description) {
      if (!description) return 'No description available.'
      return description.length > 150 ? description.substring(0, 150) + '...' : description
    },

    formatDate(dateString) {
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

    formatCategory(category) {
      if (!category) return 'General'
      return category.charAt(0).toUpperCase() + category.slice(1)
    },

    getCategoryClass(category) {
      const categoryClasses = {
        environment: 'category-environment',
        infrastructure: 'category-infrastructure',
        social: 'category-social',
        general: 'category-general'
      }
      return categoryClasses[category] || 'category-general'
    }
  }
}
</script>

<style scoped>
.news-page {
  min-height: 100vh;
  background:
    radial-gradient(1200px 600px at 10% -10%, rgba(76, 175, 80, 0.08), transparent 60%),
    radial-gradient(1200px 600px at 110% 10%, rgba(33, 150, 243, 0.08), transparent 60%),
    linear-gradient(135deg, #f7f9fc 0%, #eaf1f8 100%);
  padding-top: calc(var(--nav-height, 80px) + 2rem);
  font-family: 'Poppins', system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

/* Header Section */
.news-header {
  background: linear-gradient(135deg, #4CAF50 0%, #2196F3 100%);
  color: white;
  padding: 3rem 0;
  margin-bottom: 2rem;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

.page-title {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.icon {
  font-size: 2rem;
}

.icon-news { color: #fff; }

.page-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.quick-chips {
  margin-top: 1.25rem;
  display: flex;
  gap: .5rem;
  justify-content: center;
}

.chip {
  padding: .4rem .9rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.6);
  background: rgba(255,255,255,.15);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: all .2s ease;
}

.chip:hover { background: rgba(255,255,255,.25); transform: translateY(-1px); }

/* Filter Section */
.filter-section {
  max-width: 1200px;
  margin: 0 auto 2rem;
  padding: 0 2rem;
}

.filter-container {
  background: rgba(255,255,255,.7);
  padding: 1.25rem 1.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(31,38,135,.1);
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  align-items: center;
  backdrop-filter: blur(6px);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-label {
  font-weight: 600;
  color: #333;
  white-space: nowrap;
}

.filter-select {
  padding: 0.5rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #667eea;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-input {
  padding: 0.5rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  width: 200px;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
}

.search-button {
  padding: 0.5rem 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background: #5a6fd8;
}

.refresh-button {
  padding: 0.5rem 1rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s ease;
  margin-left: auto;
}

.refresh-button:hover:not(:disabled) {
  background: #45a049;
}

.refresh-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.refresh-icon {
  transition: transform 0.5s ease;
}

.refresh-icon.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Loading and Error States */
.loading-container, .error-container {
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

.loading-spinner.small {
  width: 20px;
  height: 20px;
  border-width: 2px;
}

.error-container {
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.retry-button {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.retry-button:hover {
  background: #5a6fd8;
}

/* News Content */
.news-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
}

.no-news {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.no-news-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

/* News Cards */
.news-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.card-image {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-card:hover .card-image img {
  transform: scale(1.05);
}

.category-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.category-environment {
  background: #4CAF50;
}

.category-infrastructure {
  background: #2196F3;
}

.category-social {
  background: #FF9800;
}

.category-general {
  background: #9C27B0;
}

.card-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.article-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.article-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
  flex-grow: 1;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #888;
  margin-top: auto;
}

.source {
  font-weight: 600;
}

.card-footer {
  padding: 0 1.5rem 1.5rem;
}

.read-more-btn {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #4CAF50 0%, #2196F3 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: transform 0.3s ease;
}

.read-more-btn:hover {
  transform: translateY(-2px);
}

.arrow {
  transition: transform 0.3s ease;
}

.read-more-btn:hover .arrow {
  transform: translateX(5px);
}

/* Load More */
.load-more-container {
  text-align: center;
  margin-top: 3rem;
}

.load-more-button {
  padding: 1rem 2rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s ease;
}

.load-more-button:hover:not(:disabled) {
  background: #5a6fd8;
}

.load-more-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Modal */
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
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
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
  color: #333;
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
  color: #666;
}

.modal-source {
  font-weight: 600;
}

.modal-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: transform 0.3s ease;
}

.external-link-button:hover {
  transform: translateY(-2px);
}

.external-icon {
  font-size: 1.2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .news-page {
    padding-top: calc(var(--nav-height, 80px) + 1rem);
  }

  .page-title {
    font-size: 2rem;
  }

  .filter-container {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .filter-group {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }

  .search-input {
    width: 100%;
  }

  .refresh-button {
    margin-left: 0;
  }

  .news-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
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
}

@media (max-width: 480px) {
  .header-content {
    padding: 0 1rem;
  }

  .page-title {
    font-size: 1.8rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .news-content {
    padding: 0 1rem 2rem;
  }

  .filter-section {
    padding: 0 1rem;
  }
}
</style>
