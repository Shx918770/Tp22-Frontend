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
    <!-- Infrastructure Cards --><!--Design by HongxiangShao-->
    <div class="facilities-grid">
      <!-- Public Transport Bubble --><!--Design by HongxiangShao-->
      <div class="facility-bubble transport">
        <div class="bubble-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M3 7V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V7M3 7L5 19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19L21 7M3 7H21M9 11V17M15 11V17" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <div class="bubble-content">
          <div class="bubble-label">Public Transport</div>
          <div class="bubble-details">
            <span class="detail-pill">{{ stats.transport.trainStations || 0 }} Train Stations</span>
            <span class="detail-pill">{{ stats.transport.tramStops || 0 }} Tram Stops</span>
            <span class="detail-pill">{{ stats.transport.busStops || 0 }} Bus Stops</span>
          </div>
        </div>
        <div class="bubble-glow"></div>
      </div>

      <!-- Cycling Infrastructure Bubble --><!--Design by HongxiangShao-->
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
          <div class="bubble-details">
            <span class="detail-pill">{{ stats.cycling.bikeLanes || 0 }} km Bike Lanes</span>
          </div>
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
          <div class="bubble-details">
            <span class="detail-pill">{{ stats.parking.publicSpaces || 0 }} Public Spaces</span>
          </div>
        </div>
        <div class="bubble-glow"></div>
      </div>
    </div>
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

    <!-- Public Transport Facilities Section -->
    <section id="public-transport-detail" class="public-transport-detail">
      <div class="container">
        <div class="detail-header">
          <h2>Public Transport Facilities</h2>
          <p>Comprehensive overview of transport modes and stops in the suburb</p>
        </div>

        <!-- Two-section layout --><!--Design by HongxiangShao-->
        <div class="transport-grid">
          <!-- Section 1: Mode Distribution --><!--Design by HongxiangShao-->
          <div class="transport-section pie-chart-section">
            <div class="section-header">
              <div class="section-icon">
                <!-- Transport icon --><!--Design by HongxiangShao-->
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 7V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V7" stroke="currentColor" stroke-width="2"/>
                  <path d="M3 7L5 19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19L21 7H3Z" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <h3>Mode Distribution</h3>
            </div>
            <div class="section-content">
              <div class="pie-chart-container">
                <canvas id="transportChart"></canvas>
              </div>
            </div>
          </div>

          <!-- Section 2: Stops List --><!--Design by HongxiangShao-->
          <div class="transport-section stop-list-section">
            <div class="section-header">
              <div class="section-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <h3>List of Stops</h3>
              <select v-model="stopFilter" class="transport-filter">
                <option value="all">All Modes</option>
                <option value="TRAIN">Train</option>
                <option value="TRAM">Tram</option>
                <option value="BUS">Bus</option>
              </select>
            </div>
            <div class="section-content">
              <div class="stop-list">
                <div v-for="stop in filteredStops" :key="stop.STOP_ID" class="stop-item">
                  <div class="stop-name">{{ stop.STOP_NAME }}</div>
                  <div class="stop-type">{{ stop.MODE }}</div>
                  <div class="stop-locality">{{ stop.LOCALITY }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import { infrastructureApi, apiUtils } from '../../services/api.js'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Chart from 'chart.js/auto'

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
      stopFilter: 'all',
      loading: false,
      error: null
    }
  },
  computed: {
    selectedSuburb() {
      return this.$route?.query?.suburb || ''
    },
    filteredStops() {
      if (!this.stats.transport.stops) return [];
      if (this.stopFilter === 'all') return this.stats.transport.stops;
      return this.stats.transport.stops.filter(s => s.MODE?.toUpperCase().includes(this.stopFilter));
    },
  },
  mounted() {
    console.log("Loaded plugins:", Chart.registry.plugins);
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

            const modeCounts = {}
            rows.forEach(r => {
              const mode = r.MODE?.toUpperCase() || 'UNKNOWN'
              modeCounts[mode] = (modeCounts[mode] || 0) + 1
            })

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
                ).length,
                modes: modeCounts,
                stops: rows
            }
            this.renderTransportChart()
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
    renderTransportChart() {
      const ctx = document.getElementById('transportChart').getContext('2d');

      const allModes = [
        "INTERSTATE TRAIN",
        "METRO BUS",
        "METRO TRAIN",
        "METRO TRAM",
        "REGIONAL COACH",
        "REGIONAL TRAIN",
        "SKYBUS"
      ];

      const colors = {
        "INTERSTATE TRAIN": "#9C27B0",
        "METRO BUS": "#8BC34A",
        "METRO TRAIN": "#4CAF50",
        "METRO TRAM": "#FF9800",
        "REGIONAL COACH": "#FF5722",
        "REGIONAL TRAIN": "#2196F3",
        "SKYBUS": "#795548"
      };

      let modes = allModes.map(mode => ({
        mode,
        count: this.stats.transport.modes?.[mode] || 0,
        color: colors[mode]
      }));

      // odrer by count descending
      modes.sort((a, b) => b.count - a.count);

      const total = modes.reduce((sum, m) => sum + m.count, 0);
      const maxValue = Math.max(...modes.map(m => m.count), 1);

      const ringWidth = 20;
      const ringGap = 8;
      const baseCutout = 65;

      const datasets = modes.map((m, i) => {
        const inner = baseCutout + i * (ringWidth + ringGap);
        const outer = inner + ringWidth;
        return {
          label: m.mode,
          data: [m.count, total - m.count],
          backgroundColor: [
            m.count > 0 ? m.color : "#E0E0E0", 
            "rgba(0,0,0,0.05)"
          ],
          borderWidth: 0,
          cutout: inner,
          radius: outer
        };
      });

      // if chart already exists, destroy it first
      if (this.transportChart) {
        this.transportChart.destroy();
      }

      this.transportChart = new Chart(ctx, {
        type: 'doughnut',
        data: { datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: {top: -60}},
          rotation: 0,
          circumference: 270,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
            // stop showing values on segments
            datalabels: { display: false },
            doughnutlabel: { labels: [] },
          },
          elements: {
            arc: { borderWidth: 0 }
          }
        },
        plugins: [
          // clean center
          {
            id: 'clearCenter',
            beforeDraw(chart) {
              const { ctx, chartArea: { width, height } } = chart;
              ctx.save();
              ctx.clearRect(width / 2 - 200, height / 2 - 40, 400, 200);
              ctx.restore();
            }
          },
          {
            id: 'moveUp',
            beforeDraw(chart) {
              const { ctx, chartArea: { width, height } } = chart;
              ctx.save();
              ctx.translate(0, -170);
            },
            afterDraw(chart) {
              chart.ctx.restore();
            }
          },
          // only show Total: xxx
          {
            id: 'centerText',
            afterDraw: (chart) => {
              const { ctx, chartArea: { width, height } } = chart;
              ctx.save();
              ctx.font = 'bold 22px Inter';
              ctx.fillStyle = '#111';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(`Total: ${total}`, width / 2, height / 2 -170);
              ctx.restore();
            }
          },
          //  legend
          {
            id: 'customLegend',
            afterDraw: (chart) => {
              const { ctx, chartArea: { width, height } } = chart;
              ctx.save();
              ctx.font = '12px Inter';
              ctx.textAlign = 'right';
              ctx.textBaseline = 'middle';

              const centerX = width / 2 - 10;
              const centerY = height / 2 -150;

              chart.data.datasets.forEach((ds, datasetIndex) => {
                if (ds.data[0] === 0) return;
                const meta = chart.getDatasetMeta(datasetIndex);
                const arc = meta.data[0];
                if (!arc) return;

                // line angle
                const angle = arc.startAngle;
                // line length
                const r = arc.outerRadius + 15;

                const x = centerX + Math.cos(angle) * r;
                const y = centerY + Math.sin(angle) * r;

                // text
                ctx.fillStyle = ds.backgroundColor[0];
                ctx.fillText(`${ds.label} (${ds.data[0]})`, x + 8, y);
              });

              ctx.restore();
            }
          }
        ]
      });
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
  padding-top: 80px;
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
.facilities-grid {
  display: flex;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 80%;
  margin: 0 auto;
  justify-content: space-between;
}

