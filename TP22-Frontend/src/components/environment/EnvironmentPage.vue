<template>
  <div class="environment-page">
    <!-- Dynamic Background with Environmental Theme -->
    <div class="dynamic-background">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
        <div class="shape shape-5"></div>
      </div>
    </div>
    <!-- Header Component -->
    <Header />

    <!-- Main Content -->
    <main class="main-content">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container hero-container">
          <!-- Environment Insights Header -->
          <div class="hero-header">
            <h1 class="page-title">
              <span>Environmental</span>
              <span>Sustainability</span>
              <span>Insights</span>
            </h1>
            <p class="page-description">
              Explore suburb-level environmental data including tree canopy, air quality, and energy to understand ecological health and predict future sustainability challenges.
            </p>
          </div>
          <ScoreHeader
            :score="environmentScore"
            :suburb="selectedSuburb"
            label="Environment Score"
            @show-info="showScoreExplanation = true"
          />
          <!-- Key Environmental Indicators -->
          <div class="indicators">
            <div class="indicators-grid">
              <!-- Tree Canopy Coverage -->
              <div class="indicator-card canopy" @click="toggleTreeDetail"style="cursor: pointer;">
                <div class="indicator-content">
                  <div class="indicator-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7.5 13 17 8 17 8Z" stroke="currentColor" stroke-width="2" fill="currentColor"/>
                    </svg>
                  </div>
                  <div class="progress-ring">
                    <svg class="progress-svg" width="120" height="120">
                      <circle class="progress-track" cx="60" cy="60" r="50" stroke="#e0f7e9" stroke-width="8" fill="none"/>
                      <circle class="progress-bar canopy-progress" cx="60" cy="60" r="50" stroke="#4CAF50" stroke-width="8" fill="none" 
                              stroke-dasharray="314" stroke-dashoffset="94.2" transform="rotate(-90 60 60)"/>
                    </svg>
                    <div class="progress-text">
                      <div class="progress-value">{{ treeCardInfo.score !== null ? treeCardInfo.score : '-' }}</div>
                      <div class="progress-label">score</div>
                    </div>
                  </div>
                  <div class="indicator-details">
                    <h3 class="indicator-title">Tree Canopy</h3>
                    <p class="indicator-description">{{ treeCardInfo.description || 'No data available' }}</p>
                    <div class="indicator-metrics">
                    </div>
                  </div>
                </div>
              </div>

              <!-- Air Quality Index -->
              <div class="indicator-card air-quality" @click="toggleAirDetail" style="cursor: pointer;">
                <div class="indicator-content">
                  <div class="indicator-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <path d="M14.828 14.828C15.607 14.049 16.049 12.993 16.049 11.892C16.049 10.791 15.607 9.735 14.828 8.956C14.049 8.177 12.993 7.735 11.892 7.735C10.791 7.735 9.735 8.177 8.956 8.956" stroke="currentColor" stroke-width="2"/>
                      <path d="M17.657 17.657C19.781 15.533 19.781 12.075 17.657 9.951C15.533 7.827 12.075 7.827 9.951 9.951" stroke="currentColor" stroke-width="2"/>
                      <path d="M6.343 6.343C3.219 9.467 3.219 14.533 6.343 17.657C9.467 20.781 14.533 20.781 17.657 17.657" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </div>
                  <div class="progress-ring">
                    <svg class="progress-svg" width="120" height="120">
                      <circle class="progress-track" cx="60" cy="60" r="50" stroke="#e3f2fd" stroke-width="8" fill="none"/>
                      <circle class="progress-bar air-progress" cx="60" cy="60" r="50" stroke="#2196F3" stroke-width="8" fill="none" 
                              stroke-dasharray="314" stroke-dashoffset="125.6" transform="rotate(-90 60 60)"/>
                    </svg>
                    <div class="progress-text">
                      <div class="progress-value">{{ airQualityInfo.aqi !== null ? airQualityInfo.aqi : '-' }}</div>
                      <div class="progress-label">AQI</div>
                    </div>
                  </div>
                  <div class="indicator-details">
                    <h3 class="indicator-title">Air Quality</h3>
                    <p class="indicator-description">{{ airQualityInfo.description || 'No data available' }}</p>
                    <div class="indicator-metrics">
                    </div>
                  </div>
                </div>
              </div>

              <!-- Energy Usage -->
              <div class="indicator-card energy-usage" @click="toggleEnergyDetail" style="cursor: pointer;">
                <div class="indicator-content">
                  <div class="indicator-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" stroke-width="2" fill="currentColor"/>
                    </svg>
                  </div>
                  <div class="progress-ring">
                    <svg class="progress-svg" width="120" height="120">
                      <circle class="progress-track" cx="60" cy="60" r="50" stroke="#f3e5f5" stroke-width="8" fill="none"/>
                      <circle class="progress-bar energy-progress" cx="60" cy="60" r="50" stroke="#9C27B0" stroke-width="8" fill="none" 
                              stroke-dasharray="314" stroke-dashoffset="157" transform="rotate(-90 60 60)"/>
                    </svg>
                    <div class="progress-text">
                      <div class="progress-value">{{ energyCardInfo.score !== null ? energyCardInfo.score : '-' }}</div>
                      <div class="progress-label">score</div>
                    </div>
                  </div>
                  <div class="indicator-details">
                    <h3 class="indicator-title">Energy</h3>
                    <p class="indicator-description">{{ energyCardInfo.description || 'No data available' }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tree Detail Section -->
       <section id="tree-detail-section" class="tree-detail-section">
        <div class="container">
          <div class="detail-card">
            <h2 class="section-title">Tree Insights</h2>
            <p class="section-subtitle">Tree distribution, species diversity and lifespan trends</p>

            <div class="detail-grid">
              <!-- map -->
              <div class="card-panel">
                <h3 class="panel-title">Tree Distribution Map</h3>
                <l-map ref="mapRef" style="height: 300px; width: 100%;" :zoom="17" :center="mapCenter">
                  <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <l-circle-marker
                    v-for="tree in trees"
                    :key="tree.id"
                    :lat-lng="[tree.lat, tree.lng]"
                    :radius="6"
                    color="green"
                    fillColor="white"
                    :fillOpacity="1"
                  />
                </l-map>
              </div>

              <!-- list -->
              <div class="card-panel">
                <h3 class="panel-title">Tree Species List</h3>
                <!-- order icon -->
                <div class="sort-buttons">
                  <button 
                    :class="{ active: speciesSort === 'alphabetical' }"
                    @click="speciesSort = 'alphabetical'">
                    order by a-z
                  </button>
                  <button 
                    :class="{ active: speciesSort === 'count' }"
                    @click="speciesSort = 'count'">
                    order by count
                  </button>
                </div>

                <div class="species-list-container">
                  <ul class="species-list">
                    <li v-for="item in speciesList" :key="item.species">
                      {{ item.species }} - {{ item.count }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- trend -->
            <div class="card-panel trend-panel">
              <h3 class="panel-title">Total Number of Trees</h3>
              <LineChart :chart-data="plantedTrendData" />
            </div>
          </div>
        </div>
      </section>

      <!-- Energy Consumption Map -->
      <section id="energy-map-section" class="energy-map-section">
        <div class="container">
          <div class="detail-card">
            <h2 class="section-title">Block-level Energy Consumption Map (2026)</h2>
            <p class="section-subtitle">Boundaries colored by total energy consumption</p>

            <l-map style="height: 400px; width: 100%;" :zoom="13" :center="mapCenter">
              <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <l-geo-json
                v-if="energyBlocks"
                :geojson="energyBlocks"
                @ready="onGeoJsonReady"
              />
              <!-- Legend -->
              <div class="legend">
                <h4>Total Energy (2026)</h4>
                <div><span style="background:#800026"></span> > 70,000</div>
                <div><span style="background:#BD0026"></span> 30,001 - 70,000</div>
                <div><span style="background:#FC4E2A"></span> 15,001 - 30,000</div>
                <div><span style="background:#FD8D3C"></span> 5,001 - 15,000</div>
                <div><span style="background:#FEB24C"></span> 1,001 - 5,000</div>
                <div><span style="background:#FFEDA0"></span> 0 - 1,000</div>
              </div>
            </l-map>
          </div>
        </div>
      </section>

      <!-- Environmental Forecasting - Predictive Dashboard -->
      <section class="environmental-forecasting">
        <div class="container">
          <div class="forecasting-header">
            <h2 class="section-title">Environmental Forecasting</h2>
            <p class="section-subtitle">5-year environmental projections and sustainability insights</p>
          </div>

          <div class="forecasting-dashboard">
          <!-- Energy Projections -->
          <section id="energy-detail-section" class="forecast-panel energy-projections">
            <div class="projection-grid">
              <!-- left LineChart -->
              <div class="projection-left">
                <h4 class="projection-subtitle">Block-level Energy Forecast: Total Trend & Sector Allocation (2011-2026)</h4>
                <LineChart :chart-data="energyTrendData || { labels: [], datasets: [] }" />
              </div>

              <!-- right two Doughnut -->
              <div class="projection-right">
                <div class="gauge">
                  <h4>Residential</h4>
                  <DoughnutChart :chart-data="residentialGauge" :options="gaugeOptions" />
                </div>
                <div class="gauge">
                  <h4>Commercial</h4>
                  <DoughnutChart :chart-data="commercialGauge" :options="gaugeOptions" />
                </div>
              </div>
            </div>

            <!-- improve summary -->
            <div class="projection-section growth-summary">
              <p>2011 → 2016: <strong>+23.0% growth</strong></p>
              <p>2016 → 2021: <strong>+8.7% growth</strong></p>
              <p>2021 → 2026: <strong>-12.4% decline</strong></p>
              <p>Peak consumption around 2021, then projected to dip slightly.</p>
            </div>
          </section>
          </div>
        </div>
      </section>

      <!-- Loading Overlay -->
      <div v-if="loading" class="loading-overlay">
        <div class="loading-container">
          <div class="loading-spinner"></div>
          <p>Loading environmental data...</p>
        </div>
      </div>

      <!-- Error Overlay -->
      <div v-if="error" class="error-overlay">
        <div class="error-container">
          <div class="error-icon">⚠️</div>
          <p>{{ error }}</p>
          <button class="retry-btn" @click="retryLoading">Retry</button>
        </div>
      </div>
    </main>
    <!-- back to top -->
    <button 
      v-show="showBackToTop" 
      class="back-to-top" 
      @click="scrollToTop">
      ⬆
    </button>
  </div>
</template>

<script>
import { environmentApi, apiUtils } from '../../services/api.js'
import { LMap, LTileLayer, LCircleMarker, LMarker, LGeoJson, LPopup} from "@vue-leaflet/vue-leaflet";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import LineChart from "@/components/environment/LineChart.vue";
import DoughnutChart from "@/components/environment/DoughnutChart.vue";
import Header from '../header/Header.vue';
import ScoreHeader from '../scoreheader/ScoreHeader.vue';

ChartJS.register(ArcElement, Tooltip, Legend);

const centerTextPlugin = {
  id: "centerText",
  beforeDraw(chart) {
    if (chart.config.type !== "doughnut") return;

    const { width, height } = chart;
    const ctx = chart.ctx;

    // check dataset exsist
    if (!chart.config || !chart.config.data || !chart.config.data.datasets.length) {
      return;
    }

    const dataset = chart.config.data.datasets[0];
    if (!dataset.data || dataset.data.length === 0) {
      return;
    }

    const value = dataset.data[0]; // usage value
    const text = `${value}%`;

    ctx.restore();
    const fontSize = (height / 100).toFixed(2);
    ctx.font = `${fontSize}em sans-serif`;
    ctx.textBaseline = "middle";

    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 1.8;

    ctx.fillText(text, textX, textY);
    ctx.save();
  }
};

ChartJS.register(centerTextPlugin);

export default {

  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LMarker,
    LGeoJson, 
    LPopup,
    LineChart,
    DoughnutChart,
    Header,
    ScoreHeader,
  },

  name: 'EnvironmentPage',
  data() {
    return {
      environmentScore: null,
      showScoreExplanation: false,

      //for three card
      treeCardInfo: {
        score: null,
        description:''
      },
      airQualityInfo: {
        aqi: null,
        description: ''
      },
      energyCardInfo:{
        score: null,
        description: ''
      },


      //for button which back to top
      showBackToTop: false,
      //for tree part
      trees: [],
      mapCenter: [-37.81, 144.96],
      mapZoom: 11,
      treeIcon: L.divIcon({
        className: "tree-circle-icon",
        html: '<div class="circle"></div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      }),
      // record the order of the tree list
      speciesSort: 'alphabetical',
      airStations: [],
      latestPollutants: {},
      airTrendData: { labels: [], datasets: [] }, 
      energyTrendData: { labels: [], datasets: [] },
      residentialGauge: {               
        labels: ["Usage", "Remaining"],
        datasets: [{ data: [0, 100], backgroundColor: ["#4CAF50", "#e0e0e0"] }]
      },
      commercialGauge: {
        labels: ["Usage", "Remaining"],
        datasets: [{ data: [0, 100], backgroundColor: ["#2196F3", "#e0e0e0"] }]
      },
      gaugeOptions: {
        cutout: "70%",
        plugins: {
          legend: { display: false },
          centerText: true
        }
      },
      energyBlocks: null,
      loading: false,
      error: null
    }
  },

  mounted() {

    this.$nextTick(() => {
      const navHeight = this.$el.querySelector(".nav-bar").offsetHeight;
      document.documentElement.style.setProperty("--nav-height", navHeight + "px");
    });

    // initializeAnimations();
    // setupTimeSelector();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    window.addEventListener("scroll", this.checkScroll);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateTabs);
    window.removeEventListener("scroll", this.checkScroll);
  },
  methods: {
    //button for back top
    checkScroll() {
      this.showBackToTop = window.scrollY > 200;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    async fetchEnvironmentScore(suburb) {
      if (!suburb) return;

      try {
        const response = await environmentApi.getEnvironmentScore(suburb);
        const result = response.data;
        if (result.success && result.data) {
          this.environmentScore = {
            value: result.data.environment_score,
            reason: "Environmental sustainability performance based on multiple ecological indicators."
          };
        } else {
          this.environmentScore = null;
        }
      } catch (error) {
        console.error("Error fetching environment score:", error);
        this.environmentScore = null;
      }
    },

    // data for air card
    async loadTreeCard(suburb) {
      try {
        const res = await environmentApi.getTreeCardBySuburb(suburb);
        const data = res.data?.data;

        if (data) {
          this.treeCardInfo = {
            score: data.score || null,
            description: data.interpretation || 'No description available',
          };
        } else {
          this.treeCardInfo = { score: null, description: 'No data'};
        }
      } catch (e) {
        console.error('Failed to load air quality info', e);
        this.treeCardInfo = { score: null, description: 'Error loading data'};
      }
    },

    // data of tree map
    async loadTrees(suburb) {
      try {
        const res = await environmentApi.getTreesBySuburb(suburb)
        const result = apiUtils.extractData(res)

        if (result.success && Array.isArray(result.data)) {
          this.trees = result.data.map(tree => ({
            lat: tree.latitude,
            lng: tree.longitude,
            name: tree.scientificName,
            year: (tree.yearPlanted && !isNaN(parseInt(tree.yearPlanted))) ? parseInt(tree.yearPlanted) : null
          }))
          if (this.trees.length > 0) {
            this.mapCenter = [this.trees[0].lat, this.trees[0].lng]
          }
        } else {
          this.trees = []
        }
      } catch (error) {
        console.error("fail to get the data of trees:", error)
      }
    },

    // data of AQI card
    async loadAirQuality(suburb) {
      try {
        const res = await environmentApi.getAirBySuburb(suburb);
        const data = res.data?.data;

        if (data) {
          this.airQualityInfo = {
            aqi: data.score || null,
            description: data.description || 'No description available',
          };
        } else {
          this.airQualityInfo = { aqi: null, description: 'No data'};
        }
      } catch (e) {
        console.error('Failed to load air quality info', e);
        this.airQualityInfo = { aqi: null, description: 'Error loading data'};
      }
    },

    // data for air trend
    async loadAirTrend(suburb) {
      try {
        const res = await environmentApi.getAirTrend(suburb);
        const data = res.data?.data || [];
        this.airTrendData = data;
      } catch (e) {
        console.error("Failed to load air trend", e);
        this.airTrendData = [];
      }
    },

    //data for energy card
    async loadEnergyCardScore(suburb) {
      try {
        const res = await environmentApi.getEnergyCardBySuburb(suburb);
        const data = res.data?.data;

        if (data) {
          this.energyCardInfo = {
            score: data.score || null,
            description: data.description || 'No description available',
          };
        } else {
          this.energyCardInfo = { score: null, description: 'No data'};
        }
      } catch (e) {
        console.error('Failed to load air quality info', e);
        this.energyCardInfo = { score: null, description: 'Error loading data'};
      }
    },
    

    onGeoJsonReady(layer) {
      layer.eachLayer(l => {
        const feature = l.feature;

        // set style (color by total)
        l.setStyle(this.styleEnergyBlock(feature));

        // bind popup
        l.bindPopup(`
          <div>
            <h3>Block Details</h3>
            <p><strong>Commercial:</strong> ${feature.properties.comm}</p>
            <p><strong>Residential:</strong> ${feature.properties.resi}</p>
            <p><strong>Properties:</strong> ${feature.properties.num_b_prop}</p>
            <p><strong>Total:</strong> ${feature.properties.total}</p>
          </div>
        `);
      });
    },
    getEnergyColor(value) {
      if (value > 70000) return "#800026";
      if (value > 30000) return "#BD0026";
      if (value > 15000) return "#FC4E2A";
      if (value > 5000)  return "#FD8D3C";
      if (value > 1000)  return "#FEB24C";
      return "#FFEDA0";
    },

    geoJsonOptions() {
      return {
        style: (feature) => this.styleEnergyBlock(feature),
        onEachFeature: (feature, layer) => this.onEachBlock(feature, layer)
      }
    },
    async loadEnergyBlocks(suburb) {
      try {
        const res = await environmentApi.getEnergyMap(suburb);
        const blocks = res.data?.data || [];

        const geojson = {
          type: "FeatureCollection",
          features: blocks.map((row, idx) => {
            let geometry = null;
            try {
              geometry = JSON.parse(row.geo_shape);
            } catch (e) {
              console.error("Failed to parse geo_shape for row", row, e);
            }

            return {
              type: "Feature",
              id: idx,
              properties: {
                suburb: row.suburb,
                comm: Number(row.comm),
                resi: Number(row.resi),
                num_b_prop: Number(row.num_b_prop),
                total: Number(row.total)
              },
              geometry
            };
          })
        };

        this.energyBlocks = geojson;
      } catch (e) {
        console.error("Failed to load energy blocks", e);
      }
    },

    async loadEnergyTrend(suburb) {
      try {
        const res = await environmentApi.getEnergyTrend(suburb);
        const allData = res.data?.data || [];

        //avg
        const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

        const totals2011 = allData.map(d => d.total_2011 || 0);
        const totals2016 = allData.map(d => d.total_2016 || 0);
        const totals2021 = allData.map(d => d.total_2021 || 0);
        const totals2026 = allData.map(d => d.total_2026 || 0);

        this.energyTrendData = {
          labels: ["2011", "2016", "2021", "2026"],
          datasets: [{
            label: "Energy Consumption(Average)",
            data: [
              avg(totals2011),
              avg(totals2016),
              avg(totals2021),
              avg(totals2026)
            ],
            borderColor: "#4CAF50",
            backgroundColor: "rgba(76, 175, 80, 0.2)",
            fill: true
          }]
        };
        this.residentialGauge = {
          labels: ["Usage", "Remaining"],
          datasets: [{
            data: [47, 53],
            backgroundColor: ["#4CAF50", "#e0e0e0"]
          }]
        };
        this.commercialGauge = {
          labels: ["Usage", "Remaining"],
          datasets: [{
            data: [47, 53],
            backgroundColor: ["#2196F3", "#e0e0e0"]
          }]
        };
      } catch (e) {
        console.error("Failed to load energy trend", e);
      }
    },

    styleEnergyBlock(feature){
      const total = Number(feature.properties.total) || 0;
      return {
        color: "#555",
        weight: 1,
        fillOpacity: 0.7,
        fillColor: this.getEnergyColor(total)
      };
    },

    onEachBlock(feature, layer) {
      layer.bindPopup(`
        <div>
          <h3>Block Details</h3>
          <p><strong>Commercial:</strong> ${feature.properties.comm}</p>
          <p><strong>Residential:</strong> ${feature.properties.resi}</p>
          <p><strong>Properties:</strong> ${feature.properties.num_b_prop}</p>
          <p><strong>Total:</strong> ${feature.properties.total}</p>
        </div>
      `);
    },

    // one in
    async loadEnvironmentalData(suburb) {
      if (!suburb) return;
      this.loading = true;
      this.error = null;

      try {
        await this.loadTrees(suburb);
        await this.loadEnergyTrend(suburb);
        await this.loadEnergyBlocks(suburb);
        await this.loadAirTrend(suburb);
        await this.loadAirQuality(suburb);
        await this.loadTreeCard(suburb);
        await this.loadEnergyCardScore(suburb);
        await this.fetchEnvironmentScore(suburb);
      } catch (e) {
        console.error("Failed to load environmental data", e);
        this.error = `Failed to load data for ${suburb}`;
      } finally {
        this.loading = false;
      }
    },

    toggleTreeDetail() {
      this.$nextTick(() => {
        document
          .getElementById("tree-detail-section")
          ?.scrollIntoView({ behavior: "smooth" });
      });
    },

    toggleAirDetail() {
      this.$nextTick(() => {
        document
          .getElementById("air-detail-section")
          ?.scrollIntoView({ behavior: "smooth" });
      });
    },
    toggleEnergyDetail() {
      this.$nextTick(() => {
        document
          .getElementById("energy-map-section")
          ?.scrollIntoView({ behavior: "smooth" });
      });
    }
  },
  computed: {
    plantedTrendData() {
      const yearCounts = {};

      this.trees.forEach(tree => {
        if (tree.year) {
          yearCounts[tree.year] = (yearCounts[tree.year] || 0) + 1;
        }
      });

      const sortedYears = Object.keys(yearCounts)
        .map(y => parseInt(y))
        .filter(y => y >= 2010 && y <= 2021)
        .sort((a, b) => a - b)
        .map(String);

      const cumulativeCounts = [];
      let runningTotal = 0;
      for (const year of sortedYears) {
        runningTotal += yearCounts[year] || 0;
        cumulativeCounts.push(runningTotal);
      }

      const aqiData = Array.isArray(this.airTrendData) ? this.airTrendData : [];

      return {
        labels: sortedYears,
        datasets: [
          {
            label: "Total Number of Trees 🌳",
            data: cumulativeCounts,
            borderColor: "green",
            backgroundColor: "rgba(0,128,0,0.3)",
            fill: true,
            yAxisID: "y",
          },
          {
            label: "Air Quality (AQI) 🌤️",
            data: sortedYears.map(year => {
              const match = aqiData.find(row => String(row.year) === String(year));
              return match ? match.aqi : null;
            }),
            borderColor: "#2196F3",
            backgroundColor: "rgba(33,150,243,0.2)",
            fill: false,
            yAxisID: "y1",
          },
        ],
      };
    },
    speciesList() {
    const counts = {};
    this.trees.forEach((tree) => {
      counts[tree.name] = (counts[tree.name] || 0) + 1;
    });

    let list = Object.entries(counts).map(([species, count]) => ({
      species,
      count
    }));

    if (this.speciesSort === 'alphabetical') {
      list.sort((a, b) => a.species.localeCompare(b.species));
    } else if (this.speciesSort === 'count') {
      list.sort((a, b) => b.count - a.count);
    }

    return list;
  },
    formattedPollutants() {
      if (!this.latestPollutants) return {};
      return {
        Suburb: this.latestPollutants.suburb || '',
        Date: this.latestPollutants.date || '',
        CO: this.latestPollutants.CO || '',
        NO2: this.latestPollutants.NO2 || '',
        O3: this.latestPollutants.O3 || '',
        PM10: this.latestPollutants.PM10 || '',
        PM25: this.latestPollutants.PM25 || '',
        SO2: this.latestPollutants.SO2 || ''
      };
    },
    speciesCount() {
      const counts = {};
      this.trees.forEach((tree) => {
        counts[tree.name] = (counts[tree.name] || 0) + 1;
      });
      return counts;
    },
    trendChartData() {
      const limitedTrees = this.trees.slice(0, 10);
      return {
        labels: limitedTrees.map((t) => t.name),
        datasets: [
          {
            label: "Life Expectancy (years)",
            data: limitedTrees.map((t) => t.life),
            borderColor: "green",
            backgroundColor: "rgba(0,128,0,0.3)"
          }
        ]
      };
    },
    selectedSuburb() {
      return this.$route?.query?.suburb || '';
    },

  },
  watch: {
    selectedSuburb: {
      immediate: true,
      handler(newSuburb) {
        if (newSuburb) {
          this.loadEnvironmentalData(newSuburb);
        }
      }
    },
    selectedTimePeriod(newPeriod) {
      if (this.selectedSuburb) {
        this.loadTrendData(this.selectedSuburb, newPeriod);
      }
    },
  }
}
</script>

<style scoped>
/* fixed on top */
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: white;
  border-bottom: 1px solid #eee;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

/* first line */
.nav-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* second line */
.nav-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* tabs */
.nav-tabs {
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  gap: 0.5rem;
  flex: 1;
}

.nav-tab {
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.nav-tab.active {
  background: #4CAF50;
  color: white;
}

/* ☰list + pull down */
.more-menu {
  position: relative;
  margin-left: 0.5rem;
  flex-shrink: 0;
}

.menu-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.dropdown {
  position: absolute;
  right: 0;
  top: 2.5rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  z-index: 2000;
}

/* cartoon */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* button for back top */
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  transition: transform 0.2s ease, opacity 0.3s ease;
  z-index: 1200;
}

.back-to-top:hover {
  transform: scale(1.1);
  background: linear-gradient(135deg, #45a049, #4CAF50);
}

.hero-section {
  justify-content: center;
  align-items: center;
  text-align: center;
}

  /* energy style */
.projection-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: start;
}

.projection-left {
  background: #fff;
  padding: 1rem;
  border-radius: 12px;
}

.projection-right {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.projection-right .gauge {
  flex: 1;
  text-align: center;
}

.projection-right canvas {
  max-width: 120px !important;
  max-height: 80px !important;
}

:deep(.tree-circle-icon) {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.tree-circle-icon .circle) {
  width: 14px;
  height: 14px;
  border: 2px solid #4CAF50;
  background-color: transparent;
  border-radius: 50%;
}
.species-list-container {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #eee;
  padding: 0.5rem;
  border-radius: 8px;
}

.species-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.species-list li {
  padding: 0.4rem 0;
  font-size: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.detail-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.card-panel {
  background: #fff;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

.panel-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.trend-panel {
  margin-top: 2rem;
}

.sort-buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.sort-buttons button {
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  border: 1px solid #4CAF50;
  background: white;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.sort-buttons button.active {
  background: #4CAF50;
  color: white;
}

.tree-detail-section {
  margin-top: 3rem;
  padding: 2rem;
  border: none;
  border-radius: 0;
  background: none;
  box-shadow: none;
  scroll-margin-top: var(--nav-height, 120px);
}

.tree-detail-top {
  display: flex;
  gap: 20px;
}

.tree-map {
  flex: 1;
}

.tree-list {
  flex: 1;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
}

.tree-trend {
  margin-top: 2rem;
}

.environment-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #1a1a1a;
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Dynamic Environmental Background */
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
    background: linear-gradient(
      135deg,
      rgba(240, 248, 255, 0.8) 0%,
      rgba(232, 245, 233, 0.7) 25%,
      rgba(248, 250, 252, 0.8) 50%,
      rgba(240, 248, 255, 0.7) 75%,
      rgba(232, 245, 233, 0.8) 100%
    );
  }
  33% {
    background: linear-gradient(
      135deg,
      rgba(243, 244, 246, 0.8) 0%,
      rgba(240, 248, 255, 0.7) 25%,
      rgba(232, 245, 233, 0.8) 50%,
      rgba(248, 250, 252, 0.7) 75%,
      rgba(240, 248, 255, 0.8) 100%
    );
  }
  66% {
    background: linear-gradient(
      135deg,
      rgba(248, 250, 252, 0.8) 0%,
      rgba(243, 244, 246, 0.7) 25%,
      rgba(240, 248, 255, 0.8) 50%,
      rgba(232, 245, 233, 0.7) 75%,
      rgba(248, 250, 252, 0.8) 100%
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

.shape-1 {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #66BB6A, #4CAF50);
  top: 60%;
  right: 15%;
  animation-delay: -5s;
}

.shape-3 {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #81C784, #66BB6A);
  bottom: 30%;
  left: 20%;
  animation-delay: -10s;
}

.shape-4 {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #A5D6A7, #81C784);
  top: 40%;
  left: 60%;
  animation-delay: -7s;
}

.shape-5 {
  width: 140px;
  height: 140px;
  background: linear-gradient(135deg, #C8E6C9, #A5D6A7);
  bottom: 20%;
  right: 30%;
  animation-delay: -3s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) translateX(10px) rotate(90deg);
  }
  50% {
    transform: translateY(-40px) translateX(-10px) rotate(180deg);
  }
  75% {
    transform: translateY(-20px) translateX(-20px) rotate(270deg);
  }
}

/* Navigation Bar */
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95));
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 30px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
}

.logo-icon {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.nav-tabs {
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  flex: 1;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  padding: 0.5rem;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-tab {
  padding: 0.8rem 1.5rem;
  border-radius: 20px;
  font-weight: 500;
  color: #666;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.nav-tab.active {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.nav-tab:hover:not(.active) {
  background: rgba(255, 255, 255, 0.5);
  color: #333;
}

/* Main Content */
.main-content {
  position: relative;
  z-index: 1;
  padding-top: calc(var(--nav-height, 120px) + 20px);
}

.container {
  width: 80%;
  max-width: none; 
  margin: 0 auto;
  padding: 0;
}

/* Insights Header */
.insights-header {
  padding: 6rem 0 4rem;
  text-align: center;
}

.header-content {
  position: relative;
  z-index: 2;
}

.title-animation {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  background: linear-gradient(135deg, #2c3e50, #4CAF50, #2196F3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title-word {
  background: linear-gradient(135deg, #2c3e50, #3498db, #4CAF50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  /* animation: titleGlow 3s ease-in-out infinite; */
}

.title-word:nth-child(2) {
  animation-delay: 0.5s;
}

.title-word:nth-child(3) {
  animation-delay: 1s;
}

@keyframes titleGlow {
  0%, 100% {
    filter: brightness(1);
    transform: scale(1);
  }
  50% {
    filter: brightness(1.2);
    transform: scale(1.05);
  }
}

.page-description {
  font-size: 1.3rem;
  color: rgba(44, 62, 80, 0.8);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem 2rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Environmental Indicators */
.environmental-indicators {
  padding: 4rem 0;
}

.indicators-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #2c3e50, #4CAF50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1.2rem;
  color: rgba(44, 62, 80, 0.7);
}

.indicators-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  justify-items: center;
  align-items: stretch;
  max-width: 1300px;
  margin: 0 auto;
}

.indicator-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95));
  backdrop-filter: blur(30px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  max-width: 380;
  min-width: 300;
}

.indicator-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 255, 255, 0.5);
}

.indicator-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.indicator-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.canopy .indicator-icon {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(76, 175, 80, 0.3));
  color: #4CAF50;
}

.air-quality .indicator-icon {
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.2), rgba(33, 150, 243, 0.3));
  color: #2196F3;
}

.water-usage .indicator-icon {
  background: linear-gradient(135deg, rgba(0, 188, 212, 0.2), rgba(0, 188, 212, 0.3));
  color: #00BCD4;
}

.indicator-card:hover .indicator-icon {
  transform: scale(1.1) rotate(360deg);
}

/* Progress Rings */
.progress-ring {
  position: relative;
  margin-bottom: 2rem;
}

.progress-svg {
  transform: rotate(-90deg);
}

.progress-track {
  opacity: 0.3;
}

.progress-bar {
  transition: stroke-dashoffset 2s ease-in-out;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.progress-value {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.2rem;
}

.canopy .progress-value {
  color: #4CAF50;
}

.air-quality .progress-value {
  color: #2196F3;
}

.water-usage .progress-value {
  color: #00BCD4;
}

.progress-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.indicator-details {
  width: 100%;
}

.indicator-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.8rem;
}

.indicator-description {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.indicator-metrics {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.metric {
  text-align: center;
}

.metric-value {
  display: block;
  font-size: 1.2rem;
  font-weight: 700;
  color: #4CAF50;
  margin-bottom: 0.2rem;
}

.metric-value.moderate {
  color: #FF9800;
}

.metric-label {
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
}

.trends-header {
  text-align: center;
  margin-bottom: 4rem;
}

.trends-visualization {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95));
  backdrop-filter: blur(30px);
  border-radius: 30px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.time-selector {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
}

.time-btn {
  padding: 0.8rem 1.5rem;
  border: 2px solid rgba(33, 150, 243, 0.2);
  background: rgba(255, 255, 255, 0.5);
  color: #2196F3;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.time-btn.active {
  background: linear-gradient(135deg, #2196F3, #42A5F5);
  color: white;
  border-color: #2196F3;
  box-shadow: 0 4px 15px rgba(33, 150, 243, 0.3);
}

.time-btn:hover:not(.active) {
  background: rgba(33, 150, 243, 0.1);
  border-color: rgba(33, 150, 243, 0.3);
}

.quality-chart {
  margin-bottom: 3rem;
}

.chart-container {
  position: relative;
}

.quality-levels {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.level {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.level-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.level.good .level-indicator {
  background: #4CAF50;
}

.level.moderate .level-indicator {
  background: #FFC107;
}

.level.unhealthy .level-indicator {
  background: #F44336;
}

.level-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.chart-area {
  height: 300px;
  margin-bottom: 1rem;
}

.trend-chart {
  width: 100%;
  height: 100%;
}

.trend-line {
  animation: drawLine 3s ease-in-out;
}

@keyframes drawLine {
  0% {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
  }
}

.data-point {
  cursor: pointer;
  transition: all 0.3s ease;
}

.data-point:hover {
  r: 8;
}

.chart-labels {
  display: flex;
  justify-content: center;
}

.x-labels {
  display: flex;
  justify-content: space-between;
  width: 80%;
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.trend-insights {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.insight-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  min-width: 300px;
  transition: all 0.3s ease;
}

.insight-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.insight-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.insight-icon.good {
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
}

.insight-icon.warning {
  background: rgba(255, 193, 7, 0.2);
  color: #FFC107;
}

.insight-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.insight-content p {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
}

.energy-detail-section {
  scroll-margin-top: var(--nav-height, 120px);
}

.energy-map-section {
  scroll-margin-top: var(--nav-height, 120px);
}

/* Environmental Forecasting */
.environmental-forecasting {
  padding: 6rem 0;
}

.forecasting-header {
  text-align: center;
  margin-bottom: 4rem;
}

.forecasting-dashboard {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    'energyProjections energyProjections'
    'emissions residential';
  gap: 1.75rem;
  margin-bottom: 3rem;
  align-items: stretch;
}

/* Grid area mapping */
.forecast-panel.emissions { grid-area: emissions; }
.forecast-panel.energy { grid-area: residential; }
.forecast-panel.energy-projections { grid-area: energyProjections; }

.forecast-panel {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.98));
  backdrop-filter: blur(30px);
  border-radius: 22px;
  padding: 1.6rem;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.35s ease;
  position: relative;
  overflow: hidden;
}

.forecast-panel:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.15);
}

/* Fancy glowing blobs */
.forecast-panel::after {
  content: '';
  position: absolute;
  width: 220px;
  height: 220px;
  right: -60px;
  top: -60px;
  border-radius: 50%;
  filter: blur(0);
  opacity: 0.9;
  pointer-events: none;
  background: radial-gradient(closest-side, rgba(76, 175, 80, 0.10), rgba(76, 175, 80, 0));
  animation: blobFloat 12s ease-in-out infinite alternate;
}

.forecast-panel.emissions::after { background: radial-gradient(closest-side, rgba(244, 67, 54, 0.10), rgba(244, 67, 54, 0)); }
.forecast-panel.energy::after { background: radial-gradient(closest-side, rgba(255, 193, 7, 0.12), rgba(255, 193, 7, 0)); }
.forecast-panel.energy-projections::after { background: radial-gradient(closest-side, rgba(76, 175, 80, 0.12), rgba(76, 175, 80, 0)); width: 300px; height: 300px; }

@keyframes blobFloat {
  from { transform: translateY(0) rotate(0); }
  to { transform: translateY(10px) rotate(4deg); }
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.2rem;
}

.panel-badges { margin-left: auto; display: inline-flex; gap: 8px; }
.badge { font-size: 12px; padding: 6px 10px; border-radius: 999px; border: 1px solid rgba(0,0,0,0.06); backdrop-filter: blur(6px); }
.badge.accent { background: rgba(76,175,80,.12); color: #2e7d32; border-color: rgba(76,175,80,.25); font-weight: 700; }
.badge.soft { background: rgba(33,150,243,.08); color: #1565c0; border-color: rgba(33,150,243,.2); }

.panel-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.emissions .panel-icon {
  background: linear-gradient(135deg, rgba(244, 67, 54, 0.2), rgba(244, 67, 54, 0.3));
  color: #F44336;
}

.energy .panel-icon {
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.2), rgba(255, 193, 7, 0.3));
  color: #FFC107;
}

.resilience .panel-icon {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(76, 175, 80, 0.3));
  color: #4CAF50;
}

.panel-title h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.3rem;
}

