import { createStore } from 'vuex'

export default createStore({
  state: {
    list: [],
    rates: null
  },
  getters: {
    getSortedList (state) {
      return Object.values(state.list.reduce((acc, item) => {
        if (!acc[item.timestamp]) {
          acc[item.timestamp] = {
            date: item.timestamp,
            items: []
          }
        }
        acc[item.timestamp].items.push(item)
        return acc
      }, {})).sort((a, b) => {
        const first = a.date
        const second = b.date
        if (first > second) return 1
        if (first < second) return -1
        return 0
      })
    },
    getCurrencies (state) {
      return Object.values(state.list.reduce((acc, item) => {
        if (!acc[item.currency]) {
          acc[item.currency] = {
            currency: item.currency,
            sum: 0
          }
        }
        acc[item.currency].sum += item.price
        return acc
      }, {}))
    },
    getTotalPLN (state, getters) {
      if (!state.rates) return 0
      const currencies = getters.getCurrencies
      for (let i = 0; i < currencies.length; i++) {
        currencies[i].sum /= state.rates.rates[currencies[i].currency]
      }
      return (currencies.reduce((acc, item) => acc + item.sum, 0) * state.rates.rates.PLN).toFixed(2)
    }
  },
  mutations: {
    fillList (state, payload) {
      state.list.push({ ...payload })
    },
    clearProducts (state, payload) {
      state.list = state.list.filter(item => item.timestamp !== payload)
    },
    fillCurrencies (state, payload) {
      state.rates = payload
    }
  },
  actions: {
    async fetchCurrency (context) {
      const key = process.env.VUE_APP_FIXER
      const data = await (await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,UAH,PLN`)).json()
      context.commit('fillCurrencies', data)
    }
  },
  modules: {
  }
})
