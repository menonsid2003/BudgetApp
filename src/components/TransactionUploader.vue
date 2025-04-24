<template>
    <div class="page-wrapper">
        <div class="transaction-uploader">
            <h2 style="margin-top: 1rem;">Parsed Transactions</h2>
            <button v-if="transactions.length > visibleCount" @click="visibleCount += 10" class="load-more">
                Load More
            </button>
            <div :class="['table-box', { 'for-placeholder': transactions.length === 0 }]">
                <div v-if="transactions.length === 0" class="placeholder">
                    <p>📂 Drop or select a CSV file to get started</p>
                    <input type="file" accept=".csv" @change="handleFileUpload" />
                </div>

                <div v-else class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th style="width: 6%;">Date</th>
                                <th style="width: 45%;">Description</th>
                                <th style="width: 15%;">Category</th>
                                <th style="width: 6%; text-align: right;">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(transaction, index) in visibleTransactions" :key="index">
                                <td>{{ transaction.date }}</td>
                                <td>{{ transaction.description }}</td>
                                <td>{{ transaction.category }}</td>
                                <td :class="amountClass(transaction.amount)">{{ formatAmount(transaction.amount) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Papa from 'papaparse';
import { computed, ref } from 'vue';

/// Define the Transaction interface to represent the structure of each transaction
interface Transaction {
    date: string;
    description: string;
    category?: string;
    amount: number;
}

const transactions = ref<Transaction[]>([]);
const visibleCount = ref(12); // Display 12 transactions by default

function amountClass(amount: number): string {
    return amount > 0 ? 'amount positive' : 'amount negative'; // Class for styling based on the amount
}

/// Returns a sliced list of transactions based on visiblecount variable
const visibleTransactions = computed(() => {
    return transactions.value.slice(0, visibleCount.value);
})

/// Return a formatted string for the amount with a plus sign and a dollar sign
function formatAmount(amount: number): string {
    return `${amount < 0 ? '$' : '+$'}${Math.abs(amount).toFixed(2)}`; // Format the amount to 2 decimal places
}

/// Handle file upload and parse CSV data
function handleFileUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete(results: { data: any[]; }) {
            const parsed: Transaction[] = results.data.map((row: any) => {
                const withdrawal = row['Withdrawals']?.replace(/[$,]/g, '') || '';
                const deposit = row['Deposits']?.replace(/[$,]/g, '') || '';
                const rawAmount = withdrawal ? -parseFloat(withdrawal) : parseFloat(deposit);
                return {
                    date: row['Date'],
                    description: row['Description'],
                    category: row['Category'] || undefined,
                    amount: isNaN(rawAmount) ? 0 : rawAmount,
                };
            });
            transactions.value = parsed.filter((transaction) => transaction.date && transaction.description && transaction.category && !isNaN(transaction.amount));
        }
    })
}

</script>

<style scoped>
.page-wrapper {
    position: relative;
    width: 65vw;
    height: 80vh;
    color: rgb(214, 214, 214);
    box-sizing: border-box;
}

.transaction-uploader {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.table-box {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    min-height: 0;
}

.table-box.for-placeholder {
    align-items: center;
    border: 1px dashed #ccc;
}

.placeholder {
    width: 100%;
    text-align: center;
    font-size: 2rem;
}

.table-wrapper {
    flex-grow: 1;
    font-size: 1rem;
}

table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

tr,
th,
td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 2.5rem;
}

.amount{
    text-align: right;
}
.amount.positive {
    color: green;
}

.load-more {
    margin-top: 0.5rem;
    align-self: flex-start;
}
</style>