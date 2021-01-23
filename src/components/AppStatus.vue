<template>
  <span :class="['badge', typeStatus.style]">{{ typeStatus.text }}</span>
</template>
<script>
import { computed } from 'vue'

export default {
  props: {
    status: {
      type: String,
      required: true
    }
  },
  setup (props) {
    return {
      typeStatus: computed(() => {
        switch (props.status) {
          case 'active':
            return { style: 'primary', text: 'Активен' }
          case 'pending':
            return { style: 'warning', text: 'Выполняется' }
          case 'cancelled':
            return { style: 'danger', text: 'Отменен' }
          case 'done':
            return { style: 'primary', text: 'Завершен' }
          default:
            return { style: 'primary', text: 'Неизвестный статус' }
        }
      })
    }
  }
}
</script>
