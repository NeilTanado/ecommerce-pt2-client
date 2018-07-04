<template>
  <div>
    <Header/>
    <AdminEdit/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import AdminEdit from '@/components/AdminEdit.vue'
export default {
  name:"about",
  components:{
    Header,
    AdminEdit,
  }
}
</script>

<style lang="css">
</style>
