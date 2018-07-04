<template>
  <div class="container">
    <div class="card mb-4 mr-4 ml-4 mt-4" style="width: 18rem;" v-for="item in listItem">
      <img class="card-img-top" :src="item.image" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title"> {{ item.item }}</h5>
        <p class="card-text"> <b>handphone description :</b></p>
        <p>{{ item.description}}</p>
        <p class="card-text"><b>Stock : </b>{{ item.stock}}</p>
        <h6 class="card-text"><b>Price : </b>{{ item.price}}</h6>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary" @click="addCart(item)">Add To Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import swal from "sweetalert2"

export default {
  computed:{
    listItem(){
      return this.$store.state.listItem
    }
  },
  data(){
    return{
      admin : this.$store.state.admin
    }
  },
  methods:{
    addCart(item){
      if(localStorage.getItem('token')){
        this.$store.dispatch('buyItem',item)
      }else{
        swal(
          'Not Allowed',
          'Please Login First',
          'error'
        )
      }
    }
  },
  created(){
    this.$store.dispatch('loadData')
    this.$store.dispatch('cekAdm')
  }
}
</script>

<style lang="css" scoped>
  .container{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row  | column ;
    justify-content: flex-start;
  }
</style>
