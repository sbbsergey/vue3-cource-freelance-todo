<template>
  <the-navbar></the-navbar>
  <div class="container with-nav">
    <app-loader v-if="loading"></app-loader>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'
import AppLoader from '@/components/AppLoader'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
    const loading = ref(true)

    onMounted(async () => {
      await store.dispatch('loadTasks')
      loading.value = false
    })

    return {
      loading
    }
  },
  components: {
    TheNavbar, AppLoader
  }
}
</script>
