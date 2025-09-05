<template>
  <div class="password-gate">
    <h2>Enter Password</h2>
    <input v-model="inputPassword" type="password" placeholder="Password" />
    <button @click="checkPassword">Enter</button>
    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputPassword: "",
      error: ""
    }
  },
  methods: {
    checkPassword() {
      const correct = "melsustain"  
      if (this.inputPassword === correct) {
        localStorage.setItem("siteAccess", "granted")
        this.$router.push("/")
      } else {
        this.error = "Wrong password!"
      }
    }
  }
}
</script>
