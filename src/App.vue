<template>
  <header class="header">
    <NButton class="btn" @click="showAddModal = true" type="primary">
      Add
    </NButton>
    <NButton class="btn" @click="showClearModal = true" type="primary">
      Clear
    </NButton>
    <NButton class="btn" @click="showTotalModal = true" type="primary">
      Total
    </NButton>
  </header>

  <main class="main">
    <AddProductModal v-model:showAddModal="showAddModal" />
    <ClearProductsModal v-model:showClearModal="showClearModal" />
    <TotalModal v-model:showTotalModal="showTotalModal" />

    <div v-if="getSortedList.length" class="list">
      <div class="list-items" v-for="item in getSortedList" :key="item.date">
        <p>{{new Date(item.date).toLocaleDateString('en-US')}}</p>
        <div class="item" v-for="info in item.items" :key="info.timestamp">
          <p>{{info.price}}</p>
          <p>{{info.currency}}</p>
          <p>{{info.productName}}</p>
        </div>
      </div>
    </div>
    <div v-else class="no-list">
      <p>The shopping list is empty</p>
    </div>
  </main>

  <TestTaskPartOne/>
</template>
<script>
import AddProductModal from './components/AddProductModal.vue'
import ClearProductsModal from './components/ClearProductsModal.vue'
import TotalModal from './components/TotalModal.vue'
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { NButton } from 'naive-ui'
import TestTaskPartOne from './components/TestTaskPartOne.vue'

export default defineComponent({
  name: 'App',

  components: {
    NButton,
    AddProductModal,
    ClearProductsModal,
    TotalModal,
    TestTaskPartOne
  },

  setup () {
    const store = useStore()
    const showAddModal = ref(false)
    const showClearModal = ref(false)
    const showTotalModal = ref(false)
    const getSortedList = computed(() => store.getters.getSortedList)

    return {
      getSortedList,
      showAddModal,
      showClearModal,
      showTotalModal
    }
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  .header {
    .btn:not(:last-child) {
      margin-right: 20px;
    }
  }
  .main {
    width: 15%;
    margin: 0 auto;
    .list {
      .list-items {
        width: 100%;
        p {
          display: flex;
        }
        .item {
          display: flex;
          align-content: space-between;
          justify-content: flex-end;
          align-items: center;
          p {
            margin: 0;
          }
          p:not(:last-child) {
            margin-right: 20px;
          }
        }
      }
    }
  }
</style>
