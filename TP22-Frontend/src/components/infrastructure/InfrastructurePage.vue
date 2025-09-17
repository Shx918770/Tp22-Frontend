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
        <div class="card-grid">
          <!-- Public Transport -->
          <div class="infra-card transport">
            <div class="card-icon">🚉</div>
            <div class="card-title">Public Transport</div>
            <div class="card-total">{{ stats.transport.total || 0 }} <span>Total</span></div>
            <ul class="card-details">
              <li>🚆 {{ stats.transport.trainStations || 0 }} Train Stations</li>
              <li>🚋 {{ stats.transport.tramStops || 0 }} Tram Stops</li>
              <li>🚌 {{ stats.transport.busStops || 0 }} Bus Stops</li>
            </ul>
          </div>

          <!-- Cycling Infrastructure -->
          <div class="infra-card cycling">
            <div class="card-icon">🚲</div>
            <div class="card-title">Cycling Infrastructure</div>
            <div class="card-total">{{ stats.cycling.total || 0 }} <span>Total</span></div>
            <ul class="card-details">
              <li>{{ stats.cycling.bikeLanes || 0 }} km Bike Lanes</li>
              <li>{{ stats.cycling.bikeRacks || 0 }} Bike Racks</li>
              <li>{{ stats.cycling.repairStations || 0 }} Repair Stations</li>
            </ul>
          </div>

          <!-- Parking -->
          <div class="infra-card parking">
            <div class="card-icon">🚗</div>
            <div class="card-title">Parking</div>
            <div class="card-total">{{ stats.parking.total || 0 }} <span>Total</span></div>
            <ul class="card-details">
              <li>{{ stats.parking.publicSpaces || 0 }} Public Spaces</li>
              <li>{{ stats.parking.disability || 0 }} Disability Parking</li>
              <li>{{ stats.parking.shortTerm || 0 }} Short-term Parking</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <div class="map-container">
    <div id="map" class="map"></div>
    <div class="filter-buttons">
      <button @click="setFilter('all')">All</button>
      <button @click="setFilter('transport')">Public Transport</button>
      <button @click="setFilter('bicycle')">Bicycle</button>
      <button @click="setFilter('parking')">Parking</button>
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
      this.map = L.map('map').setView([-37.81, 144.96], 13)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map)

      const legend = L.control({ position: 'bottomleft' })
      legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'ms-legend')
        div.innerHTML = `
            <div class="legend-title">Legend</div>          
            <div class="legend-item"><span class="swatch" style="background: blue"></span> Public Transport</div>
            <div class="legend-item"><span class="swatch" style="background: green"></span> Bicycle</div>
            <div class="legend-item"><span class="swatch" style="background: orange"></span> Parking</div>
        `
        L.DomEvent.disableClickPropagation(div)
        return div
    }
      legend.addTo(this.map)
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
                return L.circleMarker(coords, { color: 'blue', radius: 10 })
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
            return L.circleMarker(coords, { color: 'green', radius: 4 })
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
            return L.circleMarker(coords, { color: 'orange', radius: 4 })
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
.infrastructure-cards {
  padding: 3rem 0;
}

.infrastructure-cards .container {
  max-width: 80%;
  margin: 0 auto;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.infra-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
}

.infra-card:hover {
  transform: translateY(-6px);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.card-title {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
}

.card-total {
  font-size: 2rem;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.card-total span {
  font-size: 1rem;
  color: #888;
  font-weight: 500;
  margin-left: 0.3rem;
}

.card-details {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #444;
}

.card-details li {
  margin-bottom: 0.5rem;
}

/* for three cards done */

/* for map start */
.map-container {
  position: relative;
  height: 80vh;
  width: 80%;
  margin: 0 auto;
}
.map {
  height: 100%;
  width: 100%;
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
.legend {
  background: white;
  padding: 10px 12px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  font-size: 13px;
  line-height: 1.6;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.legend-item:last-child {
  margin-bottom: 0;
}

.legend-color {
  width: 14px;
  height: 14px;
  display: inline-block;
  margin-right: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

:deep(.ms-legend) {
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.1);
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.6;
  color: #2c3e50;
}

:deep(.ms-legend .legend-title) {
  font-weight: 600;
  margin-bottom: 6px;
}

:deep(.ms-legend .legend-item) {
  display: flex;
  align-items: center;
  margin: 4px 0;
}

:deep(.ms-legend .swatch) {
  width: 14px;
  height: 14px;
  border-radius: 3px;
  border: 1px solid rgba(0,0,0,0.2);
  display: inline-block;
  margin-right: 8px;
}

/* for map done */


</style>