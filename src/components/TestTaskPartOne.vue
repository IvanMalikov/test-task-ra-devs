<template>
    <div>

    </div>
</template>

<script>
import { onMounted } from 'vue'
export default {
  setup () {
    onMounted(() => {
      console.log(sortString('g5et ski3lls on6 use1 your2 to4 7top'))
      console.log(queueTime([26, 42, 13, 18, 48, 38, 39, 25, 39, 6, 35, 11, 7, 38, 19, 14], 1))
      console.log(541)
    })
    const sortString = str => {
      const strArr = str.split(' ')
      const res = strArr.reduce((acc, element) => {
        const digit = element.match(/\d+/)[0]
        return {
          ...acc,
          [digit]: element
        }
      }, {})

      return Object.keys(res).sort().map(item => res[item]).join(' ')
    }

    const queueTime = (customers, n) => {
      const arr = new Array(n).fill(0)
      for (let i = 0; i < customers.length; i++) {
        const idx = arr.indexOf(Math.min(...arr))
        arr[idx] += customers[i]
      }

      return Math.max(...arr)
    }

    const biggerNumber = number => {
      const newNumber = Number(number.toString().split('').sort().reverse().join(''))
      if (newNumber === number) {
        return -1
      }
      return newNumber
    }

    return {
      sortString,
      queueTime,
      biggerNumber
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
