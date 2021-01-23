import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: []
  },
  getters: {
    tasks (state) {
      return state.tasks
    },
    task: (state) => (id) => {
      return state.tasks.find(item => item.id === id)
    },
    filterTasks: (state) => (filter) => {
      if (filter && filter.value) {
        return state.tasks.filter((task) => task[filter.key] === filter.value)
      } else {
        return state.tasks
      }
    }
  },
  mutations: {
    editTask (state, payload) {
      const task = state.tasks.find(item => item.id === payload.id)
      if (task) {
        for (const key in payload.data) {
          task[key] = payload.data[key]
        }
      }
    },
    addTask (state, payload) {
      state.tasks.push(payload)
    },
    setTasks (state, payload) {
      state.tasks = payload
    }
  },
  actions: {
    async addTask ({ commit }, payload) {
      const response = await fetch(`${process.env.VUE_APP_DB_URL}/tasks.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...payload
        })
      })

      const firebaseData = await response.json()

      if (!firebaseData.error) {
        commit('addTask', {
          id: firebaseData.name,
          ...payload
        })
      }
    },
    async editTask ({ commit }, payload) {
      const id = payload.id

      const response = await fetch(`${process.env.VUE_APP_DB_URL}/tasks/${id}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...payload.data })
      })
      const firebaseData = await response.json()

      if (!firebaseData.error) {
        commit('editTask', payload)
      }
    },
    async loadTasks ({ commit }) {
      const response = await fetch(`${process.env.VUE_APP_DB_URL}/tasks.json`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const firebaseData = await response.json()

      let tasks = []
      if (firebaseData) {
        tasks = Object.keys(firebaseData).map(key => {
          return {
            id: key,
            ...firebaseData[key]
          }
        })
        commit('setTasks', tasks)
      }
    }
  },
  modules: {
  }
})
