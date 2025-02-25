<script setup lang="ts">
import { Form } from '@primevue/forms';
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Password from 'primevue/password';
import { useAccountStore } from "@/store/useAccountStore";
import type { Account } from "@/types/Account";
import { ref, computed } from "vue";

const props = defineProps<{ account: Account }>();
const store = useAccountStore();

const tags = ref(props.account.tags.map(l => l.text).join("; "));

const updateField = (field: keyof Account, value: any) => {
  store.updateAccount(props.account.id, field, value);
};

const isInvalid = computed(() => props.account.invalid);
</script>

<template>
  <Form class="account-item" :class="{'no-password': !(props.account.type.code === 'local')}">
    <Textarea
      v-model="tags"
      @blur="updateField('tags', tags)"
      placeholder="Метка (через ;)"
      autoResize
      maxlength="50"
    />

    <Select
      v-model="props.account.type"
      @change="updateField('type', props.account.type)"
      :options="store.accountTypes"
      optionLabel="name"
    />

    <InputText
      v-model="props.account.login"
      @blur="updateField('login', props.account.login)"
      placeholder="Логин"
      :invalid="isInvalid.login"
      maxlength="100"
    />

    <Password
      v-if="props.account.type.code === 'local'"
      v-model="props.account.password"
      @blur="updateField('password', props.account.password)"
      placeholder="Пароль"
      :invalid="isInvalid.password"
      maxlength="100"
      :feedback="false"
      toggleMask
    />

    <div class="account-item__trash">
      <i class="pi pi-trash" @click="store.removeAccount(props.account.id)"></i>
    </div>
  </Form>
</template>

<style scoped>
.account-item {
  display: grid;
  grid-template-columns: minmax(6.67rem, 30%) minmax(5.33rem, 15%) auto minmax(5.33rem, 17%) minmax(3.33rem, 5%);
  gap: 0.67rem;
  width: 100%;
}
.account-item.no-password {
  grid-template-columns: minmax(6.67rem, 30%) minmax(5.33rem, 15%) auto minmax(3.33rem, 5%);
}
.account-item ::v-deep .p-password input {
  width: 100%;
}
.account-item .account-item__trash ::v-deep .pi {
  font-size: 1.5rem;
  cursor: pointer;
}
.account-item .account-item__trash {
  display: flex;
  justify-content: center;
  align-items: center;
}
.account-item ::v-deep .p-select-label,
.account-item ::v-deep .p-textarea {
  align-content: center;
}
</style>
