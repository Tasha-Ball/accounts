<script setup lang="ts">
import { useAccountStore } from '@/store/useAccountStore'
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
  </div>
</template>

<style scoped>
.account {
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.account__title {
  display: flex;
  gap: 20px;
}
.account__title h1 {
  font-size: 1.5rem;
}
.account__hint {
  background-color: #f1f5f9;
  padding: 5px;
  border-radius: 6px;
}
</style>
