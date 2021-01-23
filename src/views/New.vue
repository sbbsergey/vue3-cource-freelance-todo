<template>
  <form class="card">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="formData.title">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="formData.date">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="formData.description"></textarea>
    </div>

    <button :disabled="!isValid"
            class="btn primary"
            @click.prevent="addTask"
    >Создать</button>
  </form>
</template>
<script>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const router = useRouter()
    const formData = reactive({
      title: '',
      date: '',
      description: ''
    })
    const store = useStore()

    const isValid = computed(() => formData.title && formData.date && formData.description)

    const taskStatus = (dateString) => {
      const now = new Date()
      now.setHours(0, 0, 0, 0)
      const date = new Date(dateString)
      date.setHours(0, 0, 0, 0)

      return (date >= now) ? 'active' : 'cancelled'
    }

    const addTask = () => {
      if (isValid.value) {
        store.dispatch('addTask', {
          ...formData,
          status: taskStatus(formData.date)
        })
        router.push('/')
      }
    }

    return {
      formData,
      isValid,
      addTask
    }
  }
}
</script>
