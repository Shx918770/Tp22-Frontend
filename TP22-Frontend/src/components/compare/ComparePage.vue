<template>
  <div class="compare-page">

    <!-- return button -->
    <button class="back-btn" @click="$router.push('/')">← Back to Home</button>

    <!-- 动态背景 -->
    <div class="dynamic-background">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </div>

    <main class="main-content">
      <!-- 标题 -->
      <section class="compare-hero">
        <h1 class="page-title">
          Compare Suburbs Side-by-Side
          <span class="coming">(Coming soon)</span>
        </h1>
        <p class="page-description">
          Make confident housing decisions by comparing sustainability metrics
          between different Melbourne suburbs.
        </p>
      </section>

      <!-- 对比模块 -->
      <section class="compare-section">
        <div class="compare-box">
          <!-- 左 -->
          <div class="suburb-select">
            <label>First Suburb</label>
            <select v-model="firstSuburb">
              <option disabled value="">Select first suburb...</option>
              <option v-for="s in suburbs" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>

          <!-- 中 -->
          <div class="vs">VS</div>

          <!-- 右 -->
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

      <!-- 展示结果 -->
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

          <div class="table-row">
            <div class="cell label">🚋 Tram</div>
            <div class="cell">{{ result[firstSuburb].tramStops }}</div>
            <div class="cell">{{ result[secondSuburb].tramStops }}</div>
          </div>

          <div class="table-row">
            <div class="cell label">🚆 Train</div>
            <div class="cell">{{ result[firstSuburb].trainStations }}</div>
            <div class="cell">{{ result[secondSuburb].trainStations }}</div>
          </div>

          <div class="table-row">
            <div class="cell label">🚌 Bus</div>
            <div class="cell">{{ result[firstSuburb].busStops }}</div>
            <div class="cell">{{ result[secondSuburb].busStops }}</div>
          </div>
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
import Header from "@/components/header/Header.vue";
import { infrastructureApi, apiUtils,aiApi } from "@/services/api.js";

export default {
  name: "ComparePage",
  components: { Header },
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
      loading: false
    };
  },
  methods: {
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

    async handleCompareClick() {
      await this.compareSuburbs();
      await this.getAIComparison();
    },

    async compareSuburbs() {
      this.loading = true;
      this.result = null;
      try {
        const [first, second] = await Promise.all([
          this.loadTransportData(this.firstSuburb),
          this.loadTransportData(this.secondSuburb)
        ]);
        this.result = {
          [this.firstSuburb]: first,
          [this.secondSuburb]: second
        };
      } finally {
        this.loading = false;
      }
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