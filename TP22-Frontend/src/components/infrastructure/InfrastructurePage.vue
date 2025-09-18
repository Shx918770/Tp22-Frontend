<template>
  <div class="infrastructure-page">
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

    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="main-content">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container hero-container">
          <div class="hero-header">
            <h1 class="page-title">
              <span>Infrastructure</span>
              <span>Sustainability</span>
              <span>Insights</span>
            </h1>
            <p class="page-description">
              Explore transport, cycling and parking infrastructure across Melbourne suburbs 
              to understand connectivity, accessibility and sustainable mobility patterns.
            </p>
          </div>
        </div>
      </section>
    </main>
    <!-- Infrastructure Cards -->
      <section class="infrastructure-cards">
        <div class="container">
          <div class="facilities-grid">
            <!-- Public Transport Bubble -->
            <div class="facility-bubble transport">
              <div class="bubble-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M3 7V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V7M3 7L5 19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19L21 7M3 7H21M9 11V17M15 11V17" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <div class="bubble-content">
                <div class="bubble-label">Public Transport</div>
                <div class="bubble-number">{{ stats.transport.total || 0 }}</div>
                <ul class="bubble-details">
                  <li>{{ stats.transport.trainStations || 0 }} Train Stations</li>
                  <li>{{ stats.transport.tramStops || 0 }} Tram Stops</li>
                  <li>{{ stats.transport.busStops || 0 }} Bus Stops</li>
                </ul>
              </div>
              <div class="bubble-glow"></div>
            </div>

            <!-- Cycling Infrastructure Bubble -->
            <div class="facility-bubble cycling">
              <div class="bubble-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <circle cx="7" cy="17" r="3" stroke="currentColor" stroke-width="2"/>
                  <circle cx="17" cy="17" r="3" stroke="currentColor" stroke-width="2"/>
                  <path d="M5 17L9 7H15L19 17" stroke="currentColor" stroke-width="2"/>
                  <path d="M9 7L12 13L15 7" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <div class="bubble-content">
                <div class="bubble-label">Cycling Infrastructure</div>
                <div class="bubble-number">{{ stats.cycling.total || 0 }}</div>
                <ul class="bubble-details">
                  <li>{{ stats.cycling.bikeLanes || 0 }} km Bike Lanes</li>
                  <li>{{ stats.cycling.bikeRacks || 0 }} Bike Racks</li>
                  <li>{{ stats.cycling.repairStations || 0 }} Repair Stations</li>
                </ul>
              </div>
              <div class="bubble-glow"></div>
            </div>

            <!-- Parking Bubble -->
            <div class="facility-bubble parking">
              <div class="bubble-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="7" width="18" height="10" rx="3" stroke="currentColor" stroke-width="2"/>
                  <circle cx="7" cy="17" r="2" stroke="currentColor" stroke-width="2"/>
                  <circle cx="17" cy="17" r="2" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <div class="bubble-content">
                <div class="bubble-label">Parking</div>
                <div class="bubble-number">{{ stats.parking.total || 0 }}</div>
                <ul class="bubble-details">
                  <li>{{ stats.parking.publicSpaces || 0 }} Public Spaces</li>
                  <li>{{ stats.parking.disability || 0 }} Disability Parking</li>
                  <li>{{ stats.parking.shortTerm || 0 }} Short-term Parking</li>
                </ul>
              </div>
              <div class="bubble-glow"></div>
            </div>
          </div>
        </div>
      </section>
    <div class="map-container">
      <div class="map-area">
        <div id="map" class="map"></div>
      </div>
        <div class="map-legend">
          <h4>Facility Legend</h4>
          <div class="legend-items">
            <div class="legend-items">
              <button
                class="legend-item"
                :class="{ disabled: !visibleLayers.transport }"
                @click="toggleLayer('transport')"
              >
                <span class="facility-legend-icon" style="background: #2196F3"></span>
                <span>Public Transport</span>
              </button>

              <button
                class="legend-item"
                :class="{ disabled: !visibleLayers.bicycle }"
                @click="toggleLayer('bicycle')"
              >
                <span class="facility-legend-icon" style="background: #4CAF50"></span>
                <span>Bicycle</span>
              </button>

              <button
                class="legend-item"
                :class="{ disabled: !visibleLayers.parking }"
                @click="toggleLayer('parking')"
              >
                <span class="facility-legend-icon" style="background: #FF9800"></span>
                <span>Parking</span>
              </button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import { infrastructureApi, apiUtils } from '../../services/api.js'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  name: "InfrastructurePage",
  components: {
    Header
  },
  data() {
    return {
      stats: {
        transport: {},
        cycling: {},
        parking: {}
      },
      map: null,
      layers: {
        transport: null,
        bicycle: null,
        parking: null,
      },
      visibleLayers: { transport: true, bicycle: true, parking: true },
      currentFilter: 'all',
      loading: false,
      error: null
    }
  },
  computed: {
    selectedSuburb() {
      return this.$route?.query?.suburb || ''
    }
  },
  mounted() {
    this.initMap()
    this.loadData()
  },
  watch: {
    selectedSuburb: {
      immediate: true,
      handler(newSuburb) {
        if (newSuburb) {
          this.loadStats(newSuburb)
        }
      }
    }
  },
  methods: {
    async loadStats(suburb) {
      this.loading = true
      try {
        const [transportRes, cyclingRes, parkingRes] = await Promise.allSettled([
          infrastructureApi.getTransportStats(suburb),
          infrastructureApi.getCyclingStats(suburb),
          infrastructureApi.getParkingStats(suburb)
        ])

        if (transportRes.status === 'fulfilled') {
            const rows = apiUtils.extractData(transportRes.value).data || []

            this.stats.transport = {
                total: rows.length,
                trainStations: rows.filter(r => 
                r.MODE && /(TRAIN)/i.test(r.MODE)  // REGIONAL TRAIN, INTERSTATE TRAIN, METRO TRAIN
                ).length,
                tramStops: rows.filter(r => 
                r.MODE && /(TRAM)/i.test(r.MODE)   // METRO TRAM
                ).length,
                busStops: rows.filter(r => 
                r.MODE && /(BUS|COACH)/i.test(r.MODE) // METRO BUS, SKYBUS, REGIONAL COACH
                ).length
            }
        }
        if (cyclingRes.status === 'fulfilled') {
            const rows = apiUtils.extractData(cyclingRes.value).data || []
            this.stats.cycling = {
                total: rows.length,
                bikeLanes: rows.reduce((sum, r) => sum + (parseFloat(r.length_km) || 0), 0),
                bikeRacks: 0,
                repairStations: 0
            }
        }
        if (parkingRes.status === 'fulfilled') {
            const rows = apiUtils.extractData(parkingRes.value).data || []
            this.stats.parking = {
            total: rows.length,
            publicSpaces: rows.length,
            disability: 0,
            shortTerm: 0
            }
        }
      } catch (err) {
        console.error('Error loading infrastructure stats:', err)
        this.error = 'Failed to load infrastructure data.'
      } finally {
        this.loading = false
      }
    },
    initMap() {
      this.map = L.map('map').setView([-37.81, 144.96], 16)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map)
    },
    async loadData() {
        const suburb = this.selectedSuburb
        if (!suburb) return

        const [transportRes, bicycleRes, parkingRes] = await Promise.all([
            infrastructureApi.getTransportStats(suburb),
            infrastructureApi.getCyclingStats(suburb),
            infrastructureApi.getParkingStats(suburb),
        ])

        // Transport
        this.layers.transport = L.layerGroup(
            (transportRes.data?.data || [])
                .map(item => {
                const coords = this.parsePoint(item.geometry)
                if (!coords) return null
                return L.circleMarker(coords, { radius: 6, color: "#fff", weight: 2, fillColor: "#2196F3", fillOpacity: 1, className: "marker-circle transport-circle" })
                    .bindPopup(`<b>${item.STOP_NAME}</b><br/>${item.MODE}`)
                })
                .filter(m => m !== null)
        ).addTo(this.map)

        // Bicycle
        this.layers.bicycle = L.layerGroup(
        (bicycleRes.data?.data || [])
            .map(item => {
            const coords = this.parsePoint(item.geometry)
            if (!coords) return null
            return L.circleMarker(coords, { radius: 6, color: "#fff", weight: 2, fillColor: "#4CAF50", fillOpacity: 1, className: "marker-circle bicycle-circle" })
                .bindPopup(`<b>${item.description || 'Bike Lane'}</b>`)
            })
            .filter(m => m)
        ).addTo(this.map)

        // Parking
        this.layers.parking = L.layerGroup(
        (parkingRes.data?.data || [])
            .map(item => {
            const coords = this.parsePoint(item.geometry)
            if (!coords) return null
            return L.circleMarker(coords, { radius: 6, color: "#fff", weight: 2, fillColor: "#FF9800", fillOpacity: 1, className: "marker-circle parking-circle"})
                .bindPopup(`<b>Parking Space</b><br/>${item.RoadSegmentDescription}`)
            })
            .filter(m => m)
        ).addTo(this.map)
        console.log("Bicycle API:", bicycleRes.data);
        console.log("Parking API:", parkingRes.data);
        await this.$nextTick()
        this.setFilter('all')
    },
    setFilter(type) {
      this.currentFilter = type

      Object.values(this.layers).forEach(layer => {
        if (layer) this.map.removeLayer(layer)
      })

      if (type === 'all') {
        Object.values(this.layers).forEach(layer => {
          if (layer) this.map.addLayer(layer)
        })
      } else {
        if (this.layers[type]) {
          this.map.addLayer(this.layers[type])
        }
      }
    },
    parsePoint(geometryStr) {
        if (!geometryStr) return null
        const match = geometryStr.match(/POINT\s*\(([^ ]+)\s+([^ ]+)\)/)
        if (match) {
            const lon = parseFloat(match[1])
            const lat = parseFloat(match[2])
            return [lat, lon]
        }
        return null
    },
    toggleLayer(type) {
      this.visibleLayers[type] = !this.visibleLayers[type]

      if (this.visibleLayers[type]) {
        if (this.layers[type]) this.map.addLayer(this.layers[type])
      } else {
        if (this.layers[type]) this.map.removeLayer(this.layers[type])
      }
    },
  },
};
</script>

