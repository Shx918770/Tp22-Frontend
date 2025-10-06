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
      <div class="facility-bubble transport" role="button" tabindex="0" @click="scrollToSection('#pt-trend')" @keyup.enter.space="scrollToSection('#pt-trend')">
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

      <!-- Cycling Bubble --><!--Design by HongxiangShao-->
      <div class="facility-bubble cycling" role="button" tabindex="0" @click="scrollToSection('#cy-trend')" @keyup.enter.space="scrollToSection('#cy-trend')">
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
      <div class="facility-bubble parking" role="button" tabindex="0" @click="scrollToSection('#pk-trend')" @keyup.enter.space="scrollToSection('#pk-trend')">
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 7V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V7" stroke="currentColor" stroke-width="2"/>
                  <path d="M3 7L5 19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19L21 7H3Z" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <h3>Mode Distribution</h3>
            </div>
            <div class="section-content">
              <div class="pie-chart-container" style="padding:0;">
                <RadialRingsChart :items="ptModeItems" :sweepDeg="270" :startAngle="90" />
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
    <!-- PT Demand Trend Section -->
    <section id="pt-trend" class="pt-trend">
      <div class="container pt-trend-container">
        <div class="pt-trend-header">
          <h2>Public Transport Demand Trend</h2>
          <p>Demand ratio over time and the latest insight for this suburb</p>
        </div>

        <div class="pt-trend-grid">
          <!-- Left: Line Chart -->
          <div class="pt-trend-card chart-card">
            <div class="card-head">
              <div class="head-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M4 19V5M4 19H20M8 15L12 11L15 13L20 8" stroke="currentColor" stroke-width="2" />
                </svg>
              </div>
              <h3>Demand Ratio (2021–2036)</h3>
            </div>
            <div class="card-body">
              <canvas id="ptTrendChart"></canvas>
            </div>
          </div>

          <!-- Right: Insight -->
          <div class="pt-trend-card insight-card">
            <div class="card-head">
              <div class="head-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3V5M12 19V21M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M3 12H5M19 12H21M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <h3>Suburb Insight</h3>
            </div>

            <div class="card-body insight-body">
              <!-- 上半：固定洞察 -->
              <p v-if="ptTrend.insight" class="insight-text">{{ ptTrend.insight }}</p>
              <p v-else class="insight-empty">No insight available.</p>

              <div class="insight-divider"></div>

              <!-- 下半：按年份详情 -->
              <div class="year-detail-head">
                <span class="detail-title">Details by year</span>
                <div class="year-switch">
                  <button
                    v-for="y in [2021, 2026, 2031, 2036]"
                    :key="y"
                    class="year-chip"
                    :class="{ active: selectedYear === y, disabled: !ptTrend.byYear[y] }"
                    :disabled="!ptTrend.byYear[y]"
                    @click="selectedYear = y"
                  >{{ y }}</button>
                </div>
              </div>

              <ul class="insight-metrics" v-if="selectedYearData">
                <li><span>Population (est.)</span><b>{{ selectedYearData.population_est?.toLocaleString?.() || selectedYearData.population_est || '-' }}</b></li>
                <li><span>PT Stops Total</span><b>{{ selectedYearData.pt_stops_total ?? '-' }}</b></li>
                <li><span>Demand Ratio</span><b>{{ selectedYearData.demand_ratio ?? '-' }}</b></li>
              </ul>
              <p v-else class="insight-empty">No data for the selected year.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="cy-trend" class="cy-trend">
      <div class="container cy-trend-container">
        <div class="cy-trend-header">
          <h2>Cycling Demand Trend(Gauge)</h2>
          <p>Demand ratio over time and the latest cycling insight for this suburb</p>
        </div>

        <div class = "cy-trend-grid">
          <!-- Left:  Chart -->
          <div class="cy-trend-card chart-card">
            <div class="card-head">
              <div class="head-icon">
                <!-- speedometer icon -->
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M3 13a9 9 0 1 1 18 0" stroke="currentColor" stroke-width="2"/>
                  <path d="M12 13l5-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <h3>Cycling lanes per 1,000 people</h3>
            </div>

            <div class="card-body" style="height:auto;padding:1rem 0 0;">
              <div class="gauge-container-compact">
                <svg viewBox="0 0 320 200" class="gauge-svg">
                  <!-- 背景三段：Low / Medium / High -->
                  <!-- Low: 0–12 -->
                  <path :d="arcPath(GAUGE_START, a12)" stroke="#ef4444" stroke-width="18" fill="none" stroke-linecap="round" />
                  <!-- Medium: 12–20 -->
                  <path :d="arcPath(a12, a20)" stroke="#f59e0b" stroke-width="18" fill="none" stroke-linecap="round" />
                  <!-- High: 20–30 -->
                  <path :d="arcPath(a20, GAUGE_END)" stroke="#22c55e" stroke-width="18" fill="none" stroke-linecap="round" />

                  <!-- 阈值刻度文字 -->
                  <text x="120" y="55" class="gauge-tick" text-anchor="middle">12</text>
                  <text x="210" y="55" class="gauge-tick" text-anchor="middle">20</text>

                  <!-- 动态指针（颜色随 zone 或后端 gauge_color） -->
                  <g :transform="`rotate(${getNeedleAngle(kmPer1k)} 160 160)`">
                    <!-- Drop shadow -->
                    <path d="M 162 162 L 235 162 L 240 160 L 235 158 L 162 158 Z" fill="rgba(0,0,0,0.15)"/>
                    <!-- Needle -->
                    <path d="M 160 160 L 235 160 L 240 158 L 235 156 L 160 158 Z"
                          :fill="`url(#needleGradient-${gaugeZoneCY})`"
                          :stroke="`url(#needleBorder-${gaugeZoneCY})`" stroke-width="0.5"/>
                    <!-- Highlight -->
                    <path d="M 160 159 L 235 159 L 238 158 L 235 157.5 L 160 157.5 Z"
                          :fill="`url(#needleHighlight-${gaugeZoneCY})`" opacity="0.7"/>
                  </g>

                  <!-- 渐变定义（按 zone 提供；若后端给了 gauge_color 则使用它） -->
                  <defs>
                    <linearGradient id="needleGradient-low" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%"  :style="`stop-color:${getNeedleColors('low').needle[0]}`"/>
                      <stop offset="50%" :style="`stop-color:${getNeedleColors('low').needle[1]}`"/>
                      <stop offset="100%" :style="`stop-color:${getNeedleColors('low').needle[2]}`"/>
                    </linearGradient>
                    <linearGradient id="needleBorder-low" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%"  :style="`stop-color:${getNeedleColors('low').border[0]}`"/>
                      <stop offset="100%" :style="`stop-color:${getNeedleColors('low').border[1]}`"/>
                    </linearGradient>
                    <linearGradient id="needleHighlight-low" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%"  :style="`stop-color:${getNeedleColors('low').highlight[0]}`"/>
                      <stop offset="100%" :style="`stop-color:${getNeedleColors('low').highlight[1]}`"/>
                    </linearGradient>

                    <linearGradient id="needleGradient-medium" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%"  :style="`stop-color:${getNeedleColors('medium').needle[0]}`"/>
                      <stop offset="50%" :style="`stop-color:${getNeedleColors('medium').needle[1]}`"/>
                      <stop offset="100%" :style="`stop-color:${getNeedleColors('medium').needle[2]}`"/>
                    </linearGradient>
                    <linearGradient id="needleBorder-medium" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%"  :style="`stop-color:${getNeedleColors('medium').border[0]}`"/>
                      <stop offset="100%" :style="`stop-color:${getNeedleColors('medium').border[1]}`"/>
                    </linearGradient>
                    <linearGradient id="needleHighlight-medium" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%"  :style="`stop-color:${getNeedleColors('medium').highlight[0]}`"/>
                      <stop offset="100%" :style="`stop-color:${getNeedleColors('medium').highlight[1]}`"/>
                    </linearGradient>

                    <linearGradient id="needleGradient-high" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%"  :style="`stop-color:${getNeedleColors('high').needle[0]}`"/>
                      <stop offset="50%" :style="`stop-color:${getNeedleColors('high').needle[1]}`"/>
                      <stop offset="100%" :style="`stop-color:${getNeedleColors('high').needle[2]}`"/>
                    </linearGradient>
                    <linearGradient id="needleBorder-high" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%"  :style="`stop-color:${getNeedleColors('high').border[0]}`"/>
                      <stop offset="100%" :style="`stop-color:${getNeedleColors('high').border[1]}`"/>
                    </linearGradient>
                    <linearGradient id="needleHighlight-high" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%"  :style="`stop-color:${getNeedleColors('high').highlight[0]}`"/>
                      <stop offset="100%" :style="`stop-color:${getNeedleColors('high').highlight[1]}`"/>
                    </linearGradient>
                  </defs>

                  <!-- 中心圆（随 zone/后端色） -->
                  <circle cx="160" cy="160" r="10"
                          :fill="getNeedleColors(gaugeZoneCY).needle[1]"
                          :stroke="getNeedleColors(gaugeZoneCY).border[1]" stroke-width="2"/>
                  <text x="160" y="185" text-anchor="middle" class="gauge-value">{{ kmPer1k?.toFixed?.(1) ?? '-' }}</text>
                </svg>
              </div>

              <!-- Legend -->
              <div class="gauge-legend expanded" style="margin-top:.75rem">
                <div class="legend-item"><span class="dot low"></span><span>Low (0 – 12.0)</span></div>
                <div class="legend-item"><span class="dot medium"></span><span>Medium (12.0 – 20.0)</span></div>
                <div class="legend-item"><span class="dot high"></span><span>High (20.0+)</span></div>
              </div>
            </div>
          </div>

          <!-- Right: Insight -->
          <div class="cy-trend-card insight-card">
            <div class="card-head">
              <div class="head-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3V5M12 19V21M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M3 12H5M19 12H21M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <h3>Suburb Insight</h3>
            </div>

            <div class="card-body insight-body">
              <!-- 上半：固定洞察 -->
              <p v-if="selectedInsightCY" class="insight-text">{{ selectedInsightCY }}</p>
              <p v-else class="insight-empty">No insight available.</p>

              <div class="insight-divider"></div>

              <!-- 下半：按年份详情 -->
              <div class="year-detail-head">
                <span class="detail-title">Details by year</span>
                <div class="year-switch">
                  <button
                    v-for="y in [2021, 2026, 2031, 2036]"
                    :key="y"
                    class="year-chip"
                    :class="{ active: selectedYearCY === y, disabled: !cyTrend.byYear[y] }"
                    :disabled="!cyTrend.byYear[y]"
                    @click="selectedYearCY = y"
                  >{{ y }}</button>
                </div>
              </div>

              <ul class="insight-metrics" v-if="selectedYearDataCY">
                <li><span>Population (est.)</span><b>{{ selectedYearDataCY.population_est?.toLocaleString?.() || selectedYearDataCY.population_est || '-' }}</b></li>
                <li><span>Cycling (km)</span><b>{{ selectedYearDataCY.cycling_km ?? '-' }}</b></li>
                <li><span>km per 1000</span><b>{{ selectedYearDataCY.km_per_1000 ?? '-' }}</b></li>
              </ul>
              <p v-else class="insight-empty">No data for the selected year.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Parking Demand Trend Section -->
    <section id="pk-trend" class="pk-trend">
      <div class="container pt-trend-container">
        <div class="pt-trend-header">
          <h2>Parking Demand Trend</h2>
          <p>Demand ratio over time and the latest parking insight for this suburb</p>
        </div>

        <div class="pt-trend-grid">
          <!-- Left: Line Chart -->
          <div class="pt-trend-card chart-card">
            <div class="card-head">
              <div class="head-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M4 19V5M4 19H20M8 15L12 11L15 13L20 8" stroke="currentColor" stroke-width="2" />
                </svg>
              </div>
              <h3>Bays per 1,000 (2021–2036)</h3>
            </div>
            <div class="card-body">
              <canvas id="pkTrendChart"></canvas>
            </div>
          </div>

          <!-- Right: Insight -->
          <div class="pt-trend-card insight-card">
            <div class="card-head">
              <div class="head-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3V5M12 19V21M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M3 12H5M19 12H21M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <h3>Suburb Insight</h3>
            </div>

            <div class="card-body insight-body">
              <!-- 每年不同的 insight -->
              <p v-if="selectedInsightPK" class="insight-text">{{ selectedInsightPK }}</p>
              <p v-else class="insight-empty">No insight available.</p>

              <div class="insight-divider"></div>

              <!-- 按年份详情 -->
              <div class="year-detail-head">
                <span class="detail-title">Details by year</span>
                <div class="year-switch">
                  <button
                    v-for="y in [2021, 2026, 2031, 2036]"
                    :key="y"
                    class="year-chip"
                    :class="{ active: selectedYearPK === y, disabled: !pkTrend.byYear[y] }"
                    :disabled="!pkTrend.byYear[y]"
                    @click="selectedYearPK = y"
                  >{{ y }}</button>
                </div>
              </div>

              <ul class="insight-metrics" v-if="selectedYearDataPK">
                <li><span>Population (est.)</span><b>{{ selectedYearDataPK.population_est?.toLocaleString?.() || selectedYearDataPK.population_est || '-' }}</b></li>
                <li><span>Parking bays</span><b>{{ selectedYearDataPK.parking_bays ?? '-' }}</b></li>
                <li><span>Bays per 1,000</span><b>{{ selectedYearDataPK.bays_per_1000 ?? '-' }}</b></li>
              </ul>
              <p v-else class="insight-empty">No data for the selected year.</p>
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
import RadialRingsChart from '../infrastructure/RadialRingsChart.vue';

