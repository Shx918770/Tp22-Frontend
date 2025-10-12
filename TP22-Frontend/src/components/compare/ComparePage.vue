<template>
  <div class="compare-page">

    <!-- return button -->
    <button class="back-btn" @click="$router.push('/')">← Back to Homepage</button>

    <div class="dynamic-background">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </div>

    <main class="main-content">
      <section class="compare-hero">
        <h1 class="page-title">
          Compare Suburbs Side-by-Side
        </h1>
        <p class="page-description">
          Make confident housing decisions by comparing sustainability metrics
          between different Melbourne suburbs.
        </p>
      </section>

      <section class="compare-section">
        <div class="compare-box">
          <div class="suburb-select">
            <label>First Suburb</label>
            <select v-model="firstSuburb">
              <option disabled value="">Select first suburb...</option>
              <option v-for="s in suburbs" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>

          <div class="vs">VS</div>

          <div class="suburb-select">
            <label>Second Suburb</label>
            <select v-model="secondSuburb">
              <option disabled value="">Select second suburb...</option>
              <option v-for="s in suburbs" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
        </div>

        <button class="compare-btn" :disabled="!firstSuburb || !secondSuburb" @click="handleCompareClick">
          ⚖️ Compare Suburbs
        </button>
      </section>

      <p class="tip-text">💡 Tip: Click suburb names below to view their Social Insights</p>
      <section v-if="result" class="result-table">
        <div class="result-wrapper">
          <div class="table-row header">
            <div class="cell empty"></div>
            <div class="cell suburb clickable" 
              @click="goToSocial(firstSuburb)" 
              title="Go to social insights"
            >
              {{ firstSuburb }}
            </div>
            <div class="cell suburb clickable"
              @click="goToSocial(secondSuburb)"
              title="Go to social insights"
              >
              {{ secondSuburb }}
            </div>
          </div> 
          <div
            v-for="(metric, index) in metrics"
            :key="'main-' + index"
            class="table-row"
          >
            <div class="cell label">
              {{ metric.icon }} {{ metric.label }}
            </div>
            <div class="cell">
              {{ result[firstSuburb][metric.key] ?? "-" }}
            </div>
            <div class="cell">
              {{ result[secondSuburb][metric.key] ?? "-" }}
            </div>
          </div>
          <div v-if="!showDetails" class="show-more-row">
            <button class="show-more-btn" @click="showDetails = true">
              ↓ Show More Details
            </button>
          </div>

          <div v-else class="show-more-row">
            <button class="show-more-btn" @click="showDetails = false">
              ↑ Hide Details
            </button>
          </div>
          <template v-if="showDetails">
            <div
              v-for="(metric, index) in detailMetrics"
              :key="'detail-' + index"
              class="table-row detail-row"
            >
              <div class="cell label small">
                {{ metric.icon }} {{ metric.label }}
              </div>
              <div class="cell">{{ result[firstSuburb][metric.key] ?? "-" }}</div>
              <div class="cell">{{ result[secondSuburb][metric.key] ?? "-" }}</div>
            </div>
          </template>
        </div>
      </section>

      <!-- AI result-->
      <section v-if="aiResult.length" class="ai-result-section">
        <h2 class="ai-title">🤖 AI Comparison Result</h2>
        <ul class="ai-points">
          <li v-for="(point, i) in aiResult" :key="i">{{ point }}</li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
import { infrastructureApi, environmentApi, socialApi, schoolApi, childCareApi, healthApi, recreationApi, hospitalityApi,apiUtils, aiApi } from "@/services/api.js";

