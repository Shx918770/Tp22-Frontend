import axios from 'axios'

// Create axios instance with default configuration
const api = axios.create({
  // baseURL: 'http://melsustain-backend-env.eba-rutapszq.ap-southeast-2.elasticbeanstalk.com/api',
  baseURL:'https://api.melsustain.tech/api',
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

  // Compare suburbs
  compareSuburbs(suburbNames) {
    return api.post('/homepage/compare-suburbs', suburbNames)
  },

  // Get suburb details
  getSuburbDetails(suburbName) {
    return api.get(`/homepage/suburb-details?suburbName=${encodeURIComponent(suburbName)}`)
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

// Health API (Hospitals / Practitioners / Beds per 1000)
export const healthApi = {
  getHospitals(suburb) {
    return api.get(`/health/hospitals`, { params: { suburb } })
  },
  getPractitioners(suburb) {
    return api.get(`/health/practitioners`, { params: { suburb } })
  },
  getBedsPerThousand(suburb) {
    return api.get(`/health/beds-per-1000`, { params: { suburb } })
  },
}

// School API
export const schoolApi = {
  // Get schools by suburb
  getSchoolsBySuburb(suburb) {
    return api.get(`/schools/suburb/${encodeURIComponent(suburb)}`)
  },

  // Get school with student data by school number
  getSchoolWithStudentData(schoolNo) {
    return api.get(`/schools/${schoolNo}/students`)
  },

  // Get education statistics by suburb (schools + childcare)
  getEducationStatsBySuburb(suburb) {
    return api.get(`/education/stats/${encodeURIComponent(suburb)}`)
  },

  // Get all schools
  getAllSchools() {
    return api.get('/schools/all')
  },

  // Health check
  healthCheck() {
    return api.get('/schools/health')
  },
}

// ChildCare API
export const childCareApi = {
  // Get childcare centers by suburb
  getChildCareBySuburb(suburb) {
    return api.get(`/childcare/suburb/${encodeURIComponent(suburb)}`)
  },

  // Get childcare count by suburb
  getChildCareCountBySuburb(suburb) {
    return api.get(`/childcare/count/${encodeURIComponent(suburb)}`)
  },

  // Get all childcare centers
  getAllChildCare() {
    return api.get('/childcare/all')
  },

  // Health check
  healthCheck() {
    return api.get('/childcare/health')
  },
}

// Environment API
export const environmentApi = {
  //Map
  getTreesBySuburb(suburb) {
    return api.get(`/trees?suburb=${encodeURIComponent(suburb)}`)
  },

  getAirBySuburb: (suburb) =>
    api.get(`/environment/air`, { params: { suburb } }),
  getAirTrend: (suburb) =>
    api.get(`/environment/air/trend`, { params: { suburb } }),

  getEnergyMap(suburb) {
    return api.get(`/environment/energy/map`, { params: { suburb } })
  },
  getEnergyList(suburb) {
    return api.get(`/environment/energy/list`, { params: { suburb } })
  },
  getEnergyTrend(suburb) {
    return api.get(`/environment/energy/trend`, { params: { suburb } })
  },
  getEnergyBlocks(suburb) {
    return api.get(`/environment/energy/map`, { params: { suburb } });
  },

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

export const infrastructureApi = {
  getTransportStats: (suburb) =>
    api.get(`/infrastructure/publicTransport`, { params: { suburb } }),
  getCyclingStats: (suburb) =>
    api.get(`/infrastructure/bicycle`, { params: { suburb } }),
  getCyclingLenth: (suburb) =>
    api.get(`/infrastructure/bicycle/card`, { params: { suburb } }),
  getParkingStats: (suburb) =>
    api.get(`/infrastructure/parking`, { params: { suburb } }),

  getPtDemand: (suburb, year = null) =>
    api.get('/infrastructure/demand/pt', { params: { suburb, ...(year ? { year } : {}) } }),

  getCyclingDemand: (suburb, year = null) =>
    api.get('/infrastructure/demand/cycling', { params: { suburb, ...(year ? { year } : {}) } }),

  getParkingDemand: (suburb, year = null) =>
    api.get('/infrastructure/demand/parking', { params: { suburb, ...(year ? { year } : {}) } }),
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

  // Extract data from API response with validation
  extractData(response) {
    try {
      if (!response || !response.data) {
        return {
          success: false,
          message: 'No response data received',
          data: null,
        }
      }

      // if return array
      if (Array.isArray(response.data)) {
        return {
          success: true,
          message: 'Success',
          data: response.data,
          total: response.data.length,
        }
      }

      // if return object
      if (Object.prototype.hasOwnProperty.call(response.data, 'success')) {
        return {
          success: response.data.success,
          message: response.data.message || (response.data.success ? 'Success' : 'Failed'),
          data: this.validateData(response.data.data),
          total: response.data.total || 0,
        }
      }

      // usual object
      return {
        success: true,
        message: 'Success',
        data: response.data,
      }
    } catch (error) {
      console.error('Error extracting data:', error)
      return {
        success: false,
        message: 'Error processing response data',
        data: null,
      }
    }
  },

  // Validate and sanitize data
  validateData(data) {
    if (data === null || data === undefined) {
      return null
    }

    // Handle arrays
    if (Array.isArray(data)) {
      return data.filter(item => item !== null && item !== undefined)
    }

    // Handle objects
    if (typeof data === 'object') {
      const validated = {}
      for (const [key, value] of Object.entries(data)) {
        if (value !== null && value !== undefined) {
          validated[key] = value
        }
      }
      return validated
    }

    return data
  },

  // Safe number conversion with fallback
  safeNumber(value, fallback = 0) {
    const num = parseFloat(value)
    return isNaN(num) ? fallback : num
  },

  // Safe string conversion with fallback
  safeString(value, fallback = '') {
    if (value === null || value === undefined) {
      return fallback
    }
    return String(value)
  },

  // Format suburb data with fallbacks
  formatSuburbData(suburb) {
    if (!suburb) return null
    
    return {
      id: suburb.id || 0,
      name: this.safeString(suburb.name, 'Unknown Suburb'),
      rating: this.safeNumber(suburb.rating, 0),
      population: this.safeNumber(suburb.population, 0),
      area: this.safeNumber(suburb.area, 0),
      description: this.safeString(suburb.description, 'No description available'),
      imageUrl: this.safeString(suburb.imageUrl, '/default-suburb.jpg'),
    }
  },

  // Format facility stats with fallbacks
  formatFacilityStats(stats) {
    if (!stats) return this.getDefaultFacilityStats()
    
    return {
      totalFacilities: this.safeNumber(stats.totalFacilities, 0),
      facilityCounts: {
        EDUCATION: this.safeNumber(stats.facilityCounts?.EDUCATION, 0),
        HEALTHCARE: this.safeNumber(stats.facilityCounts?.HEALTHCARE, 0),
        RECREATION: this.safeNumber(stats.facilityCounts?.RECREATION, 0),
        SHOPPING: this.safeNumber(stats.facilityCounts?.SHOPPING, 0),
      },
      detailedCounts: stats.detailedCounts || {},
    }
  },

  // Get default facility stats
  getDefaultFacilityStats() {
    return {
      totalFacilities: 0,
      facilityCounts: {
        EDUCATION: 0,
        HEALTHCARE: 0,
        RECREATION: 0,
        SHOPPING: 0,
      },
      detailedCounts: {},
    }
  },

  // Format environmental indicators with fallbacks
  formatEnvironmentalIndicators(indicators) {
    if (!Array.isArray(indicators)) return []
    
    return indicators.map(indicator => ({
      id: indicator.id || 0,
      suburbId: indicator.suburbId || 0,
      indicatorType: this.safeString(indicator.indicatorType, 'unknown'),
      value: this.safeNumber(indicator.value, 0),
      unit: this.safeString(indicator.unit, ''),
      recordedDate: indicator.recordedDate || new Date().toISOString(),
    }))
  },

  // Unified API call wrapper with consistent error handling
  async safeApiCall(apiFunction, fallbackData = null, customErrorMessage = null) {
    try {
      const response = await apiFunction()
      const result = this.extractData(response)
      
      if (result.success) {
        return {
          success: true,
          data: result.data,
          message: result.message,
          total: result.total,
        }
      } else {
        return {
          success: false,
          data: fallbackData,
          message: customErrorMessage || result.message || 'Request failed',
          error: 'API_ERROR',
        }
      }
    } catch (error) {
      const errorResult = this.handleError(error)
      return {
        success: false,
        data: fallbackData,
        message: customErrorMessage || errorResult.message,
        error: errorResult.status === 0 ? 'NETWORK_ERROR' : 'API_ERROR',
      }
    }
  },

  // Batch API calls with error handling
  async safeBatchApiCalls(apiCalls, fallbackData = []) {
    try {
      const results = await Promise.allSettled(apiCalls)
      const processedResults = []
      
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          const extractedData = this.extractData(result.value)
          processedResults.push({
            success: extractedData.success,
            data: extractedData.success ? extractedData.data : fallbackData[index] || null,
            message: extractedData.message,
            index,
          })
        } else {
          processedResults.push({
            success: false,
            data: fallbackData[index] || null,
            message: 'Request failed',
            error: result.reason,
            index,
          })
        }
      })
      
      return processedResults
    } catch (error) {
      console.error('Batch API call error:', error)
      return apiCalls.map((_, index) => ({
        success: false,
        data: fallbackData[index] || null,
        message: 'Batch request failed',
        error: 'BATCH_ERROR',
        index,
      }))
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

// Recreation API (Community Centers, Playgrounds)
export const recreationApi = {
  // Get all community centers
  getAllCommunityCenters() {
    return api.get('/recreation/community-centers')
  },

  // Get community centers by suburb
  getCommunityCentersBySuburb(suburb) {
    return api.get(`/recreation/community-centers/suburb/${encodeURIComponent(suburb)}`)
  },

  // Get community centers by sports type
  getCommunityCentersBySports(sportsType) {
    return api.get(`/recreation/community-centers/sports/${encodeURIComponent(sportsType)}`)
  },

  // Get community centers within geographic area
  getCommunityCentersInArea(minLat, maxLat, minLng, maxLng) {
    return api.get('/recreation/community-centers/area', {
      params: { minLat, maxLat, minLng, maxLng }
    })
  },

  // Get all playgrounds
  getAllPlaygrounds() {
    return api.get('/recreation/playgrounds')
  },

  // Get playgrounds by suburb
  getPlaygroundsBySuburb(suburb) {
    return api.get(`/recreation/playgrounds/suburb/${encodeURIComponent(suburb)}`)
  },

  // Search playgrounds by features
  getPlaygroundsByFeatures(features) {
    return api.get('/recreation/playgrounds/features', {
      params: { features }
    })
  },

  // Get playground count by suburb
  getPlaygroundCountBySuburb(suburb) {
    return api.get(`/recreation/stats/playgrounds/suburb/${encodeURIComponent(suburb)}`)
  },

  // Get community center count by suburb
  getCommunityCenterCountBySuburb(suburb) {
    return api.get(`/recreation/stats/community-centers/count/suburb/${encodeURIComponent(suburb)}`)
  },

  // Get community center statistics
  getCommunityCenterStats() {
    return api.get('/recreation/stats/community-centers')
  },

  // Get statistics by suburb
  getCommunityCenterStatsBySuburb(suburb) {
    return api.get(`/recreation/stats/community-centers/suburb/${encodeURIComponent(suburb)}`)
  },

  // Get combined facilities data for a suburb
  getFacilitiesBySuburb(suburb) {
    return api.get(`/recreation/facilities/suburb/${encodeURIComponent(suburb)}`)
  },

  // Health check
  healthCheck() {
    return api.get('/recreation/community-centers?limit=1')
  }
}

// Hospitality API (Cafes, Bars, Restaurant Growth)
export const hospitalityApi = {
  // Get all cafes for map display
  getAllCafes() {
    return api.get('/hospitality/cafes')
  },

  // Get cafes by suburb
  getCafesBySuburb(suburb) {
    return api.get(`/hospitality/cafes/suburb/${encodeURIComponent(suburb)}`)
  },

  // Get cafes within coordinate bounds
  getCafesWithinBounds(minLat, maxLat, minLng, maxLng) {
    return api.get('/hospitality/cafes/bounds', {
      params: { minLat, maxLat, minLng, maxLng }
    })
  },

  // Get cafe details by property ID
  getCafeDetails(propertyId) {
    return api.get(`/hospitality/cafes/${propertyId}`)
  },

  // Get all bars for map display
  getAllBars() {
    return api.get('/hospitality/bars')
  },

  // Get bars by suburb
  getBarsBySuburb(suburb) {
    return api.get(`/hospitality/bars/suburb/${encodeURIComponent(suburb)}`)
  },

  // Get bars within coordinate bounds
  getBarsWithinBounds(minLat, maxLat, minLng, maxLng) {
    return api.get('/hospitality/bars/bounds', {
      params: { minLat, maxLat, minLng, maxLng }
    })
  },

  // Get bar details by property ID
  getBarDetails(propertyId) {
    return api.get(`/hospitality/bars/${propertyId}`)
  },

  // Get all restaurant bar growth data
  getAllGrowthData() {
    return api.get('/hospitality/growth')
  },

  // Get growth data by year
  getGrowthDataByYear(year) {
    return api.get(`/hospitality/growth/year/${year}`)
  },

  // Get growth data by suburb
  getGrowthDataBySuburb(suburb) {
    return api.get(`/hospitality/growth/suburb/${encodeURIComponent(suburb)}`)
  },

  // Get all available years
  getAllYears() {
    return api.get('/hospitality/growth/years')
  },

  // Get all available suburbs
  getAllSuburbs() {
    return api.get('/hospitality/growth/suburbs')
  },

  // Get social venue statistics by suburb
  getHospitalityStats(suburb) {
    return api.get(`/hospitality/stats/${encodeURIComponent(suburb)}`)
  },

  // Health check
  healthCheck() {
    return api.get('/hospitality/cafes?limit=1')
  }
}

export const aiApi = {
  chat(message) {
    return api.post('/ai/chat', { message });
  }
};

export default api
