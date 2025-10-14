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

      <section id="tree-cards-section" class="tree-cards-section">
        <div class="container">
          <div class="detail-card">
            <h2 class="section-title">Tree Sustainability Highlights</h2>
            <p class="section-subtitle">Top-performing suburbs across multiple tree-related dimensions</p>

            <div class="tree-cards-grid">
              <!-- Card F -->
              <div class="tree-card" v-if="treeCardF">
                <div class="tree-card-content">
                  <h3>{{ treeCardF.card_title }}</h3>
                  <p class="suburb">{{ treeCardF.suburb }}</p>
                  <p class="value">{{ treeCardF.data_value }}</p>
                  <p class="footnote">{{ treeCardF.footnote }}</p>
                  <p class="related">{{ treeCardF.related_data }}</p>
                </div>
              </div>

              <!-- Card O -->
              <div class="tree-card" v-if="treeCardO">
                <div class="tree-card-content">
                  <h3>{{ treeCardO.card_title }}</h3>
                  <p class="suburb">{{ treeCardO.suburb }}</p>
                  <p class="value">{{ treeCardO.data_value }}</p>
                  <p class="footnote">{{ treeCardO.footnote }}</p>
                  <p class="related">{{ treeCardO.related_data }}</p>
                </div>
              </div>

              <!-- Card U -->
              <div class="tree-card" v-if="treeCardU">
                <div class="tree-card-content">
                  <h3>{{ treeCardU.card_title }}</h3>
                  <p class="suburb">{{ treeCardU.suburb }}</p>
                  <p class="value">{{ treeCardU.data_value }}</p>
                  <p class="footnote">{{ treeCardU.footnote }}</p>
                  <p class="related">{{ treeCardU.related_data }}</p>
                </div>
              </div>

              <!-- Card R -->
              <div class="tree-card" v-if="treeCardR">
                <div class="tree-card-content">
                  <h3>{{ treeCardR.card_title }}</h3>
                  <p class="suburb">{{ treeCardR.suburb }}</p>
                  <p class="value">{{ treeCardR.data_value }}</p>
                  <p class="footnote">{{ treeCardR.footnote }}</p>
                  <p class="related">{{ treeCardR.related_data }}</p>
                </div>
              </div>
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
            <div class = "energy-map-wrapper">
              <l-map ref="energyMapRef" style="height: 400px; width: 100%;" :zoom="15" :center="mapCenter">
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
              <button class="map-reset-button" @click="resetEnergyMapView" title="Reset map view">
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>
      <!-- Energy Efficiency Highlights Section -->
      <section id="energy-cards-section" class="energy-cards-section">
        <div class="container">
          <div class="detail-card">
            <h2 class="section-title">Energy Efficiency Highlights</h2>
            <p class="section-subtitle">Suburbs leading in sustainable energy consumption and performance</p>

            <div class="energy-cards-grid">
              <!-- Card F -->
              <div class="energy-card" v-if="energyCardF">
                <div class="energy-card-content">
                  <h3>{{ energyCardF.card_title }}</h3>
                  <p class="suburb">{{ energyCardF.suburb }}</p>
                  <p class="value">{{ energyCardF.data_value }}</p>
                  <p class="footnote">{{ energyCardF.footnote }}</p>
                  <p class="related">{{ energyCardF.related_data }}</p>
                </div>
              </div>

              <!-- Card O -->
              <div class="energy-card" v-if="energyCardO">
                <div class="energy-card-content">
                  <h3>{{ energyCardO.card_title }}</h3>
                  <p class="suburb">{{ energyCardO.suburb }}</p>
                  <p class="value">{{ energyCardO.data_value }}</p>
                  <p class="footnote">{{ energyCardO.footnote }}</p>
                  <p class="related">{{ energyCardO.related_data }}</p>
                </div>
              </div>

              <!-- Card U -->
              <div class="energy-card" v-if="energyCardU">
                <div class="energy-card-content">
                  <h3>{{ energyCardU.card_title }}</h3>
                  <p class="suburb">{{ energyCardU.suburb }}</p>
                  <p class="value">{{ energyCardU.data_value }}</p>
                  <p class="footnote">{{ energyCardU.footnote }}</p>
                  <p class="related">{{ energyCardU.related_data }}</p>
                </div>
              </div>

              <!-- Card R -->
              <div class="energy-card" v-if="energyCardR">
                <div class="energy-card-content">
                  <h3>{{ energyCardR.card_title }}</h3>
                  <p class="suburb">{{ energyCardR.suburb }}</p>
                  <p class="value">{{ energyCardR.data_value }}</p>
                  <p class="footnote">{{ energyCardR.footnote }}</p>
                  <p class="related">{{ energyCardR.related_data }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 📈 Energy Trend Snapshot Section -->
      <section id="energy-trend-section" class="energy-trend-section">
        <div class="container">
          <div class="detail-card">
            <h2 class="section-title">Trend Snapshot</h2>
            <p class="section-subtitle">2011 → 2021 → 2026 total modelled consumption</p>

            <div class="trend-chart-wrapper">
              <canvas ref="energyTrendChart"></canvas>
            </div>

            <div class="trend-intensity-info">
              <p>
                Median per-property intensity ≈ 
                {{ energyTrendData?.median_intensity || '-' }} Wh/m²; 
                90<sup>th</sup>-pct ≈ 
                {{ energyTrendData?.intensity || '-' }} Wh/m² 
                (right-tailed distribution).
              </p>
              <p class="footnote">
                *Values use the unit supplied by the dataset (converted to GWh for readability).
              </p>
            </div>
          </div>

          <div class="detail-card trend-insight-card">
            <h3 class="insight-title">Interpretation</h3>
            <ul class="insight-list">
              <li>
                <strong>Rising Energy Footprint –</strong>
                {{ energyTrendInsight.rising_energy_footprint }}
              </li>
              <li>
                <strong>Residential Share Surging –</strong>
                {{ energyTrendInsight.residential_share_surging }}
              </li>
              <li>
                <strong>Median Intensity Benchmark –</strong>
                {{ energyTrendInsight.median_intensity_benchmark }}
              </li>
              <li>
                <strong>Forward Efficiency Challenge –</strong>
                {{ energyTrendInsight.forward_efficiency_challenge }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="faq-section">
        <div class="container">
          <div class="faq-header">
            <h2 class="faq-title">FAQ</h2>
            <div class="faq-divider">
              <p class="faq-subtitle">General information</p>
            </div>
            <p class="faq-description">Frequently asked questions mainly relating to environment sustainability indicators.</p>
          </div>

          <div class="faq-list">
            <!-- FAQ Item 1 -->
            <div class="faq-item" :class="{ 'active': activeFaq === 0 }">
              <button class="faq-question" @click="toggleFaq(0)">
                <span>What does the “Urban Tree Lifespan” card show, and why is it useful?</span>
                <svg class="faq-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M19 9L12 16L5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="faq-answer" v-show="activeFaq === 0">
                <div class="faq-answer-content">
                  <p>The "Urban Tree Lifespan" card summarises how old or newly planted the trees are in each suburb. Median lifespan values (20–60 years) reveal how close a canopy is to renewal. Suburbs such as Docklands and West Melbourne feature young, future-proof trees, while Parkville and East Melbourne hold mature forests nearing replacement. This helps identify where renewal or replanting will soon be required to sustain long-term shading and carbon benefits.</p>
                </div>
              </div>
            </div>

            <!-- FAQ Item 2 -->
            <div class="faq-item" :class="{ 'active': activeFaq === 1 }">
              <button class="faq-question" @click="toggleFaq(1)">
                <span>What does the "Shade Provider Diameter" card measure, and how can it guide cooling and comfort planning?</span>
                <svg class="faq-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M19 9L12 16L5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="faq-answer" v-show="activeFaq === 1">
                <div class="faq-answer-content">
                  <p>The "Shade Provider Diameter" card measures the average trunk diameter of trees - a direct indicator of canopy size and cooling power. Larger diameters (60-77 cm) provide extensive shade and carbon capture, while smaller diameters (22-35 cm) show developing canopies. It helps users see which suburbs already benefit from mature, cooling shade and where young plantings still need time to deliver impact.</p>
                </div>
              </div>
            </div>

            <!-- FAQ Item 3 -->
            <div class="faq-item" :class="{ 'active': activeFaq === 2 }">
              <button class="faq-question" @click="toggleFaq(2)">
                <span>What does the "Species Diversity" card reveal about ecological balance and resilience?</span>
                <svg class="faq-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M19 9L12 16L5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="faq-answer" v-show="activeFaq === 2">
                <div class="faq-answer-content">
                  <p>The "Species Diversity" card indicates how many tree species exist in each suburb, showing biodiversity strength. High species counts (like Parkville's 255) reflect stable ecosystems, while lower counts (Southbank, Docklands) reveal limited variety. This helps assess each suburb's resilience to pests, heat, and long-term climate change.</p>
                </div>
              </div>
            </div>

            <!-- FAQ Item 4 -->
            <div class="faq-item" :class="{ 'active': activeFaq === 3 }">
              <button class="faq-question" @click="toggleFaq(3)">
                <span>What does the "Canopy Density per 1,000 Residents" card indicate, and how does it relate to liveability?</span>
                <svg class="faq-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M19 9L12 16L5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="faq-answer" v-show="activeFaq === 3">
                <div class="faq-answer-content">
                  <p>The "Canopy Density per 1,000 Residents" card quantifies tree access per population unit. Parkville and East Melbourne rank highest, offering abundant shade and parkland, while Southbank and Docklands have low tree access due to vertical density. This indicator directly links canopy equity to environmental comfort, cooling, and mental wellbeing..</p>
                </div>
              </div>
            </div>

            <!-- FAQ Item 5 -->
            <div class="faq-item" :class="{ 'active': activeFaq === 4 }">
              <button class="faq-question" @click="toggleFaq(4)">
                <span>What does the "Trees Planted (Annual / Renewal Cycle)" card represent, and why is it important?</span>
                <svg class="faq-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M19 9L12 16L5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="faq-answer" v-show="activeFaq === 4">
                <div class="faq-answer-content">
                  <p>The "Trees Planted" card records the number and timing of recent plantings, showing whether suburbs are renewing their canopy consistently. Areas with high recent planting (Docklands, West Melbourne) will see strong future shade growth, while mature areas (Parkville, East Melbourne) may need re-investment. It shows which suburbs are actively maintaining long-term environmental resilience.</p>
                </div>
              </div>
            </div>

            <!-- FAQ Item 6 -->
            <div class="faq-item" :class="{ 'active': activeFaq === 5 }">
              <button class="faq-question" @click="toggleFaq(5)">
                <span>What does the "Air Quality Index (AQI / AVI)" graph show, and how does it connect to other indicators?</span>
                <svg class="faq-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M19 9L12 16L5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="faq-answer" v-show="activeFaq === 5">
                <div class="faq-answer-content">
                  <p>The "Air Quality Index (AQI / AVI)" graph shows relative air purity across suburbs - lower values mean cleaner air. When compared with canopy data, it reveals how areas with more trees achieve better air quality. Combining AQI/AVI with energy maps also highlights how high-consumption or traffic-dense zones tend to have poorer air quality, helping identify areas needing greening or emission reduction.</p>
                </div>
              </div>
            </div>
            <!-- FAQ Item 7 -->
            <div class="faq-item" :class="{ 'active': activeFaq === 6 }">
              <button class="faq-question" @click="toggleFaq(6)">
                <span>What does the "2011 → 2021 → 2026 Total Modelled Energy Consumption" graph show, and how is it useful?</span>
                <svg class="faq-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M19 9L12 16L5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="faq-answer" v-show="activeFaq === 6">
                <div class="faq-answer-content">
                  <p>The “2011 → 2026 Total Modelled Energy Consumption” graph tracks how total energy demand evolves over time. A gradual upward line signals rising usage from population growth and density, while lighter tones indicate improved efficiency. It helps users and planners see whether energy trends are stabilising or escalating, informing future sustainability measures.</p>
                </div>
              </div>
            </div>
            <!-- FAQ Item 8 -->
            <div class="faq-item" :class="{ 'active': activeFaq === 7 }">
              <button class="faq-question" @click="toggleFaq(7)">
                <span>What does the “Block-Level Energy Consumption Map” display, and what insight does it offer?</span>
                <svg class="faq-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M19 9L12 16L5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="faq-answer" v-show="activeFaq === 7">
                <div class="faq-answer-content">
                  <p> The “Block-Level Energy Consumption Map” shows variations in energy use within each suburb. Colour gradients — green = efficient, yellow = moderate, red = high — highlight where energy use is concentrated. It enables users to locate efficient, low-impact communities and allows councils to target blocks that would benefit from efficiency upgrades or cooling interventions.</p>
                </div>
              </div>
            </div>
            <!-- FAQ Item 9 -->
            <div class="faq-item" :class="{ 'active': activeFaq === 8 }">
              <button class="faq-question" @click="toggleFaq(8)">
                <span>What does the “Energy Lifespan / Infrastructure Age” card represent, and why does it matter?</span>
                <svg class="faq-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M19 9L12 16L5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="faq-answer" v-show="activeFaq === 8">
                <div class="faq-answer-content">
                  <p>The “Energy Lifespan / Infrastructure Age” card reflects how modern or aged the local energy infrastructure is. Younger systems (Docklands, West Melbourne) indicate efficient grids and newer buildings, while older networks (Carlton, Parkville) may need renewal. It highlights readiness for energy transition and identifies where retrofitting or smart-grid investment is most needed.</p>
                </div>
              </div>
            </div>

            <!-- FAQ Item 10 -->
            <div class="faq-item" :class="{ 'active': activeFaq === 9 }">
              <button class="faq-question" @click="toggleFaq(9)">
                <span>What does the “Energy Efficiency / Consumption” card measure, and how does it guide sustainable living?</span>
                <svg class="faq-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M19 9L12 16L5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="faq-answer" v-show="activeFaq === 9">
                <div class="faq-answer-content">
                  <p>The “Energy Efficiency / Consumption” card summarises average energy use per household or building. Higher efficiency means less waste and better building design, while higher consumption suggests improvement opportunities. It helps compare suburbs on performance and supports awareness of efficient living behaviours.</p>
                </div>
              </div>
            </div>

            <!-- FAQ Item 11 -->
            <div class="faq-item" :class="{ 'active': activeFaq === 10 }">
              <button class="faq-question" @click="toggleFaq(10)">
                <span>What does the “Energy Density per Capita” card show, and how can it be interpreted?</span>
                <svg class="faq-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M19 9L12 16L5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="faq-answer" v-show="activeFaq === 10">
                <div class="faq-answer-content">
                  <p>The “Energy Density per Capita” card shows how much energy is used relative to population or built area. Dense commercial centres like Melbourne CBD and Southbank naturally use more per km², while residential areas like Parkville or Kensington perform better per capita. It allows balanced comparisons between density and sustainability.</p>
                </div>
              </div>
            </div>

            <!-- FAQ Item 12 -->
            <div class="faq-item" :class="{ 'active': activeFaq === 11 }">
              <button class="faq-question" @click="toggleFaq(11)">
                <span>What does the “Energy Performance Score” card indicate, and how should users read it?</span>
                <svg class="faq-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M19 9L12 16L5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="faq-answer" v-show="activeFaq === 11">
                <div class="faq-answer-content">
                  <p>The “Energy Performance Score” card consolidates consumption, infrastructure age, efficiency, and density into one rating. Higher scores mark balanced, low-carbon suburbs with reliable infrastructure. It provides an at-a-glance benchmark for sustainability strength across Melbourne’s districts.</p>
                </div>
              </div>
            </div>

            <!-- FAQ Item 13 -->
            <div class="faq-item" :class="{ 'active': activeFaq === 12 }">
              <button class="faq-question" @click="toggleFaq(12)">
                <span>What insight emerges when viewing tree, air, and energy data together?</span>
                <svg class="faq-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M19 9L12 16L5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="faq-answer" v-show="activeFaq === 12">
                <div class="faq-answer-content">
                  <p>Analysing all visuals together gives a complete sustainability picture. Tree metrics show natural resilience and shading; AQI/AVI reveals environmental quality; and energy metrics expose efficiency and infrastructure health. Suburbs performing well across all domains — high canopy, clean air, and efficient energy — represent the most sustainable and liveable areas.</p>
                </div>
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
    <button class="back-to-top" @click="scrollToTop" :class="{ 'visible': showBackToTop }">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M7 14L12 9L17 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <!-- Scroll to Bottom Button -->
    <button class="scroll-to-bottom" @click="scrollToBottom" :class="{ 'visible': showScrollToBottom }">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
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
      showScrollToBottom: false,
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
      treeCardF: null,
      treeCardO: null,
      treeCardU: null,
      treeCardR: null,
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
      energyCardF: null,
      energyCardO: null,
      energyCardU: null,
      energyCardR: null,
      energyTrendData: null,
      energyTrendInsight: {},
      activeFaq: null,
      loading: false,
      error: null
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

    async loadEnvironmentalData(suburb) {
      if (!suburb) return;
      this.loading = true;
      this.error = null;

      try {
        await this.loadTrees(suburb);
        await this.loadEnergyBlocks(suburb);
        await this.loadAirTrend(suburb);
        await this.loadAirQuality(suburb);
        await this.loadTreeCard(suburb);
        await this.loadEnergyCardScore(suburb);
        await this.fetchEnvironmentScore(suburb);
        await this.loadTreeExtraCards(suburb);
        await this.loadEnergyExtraCards(suburb);
        await this.loadEnergyTrend(suburb);
        await this.loadEnergyTrendInsight(suburb);
      } catch (e) {
        console.error("Failed to load environmental data", e);
        this.error = `Failed to load data for ${suburb}`;
      } finally {
        this.loading = false;
      }
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

    // data for tree card
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

    async loadTreeExtraCards(suburb) {
      try {
        const [fRes, oRes, uRes, rRes] = await Promise.all([
          environmentApi.getTreeCardfBySuburb(suburb),
          environmentApi.getTreeCardoBySuburb(suburb),
          environmentApi.getTreeCarduBySuburb(suburb),
          environmentApi.getTreeCardrBySuburb(suburb)
        ]);

        this.treeCardF = fRes.data?.data || null;
        this.treeCardO = oRes.data?.data || null;
        this.treeCardU = uRes.data?.data || null;
        this.treeCardR = rRes.data?.data || null;
      } catch (e) {
        console.error("Failed to load extra tree cards:", e);
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

    async loadEnergyExtraCards(suburb) {
      try {
        const [fRes, oRes, uRes, rRes] = await Promise.all([
          environmentApi.getEnergyCardfBySuburb(suburb),
          environmentApi.getEnergyCardoBySuburb(suburb),
          environmentApi.getEnergyCarduBySuburb(suburb),
          environmentApi.getEnergyCardrBySuburb(suburb)
        ]);

        this.energyCardF = fRes.data?.data || null;
        this.energyCardO = oRes.data?.data || null;
        this.energyCardU = uRes.data?.data || null;
        this.energyCardR = rRes.data?.data || null;
      } catch (e) {
        console.error("Failed to load extra energy cards:", e);
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

    async loadEnergyTrend(suburb) {
      try {
        const res = await environmentApi.getEnergyTrendBySuburb(suburb);
        this.energyTrendData = res.data?.data || null;
        if (this.energyTrendData) {
          this.$nextTick(() => this.renderEnergyTrendChart());
        }
      } catch (e) {
        console.error("Failed to load energy trend data:", e);
      }
    },

    async loadEnergyTrendInsight(suburb) {
      try {
        const res = await environmentApi.getEnergyTrendInsightBySuburb(suburb);
        this.energyTrendInsight = res.data?.data || {};
      } catch (e) {
        console.error("Failed to load energy trend insight:", e);
      }
    },

    renderEnergyTrendChart() {
      const ctx = this.$refs.energyTrendChart.getContext("2d");
      if (this.energyTrendChart) this.energyTrendChart.destroy();

      this.energyTrendChart = new ChartJS(ctx, {
        type: "line",
        data: {
          labels: ["2011", "2021", "2026"],
          datasets: [
            {
              label: "Total Energy Consumption (GWh)",
              data: [
                this.energyTrendData["2011_total"],
                this.energyTrendData["2021_total"],
                this.energyTrendData["2026_total"]
              ],
              borderColor: "#2196F3",
              backgroundColor: "rgba(33,150,243,0.15)",
              borderWidth: 2,
              fill: true,
              tension: 0.3,
              pointRadius: 4,
              pointBackgroundColor: "#2196F3"
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { color: "#eee" } },
            y: {
              beginAtZero: true,
              grid: { color: "#eee" },
              ticks: { callback: v => v.toFixed(2) }
            }
          }
        }
      });
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
    },
    resetEnergyMapView() {
      try {
        const map = this.$refs.energyMapRef?.leafletObject;
        if (map) {
          map.setView(this.mapCenter, 15, { animate: true });
        }
      } catch (e) {
        console.warn("Failed to reset energy map view:", e);
      }
    },
    toggleFaq(index) {
      this.activeFaq = this.activeFaq === index ? null : index
    },
    //button for back top
    checkScroll() {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      this.showBackToTop = window.scrollY > 200;

      this.showScrollToBottom = scrollY + clientHeight < scrollHeight - 200;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    scrollToBottom() {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
    },
  },
}
</script>

<style scoped>
.hero-section {
  justify-content: center;
  align-items: center;
  text-align: center;
}
/* tree map style */
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

.environment-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #1a1a1a;
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

/* four tree card */
.tree-cards-section {
  margin-top: 3rem;
  padding: 2rem 0 4rem 0;
}

.tree-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  justify-items: center;
}

.tree-card {
  background: #fff;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 25px rgba(0,0,0,0.08);
  text-align: center;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 450px;
}

.tree-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.12);
}

.tree-card-content h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.tree-card-content p {
  margin: 0.3rem 0;
  font-size: 1rem;
  color: #555;
}

.tree-card-content .suburb {
  font-weight: 700;
  color: #00796B;
}

.tree-card-content .value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #4CAF50;
}

.tree-card-content .footnote {
  color: #999;
  font-size: 0.9rem;
}

.tree-card-content .related {
  font-style: italic;
  color: #666;
}
/* end of four tree card */

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

.energy-map-section {
  scroll-margin-top: var(--nav-height, 120px);
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

/* Energy Projection Chart */
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

.energy-map-wrapper {
  position: relative;
}

.map-reset-button {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.85);
  color: #1e293b;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  backdrop-filter: blur(4px);
  z-index: 999;
}
.map-reset-button:hover {
  background: rgba(59, 130, 246, 0.15);
  color: #2563eb;
  transform: scale(1.05);
}

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

/* energy four card */
.energy-cards-section {
  margin-top: 3rem;
  padding: 2rem 0 5rem 0;
}

.energy-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
  justify-items: center;
}

.energy-card {
  background: #fff;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 600px;
}

.energy-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
}

.energy-card-content h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.energy-card-content p {
  margin: 0.3rem 0;
  font-size: 1rem;
  color: #555;
}

.energy-card-content .suburb {
  font-weight: 700;
  color: #1565C0;
}

.energy-card-content .value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #2196F3;
}

