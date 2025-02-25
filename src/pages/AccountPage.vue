<script setup lang="ts">
import { useAccountStore } from '@/store/useAccountStore'
import AccountList from '@/components/AccountList.vue'
import Button from "primevue/button"

const store = useAccountStore()
</script>

<template>
  <div class="account">
    <div class="account__title">
      <h1>Учетные записи</h1>
      <Button severity="secondary" variant="outlined" @click="store.addAccount">
        <i class="pi pi-plus"></i>
      </Button>
    </div>
    <span class="account__hint">
      <i class="pi pi-info-circle"></i>
      Для указания нескольких меток для одной пары логин/пароль используйте разделить ;
    </span>
    <AccountList />
  </div>
</template>

<style scoped>
.account {
  padding-top: 3.33rem;
  display: flex;
  flex-direction: column;
  gap: 1.33rem;
}
.account__title {
  display: flex;
  gap: 1.33rem;
}
.account__title h1 {
  font-size: 1.5rem;
}
.account__hint {
  background-color: #f1f5f9;
  padding: 0.33rem;
  border-radius: 0.4rem;
}
</style>
