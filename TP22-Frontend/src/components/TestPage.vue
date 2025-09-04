<template>
  <div class="wrap">
    <h1>AQI by Suburb</h1>

    <div class="topbar">
      <input
        list="suburbs"
        type="text"
        v-model="query"
        placeholder="Type a suburb (e.g., Carlton, Docklands)"
        @keyup.enter="load"
      />
      <datalist id="suburbs">
        <option>Carlton</option>
        <option>Docklands</option>
        <option>Southbank</option>
        <option>Port Melbourne</option>
        <option>North Melbourne</option>
      </datalist>
      <button :disabled="busy || !query.trim()" @click="load">Search</button>
      <span v-if="busy" class="sub">Loading…</span>
      <span v-if="error" class="error">{{ error }}</span>
    </div>

    <div v-if="data" class="grid">
      <!-- 左侧卡片 -->
      <div class="card">
        <div class="title">{{ data.city?.name || 'Suburb' }}</div>
        <div class="sub">{{ data.time?.iso || data.time?.s || '' }}</div>
        <div class="aqi">{{ data.aqi ?? '--' }}</div>
        <div class="row" style="margin-top:6px">
          <span class="pill">Dominant: {{ (data.dominentpol || '--').toUpperCase() }}</span>
          <span class="pill" :class="aqiClass">{{ 'Status: ' + aqiCategory.label }}</span>
        </div>
        <div class="row" style="margin-top:12px">
          <div class="kpi" v-for="key in ['pm25','pm10','no2','o3']" :key="'p-'+key">
            <div class="sub">{{ key.toUpperCase() }}</div>
            <b>{{ data.iaqi?.[key]?.v ?? '--' }}</b>
          </div>
        </div>
        <div class="row" style="margin-top:12px">
          <div class="kpi" v-for="(label,key) in weatherKeys" :key="'w-'+key">
            <div class="sub">{{ label }}</div>
            <b>{{ data.iaqi?.[key]?.v ?? '--' }}</b>
          </div>
        </div>
        <footer v-if="data.attributions?.length">
          Data:
          <template v-for="(a,i) in data.attributions" :key="i">
            <a :href="a.url" target="_blank" rel="noopener">{{ a.name }}</a>
            <span v-if="i < data.attributions.length-1">, </span>
          </template>
        </footer>
      </div>

      <!-- 右侧卡片 -->
      <div class="card">
        <div class="title">7-Day Forecast</div>
        <canvas id="forecastChart" height="200"></canvas>
      </div>
    </div>

    <div v-else class="sub">Choose a suburb to see AQI.</div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from "vue";
import { Chart } from "chart.js/auto";


const API_BASE = "`https://api.waqi.info/feed/@10141/?token=f326afc82f347d77ccf849012a8a41887df86caf`";

const query = ref("");
const busy = ref(false);
const error = ref("");
const raw = ref(null);
const chart = ref(null);

const weatherKeys = {
  t: "Temp (°C)",
  h: "Humidity (%)",
  w: "Wind (m/s)",
  p: "Pressure (hPa)",
};

const data = computed(() => raw.value?.data || null);

const aqiCategory = computed(() => {
  const aqi = data.value?.aqi;
  if (aqi == null) return { label: "Unknown", cls: "" };
  if (aqi <= 50) return { label: "Good", cls: "ok" };
  if (aqi <= 100) return { label: "Moderate", cls: "warn" };
  return { label: "Unhealthy", cls: "bad" };
});

const aqiClass = computed(() => aqiCategory.value.cls);

async function load() {
  error.value = "";
  busy.value = true;
  raw.value = null;
  try {
    const url = `${API_BASE}/aqi?suburb=${encodeURIComponent(query.value.trim())}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    raw.value = await res.json();
    drawForecast();
  } catch (e) {
    console.error(e);
    error.value = "Could not load AQI for that suburb. Check name or try again.";
  } finally {
    busy.value = false;
  }
}

function drawForecast() {
  const d = data.value;
  const ctx = document.getElementById("forecastChart");
  if (!d?.forecast?.daily) {
    destroyChart();
    return;
  }

  const pm25 = d.forecast.daily.pm25 || [];
  const pm10 = d.forecast.daily.pm10 || [];

  const labels = (pm25.length ? pm25 : pm10).map((x) => x.day);
  const ds = [];
  if (pm25.length) {
    ds.push({ label: "PM2.5 avg", data: pm25.map((x) => x.avg), tension: 0.2 });
  }
  if (pm10.length) {
    ds.push({ label: "PM10 avg", data: pm10.map((x) => x.avg), tension: 0.2 });
  }

  destroyChart();
  chart.value = new Chart(ctx, {
    type: "line",
    data: { labels, datasets: ds },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom" } },
      scales: { x: { ticks: { maxRotation: 0 } }, y: { beginAtZero: true } },
    },
  });
}

function destroyChart() {
  if (chart.value) {
    chart.value.destroy();
    chart.value = null;
  }
}

onBeforeUnmount(() => destroyChart());
</script>

<style scoped>
/* 直接用你原来的 CSS */
:root {
  --bg: #f6f8fb;
  --card: #fff;
  --text: #111;
  --muted: #6b7280;
  --ok: #2e7d32;
  --warn: #ef6c00;
  --bad: #c62828;
}
* {
  box-sizing: border-box;
}
.wrap {
  max-width: 1080px;
  margin: 24px auto;
  padding: 0 16px;
}
h1 {
  font-size: 22px;
  margin: 0 0 12px;
}
.topbar {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
input[type="text"] {
  width: 320px;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  outline: none;
}
button {
  padding: 10px 14px;
  border-radius: 12px;
  border: none;
  background: #111;
  color: #fff;
  cursor: pointer;
}
button:disabled {
  opacity: 0.5;
  cursor: default;
}
.grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
.card {
  background: var(--card);
  border-radius: 16px;
  padding: 16px 18px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
}
.title {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 10px;
}
.sub {
  color: var(--muted);
  font-size: 13px;
}
.aqi {
  font-size: 46px;
  font-weight: 800;
  margin: 10px 0 0;
}
.row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: flex-end;
}
.pill {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  background: #eef2f7;
}
.kpi {
  min-width: 120px;
}
.kpi b {
  display: block;
  font-size: 18px;
}
.ok {
  color: var(--ok);
}
.warn {
  color: var(--warn);
}
.bad {
  color: var(--bad);
}
footer {
  margin-top: 10px;
  color: var(--muted);
  font-size: 12px;
}
.error {
  color: var(--bad);
}
canvas {
  background: #fff;
  border-radius: 16px;
  padding: 8px;
}
</style>