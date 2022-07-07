<template>
    <NModal v-model:show="showModalModel">
        <NCard
            style="width: 400px"
            title="Clear Products"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
        >
        <template #footer>
          <form action="" class="form">
            <DatePicker v-model:value="timestamp.value" />
          </form>
          <NButton :disabled="isDisabledSubmit" type="primary" @click="onSubmit">
            Submit
          </NButton>
        </template>
        </NCard>
    </NModal>
</template>

<script>
import { computed, defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { NModal, NCard, NButton } from 'naive-ui'
import DatePicker from './DatePicker.vue'

export default defineComponent({
  components: {
    NModal,
    NCard,
    DatePicker,
    NButton
  },
  props: {
    showClearModal: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const store = useStore()
    const timestamp = reactive({
      value: null
    })
    const showModalModel = computed({
      get: () => props.showClearModal,

      set (value) {
        emit('update:showClearModal', value)
      }
    })
    const isValid = computed(() => {
      return Boolean(timestamp)
    })
    const isDisabledSubmit = computed(() => {
      return !isValid.value
    })
    const onSubmit = () => {
      store.commit('clearProducts', timestamp.value)
    }

    return {
      isDisabledSubmit,
      isValid,
      onSubmit,
      showModalModel,
      timestamp
    }
  }
})
</script>

<style lang="scss" scoped>
    .form {
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
    }
</style>
