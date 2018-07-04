<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand">Superz Gadget</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link :to="{ name: 'about' }" class="nav-link">About</router-link> <span class="sr-only">(current)</span>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'home' }" class="nav-link">Home</router-link>
          </li>
        </ul>
        <div v-if="isAdmin">
          <Admin/>
        </div>
        <div v-if="isAdmin">
          <button class="btn btn-outline-danger mr-3" @click="editItem"> <b>Edit Item</b></button>
        </div>
        <div v-else="!isAdmin">

        </div>
        <div v-if="!islogin">
          <button class="btn btn-outline-success mr-3" type="submit" data-toggle="modal" data-target="#cartModal"><i class="fas fa-shopping-cart"> Your Cart ({{ carts.length }})</i></button>

          <div class="modal fade" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document" >
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Belanjaan</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <table>
                    <tr>
                      <th>List Item</th>
                      <th>Price</th>
                      <th>Qty</th>
                    </tr>
                    <tr v-for="cart in carts">
                      <td>{{ cart.name }}</td>
                      <td>{{ cart.price }}</td>
                      <td>{{ cart.Qty }}</td>
                      <a href="#" @click="deleteCart(cart)"><i class="fas fa-ban"></i></a>
                    </tr>
                  </table>
                  <button type="button" class="btn btn-secondary mr-3" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" @click="beliItem()">Checkout</button>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div v-if="!islogin">
          <LogoutCom @logout="handleIsLogin" />
        </div>
        <div v-else>
          <LoginCom @login="handleIsLogin" />
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import LoginCom from '@/components/LoginCom.vue'
import LogoutCom from '@/components/LogoutCom.vue'
import Admin from '@/components/Admin.vue'
import axios from 'axios'
import swal from 'sweetalert2'


export default {
  name: 'home',
  components: {
    LoginCom,
    LogoutCom,
    Admin
  },
  computed:{
    carts(){
      return this.$store.state.listCart
    }
  },
  data(){
    return{
      islogin: true,
      isAdmin: false
    }
  },
  methods:{
    handleIsLogin (e) {
      this.islogin = e
      this.cekAdmin()
    },

    cekAdmin : function(){
      if(localStorage.getItem('admin')){
        this.isAdmin = true
      }else{
        this.isAdmin = false
      }
    },

    editItem : function(){
      this.$router.push('edit')
    },

    beliItem : function(cart){
      let self = this
      swal({
            title: 'Are you sure?',
            text: "You want to buy this",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
          }).then((result) => {
            if (result.value) {
              this.carts.forEach(function(item){
                let newValue = item.stock - item.Qty
                let newStock = {stock : newValue}
                axios.post('http://localhost:3000/items/buy/'+item.id,newStock)
                .then((value) => {
                  self.$store.dispatch('emptyCart')
                  $('#cartModal').modal('hide')
                })
                .catch((err) => {
                  console.log(err);
                })
              })
              swal(
                'Thx',
                'You Buy It!',
                'success'
              )
            }
          })
    },

    deleteCart :function(itemName){
      this.$store.dispatch('undoCart',itemName)
    },

    getToken : function(){
      if(localStorage.getItem('token')){
        this.islogin = false
      }
    }
  },
  created(){
    this.getToken()
    this.cekAdmin()
  }
}
</script>

<style lang="css" scoped>

</style>