<style scoped>
.infrastructure-page {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  color: #1a1a1a;
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  padding-top: 60px;
}

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
    rgba(232, 245, 233, 0.7) 25%,
    rgba(248, 250, 252, 0.8) 50%,
    rgba(240, 248, 255, 0.7) 75%,
    rgba(232, 245, 233, 0.8) 100%
  );
  animation: backgroundShift 20s ease-in-out infinite;
}

@keyframes backgroundShift {
  0%, 100% {
    background: linear-gradient(135deg,
      rgba(240, 248, 255, 0.8) 0%,
      rgba(232, 245, 233, 0.7) 25%,
      rgba(248, 250, 252, 0.8) 50%,
      rgba(240, 248, 255, 0.7) 75%,
      rgba(232, 245, 233, 0.8) 100%
    );
  }
  50% {
    background: linear-gradient(135deg,
      rgba(243, 244, 246, 0.8) 0%,
      rgba(232, 245, 233, 0.7) 25%,
      rgba(240, 248, 255, 0.8) 50%,
      rgba(248, 250, 252, 0.7) 75%,
      rgba(232, 245, 233, 0.8) 100%
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

.shape-1 { width: 120px; height: 120px; background: #4CAF50; top: 20%; left: 10%; }
.shape-2 { width: 80px; height: 80px; background: #66BB6A; top: 60%; right: 15%; }
.shape-3 { width: 60px; height: 60px; background: #81C784; bottom: 30%; left: 20%; }
.shape-4 { width: 100px; height: 100px; background: #A5D6A7; top: 40%; left: 60%; }
.shape-5 { width: 140px; height: 140px; background: #C8E6C9; bottom: 20%; right: 30%; }

@keyframes float {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-30px) translateX(20px); }
}

/* Hero Section */
.hero-section {
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 6rem 0 4rem;
}

.page-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  background: linear-gradient(135deg, #2c3e50, #4CAF50, #2196F3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-description {
  font-size: 1.3rem;
  color: rgba(44, 62, 80, 0.8);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
}

/* for three cards starts */
/* Bubble card styles for infrastructure cards (copied from SocialPage) */
.infrastructure-cards {
  padding: 3rem 0;
  width: 80%;
  margin: 0 auto;
}
.facilities-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  width: 100%;
  margin: 0;
}

.facility-bubble {
  position: relative;
  background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.95));
  backdrop-filter: blur(30px);
  border-radius: 20px;
  padding: 1.2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  border: 2px solid rgba(255,255,255,0.3);
  transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  border: 2px solid rgba(255,255,255,0.4);
  background: linear-gradient(135deg, rgba(76,175,80,0.15), rgba(76,175,80,0.25));
}

.bubble-content {
  text-align: center;
  position: relative;
  z-index: 2;
}

.bubble-label {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.8rem;
}

.bubble-number {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 0.4rem;
}

.bubble-details {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #444;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  justify-content: center;
  align-items: center;
}

.bubble-details li {
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(10px);
  padding: 0.5rem 0.8rem;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #444;
  border: 1px solid rgba(255,255,255,0.4);
  transition: all 0.3s ease;
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

.facility-bubble.transport .bubble-icon { background: linear-gradient(135deg, rgba(33,150,243,0.2), rgba(33,150,243,0.3)); color: #2196F3; }
.facility-bubble.cycling .bubble-icon { background: linear-gradient(135deg, rgba(76,175,80,0.2), rgba(76,175,80,0.3)); color: #4CAF50; }
.facility-bubble.parking .bubble-icon { background: linear-gradient(135deg, rgba(255,152,0,0.2), rgba(255,152,0,0.3)); color: #FF9800; }

.facility-bubble.transport .bubble-glow { background: radial-gradient(circle, rgba(33,150,243,0.1) 0%, transparent 70%); }
.facility-bubble.cycling .bubble-glow { background: radial-gradient(circle, rgba(76,175,80,0.1) 0%, transparent 70%); }
.facility-bubble.parking .bubble-glow { background: radial-gradient(circle, rgba(255,152,0,0.1) 0%, transparent 70%); }

.facility-bubble:hover .bubble-glow {
  opacity: 1;
  animation: glowPulse 2s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.6; }
}
/* Bubble card styles end */

/* for map start */

:deep(.marker-circle) {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

:deep(.transport-circle) {
  fill: #2196F3;
}

:deep(.bicycle-circle) {
  fill: #4CAF50;
}

:deep(.parking-circle) {
  fill: #FF9800;
}
.map-container {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  width: 80%;
  margin: 0 auto;
}
.map-area {
  flex: 4;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.9));
  border-radius: 20px;
  padding: 1.5rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(226, 232, 240, 0.6);
  height: 500px;
  display: flex;
  flex-direction: column;
}
.map {
  width: 100%;
  height: 100%;
  flex: 1;
}
.filter-buttons {
  position: absolute;
  top: 50%;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transform: translateY(-50%);
  z-index: 1000;
}
.filter-buttons button {
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}
.map-legend {
  flex: 1;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.9));
  border-radius: 20px;
  padding: 1.5rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(226, 232, 240, 0.6);
  height: 500px;
  display: flex;
  flex-direction: column;
}
.map-legend h4 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
  font-weight: 600;
}

.legend-item.disabled {
  opacity: 0.5;
  pointer-events: auto;
}
.legend-items {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  flex: 1;
  justify-content: space-evenly;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  outline: none;
}
.legend-item:hover {
  background: rgba(76,175,80,0.08);
}
  .facility-legend-icon {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 8px;
    border: 2px solid #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }


</style>