.facility-bubble {
  /* position: relative; */
  flex: 1;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95));
  backdrop-filter: blur(30px);
  border-radius: 20px;
  padding: 1.2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  overflow: hidden;
  max-width: 300px;
  animation: bubbleFloat 6s ease-in-out infinite;
}

@keyframes bubbleFloat {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-10px) rotate(1deg);
  }
  50% {
    transform: translateY(-5px) rotate(0deg);
  }
  75% {
    transform: translateY(-15px) rotate(-1deg);
  }
}

.facility-bubble:hover {
  transform: translateY(-15px) scale(1.05) rotate(2deg);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
}

.facility-bubble.transport:hover {
  box-shadow: 0 25px 60px rgba(33, 150, 243, 0.3);
}

.facility-bubble.cycling:hover {
  box-shadow: 0 25px 60px rgba(244, 67, 54, 0.3);
}

.facility-bubble.parking:hover {
  box-shadow: 0 25px 60px rgba(76, 175, 80, 0.3);
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
  border: 2px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.facility-bubble.transport .bubble-icon {
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.2), rgba(33, 150, 243, 0.3));
  color: #2196F3;
}

.facility-bubble.cycling .bubble-icon {
  background: linear-gradient(135deg, rgba(244, 67, 54, 0.2), rgba(244, 67, 54, 0.3));
  color: #f44336;
}