.energy-card-content .footnote {
  color: #999;
  font-size: 0.9rem;
}

.energy-card-content .related {
  font-style: italic;
  color: #666;
}
/* end of energy four card */

/* start of energy trend */
.energy-trend-section {
  margin-top: 3rem;
  padding-bottom: 5rem;
}

.trend-chart-wrapper {
  position: relative;
  height: 300px;
  margin-top: 1rem;
}

.trend-intensity-info {
  margin-top: 1.2rem;
  font-size: 0.95rem;
  color: #374151;
}

.trend-intensity-info .footnote {
  color: #888;
  font-size: 0.85rem;
  margin-top: 0.3rem;
  font-style: italic;
}

.trend-insight-card {
  margin-top: 2rem;
}

.insight-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.8rem;
}

.insight-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.insight-list li {
  padding: 0.4rem 0;
  font-size: 1rem;
  color: #374151;
}

.insight-list li strong {
  color: #111827;
}
/* end of energy trend */

/* FAQ Section Styles */
.faq-section {
  padding: 4rem 0 8rem 0;
  background: transparent;
  position: relative;
}

.faq-header {
  text-align: center;
  margin-bottom: 2rem;
}

.faq-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0;
  letter-spacing: -0.02em;
}

.faq-divider {
  width: 100%;
  max-width: 900px;
  height: 2px;
  margin: 1.5rem auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}

