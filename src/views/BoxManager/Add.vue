<template>
  <a-page-header title="新增" sub-title="" @back="() => $router.go(-1)" />
  <BoxDetail :isEdit="false" />
</template>
<script>
import BoxDetail from './components/BoxDetail.vue'
export default {
  name: 'BoxManager',
  components: { BoxDetail },
  setup() {
    return {}
  },
}
</script>
<style lang="scss" scoped></style>
