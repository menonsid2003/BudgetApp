<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import TransactionUploader from './components/TransactionUploader.vue';
import Upcoming from './components/Upcoming.vue';
</script>

<template>
  <div class="wrapper">
    <div class="transaction-table">
      <TransactionUploader />
    </div>
    <div class="upcoming">
      <Upcoming />
    </div>
  </div>
</template>

<style scoped>


.wrapper {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-right: 1rem;
  align-content: right;
}

</style>
