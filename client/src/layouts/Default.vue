<script setup lang="ts">
import Navbar from '../components/Navbar.vue';

</script>

<template>
    <header>
        <nav>
            <Navbar />
        </nav>
    </header>

    <main class="grow">
      <slot></slot>
    </main>
</template>