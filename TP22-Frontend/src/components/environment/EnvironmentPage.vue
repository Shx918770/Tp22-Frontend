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

    <!-- Header Navigation -->
    <nav class="nav-bar">
      <div class="nav-container">
        <div class="logo">
          <div class="logo-icon">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="8" fill="#4CAF50"/>
              <path d="M20 8C13.37 8 8 13.37 8 20C8 26.63 13.37 32 20 32C26.63 32 32 26.63 32 20C32 13.37 26.63 8 20 8ZM20 30C14.48 30 10 25.52 10 20C10 14.48 14.48 10 20 10C25.52 10 30 14.48 30 20C30 25.52 25.52 30 20 30Z" fill="white"/>
              <path d="M20 12C15.58 12 12 15.58 12 20C12 24.42 15.58 28 20 28C24.42 28 28 24.42 28 20C28 15.58 24.42 12 20 12ZM20 26C16.69 26 14 23.31 14 20C14 16.69 16.69 14 20 14C23.31 14 26 16.69 26 20C26 23.31 23.31 26 20 26Z" fill="white"/>
              <path d="M20 16C17.79 16 16 17.79 16 20C16 22.21 17.79 24 20 24C22.21 24 24 22.21 24 20C24 17.79 22.21 16 20 16Z" fill="white"/>
            </svg>
          </div>
          <span class="logo-text">MelSustain</span>
          <span v-if="selectedSuburb" class="suburb-display"><span class="pin">📍</span>{{ selectedSuburb }}</span>
        </div>
        
        <div class="nav-tabs">
          <router-link :to="{ path: '/', query: $route.query }" class="nav-tab">Overview</router-link>
          <router-link :to="{ path: '/social', query: $route.query }" class="nav-tab">Social</router-link>
          <div class="nav-tab">Economic</div>
          <div class="nav-tab">Infrastructure</div>
          <div class="nav-tab active">Environment</div>
          <router-link :to="{ path: '/', hash: '#compare-section', query: $route.query }" class="nav-tab">Compare</router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Environment Insights Header -->
      <section class="insights-header">
        <div class="container">
          <div class="header-content">
            <div class="title-animation">
              <h1 class="page-title">
                <span class="title-word">Environmental</span>
                <span class="title-word">Sustainability</span>
                <span class="title-word">Insights</span>
              </h1>
            </div>
            <p class="page-description">
              Explore suburb-level environmental data including tree canopy, air quality, and water usage to understand ecological health and predict future sustainability challenges.
            </p>
          </div>
        </div>
      </section>

      <!-- Environmental Indicators - Circular Progress Design -->
      <section class="environmental-indicators">
        <div class="container">
          <div class="indicators-header">
            <h2 class="section-title">Key Environmental Indicators</h2>
            <p class="section-subtitle">Current ecological health metrics for your suburb</p>
          </div>

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
                    <div class="progress-value">70%</div>
                    <div class="progress-label">Coverage</div>
                  </div>
                </div>
                <div class="indicator-details">
                  <h3 class="indicator-title">Tree Canopy</h3>
                  <p class="indicator-description">Urban forest coverage providing natural cooling and air purification</p>
                  <div class="indicator-metrics">
                    <div class="metric">
                      <span class="metric-value">+5.2%</span>
                      <span class="metric-label">vs Last Year</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Air Quality Index -->
            <div class="indicator-card air-quality">
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
                    <div class="progress-value">60</div>
                    <div class="progress-label">AQI</div>
                  </div>
                </div>
                <div class="indicator-details">
                  <h3 class="indicator-title">Air Quality</h3>
                  <p class="indicator-description">Current air quality index indicating moderate air pollution levels</p>
                  <div class="indicator-metrics">
                    <div class="metric">
                      <span class="metric-value moderate">Moderate</span>
                      <span class="metric-label">Status</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Water Usage -->
            <div class="indicator-card water-usage">
              <div class="indicator-content">
                <div class="indicator-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2.69L17.07 7.76C18.55 9.24 19.35 11.21 19.35 13.26C19.35 17.58 15.92 21 11.6 21C7.28 21 3.85 17.58 3.85 13.26C3.85 11.21 4.65 9.24 6.13 7.76L12 2.69Z" stroke="currentColor" stroke-width="2" fill="currentColor"/>
                  </svg>
                </div>
                <div class="progress-ring">
                  <svg class="progress-svg" width="120" height="120">
                    <circle class="progress-track" cx="60" cy="60" r="50" stroke="#e1f5fe" stroke-width="8" fill="none"/>
                    <circle class="progress-bar water-progress" cx="60" cy="60" r="50" stroke="#00BCD4" stroke-width="8" fill="none" 
                            stroke-dasharray="314" stroke-dashoffset="157" transform="rotate(-90 60 60)"/>
                  </svg>
                  <div class="progress-text">
                    <div class="progress-value">50%</div>
                    <div class="progress-label">Efficiency</div>
                  </div>
                </div>
                <div class="indicator-details">
                  <h3 class="indicator-title">Water Usage</h3>
                  <p class="indicator-description">Water consumption efficiency compared to sustainable targets</p>
                  <div class="indicator-metrics">
                    <div class="metric">
                      <span class="metric-value">180L</span>
                      <span class="metric-label">Per Person/Day</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tree Detail Section -->
       <section 
          v-show="true" 
          id="tree-detail-section" 
          class="tree-detail-section"
        >
          <div class="tree-detail-top">
            <!-- Left: Map -->
            <div class="tree-map">
              <h3>Tree Distribution Map</h3>
              <l-map ref="mapRef" style="height: 400px; width: 100%;" :zoom="13" :center="mapCenter">
                <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <l-circle-marker
                  v-for="tree in trees"
                  :key="tree.id"
                  :lat-lng="[tree.lat, tree.lon]"
                  :radius="6"
                  color="green"
                />
              </l-map>
            </div>

            <!-- Right: List -->
            <div class="tree-list">
              <h3>Tree Species List</h3>
              <ul>
                <li v-for="(count, species) in speciesCount" :key="species">
                  {{ species }} - {{ count }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Bottom: Trend -->
          <div class="tree-trend">
            <h3>Life Expectancy Trends</h3>
            <LineChart :chart-data="trendChartData" />
          </div>
        </section>

      <!-- Air Quality Monitoring Trends - Wave Visualization -->
      <section class="air-quality-trends">
        <div class="container">
          <div class="trends-header">
            <h2 class="section-title">Air Quality Monitoring Trends</h2>
            <p class="section-subtitle">Monthly air quality data and fluctuation patterns</p>
          </div>

          <div class="trends-visualization">
            <div class="time-selector">
              <button class="time-btn active" data-period="6m">6 Months</button>
              <button class="time-btn" data-period="1y">1 Year</button>
              <button class="time-btn" data-period="2y">2 Years</button>
            </div>

            <div class="quality-chart">
              <div class="chart-container">
                <div class="quality-levels">
                  <div class="level good">
                    <div class="level-indicator"></div>
                    <span class="level-label">Good (0-50)</span>
                  </div>
                  <div class="level moderate">
                    <div class="level-indicator"></div>
                    <span class="level-label">Moderate (51-100)</span>
                  </div>
                  <div class="level unhealthy">
                    <div class="level-indicator"></div>
                    <span class="level-label">Unhealthy (101+)</span>
                  </div>
                </div>

                <div class="chart-area">
                  <svg class="trend-chart" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid meet">
                    <!-- Background Grid -->
                    <defs>
                      <pattern id="grid" width="80" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 80 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
                      </pattern>
                      <linearGradient id="airGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#2196F3" stop-opacity="0.3"/>
                        <stop offset="50%" stop-color="#FFC107" stop-opacity="0.2"/>
                        <stop offset="100%" stop-color="#F44336" stop-opacity="0.1"/>
                      </linearGradient>
                    </defs>
                    <rect width="800" height="300" fill="url(#grid)" opacity="0.3"/>
                    
                    <!-- Air Quality Trend Line -->
                    <path d="M50,180 Q150,160 250,140 T450,120 Q550,110 650,125 T750,140" 
                          stroke="#2196F3" stroke-width="3" fill="none" class="trend-line"/>
                    
                    <!-- Fill Area -->
                    <path d="M50,180 Q150,160 250,140 T450,120 Q550,110 650,125 T750,140 L750,300 L50,300 Z" 
                          fill="url(#airGradient)" opacity="0.6"/>
                    
                    <!-- Data Points -->
                    <circle cx="150" cy="160" r="6" fill="#2196F3" class="data-point">
                      <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="250" cy="140" r="6" fill="#4CAF50" class="data-point">
                      <animate attributeName="r" values="6;8;6" dur="2s" begin="0.5s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="350" cy="120" r="6" fill="#4CAF50" class="data-point">
                      <animate attributeName="r" values="6;8;6" dur="2s" begin="1s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="450" cy="120" r="6" fill="#4CAF50" class="data-point">
                      <animate attributeName="r" values="6;8;6" dur="2s" begin="1.5s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="550" cy="110" r="6" fill="#4CAF50" class="data-point">
                      <animate attributeName="r" values="6;8;6" dur="2s" begin="2s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="650" cy="125" r="6" fill="#FFC107" class="data-point">
                      <animate attributeName="r" values="6;8;6" dur="2s" begin="2.5s" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                </div>

                <div class="chart-labels">
                  <div class="x-labels">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="trend-insights">
              <div class="insight-card">
                <div class="insight-icon good">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
                  </svg>
                </div>
                <div class="insight-content">
                  <h4>Improving Trend</h4>
                  <p>Air quality has improved by 15% over the last 6 months</p>
                </div>
              </div>
              <div class="insight-card">
                <div class="insight-icon warning">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
                  </svg>
                </div>
                <div class="insight-content">
                  <h4>Seasonal Variation</h4>
                  <p>Higher pollution levels expected during winter months</p>
                </div>
              </div>
            </div>
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
                         <!-- Greenhouse Gas Emissions Projection -->
             <div class="forecast-panel emissions">
               <div class="panel-header">
                 <div class="panel-icon">
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                     <path d="M12 2L13.09 8.26L19 7L17.74 13.09L22 14L15.74 15.91L14 22L8.26 20.91L7 15L13.09 15.91L12 2Z" stroke="currentColor" stroke-width="2" fill="currentColor"/>
                   </svg>
                 </div>
                 <div class="panel-title">
                   <h3>GHG Emissions</h3>
                   <p>City of Melbourne Municipal GHG Emissions 2013–2020</p>
                 </div>
               </div>
               <div class="forecast-visualization">
                 <div class="emissions-chart">
                   <div class="projection-bars">
                     <div class="bar-group">
                       <div class="bar current" style="height: 80%;">
                         <div class="bar-value">2020</div>
                         <div class="bar-label">Current</div>
                       </div>
                     </div>
                     <div class="bar-group">
                       <div class="bar projected" style="height: 65%;">
                         <div class="bar-value">2026</div>
                         <div class="bar-label">-15%</div>
                       </div>
                     </div>
                     <div class="bar-group">
                       <div class="bar projected" style="height: 50%;">
                         <div class="bar-value">2028</div>
                         <div class="bar-label">-30%</div>
                       </div>
                     </div>
                     <div class="bar-group">
                       <div class="bar target" style="height: 35%;">
                         <div class="bar-value">2030</div>
                         <div class="bar-label">Target</div>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div class="forecast-metrics">
                   <div class="metric">
                     <span class="metric-value">-45%</span>
                     <span class="metric-label">Reduction Target</span>
                   </div>
                   <div class="metric">
                     <span class="metric-value">2030</span>
                     <span class="metric-label">Target Year</span>
                   </div>
                 </div>
               </div>
             </div>

                         <!-- Residential & Business Emissions -->
             <div class="forecast-panel energy">
               <div class="panel-header">
                 <div class="panel-icon">
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                     <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" stroke-width="2" fill="currentColor"/>
                   </svg>
                 </div>
                 <div class="panel-title">
                   <h3>Residential & Business</h3>
                   <p>Summary Residential & Business Community Emissions</p>
                 </div>
               </div>
              <div class="forecast-visualization">
                <div class="energy-chart">
                  <div class="consumption-rings">
                    <div class="ring-container">
                      <svg class="ring-svg" width="100" height="100">
                        <circle class="ring-track" cx="50" cy="50" r="35" stroke="#e8f5e8" stroke-width="8" fill="none"/>
                        <circle class="ring-progress renewable" cx="50" cy="50" r="35" stroke="#4CAF50" stroke-width="8" fill="none" 
                                stroke-dasharray="220" stroke-dashoffset="66" transform="rotate(-90 50 50)"/>
                      </svg>
                      <div class="ring-label">
                        <div class="ring-value">70%</div>
                        <div class="ring-text">Renewable</div>
                      </div>
                    </div>
                    <div class="ring-container">
                      <svg class="ring-svg" width="100" height="100">
                        <circle class="ring-track" cx="50" cy="50" r="35" stroke="#fff3e0" stroke-width="8" fill="none"/>
                        <circle class="ring-progress efficiency" cx="50" cy="50" r="35" stroke="#FF9800" stroke-width="8" fill="none" 
                                stroke-dasharray="220" stroke-dashoffset="88" transform="rotate(-90 50 50)"/>
                      </svg>
                      <div class="ring-label">
                        <div class="ring-value">60%</div>
                        <div class="ring-text">Efficiency</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="forecast-metrics">
                  <div class="metric">
                    <span class="metric-value">+25%</span>
                    <span class="metric-label">Efficiency Gain</span>
                  </div>
                  <div class="metric">
                    <span class="metric-value">2026</span>
                    <span class="metric-label">Target Year</span>
                  </div>
                </div>
              </div>
            </div>

                                      <!-- Energy Projections -->
             <div class="forecast-panel energy-projections">
               <div class="panel-header">
                 <div class="panel-icon">
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                     <path d="M12 2L2 7V11C2 16 6 19 12 22C18 19 22 16 22 11V7L12 2Z" stroke="currentColor" stroke-width="2" fill="currentColor"/>
                   </svg>
                 </div>
                 <div class="panel-title">
                   <h3>Energy Projections</h3>
                   <p>Block-level & Property-level Energy Consumption (2011–2026)</p>
                 </div>
                 <div class="panel-badges">
                   <span class="badge accent">-25% YoY</span>
                   <span class="badge soft">Target 2030</span>
                 </div>
               </div>
               <div class="forecast-visualization">
                <div class="energy-tabs" role="tablist" aria-label="Energy projections tabs">
                  <button class="tab-btn" :class="{ active: energyTab === 'block' }" role="tab" aria-selected="energyTab === 'block'" @click="energyTab = 'block'">Block-level</button>
                  <button class="tab-btn" :class="{ active: energyTab === 'property' }" role="tab" aria-selected="energyTab === 'property'" @click="energyTab = 'property'">Property-level</button>
                </div>
                <transition name="fade-slide" mode="out-in">
                  <div class="energy-projections-content energy-split" :key="energyTab">
                    <!-- Block-level Projections -->
                    <div class="projection-section">
                      <h4 class="projection-subtitle">Block-level Energy Consumption Projections (2026)</h4>
                      <div class="energy-projection-chart">
                        <div class="projection-timeline">
                          <div class="timeline-item">
                            <div class="timeline-year">2011</div>
                            <div class="timeline-value">Baseline</div>
                          </div>
                          <div class="timeline-item">
                            <div class="timeline-year">2026</div>
                            <div class="timeline-value">Projected</div>
                          </div>
                          <div class="timeline-item">
                            <div class="timeline-year">2030</div>
                            <div class="timeline-value">Target</div>
                          </div>
                        </div>
                        <div class="energy-trend">
                          <svg width="220" height="120" viewBox="0 0 220 120">
                            <defs>
                              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stop-color="#4CAF50" stop-opacity="0.35"/>
                                <stop offset="100%" stop-color="#4CAF50" stop-opacity="0.05"/>
                              </linearGradient>
                              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stop-color="#2e7d32"/>
                                <stop offset="100%" stop-color="#66bb6a"/>
                              </linearGradient>
                            </defs>
                            <!-- grid -->
                            <g opacity="0.25" stroke="#e3f2e6" stroke-width="1">
                              <line x1="16" y1="95" x2="210" y2="95"/>
                              <line x1="16" y1="70" x2="210" y2="70"/>
                              <line x1="16" y1="45" x2="210" y2="45"/>
                            </g>
                            <!-- area -->
                            <path d="M20 95 Q70 70 120 50 T200 35 L200 110 L20 110 Z" fill="url(#areaGradient)"/>
                            <!-- line -->
                            <path d="M20 95 Q70 70 120 50 T200 35" stroke="url(#lineGradient)" stroke-width="3" fill="none"/>
                            <!-- points -->
                            <circle cx="20" cy="95" r="4" fill="#4CAF50"/>
                            <circle cx="120" cy="50" r="4" fill="#4CAF50"/>
                            <circle cx="200" cy="35" r="4" fill="#4CAF50"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Property-level Distribution -->
                    <div class="projection-section">
                      <h4 class="projection-subtitle">Property-level Energy Consumption (2011–2026)</h4>
                      <div class="capsule-list">
                        <div class="capsule-row">
                          <span class="capsule-label">Residential</span>
                          <div class="capsule-track">
                            <div class="capsule-fill residential" style="width: 70%"></div>
                          </div>
                          <span class="capsule-value">70%</span>
                        </div>
                        <div class="capsule-row">
                          <span class="capsule-label">Commercial</span>
                          <div class="capsule-track">
                            <div class="capsule-fill commercial" style="width: 85%"></div>
                          </div>
                          <span class="capsule-value">85%</span>
                        </div>
                        <div class="capsule-row">
                          <span class="capsule-label">Industrial</span>
                          <div class="capsule-track">
                            <div class="capsule-fill industrial" style="width: 60%"></div>
                          </div>
                          <span class="capsule-value">60%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
                
              </div>
            </div>
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
  </div>
</template>

<script>
import { environmentApi, apiUtils } from '../../services/api.js'
import { LMap, LTileLayer, LCircleMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import LineChart from "@/components/environment/LineChart.vue";

export default {
  name: 'EnvironmentPage',
  data() {
    return {
      trees: [
        { id: 1, lat: -37.81, lon: 144.96, name: "Eucalyptus", life: 80 },
        { id: 2, lat: -37.815, lon: 144.97, name: "Plane Tree", life: 60 }
      ],
      mapCenter: [-37.81, 144.96],
      selectedTimePeriod: '6m',
      energyTab: 'block',
      animationStarted: false,
      environmentalIndicators: [],
      trendData: [],
      loading: false,
      error: null
    }
  },
  mounted() {
    this.initializeAnimations();
    this.setupTimeSelector();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  computed: {
    speciesCount() {
      const counts = {};
      this.trees.forEach((tree) => {
        counts[tree.name] = (counts[tree.name] || 0) + 1;
      });
      return counts;
    },
    trendChartData() {
      return {
        labels: this.trees.map((t) => t.name),
        datasets: [
          {
            label: "Life Expectancy (years)",
            data: this.trees.map((t) => t.life),
            borderColor: "green",
            backgroundColor: "rgba(0,128,0,0.3)"
          }
        ]
      };
    },
    selectedSuburb() {
      return this.$route?.query?.suburb || '';
    },
    
    // Process environmental indicators for display
    processedIndicators() {
      const defaultIndicators = {
        treeCanopy: { value: 70, unit: '%', trend: '+5.2%' },
        airQuality: { value: 60, unit: 'AQI', status: 'Moderate' },
        waterUsage: { value: 50, unit: '%', dailyUsage: '180L' }
      };

      if (!this.environmentalIndicators.length) {
        return defaultIndicators;
      }

      const processed = {};
      this.environmentalIndicators.forEach(indicator => {
        const type = indicator.indicatorType?.toLowerCase();
        switch(type) {
          case 'tree_canopy':
          case 'canopy':
            processed.treeCanopy = {
              value: Math.round(indicator.value || 70),
              unit: indicator.unit || '%',
              trend: this.calculateTrend(indicator) || '+5.2%'
            };
            break;
          case 'air_quality':
          case 'aqi':
            processed.airQuality = {
              value: Math.round(indicator.value || 60),
              unit: indicator.unit || 'AQI',
              status: this.getAirQualityStatus(indicator.value || 60)
            };
            break;
          case 'water_usage':
          case 'water':
            processed.waterUsage = {
              value: Math.round(indicator.value || 50),
              unit: indicator.unit || '%',
              dailyUsage: this.calculateWaterUsage(indicator.value || 50)
            };
            break;
        }
      });

      return { ...defaultIndicators, ...processed };
    }
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
    }
  },
  methods: {
    toggleTreeDetail(){
      this.$nextTick(() => {
        document
          .getElementById("tree-detail-section")
          ?.scrollIntoView({ behavior: "smooth" });
      });
    },
    async loadEnvironmentalData(suburb) {
      if (!suburb) return;
      
      this.loading = true;
      this.error = null;
      
      try {
        // Load latest environmental indicators and trend data in parallel
        const [indicatorsResponse, trendResponse] = await Promise.allSettled([
          environmentApi.getLatestIndicators(suburb),
          environmentApi.getIndicatorTrend(suburb, 'air_quality', this.getMonthsFromPeriod(this.selectedTimePeriod))
        ]);

        // Handle environmental indicators
        if (indicatorsResponse.status === 'fulfilled') {
          const indicatorsResult = apiUtils.extractData(indicatorsResponse.value);
          if (indicatorsResult.success) {
            this.environmentalIndicators = apiUtils.formatEnvironmentalIndicators(indicatorsResult.data || []);
          } else {
            this.environmentalIndicators = [];
          }
        } else {
          this.environmentalIndicators = [];
        }

        // Handle trend data
        if (trendResponse.status === 'fulfilled') {
          const trendResult = apiUtils.extractData(trendResponse.value);
          if (trendResult.success) {
            this.trendData = apiUtils.formatEnvironmentalIndicators(trendResult.data || []);
          } else {
            this.trendData = [];
          }
        } else {
          this.trendData = [];
        }

      } catch (error) {
        console.error('Error loading environmental data:', error);
        this.error = `Failed to load environmental data for ${suburb}`;
      } finally {
        this.loading = false;
      }
    },

    async loadTrendData(suburb, period) {
      if (!suburb) return;
      
      try {
        const months = this.getMonthsFromPeriod(period);
        const response = await environmentApi.getIndicatorTrend(suburb, 'air_quality', months);
        const result = apiUtils.extractData(response);
        
        if (result.success) {
          this.trendData = result.data || [];
        }
      } catch (error) {
        console.warn('Failed to load trend data:', error);
      }
    },

    getMonthsFromPeriod(period) {
      switch(period) {
        case '6m': return 6;
        case '1y': return 12;
        case '2y': return 24;
        default: return 6;
      }
    },

    calculateTrend(indicator) {
      // Simple trend calculation - in real app this would be more sophisticated
      if (indicator.value > 65) return '+5.2%';
      if (indicator.value > 45) return '+2.1%';
      return '-1.3%';
    },

    getAirQualityStatus(value) {
      if (value <= 50) return 'Good';
      if (value <= 100) return 'Moderate';
      if (value <= 150) return 'Unhealthy for Sensitive Groups';
      return 'Unhealthy';
    },

    calculateWaterUsage(efficiency) {
      // Calculate daily usage based on efficiency (lower efficiency = higher usage)
      const baseUsage = 200; // Base usage in liters
      const usage = Math.round(baseUsage * (100 - efficiency) / 50);
      return `${usage}L`;
    },

    initializeAnimations() {
      // Start progress ring animations
      setTimeout(() => {
        this.animationStarted = true;
      }, 500);
    },
    
    setupTimeSelector() {
      const timeButtons = document.querySelectorAll('.time-btn');
      timeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          timeButtons.forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
          this.selectedTimePeriod = e.target.dataset.period;
        });
      });
    },

    retryLoading() {
      if (this.selectedSuburb) {
        this.loadEnvironmentalData(this.selectedSuburb)
      } else {
        this.error = null
      }
    }
  }
}
</script>

<style scoped>
.tree-detail-section {
  margin-top: 3rem;
  padding: 2rem;
  border: 2px solid #eee;
  border-radius: 15px;
  background: white;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
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
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95));
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
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
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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
}

.title-word {
  background: linear-gradient(135deg, #2c3e50, #3498db, #4CAF50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: titleGlow 3s ease-in-out infinite;
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
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
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

/* Air Quality Trends */
.air-quality-trends {
  padding: 6rem 0;
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
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .page-title {
    font-size: 2.5rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .indicators-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
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
