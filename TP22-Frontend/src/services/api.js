import axios from 'axios'

// Create axios instance with default configuration
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    console.error('API Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url)
    return response
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data)
    return Promise.reject(error)
  }
)

// Homepage API
export const homepageApi = {
  // Get recommended suburbs
  getRecommendedSuburbs(limit = 3) {
    return api.get(`/homepage/recommended-suburbs?limit=${limit}`)
  },

  // Search suburbs
  searchSuburbs(name) {
    const params = name ? `?name=${encodeURIComponent(name)}` : ''
    return api.get(`/homepage/search-suburbs${params}`)
  },

  // Get homepage statistics
  getStats() {
    return api.get('/homepage/stats')
  },

  // Get suburbs by rating range
  getSuburbsByRating(minRating, maxRating) {
    const params = new URLSearchParams()
    if (minRating !== undefined) params.append('minRating', minRating)
    if (maxRating !== undefined) params.append('maxRating', maxRating)
    return api.get(`/homepage/suburbs-by-rating?${params.toString()}`)
  },

  // Health check
  healthCheck() {
    return api.get('/homepage/health')
  },
}

// Social API
export const socialApi = {
  // Get facility statistics by suburb name
  getFacilityStats(suburb) {
    return api.get(`/social/facilities/stats?suburb=${encodeURIComponent(suburb)}`)
  },

  // Get facilities by suburb name
  getFacilities(suburb, type = null) {
    const params = new URLSearchParams({ suburb })
    if (type) params.append('type', type)
    return api.get(`/social/facilities?${params.toString()}`)
  },

  // Get facility accessibility by suburb name
  getFacilityAccessibility(suburb) {
    return api.get(`/social/accessibility?suburb=${encodeURIComponent(suburb)}`)
  },

  // Get facility statistics by suburb ID
  getFacilityStatsBySuburbId(suburbId) {
    return api.get(`/social/facilities/stats/${suburbId}`)
  },

  // Health check
  healthCheck() {
    return api.get('/social/health')
  },
}

// Environment API
export const environmentApi = {
  // Get latest indicators by suburb name
  getLatestIndicators(suburb) {
    return api.get(`/environment/indicators/latest?suburb=${encodeURIComponent(suburb)}`)
  },

  // Get latest indicator by suburb name and type
  getLatestIndicatorByType(suburb, indicatorType) {
    return api.get(`/environment/indicators/latest/${indicatorType}?suburb=${encodeURIComponent(suburb)}`)
  },

  // Get indicator trend data
  getIndicatorTrend(suburb, indicatorType, months = 6) {
    const params = new URLSearchParams({
      suburb,
      indicatorType,
      months: months.toString(),
    })
    return api.get(`/environment/indicators/trend?${params.toString()}`)
  },

  // Get all indicators by suburb name
  getIndicators(suburb, indicatorType = null) {
    const params = new URLSearchParams({ suburb })
    if (indicatorType) params.append('indicatorType', indicatorType)
    return api.get(`/environment/indicators?${params.toString()}`)
  },

  // Get latest indicators by suburb ID
  getLatestIndicatorsBySuburbId(suburbId) {
    return api.get(`/environment/indicators/latest/suburb/${suburbId}`)
  },

  // Health check
  healthCheck() {
    return api.get('/environment/health')
  },
}

// General suburb API
export const suburbApi = {
  // Get all suburbs
  getAllSuburbs() {
    return api.get('/homepage/search-suburbs')
  },

  // Search suburbs by name
  searchByName(name) {
    return homepageApi.searchSuburbs(name)
  },

  // Get suburb by rating range
  getByRatingRange(minRating, maxRating) {
    return homepageApi.getSuburbsByRating(minRating, maxRating)
  },
}

// Utility functions
export const apiUtils = {
  // Handle API errors
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response
      console.error(`API Error ${status}:`, data.message || data)
      return {
        success: false,
        message: data.message || `Server error (${status})`,
        status,
        data: null,
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.request)
      return {
        success: false,
        message: 'Network error - please check your connection',
        status: 0,
        data: null,
      }
    } else {
      // Something else happened
      console.error('Request Error:', error.message)
      return {
        success: false,
        message: error.message || 'An unexpected error occurred',
        status: -1,
        data: null,
      }
    }
  },

  // Extract data from API response
  extractData(response) {
    if (response.data && response.data.success) {
      return {
        success: true,
        message: response.data.message,
        data: response.data.data,
        total: response.data.total,
      }
    } else {
      return {
        success: false,
        message: response.data?.message || 'Invalid response format',
        data: null,
      }
    }
  },

  // Check if backend is healthy
  async checkHealth() {
    try {
      const results = await Promise.allSettled([
        homepageApi.healthCheck(),
        socialApi.healthCheck(),
        environmentApi.healthCheck(),
      ])

      const health = {
        homepage: results[0].status === 'fulfilled',
        social: results[1].status === 'fulfilled',
        environment: results[2].status === 'fulfilled',
      }

      health.overall = health.homepage && health.social && health.environment

      return health
    } catch (error) {
      return {
        homepage: false,
        social: false,
        environment: false,
        overall: false,
      }
    }
  },
}

export default api