.faq-divider::before,
.faq-divider::after {
  content: '';
  flex: 1;
  height: 2px;
  background: #dc2626;
}

.faq-subtitle {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  padding: 0 2rem;
  position: relative;
  white-space: nowrap;
}

.faq-description {
  font-size: 0.95rem;
  color: #64748b;
  max-width: 900px;
  margin: 1rem auto 0;
  padding: 0 2rem;
}

.faq-list {
  max-width: 900px;
  margin: 2rem auto 0;
  background: transparent;
}

.faq-item {
  background: transparent;
  border-bottom: 2px solid transparent;
  background-image: linear-gradient(to bottom, transparent, transparent),
                    linear-gradient(90deg, rgba(217, 119, 6, 0.25) 0%, rgba(202, 138, 4, 0.5) 50%, rgba(217, 119, 6, 0.25) 100%);
  background-size: 100% calc(100% - 2px), 100% 2px;
  background-position: 0 0, 0 100%;
  background-repeat: no-repeat;
  transition: all 0.3s ease;
}

.faq-item:last-child {
  background-image: linear-gradient(to bottom, transparent, transparent),
                    linear-gradient(90deg, rgba(217, 119, 6, 0.25) 0%, rgba(202, 138, 4, 0.5) 50%, rgba(217, 119, 6, 0.25) 100%);
  background-size: 100% calc(100% - 2px), 100% 2px;
  background-position: 0 0, 0 100%;
  background-repeat: no-repeat;
}

