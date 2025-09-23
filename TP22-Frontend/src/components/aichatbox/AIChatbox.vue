<template>
  <div class="chatbox">
    <!-- Chat and show -->
    <div class="messages">
      <div v-for="(msg, index) in messages" :key="index" class="message">
        <strong>{{ msg.role === 'user' ? 'You' : 'AI' }}:</strong>
        <span class="message-text">{{ msg.text }}</span>
      </div>
    </div>

    <!-- enter  -->
    <div class="input-area">
      <input
        v-model="input"
        @keyup.enter="sendMessage"
        placeholder="Please Enter Your question..."
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import { aiApi } from "@/services/api.js";

export default {
  name: "AIChatbox",
  data() {
    return {
      input: "",
      messages: []
    };
  },
  methods: {
    async sendMessage() {
      if (!this.input.trim()) return;

      // 加入用户消息
      const userMsg = { role: "user", text: this.input };
      this.messages.push(userMsg);

      try {
        // 调 Spring Boot 后端
        const res = await aiApi.chat(this.input);

        // 加入 AI 回复
        this.messages.push({ role: "ai", text: res.data.reply });
      } catch (err) {
        console.error("Backend fault:", err);
        this.messages.push({ role: "ai", text: "❌ Flaut, try again" });
      }

      // 清空输入框
      this.input = "";
    }
  }
};
</script>

<style scoped>
.chatbox {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  width: 400px;
  margin: 0 auto;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  border: 2px solid red; 
}

.messages {
  flex: 1;
  overflow-y: auto;
  max-height: 300px;
  margin-bottom: 10px;
}

.message {
  margin: 5px 0;
}

.input-area {
  display: flex;
  gap: 5px;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 12px;
  background-color: #4CAF50;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}

.message-text {
  white-space: pre-wrap;  
  word-wrap: break-word;
}
</style>
