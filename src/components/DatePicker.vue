<template>
    <NDatePicker v-model:value="valueModel" type="date" clearable />
</template>

<script>
import { defineComponent, computed } from 'vue'
import { NDatePicker } from 'naive-ui'
export default defineComponent({
  components: {
    NDatePicker
  },
  props: {
    value: {
      required: true
    }
  },
  setup (props, { emit }) {
    const valueModel = computed({
      get: () => props.value,

      set (value) {
        emit('update:value', value)
      }
    })
    return {
      valueModel
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
