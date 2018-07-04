<template>
  <div class="home">
    <Header/>
    <Carousell/>
    <ListItem/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Carousell from '@/components/Carousell.vue'
import ListItem from '@/components/ListItem.vue'

export default {
  name: 'home',
  components: {
    Header,
    Carousell,
    ListItem
  }
}
</script>

<style>
  body{
    line-height: 2.5
  }
</style>
