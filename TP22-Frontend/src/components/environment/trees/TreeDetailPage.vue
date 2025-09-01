<template>
  <div class="tree-detail-page">
    <!-- Left panel: Map -->
    <div class="left-panel">
      <h2>Tree Distribution Map</h2>
      <l-map style="height: 400px; width: 100%;" :zoom="13" :center="mapCenter">
        <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer>

        <l-circle-marker
            v-for="tree in trees"
            :key="tree.id"
            :lat-lng="[tree.lat, tree.lon]"
            :radius="6"
            color="green"
        >
        </l-circle-marker>
        </l-map>
    </div>

    <!-- Right panel -->
    <div class="right-panel">
      <!-- Top: Species List -->
      <div class="species-list">
        <h3>Tree Species in {{ suburb }}</h3>
        <ul>
            <li v-for="(count, species) in speciesCount" :key="species">
            {{ species }} - {{ count }}
            </li>
        </ul>
      </div>

      <!-- Bottom: Trend Chart -->
      <div class="trend-chart">
        <h3>Life Expectancy Trends</h3>
        <div class="chart-placeholder">[Trend chart will be here]</div>
      </div>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LCircleMarker } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png"
});

export default {
  name: "TreeDetailPage",
  components: { LMap, LTileLayer, LCircleMarker },
  data() {
    return {
      suburb: this.$route.query.suburb || "Unknown",
      trees: [
        { id: 1, lat: -37.81, lon: 144.96, name: "Eucalyptus" },
        { id: 2, lat: -37.815, lon: 144.97, name: "Plane Tree" }
      ],
      mapCenter: [-37.81, 144.96]
    };
  },
  computed: {
    speciesCount() {
        const counts = {};
        this.trees.forEach(tree => {
        counts[tree.name] = (counts[tree.name] || 0) + 1;
        });
        return counts;
        }
    }
};
</script>

<style scoped>
.tree-detail-page {
  display: flex;
  flex-direction: row;
  padding: 20px;
}

.left-panel {
  flex: 1;
  margin-right: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.species-list {
  border: 1px solid #ccc;
  padding: 10px;
  max-height: 200px;
  overflow-y: auto;
  word-wrap: break-word; 
}
.species-list ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.species-list li {
  margin-bottom: 5px;
}
.trend-chart {
  border: 1px solid #ccc;
  padding: 10px;
}
.map-placeholder,
.list-placeholder,
.chart-placeholder {
  height: 200px;
  background: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;
  border: 1px dashed #aaa;
}
</style>