<template>
  <div class="min-h-screen flex items-center justify-center bg-black px-4">
    <div class="w-full max-auto max-w-md bg-white rounded-2xl shadow-xl p-8">
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-gray-900">Welcome Back</h1>
        <p class="text-gray-500 mt-2">Please enter your details to sign in</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input 
            v-model="form.email"
            type="email" 
            required
            placeholder="name@company.com"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition duration-200"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            v-model="form.password"
            type="password" 
            required
            placeholder="••••••••"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition duration-200"
          />
        </div>

        <p v-if="errorMessage" class="text-red-500 text-sm mt-2">
          {{ errorMessage }}
        </p>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition duration-300 disabled:opacity-50"
        >
          <span v-if="loading">Signing in...</span>
          <span v-else>Sign In</span>
        </button>
      </form>

      <div class="mt-8 text-center">
        <p class="text-sm text-gray-600">
          Don't have an account? 
          <a href="#" class="font-bold text-black hover:underline">Create one</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      loading: false,
      errorMessage: ''
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.errorMessage = '';

      try {
        const response = await api.post('/auth/login', {
          email: this.form.email,
          password: this.form.password
        });

        // Handle success (e.g., save token, redirect to dashboard)
        console.log('Login Successful:', response.data);
        
      } catch (error) {
        // Handle error (e.g., wrong credentials)
        this.errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>