.faq-item:hover {
  background-color: transparent;
  background-image: linear-gradient(to bottom, transparent, transparent),
                    linear-gradient(90deg, rgba(217, 119, 6, 0.35) 0%, rgba(202, 138, 4, 0.65) 50%, rgba(217, 119, 6, 0.35) 100%);
}

.faq-question {
  width: 100%;
  padding: 1.5rem 2rem;
  background: transparent;
  border: none;
  text-align: left;
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
}

.faq-question span {
  flex: 1;
  padding-right: 1rem;
}

.faq-icon {
  flex-shrink: 0;
  transition: transform 0.3s ease;
  color: #64748b;
}

.faq-item.active .faq-icon {
  transform: rotate(180deg);
  color: #1e293b;
}

.faq-answer {
  overflow: hidden;
  transition: all 0.3s ease;
  background-color: transparent;
}

.faq-answer-content {
  padding: 0.5rem 2rem 1.5rem 2rem;
  color: #334155;
  font-size: 0.95rem;
  line-height: 1.7;
  font-weight: 500;
}

.faq-answer-content p {
  margin: 0;
}

.faq-answer-content strong {
  color: #1e293b;
  font-weight: 600;
}

.faq-answer-content ul {
  list-style-type: disc;
}

.faq-answer-content li {
  color: #334155;
  line-height: 1.7;
}