.facility-bubble.parking .bubble-icon {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(76, 175, 80, 0.3));
  color: #4CAF50;
}

.facility-bubble:hover .bubble-icon {
  transform: scale(1.1) rotate(360deg);
  border-color: rgba(255, 255, 255, 0.6);
}

.bubble-content {
  text-align: center;
  position: relative;
  z-index: 2;
}

.bubble-number {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 0.4rem;
  animation: numberPop 2s ease-in-out infinite;
}

@keyframes numberPop {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.facility-bubble.transport .bubble-number {
  color: #2196F3;
}

.facility-bubble.cycling .bubble-number {
  color: #f44336;
}

.facility-bubble.parking .bubble-number {
  color: #4CAF50;
}

.bubble-label {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.8rem;
}

.bubble-details {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: center;
}

.detail-pill {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  padding: 0.5rem 0.8rem;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #444;
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
  animation: pillFloat 4s ease-in-out infinite;
}

@keyframes pillFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
}

.facility-bubble:hover .detail-pill {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-2px);
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

.facility-bubble.transport .bubble-glow {
  background: radial-gradient(circle, rgba(33, 150, 243, 0.1) 0%, transparent 70%);
}

.facility-bubble.cycling .bubble-glow {
  background: radial-gradient(circle, rgba(244, 67, 54, 0.1) 0%, transparent 70%);
}

.facility-bubble.parking .bubble-glow {
  background: radial-gradient(circle, rgba(76, 175, 80, 0.1) 0%, transparent 70%);
}

.facility-bubble:hover .bubble-glow {
  opacity: 1;
  animation: glowPulse 2s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.6;
  }
}

