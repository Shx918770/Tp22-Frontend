<template>
  <div class="facilities-header">
    <div class="total-counter">
      <div class="counter-number">
        {{ score?.value ? score.value.toFixed(1) + '/100' : '--' }}
      </div>
      <div class="counter-label">
        {{ label }}
        <button
          v-if="score?.reason"
          class="info-icon"
          @click="$emit('show-info')"
          title="Click to see explanation"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path
              d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="header-subtitle">
      <span v-if="suburb">{{ suburb }}'s {{ label.toLowerCase() }} performance</span>
      <span v-else>Discover Melbourne's {{ label.toLowerCase() }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoreHeader',
  props: {
    score: {
      type: Object,
      default: () => ({ value: null, reason: null })
    },
    suburb: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Overall Score'
    }
  }
}
</script>

<style scoped>
.facilities-header {
  text-align: center;
  margin-bottom: 1.2rem;
}

.total-counter {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95));
  backdrop-filter: blur(30px);
  border-radius: 40px;
  padding: 0.6rem 1.2rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 0.5rem;
  animation: counterBounce 3s ease-in-out infinite;
}

@keyframes counterBounce {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
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
  0% { filter: brightness(1); }
  100% { filter: brightness(1.2); }
}

.counter-label {
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  color: #2c3e50;
}

.header-subtitle {
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
}

.info-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  border-radius: 50%;
  color: #6b7280;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-icon:hover {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  transform: scale(1.1);
}
</style>