export default {
  name: "ComparePage",
  data() {
    return {
      firstSuburb: "",
      secondSuburb: "",
      suburbs: [
        "Carlton",
        "Parkville",
        "East Melbourne",
        "West Melbourne",
        "North Melbourne",
        "Kensington",
        "Docklands",
        "South Yarra",
        "Southbank",
        "Melbourne"
      ],
      result: null,
      aiResult:[],
      loading: false,

      metrics: [
        {key: "environment", label: "Environment Score", icon: "🌿" },
        {key: "social", label: "Social Score", icon: "🚋"},
        { key: "infrastructure", label: "Infrastructure Score", icon: "🚧" },
      ],

      detailMetrics: [
        { group: "infrastructure", key: "tramStops", label: "Tram Stops", icon: "🚋" },
        { group: "infrastructure", key: "trainStations", label: "Train Stations", icon: "🚆" },
        { group: "infrastructure", key: "busStops", label: "Bus Stops", icon: "🚌" },
        { group: "infrastructure", key: "bikeLanes", label: "Bike Lanes", icon: "🚴" },
        { group: "infrastructure", key: "parking", label: "Parking", icon: "🅿️" },
        { group: "environment", key: "numberOfTree", label: "NumberOfTree", icon: "🌳"},
        { group: "environment", key: "aqi", label: "AQI", icon: "🌬️"},
        { group: "environment", key: "ses", label: "SES", icon: "⚡"},
        { group: "social", key: "schools", label: "Schools", icon: "🏫" },
        { group: "social", key: "childcare", label: "Childcare", icon: "🧸" },
        { group: "social", key: "hospitals", label: "Hospitals", icon: "🏥" },
        { group: "social", key: "practitioners", label: "Practitioners", icon: "🩺" },
        { group: "social", key: "playgrounds", label: "Playgrounds", icon: "🎠" },
        { group: "social", key: "communityCenters", label: "Community Centers", icon: "🏛️" },
        { group: "social", key: "cafes", label: "Cafes & Restaurants", icon: "☕" },
        { group: "social", key: "bars", label: "Bars", icon: "🍸" },
      ],
      showDetails: false,
    };
  },
  methods: {

    async loadEnvironmentScore(suburb) {
      try {
        const res = await environmentApi.getEnvironmentScore(suburb)
        const data = res.data?.data
        return data?.environment_score ?? null
      } catch (e) {
        console.error("❌ Failed to load environment score:", e)
        return null
      }
    },

    async loadSocialScore(suburb) {
      try {
        const res = await socialApi.getSocialScore(suburb);
        const data = res.data?.data;
        console.log("📊 Social API result:", data);
        return (
          data?.social_sustainability_score ??
          data?.socialSustainabilityScore ??
          data?.score ?? // ✅ 加上这个
          null
        );
      } catch (e) {
        console.error("❌ Failed to load social score:", e);
        return null;
      }
    },

    async loadInfrastructureScore(suburb) {
      try {
        const res = await infrastructureApi.getInfrastructureScore(suburb)
        const data = res.data?.data
        // 你的后端返回的是 data: [ { suburb, infrastructure_sustainability_score, insight } ]
        if (Array.isArray(data) && data.length > 0)
          return data[0].infrastructure_sustainability_score
        return null
      } catch (e) {
        console.error("❌ Failed to load infrastructure score:", e)
        return null
      }
    },

    async loadTransportData(suburb) {
      try {
        const res = await infrastructureApi.getTransportStats(suburb);
        const rows = apiUtils.extractData(res).data || [];
        return {
          trainStations: rows.filter(r => /(TRAIN)/i.test(r.MODE)).length,
          tramStops: rows.filter(r => /(TRAM)/i.test(r.MODE)).length,
          busStops: rows.filter(r => /(BUS|COACH)/i.test(r.MODE)).length
        };
      } catch (e) {
        console.error("Load failed:", e);
        return { trainStations: 0, tramStops: 0, busStops: 0 };
      }
    },
    async loadCyclingData(suburb) {
      try {
        const [statsRes, lengthRes] = await Promise.all([
          infrastructureApi.getCyclingStats(suburb),
          infrastructureApi.getCyclingLenth(suburb),
        ]);

        const statsRows = apiUtils.extractData(statsRes).data || [];
        const totalKm = lengthRes?.data?.bike_km_total ?? 0;

        return {
          bikeLanes: totalKm || statsRows.length || 0,
        };
      } catch (e) {
        console.error("Cycling data load failed:", e);
        return { bikeLanes: 0 };
      }
    },
    async loadParkingData(suburb) {
      try {
        const res = await infrastructureApi.getParkingStats(suburb);
        const rows = apiUtils.extractData(res).data || [];
        return {
          parking: rows.length || 0,
        };
      } catch (e) {
        console.error("Parking data load failed:", e);
        return { parking: 0 };
      }
    },
    async loadEnvironmentData(suburb) {
      try {
        const [treeRes, airRes, energyRes] = await Promise.all([
          environmentApi.getTreeCardBySuburb(suburb),
          environmentApi.getAirBySuburb(suburb),
          environmentApi.getEnergyCardBySuburb(suburb),
        ]);

        return {
          numberOfTree: treeRes?.data?.data?.score ?? 0,
          aqi: airRes?.data?.data?.score ?? 0,
          ses: energyRes?.data?.data?.score ?? 0,
        };
      } catch (e) {
        console.error("Environment data load failed:", e);
        return { numberOfTree: 0, aqi: 0, ses: 0 };
      }
    },
    
    async loadSocialData(suburb) {
      try {
        console.log("🔍 Loading social data for:", suburb);

        const [
          schoolsRes,
          childcareRes,
          hospitalRes,
          practitionerRes,
          cafeRes,
          barRes,
          playgroundRes,
          communityRes
        ] = await Promise.all([
          schoolApi.getSchoolsBySuburb(suburb),
          childCareApi.getChildCareBySuburb(suburb),
          healthApi.getHospitals(suburb),
          healthApi.getPractitioners(suburb),
          hospitalityApi.getCafesBySuburb(suburb),
          hospitalityApi.getBarsBySuburb(suburb),
          recreationApi.getPlaygroundsBySuburb(suburb),
          recreationApi.getCommunityCentersBySuburb(suburb)
        ]);

        return {
          schools: apiUtils.extractData(schoolsRes).data?.length || 0,
          childcare: apiUtils.extractData(childcareRes).data?.length || 0,
          hospitals: apiUtils.extractData(hospitalRes).data?.length || 0,
          practitioners: apiUtils.extractData(practitionerRes).data?.length || 0,
          cafes: apiUtils.extractData(cafeRes).data?.length || 0,
          bars: apiUtils.extractData(barRes).data?.length || 0,
          playgrounds: apiUtils.extractData(playgroundRes).data?.length || 0,
          communityCenters: apiUtils.extractData(communityRes).data?.length || 0
        };
      } catch (e) {
        console.error("❌ Social data load failed:", e);
        return {
          schools: 0,
          childcare: 0,
          hospitals: 0,
          practitioners: 0,
          cafes: 0,
          bars: 0,
          playgrounds: 0,
          communityCenters: 0
        };
      }
    },

    async handleCompareClick() {
      await this.compareSuburbs();
      await this.getAIComparison();
    },

    async compareSuburbs() {
      this.loading = true;
      this.result = null;
      try {
        const [first, second] = await Promise.all([
          this.aggregateAllData(this.firstSuburb),
          this.aggregateAllData(this.secondSuburb)
        ]);
        this.result = {
          [this.firstSuburb]: first,
          [this.secondSuburb]: second
        };
        console.log("Compare result:", this.result);
      } catch (e){
        console.error("Compare failed:", e);
      } finally {
        this.loading = false;
      }
    },

    async aggregateAllData(suburb) {
      const [
        envScore,
        socScore,
        infraScore,
        transport,
        cycling,
        parking,
        environment,
        social
      ] = await Promise.all([
        this.loadEnvironmentScore(suburb),
        this.loadSocialScore(suburb),
        this.loadInfrastructureScore(suburb),
        this.loadTransportData(suburb),
        this.loadCyclingData(suburb),
        this.loadParkingData(suburb),
        this.loadEnvironmentData(suburb),
        this.loadSocialData(suburb),
      ]);

      return {
        environment: envScore,
        social: socScore,
        infrastructure: infraScore,
        ...transport,
        ...cycling,
        ...parking,
        ...environment,
        ...social,
      };
    },

    async getAIComparison() {
      this.aiResult = ["Thinking... 🤔"];
      try {
        const prompt = `Compare ${this.firstSuburb} and ${this.secondSuburb} in terms of social, infrastructure, and environmental sustainability.`;
        const res = await aiApi.chat(prompt);
        const rawText = res.data.reply || "";

        this.aiResult = rawText
          .replace(/\*\*/g, "")
          .replace(/\*/g, "")
          .split(/\r?\n/)
          .map(line => line.trim())
          .filter(line => line.length > 0);
      } catch (err) {
        console.error("AI compare failed:", err);
        this.aiResult = ["❌ AI comparison failed. Please try again later."];
      }
    },
    goToSocial(suburb){
      this.$router.push(`/social?suburb=${encodeURIComponent(suburb)}`);
    },
  }
};
</script>

