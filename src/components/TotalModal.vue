<template>
    <NModal v-model:show="showModalModel">
        <NCard
            style="width: 400px"
            title="Total"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
        >
        <template #footer>
          {{getTotalPLN}} PLN
        </template>
        </NCard>
    </NModal>
</template>

<script>
import { computed, defineComponent, onMounted } from 'vue'
import { NModal, NCard } from 'naive-ui'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    NModal,
    NCard

  },
  props: {
    showTotalModal: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const store = useStore()
    const rates = []
    const curencies = []
    const showModalModel = computed({
      get: () => props.showTotalModal,

      set (value) {
        emit('update:showTotalModal', value)
      }
    })

    const getTotalPLN = computed(() => {
      return store.getters.getTotalPLN
    })

    onMounted(async () => {
      await store.dispatch('fetchCurrency')
    })

    return {
      getTotalPLN,
      showModalModel,
      rates,
      curencies,
      total: 0,
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
        margin-bottom: 30px;
        text-align: center;
    }
</style>
