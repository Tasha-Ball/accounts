<script setup lang="ts">
import { useAccountStore } from "@/store/useAccountStore";
import AccountItem from "@/components/AccountItem.vue";

const store = useAccountStore();
</script>

<template>
  <div class="account-list">
    <div class="account-list__title">
      <span>Метки</span>
      <span>Тип записи</span>
      <span>Логин</span>
      <span>Пароль</span>
      <span></span>
    </div>
    <AccountItem v-for="account in store.accounts" :key="account.id" :account="account" />
  </div>
</template>

<style scoped>
.account-list {
  display: flex;
  flex-direction: column;
  gap: 0.67rem;
}
.account-list__title {
  display: grid;
  grid-template-columns: minmax(6.67rem, 30%) minmax(5.33rem, 15%) auto minmax(5.33rem, 17%) minmax(3.33rem, 5%);
  gap: 0.67rem;
  width: 100%;
  font-size: 0.75rem;
  opacity: 0.6;
}
</style>
