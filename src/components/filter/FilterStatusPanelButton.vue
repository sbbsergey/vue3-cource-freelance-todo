<template>
  <button :class="['btn', { 'primary': value === toggleValue }]" @click="changeValue">
    <slot></slot>
  </button>
</template>
<script>
export default {
  emits: ['changeValue'],
  props: {
    value: {
      type: String,
      required: true
    },
    toggleValue: {
      type: String,
      required: true
    }
  },
  setup (props, context) {
    return {
      changeValue: () => context.emit('changeValue', props.toggleValue)
    }
  }
}
</script>
