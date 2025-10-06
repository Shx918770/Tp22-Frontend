<template>
  <div class="radial-wrap">
    <div ref="chartEl" class="radial-chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'RadialRingsChart',
  props: {
    // 由“外→内”的顺序传入：[{ name, value, color }]
    items: { type: Array, default: () => [] },
    sweepDeg:   { type: Number, default: 270 }, // 显示角度范围
    startAngle: { type: Number, default: 90 },  // 0° 在正上
    // ✅ 新增：是否把“数值最大”的放在最里层（默认 true）
    innerLargest: { type: Boolean, default: true }
  },
  data() {
    return { chart: null, _labelIds: [] };
  },
  mounted() {
    this.render();
    window.addEventListener('resize', this.onResize, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
    this.chart?.dispose();
  },
  watch: {
    items: { deep: true, handler() { this.render(); } },
    sweepDeg() { this.render(); },
    startAngle() { this.render(); },
    innerLargest() { this.render(); }
  },
  methods: {
    onResize() {
      if (!this.chart) return;
      this.chart.resize();
      this.positionLabels();
    },

    render() {
      const el = this.$refs.chartEl;
      if (!el) return;
      if (this.chart) { this.chart.dispose(); this.chart = null; }
      const chart = this.chart = echarts.init(el);

      // —— 数据预处理
      let itemsOuterIn = (this.items || []).map(it => ({
        name: String(it?.name ?? ''),
        value: Number(it?.value ?? 0),
        color: it?.color || '#9CA3AF'
      }));

      // ✅ 让“最大值在最里层”
      // 组件约定：props 为“外→内”，所以升序即可使最大值位于数组末尾（=最里层）
      if (this.innerLargest) {
        itemsOuterIn = itemsOuterIn.sort((a, b) => a.value - b.value);
      }

      // echarts 的半径类目是由内到外，因此反转数据
      const itemsRev = [...itemsOuterIn].reverse();

      // ✅ 最大值线性映射到 sweepDeg（保证“最大=270°”）
      const maxV = Math.max(1, ...itemsOuterIn.map(it => it.value));
      const toAngle = v => (Math.max(0, v) / maxV) * this.sweepDeg;

      const radiusCats = itemsRev.map((_, i) => `${i}`);
      const data = itemsRev.map(it => ({
        value: toAngle(it.value),
        itemStyle: { color: it.color },
        name: it.name
      }));

      const total = itemsOuterIn.reduce((s, it) => s + (Number(it.value) || 0), 0);

      chart.setOption({
        backgroundColor: '#2B3150',
        polar: { radius: ['10%','92%'], center: ['45%','50%'] },

        // 角度轴作为数值映射，不显示射线
        angleAxis: {
          type: 'value',
          startAngle: this.startAngle,
          min: 0, max: this.sweepDeg,
          clockwise: true,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          splitLine: { show: false }
        },

        radiusAxis: {
          type: 'category',
          data: radiusCats,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          splitLine: { show: true, lineStyle: { color: 'rgba(255,255,255,0.10)' } }
        },

        tooltip: {
          show: true,
          formatter: (p) => {
            const it = itemsRev[p.dataIndex];
            const raw = itemsOuterIn.find(o => o.name === it.name)?.value ?? 0;
            return `${it.name}: <b>${raw}</b>`;
          }
        },

        series: [{
          type: 'bar',
          coordinateSystem: 'polar',
          roundCap: true,
          barWidth: 14,
          barCategoryGap: '36%',
          barGap: '36%',
          data,
          label: { show: false }
        }],

        // 中心总数
        graphic: [{
          id: 'center-total',
          type: 'text',
          left: 'center',
          top: 'middle',
          silent: true,
          style: {
            text: `Total: ${total}`,
            fill: '#FFFFFF',
            fontWeight: 800,
            fontSize: 16,
            textAlign: 'center',
            textVerticalAlign: 'middle'
          },
          z: 1000,
          zlevel: 10,
        }]
      });

      chart.off('finished');
      chart.on('finished', () => this.drawAlignedLabels(itemsRev, radiusCats, itemsOuterIn));
    },

    drawAlignedLabels(itemsRev, radiusCats, itemsOuterIn) {
        if (!this.chart) return;

        // 1) 正确地移除旧标签（不会影响 center-total）
        if (this._labelIds.length) {
            this.chart.setOption({
            graphic: this._labelIds.map(id => ({ id, $action: 'remove' }))
            }, false, true);
            this._labelIds = [];
        }

        // 2) 计算每条环在 0° 起点的像素位置（[radiusCat, angleValue]）
        const pts = radiusCats.map(cat =>
            this.chart.convertToPixel({ polarIndex: 0 }, [cat, 0])
        );

        // 左侧对齐的锚点 x
        const xs = pts.map(p => p[0]);
        const anchorX = Math.min(...xs) - 8;

        // 3) 生成标签，简单防碰撞
        const minGap = 18;
        const labelObjs = pts
            .map((pt, i) => {
            const src = itemsRev[i];
            const val = itemsOuterIn.find(o => o.name === src.name)?.value ?? 0;
            return { i, y: pt[1], text: `${src.name} (${val})` };
            })
            .sort((a, b) => a.y - b.y);

        for (let k = 1; k < labelObjs.length; k++) {
            if (labelObjs[k].y - labelObjs[k - 1].y < minGap) {
            labelObjs[k].y = labelObjs[k - 1].y + minGap;
            }
        }

        const graphics = labelObjs.map(({ i, y, text }) => {
            const id = `ring-label-${i}`;
            this._labelIds.push(id);
            return {
            id,
            type: 'text',
            x: anchorX,
            y,
            style: {
                text,
                fill: '#fff',
                fontWeight: 700,
                fontSize: 14,
                textAlign: 'right',
                textVerticalAlign: 'middle'
            },
            z: 900
            };
        });

        // 4) 追加标签，同时“merge”中心文本，保证不被覆盖
        this.chart.setOption({
            graphic: [{ id: 'center-total', $action: 'merge' }, ...graphics]
        }, false, true);
        },

    positionLabels() {
      if (!this.chart) return;
      let itemsOuterIn = (this.items || []).map(it => ({
        name: String(it?.name ?? ''), value: Number(it?.value ?? 0), color: it?.color || '#9CA3AF'
      }));
      if (this.innerLargest) itemsOuterIn = itemsOuterIn.sort((a,b)=>a.value-b.value);
      const itemsRev = [...itemsOuterIn].reverse();
      const radiusCats = itemsRev.map((_, i) => `${i}`);
      this.drawAlignedLabels(itemsRev, radiusCats, itemsOuterIn);
    }
  }
};
</script>

<style scoped>
.radial-wrap  { width: 100%; height: 100%; }
.radial-chart { width: 100%; height: 100%; min-height: 520px; border-radius: 16px; }
</style>
