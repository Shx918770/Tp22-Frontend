<template>
  <div class="tetris-game">
    <div class="game-container">
      <div class="game-header">
        <h3 class="game-title">🎮 Eco Tetris</h3>
        <div class="game-info-row">
          <div class="info-item-compact">
            <span class="info-icon-small">🌱</span>
            <div class="info-content-compact">
              <span class="info-label-small">Trees Planted</span>
              <span class="info-value-small">{{ treesPlanted }}</span>
            </div>
          </div>
          
          <div class="next-piece-panel">
            <div class="next-piece-title">Next</div>
            <div class="next-piece-preview">
              <canvas ref="nextCanvas" width="100" height="70"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div class="game-board-wrapper">
        <div class="game-board" ref="gameBoard">
          <canvas ref="canvas" :width="COLS * BLOCK_SIZE" :height="ROWS * BLOCK_SIZE"></canvas>
          
          <div v-if="gameOver" class="game-over-overlay">
            <div class="game-over-content">
              <h2 class="game-over-title">🌍 Mission Complete!</h2>
              <div class="final-stats">
                <p class="final-stat">🌱 {{ treesPlanted }} Trees Planted</p>
              </div>
              <button class="restart-btn" @click="restartGame">Start New Mission</button>
            </div>
          </div>
        </div>
      </div>

      <div class="game-controls">
        <button class="control-btn" @click="togglePause" :class="{ active: paused && !gameOver }">
          {{ paused ? '▶️' : '⏸️' }}
        </button>
        <button class="control-btn" @click="restartGame">🔄</button>
      </div>

      <div class="game-instructions">
        <p class="instruction-title">Key board Controls:</p>
        <div class="instruction-items">
          <div class="instruction-item">
            <kbd>←</kbd><kbd>→</kbd> Move
          </div>
          <div class="instruction-item">
            <kbd>↑</kbd> Rotate
          </div>
          <div class="instruction-item">
            <kbd>↓</kbd> Drop
          </div>
          <div class="instruction-item">
            <kbd>Space</kbd> Quick Drop
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TetrisGame",
  data() {
    return {
      COLS: 10,
      ROWS: 20,
      BLOCK_SIZE: 20,
      board: [],
      currentPiece: null,
      nextPiece: null,
      linesCleared: 0,
      gameOver: false,
      paused: true,
      gameLoopId: null,
      dropCounter: 0,
      dropInterval: 1000,
      lastTime: 0,

      // Tetromino shapes
      SHAPES: {
        I: [[1, 1, 1, 1]],
        J: [[1, 0, 0], [1, 1, 1]],
        L: [[0, 0, 1], [1, 1, 1]],
        O: [[1, 1], [1, 1]],
        S: [[0, 1, 1], [1, 1, 0]],
        T: [[0, 1, 0], [1, 1, 1]],
        Z: [[1, 1, 0], [0, 1, 1]]
      },

      // Eco-themed icons for blocks
      ICONS: {
        I: '🌱',  // Seedling
        J: '🌿',  // Leaf
        L: '♻️',  // Recycle
        O: '🌳',  // Tree
        S: '💧',  // Water drop
        T: '☀️',  // Sun
        Z: '🌍'   // Earth
      },

      COLORS: {
        I: '#22c55e',  // Green
        J: '#10b981',  // Emerald
        L: '#3b82f6',  // Blue
        O: '#16a34a',  // Dark green
        S: '#06b6d4',  // Cyan
        T: '#f59e0b',  // Amber
        Z: '#8b5cf6'   // Purple
      }
    };
  },
  computed: {
    treesPlanted() {
      return this.linesCleared;
    },
    level() {
      return Math.floor(this.linesCleared / 10) + 1;
    }
  },
  mounted() {
    this.initGame();
    window.addEventListener('keydown', this.handleKeyPress);
  },
  beforeUnmount() {
    this.stopGameLoop();
    window.removeEventListener('keydown', this.handleKeyPress);
  },
  methods: {
    initGame() {
      this.board = Array.from({ length: this.ROWS }, () => 
        Array(this.COLS).fill(0)
      );
      this.linesCleared = 0;
      this.gameOver = false;
      this.paused = true;
      this.dropCounter = 0;
      this.lastTime = 0;
      this.nextPiece = this.createRandomPiece();
      this.spawnPiece();
      this.startGameLoop();
      this.draw();
      this.drawNextPiece();
    },

    startGameLoop() {
      this.stopGameLoop();
      const gameLoop = (time = 0) => {
        const deltaTime = time - this.lastTime;
        this.lastTime = time;

        if (!this.paused && !this.gameOver) {
          this.dropCounter += deltaTime;
          if (this.dropCounter > this.dropInterval) {
            this.moveDown();
          }
        }

        this.draw();
        this.gameLoopId = requestAnimationFrame(gameLoop);
      };
      this.gameLoopId = requestAnimationFrame(gameLoop);
    },

    stopGameLoop() {
      if (this.gameLoopId) {
        cancelAnimationFrame(this.gameLoopId);
        this.gameLoopId = null;
      }
    },

    createRandomPiece() {
      const shapes = Object.keys(this.SHAPES);
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      return {
        type: randomShape,
        shape: this.SHAPES[randomShape],
        color: this.COLORS[randomShape],
        icon: this.ICONS[randomShape]
      };
    },

    spawnPiece() {
      if (!this.nextPiece) {
        this.nextPiece = this.createRandomPiece();
      }
      
      this.currentPiece = {
        ...this.nextPiece,
        x: Math.floor(this.COLS / 2) - Math.floor(this.nextPiece.shape[0].length / 2),
        y: 0
      };

      this.nextPiece = this.createRandomPiece();
      this.drawNextPiece();

      if (this.checkCollision(this.currentPiece)) {
        this.gameOver = true;
        this.stopGameLoop();
      }
    },

    checkCollision(piece, offsetX = 0, offsetY = 0) {
      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (piece.shape[y][x]) {
            const newX = piece.x + x + offsetX;
            const newY = piece.y + y + offsetY;
            
            if (newX < 0 || newX >= this.COLS || newY >= this.ROWS) {
              return true;
            }
            
            if (newY >= 0 && this.board[newY][newX]) {
              return true;
            }
          }
        }
      }
      return false;
    },

    mergePiece() {
      for (let y = 0; y < this.currentPiece.shape.length; y++) {
        for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
          if (this.currentPiece.shape[y][x]) {
            const boardY = this.currentPiece.y + y;
            const boardX = this.currentPiece.x + x;
            if (boardY >= 0) {
              this.board[boardY][boardX] = {
                color: this.currentPiece.color,
                icon: this.currentPiece.icon
              };
            }
          }
        }
      }
    },

    clearLines() {
      let cleared = 0;
      
      for (let y = this.ROWS - 1; y >= 0; y--) {
        if (this.board[y].every(cell => cell !== 0)) {
          this.board.splice(y, 1);
          this.board.unshift(Array(this.COLS).fill(0));
          cleared++;
          y++; // Check the same row again
        }
      }

      if (cleared > 0) {
        this.linesCleared += cleared;
        this.dropInterval = Math.max(100, 1000 - (this.level - 1) * 100);
      }
    },

    moveDown() {
      if (!this.checkCollision(this.currentPiece, 0, 1)) {
        this.currentPiece.y++;
        this.dropCounter = 0;
      } else {
        this.mergePiece();
        this.clearLines();
        this.spawnPiece();
      }
    },

    moveLeft() {
      if (!this.checkCollision(this.currentPiece, -1, 0)) {
        this.currentPiece.x--;
      }
    },

    moveRight() {
      if (!this.checkCollision(this.currentPiece, 1, 0)) {
        this.currentPiece.x++;
      }
    },

    rotate() {
      const rotated = this.currentPiece.shape[0].map((_, i) =>
        this.currentPiece.shape.map(row => row[i]).reverse()
      );
      
      const previousShape = this.currentPiece.shape;
      this.currentPiece.shape = rotated;
      
      if (this.checkCollision(this.currentPiece)) {
        this.currentPiece.shape = previousShape;
      }
    },

    hardDrop() {
      while (!this.checkCollision(this.currentPiece, 0, 1)) {
        this.currentPiece.y++;
      }
      this.mergePiece();
      this.clearLines();
      this.spawnPiece();
      this.dropCounter = 0;
    },

    draw() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      
      // Clear canvas with light background
      ctx.fillStyle = '#f9fafb';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      for (let y = 0; y <= this.ROWS; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * this.BLOCK_SIZE);
        ctx.lineTo(this.COLS * this.BLOCK_SIZE, y * this.BLOCK_SIZE);
        ctx.stroke();
      }
      for (let x = 0; x <= this.COLS; x++) {
        ctx.beginPath();
        ctx.moveTo(x * this.BLOCK_SIZE, 0);
        ctx.lineTo(x * this.BLOCK_SIZE, this.ROWS * this.BLOCK_SIZE);
        ctx.stroke();
      }
      
      // Draw placed blocks
      for (let y = 0; y < this.ROWS; y++) {
        for (let x = 0; x < this.COLS; x++) {
          if (this.board[y][x]) {
            this.drawBlock(ctx, x, y, this.board[y][x].color, this.board[y][x].icon);
          }
        }
      }
      
      // Draw current piece
      if (this.currentPiece) {
        for (let y = 0; y < this.currentPiece.shape.length; y++) {
          for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
            if (this.currentPiece.shape[y][x]) {
              this.drawBlock(
                ctx,
                this.currentPiece.x + x,
                this.currentPiece.y + y,
                this.currentPiece.color,
                this.currentPiece.icon
              );
            }
          }
        }
      }
    },

    drawBlock(ctx, x, y, color, icon) {
      const px = x * this.BLOCK_SIZE;
      const py = y * this.BLOCK_SIZE;
      
      // Draw background
      ctx.fillStyle = color;
      ctx.fillRect(px + 1, py + 1, this.BLOCK_SIZE - 2, this.BLOCK_SIZE - 2);
      
      // Add subtle border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.strokeRect(px + 1, py + 1, this.BLOCK_SIZE - 2, this.BLOCK_SIZE - 2);
      
      // Draw icon/emoji
      if (icon) {
        ctx.font = `${this.BLOCK_SIZE - 8}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(icon, px + this.BLOCK_SIZE / 2, py + this.BLOCK_SIZE / 2);
      }
    },

    drawNextPiece() {
      const canvas = this.$refs.nextCanvas;
      if (!canvas || !this.nextPiece) return;
      
      const ctx = canvas.getContext('2d');
      
      // Clear canvas with light background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Calculate centering offset (canvas is 100x70)
      const pieceWidth = this.nextPiece.shape[0].length;
      const pieceHeight = this.nextPiece.shape.length;
      const canvasBlocksX = 5; // 100 / 20 = 5 blocks
      const canvasBlocksY = 3.5; // 70 / 20 = 3.5 blocks
      const offsetX = (canvasBlocksX - pieceWidth) * this.BLOCK_SIZE / 2;
      const offsetY = (canvasBlocksY - pieceHeight) * this.BLOCK_SIZE / 2;
      
      // Draw next piece
      for (let y = 0; y < this.nextPiece.shape.length; y++) {
        for (let x = 0; x < this.nextPiece.shape[y].length; x++) {
          if (this.nextPiece.shape[y][x]) {
            this.drawBlock(
              ctx,
              x + offsetX / this.BLOCK_SIZE,
              y + offsetY / this.BLOCK_SIZE,
              this.nextPiece.color,
              this.nextPiece.icon
            );
          }
        }
      }
    },

    handleKeyPress(event) {
      if (this.gameOver || this.paused) {
        if (event.key === 'Enter' && this.gameOver) {
          this.restartGame();
        }
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          this.moveLeft();
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.moveRight();
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.moveDown();
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.rotate();
          break;
        case ' ':
          event.preventDefault();
          this.hardDrop();
          break;
      }
    },

    togglePause() {
      if (!this.gameOver) {
        this.paused = !this.paused;
      }
    },

    restartGame() {
      this.stopGameLoop();
      this.initGame();
    }
  }
};
</script>

<style scoped>
.tetris-game {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.game-container {
  width: 420px;
  height: fit-content;
  background: white;
  border: 3px solid #d1fae5;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 10px 40px rgba(34, 197, 94, 0.12);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
}

.game-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.game-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #166534;
  margin: 0;
  text-align: center;
  letter-spacing: -0.02em;
}

.game-info-row {
  display: flex;
  gap: 0.75rem;
  align-items: stretch;
}

.info-item-compact {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
  padding: 0.65rem 1rem;
  border-radius: 12px;
  border: 2px solid #86efac;
  transition: all 0.3s ease;
  flex: 1 1 auto;
  min-width: 0;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.1);
}

.info-item-compact:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
  border-color: #22c55e;
}

.info-icon-small {
  font-size: 1.75rem;
  line-height: 1;
  flex-shrink: 0;
}

.info-content-compact {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.info-label-small {
  font-size: 0.65rem;
  font-weight: 700;
  color: #166534;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.info-value-small {
  font-size: 1.5rem;
  font-weight: 900;
  color: #14532d;
  line-height: 1;
}

.game-board-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-board {
  position: relative;
  background: white;
  border-radius: 0;
  overflow: hidden;
  box-shadow: inset 0 0 0 2px #e5e7eb;
}

canvas {
  display: block;
}

.next-piece-panel {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
  padding: 0.65rem 0.85rem;
  border-radius: 12px;
  border: 2px solid #86efac;
  flex-shrink: 0;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.1);
  align-items: center;
}

.next-piece-panel:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
  border-color: #22c55e;
}

.next-piece-title {
  font-size: 0.65rem;
  font-weight: 700;
  color: #166534;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.next-piece-preview {
  width: 100px;
  height: 70px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 0 1px #e5e7eb;
}

.game-over-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  z-index: 10;
}

.game-over-content {
  text-align: center;
  padding: 2rem 1.5rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(34, 197, 94, 0.15);
  border: 3px solid #86efac;
}

.game-over-title {
  font-size: 1.75rem;
  font-weight: 900;
  color: #166534;
  margin: 0 0 1.25rem 0;
}

.final-stats {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.final-stat {
  font-size: 1.1rem;
  font-weight: 700;
  color: #14532d;
  margin: 0;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
  border-radius: 10px;
  border: 2px solid #86efac;
}

.restart-btn {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  border: none;
  padding: 0.85rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(34, 197, 94, 0.3);
}

.restart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
}

.game-controls {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-top: -0.25rem;
}

.control-btn {
  background: white;
  border: 2px solid #86efac;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.1);
}

.control-btn:hover {
  background: #f0fdf4;
  border-color: #22c55e;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
}

.control-btn.active {
  background: #dcfce7;
  border-color: #16a34a;
}

.game-instructions {
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
  padding: 0.85rem;
  border-radius: 12px;
  border: 2px solid #86efac;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.1);
  margin-top: -0.25rem;
}

.instruction-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: #166534;
  margin: 0 0 0.65rem 0;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.instruction-items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.instruction-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #166534;
}

kbd {
  background: white;
  border: 2px solid #cbd5e1;
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  font-family: monospace;
  color: #1e293b;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
</style>

