<template>
    <NModal v-model:show="showModalModel">
        <NCard
            style="width: 600px"
            title="Add Product"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
        >
          <template #footer>
              <form action="" class="form">
                  <DatePicker v-model:value="localData.timestamp" style="width: 25%" />
                  <NInputNumber v-model:value="localData.price" style="width: 25%" type="number" placeholder="Price" />
                  <NDropdown trigger="hover" :options="options" @select="handleSelect">
                      <NButton>{{fillCurrency}}</NButton>
                  </NDropdown>
                  <NInput v-model:value="localData.productName" style="width: 25%" type="text" placeholder="Product" />
              </form>
              <NButton :disabled="isDisabledSubmit" type="primary" @click="fillList">
                  Submit
              </NButton>
          </template>
        </NCard>
    </NModal>
</template>

<script>
import { useStore } from 'vuex'
import { computed, defineComponent, reactive } from 'vue'
import { NModal, NCard, NInputNumber, NInput, NButton, NDropdown } from 'naive-ui'
import DatePicker from './DatePicker.vue'

export default defineComponent({
  components: {
    NModal,
    NCard,
    DatePicker,
    NInputNumber,
    NInput,
    NDropdown,
    NButton
  },
  props: {
    showAddModal: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const store = useStore()
    const localData = reactive({
      timestamp: null,
      price: null,
      currency: null,
      productName: ''
    })
    const isValid = computed(() => {
      return Boolean(localData.timestamp && localData.price && localData.currency && localData.productName)
    })
    const fillCurrency = computed(() => localData.currency ? localData.currency : 'Currency')
    const isDisabledSubmit = computed(() => {
      return !isValid.value
    })
    const showModalModel = computed({
      get: () => props.showAddModal,

      set (value) {
        emit('update:showAddModal', value)
      }
    })

    const fillList = () => {
      store.commit('fillList', localData)
    }

    const handleSelect = (key) => {
      localData.currency = key
    }

    return {
      fillCurrency,
      fillList,
      handleSelect,
      localData,
      showModalModel,
      isValid,
      isDisabledSubmit,
      options: [
        {
          label: 'USD',
          key: 'USD'
        },
        {
          label: 'EUR',
          key: 'EUR'
        },
        {
          label: 'UAH',
          key: 'UAH'
        },
        {
          label: 'PLN',
          key: 'PLN'
        }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
    .form {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
    }
</style>
