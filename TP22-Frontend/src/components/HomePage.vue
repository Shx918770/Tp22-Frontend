<template>
  <div class="homepage">
    <!-- Header/Hero Section -->
    <header class="hero-section">
      <div class="hero-content">
        <div class="logo">
          <div class="logo-icon">🌿</div>
          <span class="logo-text">MelSustain</span>
        </div>
        <h1 class="hero-title">
          Discover Melbourne's Most 
          <span class="highlight">Sustainable Suburbs</span>
        </h1>
        <p class="hero-subtitle">
          Make informed housing decisions with comprehensive sustainability profiles and side-by-side suburb comparisons for Melbourne families.
        </p>
        <div class="hero-buttons">
          <button class="btn btn-primary">
            <span class="btn-icon">🔍</span>
            Explore Suburbs
          </button>
          <button class="btn btn-secondary">
            <span class="btn-icon">⚖️</span>
            Compare Now
          </button>
        </div>
      </div>
    </header>

    <!-- Explore Sustainable Living Section -->
    <section class="explore-section">
      <div class="container">
        <h2 class="section-title">Explore Sustainable Living</h2>
        <p class="section-description">
          Discover Melbourne's most sustainable suburbs through our comprehensive sustainability categories.
        </p>
        
        <div class="search-container">
          <div class="search-bar">
            <span class="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Enter a suburb name or sustainability feature..."
              class="search-input"
            >
            <button class="search-button">
              <span class="arrow-icon">→</span>
            </button>
          </div>
        </div>

        <div class="category-filters">
          <button class="category-btn social">
            <span class="category-icon">👥</span>
            Social
          </button>
          <button class="category-btn environment">
            <span class="category-icon">🌱</span>
            Environment
          </button>
          <button class="category-btn economic">
            <span class="category-icon">📈</span>
            Economic
          </button>
          <button class="category-btn infrastructure">
            <span class="category-icon">🏗️</span>
            Infrastructure
          </button>
        </div>
      </div>
    </section>

    <!-- Suburb Cards Section -->
    <section class="suburbs-section">
      <div class="container">
        <div class="suburb-cards">
          <div class="suburb-card">
            <div class="card-image">
              <div class="rating">⭐ 4.8</div>
            </div>
            <div class="card-content">
              <h3 class="suburb-name">Carlton</h3>
              <div class="metrics">
                <div class="metric social">
                  <span class="metric-icon">👥</span>
                  <span class="metric-text">Social 85%</span>
                </div>
                <div class="metric environment">
                  <span class="metric-icon">🌱</span>
                  <span class="metric-text">Environment 92%</span>
                </div>
                <div class="metric economic">
                  <span class="metric-icon">📈</span>
                  <span class="metric-text">Economic 88%</span>
                </div>
                <div class="metric infrastructure">
                  <span class="metric-icon">🏗️</span>
                  <span class="metric-text">Infrastructure 90%</span>
                </div>
              </div>
              <button class="view-details-btn">
                <span class="btn-icon">→</span>
                View Details
              </button>
            </div>
          </div>

          <div class="suburb-card">
            <div class="card-image">
              <div class="rating">⭐ 4.7</div>
            </div>
            <div class="card-content">
              <h3 class="suburb-name">Fitzroy</h3>
              <div class="metrics">
                <div class="metric social">
                  <span class="metric-icon">👥</span>
                  <span class="metric-text">Social 82%</span>
                </div>
                <div class="metric environment">
                  <span class="metric-icon">🌱</span>
                  <span class="metric-text">Environment 89%</span>
                </div>
                <div class="metric economic">
                  <span class="metric-icon">📈</span>
                  <span class="metric-text">Economic 85%</span>
                </div>
                <div class="metric infrastructure">
                  <span class="metric-icon">🏗️</span>
                  <span class="metric-text">Infrastructure 87%</span>
                </div>
              </div>
              <button class="view-details-btn">
                <span class="btn-icon">→</span>
                View Details
              </button>
            </div>
          </div>

          <div class="suburb-card">
            <div class="card-image">
              <div class="rating">⭐ 4.6</div>
            </div>
            <div class="card-content">
              <h3 class="suburb-name">Richmond</h3>
              <div class="metrics">
                <div class="metric social">
                  <span class="metric-icon">👥</span>
                  <span class="metric-text">Social 80%</span>
                </div>
                <div class="metric environment">
                  <span class="metric-icon">🌱</span>
                  <span class="metric-text">Environment 86%</span>
                </div>
                <div class="metric economic">
                  <span class="metric-icon">📈</span>
                  <span class="metric-text">Economic 83%</span>
                </div>
                <div class="metric infrastructure">
                  <span class="metric-icon">🏗️</span>
                  <span class="metric-text">Infrastructure 85%</span>
                </div>
              </div>
              <button class="view-details-btn">
                <span class="btn-icon">→</span>
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Compare Suburbs Section -->
    <section class="compare-section">
      <div class="container">
        <h2 class="section-title">Compare Suburbs Side-by-Side</h2>
        <p class="section-description">
          Make confident housing decisions by comparing sustainability metrics between different Melbourne suburbs.
        </p>
        
        <div class="compare-form">
          <div class="suburb-inputs">
            <div class="input-group">
              <label>First Suburb</label>
              <div class="select-wrapper">
                <select class="suburb-select">
                  <option value="">Select first suburb...</option>
                  <option value="carlton">Carlton</option>
                  <option value="fitzroy">Fitzroy</option>
                  <option value="richmond">Richmond</option>
                </select>
                <span class="select-arrow">▼</span>
              </div>
            </div>
            
            <div class="vs-divider">VS</div>
            
            <div class="input-group">
              <label>Second Suburb</label>
              <div class="select-wrapper">
                <select class="suburb-select">
                  <option value="">Select second suburb...</option>
                  <option value="carlton">Carlton</option>
                  <option value="fitzroy">Fitzroy</option>
                  <option value="richmond">Richmond</option>
                </select>
                <span class="select-arrow">▼</span>
              </div>
            </div>
          </div>
          
          <button class="compare-btn">
            <span class="btn-icon">⚖️</span>
            Compare Suburbs
          </button>
        </div>
      </div>
    </section>

    <!-- Why Choose MelSustain Section -->
    <section class="why-section">
      <div class="container">
        <h2 class="section-title">Why Choose MelSustain?</h2>
        <p class="section-description">
          Empowering Melbourne families with comprehensive sustainability data for smarter housing decisions.
        </p>
        
        <div class="feature-cards">
          <div class="feature-card">
            <div class="feature-icon">💡</div>
            <h3>Why MelSustain</h3>
            <p>
              The first comprehensive platform dedicated to Melbourne's suburban sustainability data, 
              helping families make environmentally conscious housing choices with confidence and clarity.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">⚙️</div>
            <h3>How It Works</h3>
            <p>
              Simply search for suburbs, explore detailed sustainability profiles, or compare multiple 
              locations side-by-side. Our intuitive platform makes complex environmental data accessible and actionable.
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🏠</div>
            <h3>Benefits for Families</h3>
            <p>
              Make informed decisions that align with your values. Find suburbs with excellent public transport, 
              green spaces, energy efficiency, and environmental sustainability for your family's future.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer Section -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <!-- Left Column - Branding -->
          <div class="footer-brand">
            <div class="footer-logo">
              <div class="logo-icon">🌿</div>
              <span class="logo-text">MelSustain</span>
            </div>
            <p class="footer-mission">
              Empowering Melbourne families with sustainability insights for better housing decisions.
            </p>
            <div class="social-icons">
              <a href="#" class="social-icon">🐦</a>
              <a href="#" class="social-icon">📘</a>
              <a href="#" class="social-icon">💼</a>
            </div>
          </div>

          <!-- Middle Columns - Navigation -->
          <div class="footer-nav">
            <div class="nav-column">
              <h4>Platform</h4>
              <ul>
                <li><a href="#">🔍 Search Suburbs</a></li>
                <li><a href="#">⚖️ Compare Tool</a></li>
                <li><a href="#">📊 Sustainability Metrics</a></li>
                <li><a href="#">📄 Data Sources</a></li>
              </ul>
            </div>
            
            <div class="nav-column">
              <h4>Support</h4>
              <ul>
                <li><a href="#">❓ Help Center</a></li>
                <li><a href="#">✉️ Contact Us</a></li>
                <li><a href="#">📄 Privacy Policy</a></li>
                <li><a href="#">📄 Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <!-- Right Column - Newsletter -->
          <div class="footer-newsletter">
            <h4>Connect</h4>
            <p>Stay updated with the latest sustainability insights</p>
            <div class="newsletter-form">
              <input type="email" placeholder="Your email" class="newsletter-input">
              <button class="newsletter-btn">📤</button>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>© 2025 MelSustain. All rights reserved. Made with ❤️ for Melbourne families.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      // 数据将在这里逐步添加
    }
  }
}
</script>

