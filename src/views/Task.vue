<template>
  <div class="card" v-if="task">
    <h2>{{ task.title }}</h2>
    <p><strong>Статус</strong>: <AppStatus :status="task.status" /></p>
    <p><strong>Дэдлайн</strong>: {{ task.date }}</p>
    <p><strong>Описание</strong>: {{ task.description }}</p>
    <div>
      <button class="btn" @click="setTaskStatus('pending')">Взять в работу</button>
      <button class="btn primary" @click="setTaskStatus('done')">Завершить</button>
      <button class="btn danger" @click="setTaskStatus('cancelled')">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ id }}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from '@/components/AppStatus'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  setup () {
    const route = useRoute()
    const store = useStore()

    const id = route.params.id

    function setTaskStatus (type) {
      store.dispatch('editTask', {
        id: id,
        data: { status: type }
      })
    }

    return {
      id: id,
      task: computed(() => store.getters.task(route.params.id)),
      setTaskStatus
    }
  },
  components: { AppStatus }
}
</script>
