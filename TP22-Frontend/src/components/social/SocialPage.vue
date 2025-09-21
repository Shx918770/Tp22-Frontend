<template>
  <div class="social-page">
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

    <!-- Header Navigation -->
    <Header />

    <!-- Main Content -->
    <main class="main-content">
      <!-- Social Insights Header -->
      <section class="insights-header">
        <div class="container">
          <div class="header-content">
            <div class="title-animation">
              <h1 class="page-title">
                <span class="title-word">Social</span>
                <span class="title-word">Sustainability</span>
                <span class="title-word">Insights</span>
              </h1>
            </div>
            <p class="page-description">
              Explore education, healthcare, recreation, and shopping amenities to evaluate daily convenience and community support in each area.
            </p>
          </div>
        </div>
      </section>

      <!-- Social Facilities - Modern Compact Grid -->
      <section class="social-facilities">
        <div class="container">
          <!-- Header with Total -->
          <div class="facilities-header">
            <div class="total-counter">
              <div class="counter-number">{{ facilityStats?.totalFacilities || 186 }}</div>
              <div class="counter-label">Social Facilities</div>
            </div>
            <div class="header-subtitle">
              <span v-if="selectedSuburb">{{ selectedSuburb }}'s community infrastructure</span>
              <span v-else>Discover Melbourne's community infrastructure</span>
            </div>
          </div>

          <!-- Loading state -->
          <div v-if="loading" class="loading-container">
            <div class="loading-spinner"></div>
            <p>Loading facility data...</p>
          </div>

          <!-- Error state -->
          <div v-else-if="error" class="error-container">
            <div class="error-icon">&#x26A0;&#xFE0F;</div>
            <p>{{ error }}</p>
            <button class="retry-btn" @click="retryLoading">Retry</button>
          </div>

          <!-- Compact Facility Grid -->
          <div v-else class="facilities-grid">
            <!-- Education Bubble -->
            <div class="facility-bubble education" @click="scrollToEducationDetail">
              <div class="bubble-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M22 10V6C22 4.89543 21.1046 4 20 4H4C2.89543 4 2 4.89543 2 6V10M22 10L12 15L2 10M22 10V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V10" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <div class="bubble-content">
                <div class="bubble-label">Education</div>
                <div class="bubble-details">
                  <span class="detail-pill">{{ schoolStats.totalSchools }} Schools</span>
                  <span class="detail-pill">{{ schoolStats.totalChildcare }} Childcare</span>
                </div>
              </div>
              <div class="bubble-glow"></div>
            </div>

            <!-- Healthcare Bubble -->
            <div class="facility-bubble healthcare" @click="scrollToHealthDetail">
              <div class="bubble-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M19 14C20.49 12.54 22 10.79 22 8.5C22 7.04131 21.4205 5.64236 20.3891 4.61091C19.3576 3.57946 17.9587 3 16.5 3C15.74 3 15.04 3.16 14.38 3.46L12 5.5L9.62 3.46C8.96 3.16 8.26 3 7.5 3C6.04131 3 4.64236 3.57946 3.61091 4.61091C2.57946 5.64236 2 7.04131 2 8.5C2 10.79 3.51 12.54 5 14L12 21L19 14Z" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <div class="bubble-content">
                <div class="bubble-label">Healthcare</div>
                <div class="bubble-details">
                  <span class="detail-pill">{{ healthBubble.hospitals }} Hospitals</span>
                  <span class="detail-pill">{{ healthBubble.practitioners }} Practitioners</span>
                </div>
              </div>
              <div class="bubble-glow"></div>
            </div>

            <!-- Recreation Bubble -->
            <div class="facility-bubble recreation" @click="scrollToCommunityConditionsDetail">
              <div class="bubble-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <div class="bubble-content">
                <div class="bubble-label">Recreation</div>
                <div class="bubble-details">
                  <span class="detail-pill">{{ playgroundCount }} Playgrounds</span>
                  <span class="detail-pill">{{ communityCenterCount }} Community Centers</span>
                </div>
              </div>
              <div class="bubble-glow"></div>
            </div>

            <!-- Hospitality Bubble -->
            <div class="facility-bubble hospitality" @click="scrollToHospitalityDetail">
              <div class="bubble-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12V7a1 1 0 0 0-2 0v5a.5.5 0 0 1-1 0V7a1 1 0 0 0-2 0v5a.5.5 0 0 1-1 0V7a1 1 0 0 0-2 0v5a2.5 2.5 0 0 0 2.5 2.5V20a1 1 0 0 0 2 0v-5.5Z" stroke="currentColor" stroke-width="2"/>
                  <path d="m15.5 7.5.5-.5a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.5.5V20a1 1 0 0 1-2 0V10.5Z" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <div class="bubble-content">
                <div class="bubble-label">Hospitality</div>
                <div class="bubble-details">
                  <span class="detail-pill">{{ hospitalityStats.totalCafes || 0 }} Cafe&Restaurant</span>
                  <span class="detail-pill">{{ hospitalityStats.totalBars || 0 }} Bars</span>
                </div>
              </div>
              <div class="bubble-glow"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Map Section -->
      <section class="map-section">
        <div class="container">
          <div class="map-container">
            <div class="map-area">
              <SocialMap 
                :schools="schools" 
                :childCares="childCares" 
                :hospitals="hospitals"
                :practitioners="practitioners"
                :cafes="cafes"
                :bars="bars"
                :playgrounds="playgrounds"
                :communityCenters="communityCenters"
                :selectedSuburb="selectedSuburb"
                :showSchools="mapLegendState.schools"
                :showChildCares="mapLegendState.childcare"
                :showHospitals="mapLegendState.hospitals"
                :showPractitioners="mapLegendState.practitioners"
                :showCafes="mapLegendState.cafes"
                :showBars="mapLegendState.bars"
                :showPlaygrounds="mapLegendState.playgrounds"
                :showCommunityCenters="mapLegendState.communityCenter"
                class="social-map-full"
              />
            </div>
            <div class="map-legend">
              <h4>Facility Legend</h4>
              <div class="legend-items">
                <div class="legend-item" 
                     :class="{ 'inactive': !mapLegendState.schools }"
                     @click="toggleLegendItem('schools')">
                  <div class="facility-legend-icon facility-legend-schools"></div>
                  <span>Schools</span>
                </div>
                <div class="legend-item" 
                     :class="{ 'inactive': !mapLegendState.hospitals }"
                     @click="toggleLegendItem('hospitals')">
                  <div class="facility-legend-icon facility-legend-hospitals"></div>
                  <span>Hospitals</span>
                </div>
                <div class="legend-item" 
                     :class="{ 'inactive': !mapLegendState.playgrounds }"
                     @click="toggleLegendItem('playgrounds')">
                  <div class="facility-legend-icon facility-legend-playgrounds"></div>
                  <span>Playgrounds</span>
                </div>
                <div class="legend-item" 
                     :class="{ 'inactive': !mapLegendState.communityCenter }"
                     @click="toggleLegendItem('communityCenter')">
                  <div class="facility-legend-icon facility-legend-community"></div>
                  <span>Community Centers</span>
                </div>
                <div class="legend-item" 
                     :class="{ 'inactive': !mapLegendState.cafes }"
                     @click="toggleLegendItem('cafes')"
                     :title="cafes.length > 150 ? `Showing up to 150 unique locations (highest capacity cafes) out of ${cafes.length} total` : `Showing all ${cafes.length} cafes at unique locations`">
                  <div class="facility-legend-icon facility-legend-cafes"></div>
                  <span>Cafes{{ cafes.length > 150 ? ' (Limited)' : '' }}</span>
                </div>
                <div class="legend-item" 
                     :class="{ 'inactive': !mapLegendState.bars }"
                     @click="toggleLegendItem('bars')"
                     :title="bars.length > 150 ? `Showing up to 150 unique locations (highest capacity bars) out of ${bars.length} total` : `Showing all ${bars.length} bars at unique locations`">
                  <div class="facility-legend-icon facility-legend-bars"></div>
                  <span>Bars{{ bars.length > 150 ? ' (Limited)' : '' }}</span>
                </div>
                <div class="legend-item" 
                     :class="{ 'inactive': !mapLegendState.childcare }"
                     @click="toggleLegendItem('childcare')">
                  <div class="facility-legend-icon facility-legend-childcare"></div>
                  <span>Childcare</span>
                </div>
                <div class="legend-item" 
                     :class="{ 'inactive': !mapLegendState.practitioners }"
                     @click="toggleLegendItem('practitioners')">
                  <div class="facility-legend-icon facility-legend-practitioners"></div>
                  <span>Practitioners</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      <!-- Education Detail Section -->
      <section id="education-detail" class="education-detail">
        <div class="container">
          <div class="detail-header">
            <h2>Education Facilities</h2>
            <p>Comprehensive overview of educational institutions and childcare services</p>
          </div>
          
          <!-- Three separate sections layout -->
          <div class="education-grid">
            <!-- Section 1: School Type Distribution -->
            <div class="education-section pie-chart-section">
              <div class="section-header">
                <div class="section-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <h3>School Type Distribution</h3>
              </div>
                <div class="section-content">
                  <div class="pie-chart-container">
                    <svg class="pie-chart-svg" viewBox="0 0 200 200">
                      <!-- Primary Segment -->
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="#52a3f0"
                        :stroke-width="40"
                        :stroke-dasharray="`${getPrimaryPct() * 5.02} 502`"
                        stroke-dashoffset="0"
                        transform="rotate(-90 100 100)"
                      />
                      <!-- Secondary Segment -->
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="#e74c3c"
                        :stroke-width="40"
                        :stroke-dasharray="`${getSecondaryPct() * 5.02} 502`"
                        :stroke-dashoffset="`-${getPrimaryPct() * 5.02}`"
                        transform="rotate(-90 100 100)"
                      />
                      <!-- Special Segment -->
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="#9C27B0"
                        :stroke-width="40"
                        :stroke-dasharray="`${getSpecialPct() * 5.02} 502`"
                        :stroke-dashoffset="`-${(getPrimaryPct() + getSecondaryPct()) * 5.02}`"
                        transform="rotate(-90 100 100)"
                      />
                      <!-- PRI/SEC Segment -->
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="#16a085"
                        :stroke-width="40"
                        :stroke-dasharray="`${getPriSecPct() * 5.02} 502`"
                        :stroke-dashoffset="`-${(getPrimaryPct() + getSecondaryPct() + getSpecialPct()) * 5.02}`"
                        transform="rotate(-90 100 100)"
                      />
                    
                      <!-- Percent Labels -->
                      <text v-if="getPrimaryPct() >= 3"
                            :x="getPrimaryLabelPos().x"
                            :y="getPrimaryLabelPos().y"
                            text-anchor="middle"
                            class="pie-percentage-label primary">{{ Math.round(getPrimaryPct()) }}%</text>
                      <text v-if="getSecondaryPct() >= 3"
                            :x="getSecondaryLabelPos().x"
                            :y="getSecondaryLabelPos().y"
                            text-anchor="middle"
                            class="pie-percentage-label secondary">{{ Math.round(getSecondaryPct()) }}%</text>
                      <text v-if="getSpecialPct() >= 3"
                            :x="getSpecialLabelPos().x"
                            :y="getSpecialLabelPos().y"
                            text-anchor="middle"
                            class="pie-percentage-label special">{{ Math.round(getSpecialPct()) }}%</text>
                      <text v-if="getPriSecPct() >= 3"
                            :x="getPriSecLabelPos().x"
                            :y="getPriSecLabelPos().y"
                            text-anchor="middle"
                            class="pie-percentage-label prisecc">{{ Math.round(getPriSecPct()) }}%</text>

                      <!-- Center Text -->
                    <text x="100" y="95" text-anchor="middle" class="pie-center-text-title">Education</text>
                    <text x="100" y="110" text-anchor="middle" class="pie-center-text-subtitle">Facilities</text>
                    </svg>
                  </div>
                  <div class="chart-legend">
                    <div class="legend-item"><div class="color primary"></div> Primary</div>
                    <div class="legend-item"><div class="color secondary"></div> Secondary</div>
                    <div class="legend-item"><div class="color special"></div> Special</div>
                    <div class="legend-item"><div class="color prisecc"></div> PRI/SEC</div>
                  </div>
              </div>
            </div>

            <!-- Section 2: School List -->
            <div class="education-section school-list-section">
              <div class="section-header">
                <div class="section-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <polyline points="10,9 9,9 8,9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <h3>List of School</h3>
                <select v-model="schoolFilter" class="healthcare-filter">
                  <option value="all">All Types</option>
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="special">Special</option>
                  <option value="pri/sec">PRI/SEC</option>
                  <option value="childcare">Childcare</option>
                </select>
              </div>
              <div class="section-content">
                <div class="school-list">
                  <div v-for="item in filteredSchoolList" :key="item.schoolNo || item.ref" class="school-item">
                    <div class="school-name">{{ item.isChildcare ? item.name : item.schoolName }}</div>
                    <div class="school-type">{{ item.isChildcare ? 'Childcare' : item.schoolType }}</div>
                    <div class="school-suburb">{{ item.isChildcare ? item.suburbname : item.suburb }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section 3: Student Chart -->
            <div class="education-section student-chart-section">
              <div class="section-header">
                <div class="section-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3v18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18.7 8l-5-5L9 7.5l-4.7-2L2 13.5l2.3-1.5L9 16l4.7-4.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <h3>Student Statistics</h3>
              </div>
              <div class="section-content">
                <div class="school-selector">
                  <label for="school-select">Select a school to view student statistics</label>
                  <select id="school-select" v-model="selectedSchool" @change="onSchoolChange">
                    <option value="">Select a school to view statistics...</option>
                    <option v-for="school in schools" :key="school.schoolNo" :value="school">
                      {{ school.schoolName }}
                    </option>
                  </select>
                </div>
                
                <div v-if="selectedSchool" class="student-count-chart">
                  <div class="chart-container">
                    <div class="chart-with-labels">
                      <div class="y-axis-label">Number of Students</div>
                      <div class="bar-chart">
                        <div v-for="year in 12" :key="year" class="bar-item">
                          <div class="bar" 
                               :class="{ 'bar-zero': getStudentCount(year) === 0 }" 
                               :style="{ height: getStudentCountHeight(year) + '%' }">
                            <div class="bar-value" 
                                 :class="{ 'bar-value-zero': getStudentCount(year) === 0 }">
                              {{ getStudentCount(year) }}
                            </div>
                          </div>
                          <div class="year-label">{{ year }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="x-axis-label">Year</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Health Services Detail Section -->
      <section id="health-detail" class="education-detail">
        <div class="container">
          <div class="detail-header">
            <h2>Health Services</h2>
            <p>Hospitals and medical practitioners overview</p>
          </div>
          <div class="education-grid health-grid-wide">
            <!-- Gauge Card (left) -->
            <div class="education-section pie-chart-section health-wide health-tall">
              <div class="section-header">
                <div class="section-icon">
                  <!-- speedometer icon -->
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 13a9 9 0 1 1 18 0" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 13l5-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </div>
                <h3>Hospital Beds per 1,000 Residents</h3>
              </div>
              <div class="section-content">
                <div class="pie-chart-container gauge-container-compact">
                  <svg viewBox="0 0 320 200" class="gauge-svg">
                    <!-- Three equal zones: Low (Red), Medium (Yellow), High (Green) -->
                    
                    <!-- Low zone: Red (-90° to -30°) -->
                    <path d="M60 160 A100 100 0 0 1 110 73.2" stroke="#ef4444" stroke-width="18" fill="none" stroke-linecap="round"/>
                    
                    <!-- Medium zone: Yellow (-30° to +30°) -->
                    <path d="M110 73.2 A100 100 0 0 1 210 73.2" stroke="#f59e0b" stroke-width="18" fill="none" stroke-linecap="round"/>
                    
                    <!-- High zone: Green (+30° to +90°) -->
                    <path d="M210 73.2 A100 100 0 0 1 260 160" stroke="#22c55e" stroke-width="18" fill="none" stroke-linecap="round"/>
                    
                    <!-- Labels -->
                    <text x="110" y="65" class="gauge-tick" text-anchor="middle">3.2</text>
                    <text x="210" y="65" class="gauge-tick" text-anchor="middle">3.8</text>
                    
                    <!-- Dynamic Colored Needle -->
                    <g :transform="`rotate(${getCorrectNeedleAngle(bedsValue)} 160 160)`">
                      <!-- Needle drop shadow -->
                      <path d="M 162 162 L 235 162 L 240 160 L 235 158 L 162 158 Z" fill="rgba(0,0,0,0.15)"/>
                      <!-- Main needle shape -->
                      <path d="M 160 160 L 235 160 L 240 158 L 235 156 L 160 158 Z" :fill="`url(#needleGradient-${getCurrentZone(bedsValue)})`" :stroke="`url(#needleBorder-${getCurrentZone(bedsValue)})`" stroke-width="0.5"/>
                      <!-- Needle highlight -->
                      <path d="M 160 159 L 235 159 L 238 158 L 235 157.5 L 160 157.5 Z" :fill="`url(#needleHighlight-${getCurrentZone(bedsValue)})`" opacity="0.7"/>
                    </g>
                    
                    <!-- Dynamic Gradient definitions -->
                    <defs>
                      <!-- Low zone gradients -->
                      <linearGradient id="needleGradient-low" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" :style="`stop-color:${getNeedleColors('low').needle[0]};stop-opacity:1`" />
                        <stop offset="50%" :style="`stop-color:${getNeedleColors('low').needle[1]};stop-opacity:1`" />
                        <stop offset="100%" :style="`stop-color:${getNeedleColors('low').needle[2]};stop-opacity:1`" />
                      </linearGradient>
                      <linearGradient id="needleBorder-low" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" :style="`stop-color:${getNeedleColors('low').border[0]};stop-opacity:1`" />
                        <stop offset="100%" :style="`stop-color:${getNeedleColors('low').border[1]};stop-opacity:1`" />
                      </linearGradient>
                      <linearGradient id="needleHighlight-low" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" :style="`stop-color:${getNeedleColors('low').highlight[0]};stop-opacity:1`" />
                        <stop offset="100%" :style="`stop-color:${getNeedleColors('low').highlight[1]};stop-opacity:1`" />
                      </linearGradient>
                      <radialGradient id="centerGradient-low" cx="50%" cy="30%" r="70%">
                        <stop offset="0%" :style="`stop-color:${getNeedleColors('low').center[0]};stop-opacity:1`" />
                        <stop offset="40%" :style="`stop-color:${getNeedleColors('low').center[1]};stop-opacity:1`" />
                        <stop offset="100%" :style="`stop-color:${getNeedleColors('low').center[2]};stop-opacity:1`" />
                      </radialGradient>
                      
                      <!-- Medium zone gradients -->
                      <linearGradient id="needleGradient-medium" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" :style="`stop-color:${getNeedleColors('medium').needle[0]};stop-opacity:1`" />
                        <stop offset="50%" :style="`stop-color:${getNeedleColors('medium').needle[1]};stop-opacity:1`" />
                        <stop offset="100%" :style="`stop-color:${getNeedleColors('medium').needle[2]};stop-opacity:1`" />
                      </linearGradient>
                      <linearGradient id="needleBorder-medium" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" :style="`stop-color:${getNeedleColors('medium').border[0]};stop-opacity:1`" />
                        <stop offset="100%" :style="`stop-color:${getNeedleColors('medium').border[1]};stop-opacity:1`" />
                      </linearGradient>
                      <linearGradient id="needleHighlight-medium" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" :style="`stop-color:${getNeedleColors('medium').highlight[0]};stop-opacity:1`" />
                        <stop offset="100%" :style="`stop-color:${getNeedleColors('medium').highlight[1]};stop-opacity:1`" />
                      </linearGradient>
                      <radialGradient id="centerGradient-medium" cx="50%" cy="30%" r="70%">
                        <stop offset="0%" :style="`stop-color:${getNeedleColors('medium').center[0]};stop-opacity:1`" />
                        <stop offset="40%" :style="`stop-color:${getNeedleColors('medium').center[1]};stop-opacity:1`" />
                        <stop offset="100%" :style="`stop-color:${getNeedleColors('medium').center[2]};stop-opacity:1`" />
                      </radialGradient>
                      
                      <!-- High zone gradients -->
                      <linearGradient id="needleGradient-high" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" :style="`stop-color:${getNeedleColors('high').needle[0]};stop-opacity:1`" />
                        <stop offset="50%" :style="`stop-color:${getNeedleColors('high').needle[1]};stop-opacity:1`" />
                        <stop offset="100%" :style="`stop-color:${getNeedleColors('high').needle[2]};stop-opacity:1`" />
                      </linearGradient>
                      <linearGradient id="needleBorder-high" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" :style="`stop-color:${getNeedleColors('high').border[0]};stop-opacity:1`" />
                        <stop offset="100%" :style="`stop-color:${getNeedleColors('high').border[1]};stop-opacity:1`" />
                      </linearGradient>
                      <linearGradient id="needleHighlight-high" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" :style="`stop-color:${getNeedleColors('high').highlight[0]};stop-opacity:1`" />
                        <stop offset="100%" :style="`stop-color:${getNeedleColors('high').highlight[1]};stop-opacity:1`" />
                      </linearGradient>
                      <radialGradient id="centerGradient-high" cx="50%" cy="30%" r="70%">
                        <stop offset="0%" :style="`stop-color:${getNeedleColors('high').center[0]};stop-opacity:1`" />
                        <stop offset="40%" :style="`stop-color:${getNeedleColors('high').center[1]};stop-opacity:1`" />
                        <stop offset="100%" :style="`stop-color:${getNeedleColors('high').center[2]};stop-opacity:1`" />
                      </radialGradient>
                    </defs>
                    
                    <!-- Dynamic Center hub -->
                    <circle cx="160" cy="160" r="12" :fill="`url(#centerGradient-${getCurrentZone(bedsValue)})`" :stroke="getNeedleColors(getCurrentZone(bedsValue)).border[1]" stroke-width="2"/>
                    <circle cx="160" cy="160" r="8" :fill="getNeedleColors(getCurrentZone(bedsValue)).center[0]" opacity="0.8"/>
                    <circle cx="160" cy="160" r="4" :fill="getNeedleColors(getCurrentZone(bedsValue)).highlight[0]" opacity="0.9"/>
                    <circle cx="158" cy="158" r="2" :fill="getNeedleColors(getCurrentZone(bedsValue)).highlight[0]"/>
                    <text x="160" y="185" text-anchor="middle" class="gauge-value">{{ bedsValue.toFixed(1) }}</text>
                  </svg>
                </div>
                <div class="gauge-legend expanded">
                  <div class="legend-item"><span class="dot low"></span><span>Low (0 - 3.2)</span></div>
                  <div class="legend-item"><span class="dot medium"></span><span>Medium (3.2 - 3.8)</span></div>
                  <div class="legend-item"><span class="dot high"></span><span>High (3.8+)</span></div>
                </div>
                
                <div class="health-description">
                  <div class="health-description-content">
                    <h4>Description</h4>
                    <p>{{ (bedsStat && bedsStat.Description) ? bedsStat.Description : 'No description available for this area.' }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- List Card (right) -->
            <div class="education-section school-list-section health-wide health-tall">
              <div class="section-header">
                <div class="section-icon">
                  <!-- medical list icon -->
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 8v6M9 11h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </div>
                <h3>Healthcare List</h3>
                <select v-model="healthcareFilter" class="healthcare-filter">
                  <option value="all">All Types</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="practitioner">Practitioner</option>
                </select>
              </div>
              <div class="section-content">
                <div class="school-list medical-list-container">
                  <div v-if="!filteredHealthcareList.length" class="empty-hint">No healthcare facilities available for this filter.</div>
                  <div v-for="item in filteredHealthcareList" :key="item.hospitalProviderNumber || item.name || item.gp" class="school-item">
                    <div class="school-name">{{ item.isP ? item.gp : item.name }}</div>
                    <div class="school-type">{{ item.isP ? 'Practitioner' : item.type }}</div>
                    <div v-if="!item.isP && item.beds && Number(item.beds) > 0" class="school-beds">Beds: {{ item.beds }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Recreation Facilities Overview Section -->
      <section id="community-conditions-detail" class="education-detail">
        <div class="container">
          <div class="detail-header">
            <h2>Recreation Facilities Overview</h2>
            <p>Comprehensive analysis of recreation facilities conditions and sports infrastructure distribution in {{ selectedSuburb }}</p>
          </div>
          
          <div class="community-conditions-content">
            <!-- No data message -->
            <div v-if="communityCenters.length === 0" class="no-data-message">
              <div class="no-data-icon">&#x1F3E2;</div>
              <p>No community centers found in {{ selectedSuburb }}</p>
            </div>
            
            <!-- Community Centers Condition Assessment -->
            <div v-else class="conditions-assessment">
              <div class="assessment-header">
                <div class="header-left">
                  <h3>Facility Name</h3>
                </div>
                <div class="header-right">
                  <div class="rating-header-content">
                    <h3>Condition Rating</h3>
                  </div>
                  <!-- Simple scale line with markers -->
                  <div class="simple-scale">
                    <div class="scale-line-simple"></div>
                    <div class="scale-markers-simple">
                      <div class="marker-simple" style="left: 0%;">
                        <div class="marker-number">1</div>
                        <div class="marker-tick"></div>
                      </div>
                      <div class="marker-simple" style="left: 25%;">
                        <div class="marker-number">2</div>
                        <div class="marker-tick"></div>
                      </div>
                      <div class="marker-simple" style="left: 50%;">
                        <div class="marker-number">3</div>
                        <div class="marker-tick"></div>
                      </div>
                      <div class="marker-simple" style="left: 75%;">
                        <div class="marker-number">4</div>
                        <div class="marker-tick"></div>
                      </div>
                      <div class="marker-simple" style="left: 100%;">
                        <div class="marker-number">5</div>
                        <div class="marker-tick"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Facility Rows with Scroll -->
              <div class="assessment-rows scrollable-facility-container">
                <div 
                  v-for="(center, index) in communityCenters" 
                  :key="index"
                  class="assessment-row"
                >
                  <div class="name-column">
                    <div class="facility-modern-card">
                      <div class="facility-avatar">
                        <div class="avatar-bg"></div>
                        <span class="avatar-text">{{ (center.name || 'UC').substring(0, 2).toUpperCase() }}</span>
                      </div>
                      <div class="facility-details">
                        <h4 class="facility-title">{{ center.name || 'Unnamed Community Center' }}</h4>
                        <div class="facility-meta" v-if="center.sportsPlayed">
                          <span class="meta-chip">{{ center.sportsPlayed }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="score-modern">
                      <div class="score-ring">
                        <svg class="score-svg" viewBox="0 0 36 36">
                          <path class="score-bg" 
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none" stroke="#e2e8f0" stroke-width="2"/>
                          <path class="score-progress" 
                                :stroke-dasharray="`${getConditionPercentage(center.conditionOfFacility)}, 100`"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
                        </svg>
                        <div class="score-text">
                          <span class="score-value">{{ getConditionRating(center.conditionOfFacility) }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="rating-column">
                    <div class="modern-progress-container">
                      <!-- Enhanced progress bar aligned with scale -->
                      <div class="progress-bar-enhanced">
                        <!-- Background track with subtle segments -->
                        <div class="progress-track-background">
                          <div class="track-segment segment-poor"></div>
                          <div class="track-segment segment-fair"></div>
                          <div class="track-segment segment-average"></div>
                          <div class="track-segment segment-good"></div>
                          <div class="track-segment segment-excellent"></div>
                        </div>
                        
                        <!-- Main progress fill -->
                        <div 
                          class="progress-fill-enhanced" 
                          :style="{ 
                            width: `${getConditionPercentage(center.conditionOfFacility)}%`,
                            animationDelay: `${index * 0.2}s`
                          }"
                          :class="getConditionClass(center.conditionOfFacility)"
                        >
                          <!-- Animated shine effect -->
                          <div class="progress-shine"></div>
                          <!-- Gradient overlay -->
                          <div class="progress-overlay"></div>
                        </div>
                        
                        <!-- Interactive indicator dot with emoji -->
                        <div 
                          class="progress-indicator-enhanced"
                          :style="{ left: `${getConditionPercentage(center.conditionOfFacility)}%` }"
                          :class="getConditionClass(center.conditionOfFacility)"
                        >
                          <div class="indicator-ring"></div>
                          <div class="indicator-emoji">
                            <!-- Emoji based on rating -->
                            <div class="emoji-face" :class="getEmojiClass(center.conditionOfFacility)">
                              <div class="emoji-eyes">
                                <div class="eye left-eye"></div>
                                <div class="eye right-eye"></div>
                              </div>
                              <div class="emoji-mouth"></div>
                            </div>
                          </div>
                          
                          <!-- Tooltip on hover -->
                          <div class="progress-tooltip">
                            <div class="tooltip-content">
                              <div class="tooltip-title">{{ center.name }}</div>
                              <div class="tooltip-rating" :class="getConditionClass(center.conditionOfFacility)">
                                {{ getConditionText(center.conditionOfFacility) }}
                              </div>
                              <div class="tooltip-score">{{ getConditionRating(center.conditionOfFacility) }}/5</div>
                            </div>
                            <div class="tooltip-arrow"></div>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Sports & Recreation Facilities -->
            <div v-if="sportsStats.length > 0" class="sports-chart-redesign sports-chart-expanded">
              <div class="chart-title-bar">
                <div class="title-section">
                  <div class="title-icon sports-title-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      <path d="M8.5 8.5L12 12l3.5-3.5M15.5 15.5L12 12l-3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                  </div>
                  <div class="title-content">
                    <h3 class="main-title">Sports Facilities</h3>
                    <p class="title-subtitle">Discover local sports venues and activities</p>
                  </div>
                </div>
                <div class="chart-legend">
                  <div class="legend-item">
                    <div class="legend-box"></div>
                    <span class="legend-text">Count</span>
                  </div>
                </div>
              </div>

              <!-- Expanded layout: Better mosaic grid with dynamic sizing -->
              <div class="sports-mosaic sports-mosaic-expanded" :style="{ minHeight: dynamicGridHeight }">
                <div 
                  class="mosaic-grid mosaic-grid-expanded mosaic-grid-dynamic"
                  :style="{ 
                    gridTemplateColumns: `repeat(${optimalGridColumns}, 1fr)`,
                    minHeight: dynamicGridHeight
                  }"
                >
                  <div 
                    v-for="(stat, index) in processedSportsStats" 
                    :key="'tile-'+stat.sport"
                    class="mosaic-tile mosaic-tile-enhanced clickable-tile"
                    :style="{ 
                      gridColumn: 'span ' + getImprovedTileSpans(stat.count).cols,
                      gridRow: 'span ' + getImprovedTileSpans(stat.count).rows,
                      backgroundColor: getSportsColor(index) + '15',
                      borderColor: getSportsColor(index),
                      '--tile-color': getSportsColor(index)
                    }"
                    @click="handleSportsTileClick($event, stat)"
                  >
                    <div class="tile-content">
                      <span class="tile-text">{{ formatSportName(stat.sport) }}</span>
                      <span class="tile-count">{{ stat.count }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <!-- Sports Tooltip -->
      <div v-if="sportsTooltip.visible" class="sports-tooltip" 
           :style="{ left: sportsTooltip.x + 'px', top: sportsTooltip.y + 'px' }"
           @click="hideSportsTooltip">
        <div class="tooltip-content">
          {{ sportsTooltip.content }}
        </div>
      </div>

      <!-- Hospitality Development Detail Section -->
      <section id="hospitality-detail" class="education-detail">
        <div class="container">
          <div class="detail-header">
            <h2>Hospitality Development</h2>
            <p>Restaurant and bar evolution timeline in {{ selectedSuburb }}</p>
          </div>
          
          <!-- Timeline -->
          <div class="timeline-container">
            <!-- No data message -->
            <div v-if="filteredGrowthData.length === 0" style="text-align: center; padding: 2rem; color: #666;">
              <p>No hospitality development data available for {{ selectedSuburb }}</p>
            </div>
            
            <!-- Timeline with data -->
            <div v-else class="hospitality-timeline">
              <!-- Timeline Line -->
              <div class="timeline-line"></div>
              
              <!-- Timeline Stages -->
              <div class="timeline-stages">
                <div 
                  v-for="(stage, index) in filteredGrowthData" 
                  :key="stage.year"
                  class="timeline-stage"
                >
                  <!-- Year Circle -->
                  <div class="stage-circle" :class="`stage-circle-${index + 1}`">
                    <span class="stage-year">{{ stage.year }}</span>
                  </div>
                  
                  <!-- Stage Info -->
                  <div class="stage-info">
                    <div class="stage-label">Stage {{ stage.stage }}</div>
                    <div class="stage-icon" :class="`stage-icon-${stage.stage}`">
                      <!-- Stage 1: Seed -->
                      <svg v-if="stage.stage === 1" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="16" r="2" fill="currentColor"/>
                        <path d="M12 14C12 12 10 10 8 10C6 10 4 12 4 14" stroke="currentColor" stroke-width="1.5" fill="none"/>
                      </svg>
                      <!-- Stage 2: Sprout -->
                      <svg v-else-if="stage.stage === 2" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 20V12" stroke="currentColor" stroke-width="2"/>
                        <path d="M12 12C12 10 10 8 8 8C6 8 4 10 4 12" stroke="currentColor" stroke-width="1.5" fill="none"/>
                        <path d="M12 12C12 10 14 8 16 8C18 8 20 10 20 12" stroke="currentColor" stroke-width="1.5" fill="none"/>
                        <circle cx="12" cy="20" r="1.5" fill="currentColor"/>
                      </svg>
                      <!-- Stage 3: Small Tree -->
                      <svg v-else-if="stage.stage === 3" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 20V10" stroke="currentColor" stroke-width="2"/>
                        <circle cx="12" cy="8" r="4" fill="currentColor" opacity="0.3"/>
                        <circle cx="12" cy="8" r="2.5" fill="currentColor"/>
                        <rect x="11" y="19" width="2" height="3" fill="currentColor"/>
                      </svg>
                      <!-- Stage 4: Growing Tree -->
                      <svg v-else-if="stage.stage === 4" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 20V8" stroke="currentColor" stroke-width="2"/>
                        <circle cx="12" cy="6" r="5" fill="currentColor" opacity="0.3"/>
                        <circle cx="12" cy="6" r="3" fill="currentColor"/>
                        <circle cx="8" cy="10" r="2" fill="currentColor" opacity="0.4"/>
                        <circle cx="16" cy="10" r="2" fill="currentColor" opacity="0.4"/>
                        <rect x="11" y="19" width="2" height="3" fill="currentColor"/>
                      </svg>
                      <!-- Stage 5: Mature Tree -->
                      <svg v-else-if="stage.stage === 5" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 20V6" stroke="currentColor" stroke-width="2.5"/>
                        <circle cx="12" cy="5" r="6" fill="currentColor" opacity="0.3"/>
                        <circle cx="12" cy="5" r="4" fill="currentColor"/>
                        <circle cx="7" cy="8" r="2.5" fill="currentColor" opacity="0.4"/>
                        <circle cx="17" cy="8" r="2.5" fill="currentColor" opacity="0.4"/>
                        <circle cx="6" cy="12" r="1.5" fill="currentColor" opacity="0.4"/>
                        <circle cx="18" cy="12" r="1.5" fill="currentColor" opacity="0.4"/>
                        <rect x="10.5" y="19" width="3" height="3" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                  
                  <!-- Arrow (except for last stage) -->
                  <div v-if="index < filteredGrowthData.length - 1" class="stage-arrow">
                    <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                      <path d="M0 10H35M30 5L35 10L30 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <!-- Stage Details Cards in One Row -->
              <div class="stage-details-row">
                <div 
                  v-for="(stage, index) in filteredGrowthData" 
                  :key="`detail-${stage.year}`"
                  class="stage-detail-card"
                >
                  <div class="stage-detail-header">
                    <div class="stage-detail-icon" :class="`card-icon-${index + 1}`">
                      <!-- Card 1: City Building Icon -->
                      <svg v-if="index === 0" width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path d="M3 21H21V19H3V21ZM5 19H7V12H5V19ZM9 19H11V9H9V19ZM13 19H15V16H13V19ZM17 19H19V6H17V19Z" fill="currentColor"/>
                      </svg>
                      <!-- Card 2: Growth Chart Icon -->
                      <svg v-else-if="index === 1" width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path d="M3 17L9 11L13 15L21 7V21H3V17Z" fill="currentColor" opacity="0.3"/>
                        <path d="M3 17L9 11L13 15L21 7" stroke="currentColor" stroke-width="2" fill="none"/>
                        <circle cx="9" cy="11" r="2" fill="currentColor"/>
                        <circle cx="13" cy="15" r="2" fill="currentColor"/>
                        <circle cx="21" cy="7" r="2" fill="currentColor"/>
                      </svg>
                      <!-- Card 3: Peak Mountain Icon -->
                      <svg v-else-if="index === 2" width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path d="M5 16L8 10L12 14L16 8L19 12V21H5V16Z" fill="currentColor" opacity="0.3"/>
                        <path d="M5 16L8 10L12 14L16 8L19 12" stroke="currentColor" stroke-width="2" fill="none"/>
                        <circle cx="16" cy="8" r="1.5" fill="currentColor"/>
                      </svg>
                      <!-- Card 4: Network/Diversity Icon -->
                      <svg v-else-if="index === 3" width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="3" fill="currentColor"/>
                        <circle cx="6" cy="6" r="2" fill="currentColor" opacity="0.6"/>
                        <circle cx="18" cy="6" r="2" fill="currentColor" opacity="0.6"/>
                        <circle cx="6" cy="18" r="2" fill="currentColor" opacity="0.6"/>
                        <circle cx="18" cy="18" r="2" fill="currentColor" opacity="0.6"/>
                        <path d="M12 9L8 7M12 9L16 7M12 15L8 17M12 15L16 17" stroke="currentColor" stroke-width="1.5"/>
                      </svg>
                      <!-- Card 5: Nightlife/Entertainment Icon -->
                      <svg v-else-if="index === 4" width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
                        <circle cx="8" cy="4" r="1" fill="currentColor" opacity="0.7"/>
                        <circle cx="16" cy="4" r="1" fill="currentColor" opacity="0.7"/>
                        <circle cx="4" cy="12" r="1" fill="currentColor" opacity="0.7"/>
                        <circle cx="20" cy="12" r="1" fill="currentColor" opacity="0.7"/>
                      </svg>
                    </div>
                    <div class="stage-detail-info">
                      <h3>{{ stage.year }}</h3>
                      <span class="stage-number">Stage {{ stage.stage }}</span>
                    </div>
                  </div>
                  
                  <div class="stage-detail-content">
                    <h4>{{ stage.option }}</h4>
                    <p>{{ stage.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>

    <!-- Back to Top Button -->
    <button class="back-to-top" @click="scrollToTop" :class="{ 'visible': showBackToTop }">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M7 14L12 9L17 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>

<script>
import { socialApi, schoolApi, childCareApi, apiUtils, healthApi, hospitalityApi, recreationApi } from '../../services/api.js'
import Header from '../header/Header.vue';
import SocialMap from './SocialMap.vue'

export default {
  name: 'SocialPage',
  components: {
    SocialMap,
    Header
  },
  data() {
    return {
      facilityStats: null,
      facilities: [],
      schools: [],
      childCares: [],
      hospitals: [],
      practitioners: [],
      healthSummary: null,
      bedsStat: null,
      schoolStats: {
        totalSchools: 0,
        totalChildcare: 0,
        schoolTypes: {}
      },
      hospitalityStats: {
        totalCafes: 0,
        totalBars: 0,
        totalVenues: 0
      },
      cafes: [],
      bars: [],
      playgrounds: [],
      communityCenters: [],
      sportsStats: [],
      growthData: [],
      loading: false,
      error: null,
      // Sports tile tooltip
      sportsTooltip: {
        visible: false,
        x: 0,
        y: 0,
        content: ''
      },
      selectedSchool: null,
      sortSchoolsAlphabetically: false,
      showBackToTop: false,
      mapLegendState: {
        schools: true,
        hospitals: true,
        playgrounds: true,
        communityCenter: true,
        cafes: true, // Re-enabled with 150 unique locations limit
        bars: true,
        childcare: true,
        practitioners: true
      },
      healthcareFilter: 'all', // 'all', 'public', 'private', 'practitioner'
      schoolFilter: 'all', // 'all', 'primary', 'secondary', 'special', 'childcare'
      maxGauge: 8,
      showAllChips: false,
      chipDisplayLimit: 12
    }
  },
  computed: {
    selectedSuburb() {
      return this.$route?.query?.suburb || ''
    },
    
    playgroundCount() {
      return this.playgrounds?.length || 0
    },
    
    communityCenterCount() {
      return this.communityCenters?.length || 0
    },
    
    sortedSchools() {
      if (!this.schools || this.schools.length === 0) return []
      
      if (this.sortSchoolsAlphabetically) {
        return [...this.schools].sort((a, b) => a.schoolName.localeCompare(b.schoolName))
      }
      return this.schools
    },
    healthBubble() {
      return {
        hospitals: this.hospitals?.length || 0,
        practitioners: this.practitioners?.length || 0,
      }
    },
    bedsValue() {
      const v = Number(this.bedsStat?.Beds_per_1000 || 0)
      return isNaN(v) ? 0 : Math.max(0, v)
    },
    filteredHealthcareList() {
      if (this.healthcareFilter === 'all') {
        return [...this.hospitals, ...this.practitioners.map(p => ({ ...p, isP: true }))]
      } else if (this.healthcareFilter === 'public') {
        return this.hospitals.filter(h => h.type?.toLowerCase() === 'public')
      } else if (this.healthcareFilter === 'private') {
        return this.hospitals.filter(h => h.type?.toLowerCase() === 'private')
      } else if (this.healthcareFilter === 'practitioner') {
        return this.practitioners.map(p => ({ ...p, isP: true }))
      }
      return []
    },
    filteredSchoolList() {
      // Combine schools and childcares
      const allEducationFacilities = [
        ...this.schools,
        ...this.childCares.map(c => ({ ...c, isChildcare: true, schoolType: 'childcare' }))
      ]
      
      if (this.schoolFilter === 'all') {
        return allEducationFacilities
      } else if (this.schoolFilter === 'childcare') {
        return this.childCares.map(c => ({ ...c, isChildcare: true, schoolType: 'childcare' }))
      } else if (this.schoolFilter === 'pri/sec') {
        return this.schools.filter(s => s.schoolType?.toLowerCase() === 'pri/sec')
      } else {
        return this.schools.filter(s => s.schoolType?.toLowerCase() === this.schoolFilter.toLowerCase())
      }
    },
    
    filteredGrowthData() {
      if (!this.growthData || this.growthData.length === 0) return []
      
      // Fixed timeline years
      const timelineYears = [2005, 2010, 2015, 2020, 2023]
      
      // Filter data for current suburb first
      const suburbData = this.growthData.filter(item => {
        if (!this.selectedSuburb) return false
        
        const normalizedSuburb = this.selectedSuburb.toLowerCase().trim()
        const itemSuburb = item.suburb.toLowerCase().trim()
        
        // Handle Melbourne CBD mapping
        if (itemSuburb === 'melbourne cbd' && normalizedSuburb === 'melbourne') {
          return true
        }
        
        // Filter out Port Melbourne
        if (itemSuburb === 'port melbourne') {
          return false
        }
        
        return itemSuburb === normalizedSuburb
      })
      
      // Create timeline data by mapping fixed years to database records
      return timelineYears.map((year, index) => {
        // Find the record for this year
        const yearData = suburbData.find(item => item.year === year)
        
        return {
          year: year,
          stage: index + 1,
          option: yearData ? yearData.option : 'No data available',
          description: yearData ? yearData.description : `No development data available for ${year}`
        }
      })
    },

    // Sports statistics computed properties
    processedSportsStats() {
      if (!this.sportsStats || this.sportsStats.length === 0) return []
      
      // Group by sports type and sum counts
      const groupedStats = {}
      this.sportsStats.forEach(stat => {
        const sport = stat.sportsPlayed || stat.SPORTS_PLAYED || 'Unknown'
        const count = parseInt(stat.count || stat.Count || 0)
        
        if (groupedStats[sport]) {
          groupedStats[sport] += count
        } else {
          groupedStats[sport] = count
        }
      })
      
      // Convert to array and sort by count
      return Object.entries(groupedStats)
        .map(([sport, count]) => ({ sport, count }))
        .sort((a, b) => b.count - a.count)
    },

    totalSportsFacilities() {
      return this.processedSportsStats.reduce((total, stat) => total + stat.count, 0)
    },

    uniqueSportsTypes() {
      return this.processedSportsStats.length
    },

    mostPopularSport() {
      if (this.processedSportsStats.length === 0) return 'N/A'
      return this.formatSportName(this.processedSportsStats[0].sport)
    },

    maxSportsCount() {
      if (this.processedSportsStats.length === 0) return 10
      return Math.max(...this.processedSportsStats.map(stat => stat.count))
    },

    // Calculate optimal grid columns based on content
    optimalGridColumns() {
      if (!this.processedSportsStats || this.processedSportsStats.length === 0) return 12
      
      const itemCount = this.processedSportsStats.length
      
      // Calculate the maximum width needed by any single tile
      const maxTileWidth = Math.max(...this.processedSportsStats.map(stat => 
        this.getImprovedTileSpans(stat.count).cols
      ))
      
      // Base columns calculation on item count and max tile width (for horizontal tiles)
      let baseColumns = 16
      if (itemCount <= 2) baseColumns = Math.max(maxTileWidth * 1.5, 12)
      else if (itemCount <= 4) baseColumns = Math.max(maxTileWidth * 2, 16)
      else if (itemCount <= 8) baseColumns = Math.max(maxTileWidth * 2.5, 20)
      else if (itemCount <= 12) baseColumns = Math.max(maxTileWidth * 3, 24)
      else baseColumns = Math.max(maxTileWidth * 3.5, 28)
      
      // Ensure we don't exceed reasonable limits
      return Math.min(baseColumns, 32)
    },

    // Calculate dynamic grid height based on content
    dynamicGridHeight() {
      if (!this.processedSportsStats || this.processedSportsStats.length === 0) return '200px'
      
      const gridCols = this.optimalGridColumns
      const rowHeight = 60 // base row height
      const gap = 14 // gap between tiles
      const padding = 48 // top and bottom padding (1.5rem * 2)
      
      // Calculate total area needed for all tiles
      let totalArea = 0
      let maxRowsNeeded = 0
      
      this.processedSportsStats.forEach(stat => {
        const spans = this.getImprovedTileSpans(stat.count)
        totalArea += spans.cols * spans.rows
        maxRowsNeeded = Math.max(maxRowsNeeded, spans.rows)
      })
      
      // Estimate rows needed based on grid layout
      const estimatedRows = Math.ceil(totalArea / gridCols)
      const actualRowsNeeded = Math.max(estimatedRows, maxRowsNeeded)
      
      // Calculate height: rows * rowHeight + gaps + padding
      const calculatedHeight = (actualRowsNeeded * rowHeight) + ((actualRowsNeeded - 1) * gap) + padding
      
      // Add some buffer but keep it reasonable
      return Math.min(Math.max(calculatedHeight, 180), 500) + 'px'
    },

    getYAxisTicks() {
      const max = this.maxSportsCount
      const tickCount = 5
      const step = Math.ceil(max / tickCount)
      const ticks = []
      
      for (let i = 0; i <= tickCount; i++) {
        ticks.push(i * step)
      }
      
      return ticks.reverse()
    },
    // Mosaic tile spans based on count distribution
    maxTileCount() {
      return this.maxSportsCount
    }
  },
  watch: {
    selectedSuburb: {
      immediate: true,
      handler(newSuburb) {
        if (newSuburb) {
          this.loadSuburbData(newSuburb)
        }
      }
    }
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.addEventListener('scroll', this.handleScroll);
    document.addEventListener('click', this.handleDocumentClick);
  },
  
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('click', this.handleDocumentClick);
  },
  methods: {
    scrollToHealthDetail() {
      const el = document.getElementById('health-detail')
      if (el) {
        // Scroll with offset to avoid covering the title
        const yOffset = -80; // Adjust this value as needed
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    },
    
    scrollToHospitalityDetail() {
      const el = document.getElementById('hospitality-detail')
      if (el) {
        // Scroll with offset to avoid covering the title
        const yOffset = -80; // Adjust this value as needed
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    },

    scrollToCommunityConditionsDetail() {
      const el = document.getElementById('community-conditions-detail')
      if (el) {
        // Scroll with offset to avoid covering the title
        const yOffset = -80; // Adjust this value as needed
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    },

    scrollToSportsStatsDetail() {
      const el = document.getElementById('community-conditions-detail')
      if (el) {
        // Scroll with offset to avoid covering the title
        const yOffset = -80; // Adjust this value as needed
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    },

    getConditionRating(condition) {
      // Convert condition text to numerical rating (1-5)
      if (!condition) return 0;
      
      const conditionUpper = condition.toString().toUpperCase();
      
      // Map exact database values to ratings (based on backend model)
      const conditionMap = {
        '1. VERY POOR': 1,
        '2. POOR': 2,
        '3. AVERAGE': 3,
        '4. GOOD': 4,
        '5. VERY GOOD': 5
      };
      
      // Check for exact matches first
      if (conditionMap[conditionUpper]) {
        return conditionMap[conditionUpper];
      }
      
      // Check for partial matches (fallback)
      if (conditionUpper.includes('VERY POOR')) return 1;
      if (conditionUpper.includes('POOR')) return 2;
      if (conditionUpper.includes('AVERAGE')) return 3;
      if (conditionUpper.includes('VERY GOOD')) return 5;
      if (conditionUpper.includes('GOOD')) return 4;
      
      // Try to parse as number if it's numeric
      const numericValue = parseFloat(condition);
      if (!isNaN(numericValue)) {
        return Math.max(1, Math.min(5, numericValue));
      }
      
      console.log('Unknown condition format:', condition);
      return 0; // Return 0 for unknown conditions
    },

    getConditionPercentage(condition) {
      // Convert rating to percentage for progress bar (1-5 scale)
      const rating = this.getConditionRating(condition);
      if (rating === 0) return 0; // No data
      return ((rating - 1) / 4) * 100; // Map 1-5 to 0-100%
    },

    getConditionClass(condition) {
      // Return CSS class based on condition rating
      const rating = this.getConditionRating(condition);
      
      if (rating <= 2) return 'condition-poor';
      if (rating <= 3) return 'condition-average';
      if (rating <= 4) return 'condition-good';
      return 'condition-excellent';
    },

    getEmojiClass(condition) {
      // Return emoji class based on condition rating (5 different states)
      // LOW SCORES = SAD, HIGH SCORES = HAPPY
      const rating = this.getConditionRating(condition);
      
      if (rating <= 1) return 'emoji-very-happy';       
      if (rating <= 2) return 'emoji-happy';           
      if (rating <= 3) return 'emoji-neutral';        
      if (rating <= 4) return 'emoji-sad';          
      return 'emoji-very-sad';                       
    },

    getConditionText(condition) {
      // Return descriptive text for the condition
      if (!condition || condition === null || condition === undefined) {
        return 'No Data';
      }
      
      const conditionUpper = condition.toString().toUpperCase();
      
      // Map exact database values to readable text
      const conditionTextMap = {
        '1. VERY POOR': 'Very Poor',
        '2. POOR': 'Poor',
        '3. AVERAGE': 'Average',
        '4. GOOD': 'Good',
        '5. VERY GOOD': 'Very Good'
      };
      
      // Return mapped text if found
      if (conditionTextMap[conditionUpper]) {
        return conditionTextMap[conditionUpper];
      }
      
      // Fallback: return the original condition text
      return condition;
    },
    getNeedleAngle(value) {
      // Map 0 -> -90deg (left), 3.2 -> ~0deg, 3.8 -> ~20deg, 8 -> +90deg (right limit)
      const v = Math.max(0, Math.min(8, Number(value || 0)))
      // linear map [0,8] -> [-90,90]
      return -90 + (v / 8) * 180
    },
    getNeedleAngleFixed(value) {
      // Semicircle 180deg, divided into three 60deg zones
      // 0-3.2: -90deg to -30deg
      // 3.2-3.8: -30deg to +30deg  
      // 3.8+: +30deg to +90deg
      const v = Number(value || 0)
      if (v <= 3.2) {
        return -90 + (v / 3.2) * 60
      } else if (v <= 3.8) {
        return -30 + ((v - 3.2) / 0.6) * 60
      } else {
        const maxVal = Math.min(v, 6)
        return 30 + ((maxVal - 3.8) / (6 - 3.8)) * 60
      }
    },
    getCorrectNeedleAngle(value) {
      // Upper semicircle mapping:
      // Value range: 0 to 5 (max)
      // Angle range: 180° (left) to -90° (top) to 0° (right)
      // This is a 180° span going counter-clockwise from left to right via top
      
      const v = Number(value || 0)
      const maxValue = 5.0
      const clampedValue = Math.max(0, Math.min(maxValue, v))
      
      // Map value to position in semicircle (0 to 1)
      const position = clampedValue / maxValue
      
      // Upper semicircle goes from 180° to 0° via -90°
      // Linear interpolation: 180° + position * (0° - 180°) = 180° - position * 180°
      // But we need to handle the -90° (top) correctly
      // Actually, let's map: 180° to -90° to 0° which is 180° to 270° to 360° (or 0°)
      
      let targetAngle
      if (position <= 0.5) {
        // First half: 180° to -90° (or 270°)
        // Map [0, 0.5] to [180°, 270°]
        targetAngle = 180 + (position * 2) * 90  // 180° to 270°
      } else {
        // Second half: -90° (270°) to 0°
        // Map [0.5, 1] to [270°, 360°] 
        targetAngle = 270 + ((position - 0.5) * 2) * 90  // 270° to 360°
      }
      
      // Convert 360° to 0° for SVG
      if (targetAngle >= 360) targetAngle -= 360
      
      // Convert angles > 180° to negative equivalents for SVG
      if (targetAngle > 180) targetAngle = targetAngle - 360
      
      return targetAngle
    },
    getCurrentZone(value) {
      const v = Number(value || 0)
      if (v <= 3.2) {
        return 'low'
      } else if (v <= 3.8) {
        return 'medium'
      } else {
        return 'high'
      }
    },
    getNeedleColors(zone) {
      const colors = {
        low: {
          needle: ['#ef4444', '#dc2626', '#991b1b'],
          border: ['#7f1d1d', '#450a0a'],
          highlight: ['#fecaca', '#fca5a5'],
          center: ['#ef4444', '#dc2626', '#991b1b']
        },
        medium: {
          needle: ['#f59e0b', '#d97706', '#92400e'],
          border: ['#78350f', '#451a03'],
          highlight: ['#fed7aa', '#fdba74'],
          center: ['#fbbf24', '#f59e0b', '#d97706']
        },
        high: {
          needle: ['#22c55e', '#16a34a', '#15803d'],
          border: ['#166534', '#14532d'],
          highlight: ['#bbf7d0', '#86efac'],
          center: ['#4ade80', '#22c55e', '#16a34a']
        }
      }
      return colors[zone] || colors.medium
    },
    // SVG helpers for gauge
    gaugeArcPath(start, end, radius = 80) {
      // map value to angle on semicircle (-90deg to 90deg)
      const a1 = (-90 + (start / this.maxGauge) * 180) * Math.PI / 180
      const a2 = (-90 + (end / this.maxGauge) * 180) * Math.PI / 180
      const cx = 130, cy = 120, r = radius
      const x1 = cx + r * Math.cos(a1)
      const y1 = cy + r * Math.sin(a1)
      const x2 = cx + r * Math.cos(a2)
      const y2 = cy + r * Math.sin(a2)
      return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`
    },

    gaugeLabelPos(value, radius = 88) {
      const angle = (-90 + (value / this.maxGauge) * 180) * Math.PI / 180
      const cx = 130, cy = 120, r = radius
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) - 6 }
    },
    getNeedleY(value) {
      const angle = (Math.PI / 180) * this.getNeedleAngle(value)
      return 100 + 60 * Math.sin(angle)
    },
    async loadSuburbData(suburb) {
      if (!suburb) return
      
      this.loading = true
      this.error = null
      
      try {
        // Load all social data in parallel
        const [statsResponse, facilitiesResponse, schoolsResponse, childCareResponse, educationStatsResponse, hospitalsResp, practitionersResp, bedsResp, hospitalityStatsResp, cafesResp, barsResp, growthDataResp, playgroundsResp, communityCentersResp, sportsStatsResp] = await Promise.allSettled([
          socialApi.getFacilityStats(suburb),
          socialApi.getFacilities(suburb),
          schoolApi.getSchoolsBySuburb(suburb),
          childCareApi.getChildCareBySuburb(suburb),
          schoolApi.getEducationStatsBySuburb(suburb),
          healthApi.getHospitals(suburb),
          healthApi.getPractitioners(suburb),
          healthApi.getBedsPerThousand(suburb),
          hospitalityApi.getHospitalityStats(suburb),
          hospitalityApi.getCafesBySuburb(suburb),
          hospitalityApi.getBarsBySuburb(suburb),
          hospitalityApi.getAllGrowthData(),
          recreationApi.getPlaygroundsBySuburb(suburb),
          recreationApi.getCommunityCentersBySuburb(suburb),
          recreationApi.getCommunityCenterStatsBySuburb(suburb)
        ])

        // Handle facility stats
        if (statsResponse.status === 'fulfilled') {
          const statsResult = apiUtils.extractData(statsResponse.value)
          if (statsResult.success) {
            this.facilityStats = apiUtils.formatFacilityStats(statsResult.data)
          } else {
            this.facilityStats = apiUtils.getDefaultFacilityStats()
          }
        } else {
          this.facilityStats = apiUtils.getDefaultFacilityStats()
        }

        // Handle facilities
        if (facilitiesResponse.status === 'fulfilled') {
          const facilitiesResult = apiUtils.extractData(facilitiesResponse.value)
          if (facilitiesResult.success) {
            this.facilities = facilitiesResult.data || []
          }
        }


        // Handle schools
        if (schoolsResponse.status === 'fulfilled') {
          const schoolsResult = apiUtils.extractData(schoolsResponse.value)
          if (schoolsResult.success) {
            this.schools = schoolsResult.data || []
          }
        }

        // Handle childcare
        if (childCareResponse.status === 'fulfilled') {
          const childCareResult = apiUtils.extractData(childCareResponse.value)
          if (childCareResult.success) {
            this.childCares = childCareResult.data || []
          }
        }

        // Handle education statistics
        if (educationStatsResponse.status === 'fulfilled') {
          const educationStatsResult = apiUtils.extractData(educationStatsResponse.value)
          if (educationStatsResult.success) {
            this.schoolStats = educationStatsResult.data || {
              totalSchools: 0,
              totalChildcare: 0,
              schoolTypes: {}
            }
          }
        } else {
          this.calculateSchoolStats() // Fallback to manual calculation
        }

        // Handle hospitals
        if (hospitalsResp.status === 'fulfilled') {
          const r = apiUtils.extractData(hospitalsResp.value)
          if (r.success) {
            // 0 beds should be hidden already by backend; double-check here
            this.hospitals = (r.data || []).filter(h => !h.Beds || Number(h.Beds) > 0)
          }
        }

        // Handle practitioners
        if (practitionersResp.status === 'fulfilled') {
          const r = apiUtils.extractData(practitionersResp.value)
          if (r.success) this.practitioners = r.data || []
        }

        // Handle beds per 1000
        if (bedsResp.status === 'fulfilled') {
          const r = apiUtils.extractData(bedsResp.value)
          if (r.success) this.bedsStat = r.data || null
        }

        // Handle hospitality statistics
        if (hospitalityStatsResp.status === 'fulfilled') {
          const r = apiUtils.extractData(hospitalityStatsResp.value)
          if (r.success) {
            this.hospitalityStats = {
              totalCafes: r.data.totalCafes || 0,
              totalBars: r.data.totalBars || 0,
              totalVenues: r.data.totalVenues || 0
            }
          }
        }

        // Handle cafes (re-enabled with 150 unique locations limit)
        if (cafesResp.status === 'fulfilled') {
          const r = apiUtils.extractData(cafesResp.value)
          if (r.success) this.cafes = r.data || []
        }

        // Handle bars (limited to 150 unique locations)
        if (barsResp.status === 'fulfilled') {
          const r = apiUtils.extractData(barsResp.value)
          if (r.success) this.bars = r.data || []
        }

        // Handle growth data
        if (growthDataResp.status === 'fulfilled') {
          const r = apiUtils.extractData(growthDataResp.value)
          if (r.success) {
            this.growthData = r.data || []
            console.log('Growth data loaded:', this.growthData.length, 'records for', suburb)
            if (this.growthData.length > 0) {
              console.log('Available years:', this.growthData.map(d => d.year).sort())
              console.log('Growth data by year:', this.growthData.reduce((acc, item) => {
                acc[item.year] = { option: item.option, description: item.description.substring(0, 50) + '...' }
                return acc
              }, {}))
            }
          } else {
            console.error('Failed to load growth data:', r.message)
          }
        } else {
          console.error('Growth data API call failed:', growthDataResp.reason)
          console.error('Growth data response status:', growthDataResp.status)
          if (growthDataResp.reason && growthDataResp.reason.response) {
            console.error('API Error details:', growthDataResp.reason.response.status, growthDataResp.reason.response.data)
          }
        }

        // Handle playgrounds
        if (playgroundsResp.status === 'fulfilled') {
          const r = apiUtils.extractData(playgroundsResp.value)
          if (r.success) {
            this.playgrounds = r.data || []
            console.log('Playgrounds loaded:', this.playgrounds.length, 'playgrounds for', suburb)
            
            // Parse coordinates for each playground in JavaScript
            this.playgrounds.forEach(playground => {
              this.parsePlaygroundCoordinates(playground)
            })
          } else {
            console.error('Failed to load playgrounds:', r.message)
            this.playgrounds = []
          }
        } else {
          console.error('Playgrounds API call failed:', playgroundsResp.reason)
          this.playgrounds = []
        }

        // Handle community centers
        if (communityCentersResp.status === 'fulfilled') {
          const r = apiUtils.extractData(communityCentersResp.value)
          if (r.success) {
            this.communityCenters = r.data || []
            console.log('Community Centers loaded:', this.communityCenters.length, 'community centers for', suburb)
            // Debug: Log the first few community centers to check data structure
            if (this.communityCenters.length > 0) {
              console.log('Sample community center data:', this.communityCenters[0])
              console.log('conditionOfFacility values:', this.communityCenters.map(c => c.conditionOfFacility))
              console.log('All field names:', Object.keys(this.communityCenters[0]))
            }
          } else {
            console.error('Failed to load community centers:', r.message)
            this.communityCenters = []
          }
        } else {
          console.error('Community Centers API call failed:', communityCentersResp.reason)
          this.communityCenters = []
        }

        // Handle sports statistics
        if (sportsStatsResp.status === 'fulfilled') {
          const r = apiUtils.extractData(sportsStatsResp.value)
          if (r.success) {
            this.sportsStats = r.data || []
            console.log('Sports Statistics loaded:', this.sportsStats.length, 'sports stats for', suburb)
            if (this.sportsStats.length > 0) {
              console.log('Sample sports stats data:', this.sportsStats[0])
              console.log('Available sports types:', this.sportsStats.map(s => s.sportsPlayed || s.SPORTS_PLAYED))
            }
          } else {
            console.error('Failed to load sports statistics:', r.message)
            this.sportsStats = []
          }
        } else {
          console.error('Sports Statistics API call failed:', sportsStatsResp.reason)
          this.sportsStats = []
        }

      } catch (error) {
        console.error('Error loading suburb data:', error)
        this.error = `Failed to load data for ${suburb}`
      } finally {
        this.loading = false
      }
    },

    retryLoading() {
      if (this.selectedSuburb) {
        this.loadSuburbData(this.selectedSuburb)
      } else {
        this.error = null
      }
    },

    parsePlaygroundCoordinates(playground) {
      // Parse geoPoint2D for center coordinates
      if (playground.geoPoint2D && typeof playground.geoPoint2D === 'string') {
        const coords = playground.geoPoint2D.split(',').map(coord => parseFloat(coord.trim()))
        if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
          playground.latitude = coords[0]
          playground.longitude = coords[1]
        }
      }

      // Parse geoShape for polygon coordinates
      playground.shapeCoordinates = []
      if (playground.geoShape && typeof playground.geoShape === 'string') {
        try {
          // Parse the JSON string
          const geoShapeObj = JSON.parse(playground.geoShape)
          
          if (geoShapeObj.COORDINATES && Array.isArray(geoShapeObj.COORDINATES)) {
            // Handle MULTIPOLYGON format: [[[[lng, lat], [lng, lat], ...]]]
            const coordinates = geoShapeObj.COORDINATES
            
            if (coordinates.length > 0 && Array.isArray(coordinates[0])) {
              // Get the first polygon (coordinates[0])
              const firstPolygon = coordinates[0]
              
              if (firstPolygon.length > 0 && Array.isArray(firstPolygon[0])) {
                // Get the outer ring (firstPolygon[0])
                const outerRing = firstPolygon[0]
                
                // Convert [lng, lat] to {latitude, longitude} objects
                playground.shapeCoordinates = outerRing
                  .filter(coord => Array.isArray(coord) && coord.length >= 2)
                  .map(coord => ({
                    latitude: parseFloat(coord[1]), // lat is second element
                    longitude: parseFloat(coord[0]) // lng is first element
                  }))
                  .filter(coord => !isNaN(coord.latitude) && !isNaN(coord.longitude))

                console.log(`Parsed ${playground.shapeCoordinates.length} coordinates for playground: ${playground.name}`)
              }
            }
          }
        } catch (error) {
          console.error('Error parsing geoShape for playground', playground.name, ':', error)
          playground.shapeCoordinates = []
        }
      }

      // If no shape coordinates but have center point, create a fallback
      if (playground.shapeCoordinates.length === 0 && playground.latitude && playground.longitude) {
        console.log(`No shape coordinates found for playground ${playground.name}, will use center point`)
      }
    },

    calculateSchoolStats() {
      if (!this.schools || this.schools.length === 0) {
        this.schoolStats = {
          totalSchools: 0,
          totalChildcare: 0,
          schoolTypes: {}
        }
        return
      }

      const stats = {
        totalSchools: 0,
        totalChildcare: 0,
        schoolTypes: {}
      }

      this.schools.forEach(school => {
        const type = school.schoolType || 'Unknown'
        
        if (type.toLowerCase().includes('childcare') || type.toLowerCase().includes('kindergarten')) {
          stats.totalChildcare++
        } else {
          stats.totalSchools++
        }

        stats.schoolTypes[type] = (stats.schoolTypes[type] || 0) + 1
      })

      this.schoolStats = stats
    },

    scrollToEducationDetail() {
      const element = document.getElementById('education-detail')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },

    toggleSort() {
      this.sortSchoolsAlphabetically = !this.sortSchoolsAlphabetically
    },

    async onSchoolChange() {
      if (this.selectedSchool && this.selectedSchool.schoolNo) {
        console.log('Selected school:', this.selectedSchool)
        try {
          const response = await schoolApi.getSchoolWithStudentData(this.selectedSchool.schoolNo)
          const result = apiUtils.extractData(response)
          if (result.success) {
            // Update the selected school with student data
            this.selectedSchool = result.data
          }
        } catch (error) {
          console.error('Error loading student data:', error)
        }
      }
    },

    getPrimaryPercentage() {
      if (!this.schoolStats.schoolTypes) return 0
      const primary = Object.keys(this.schoolStats.schoolTypes)
        .filter(type => type.toLowerCase().includes('primary'))
        .reduce((sum, type) => sum + this.schoolStats.schoolTypes[type], 0)
      const total = this.schoolStats.totalSchools + this.schoolStats.totalChildcare
      return total > 0 ? Math.round((primary / total) * 100) : 0
    },

    getSecondaryPercentage() {
      if (!this.schoolStats.schoolTypes) return 0
      const secondary = Object.keys(this.schoolStats.schoolTypes)
        .filter(type => type.toLowerCase().includes('secondary'))
        .reduce((sum, type) => sum + this.schoolStats.schoolTypes[type], 0)
      const total = this.schoolStats.totalSchools + this.schoolStats.totalChildcare
      return total > 0 ? Math.round((secondary / total) * 100) : 0
    },

    getChildcarePercentage() {
      const total = this.schoolStats.totalSchools + this.schoolStats.totalChildcare
      return total > 0 ? Math.round((this.schoolStats.totalChildcare / total) * 100) : 0
    },

    // New: robust type counting for Primary, Secondary, Special, PRI/SEC
    getTypeCounts() {
      const counts = { primary: 0, secondary: 0, special: 0, prisec: 0 }

      const incrementByType = (rawType) => {
        if (!rawType) return
        const t = String(rawType).toLowerCase().trim()
        if (t.includes('pri/sec') || /pri\s*\/\s*sec/i.test(rawType) || /(primary).*?(secondary)|(secondary).*?(primary)/i.test(rawType)) {
          counts.prisec++
          return
        }
        if (t.includes('primary')) { counts.primary++; return }
        if (t.includes('secondary')) { counts.secondary++; return }
        if (t.includes('special')) { counts.special++; return }
      }

      // Prefer aggregated stats when available
      if (this.schoolStats && this.schoolStats.schoolTypes) {
        Object.entries(this.schoolStats.schoolTypes).forEach(([typeName, num]) => {
          const n = Number(num) || 0
          for (let i = 0; i < n; i++) incrementByType(typeName)
        })
      } else if (Array.isArray(this.schools)) {
        this.schools.forEach(s => incrementByType(s?.schoolType))
      }

      return counts
    },

    getPrimaryPct() {
      const c = this.getTypeCounts()
      const total = c.primary + c.secondary + c.special + c.prisec
      return total > 0 ? (c.primary / total) * 100 : 0
    },

    getSecondaryPct() {
      const c = this.getTypeCounts()
      const total = c.primary + c.secondary + c.special + c.prisec
      return total > 0 ? (c.secondary / total) * 100 : 0
    },

    getSpecialPct() {
      const c = this.getTypeCounts()
      const total = c.primary + c.secondary + c.special + c.prisec
      return total > 0 ? (c.special / total) * 100 : 0
    },

    getPriSecPct() {
      const c = this.getTypeCounts()
      const total = c.primary + c.secondary + c.special + c.prisec
      return total > 0 ? (c.prisec / total) * 100 : 0
    },

    // Label positions per segment based on cumulative angles
    getPrimaryLabelPos() {
      const angle = (this.getPrimaryPct() / 100) * Math.PI
      const radius = 65
      return { x: 100 + radius * Math.cos(angle - Math.PI/2), y: 100 + radius * Math.sin(angle - Math.PI/2) }
    },
    getSecondaryLabelPos() {
      const primaryAngle = (this.getPrimaryPct() / 100) * 2 * Math.PI
      const secondaryAngle = primaryAngle + (this.getSecondaryPct() / 100) * Math.PI
      const radius = 65
      return { x: 100 + radius * Math.cos(secondaryAngle - Math.PI/2), y: 100 + radius * Math.sin(secondaryAngle - Math.PI/2) }
    },
    getSpecialLabelPos() {
      const primaryAngle = (this.getPrimaryPct() / 100) * 2 * Math.PI
      const secondaryAngle = (this.getSecondaryPct() / 100) * 2 * Math.PI
      const specialAngle = primaryAngle + secondaryAngle + (this.getSpecialPct() / 100) * Math.PI
      const radius = 65
      return { x: 100 + radius * Math.cos(specialAngle - Math.PI/2), y: 100 + radius * Math.sin(specialAngle - Math.PI/2) }
    },
    getPriSecLabelPos() {
      const primaryAngle = (this.getPrimaryPct() / 100) * 2 * Math.PI
      const secondaryAngle = (this.getSecondaryPct() / 100) * 2 * Math.PI
      const specialAngle = (this.getSpecialPct() / 100) * 2 * Math.PI
      const prisecAngle = primaryAngle + secondaryAngle + specialAngle + (this.getPriSecPct() / 100) * Math.PI
      const radius = 65
      return { x: 100 + radius * Math.cos(prisecAngle - Math.PI/2), y: 100 + radius * Math.sin(prisecAngle - Math.PI/2) }
    },

    getStudentCount(year) {
      if (!this.selectedSchool) return 0
      const yearField = `year${year}`
      return this.selectedSchool[yearField] || 0
    },

    getStudentCountHeight(year) {
      if (!this.selectedSchool) return 15 // Show minimum height when no school selected
      
      // Get student count for the specific year
      const studentCount = this.getStudentCount(year)
      
      // Calculate all year counts to find maximum for scaling
      const allCounts = []
      for (let i = 1; i <= 12; i++) {
        const count = this.selectedSchool[`year${i}`] || 0
        allCounts.push(count)
      }
      
      const maxCount = Math.max(...allCounts, 1) // Avoid division by zero
      
      // Always show at least 15% height for visibility, even with 0 students
      if (studentCount === 0) {
        return 15
      }
      
      return Math.max((studentCount / maxCount) * 100, 20)
    },

    handleScroll() {
      this.showBackToTop = window.scrollY > 300
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    toggleLegendItem(itemKey) {
      this.mapLegendState[itemKey] = !this.mapLegendState[itemKey]
    },

    // Calculate label positions for pie chart percentages
    getPrimaryLabelPosition() {
      const angle = (this.getPrimaryPercentage() / 100) * Math.PI // Half of the segment angle
      const radius = 65 // Position labels closer to the ring
      return {
        x: 100 + radius * Math.cos(angle - Math.PI/2),
        y: 100 + radius * Math.sin(angle - Math.PI/2)
      }
    },

    getSecondaryLabelPosition() {
      const primaryAngle = (this.getPrimaryPercentage() / 100) * 2 * Math.PI
      const secondaryAngle = primaryAngle + (this.getSecondaryPercentage() / 100) * Math.PI
      const radius = 65
      return {
        x: 100 + radius * Math.cos(secondaryAngle - Math.PI/2),
        y: 100 + radius * Math.sin(secondaryAngle - Math.PI/2)
      }
    },

    getChildcareLabelPosition() {
      const primaryAngle = (this.getPrimaryPercentage() / 100) * 2 * Math.PI
      const secondaryAngle = (this.getSecondaryPercentage() / 100) * 2 * Math.PI
      const childcareAngle = primaryAngle + secondaryAngle + (this.getChildcarePercentage() / 100) * Math.PI
      const radius = 65
      return {
        x: 100 + radius * Math.cos(childcareAngle - Math.PI/2),
        y: 100 + radius * Math.sin(childcareAngle - Math.PI/2)
      }
    },

    // Sports statistics methods
    getBarHeight(count) {
      if (this.maxSportsCount === 0) return 0
      return Math.max((count / this.maxSportsCount) * 100, 5) // Minimum 5% height for visibility
    },

    getSportsColor(index) {
      const colors = [
        '#3b82f6', // Blue
        '#ef4444', // Red
        '#10b981', // Green
        '#f59e0b', // Amber
        '#8b5cf6', // Purple
        '#06b6d4', // Cyan
        '#84cc16', // Lime
        '#f97316', // Orange
        '#ec4899', // Pink
        '#6b7280'  // Gray
      ]
      return colors[index % colors.length]
    },

    formatSportName(sport) {
      if (!sport || sport === 'Unknown') return 'Unknown'
      
      // Handle specific sport name formatting
      const sportMappings = {
        'FITNESS / GYMNASIUM WORKOUTS': 'Fitness/Gym',
        'BADMINTON': 'Badminton',
        'BASKETBALL': 'Basketball',
        'GYMNASTICS': 'Gymnastics',
        'HOCKEY': 'Hockey',
        'NETBALL (INDOOR)': 'Netball',
        'SOCCER (INDOOR SOCCER / FUTSAL': 'Soccer/Futsal',
        'SWIMMING': 'Swimming',
        'TEAM NETBALL': 'Team Netball',
        'VOLLEYBALL': 'Volleyball',
        'SAILING': 'Sailing',
        'AUSTRALIAN RULES FOOTBALL': 'AFL',
        'CRICKET': 'Cricket',
        'BMX': 'BMX'
      }
      
      return sportMappings[sport.toUpperCase()] || sport
    },

    getBarPercentage(count) {
      if (this.maxSportsCount === 0) return 10
      return Math.max((count / this.maxSportsCount) * 100, 15) // Minimum 15% for visibility
    },

    getShortSportName(sport) {
      if (!sport || sport === 'Unknown') return '?'
      
      // Create very short abbreviations for display
      const shortMappings = {
        'FITNESS / GYMNASIUM WORKOUTS': 'Gym',
        'BADMINTON': 'Bad',
        'BASKETBALL': 'Bask',
        'GYMNASTICS': 'Gym',
        'HOCKEY': 'Hock',
        'NETBALL (INDOOR)': 'Net',
        'SOCCER (INDOOR SOCCER / FUTSAL': 'Soc',
        'SWIMMING': 'Swim',
        'TEAM NETBALL': 'T.Net',
        'VOLLEYBALL': 'Vol',
        'SAILING': 'Sail',
        'AUSTRALIAN RULES FOOTBALL': 'AFL',
        'CRICKET': 'Cric',
        'BMX': 'BMX',
        'TENNIS (OUTDOOR)': 'Ten',
        'LAWN BOWLS': 'Bowl',
        'RUGBY LEAGUE': 'Rug',
        'RUGBY UNION': 'Rug',
        'MARTIAL ARTS': 'MA',
        'CYCLING': 'Cyc',
        'SQUASH / RACQUETBALL': 'Sq'
      }
      
      return shortMappings[sport.toUpperCase()] || sport.substring(0, 3)
    },

    showTooltip(event, stat, index) {
      const rect = event.currentTarget.getBoundingClientRect()
      this.tooltip = {
        visible: true,
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
        name: this.formatSportName(stat.sport),
        count: stat.count
      }
    },

    // Convert count to grid span; bigger count => larger tile (original method)
    getTileSpans(count) {
      const max = Math.max(this.maxTileCount || 1, 1)
      const ratio = count / max
      // tiers for compact grid (col/row spans 1-3)
      if (ratio >= 0.75) return { cols: 3, rows: 3 }
      if (ratio >= 0.45) return { cols: 3, rows: 2 }
      if (ratio >= 0.25) return { cols: 2, rows: 2 }
      if (ratio >= 0.12) return { cols: 2, rows: 1 }
      return { cols: 1, rows: 1 }
    },

    // Improved tile sizing with better differentiation and larger minimum size
    getImprovedTileSpans(count) {
      if (!this.processedSportsStats || this.processedSportsStats.length === 0) {
        return { cols: 2, rows: 2 }
      }
      
      const max = Math.max(...this.processedSportsStats.map(stat => stat.count))
      const min = Math.min(...this.processedSportsStats.map(stat => stat.count))
      const range = max - min
      
      // If all values are the same, use uniform size
      if (range === 0) {
        return { cols: 4, rows: 2 }
      }
      
      // Calculate relative position (0-1)
      const normalizedValue = (count - min) / range
      
      // Horizontal tiles: width > height for better content display
      if (normalizedValue >= 0.8) return { cols: 7, rows: 2 }      // Largest - very wide
      if (normalizedValue >= 0.6) return { cols: 6, rows: 2 }      // Large - wide
      if (normalizedValue >= 0.4) return { cols: 5, rows: 2 }      // Medium-large - wide
      if (normalizedValue >= 0.25) return { cols: 4, rows: 2 }     // Medium - wide
      if (normalizedValue >= 0.1) return { cols: 4, rows: 1 }      // Small - horizontal
      return { cols: 4, rows: 1 }                                  // Minimum horizontal size ensures content visibility
    },

    // Handle sports tile click - show tooltip
    handleSportsTileClick(event, stat) {
      event.stopPropagation()
      const rect = event.currentTarget.getBoundingClientRect()
      this.sportsTooltip = {
        visible: true,
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
        content: this.formatSportName(stat.sport)
      }
    },

    // Hide sports tooltip
    hideSportsTooltip() {
      this.sportsTooltip.visible = false
    },

    // Handle document click to hide tooltip
    handleDocumentClick() {
      if (this.sportsTooltip.visible) {
        this.hideSportsTooltip()
      }
    }
  }
}
</script>

<style scoped>
/* Gauge styles */
.gauge-svg {
  width: 100%;
  filter: drop-shadow(0 8px 20px rgba(0,0,0,.06));
}

.gauge-container-compact {
  max-width: 500px;
  margin: 0 auto;
}
.health-wide .section-content { padding-bottom: 8px; }
.health-tall { min-height: 800px; }
.health-tall .section-content { min-height: 700px; display: flex; flex-direction: column; }
.health-grid-wide { 
  grid-template-columns: 1.2fr 1.2fr; 
  gap: 2rem; 
  max-width: none;
}
.gauge-tick {
  fill: #1f2937;
  font-size: 14px;
  font-weight: 700;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
.gauge-zero {
  fill: #6b7280;
  font-size: 12px;
}
.gauge-value {
  fill: #111827;
  font-size: 14px;
  font-weight: 700;
}
.gauge-legend {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 12px;
}
.gauge-legend.expanded {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  margin-top: 20px;
  padding: 12px 20px;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 25px;
  border: 1px solid rgba(226, 232, 240, 0.6);
  flex-wrap: wrap;
}
.gauge-legend .legend-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #64748b;
  font-size: 0.8rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.7);
  padding: 0.3rem 0.7rem;
  border-radius: 15px;
  border: 1px solid rgba(226, 232, 240, 0.5);
  transition: all 0.2s ease;
  white-space: nowrap;
}
.gauge-legend .legend-item:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.gauge-legend .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
.gauge-legend .dot.low { background: linear-gradient(135deg, #ef4444, #dc2626); }
.gauge-legend .dot.medium { background: linear-gradient(135deg, #f59e0b, #d97706); }
.gauge-legend .dot.high { background: linear-gradient(135deg, #22c55e, #16a34a); }

.health-description {
  margin-top: 1.5rem;
  position: relative;
}

.health-description-content {
  padding: 1.8rem 2rem;
  background: linear-gradient(145deg, rgba(248, 250, 252, 0.9), rgba(241, 245, 249, 0.8));
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.08),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.health-description-content:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.12),
    0 20px 25px -5px rgba(0, 0, 0, 0.08);
}

.health-description-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 50%);
  pointer-events: none;
}

.health-description-content::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.03), transparent, rgba(16, 185, 129, 0.03), transparent);
  animation: rotate-bg 20s linear infinite;
  pointer-events: none;
}

@keyframes rotate-bg {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.health-description h4 {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  z-index: 1;
}

.health-description h4::before {
  content: '\1F4A1';
  font-size: 1.2rem;
  filter: hue-rotate(200deg) brightness(1.1);
}

.health-description p {
  font-size: 1rem;
  line-height: 1.7;
  color: #374151;
  margin: 0;
  font-weight: 400;
  letter-spacing: 0.01em;
  position: relative;
  z-index: 1;
  text-align: left;
}

.health-description p::before {
  content: '"';
  font-size: 2.5rem;
  color: rgba(59, 130, 246, 0.2);
  font-family: Georgia, serif;
  position: absolute;
  left: -0.5rem;
  top: -0.8rem;
  line-height: 1;
  z-index: -1;
}

.empty-hint {
  padding: 12px 14px;
  color: #9ca3af;
}
.social-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #1a1a1a;
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  --header-height: 80px; 
}

/* Dynamic Background */
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
    rgba(230, 247, 255, 0.7) 25%,
    rgba(248, 250, 252, 0.8) 50%,
    rgba(243, 244, 246, 0.7) 75%,
    rgba(249, 250, 251, 0.8) 100%
  );
  animation: backgroundShift 20s ease-in-out infinite;
}

@keyframes backgroundShift {
  0%, 100% {
    background: linear-gradient(
      135deg,
      rgba(240, 248, 255, 0.8) 0%,
      rgba(230, 247, 255, 0.7) 25%,
      rgba(248, 250, 252, 0.8) 50%,
      rgba(243, 244, 246, 0.7) 75%,
      rgba(249, 250, 251, 0.8) 100%
    );
  }
  33% {
    background: linear-gradient(
      135deg,
      rgba(243, 244, 246, 0.8) 0%,
      rgba(249, 250, 251, 0.7) 25%,
      rgba(240, 248, 255, 0.8) 50%,
      rgba(230, 247, 255, 0.7) 75%,
      rgba(248, 250, 252, 0.8) 100%
    );
  }
  66% {
    background: linear-gradient(
      135deg,
      rgba(248, 250, 252, 0.8) 0%,
      rgba(240, 248, 255, 0.7) 25%,
      rgba(243, 244, 246, 0.8) 50%,
      rgba(249, 250, 251, 0.7) 75%,
      rgba(230, 247, 255, 0.8) 100%
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
  background: linear-gradient(135deg, #2196F3, #1976D2);
  top: 60%;
  right: 15%;
  animation-delay: -5s;
}

.shape-3 {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #FF9800, #F57C00);
  bottom: 30%;
  left: 20%;
  animation-delay: -10s;
}

.shape-4 {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #9C27B0, #7B1FA2);
  top: 40%;
  left: 60%;
  animation-delay: -7s;
}

.shape-5 {
  width: 140px;
  height: 140px;
  background: linear-gradient(135deg, #f44336, #d32f2f);
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
  flex-direction: column;
  gap: 1rem;
}

.nav-top {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.nav-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
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
  padding-top: var(--header-height);
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

/* Social Facilities - Compact Inline Layout */
.social-facilities {
  padding: 2.5rem 0;
  position: relative;
}

.facilities-header {
  text-align: center;
  margin-bottom: 2rem;
}

.total-counter {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95));
  backdrop-filter: blur(30px);
  border-radius: 40px;
  padding: 0.8rem 1.5rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 0.8rem;
  animation: counterBounce 3s ease-in-out infinite;
}

@keyframes counterBounce {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
}

.counter-number {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #4CAF50, #2196F3, #FF9800);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: numberGlow 2s ease-in-out infinite alternate;
}

@keyframes numberGlow {
  0% {
    filter: brightness(1);
  }
  100% {
    filter: brightness(1.2);
  }
}

.counter-label {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
}

.header-subtitle {
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
}

.facilities-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.facility-bubble {
  position: relative;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95));
  backdrop-filter: blur(30px);
  border-radius: 20px;
  padding: 1.2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  overflow: hidden;
  animation: bubbleFloat 6s ease-in-out infinite;
}

.facility-bubble:nth-child(1) { animation-delay: 0s; }
.facility-bubble:nth-child(2) { animation-delay: 1.5s; }
.facility-bubble:nth-child(3) { animation-delay: 3s; }
.facility-bubble:nth-child(4) { animation-delay: 4.5s; }

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

.facility-bubble.education:hover {
  box-shadow: 0 25px 60px rgba(33, 150, 243, 0.3);
}

.facility-bubble.healthcare:hover {
  box-shadow: 0 25px 60px rgba(244, 67, 54, 0.3);
}

.facility-bubble.recreation:hover {
  box-shadow: 0 25px 60px rgba(76, 175, 80, 0.3);
}

.facility-bubble.dining:hover {
  box-shadow: 0 25px 60px rgba(255, 152, 0, 0.3);
}

.facility-bubble.shopping:hover {
  box-shadow: 0 25px 60px rgba(255, 152, 0, 0.3);
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

.facility-bubble.education .bubble-icon {
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.2), rgba(33, 150, 243, 0.3));
  color: #2196F3;
}

.facility-bubble.healthcare .bubble-icon {
  background: linear-gradient(135deg, rgba(244, 67, 54, 0.2), rgba(244, 67, 54, 0.3));
  color: #f44336;
}

.facility-bubble.recreation .bubble-icon {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(76, 175, 80, 0.3));
  color: #4CAF50;
}

.facility-bubble.dining .bubble-icon {
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.2), rgba(255, 152, 0, 0.3));
  color: #FF9800;
}

.facility-bubble.shopping .bubble-icon {
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.2), rgba(255, 152, 0, 0.3));
  color: #FF9800;
}

.facility-bubble.hospitality .bubble-icon {
  background: linear-gradient(135deg, rgba(156, 39, 176, 0.2), rgba(156, 39, 176, 0.3));
  color: #9C27B0;
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

.facility-bubble.education .bubble-number {
  color: #2196F3;
}

.facility-bubble.healthcare .bubble-number {
  color: #f44336;
}

.facility-bubble.recreation .bubble-number {
  color: #4CAF50;
}

.facility-bubble.dining .bubble-number {
  color: #FF9800;
}

.facility-bubble.shopping .bubble-number {
  color: #FF9800;
}

.facility-bubble.hospitality .bubble-number {
  color: #9C27B0;
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

.detail-pill:nth-child(1) { animation-delay: 0s; }
.detail-pill:nth-child(2) { animation-delay: 1.3s; }
.detail-pill:nth-child(3) { animation-delay: 2.6s; }

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

.facility-bubble.education .bubble-glow {
  background: radial-gradient(circle, rgba(33, 150, 243, 0.1) 0%, transparent 70%);
}

.facility-bubble.healthcare .bubble-glow {
  background: radial-gradient(circle, rgba(244, 67, 54, 0.1) 0%, transparent 70%);
}

.facility-bubble.recreation .bubble-glow {
  background: radial-gradient(circle, rgba(76, 175, 80, 0.1) 0%, transparent 70%);
}

.facility-bubble.dining .bubble-glow {
  background: radial-gradient(circle, rgba(255, 152, 0, 0.1) 0%, transparent 70%);
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







/* SVG Gradients */
.prediction-waves svg defs,
.radar-svg defs {
  display: none;
}

/* Add gradients for wave charts */
.prediction-waves::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="educationGradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%232196F3" stop-opacity="0.3"/><stop offset="100%" stop-color="%232196F3" stop-opacity="0"/></linearGradient><linearGradient id="healthcareGradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%23f44336" stop-opacity="0.3"/><stop offset="100%" stop-color="%23f44336" stop-opacity="0"/></linearGradient><linearGradient id="recreationGradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%234CAF50" stop-opacity="0.3"/><stop offset="100%" stop-color="%234CAF50" stop-opacity="0"/></linearGradient></defs></svg>');
  pointer-events: none;
  z-index: -1;
}

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
  
  .page-description {
    font-size: 1.1rem;
    padding: 1rem 1.5rem;
  }
  
  .counter-number {
    font-size: 2rem;
  }
  
  .total-counter {
    padding: 0.8rem 1.5rem;
    gap: 0.8rem;
  }
  
  .counter-label {
    font-size: 1rem;
  }
  
  .facilities-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .facility-bubble {
    padding: 1rem;
    border-radius: 18px;
  }
  
  .bubble-icon {
    width: 45px;
    height: 45px;
    margin-bottom: 0.8rem;
  }
  
  .bubble-number {
    font-size: 1.8rem;
  }
  
  .bubble-label {
    font-size: 0.9rem;
    margin-bottom: 0.6rem;
  }
  
  .detail-pill {
    font-size: 0.75rem;
    padding: 0.4rem 0.6rem;
  }
  
  .prediction-waves {
    padding: 2rem 1rem;
  }
  
  .year-labels {
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }
  
  .growth-indicators {
    flex-direction: column;
    gap: 1rem;
  }
  
  .service-item {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .service-info {
    min-width: auto;
    justify-content: center;
  }
  
  .distance-bar {
    margin: 1rem 0;
  }
  
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .prediction-header h2 {
    font-size: 2rem;
  }
  
  .counter-number {
    font-size: 1.8rem;
  }
  
  .total-counter {
    padding: 0.6rem 1.2rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .counter-label {
    font-size: 0.9rem;
  }
  
  .facilities-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
  
  .facility-bubble {
    padding: 1rem;
    border-radius: 16px;
  }
  
  .bubble-icon {
    width: 40px;
    height: 40px;
  }
  
  .bubble-number {
    font-size: 1.6rem;
  }
  
  .bubble-label {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
  }
  
  .detail-pill {
    font-size: 0.7rem;
    padding: 0.3rem 0.5rem;
  }
  
  .prediction-waves {
    padding: 1.5rem 1rem;
  }
  
  .service-item {
    padding: 1rem;
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

/* Loading and Error States */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(76, 175, 80, 0.1);
  border-left: 4px solid #4CAF50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-container p {
  color: #666;
  font-size: 1.1rem;
  font-weight: 500;
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  background: rgba(244, 67, 54, 0.1);
  border-radius: 15px;
  margin: 2rem 0;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-container p {
  color: #d32f2f;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.retry-btn {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.retry-btn:hover {
  background: linear-gradient(135deg, #45a049, #4CAF50);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
}

/* Map Section */
.map-section {
  padding: 4rem 0;
  position: relative;
}

.map-container {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
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

/* Social Map Full Size */
.social-map-full {
  width: 100%;
  height: 100%;
  flex: 1;
}

/* Map placeholder styles (now unused but kept for fallback) */
.map-placeholder {
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 15px;
  border: 2px dashed #dee2e6;
}

.map-placeholder h3 {
  color: #6c757d;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.map-placeholder p {
  color: #adb5bd;
  font-size: 1rem;
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
}

.legend-item:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: translateX(5px);
}

.legend-item.inactive {
  opacity: 0.4;
  background: rgba(200, 200, 200, 0.3);
}

.legend-item.inactive:hover {
  opacity: 0.6;
  background: rgba(200, 200, 200, 0.5);
}

.legend-item {
  cursor: pointer;
  user-select: none;
}

/* New Unified Facility Legend Icons */
.facility-legend-icon {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
  display: block;
}

.facility-legend-schools { background: #e74c3c; }
.facility-legend-hospitals { background: #2980b9; }
.facility-legend-playgrounds { background: #333333; }
.facility-legend-community { background: #f39c12; }
.facility-legend-cafes { background: #9C27B0; }
.facility-legend-bars { background: #673AB7; }
.facility-legend-childcare { background: #e67e22; }
.facility-legend-practitioners { background: #27ae60; }

/* Education Detail Section */
.education-detail {
  padding: 4rem 0;
  position: relative;
}

/* Education Grid Layout */
.education-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 2rem;
  grid-template-areas: 
    "pie-chart school-list"
    "student-chart student-chart";
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

/* Education Sections Styling */
.education-section {
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

.education-section:hover {
  transform: translateY(-5px);
  box-shadow: 
    0 30px 80px rgba(0, 0, 0, 0.12),
    0 12px 35px rgba(0, 0, 0, 0.08);
}

/* Unified background color for all sections */
.education-section.pie-chart-section {
  grid-area: pie-chart;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.9));
  border: 1px solid rgba(226, 232, 240, 0.6);
  height: 500px;
}

.education-section.school-list-section {
  grid-area: school-list;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.9));
  border: 1px solid rgba(226, 232, 240, 0.6);
  height: 500px;
}

.education-section.student-chart-section {
  grid-area: student-chart;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.9));
  border: 1px solid rgba(226, 232, 240, 0.6);
}

/* Section Headers - Clean Design */
.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 0;
  border-bottom: 2px solid rgba(148, 163, 184, 0.2);
  padding-bottom: 1rem;
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

.school-list-section .section-icon {
  color: #ef4444;
}

.student-chart-section .section-icon {
  color: #f59e0b;
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

.school-list-section .section-header h3::after {
  background: linear-gradient(90deg, #ef4444, #f43f5e);
}

.student-chart-section .section-header h3::after {
  background: linear-gradient(90deg, #f59e0b, #fb923c);
}

.section-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.education-top-row {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.pie-chart-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.school-list-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.education-bottom-row {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.pie-chart-section h3 {
  text-align: left;
  margin-bottom: 1.5rem;
  color: #1e293b;
  font-weight: 700;
  font-size: 1.25rem;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  letter-spacing: -0.01em;
  background: transparent;
  padding: 0;
  border-radius: 0;
  border: none;
  box-shadow: none;
  backdrop-filter: none;
}

/* New Pie Chart Styles */
.pie-chart-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  padding: 2.5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.9));
  border-radius: 20px;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.08);
  border: 2px solid rgba(59, 130, 246, 0.15);
  backdrop-filter: blur(20px);
}

.pie-chart-svg {
  width: 200px;
  height: 200px;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
}

.pie-center-text-title {
  font-size: 16px;
  font-weight: 700;
  fill: #2c3e50;
  font-family: 'Inter', sans-serif;
}

.pie-center-text-subtitle {
  font-size: 12px;
  font-weight: 500;
  fill: #666;
  font-family: 'Inter', sans-serif;
}

.pie-percentage-label {
  font-size: 20px;
  font-weight: 900;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  text-shadow: 
    0 2px 6px rgba(0, 0, 0, 0.8),
    0 1px 3px rgba(255, 255, 255, 0.9),
    0 0 10px rgba(255, 255, 255, 0.5);
  letter-spacing: -0.02em;
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 0.5px;
}

.pie-percentage-label.primary {
  fill: #ffffff;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.6));
}

.pie-percentage-label.secondary {
  fill: #ffffff;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.6));
}

.pie-percentage-label.childcare {
  fill: #ffffff;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.6));
}

.pie-chart-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  margin-bottom: 1.5rem;
}

.chart-segments {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.segment {
  padding: 1rem 2rem;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  min-width: 120px;
  text-align: center;
  transition: all 0.3s ease;
}

.segment:hover {
  transform: scale(1.05);
}

.segment.primary {
  background: linear-gradient(135deg, #3498db, #2980b9);
}

.segment.secondary {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.segment.childcare {
  background: linear-gradient(135deg, #f39c12, #e67e22);
}

.chart-legend {
  display: grid;
  grid-template-columns: repeat(4, max-content);
  justify-content: center;
  gap: 0.8rem 1.5rem;
  margin-top: 0.5rem;
}

.chart-legend .legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #2c3e50;
}

.chart-legend .legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  padding: 0.5rem;
}

.chart-legend .color {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.chart-legend .color.primary { 
  background: linear-gradient(135deg, #52a3f0, #3498db);
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
}
.chart-legend .color.secondary { 
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
}
.chart-legend .color.special { 
  background: linear-gradient(135deg, #9C27B0, #7B1FA2);
  box-shadow: 0 2px 8px rgba(156, 39, 176, 0.3);
}
.chart-legend .color.prisecc { 
  background: linear-gradient(135deg, #16a085, #0e766e);
  box-shadow: 0 2px 8px rgba(22, 160, 133, 0.3);
}

/* Reduce legend color dot size for single-row layout */
.chart-legend .color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

@media (max-width: 768px) {
  .education-section.pie-chart-section { height: auto; }
  .chart-legend { grid-template-columns: repeat(2, max-content); }
}

/* Percentage label colors match legend */
.pie-percentage-label.special {
  fill: #ffffff;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.6));
}
.pie-percentage-label.prisecc {
  fill: #ffffff;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.6));
}

.school-list-section {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.list-header h3 {
  color: #1e293b;
  font-weight: 700;
  font-size: 1.5rem;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  letter-spacing: -0.01em;
  background: rgba(255, 255, 255, 0.8);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: 2px solid rgba(239, 68, 68, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  margin: 0;
}

.sort-btn {
  background: linear-gradient(135deg, #2196F3, #1976D2);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(33, 150, 243, 0.3);
}

.sort-btn:hover {
  background: linear-gradient(135deg, #1976D2, #2196F3);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(33, 150, 243, 0.4);
}

.school-list {
  flex: 1;
  height: 100%;
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
}

.school-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.school-item:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: translateX(5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.school-name {
  font-weight: 600;
  color: #2c3e50;
}

.school-type {
  color: #666;
  font-size: 0.9rem;
}

.school-suburb {
  color: #999;
  font-size: 0.8rem;
}

.school-beds {
  color: #0066cc;
  font-size: 0.85rem;
  font-weight: 500;
}

.medical-list-container {
  max-height: 600px;
  overflow-y: auto;
  padding-right: 8px;
}

.healthcare-filter {
  padding: 0.7rem 1.2rem 0.7rem 1rem;
  border: none;
  border-radius: 25px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.9));
  color: #374151;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  margin-left: auto;
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  position: relative;
  min-width: 120px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23374151' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.7rem center;
  background-size: 1rem;
}

.healthcare-filter:hover {
  transform: translateY(-1px);
  box-shadow: 
    0 10px 15px -3px rgba(0, 0, 0, 0.15),
    0 4px 6px -2px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  background: linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(248, 250, 252, 0.95));
  border-color: rgba(59, 130, 246, 0.3);
}

.healthcare-filter:focus {
  transform: translateY(-1px);
  box-shadow: 
    0 10px 15px -3px rgba(59, 130, 246, 0.2),
    0 4px 6px -2px rgba(59, 130, 246, 0.15),
    0 0 0 3px rgba(59, 130, 246, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  border-color: rgba(59, 130, 246, 0.5);
}

.healthcare-filter:active {
  transform: translateY(0);
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    inset 0 2px 4px rgba(0, 0, 0, 0.06);
}

.school-selector {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.school-selector label {
  color: #475569;
  font-weight: 600;
  font-size: 0.95rem;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  letter-spacing: -0.01em;
  margin-bottom: 0.5rem;
}

.school-selector select {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid rgba(148, 163, 184, 0.4);
  background: rgba(255, 255, 255, 0.95);
  font-size: 1rem;
  font-weight: 500;
  color: #1e293b;
  transition: all 0.3s ease;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23334155' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.8' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.8em 1.8em;
  padding-right: 2.5rem;
  height: 48px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(2, 6, 23, 0.06);
  cursor: pointer;
}

.school-selector select:focus {
  outline: none;
  border-color: #f59e0b;
  background-color: #ffffff;
  box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.15), 0 8px 24px rgba(2, 6, 23, 0.08);
}

.school-selector select option {
  background: white;
  color: #1e293b;
  padding: 0.5rem;
}

.school-selector select:hover {
  border-color: rgba(100, 116, 139, 0.7);
}

.student-count-chart {
  margin-top: 1rem;
}

/* Chart Container with optimized layout */
.chart-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.chart-with-labels {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.y-axis-label {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  color: #475569;
  font-weight: 600;
  font-size: 0.95rem;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  letter-spacing: -0.01em;
  white-space: nowrap;
  text-align: center;
  min-width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
}

.bar-chart {
  display: flex;
  align-items: end;
  justify-content: space-around;
  gap: 0.3rem;
  height: 280px;
  padding: 1.5rem 1rem 1rem 1rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(248, 250, 252, 0.4));
  border-radius: 12px;
  position: relative;
  flex: 1;
  width: 100%;
  max-width: none;
}

.x-axis-label {
  text-align: center;
  margin-top: 0.8rem;
  color: #475569;
  font-weight: 600;
  font-size: 0.95rem;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  letter-spacing: -0.01em;
}

.bar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
}

.bar {
  width: 100%;
  max-width: 40px;
  background: linear-gradient(135deg, #52a3f0, #3498db);
  border-radius: 8px 8px 0 0;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 8px;
  position: relative;
  min-height: 20px;
}

.bar-value {
  font-size: 11px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  min-height: 14px;
  display: flex;
  align-items: center;
}

.bar:hover {
  background: linear-gradient(135deg, #1976D2, #2196F3);
  transform: scaleY(1.05);
}

.bar-zero {
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1) !important;
  border: 2px dashed #94a3b8;
  opacity: 0.7;
}

.bar-zero:hover {
  background: linear-gradient(135deg, #cbd5e1, #94a3b8) !important;
  opacity: 0.9;
}

.bar-value-zero {
  color: #64748b !important;
  font-style: italic;
}

.year-label {
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
  text-align: center;
}

/* Back to Top Button */
.back-to-top {
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

/* Hospitality hover effects */
.facility-bubble.hospitality:hover {
  box-shadow: 0 25px 60px rgba(156, 39, 176, 0.3);
}

.facility-bubble.hospitality .bubble-glow {
  background: radial-gradient(circle, rgba(156, 39, 176, 0.1) 0%, transparent 70%);
}

/* Additional UI Improvements */
.pie-chart-container {
  position: relative;
}

.pie-chart-container::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  z-index: -1;
  animation: pulseChart 3s ease-in-out infinite;
}

@keyframes pulseChart {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.8; }
}

.school-list {
  position: relative;
}

.school-list::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.3), transparent);
}

/* Hide decorative top line to align inner and outer frames better */
.school-list::before { display: none; }

.bar-chart::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.3), transparent);
}

/* Enhanced Section Hover Effects */
.education-section:hover .section-icon {
  transform: scale(1.1);
}

.education-section:hover .section-header h3::after {
  width: 60px;
}

/* Sort Button Enhancement */
.sort-btn {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.sort-btn:hover {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
}

/* Responsive Design Updates */
@media (max-width: 768px) {
  .map-container {
    flex-direction: column;
  }
  
  .education-grid {
    grid-template-columns: 1fr;
    grid-template-areas: 
      "pie-chart"
      "school-list"
      "student-chart";
    gap: 1.5rem;
  }
  
  .education-section {
    padding: 1.5rem;
  }
  
  .section-header {
    flex-direction: column;
    gap: 0.8rem;
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .section-header h3 {
    font-size: 1.3rem;
  }
  
  .chart-with-labels {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .y-axis-label {
    writing-mode: initial;
    text-orientation: initial;
    transform: none;
    min-width: auto;
    padding: 0.5rem;
  }
  
  .pie-chart-svg {
    width: 180px;
    height: 180px;
  }
  
  .school-list {
    max-height: 250px;
  }
  
  .bar-chart {
    height: 220px;
    gap: 0.25rem;
    padding: 1.5rem 0.8rem 1rem 0.8rem;
  }
  
  .back-to-top {
    width: 50px;
    height: 50px;
    bottom: 1rem;
    right: 1rem;
  }
}

@media (max-width: 480px) {
  .detail-header h2 {
    font-size: 2rem;
  }
  
  .education-section {
    padding: 1rem;
  }
  
  .section-header {
    gap: 0.6rem;
    margin-bottom: 1rem;
  }
  
  .section-header h3 {
    font-size: 1.1rem;
  }
  
  .section-icon {
    width: 28px;
    height: 28px;
  }
  
  .chart-legend {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .pie-chart-svg {
    width: 160px;
    height: 160px;
  }
  
  .pie-percentage-label {
    font-size: 16px;
  }
  
  .school-list {
    max-height: 200px;
    padding: 1rem;
  }
  
  .bar-chart {
    height: 200px;
    padding: 1rem 0.5rem 1rem 0.5rem;
  }
  
  .sort-btn {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
}

/* Hospitality Timeline Styles */

.timeline-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 0;
}

.timeline-line {
  position: absolute;
  top: 120px;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #10b981 0%, #059669 25%, #047857 50%, #065f46 75%, #064e3b 100%);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.timeline-stages {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  z-index: 2;
  margin-bottom: 4rem;
}

.timeline-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
}

.stage-circle {
  width: 85px;
  height: 85px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981, #059669);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
  border: 5px solid white;
  position: relative;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}

.stage-circle::before {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2));
  z-index: -1;
}

.stage-circle:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 40px rgba(16, 185, 129, 0.5);
}

/* Gradient colors for each year circle */
.stage-circle-1 {
  background: linear-gradient(135deg, #a7f3d0, #10b981) !important;
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4) !important;
}

.stage-circle-2 {
  background: linear-gradient(135deg, #6ee7b7, #059669) !important;
  box-shadow: 0 10px 30px rgba(5, 150, 105, 0.4) !important;
}

.stage-circle-3 {
  background: linear-gradient(135deg, #34d399, #047857) !important;
  box-shadow: 0 10px 30px rgba(4, 120, 87, 0.4) !important;
}

.stage-circle-4 {
  background: linear-gradient(135deg, #10b981, #065f46) !important;
  box-shadow: 0 10px 30px rgba(6, 95, 70, 0.4) !important;
}

.stage-circle-5 {
  background: linear-gradient(135deg, #059669, #064e3b) !important;
  box-shadow: 0 10px 30px rgba(6, 78, 59, 0.4) !important;
}

.timeline-stage.active .stage-circle {
  background: linear-gradient(135deg, #059669, #047857);
  box-shadow: 0 12px 35px rgba(5, 150, 105, 0.4);
  transform: scale(1.1);
}

.stage-year {
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.stage-info {
  text-align: center;
  margin-top: 0.5rem;
}

.stage-label {
  font-size: 0.85rem;
  color: #475569;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stage-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #fef3c7, #fbbf24);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  color: #d97706;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
  transition: all 0.3s ease;
}

.stage-icon:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(251, 191, 36, 0.4);
}

/* Different colors for each stage icon */
.stage-icon-1 {
  background: linear-gradient(135deg, #dcfce7, #bbf7d0) !important;
  color: #16a34a !important;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3) !important;
}

.stage-icon-2 {
  background: linear-gradient(135deg, #dbeafe, #93c5fd) !important;
  color: #2563eb !important;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3) !important;
}

.stage-icon-3 {
  background: linear-gradient(135deg, #fef3c7, #fbbf24) !important;
  color: #d97706 !important;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3) !important;
}

.stage-icon-4 {
  background: linear-gradient(135deg, #fce7f3, #f9a8d4) !important;
  color: #be185d !important;
  box-shadow: 0 4px 12px rgba(190, 24, 93, 0.3) !important;
}

.stage-icon-5 {
  background: linear-gradient(135deg, #ede9fe, #c4b5fd) !important;
  color: #7c3aed !important;
  box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3) !important;
}

.stage-arrow {
  position: absolute;
  top: 40px;
  right: -20px;
  color: #10b981;
  z-index: 1;
}

.stage-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

/* New layout for cards in one row */
.stage-details-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.stage-detail-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 20px;
  padding: 1.8rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 2px solid #e2e8f0;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  min-height: 280px;
  display: flex;
  flex-direction: column;
}

.stage-detail-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(16, 185, 129, 0.15);
  border-color: #10b981;
}

.stage-detail-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #10b981, #059669);
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Removed active state styles - all cards now have consistent styling */

.stage-detail-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.2rem;
}

.stage-detail-icon {
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
  flex-shrink: 0;
  position: relative;
}

.stage-detail-icon::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
  pointer-events: none;
}

/* Different colors for each card icon */
.card-icon-1 {
  background: linear-gradient(135deg, #ecfdf5, #a7f3d0) !important;
  color: #059669 !important;
  box-shadow: 0 6px 20px rgba(5, 150, 105, 0.3) !important;
}

.card-icon-2 {
  background: linear-gradient(135deg, #eff6ff, #93c5fd) !important;
  color: #1d4ed8 !important;
  box-shadow: 0 6px 20px rgba(29, 78, 216, 0.3) !important;
}

.card-icon-3 {
  background: linear-gradient(135deg, #fffbeb, #fcd34d) !important;
  color: #d97706 !important;
  box-shadow: 0 6px 20px rgba(217, 119, 6, 0.3) !important;
}

.card-icon-4 {
  background: linear-gradient(135deg, #fdf2f8, #f9a8d4) !important;
  color: #be185d !important;
  box-shadow: 0 6px 20px rgba(190, 24, 93, 0.3) !important;
}

.card-icon-5 {
  background: linear-gradient(135deg, #f5f3ff, #c4b5fd) !important;
  color: #7c3aed !important;
  box-shadow: 0 6px 20px rgba(124, 58, 237, 0.3) !important;
}

.stage-detail-info {
  flex: 1;
  position: relative;
}

.stage-detail-info h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.stage-number {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
}

.stage-checkmark {
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 24px;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stage-detail-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.stage-detail-content h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #059669;
  margin: 0 0 0.8rem 0;
  line-height: 1.3;
  height: 2.6rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.stage-detail-content p {
  color: #64748b;
  line-height: 1.5;
  margin: 0;
  font-size: 0.85rem;
  flex: 1;
  overflow-y: auto;
}

/* Responsive Design for Hospitality Timeline */
@media (max-width: 1024px) {
  .stage-details-row {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .growth-timeline-section {
    padding: 4rem 0;
  }
  
  .timeline-stages {
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .timeline-line {
    display: none;
  }
  
  .stage-arrow {
    display: none;
  }
  
  .stage-details {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .stage-details-row {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .stage-detail-card {
    padding: 1.5rem;
  }
  
  .stage-circle {
    width: 60px;
    height: 60px;
  }
  
  .stage-year {
    font-size: 1rem;
  }
}

/* Community Center Conditions Styles */
.community-conditions-content {
  padding: 2rem 0;
}

.no-data-message {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.9));
  border-radius: 20px;
  border: 2px dashed rgba(148, 163, 184, 0.4);
}

.no-data-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.conditions-assessment {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.9));
  border-radius: 24px;
  padding: 2rem;
  backdrop-filter: blur(30px);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.08),
    0 8px 25px rgba(0, 0, 0, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.4);
}

.assessment-header {
  display: grid;
  grid-template-columns: 1.5fr 3.5fr;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

.header-left h3,
.header-right h3 {
  color: #1e293b;
  font-weight: 800;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #1e293b 0%, #3b82f6 50%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Header Content Alignment */
.header-left {
  padding-left: 0.5rem;
}

.rating-header-content {
  text-align: center;
  margin-bottom: 0.5rem;
}

.rating-header-content h3 {
  margin-bottom: 0.5rem;
}

/* Simple scale line design - aligned with progress bars */
.simple-scale {
  position: relative;
  height: 40px;
  margin-top: 1rem;
  padding: 0;
}

.scale-line-simple {
  position: absolute;
  top: 20px;
  left: calc(1rem + 16px);
  right: calc(1rem + 16px);
  height: 3px;
  background: linear-gradient(90deg, #ef4444 0%, #f59e0b 25%, #fbbf24 50%, #22c55e 75%, #10b981 100%);
  border-radius: 2px;
}

.scale-markers-simple {
  position: relative;
  height: 100%;
  margin-left: calc(1rem + 16px);
  margin-right: calc(1rem + 16px);
}

.marker-simple {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.marker-number {
  margin-bottom: 1px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
}

.marker-tick {
  width: 2px;
  height: 17px;
  background: #64748b;
}

/* Assessment Rows */
.assessment-rows {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 1.5rem;
}

/* Scrollable Facility Container */
.scrollable-facility-container {
  max-height: 600px; /* Approximately 5 cards at ~120px each */
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 0.5rem;
  margin-right: -0.5rem;
  
  /* Modern scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: rgba(16, 185, 129, 0.3) rgba(241, 245, 249, 0.5);
}

/* Webkit scrollbar styling for modern browsers */
.scrollable-facility-container::-webkit-scrollbar {
  width: 8px;
}

.scrollable-facility-container::-webkit-scrollbar-track {
  background: rgba(241, 245, 249, 0.5);
  border-radius: 10px;
  margin: 0.5rem 0;
}

.scrollable-facility-container::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, 
    rgba(16, 185, 129, 0.4) 0%,
    rgba(5, 150, 105, 0.6) 100%
  );
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.scrollable-facility-container::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, 
    rgba(16, 185, 129, 0.6) 0%,
    rgba(5, 150, 105, 0.8) 100%
  );
  border-color: rgba(255, 255, 255, 0.3);
}

/* Fade effect at bottom to indicate more content */
.scrollable-facility-container::after {
  content: '';
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(248, 250, 252, 0.8) 100%
  );
  pointer-events: none;
  z-index: 1;
}

.assessment-row {
  display: grid;
  grid-template-columns: 1.5fr 3.5fr;
  gap: 2rem;
  align-items: center;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.assessment-row:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
  border-color: rgba(16, 185, 129, 0.3);
}

.assessment-row:last-child {
  margin-bottom: 0;
}

.name-column {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

/* Modern Fancy Facility Card */
.facility-modern-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.facility-avatar {
  position: relative;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
}

.avatar-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%);
  opacity: 0.9;
}

.avatar-text {
  position: relative;
  z-index: 1;
  font-weight: 700;
  font-size: 0.8rem;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.5px;
}

.facility-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.facility-title {
  font-weight: 700;
  font-size: 0.95rem;
  color: #0f172a;
  line-height: 1.3;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  letter-spacing: -0.01em;
  margin: 0;
  background: linear-gradient(135deg, #0f172a 0%, #374151 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.facility-meta {
  display: flex;
  align-items: center;
}

.meta-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.65rem;
  font-weight: 600;
  color: #0891b2;
  background: linear-gradient(135deg, rgba(8, 145, 178, 0.1), rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.05));
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  border: 1px solid rgba(8, 145, 178, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.meta-chip::before {
  content: '';
  width: 4px;
  height: 4px;
  background: linear-gradient(135deg, #06b6d4, #3b82f6);
  border-radius: 50%;
}

.meta-chip::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}

.meta-chip:hover::after {
  left: 100%;
}

.meta-chip:hover {
  border-color: rgba(8, 145, 178, 0.3);
  transform: scale(1.02);
}

/* Modern Circular Score */
.score-modern {
  display: flex;
  align-items: center;
  justify-content: center;
}

.score-ring {
  position: relative;
  width: 48px;
  height: 48px;
}

.score-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.score-bg {
  opacity: 0.3;
}

.score-progress {
  transition: stroke-dasharray 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 2px 4px rgba(16, 185, 129, 0.2));
}

.score-text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.score-value {
  font-weight: 800;
  font-size: 0.9rem;
  color: #10b981;
  line-height: 1;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
}

.rating-column {
  position: relative;
}

/* Modern Progress Container */
.modern-progress-container {
  width: 100%;
  margin: 0;
  padding: 0 1rem;
}

.progress-bar-enhanced {
  position: relative;
  width: 100%;
  height: 16px;
}

/* Progress Track Background with Segments */
.progress-track-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 16px;
  border-radius: 10px;
  display: flex;
  overflow: hidden;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}

.track-segment {
  flex: 1;
  opacity: 0.4;
  transition: opacity 0.3s ease;
}

.track-segment.segment-poor {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.15));
}

.track-segment.segment-fair {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.15));
}

.track-segment.segment-average {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.15));
}

.track-segment.segment-good {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.15));
}

.track-segment.segment-excellent {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.15));
}

/* Enhanced Progress Fill */
.progress-fill-enhanced {
  position: absolute;
  top: 0;
  left: 0;
  height: 16px;
  border-radius: 10px;
  overflow: hidden;
  transform-origin: left;
  animation: progressSlideIn 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  transform: scaleX(0);
  box-shadow: 
    0 3px 8px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

@keyframes progressSlideIn {
  to {
    transform: scaleX(1);
  }
}

/* Progress Fill Colors */
.progress-fill-enhanced.condition-poor {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%);
}

.progress-fill-enhanced.condition-average {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%);
}

.progress-fill-enhanced.condition-good {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%);
}

.progress-fill-enhanced.condition-excellent {
  background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);
}

/* Animated Shine Effect */
.progress-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: shine 2s infinite;
}

@keyframes shine {
  0% { left: -100%; }
  50% { left: 100%; }
  100% { left: 100%; }
}

/* Progress Overlay */
.progress-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.2) 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.1) 100%
  );
  pointer-events: none;
}

/* Enhanced Progress Indicator */
.progress-indicator-enhanced {
  position: absolute;
  top: -8px;
  transform: translateX(-50%);
  width: 32px;
  height: 32px;
  cursor: pointer;
  z-index: 10;
}

.indicator-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 3px solid;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Emoji Indicator */
.indicator-emoji {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  transition: all 0.3s ease;
}

.emoji-face {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.emoji-eyes {
  position: absolute;
  top: 7px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
}

.eye {
  width: 3px;
  height: 3px;
  background: #333;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.emoji-mouth {
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.3s ease;
}

/* Emoji States - 5 Different Expressions */

/* 1. Very Sad (Now used for Rating 5 - changed to teal) */
.emoji-very-sad .emoji-mouth {
  width: 8px;
  height: 4px;
  border: 2px solid #10b981;
  border-top: none;
  border-radius: 0 0 8px 8px;
  background: transparent;
}

.emoji-very-sad .eye {
  background: #10b981;
  width: 2px;
  height: 4px;
  border-radius: 2px;
}

.emoji-very-sad .emoji-face {
  background: linear-gradient(135deg, #ecfdf5, #d1fae5);
  border-color: #10b981;
}

/* 2. Sad (Now used for Rating 4 - changed to green) */
.emoji-sad .emoji-mouth {
  width: 6px;
  height: 3px;
  border: 2px solid #22c55e;
  border-top: none;
  border-radius: 0 0 6px 6px;
  background: transparent;
}

.emoji-sad .eye {
  background: #22c55e;
  width: 3px;
  height: 3px;
}

.emoji-sad .emoji-face {
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
  border-color: #22c55e;
}

/* 3. Neutral (Rating 3) */
.emoji-neutral .emoji-mouth {
  width: 6px;
  height: 1px;
  background: #6b7280;
  border-radius: 1px;
}

.emoji-neutral .eye {
  background: #6b7280;
  width: 3px;
  height: 3px;
}

.emoji-neutral .emoji-face {
  background: linear-gradient(135deg, #fafafa, #f5f5f5);
  border-color: #d1d5db;
}

/* 4. Happy (Now used for Rating 2 - changed to orange) */
.emoji-happy .emoji-mouth {
  width: 8px;
  height: 4px;
  border: 2px solid #f59e0b;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  background: transparent;
}

.emoji-happy .eye {
  background: #f59e0b;
  width: 3px;
  height: 3px;
}

.emoji-happy .emoji-face {
  background: linear-gradient(135deg, #fffbeb, #fef3c7);
  border-color: #f59e0b;
}

/* 5. Very Happy (Now used for Rating 1 - changed to red) */
.emoji-very-happy .emoji-mouth {
  width: 10px;
  height: 5px;
  border: 2px solid #ef4444;
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  background: transparent;
}

.emoji-very-happy .eye {
  background: #ef4444;
  width: 4px;
  height: 2px;
  border-radius: 2px;
  transform: scaleY(0.5);
}

.emoji-very-happy .emoji-face {
  background: linear-gradient(135deg, #fef2f2, #fee2e2);
  border-color: #ef4444;
}

/* Ring Colors for Different States */
.progress-indicator-enhanced.condition-poor .indicator-ring {
  border-color: #ef4444;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.progress-indicator-enhanced.condition-average .indicator-ring {
  border-color: #f59e0b;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.progress-indicator-enhanced.condition-good .indicator-ring {
  border-color: #22c55e;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

.progress-indicator-enhanced.condition-excellent .indicator-ring {
  border-color: #10b981;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

/* Hover Effects */
.progress-indicator-enhanced:hover .indicator-ring {
  transform: scale(1.2);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.progress-indicator-enhanced:hover .indicator-emoji {
  transform: translate(-50%, -50%) scale(1.3);
}

/* Progress Tooltip */
.progress-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 12px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;
}

.progress-indicator-enhanced:hover .progress-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(-4px);
}

.tooltip-content {
  background: linear-gradient(135deg, 
    rgba(15, 23, 42, 0.95) 0%,
    rgba(30, 41, 59, 0.9) 100%
  );
  backdrop-filter: blur(20px);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-size: 0.875rem;
  white-space: nowrap;
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.tooltip-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

.tooltip-rating {
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  padding: 0.125rem 0.5rem;
  border-radius: 6px;
  text-align: center;
}

.tooltip-rating.condition-poor {
  color: #fecaca;
  background: rgba(239, 68, 68, 0.2);
}

.tooltip-rating.condition-average {
  color: #fed7aa;
  background: rgba(245, 158, 11, 0.2);
}

.tooltip-rating.condition-good {
  color: #bbf7d0;
  background: rgba(34, 197, 94, 0.2);
}

.tooltip-rating.condition-excellent {
  color: #a7f3d0;
  background: rgba(16, 185, 129, 0.2);
}

.tooltip-score {
  font-weight: 700;
  font-size: 1rem;
  color: #22c55e;
  text-align: center;
}

.tooltip-arrow {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid rgba(15, 23, 42, 0.95);
}


.conditions-header {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(148, 163, 184, 0.2);
}

.facility-column h3,
.rating-column h3 {
  color: #1e293b;
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}

.facility-column p {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0;
}

.rating-scale {
  margin-top: 1rem;
}

.scale-markers {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.scale-marker {
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
  width: 20px;
  text-align: center;
}

.scale-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.scale-label {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
}

.conditions-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.condition-item {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  align-items: center;
}

.condition-item:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.facility-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.facility-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: #1e293b;
  line-height: 1.3;
}

.facility-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.facility-address {
  color: #64748b;
  font-size: 0.9rem;
}

.facility-sports {
  color: #f39c12;
  font-size: 0.85rem;
  font-weight: 500;
  background: rgba(243, 156, 18, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  display: inline-block;
  width: fit-content;
}

.condition-rating {
  display: flex;
  align-items: center;
  justify-content: center;
}

.rating-bar {
  width: 100%;
  max-width: 300px;
}

.rating-bar-full {
  width: 100%;
}

.rating-scale-visual {
  width: 100%;
}

.rating-track-points {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.75rem;
  position: relative;
}

.rating-track-points::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  z-index: 0;
}

.rating-point {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e2e8f0;
  border: 3px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.rating-point.active {
  background: #22c55e;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

.point-number {
  font-size: 0.8rem;
  font-weight: 700;
  color: #64748b;
}

.rating-point.active .point-number {
  color: white;
}

.rating-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

.rating-raw {
  font-size: 0.8rem;
  color: #94a3b8;
  font-style: italic;
}

.rating-track {
  width: 100%;
  height: 12px;
  background: #e2e8f0;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.rating-fill {
  height: 100%;
  border-radius: 6px;
  transition: all 0.6s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.rating-dot {
  width: 16px;
  height: 16px;
  background: #22c55e;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  margin-right: -8px;
  position: relative;
  z-index: 1;
}

.rating-fill.condition-poor {
  background: linear-gradient(90deg, #ef4444, #dc2626);
}

.rating-fill.condition-average {
  background: linear-gradient(90deg, #f59e0b, #d97706);
}

.rating-fill.condition-good {
  background: linear-gradient(90deg, #22c55e, #16a34a);
}

.rating-fill.condition-excellent {
  background: linear-gradient(90deg, #10b981, #059669);
}

.rating-value {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rating-number {
  font-weight: 700;
  font-size: 1.2rem;
  color: #1e293b;
}

.rating-text {
  font-size: 0.9rem;
  font-weight: 500;
  color: #64748b;
}

/* Responsive Design */
@media (max-width: 768px) {
  .assessment-header {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .assessment-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .conditions-assessment {
    padding: 1.5rem;
  }
  
  .condition-scale {
    margin-top: 1rem;
  }
}

/* Sports Statistics Styles */
.sports-stats-content {
  padding: 2rem 0;
}

.sports-chart-container {
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.9));
  border: 1px solid rgba(226, 232, 240, 0.6);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.chart-header {
  text-align: center;
  margin-bottom: 2rem;
}

.chart-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.title-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.chart-title h3 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.chart-subtitle {
  font-size: 1rem;
  color: #64748b;
  font-weight: 500;
}

.sports-bar-chart {
  display: flex;
  align-items: flex-end;
  gap: 2rem;
  min-height: 400px;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  margin-bottom: 2rem;
}

.chart-y-axis {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 350px;
  position: relative;
}

.y-axis-label {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.y-axis-ticks {
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  height: 300px;
  padding-right: 1rem;
}

.y-axis-ticks .tick {
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 500;
  position: relative;
}

.y-axis-ticks .tick::after {
  content: '';
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 1px;
  background: #d1d5db;
}

.chart-bars-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 350px;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 300px;
  padding: 0 1rem;
  position: relative;
}

.chart-bars::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: #d1d5db;
}

.bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-width: 60px;
  max-width: 100px;
  flex: 1;
}

.bar {
  width: 100%;
  min-height: 20px;
  border-radius: 8px 8px 0 0;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 8px;
}

.bar:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

.bar-value {
  color: white;
  font-weight: 700;
  font-size: 0.85rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.bar-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #374151;
  text-align: center;
  line-height: 1.2;
  max-width: 80px;
  word-wrap: break-word;
}

.chart-x-axis {
  text-align: center;
  padding-top: 1rem;
}

.x-axis-label {
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
}

.stats-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(226, 232, 240, 0.6);
  transition: all 0.3s ease;
}

.summary-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.summary-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  border-radius: 12px;
  color: #374151;
}

.summary-content {
  flex: 1;
}

.summary-number {
  font-size: 1.8rem;
  font-weight: 800;
  color: #1e293b;
  line-height: 1;
}

.summary-label {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
  margin-top: 0.25rem;
}

.no-data-message {
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
}

.no-data-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: #d1d5db;
}

.no-data-message h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.no-data-message p {
  font-size: 1rem;
  color: #6b7280;
  max-width: 500px;
  margin: 0 auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  .sports-bar-chart {
    flex-direction: column;
    gap: 1rem;
    min-height: auto;
  }

  .chart-y-axis {
    flex-direction: row;
    height: auto;
    width: 100%;
    justify-content: space-between;
  }

  .y-axis-label {
    writing-mode: horizontal-tb;
    text-orientation: mixed;
    margin-bottom: 0;
    margin-right: 1rem;
  }

  .y-axis-ticks {
    flex-direction: row;
    height: auto;
    width: 100%;
    padding-right: 0;
    padding-bottom: 1rem;
  }

  .y-axis-ticks .tick::after {
    left: 50%;
    top: 100%;
    transform: translateX(-50%);
    width: 1px;
    height: 8px;
  }

  .chart-bars {
    height: 250px;
  }

  .stats-summary {
    grid-template-columns: 1fr;
  }

  .chart-title {
    flex-direction: column;
    gap: 0.5rem;
  }

  .chart-title h3 {
    font-size: 1.5rem;
  }
}

/* Sports Chart Redesign - Compact Vertical Bars */
.sports-chart-redesign {
  margin-top: 3rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.9));
  border: 1px solid rgba(226, 232, 240, 0.6);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  position: relative;
}

/* Expanded Sports Chart */
.sports-chart-expanded {
  margin-top: 3rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95));
  border: 2px solid rgba(99, 102, 241, 0.2);
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(99, 102, 241, 0.1);
  position: relative;
  transition: all 0.3s ease;
}

.chart-title-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.4);
}

.title-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.title-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
}

/* Enhanced sports title icon */
.sports-title-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(240, 147, 251, 0.4);
  transition: all 0.3s ease;
}

.sports-title-icon:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(240, 147, 251, 0.5);
}

.title-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.main-title {
  font-size: 1.4rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  line-height: 1.2;
}

.title-subtitle {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 500;
  margin: 0;
  font-style: italic;
}

.chart-title-bar h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.facility-count {
  font-size: 0.85rem;
  font-weight: 600;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
  padding: 0.4rem 0.8rem;
  border-radius: 10px;
  border: 1px solid rgba(99, 102, 241, 0.2);
}

/* Chart Legend */
.chart-legend {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(248, 250, 252, 0.8);
  border: 1px solid rgba(226, 232, 240, 0.6);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.legend-box {
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #64748b;
  border-radius: 4px;
  flex-shrink: 0;
}

.legend-text {
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
}

.vertical-chart-area {
  position: relative;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  padding: 1rem 0.5rem;
  border: 1px solid rgba(226, 232, 240, 0.3);
}

.sports-mosaic { 
  display: grid; 
  grid-template-columns: 1fr; 
}

/* Expanded mosaic layout */
.sports-mosaic-expanded {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 400px;
}

.mosaic-grid { 
  display: grid; 
  grid-template-columns: repeat(12, 1fr); 
  grid-auto-rows: 36px; 
  gap: 8px; 
}

/* Expanded grid with more space */
.mosaic-grid-expanded {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-auto-rows: 55px;
  gap: 12px;
  min-height: 350px;
  padding: 1rem;
}

/* Dynamic grid that adapts to content */
.mosaic-grid-dynamic {
  display: grid;
  grid-auto-rows: 60px;
  gap: 14px;
  padding: 1.5rem;
  align-content: start;
  justify-content: center;
  transition: all 0.3s ease;
}

.mosaic-tile { 
  position: relative; 
  background: linear-gradient(180deg, rgba(255,255,255,.96), rgba(248,250,252,.92)); 
  border: 1px solid #e2e8f0; 
  border-radius: 12px; 
  padding: 8px 10px; 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  overflow: hidden; 
  transition: transform .15s ease, box-shadow .2s ease; 
}

.mosaic-tile:hover { 
  transform: translateY(-1px); 
  box-shadow: 0 6px 20px rgba(15,23,42,.08); 
}

/* Enhanced tiles with better styling */
.mosaic-tile-enhanced {
  position: relative;
  background: linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,250,252,0.95));
  border: 2px solid var(--tile-color, #e2e8f0);
  border-radius: 16px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.mosaic-tile-enhanced:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px var(--tile-color, #e2e8f0);
  border-color: var(--tile-color, #e2e8f0);
}

/* Clickable tile cursor */
.clickable-tile {
  cursor: pointer;
}

.clickable-tile:active {
  transform: translateY(-1px) scale(1.01);
}

.mosaic-tile-enhanced::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--tile-color, #e2e8f0), transparent);
  border-radius: 16px 16px 0 0;
}

.tile-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  height: 100%;
  width: 100%;
  gap: 8px;
  padding: 0 4px;
}

.tile-text { 
  font-size: 13px; 
  color: #1e293b; 
  font-weight: 600;
  line-height: 1.2; 
  text-align: center;
  word-break: break-word;
  hyphens: auto;
}

.mosaic-tile-enhanced .tile-text {
  font-size: 12px;
  color: #0f172a;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  flex: 1;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 4px;
}

.tile-count { 
  font-size: 12px; 
  font-weight: 800; 
  color: #475569; 
  margin-left: 10px; 
}

.mosaic-tile-enhanced .tile-count {
  font-size: 14px;
  font-weight: 900;
  color: var(--tile-color, #475569);
  margin-left: 0;
  padding: 3px 7px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  border: 1.5px solid var(--tile-color, #e2e8f0);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  min-width: 26px;
  text-align: center;
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .mosaic-grid { 
    grid-template-columns: repeat(8, 1fr); 
    grid-auto-rows: 34px; 
  }
  
  .mosaic-grid-expanded {
    grid-template-columns: repeat(10, 1fr);
    grid-auto-rows: 50px;
    gap: 10px;
    padding: 0.75rem;
  }
  
  .mosaic-grid-dynamic {
    grid-auto-rows: 55px;
    gap: 12px;
    padding: 1rem;
  }
  
  .sports-chart-expanded {
    padding: 1.5rem;
  }
}

.chart-grid {
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
  gap: 0.2rem;
  min-height: 180px;
  padding: 0.5rem 0;
  position: relative;
}

.base-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, rgba(203, 213, 225, 0.5), #cbd5e1, rgba(203, 213, 225, 0.5));
  border-radius: 1px;
}

.chart-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  min-width: 20px;
  max-width: 28px;
  flex: 1;
  transition: all 0.3s ease;
  cursor: pointer;
}

.chart-column:hover {
  transform: translateY(-3px);
}

.column-bar {
  width: 100%;
  min-height: 20px;
  border-radius: 6px 6px 2px 2px;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}

.column-bar:hover {
  transform: scale(1.15);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
}

.bar-highlight {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, transparent 100%);
  border-radius: 6px 6px 0 0;
}

.value-label {
  color: white;
  font-weight: 700;
  font-size: 0.65rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  z-index: 2;
  position: relative;
}

.axis-label {
  font-size: 0.55rem;
  font-weight: 600;
  color: #64748b;
  text-align: center;
  line-height: 1;
  padding: 0.2rem 0.05rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 3px;
  border: 1px solid rgba(226, 232, 240, 0.5);
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.chart-column:hover .axis-label {
  background: rgba(255, 255, 255, 1);
  color: #1e293b;
  border-color: rgba(99, 102, 241, 0.4);
  transform: scale(1.1);
}

/* Tooltip styles removed as per requirements */

/* Responsive Design */
@media (max-width: 768px) {
  .sports-chart-redesign {
    padding: 1rem;
    margin-top: 2rem;
  }
  
  .sports-chart-expanded {
    padding: 1.25rem;
    margin-top: 2rem;
  }

  .chart-title-bar {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }

  .chart-title-bar h3 {
    font-size: 1.1rem;
  }
  
  .mosaic-grid-expanded {
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: 45px;
    gap: 8px;
    padding: 0.5rem;
    min-height: 280px;
  }
  
  .mosaic-grid-dynamic {
    grid-auto-rows: 50px;
    gap: 10px;
    padding: 0.75rem;
  }
  
  .sports-mosaic-expanded {
    min-height: 320px;
  }
  
  .mosaic-tile-enhanced .tile-text {
    font-size: 11px;
  }
  
  .mosaic-tile-enhanced .tile-count {
    font-size: 13px;
    padding: 2px 6px;
    min-width: 24px;
  }

  .vertical-chart-area {
    padding: 0.75rem 0.25rem;
  }

  .chart-grid {
    gap: 0.15rem;
    min-height: 140px;
    padding: 0.4rem 0;
  }

  .chart-column {
    min-width: 18px;
    max-width: 24px;
    gap: 0.3rem;
  }

  .column-bar {
    min-height: 16px;
    padding-top: 3px;
  }

  .value-label {
    font-size: 0.6rem;
  }

  .axis-label {
    font-size: 0.5rem;
    padding: 0.15rem 0.05rem;
  }
}

@media (max-width: 480px) {
  .chart-grid {
    gap: 0.1rem;
    min-height: 120px;
    padding: 0.3rem 0;
  }

  .chart-column {
    min-width: 16px;
    max-width: 22px;
  }

  .column-bar {
    min-height: 14px;
    padding-top: 2px;
  }

  .value-label {
    font-size: 0.55rem;
  }

  .axis-label {
    font-size: 0.45rem;
    padding: 0.1rem 0.03rem;
  }

  .title-icon {
    width: 36px;
    height: 36px;
  }

  .chart-title-bar h3 {
    font-size: 1rem;
  }
  
  .main-title {
    font-size: 1.2rem;
  }
  
  .title-subtitle {
    font-size: 0.8rem;
  }
  
  .sports-title-icon {
    width: 42px;
    height: 42px;
  }

  .facility-count {
    font-size: 0.75rem;
    padding: 0.3rem 0.6rem;
  }
}

/* Sports Tooltip Styles */
.sports-tooltip {
  position: fixed;
  z-index: 1000;
  pointer-events: none;
  transform: translateX(-50%) translateY(-100%);
  margin-top: -8px;
  animation: tooltipFadeIn 0.2s ease-out;
}

@keyframes tooltipFadeIn {
  from { 
    opacity: 0; 
    transform: translateX(-50%) translateY(-100%) scale(0.9);
  }
  to { 
    opacity: 1; 
    transform: translateX(-50%) translateY(-100%) scale(1);
  }
}

.tooltip-content {
  background: rgba(15, 23, 42, 0.95);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-width: fit-content;
  max-width: 300px;
  text-align: center;
  word-break: keep-all;
  overflow-wrap: normal;
}
</style>
