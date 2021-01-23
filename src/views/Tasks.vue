<template>
  <h1 v-if="isEmptyTasks" class="text-white center">Задач пока нет</h1>
  <template v-else>
    <filter-status-panel
      :value = "status"
      @changeValue = "changeFilterStatusValue"
    ></filter-status-panel>
    <h3 class="text-white">Всего активных задач: {{ activeTasksLength }}</h3>
    <div class="card" v-for="task in tasks" :key="task">
      <h2 class="card-title">
        {{ task.title }}
        <AppStatus :status="task.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{ task.date }}
          </small>
        </strong>
      </p>
      <button class="btn primary" @click="routeToTask(task.id)">Посмотреть</button>
    </div>
  </template>
</template>

<script>
import AppStatus from '@/components/AppStatus.vue'
import FilterStatusPanel from '@/components/filter/FilterStatusPanel'

import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'

export default {
  setup () {
    const store = useStore()
    const router = useRouter()
    const status = ref('')

    const routeToTask = (id) => router.push('/task/' + id)

    const filterTasks = computed(() => store.getters.filterTasks({
      key: 'status',
      value: status.value
    }))

    const changeFilterStatusValue = function (value) {
      status.value = value
    }

    const activeTasksLength = computed(() => store.getters.filterTasks({
      key: 'status',
      value: 'active'
    }).length)

    return {
      routeToTask,
      tasks: filterTasks,
      activeTasksLength,
      isEmptyTasks: computed(() => store.getters.tasks.length === 0),
      status,
      changeFilterStatusValue
    }
  },
  components: { AppStatus, FilterStatusPanel }
}
</script>
