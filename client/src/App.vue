<template>
    <div id="app" class="bg-black w-full min-h-screen">
        <component :is="layoutComponent">
            <router-view />
        </component>
    </div>
</template>

<script lang="ts" setup>
    import { computed } from "vue";
    import { useRoute } from "vue-router";
    
    import DefaultLayout from "./layouts/Default.vue";
    import AuthLayout from "./layouts/Auth.vue";


    const route = useRoute();

    const layoutComponent = computed(() => {
        if (route.path != "/login") {
            return DefaultLayout;
        } else {
            return AuthLayout;
        }
    });
</script>