.faq-answer-content em {
  font-style: italic;
  color: #1e293b;
}

.faq-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 1rem 0;
  font-size: 0.9rem;
  background: transparent;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.faq-table thead {
  background: linear-gradient(135deg, rgba(217, 119, 6, 0.1) 0%, rgba(202, 138, 4, 0.15) 100%);
  border-bottom: 3px solid rgba(217, 119, 6, 0.4);
}

.faq-table th {
  padding: 1.25rem 1rem;
  text-align: left;
  font-weight: 700;
  color: #1e293b;
  font-size: 0.95rem;
  border-bottom: none;
}

.faq-table th:first-child {
  border-top-left-radius: 12px;
}

.faq-table th:last-child {
  border-top-right-radius: 12px;
}

.faq-table tbody {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
}

.faq-table td {
  padding: 1rem;
  border-bottom: 1px solid rgba(217, 119, 6, 0.15);
  color: #334155;
  font-weight: 500;
}

.faq-table tbody tr:last-child td {
  border-bottom: none;
}

.faq-table tbody tr:last-child td:first-child {
  border-bottom-left-radius: 12px;
}

.faq-table tbody tr:last-child td:last-child {
  border-bottom-right-radius: 12px;
}

.faq-table tbody tr:hover {
  background-color: rgba(217, 119, 6, 0.05);
}

