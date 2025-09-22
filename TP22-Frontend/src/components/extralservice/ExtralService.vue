<template>
  <div class="legal-page">
    <Header />

    <!-- Hero Section -->
    <header class="legal-hero">
      <div class="container">
        <h1 class="legal-title">Legal & Support</h1>
        <p class="legal-subtitle">Your guide to using MelSustain responsibly</p>
      </div>
    </header>

    <div class="extral-service-page container">
      <!-- Contact Us -->
      <a id="contact" class="anchor-offset"></a>
      <section class="legal-card">
        <h2>✉️ Contact Us</h2>
        <p>We value your feedback and inquiries.</p>
        <ul class="styled-list">
          <li>📧 Email: <a href="mailto:contact.melsustain@gmail.com">contact.melsustain@gmail.com</a></li>
          <li>💬 Response Time: We aim to respond within 2–3 business days.</li>
        </ul>
        <p>When contacting us, please include:</p>
        <ol class="styled-ol">
          <li>Your name (optional)</li>
          <li>The suburb(s) or feature(s) you are asking about</li>
          <li>Screenshots or links (if reporting an issue)</li>
        </ol>
      </section>

      <!-- Privacy Policy -->
      <a id="privacy" class="anchor-offset"></a>
      <section class="legal-card">
        <h2>🔒 Privacy Policy</h2>
        <p>
          We respect your privacy. We do not collect personal information unless voluntarily provided 
          (e.g., through feedback forms). Any contact details submitted will only be used to improve the platform 
          and will not be shared with third parties.
        </p>
        <p>
          This project is <strong>educational and research-focused</strong>. 
          No personal data is shared, and we strive to maintain transparency in how data is used.
        </p>
      </section>

      <!-- Terms of Service -->
      <a id="terms" class="anchor-offset"></a>
      <section class="legal-card">
        <h2>📄 Terms of Service</h2>
        <p><em>Last updated: September 2025</em></p>
        <p>
          Welcome to <strong>MelSustain</strong>, a data visualisation platform for exploring sustainability indicators across Melbourne. 
          By accessing or using our services, you agree to the following terms and conditions.
        </p>
        <ul class="styled-list">
          <li>✔️ Use the platform for personal, academic, or research purposes only</li>
          <li>❌ No commercial use without permission</li>
          <li>❌ No hacking, disrupting, or misusing the system</li>
          <li>📊 Always attribute data sources when redistributing content</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
export default {
  name: "LegalPage",
  components: { Header },
};
</script>

<style scoped>
.legal-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.7;
  color: #333;
  padding-top: var(--nav-height, 100px);
}

/* Hero */
.legal-hero {
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
  color: white;
  text-align: center;
  padding: 5rem 2rem 4rem;
  position: relative;
  overflow: hidden;
}
.legal-title {
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}
.legal-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* Page Layout */
.extral-service-page {
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  max-width: 900px;
  margin: 0 auto;
}

/* Card Style */
.legal-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.legal-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.12);
}
.legal-card h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #4CAF50;
  border-left: 6px solid #4CAF50;
  padding-left: 0.8rem;
}

/* Styled Lists */
.styled-list {
  list-style: none;
  padding-left: 0;
  margin: 1.2rem 0;
}
.styled-list li {
  background: #f5fdf6;
  border: 1px solid #e0f3e2;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  margin-bottom: 0.6rem;
  transition: background 0.3s ease;
}
.styled-list li:hover {
  background: #e8f5e9;
}

.styled-ol {
  margin: 1.2rem 0;
  padding-left: 1.5rem;
}
.styled-ol li {
  margin-bottom: 0.6rem;
  padding-left: 0.3rem;
}

/* Anchor offset for fixed header */
.anchor-offset {
  display: block;
  position: relative;
  top: -100px;
  visibility: hidden;
}

</style>