<style scoped>
.compare-page {
  font-family: "Inter", sans-serif;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f6fcf6, #ffffff);
  text-align: center;
  position: relative;
}

/* back button */
.back-btn {
  position: absolute;
  top: 20px;
  left: 25px;
  background: none;
  border: 2px solid #4caf50;
  color: #4caf50;
  font-weight: 600;
  font-size: 15px;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.back-btn:hover {
  background: #4caf50;
  color: white;
}

/* title and subtitle */
.page-title {
  font-size: 3rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1rem;
  padding-top: 50px;
}
.page-title .coming {
  color: #4caf50;
  font-size: 1.5rem;
  margin-left: 8px;
}
.page-description {
  color: #555;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  text-align: left;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

/* compare section */
.compare-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}
.compare-box {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 4rem;
}
.suburb-select label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.4rem;
}
.suburb-select select {
  width: 220px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
}
.vs {
  background: #4caf50;
  color: white;
  font-weight: 700;
  font-size: 18px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.compare-btn {
  background: #4caf50;
  color: white;
  border: none;
  padding: 12px 40px;
  border-radius: 10px;
  font-size: 17px;
  font-weight: 600;
  margin-top: 2rem;
  cursor: pointer;
}
.compare-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.result-table {
  margin-top: 3.5rem;
  display: flex;
  justify-content: flex-start;
}

.result-wrapper {
  display: grid;
  grid-template-columns: 100px 250px 460px;
  column-gap: 4rem;
  align-items: center;
  max-width: 820px;
  margin-left: calc(50% - 490px);
}

.table-row {
  display: contents;
}
.header {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.cell {
  text-align: center;
  font-size: 1.05rem;
  padding: 0.6rem 0;
  padding-right: 20px;
}

.cell.label {
  text-align: left;
  font-weight: 600;
  color: #333;
  padding-left: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.cell.suburb {
  color: #1b5e20;
  font-weight: 700;
  font-size: 1.15rem;
}

@media (max-width: 900px) {
  .result-wrapper {
    margin-left: 0;
    justify-content: center;
    grid-template-columns: 1fr 1fr 1fr;
  }
}

/* detail part style */
.detail-row .cell.label.small {
  font-size: 0.95rem;
  font-weight: 500;
  padding-left: 25px;
  color: #555;
}

/* show more detail button */
.show-more-row {
  grid-column: 1 / span 3;
  text-align: right;
  margin-top: 0.8rem;
  margin-bottom: 0.5rem;
}
.show-more-btn {
  background: none;
  border: 1.5px solid #4caf50;
  color: #4caf50;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.show-more-btn:hover {
  background: #4caf50;
  color: white;
}


/* ai part */
.ai-result-section {
  margin-top: 3rem;
  text-align: left;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: 2rem;
  border-radius: 12px;
  background: #f9fcf9;
  border: 1px solid #d4ecd4;
}
.ai-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1b5e20;
  margin-bottom: 1rem;
}
.ai-points {
  list-style-type: "🌿 ";
  line-height: 1.8;
  color: #333;
  font-size: 1.05rem;
}
.ai-points li {
  margin-bottom: 0.4rem;
}
</style>