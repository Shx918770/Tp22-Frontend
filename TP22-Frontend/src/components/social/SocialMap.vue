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
    }
  },
  data() {
    return {
      map: null,
      schoolMarkers: [],
      childCareMarkers: [],
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
    showSchools() {
      this.toggleSchoolMarkers()
    },
    showChildCares() {
      this.toggleChildCareMarkers()
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
      
      if (visibleMarkers.length > 0) {
        const group = new L.featureGroup(visibleMarkers)
        this.map.fitBounds(group.getBounds().pad(0.1))
      } else if (this.schoolMarkers.length > 0 || this.childCareMarkers.length > 0) {
        // If no markers are visible but we have data, show all markers for fitting
        const allMarkers = [...this.schoolMarkers, ...this.childCareMarkers]
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
