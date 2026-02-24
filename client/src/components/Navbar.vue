<template>
    <div class="w-full flex flex-row justify-end gap-8 p-4 bg-white text-black z-100 absolute top-0 right-0">
        <router-link class="hover:text-gray-600 self-center" to="/">Home</router-link>
        <button 
            @click="handleLogout" 
            class="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
            Logout
        </button>
    </div>
</template>

<script setup lang="ts">
    import api from '../api';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout request failed:', error);
        } finally {
            localStorage.removeItem('token'); 
            
            router.push('/login');
        }
    };
</script>