import { defineStore } from 'pinia';

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [] as {
      date: string;
      description: string;
      category?: string;
      amount: number;
    }[],
  }),
  actions: {
    setTransactions(data: typeof this.transactions) {
      this.transactions = data;
    },
  },
});
