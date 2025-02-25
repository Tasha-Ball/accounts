import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import type { Account } from '@/assets/types/Account'

export const useAccountStore = defineStore('accountStore', () => {
  // Типы записей
  const accountTypes = ref([
    { code: 'ldap', name: 'LDAP'},
    { code: 'local', name: 'Локальная'},
  ])

  // Учетный записи
  const accounts = ref<Account[]>([])

  // Функция для сохранения данных в LocalStorage
  const saveToLocalStorage = () => {
    const accountsStorage = accounts.value.filter(account => validateAccount(account))
    localStorage.setItem('accounts', JSON.stringify(accountsStorage))
  }

  // Добавление новой учетной записи
  const addAccount = () => {
    accounts.value.push({
      id: Date.now().toString(),
      tags: [],
      type: { code: 'local', name: 'Локальная'},
      login: '',
      password: null,
      invalid: { login: false, password: false },
    })
  }

  // Удаление учетной записи
  const removeAccount = (id: string) => {
    accounts.value = accounts.value.filter((account) => account.id !== id)
    saveToLocalStorage()
  }

  // Обновление данных учетной записи
  const updateAccount = (id: string, field: keyof Account, value: any) => {
    const account = accounts.value.find((a) => a.id === id)
    if (account && validateAccount(account)) {
      if (field === 'type' && value.code === 'ldap') {
        account.password = null
      }
      if (field === 'tags') {
        account.tags = value
          .split(';')
          .filter((t: string) => t.trim() !== '')
          .map((t: string) => ({ text: t.trim() }))
      } else {
        account[field] = value
      }
      saveToLocalStorage()
    }
  }

  // Валидация учетной записи
  const validateAccount = (account: Account) => {
    account.invalid.login = !account.login.trim()
    account.invalid.password = account.type.code === 'local' && !account.password?.trim()
    return !(account.invalid.login || account.invalid.password)
  }

  // Получение данных из LocalStorage
  onMounted(() => {
    if (localStorage.getItem('accounts')) {
      accounts.value = JSON.parse(localStorage.getItem('accounts') || '[]')
    }
  });

  return { accountTypes, accounts, addAccount, removeAccount, updateAccount }
})
