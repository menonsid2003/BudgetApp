<template>
    <div class="component-wrapper">
        <div class="upcoming-header">
            <h2>Upcoming Payments</h2>
        </div>
        <div class="calendar">
            <VCalendar :attributes="attributes" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const upcomingDates = [
    '2025-04-27',
    '2025-05-01',
    '2025-05-10',
];

const attributes = ref(
    upcomingDates.map(date => ({
        key: date,
        highlight: {
            color: 'green',
        },
        dates: new Date(date),
    }))
);
</script>

<style scoped>
.component-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 1rem;
}
</style>