.facility-bubble.transport .bubble-icon { background: linear-gradient(135deg, rgba(33,150,243,0.2), rgba(33,150,243,0.3)); color: #2196F3; }
.facility-bubble.cycling .bubble-icon { background: linear-gradient(135deg, rgba(76,175,80,0.2), rgba(76,175,80,0.3)); color: #4CAF50; }
.facility-bubble.parking .bubble-icon { background: linear-gradient(135deg, rgba(255,152,0,0.2), rgba(255,152,0,0.3)); color: #FF9800; }

.facility-bubble.transport .bubble-glow { background: radial-gradient(circle, rgba(33,150,243,0.1) 0%, transparent 70%); }
.facility-bubble.cycling .bubble-glow { background: radial-gradient(circle, rgba(76,175,80,0.1) 0%, transparent 70%); }
.facility-bubble.parking .bubble-glow { background: radial-gradient(circle, rgba(255,152,0,0.1) 0%, transparent 70%); }
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
/* for map end */

/* Public Transport Facilities Section Start */
.public-transport-detail {
  padding: 4rem 0;
  position: relative;
}

.public-transport-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 2rem;
  width: 80%;
  height: 700px;
  margin: 0 auto;
  grid-template-areas: 
    "pie-chart stop-list"
}

.detail-header {
  text-align: center;
  margin-bottom: 3rem;
}

.detail-header h2 {
  font-size: 3rem;
  font-weight: 900;
  color: #1e293b;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #1e293b 0%, #3b82f6 30%, #ef4444 60%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  letter-spacing: -0.03em;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  position: relative;
}

.detail-header h2::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #ef4444, #f59e0b);
  border-radius: 2px;
}

.detail-header p {
  color: #475569;
  font-size: 1.3rem;
  font-weight: 500;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.chart-container {
  flex: 1;
  padding: 1rem;
  min-height: 500px;
}

.stops-list {
  flex: 1;
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  min-height: 540px;
  max-height: 540px;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
}

.stops-list h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
  font-weight: 600;
}

.stops-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.stops-list li {
  padding: 0.8rem;
  border-bottom: 1px solid #eee;
  font-size: 0.95rem;
}

.stops-list li:last-child {
  border-bottom: none;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  background: linear-gradient(90deg, #2196F3, #4CAF50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.facilities-content {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.chart-container {
  flex: 1;
  padding: 1rem;
}

.card-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
}

.card-header h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1f2937;
}

.transport-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 2rem;
  width: 80%;
  margin: 0 auto;
  grid-template-areas: 
    "pie-chart stop-list";
}

.transport-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 2rem;
  backdrop-filter: blur(30px);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.08),
    0 8px 25px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.4);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.transport-section:hover {
  transform: translateY(-5px);
  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.12),
    0 12px 35px rgba(0, 0, 0, 0.08);
}

.transport-section.pie-chart-section {
  grid-area: pie-chart;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.9));
  border: 1px solid rgba(226, 232, 240, 0.6);
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.transport-section.stop-list-section {
  grid-area: stop-list;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.9));
  border: 1px solid rgba(226, 232, 240, 0.6);
  height: 700px;
}

.pie-chart-container {
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 1rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.8));
  border-radius: 15px;
  border: 2px solid rgba(59, 130, 246, 0.25);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(15px);
}

.pie-chart-container canvas {
  width: 100% !important;
  height: 100% !important;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid rgba(148, 163, 184, 0.2);
  padding-bottom: 1rem;
}

.section-header h3 {
  flex: 1;
  color: #1e293b;
  font-weight: 700;
  font-size: 1.4rem;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  letter-spacing: -0.02em;
  margin: 0;
  position: relative;
}

.section-header h3::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 3px;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.pie-chart-section .section-header h3::after {
  background: linear-gradient(90deg, #3b82f6, #6366f1);
}

.stop-list-section .section-header h3::after {
  background: linear-gradient(90deg, #ef4444, #f43f5e);
}

.section-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.pie-chart-section .section-icon {
  color: #3b82f6;
}

.stop-list-section .section-icon {
  color: #ef4444;
}

.transport-filter {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.4rem 0.6rem;
  font-size: 0.9rem;
  color: #374151;
  transition: all 0.2s ease;
}

.transport-filter:hover {
  border-color: #3b82f6;
}

.stop-list {
  flex: 1;
  max-height: 550px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.8));
  border-radius: 15px;
  padding: 1.5rem;
  border: 2px solid rgba(239, 68, 68, 0.15);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(15px);
  overflow-x: hidden;
}

.stop-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.stop-item:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: translateX(5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.stop-name {
  font-weight: 600;
  color: #2c3e50;
}
.stop-type {
  color: #666;
  font-size: 0.9rem;
}
.stop-locality {
  color: #999;
  font-size: 0.8rem;
}

.stats-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.stats-list li {
  margin: 0.6rem 0;
  font-size: 1rem;
  font-weight: 500;
}

/* Public Transport Facilities Section End */

</style>