<style scoped>
.homepage {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
              url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><rect width="1200" height="600" fill="%23333"/><circle cx="200" cy="150" r="50" fill="%23fff" opacity="0.1"/><circle cx="1000" cy="200" r="30" fill="%23fff" opacity="0.1"/><rect x="300" y="300" width="100" height="200" fill="%23fff" opacity="0.1"/><rect x="800" y="250" width="80" height="150" fill="%23fff" opacity="0.1"/></svg>');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 2rem;
}

.hero-content {
  max-width: 800px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
}

.logo-icon {
  font-size: 2rem;
  margin-right: 0.5rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.highlight {
  color: #4CAF50;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #4CAF50;
  color: white;
}

.btn-primary:hover {
  background: #45a049;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #666;
  color: white;
}

.btn-secondary:hover {
  background: #555;
  transform: translateY(-2px);
}

.btn-icon {
  font-size: 1.2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
}

/* Explore Section */
.explore-section {
  padding: 4rem 2rem;
  background: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
}

.section-description {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.search-container {
  margin-bottom: 3rem;
}

.search-bar {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  padding: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.search-icon {
  padding: 0 1rem;
  color: #666;
  font-size: 1.2rem;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 1rem;
  font-size: 1rem;
  background: transparent;
}

.search-button {
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-button:hover {
  background: #1976D2;
  transform: scale(1.05);
}

.arrow-icon {
  font-size: 1.2rem;
  font-weight: bold;
}

.category-filters {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  background: white;
  color: #333;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.category-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.category-btn.social {
  border-left: 4px solid #2196F3;
}

.category-btn.environment {
  border-left: 4px solid #4CAF50;
}

.category-btn.economic {
  border-left: 4px solid #9C27B0;
}

.category-btn.infrastructure {
  border-left: 4px solid #FF9800;
}

.category-icon {
  font-size: 1.2rem;
}

/* Suburbs Section */
.suburbs-section {
  padding: 4rem 2rem;
  background: white;
}

.suburb-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.suburb-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.suburb-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.card-image {
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect width="400" height="200" fill="%23667eea"/><circle cx="100" cy="80" r="20" fill="%23fff" opacity="0.1"/><circle cx="300" cy="120" r="15" fill="%23fff" opacity="0.1"/><rect x="150" y="100" width="60" height="80" fill="%23fff" opacity="0.1"/><rect x="250" y="60" width="40" height="60" fill="%23fff" opacity="0.1"/></svg>');
  background-size: cover;
}

.rating {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.card-content {
  padding: 1.5rem;
}

.suburb-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
}

.metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
}

.metric {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
}

.metric.social {
  background: rgba(33, 150, 243, 0.1);
  color: #2196F3;
}

.metric.environment {
  background: rgba(76, 175, 80, 0.1);
  color: #4CAF50;
}

.metric.economic {
  background: rgba(156, 39, 176, 0.1);
  color: #9C27B0;
}

.metric.infrastructure {
  background: rgba(255, 152, 0, 0.1);
  color: #FF9800;
}

.metric-icon {
  font-size: 1rem;
}

.view-details-btn {
  width: 100%;
  background: #4CAF50;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.view-details-btn:hover {
  background: #45a049;
  transform: translateY(-2px);
}

/* Responsive Design for Cards */
@media (max-width: 768px) {
  .suburb-cards {
    grid-template-columns: 1fr;
  }
  
  .metrics {
    grid-template-columns: 1fr;
  }
}

/* Compare Section */
.compare-section {
  padding: 4rem 2rem;
  background: #f8f9fa;
}

.compare-form {
  max-width: 800px;
  margin: 0 auto;
  margin-top: 3rem;
}

.suburb-inputs {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.input-group {
  flex: 1;
  min-width: 250px;
}

.input-group label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.select-wrapper {
  position: relative;
}

.suburb-select {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  background: white;
  font-size: 1rem;
  appearance: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.suburb-select:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.select-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  pointer-events: none;
  font-size: 0.8rem;
}

.vs-divider {
  background: #4CAF50;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-weight: bold;
  font-size: 0.9rem;
  white-space: nowrap;
}

.compare-btn {
  width: 100%;
  background: #666;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.compare-btn:hover {
  background: #555;
  transform: translateY(-2px);
}

/* Responsive Design for Compare */
@media (max-width: 768px) {
  .suburb-inputs {
    flex-direction: column;
    gap: 1rem;
  }
  
  .vs-divider {
    align-self: center;
  }
}

/* Why Choose MelSustain Section */
.why-section {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.why-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400"><rect width="1200" height="400" fill="%231e3c72"/><circle cx="200" cy="100" r="30" fill="%23fff" opacity="0.05"/><circle cx="1000" cy="150" r="20" fill="%23fff" opacity="0.05"/><path d="M300 200 L350 180 L400 200 L350 220 Z" fill="%23fff" opacity="0.05"/><path d="M800 120 L850 100 L900 120 L850 140 Z" fill="%23fff" opacity="0.05"/><circle cx="600" cy="300" r="25" fill="%23fff" opacity="0.05"/></svg>');
  background-size: cover;
  opacity: 0.3;
}

.why-section .container {
  position: relative;
  z-index: 1;
}

.why-section .section-title {
  color: white;
}

.why-section .section-description {
  color: rgba(255, 255, 255, 0.9);
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: white;
}

.feature-card p {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

/* Responsive Design for Why Section */
@media (max-width: 768px) {
  .feature-cards {
    grid-template-columns: 1fr;
  }
}

/* Footer Section */
.footer {
  background: #2c3e50;
  color: white;
  padding: 3rem 2rem 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-brand {
  max-width: 300px;
}

.footer-logo {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
}

.footer-mission {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #3498db;
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.2rem;
}

.social-icon:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

.footer-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.nav-column h4 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: white;
}

.nav-column ul {
  list-style: none;
  padding: 0;
}

.nav-column li {
  margin-bottom: 0.5rem;
}

.nav-column a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-column a:hover {
  color: white;
}

.footer-newsletter h4 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: white;
}

.footer-newsletter p {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.newsletter-form {
  display: flex;
  gap: 0.5rem;
}

.newsletter-input {
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  outline: none;
}

.newsletter-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.newsletter-btn {
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.2rem;
}

.newsletter-btn:hover {
  background: #45a049;
  transform: scale(1.05);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 1rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

/* Responsive Design for Footer */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-nav {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .footer-brand {
    max-width: none;
    text-align: center;
  }
  
  .social-icons {
    justify-content: center;
  }
}
</style>
