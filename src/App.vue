<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import TransactionUploader from './components/TransactionUploader.vue';
</script>

<template>
  <div class="wrapper">
    <div class="transaction-table">
      <TransactionUploader />
    </div>
  </div>
</template>

<style scoped>


.transaction-table {
  width: 100%;
  padding: 1rem;
}

</style>