.faq-table tbody tr:nth-child(even) {
  background-color: rgba(248, 250, 252, 0.5);
}

.faq-table tbody tr:nth-child(even):hover {
  background-color: rgba(217, 119, 6, 0.08);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .faq-title {
    font-size: 2.5rem;
  }

  .faq-subtitle {
    font-size: 1.3rem;
  }

  .faq-description {
    padding: 0 1.5rem;
  }

  .faq-question {
    padding: 1.25rem 1.5rem;
    font-size: 0.95rem;
  }

  .faq-answer-content {
    padding: 0.5rem 1.5rem 1.25rem 1.5rem;
    font-size: 0.9rem;
  }

  .faq-table {
    font-size: 0.85rem;
  }

  .faq-table th,
  .faq-table td {
    padding: 0.75rem 0.5rem;
  }
}

@media (max-width: 480px) {
  .faq-section {
    padding: 3rem 0 6rem 0;
  }

  .faq-title {
    font-size: 2rem;
  }

  .faq-subtitle {
    font-size: 1.1rem;
    padding: 0 1rem;
  }

  .faq-description {
    padding: 0 1rem;
    font-size: 0.9rem;
  }

  .faq-question {
    padding: 1rem 1.25rem;
    font-size: 0.9rem;
  }

  .faq-answer-content {
    padding: 0.5rem 1.25rem 1rem 1.25rem;
    font-size: 0.85rem;
  }

  .faq-icon {
    width: 14px;
    height: 14px;
  }

  .faq-table {
    font-size: 0.8rem;
  }

  .faq-table th,
  .faq-table td {
    padding: 0.5rem 0.35rem;
  }
}

/* button for back top */
.back-to-top {
  position: fixed;
  bottom: 6.5rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(76, 175, 80, 0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  z-index: 1000;
}

.back-to-top.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.back-to-top:hover {
  background: linear-gradient(135deg, #45a049, #4CAF50);
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 8px 30px rgba(76, 175, 80, 0.4);
}

.back-to-top svg {
  transition: transform 0.3s ease;
}

.back-to-top:hover svg {
  transform: translateY(-2px);
}

/* scroll to bottom */
.scroll-to-bottom {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(76, 175, 80, 0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  z-index: 1000;
}

.scroll-to-bottom.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.scroll-to-bottom:hover {
  background: linear-gradient(135deg, #45a049, #4CAF50);
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 8px 30px rgba(76, 175, 80, 0.4);
}

.scroll-to-bottom svg {
  transition: transform 0.3s ease;
}

.scroll-to-bottom:hover svg {
  transform: translateY(2px);
}
</style>
