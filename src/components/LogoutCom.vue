<template>
  <div>
    <button type="button" class="btn btn-outline-warning" @click="logout">
      <b>Logout</b>
    </button>
  </div>
</template>

<script>
export default {
  methods:{
    logout:function(){
      localStorage.removeItem('token')
      localStorage.removeItem('status')
      localStorage.removeItem('admin')
      this.$emit('logout', true)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css">
</style>
