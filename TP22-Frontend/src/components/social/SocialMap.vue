<template>
  <div class="social-map">
    <div id="map" class="map-container"></div>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  name: 'SocialMap',
  props: {
    schools: {
      type: Array,
      default: () => []
    },
    childCares: {
      type: Array,
      default: () => []
    },
    hospitals: {
      type: Array,
      default: () => []
    },
    practitioners: {
      type: Array,
      default: () => []
    },
    cafes: {
      type: Array,
      default: () => []
    },
    bars: {
      type: Array,
      default: () => []
    },
    selectedSuburb: {
      type: String,
      default: ''
    },
    showSchools: {
      type: Boolean,
      default: true
    },
    showChildCares: {
      type: Boolean,
      default: true
    },
    showHospitals: {
      type: Boolean,
      default: true
    },
    showPractitioners: {
      type: Boolean,
      default: true
    },
    showCafes: {
      type: Boolean,
      default: true
    },
    showBars: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      map: null,
      schoolMarkers: [],
      childCareMarkers: [],
      hospitalMarkers: [],
      practitionerMarkers: [],
      cafeMarkers: [],
      barMarkers: [],
      markerGroup: null
    }
  },
  mounted() {
    this.initMap()
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove()
    }
  },
  watch: {
    schools: {
      handler() {
        this.updateSchoolMarkers()
      },
      deep: true
    },
    childCares: {
      handler() {
        this.updateChildCareMarkers()
      },
      deep: true
    },
    hospitals: {
      handler() {
        this.updateHospitalMarkers()
      },
      deep: true
    },
    practitioners: {
      handler() {
        this.updatePractitionerMarkers()
      },
      deep: true
    },
    cafes: {
      handler() {
        this.updateCafeMarkers()
      },
      deep: true
    },
    bars: {
      handler() {
        this.updateBarMarkers()
      },
      deep: true
    },
    showSchools() {
      this.toggleSchoolMarkers()
    },
    showChildCares() {
      this.toggleChildCareMarkers()
    },
    showHospitals() {
      this.toggleHospitalMarkers()
    },
    showPractitioners() {
      this.togglePractitionerMarkers()
    },
    showCafes() {
      this.toggleCafeMarkers()
    },
    showBars() {
      this.toggleBarMarkers()
    }
  },
  methods: {
    initMap() {
      // Initialize map centered on Melbourne
      this.map = L.map('map').setView([-37.8136, 144.9631], 12)

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map)

      // Create marker group
      this.markerGroup = L.layerGroup().addTo(this.map)

      // Update markers initially
      this.updateSchoolMarkers()
      this.updateChildCareMarkers()
      this.updateHospitalMarkers()
      this.updatePractitionerMarkers()
      this.updateCafeMarkers() // Re-enabled with 150 unique locations limit
      this.updateBarMarkers()
    },

    updateSchoolMarkers() {
      // Clear existing school markers
      this.schoolMarkers.forEach(marker => {
        this.markerGroup.removeLayer(marker)
      })
      this.schoolMarkers = []

      if (!this.schools || this.schools.length === 0) return

      // Add school markers
      this.schools.forEach(school => {
        if (school.latitude && school.longitude) {
          const marker = this.createSchoolMarker(school)
          if (marker) {
            this.schoolMarkers.push(marker)
            if (this.showSchools) {
              this.markerGroup.addLayer(marker)
            }
          }
        }
      })

      this.fitMapToMarkers()
    },

    updateChildCareMarkers() {
      // Clear existing childcare markers
      this.childCareMarkers.forEach(marker => {
        this.markerGroup.removeLayer(marker)
      })
      this.childCareMarkers = []

      if (!this.childCares || this.childCares.length === 0) return

      // Add childcare markers
      this.childCares.forEach(childCare => {
        const coordinates = this.parseCoordinates(childCare.coordinates)
        if (coordinates) {
          const marker = this.createChildCareMarker(childCare, coordinates)
          if (marker) {
            this.childCareMarkers.push(marker)
            if (this.showChildCares) {
              this.markerGroup.addLayer(marker)
            }
          }
        }
      })

      this.fitMapToMarkers()
    },

    updateHospitalMarkers() {
      this.hospitalMarkers.forEach(marker => {
        this.markerGroup.removeLayer(marker)
      })
      this.hospitalMarkers = []
      if (!this.hospitals || this.hospitals.length === 0) return
      this.hospitals.forEach(h => {
        const lat = parseFloat(h.Latitude || h.latitude)
        const lng = parseFloat(h.Longitude || h.longitude)
        const beds = Number(h.Beds ?? h.beds)
        if (!isNaN(lat) && !isNaN(lng) && (!beds || beds > 0)) {
          const marker = this.createHospitalMarker(h, { lat, lng })
          if (marker) {
            this.hospitalMarkers.push(marker)
            if (this.showHospitals) this.markerGroup.addLayer(marker)
          }
        }
      })
      this.fitMapToMarkers()
    },

    updatePractitionerMarkers() {
      this.practitionerMarkers.forEach(marker => {
        this.markerGroup.removeLayer(marker)
      })
      this.practitionerMarkers = []
      if (!this.practitioners || this.practitioners.length === 0) return
      this.practitioners.forEach(p => {
        const lat = parseFloat(p.LATITUDE ?? p.latitude)
        const lng = parseFloat(p.LONGITUDE ?? p.longitude)
        if (!isNaN(lat) && !isNaN(lng)) {
          const marker = this.createPractitionerMarker(p, { lat, lng })
          if (marker) {
            this.practitionerMarkers.push(marker)
            if (this.showPractitioners) this.markerGroup.addLayer(marker)
          }
        }
      })
      this.fitMapToMarkers()
    },

    updateCafeMarkers() {
      // Clear existing cafe markers
      this.cafeMarkers.forEach(marker => {
        this.markerGroup.removeLayer(marker)
      })
      this.cafeMarkers = []

      if (!this.cafes || this.cafes.length === 0) return

      // Limit cafes to maximum 150 for performance
      const maxCafes = 150
      
      // Sort cafes by seat capacity (descending) to show the most significant ones first
      const sortedCafes = [...this.cafes].sort((a, b) => {
        const seatsA = parseInt(a.numOfSeats) || 0
        const seatsB = parseInt(b.numOfSeats) || 0
        return seatsB - seatsA
      })
      
      // Remove duplicate coordinates - keep the one with highest seat capacity
      const uniqueLocationCafes = []
      const seenCoordinates = new Set()
      
      for (const cafe of sortedCafes) {
        if (cafe.latitude && cafe.longitude) {
          // Create coordinate key with some precision to handle minor differences
          const lat = parseFloat(cafe.latitude).toFixed(6)
          const lng = parseFloat(cafe.longitude).toFixed(6)
          const coordKey = `${lat},${lng}`
          
          if (!seenCoordinates.has(coordKey)) {
            seenCoordinates.add(coordKey)
            uniqueLocationCafes.push(cafe)
            
            // Stop when we have enough unique locations
            if (uniqueLocationCafes.length >= maxCafes) {
              break
            }
          }
        }
      }
      
      const cafesToShow = uniqueLocationCafes
      
      const cafesWithCoords = sortedCafes.filter(c => c.latitude && c.longitude).length
      const duplicatesFiltered = cafesWithCoords - uniqueLocationCafes.length
      
      console.log(`Displaying ${cafesToShow.length} unique cafe locations out of ${this.cafes.length} total cafes (max: ${maxCafes})`)
      if (duplicatesFiltered > 0) {
        console.log(`Filtered out ${duplicatesFiltered} cafes with duplicate coordinates`)
      }

      // Add cafe markers (limited quantity)
      cafesToShow.forEach(cafe => {
        if (cafe.latitude && cafe.longitude) {
          const marker = this.createCafeMarker(cafe)
          if (marker) {
            this.cafeMarkers.push(marker)
            if (this.showCafes) {
              this.markerGroup.addLayer(marker)
            }
          }
        }
      })

      this.fitMapToMarkers()
    },

    updateBarMarkers() {
      // Clear existing bar markers
      this.barMarkers.forEach(marker => {
        this.markerGroup.removeLayer(marker)
      })
      this.barMarkers = []

      if (!this.bars || this.bars.length === 0) return

      // Limit bars to maximum 150 for performance
      const maxBars = 150
      
      // Sort bars by patron capacity (descending) to show the most significant ones first
      const sortedBars = [...this.bars].sort((a, b) => {
        const patronsA = parseInt(a.numOfPatrons) || 0
        const patronsB = parseInt(b.numOfPatrons) || 0
        return patronsB - patronsA
      })
      
      // Remove duplicate coordinates - keep the one with highest patron capacity
      const uniqueLocationBars = []
      const seenCoordinates = new Set()
      
      for (const bar of sortedBars) {
        if (bar.latitude && bar.longitude) {
          // Create coordinate key with some precision to handle minor differences
          const lat = parseFloat(bar.latitude).toFixed(6)
          const lng = parseFloat(bar.longitude).toFixed(6)
          const coordKey = `${lat},${lng}`
          
          if (!seenCoordinates.has(coordKey)) {
            seenCoordinates.add(coordKey)
            uniqueLocationBars.push(bar)
            
            // Stop when we have enough unique locations
            if (uniqueLocationBars.length >= maxBars) {
              break
            }
          }
        }
      }
      
      const barsToShow = uniqueLocationBars
      
      const barsWithCoords = sortedBars.filter(b => b.latitude && b.longitude).length
      const duplicatesFiltered = barsWithCoords - uniqueLocationBars.length
      
      console.log(`Displaying ${barsToShow.length} unique locations out of ${this.bars.length} total bars (max: ${maxBars})`)
      if (duplicatesFiltered > 0) {
        console.log(`Filtered out ${duplicatesFiltered} bars with duplicate coordinates`)
      }

      // Add bar markers (limited quantity)
      barsToShow.forEach(bar => {
        if (bar.latitude && bar.longitude) {
          const marker = this.createBarMarker(bar)
          if (marker) {
            this.barMarkers.push(marker)
            if (this.showBars) {
              this.markerGroup.addLayer(marker)
            }
          }
        }
      })

      this.fitMapToMarkers()
    },

    createSchoolMarker(school) {
      try {
        const lat = parseFloat(school.latitude)
        const lng = parseFloat(school.longitude)
        
        if (isNaN(lat) || isNaN(lng)) return null

        // Create custom icon for school
        const schoolIcon = L.divIcon({
          className: 'custom-marker school-marker',
          html: '<div class="marker-dot school"></div>',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        })

        const marker = L.marker([lat, lng], { icon: schoolIcon })
        
        // Add popup
        const popupContent = `
          <div class="marker-popup">
            <h4>${school.schoolName}</h4>
            <p><strong>Type:</strong> ${school.schoolType}</p>
            <p><strong>Address:</strong> ${school.addressLine1 || ''}</p>
            <p><strong>Suburb:</strong> ${school.suburb}</p>
          </div>
        `
        marker.bindPopup(popupContent)

        return marker
      } catch (error) {
        console.error('Error creating school marker:', error)
        return null
      }
    },

    createChildCareMarker(childCare, coordinates) {
      try {
        const { lat, lng } = coordinates
        
        if (isNaN(lat) || isNaN(lng)) return null

        // Create custom icon for childcare
        const childCareIcon = L.divIcon({
          className: 'custom-marker childcare-marker',
          html: '<div class="marker-dot childcare"></div>',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        })

        const marker = L.marker([lat, lng], { icon: childCareIcon })
        
        // Add popup
        const popupContent = `
          <div class="marker-popup">
            <h4>${childCare.name}</h4>
            <p><strong>Type:</strong> Childcare Center</p>
            <p><strong>Suburb:</strong> ${childCare.suburbName}</p>
          </div>
        `
        marker.bindPopup(popupContent)

        return marker
      } catch (error) {
        console.error('Error creating childcare marker:', error)
        return null
      }
    },

    createHospitalMarker(hospital, { lat, lng }) {
      try {
        const hospitalIcon = L.divIcon({
          className: 'custom-marker hospital-marker',
          html: '<div class="marker-dot hospital"></div>',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        })
        const marker = L.marker([lat, lng], { icon: hospitalIcon })
        const beds = hospital.Beds ?? hospital.beds
        const popupContent = `
          <div class="marker-popup">
            <h4>${hospital.Name || hospital.name}</h4>
            <p><strong>Type:</strong> ${hospital.Type || hospital.type}</p>
            ${beds && Number(beds) > 0 ? `<p><strong>Beds:</strong> ${beds}</p>` : ''}
            <p><strong>Suburb:</strong> ${hospital.Suburb || hospital.suburb}</p>
          </div>
        `
        marker.bindPopup(popupContent)
        return marker
      } catch (error) {
        console.error('Error creating hospital marker:', error)
        return null
      }
    },

    createPractitionerMarker(prac, { lat, lng }) {
      try {
        const practitionerIcon = L.divIcon({
          className: 'custom-marker practitioner-marker',
          html: '<div class="marker-dot practitioner"></div>',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        })
        const marker = L.marker([lat, lng], { icon: practitionerIcon })
        const popupContent = `
          <div class="marker-popup">
            <h4>${prac.GP || prac.gp}</h4>
            <p><strong>Address:</strong> ${prac.ADDRESS || prac.address || ''}</p>
            <p><strong>Suburb:</strong> ${prac.SUBURB || prac.suburb}</p>
          </div>
        `
        marker.bindPopup(popupContent)
        return marker
      } catch (error) {
        console.error('Error creating practitioner marker:', error)
        return null
      }
    },

    createCafeMarker(cafe) {
      try {
        const lat = parseFloat(cafe.latitude)
        const lng = parseFloat(cafe.longitude)
        
        if (isNaN(lat) || isNaN(lng)) return null

        // Create custom icon for cafe
        const cafeIcon = L.divIcon({
          className: 'custom-marker cafe-marker',
          html: '<div class="marker-dot cafe"></div>',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        })

        const marker = L.marker([lat, lng], { icon: cafeIcon })
        
        // Add popup with required fields
        const popupContent = `
          <div class="marker-popup">
            <h4>${cafe.tradingName || 'Cafe'}</h4>
            <p><strong>Address:</strong> ${cafe.businessAddress || ''}</p>
            <p><strong>Industry:</strong> ${cafe.industryDescription || ''}</p>
            <p><strong>Seats:</strong> ${cafe.numOfSeats || 'N/A'}</p>
            <p style="font-size: 0.8em; color: #666; margin-top: 5px;">
              <em>Showing highest capacity cafe at this location</em>
            </p>
          </div>
        `
        marker.bindPopup(popupContent)

        return marker
      } catch (error) {
        console.error('Error creating cafe marker:', error)
        return null
      }
    },

    createBarMarker(bar) {
      try {
        const lat = parseFloat(bar.latitude)
        const lng = parseFloat(bar.longitude)
        
        if (isNaN(lat) || isNaN(lng)) return null

        // Create custom icon for bar
        const barIcon = L.divIcon({
          className: 'custom-marker bar-marker',
          html: '<div class="marker-dot bar"></div>',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        })

        const marker = L.marker([lat, lng], { icon: barIcon })
        
        // Add popup with required fields
        const popupContent = `
          <div class="marker-popup">
            <h4>${bar.tradingName || 'Bar'}</h4>
            <p><strong>Address:</strong> ${bar.businessAddress || ''}</p>
            <p><strong>Patrons:</strong> ${bar.numOfPatrons || 'N/A'}</p>
            <p style="font-size: 0.8em; color: #666; margin-top: 5px;">
              <em>Showing highest capacity bar at this location</em>
            </p>
          </div>
        `
        marker.bindPopup(popupContent)

        return marker
      } catch (error) {
        console.error('Error creating bar marker:', error)
        return null
      }
    },

    parseCoordinates(coordinatesString) {
      try {
        if (!coordinatesString) return null
        
        // Parse coordinates like "-37.79625086, 144.96487025"
        const coords = coordinatesString.split(',').map(coord => parseFloat(coord.trim()))
        
        if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
          return {
            lat: coords[0],
            lng: coords[1]
          }
        }
        
        return null
      } catch (error) {
        console.error('Error parsing coordinates:', coordinatesString, error)
        return null
      }
    },

    fitMapToMarkers() {
      const visibleMarkers = []
      
      if (this.showSchools) {
        visibleMarkers.push(...this.schoolMarkers)
      }
      if (this.showChildCares) {
        visibleMarkers.push(...this.childCareMarkers)
      }
      if (this.showHospitals) {
        visibleMarkers.push(...this.hospitalMarkers)
      }
      if (this.showPractitioners) {
        visibleMarkers.push(...this.practitionerMarkers)
      }
      
      if (visibleMarkers.length > 0) {
        const group = new L.featureGroup(visibleMarkers)
        this.map.fitBounds(group.getBounds().pad(0.1))
      } else if (this.schoolMarkers.length > 0 || this.childCareMarkers.length > 0 || this.hospitalMarkers.length > 0 || this.practitionerMarkers.length > 0) {
        // If no markers are visible but we have data, show all markers for fitting
        const allMarkers = [...this.schoolMarkers, ...this.childCareMarkers, ...this.hospitalMarkers, ...this.practitionerMarkers]
        const group = new L.featureGroup(allMarkers)
        this.map.fitBounds(group.getBounds().pad(0.1))
      }
    },

    toggleSchoolMarkers() {
      this.schoolMarkers.forEach(marker => {
        if (this.showSchools) {
          this.markerGroup.addLayer(marker)
        } else {
          this.markerGroup.removeLayer(marker)
        }
      })
    },

    toggleChildCareMarkers() {
      this.childCareMarkers.forEach(marker => {
        if (this.showChildCares) {
          this.markerGroup.addLayer(marker)
        } else {
          this.markerGroup.removeLayer(marker)
        }
      })
    },

    toggleHospitalMarkers() {
      this.hospitalMarkers.forEach(marker => {
        if (this.showHospitals) {
          this.markerGroup.addLayer(marker)
        } else {
          this.markerGroup.removeLayer(marker)
        }
      })
    },

    togglePractitionerMarkers() {
      this.practitionerMarkers.forEach(marker => {
        if (this.showPractitioners) {
          this.markerGroup.addLayer(marker)
        } else {
          this.markerGroup.removeLayer(marker)
        }
      })
    },

    toggleCafeMarkers() {
      this.cafeMarkers.forEach(marker => {
        if (this.showCafes) {
          this.markerGroup.addLayer(marker)
        } else {
          this.markerGroup.removeLayer(marker)
        }
      })
    },

    toggleBarMarkers() {
      this.barMarkers.forEach(marker => {
        if (this.showBars) {
          this.markerGroup.addLayer(marker)
        } else {
          this.markerGroup.removeLayer(marker)
        }
      })
    }
  }
}
</script>

<style scoped>
.social-map {
  width: 100%;
  height: 100%;
}

.map-container {
  width: 100%;
  height: 400px;
  border-radius: 15px;
  overflow: hidden;
}

/* Custom marker styles */
:deep(.custom-marker) {
  background: transparent;
  border: none;
}

:deep(.marker-dot) {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

:deep(.marker-dot.school) {
  background: #e74c3c;
}

:deep(.marker-dot.childcare) {
  background: #e67e22;
}

:deep(.marker-dot.hospital) {
  background: #2980b9;
}

:deep(.marker-dot.practitioner) {
  background: #27ae60;
}

:deep(.marker-dot.cafe) {
  background: #9C27B0;
}

:deep(.marker-dot.bar) {
  background: #673AB7;
}

:deep(.marker-popup) {
  min-width: 200px;
}

:deep(.marker-popup h4) {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
}

:deep(.marker-popup p) {
  margin: 5px 0;
  font-size: 0.9rem;
  color: #666;
}

:deep(.marker-popup strong) {
  color: #2c3e50;
}

/* Leaflet popup styles */
:deep(.leaflet-popup-content-wrapper) {
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

:deep(.leaflet-popup-tip) {
  background: white;
}
</style>