.panel-title p {
  color: #666;
  font-size: 0.9rem;
}

.forecast-visualization {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Emissions Chart */
.emissions-chart {
  height: 200px;
  display: flex;
  align-items: end;
  justify-content: center;
}

.projection-bars {
  display: flex;
  gap: 2rem;
  align-items: end;
  height: 100%;
}

.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.bar {
  width: 40px;
  border-radius: 20px 20px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  padding: 0.5rem;
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.bar.current {
  background: linear-gradient(180deg, #F44336, #D32F2F);
}

.bar.projected {
  background: linear-gradient(180deg, #FF9800, #F57C00);
}

.bar.target {
  background: linear-gradient(180deg, #4CAF50, #388E3C);
}

.bar:hover {
  transform: scale(1.05);
}

.bar-value {
  margin-bottom: 0.3rem;
}

.bar-label {
  font-size: 0.7rem;
  opacity: 0.9;
}

/* Energy Chart */
.energy-chart {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.consumption-rings {
  display: flex;
  gap: 3rem;
}

.ring-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ring-svg {
  transform: rotate(-90deg);
}

.ring-track {
  opacity: 0.3;
}

.ring-progress {
  transition: stroke-dashoffset 2s ease-in-out;
}

.ring-progress.renewable {
  stroke: #4CAF50;
}

.ring-progress.efficiency {
  stroke: #FF9800;
}

.ring-label {
  position: absolute;
  text-align: center;
}

.ring-value {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0.2rem;
}

.ring-text {
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
}

/* Resilience Gauge */
.resilience-gauge {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.gauge-svg {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.gauge-progress {
  transition: stroke-dasharray 2s ease-in-out;
}

.gauge-needle {
  transition: all 2s ease-in-out;
}

.forecast-metrics {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
}

.forecast-metrics .metric {
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  flex: 1;
}

.forecast-metrics .metric-value {
  font-size: 1.3rem;
  font-weight: 700;
  color: #4CAF50;
}

.forecast-metrics .metric-value.good {
  color: #4CAF50;
}

/* Energy Projections Panel */
.energy-projections .panel-icon {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(76, 175, 80, 0.3));
  color: #4CAF50;
}

/* Energy Tabs */
.energy-tabs {
  display: inline-flex;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 999px;
  padding: 6px;
  gap: 6px;
  margin: 0 auto 1rem auto;
}

.tab-btn {
  appearance: none;
  border: none;
  background: transparent;
  color: #2c3e50;
  padding: 8px 14px;
  font-weight: 600;
  border-radius: 999px;
  cursor: pointer;
  transition: all .25s ease;
}

.tab-btn:hover { opacity: .85; }

.tab-btn.active {
  background: linear-gradient(135deg, #e8f5e9, #ffffff);
  box-shadow: 0 6px 18px rgba(76, 175, 80, 0.15);
  color: #2e7d32;
}

/* Transition */
.fade-slide-enter-active, .fade-slide-leave-active { transition: all .28s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(6px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-6px); }

.energy-projections-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.projection-section {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 1.5rem;
}

.projection-section:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.projection-subtitle {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
}

/* Energy Projection Chart */
.energy-projection-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.projection-timeline {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
}

.timeline-item {
  text-align: center;
  flex: 1;
}

.timeline-year {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.3rem;
}

.timeline-value {
  font-size: 0.9rem;
  color: #666;
}

.energy-trend {
  width: 100%;
  max-width: 200px;
}

.legend {
  position: absolute;
  bottom: 20px;
  left: 20px;
  padding: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  font-size: 12px;
  line-height: 18px;
  color: #333;
  z-index: 1000;
}

.legend h4 {
  margin: 0 0 5px;
  font-size: 13px;
  font-weight: bold;
}

.legend div {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.legend span {
  display: inline-block;
  width: 20px;
  height: 12px;
  margin-right: 8px;
  border: 1px solid #999;
}

/* Property Energy Chart */
.property-energy-chart {
  display: flex;
  justify-content: center;
  align-items: end;
  height: 150px;
  margin-bottom: 1rem;
}

.capsule-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.capsule-row {
  display: grid;
  grid-template-columns: 90px 1fr 50px;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 0.8rem 1.2rem;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.capsule-row:hover {
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.capsule-label {
  color: #2c3e50;
  font-weight: 600;
  font-size: 0.9rem;
}

.capsule-track {
  position: relative;
  height: 14px;
  background: rgba(76,175,80,0.12);
  border-radius: 999px;
  overflow: hidden;
}

.capsule-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  border-radius: 999px;
  transition: width .5s ease;
}

.capsule-fill.residential {
  background: linear-gradient(90deg, #66bb6a, #43a047);
}

.capsule-fill.commercial {
  background: linear-gradient(90deg, #64b5f6, #1e88e5);
}

.capsule-fill.industrial {
  background: linear-gradient(90deg, #ffb74d, #fb8c00);
}

.capsule-value {
  text-align: right;
  color: #2e7d32;
  font-weight: 700;
}

.distribution-bar:hover {
  transform: scale(1.05);
}

.bar-label {
  font-size: 0.7rem;
  opacity: 0.9;
  text-align: center;
}

.energy-tabs { display: none; }
.energy-projections-content.energy-split { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 1.2rem; align-items: start; }

.energy-projection-chart svg { max-width: 100%; }
.consumption-rings { gap: 1.25rem; }
.ring-svg { width: 90px; height: 90px; }
.ring-value { font-size: 1.2rem; }
.projection-bars { gap: 1rem; }

/* Responsive Design */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .nav-tabs {
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
  
  .page-title {
    font-size: 2.5rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .forecasting-dashboard {
    grid-template-columns: 1fr;
    grid-template-areas:
      'emissions'
      'residential'
      'energyProjections';
    gap: 1.25rem;
    margin-bottom: 2rem;
  }
  .energy-tabs { display: inline-flex; }
  .energy-projections-content.energy-split { grid-template-columns: 1fr; }
  
  .energy-projections-content {
    gap: 1.5rem;
  }
  
  .energy-distribution {
    gap: 1rem;
  }
  
  .distribution-bar {
    width: 30px;
  }
  
  .consumption-rings {
    flex-direction: column;
    gap: 2rem;
  }
  
  .projection-bars {
    gap: 1rem;
  }
  
  .trends-visualization,
  .predictive-insights {
    padding: 2rem 1rem;
  }
  
  .quality-levels {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .trend-insights {
    flex-direction: column;
    gap: 1rem;
  }
  
  .insights-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .indicator-card,
  .forecast-panel {
    padding: 1.5rem;
  }
  
  .progress-ring {
    margin-bottom: 1.5rem;
  }
  
  .progress-svg,
  .ring-svg {
    width: 100px;
    height: 100px;
  }
  
  .progress-value,
  .ring-value {
    font-size: 1.5rem;
  }
  
  .time-selector {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .time-btn {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
}
.selected-suburb-pill {
  margin-left: 0.8rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: #2c3e50;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.06);
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
}

.suburb-display {
  margin-left: 0.8rem;
  font-size: 1.25rem;
  font-weight: 800;
  background: linear-gradient(135deg, #2c3e50, #4CAF50, #2196F3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.2px;
  display: inline-flex;
  align-items: center;
}

.suburb-display .pin {
  margin-right: 0.4rem;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15));
}

/* Loading and Error Overlays */
.loading-overlay,
.error-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.loading-overlay .loading-container,
.error-overlay .error-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  max-width: 400px;
  margin: 2rem;
}

.loading-overlay .loading-spinner {
  width: 60px;
  height: 60px;
  border: 6px solid rgba(76, 175, 80, 0.1);
  border-left: 6px solid #4CAF50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1.5rem auto;
}

.loading-overlay p,
.error-overlay p {
  color: #2c3e50;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

.error-overlay .error-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.error-overlay .retry-btn {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  margin-top: 1.5rem;
  font-size: 1rem;
}

.error-overlay .retry-btn:hover {
  background: linear-gradient(135deg, #45a049, #4CAF50);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
}
</style>
