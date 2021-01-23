<template>
  <div class="card">

    <filter-status-panel-button
        toggle-value = ''
        :value = "value"
        @changeValue = "changeValue"
    >Все</filter-status-panel-button>

    <filter-status-panel-button
      toggle-value = 'active'
      :value = "value"
      @changeValue = "changeValue"
    >Активен</filter-status-panel-button>

    <filter-status-panel-button
      toggle-value = 'done'
      :value = "value"
      @changeValue = "changeValue"
    >Завершен</filter-status-panel-button>

    <filter-status-panel-button
      toggle-value = 'cancelled'
      :value = "value"
      @changeValue = "changeValue"
    >Отменен</filter-status-panel-button>

    <filter-status-panel-button
      toggle-value = 'pending'
      :value = "value"
      @changeValue = "changeValue"
    >Выполняется</filter-status-panel-button>

  </div>
</template>

<script>
import FilterStatusPanelButton from '@/components/filter/FilterStatusPanelButton'

export default {
  emits: ['changeValue'],
  props: {
    value: {
      type: String,
      required: true
    }
  },
  setup (_, context) {
    return {
      changeValue: (value) => context.emit('changeValue', value)
    }
  },
  components: { FilterStatusPanelButton }
}
</script>