import Chart from 'chart.js/auto';

export default {
  name: "InfrastructurePage",
  components: {
    Header,
    RadialRingsChart
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
      ptTrend: {
        points: [],
        year: null,
        insight: '',
        latest: null,
        byYear: {}
      },
      cyTrend: {
        points: [],
        year: null,
        insight: '',
        latest: null,
        byYear: {}
      },
      pkTrend: {
        points: [],
        year: null,
        latest: null,
        byYear: {}
      },
      selectedYear: 2021,
      selectedYearCY:2026,
      selectedYearPK: 2026,
      transportChart: null,
      ptTrendChart: null,
      cyTrendChart: null,
      pkTrendChart: null,
      gaugeMaxCY: 30,
      gaugeThresholdsCY: { low: 12, medium: 20 },
      GAUGE_MIN: 0,
      GAUGE_MAX: 30,
      GAUGE_START: -180,
      GAUGE_END: 0,
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
    selectedYearData() {
      return this.ptTrend.byYear?.[this.selectedYear] || null;
    },

    // about the demand of cycling
    selectedYearDataCY() {
      return this.cyTrend.byYear?.[this.selectedYearCY] || null;
    },
    selectedInsightCY() {
      return this.cyTrend.byYear?.[this.selectedYearCY]?.insight || '';
    },
    gaugeValueCY() {
      return this.selectedYearDataCY?.km_per_1000 ?? 0;
    },
    gaugeZoneCY() {
      const cls = (this.selectedYearDataCY?.gauge_class || '').toString().toLowerCase();
      if (cls === 'low' || cls === 'medium' || cls === 'high') return cls;
      return this.getCurrentZone(this.gaugeValueCY);
    },
    // gaugeAngleCY() {
    //   return this.getCorrectNeedleAngle(this.gaugeValueCY);
    // },
    kmPer1k() {
      return Number(this.selectedYearDataCY?.km_per_1000 ?? 0);
    },
    a12() { return this.GAUGE_START + (12 - this.GAUGE_MIN) / (this.GAUGE_MAX - this.GAUGE_MIN) * (this.GAUGE_END - this.GAUGE_START); },
    a20() { return this.GAUGE_START + (20 - this.GAUGE_MIN) / (this.GAUGE_MAX - this.GAUGE_MIN) * (this.GAUGE_END - this.GAUGE_START); },

    // about the demand of parking
    selectedYearDataPK() {
      return this.pkTrend.byYear?.[this.selectedYearPK] || null;
    },
    selectedInsightPK() {
      return this.pkTrend.byYear?.[this.selectedYearPK]?.insight || '';
    },

    ptModeItems() {
      const ORDER = [
        'Interstate Train',               // 这里的名字是展示名；不会用来匹配 MODE
        'Metro Bus',
        'Metro Train',
        'Metro Tram',
        'Regional coach',
        'Regional train',
        'Sky bus'
      ];
      // 你的真实 7 类来自 MODE 字段（REGIONAL/INTERSTATE/METRO...）
      // 这里给出「展示名 → MODE 的正则」映射（你可以按需要调整）。
      const MAP = {
        'Interstate Train':               /(INTERSTATE\s*TRAIN)/i,
        'Metro Bus':               /(METRO\s*BUS)/i,
        'Metro Train':          /(METRO\s*TRAIN)/i,
        'Metro Tram':              /(METRO\s*TRAM)/i,
        'Regional coach':    /(REGIONAL\s*COACH)/i,
        'Regional train':          /(REGIONAL\s*TRAIN)/i,
        'Sky bus':              /(SKYBUS)/i
      };
      const COLORS = {
        'Interstate Train': '#FFA500',
        'Metro Bus': '#FF7F50',
        'Metro Train': '#FF6B81',
        'Metro Tram': '#FF5CA8',
        'Regional coach': '#B36CFF',
        'Regional train': '#8A63FF',
        'Sky bus': '#5B6BFF'
      };

      // 统计：如果你已在 loadStats 里有 this.stats.transport.modes，就优先用它；
      // 否则对 stops 做一次兜底聚合
      const modesCount = { ...(this.stats.transport?.modes || {}) };
      const rows = this.stats.transport?.stops || [];
      if (!Object.keys(modesCount).length && rows.length) {
        rows.forEach(r => {
          const m = (r.MODE || '').toUpperCase();
          modesCount[m] = (modesCount[m] || 0) + 1;
        });
      }

      // 根据映射生成 items（外→内），没命中的计 0
      return ORDER.map(name => {
        const re = MAP[name];
        let count = 0;
        // 如果有现成聚合：遍历 key 匹配正则；否则直接 0
        Object.keys(modesCount).forEach(k => {
          if (re && re.test(k)) count += Number(modesCount[k] || 0);
        });
        return { name, value: count, color: COLORS[name] };
      });
    },
  },
  mounted() {
    this.initMap()
    this.loadData()
    this.loadCyclingTrend(this.selectedSuburb)
    this.loadParkingTrend(this.selectedSuburb)
  },
  watch: {
    selectedSuburb: {
      immediate: true,
      handler(newSuburb) {
        if (newSuburb) {
          this.loadStats(newSuburb)
          this.loadPtTrend(newSuburb)
          this.loadCyclingTrend(newSuburb)
          this.loadParkingTrend(newSuburb)
        }
      }
    }
  },
  methods: {
    async loadStats(suburb) {
      this.loading = true
      try {
        const [transportRes, cyclingRes, cyclingLen, parkingRes] = await Promise.allSettled([
          infrastructureApi.getTransportStats(suburb),
          infrastructureApi.getCyclingStats(suburb),
          infrastructureApi.getCyclingLenth(suburb),
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
        }
        if (cyclingRes.status === 'fulfilled' && cyclingLen.status === 'fulfilled') {
          const rows = apiUtils.extractData(cyclingRes.value).data || []

          const totalKm = cyclingLen.value?.data?.bike_km_total || 0

          this.stats.cycling = {
              total: rows.length,
              bikeLanes: totalKm,
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
    scrollToSection(selector, extraOffset = 12) {
      // 1) 读取 Header 高度（优先用 Header 设置的 CSS 变量）
      const cssVar = getComputedStyle(document.documentElement)
                      .getPropertyValue('--nav-height');
      const headerH = cssVar ? parseInt(cssVar, 10) :
                    (document.querySelector('.nav-bar')?.offsetHeight || 0);

      // 2) 找到目标元素并计算位置
      const el = document.querySelector(selector);
      if (!el) return;

      const top = el.getBoundingClientRect().top + window.pageYOffset
                - headerH - extraOffset; // 预留一点间距

      // 3) 平滑滚动
      window.scrollTo({ top, behavior: 'smooth' });
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

        const [transportRes, bicycleRes,parkingRes] = await Promise.all([
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

    async loadPtTrend(suburb) {
      if (!suburb) return
      const years = [2021, 2026, 2031, 2036]

      const calls = years.map(y => infrastructureApi.getPtDemand(suburb, y))
      const results = await apiUtils.safeBatchApiCalls(calls)

      const rows = []
      results.forEach(res => {
        if (!res.success) return
        const r = res.data?.data || res.data || null
        if (!r) return

        // 统一字段：后端多半是小写；若不是则用大写兜底
        const norm = {
          year: r.year ?? r.Year,
          demand_ratio: Number((r.demand_ratio ?? r.Demand_ratio)),
          suburb_insight: r.suburb_insight ?? r.Suburb_Insight ?? '',
          population_est: r.population_est ?? r.Population_est,
          pt_stops_total: r.pt_stops_total ?? r.PT_stops_total
        }

        if (!Number.isNaN(norm.demand_ratio) && norm.year) {
          rows.push(norm)
        }
      })

      rows.sort((a, b) => a.year - b.year)

      this.ptTrend.byYear = rows.reduce((acc, r) => {
        acc[r.year] = r
        return acc
      }, {})

      this.selectedYear = this.ptTrend.byYear[2021] ? 2021 : (rows[0]?.year ?? null)

      const latest = rows.length ? rows[rows.length - 1] : null

      this.ptTrend.points = rows.map(r => ({ year: r.year, ratio: r.demand_ratio }))
      this.ptTrend.year = latest?.year || null
      this.ptTrend.insight = latest?.suburb_insight || ''
      this.ptTrend.latest = latest || null

      await this.$nextTick();
      console.log('[PT points]', this.ptTrend.points);
      this.renderPtTrendChart()
    },

    async renderPtTrendChart() {
      const canvas = document.getElementById('ptTrendChart');
      if (!canvas) return;
      await this.$nextTick();                 // ✅ 等 DOM
      const ctx = canvas.getContext('2d');
      if (!ctx) return;                        // ✅ 防御

      if (this.ptTrendChart) {                 // ✅ 先干净销毁
        this.ptTrendChart.destroy();
        this.ptTrendChart = null;
      }

      const pts = (this.ptTrend.points || []).map(p => ({ year: String(p.year), ratio: Number(p.ratio) }));
      if (!pts.length) return;

      const labels = pts.map(p => p.year);
      const values = pts.map(p => p.ratio);
      const min = Math.min(...values);
      const max = Math.max(...values);
      const pad = Math.max((max - min) * 0.15, 10);

      // ✅ 用 rAF 确保在可见尺寸下绘制；关闭动画避免 destroy 竞态
      requestAnimationFrame(() => {
        this.ptTrendChart = new Chart(ctx, {
          type: 'line',
          data: { labels, datasets: [{
            label: 'Demand Ratio',
            data: values, tension: 0.35,
            borderColor: '#3b82f6', backgroundColor: 'transparent',
            borderWidth: 2.5, pointRadius: 4, pointHoverRadius: 6, spanGaps: true
          }]},
          options: {
            responsive: true, maintainAspectRatio: false, resizeDelay: 0,
            animation: { duration: 0 },                      // ✅
            plugins: { legend: { display: false },
              tooltip: { callbacks: { label: c => `Demand ratio: ${c.parsed.y}` } } },
            scales: {
              x: { grid: { display: false }, ticks: { color: '#334155', font: { weight: 600 } } },
              y: {
                beginAtZero: false,
                suggestedMin: min - pad, suggestedMax: max + pad,
                grid: { color: 'rgba(148,163,184,0.2)' }, ticks: { color: '#475569' }
              }
            }
          }
        });
      });
    },

    polarToXY(angleDeg, r = 100, cx = 160, cy = 160) {
      const rad = angleDeg * Math.PI / 180;
      return {
        x: cx + r * Math.cos(rad),
        y: cy + r * Math.sin(rad),
      };
    },
    // 生成圆弧 path（半径=100，圆心=160,160；你的 SVG 已是这个几何）
    arcPath(startDeg, endDeg, r = 100, cx = 160, cy = 160) {
      const s = this.polarToXY(startDeg, r, cx, cy);
      const e = this.polarToXY(endDeg,   r, cx, cy);
      // 大弧标志：>180° 才为 1；我们 0–180° 的半圆段始终是 0
      const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
      const sweep = 1; // 顺时针
      return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} ${sweep} ${e.x} ${e.y}`;
    },
    getNeedleAngle(value) {
      const v = Math.max(this.GAUGE_MIN, Math.min(this.GAUGE_MAX, Number(value) || 0));
      return this.GAUGE_START
          + (v - this.GAUGE_MIN) / (this.GAUGE_MAX - this.GAUGE_MIN)
          * (this.GAUGE_END - this.GAUGE_START);
    },
    // 根据阈值给区间
    getCurrentZone(value) {
      const v = Number(value) || 0;
      if (v < 12) return 'low';
      if (v < 20) return 'medium';
      return 'high';
    },
    // 指针/边框/高光/中心的颜色；若后端给了 gauge_color 就全部用它
    getNeedleColors(zone) {
      const override = (this.selectedYearDataCY?.gauge_color || '').trim();
      if (override) {
        // 用后端色
        return {
          needle:   [override, override, override],
          border:   [override, override],
          highlight:['#ffffff', '#ffffff'],
        };
      }
      // 按区间的默认色
      const map = {
        low: {
          needle: ['#f87171', '#ef4444', '#dc2626'],   // 红
          border: ['#7f1d1d', '#991b1b'],
          highlight: ['#ffe4e6', '#fecaca'],
        },
        medium: {
          needle: ['#fbbf24', '#f59e0b', '#d97706'],   // 橙
          border: ['#7c2d12', '#b45309'],
          highlight: ['#ffedd5', '#fed7aa'],
        },
        high: {
          needle: ['#34d399', '#22c55e', '#16a34a'],   // 绿
          border: ['#064e3b', '#065f46'],
          highlight: ['#d1fae5', '#bbf7d0'],
        }
      };
      return map[zone] || map.low;
    },
    async loadCyclingTrend(suburb) {
      if (!suburb) return;
      const years = [2021, 2026, 2031, 2036];

      const calls = years.map(y => infrastructureApi.getCyclingDemand(suburb, y));
      const results = await apiUtils.safeBatchApiCalls(calls);

      const rows = [];
      results.forEach(res => {
        if (!res.success) return;
        const r = res.data?.data || res.data;
        if (!r) return;

        const norm = {
          year: r.year ?? r.Year,
          population_est: r.population_est ?? r.Population_est,
          cycling_km: r.cycling_km ?? r.Cycling_km,
          km_per_1000: Number(r.km_per_1000 ?? r.Km_per_1000 ?? r.demand_ratio ?? r.Demand_ratio),
          gauge_class: r.gauge_class ?? r.Gauge_Class,
          gauge_color: r.gauge_color ?? r.Gauge_Color,
          insight: r.cycling_insight ?? r.Cycling_Insight ?? r.suburb_insight ?? r.Suburb_Insight ?? ''
        };
        if (!norm.year) return;
        rows.push(norm);
      });

      rows.sort((a,b)=>a.year-b.year);
      this.cyTrend.byYear = rows.reduce((acc, r) => (acc[r.year]=r, acc), {});
      this.cyTrend.latest = rows[rows.length-1] || null;
      this.cyTrend.insight = this.cyTrend.latest?.insight || '';

      // 若 2026 没数据，就用第一个有数据的年份
      if (!this.cyTrend.byYear[this.selectedYearCY]) {
        this.selectedYearCY = this.cyTrend.byYear[2026] ? 2026 : (rows[0]?.year ?? this.selectedYearCY);
      }
    },

    //parking demand
    async loadParkingTrend(suburb) {
      if (!suburb) return;
      const years = [2021, 2026, 2031, 2036];
      const calls = years.map(y => infrastructureApi.getParkingDemand(suburb, y));

      const results = await apiUtils.safeBatchApiCalls(calls);
      console.log('[PK] raw results=', results);

      const rows = [];

      const normalize = (r) => {
        if (!r) return null;
        const year = r.year ?? r.Year;
        const baysPer1000 = Number(r.Bays_per_1000 ?? r.bays_per_1000);
        const population_est = r.population_est ?? r.Population_est;
        const parking_bays = r.Parking_bays ?? r.parking_bays;
        const insight = r.Parking_Insight ?? r.parking_insight ?? r.Suburb_Insight ?? r.suburb_insight ?? '';

        if (!year || Number.isNaN(baysPer1000)) return null;
        return { year, bays_per_1000: baysPer1000, population_est, parking_bays, insight };
      };

      results.forEach(res => {
        if (!res.success) return;
        // 后端是 { success, data: { ... } }
        const payload = res.data?.data ?? res.data ?? null;
        if (!payload) return;

        if (Array.isArray(payload)) {
          const norm = normalize(payload[0]);
          if (norm) rows.push(norm);
        } else {
          const norm = normalize(payload);
          if (norm) rows.push(norm);
        }
      });

      rows.sort((a, b) => a.year - b.year);

      this.pkTrend.byYear = rows.reduce((acc, r) => (acc[r.year] = r, acc), {});
      this.pkTrend.points = rows.map(r => ({ year: r.year, ratio: r.bays_per_1000 })); // 用 Bays_per_1000 画线

      const latest = rows[rows.length - 1] || null;
      this.pkTrend.latest = latest;
      this.pkTrend.year = latest?.year || null;

      if (!this.pkTrend.byYear[this.selectedYearPK]) {
        this.selectedYearPK = this.pkTrend.byYear[2026] ? 2026 : (rows[0]?.year ?? this.selectedYearPK);
      }

      console.log('[PK points]', this.pkTrend.points);
      this.$nextTick(() => this.renderPkTrendChart());
    },

    async renderPkTrendChart() {
      const canvas = document.getElementById('pkTrendChart');
      if (!canvas) return;
      await this.$nextTick();
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (this.pkTrendChart) { this.pkTrendChart.destroy(); this.pkTrendChart = null; }

      const YEARS = ['2021','2026','2031','2036'];
      const byYear = this.pkTrend.byYear || {};
      const values = YEARS.map(y => {
        const r = byYear[Number(y)];
        const v = r ? Number(r.bays_per_1000) : null;
        return Number.isFinite(v) ? v : null;
      });
      if (values.every(v => v == null)) return;

      const nums = values.filter(v => v != null);
      const min = Math.min(...nums);
      const max = Math.max(...nums);
      const pad = Math.max((max - min) * 0.15, 5);

      requestAnimationFrame(() => {
        this.pkTrendChart = new Chart(ctx, {
          type: 'line',
          data: { labels: YEARS, datasets: [{
            label: 'Bays per 1,000',
            data: values, tension: 0.35,
            borderColor: '#0ea5e9', backgroundColor: 'transparent',
            pointBackgroundColor: '#0ea5e9', borderWidth: 2.5,
            pointRadius: 4, pointHoverRadius: 6, spanGaps: true
          }]},
          options: {
            responsive: true, maintainAspectRatio: false, resizeDelay: 0,
            animation: { duration: 0 },                       // ✅
            plugins: { legend: { display: false },
              tooltip: { callbacks: { label: c => `Bays per 1,000: ${c.parsed.y}` } } },
            scales: {
              x: { type: 'category', grid: { display: false }, ticks: { color: '#334155', font: { weight: 600 } } },
              y: {
                beginAtZero: true,
                suggestedMin: Math.max(0, min - pad), suggestedMax: max + pad,
                grid: { color: 'rgba(148,163,184,0.2)' }, ticks: { color: '#475569' }
              }
            }
          }
        });
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
  padding-top: calc(var(--nav-height, 80px) + 12px);
  padding-bottom: 120px;
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

/* PT Trend Section Start */
/* PT Demand Trend */
.pt-trend {
  padding: 4rem 0 5rem;
}

.pt-trend-container {
  width: 80%;
  margin: 0 auto;
}

.pt-trend-header {
  text-align: center;
  margin-bottom: 2rem;
}
.pt-trend-header h2 {
  font-size: 2.4rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #1e293b 0%, #3b82f6 50%, #22c55e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.pt-trend-header p {
  color: #475569;
  font-size: 1.05rem;
}

.pt-trend-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 2rem;
}

.pt-trend-card {
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.9));
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid rgba(226, 232, 240, 0.6);
  box-shadow: 0 14px 40px rgba(0,0,0,0.08);
  backdrop-filter: blur(18px);
  transition: transform .25s ease, box-shadow .25s ease;
}
.pt-trend-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 22px 60px rgba(0,0,0,0.12);
}

.card-head {
  display: flex;
  align-items: center;
  gap: .75rem;
  padding-bottom: .75rem;
  border-bottom: 2px solid rgba(148,163,184,.2);
}
.card-head h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 800;
  color: #0f172a;
}
.head-icon {
  width: 34px; height: 34px;
  display: grid; place-items: center;
  border-radius: 10px;
  color: #3b82f6;
  background: rgba(59,130,246,.12);
  border: 1px solid rgba(59,130,246,.25);
}

.card-body {
  margin-top: 1rem;
  height: 360px; /* 让图表更高一点 */
}
.chart-card .card-body canvas {
  width: 100% !important;
  height: 100% !important;
}

.insight-card .card-body {
  height: auto;
}
.insight-year {
  margin-left: auto;
  font-size: .9rem;
  color: #64748b;
  border: 1px dashed rgba(148,163,184,.4);
  padding: 2px 8px; border-radius: 999px;
}
.insight-text {
  font-size: 1rem;
  color: #334155;
  line-height: 1.7;
  background: rgba(255,255,255,.7);
  border: 1px solid rgba(226,232,240,.8);
  border-radius: 12px;
  padding: 1rem;
}
.insight-empty {
  color: #94a3b8;
}
.insight-metrics {
  list-style: none; padding: 0; margin: 1rem 0 0;
  display: grid; grid-template-columns: 1fr 1fr; gap: .6rem .8rem;
}
.insight-metrics li {
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(255,255,255,.6);
  border: 1px solid rgba(226,232,240,.8);
  border-radius: 10px; padding: .5rem .75rem;
  font-size: .95rem; color: #475569;
}
.insight-metrics b { color: #0f172a; }

.insight-body { display: flex; flex-direction: column; gap: 1rem; }

.insight-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(148,163,184,.35), transparent);
  margin: .25rem 0 .5rem;
}

.year-detail-head {
  display: flex; align-items: center; justify-content: space-between;
  gap: .75rem;
}

.detail-title {
  font-weight: 700; color: #0f172a;
}

.year-switch { display: flex; gap: .4rem; flex-wrap: wrap; }

.year-chip {
  border: 1px solid rgba(148,163,184,.5);
  background: #fff;
  padding: .25rem .6rem;
  border-radius: 999px;
  font-size: .85rem;
  cursor: pointer;
  transition: all .2s ease;
}
.year-chip:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,.06); }
.year-chip.active {
  border-color: #3b82f6;
  color: #fff;
  background: #3b82f6;
}
.year-chip.disabled {
  opacity: .5;
  cursor: not-allowed;
}

/* PT Trend Section End */

/* Cycling Trend Section Start */
.cy-trend { padding: 4rem 0 5rem; }

.cy-trend-container { width: 80%; margin: 0 auto; }

.cy-trend-header { text-align: center; margin-bottom: 2rem; }
.cy-trend-header h2 {
  font-size: 2.4rem; font-weight: 900; letter-spacing: -0.02em;
  background: linear-gradient(135deg, #0f172a 0%, #22c55e 50%, #3b82f6 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

.cy-trend-header p { color: #475569; font-size: 1.05rem; }

/* 关键：左右分布（两列） */
.cy-trend-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;  /* 左图宽一些，右侧 insight 窄一些 */
  gap: 2rem;
  align-items: stretch;
}

/* 复用与 pt 一致的卡片风格 */
.cy-trend-card {
  background: linear-gradient(135deg, rgba(248,250,252,.95), rgba(241,245,249,.9));
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid rgba(226,232,240,.6);
  box-shadow: 0 14px 40px rgba(0,0,0,.08);
  backdrop-filter: blur(18px);
  transition: transform .25s ease, box-shadow .25s ease;
}
.cy-trend-card:hover { transform: translateY(-4px); box-shadow: 0 22px 60px rgba(0,0,0,.12); }

/* 与 pt 一致的头部样式，保持对齐 */
.cy-trend-card .card-head {
  display: flex; align-items: center; gap: .75rem;
  padding-bottom: .75rem; border-bottom: 2px solid rgba(148,163,184,.2);
}
.cy-trend-card .card-head h3 { margin: 0; font-size: 1.2rem; font-weight: 800; color: #0f172a; }
.cy-trend-card .head-icon {
  width: 34px; height: 34px; display: grid; place-items: center;
  border-radius: 10px; color: #22c55e;
  background: rgba(34,197,94,.12); border: 1px solid rgba(34,197,94,.25);
}

/* 左卡片内部的仪表盘容器高度 */
.cy-trend-card.chart-card .card-body { height: auto; }

.gauge-container-compact { display:flex; justify-content:center; }
.gauge-svg { width:100%; max-width:640px; height:auto; }
.gauge-value {
  font-size: 20px;
  font-weight: 800;
  fill: #0f172a;
}
.gauge-tick {
  font-size: 12px;
  fill: #64748b;
}
.gauge-legend { display:flex; gap:1.25rem; justify-content:center; }
.gauge-legend .legend-item { display:flex; align-items:center; gap:.4rem; font-size:.9rem; color:#475569; }
.gauge-legend .dot { width:10px; height:10px; border-radius:999px; display:inline-block; }
.gauge-legend .dot.low { background:#ef4444; }
.gauge-legend .dot.medium { background:#f59e0b; }
.gauge-legend .dot.high { background:#22c55e; }

/* Cycling Trend Section End */

/* parking Trend Section Start */
.pk-trend .pt-trend-header h2 {
  background: linear-gradient(135deg, #1e293b 0%, #0ea5e9 50%, #22c55e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
/* parking Trend Section End */

</style>