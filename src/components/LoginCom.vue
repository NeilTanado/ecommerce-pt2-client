<template>
  <div>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-outline-secondary" data-toggle="modal" data-target="#exampleModalCenter">
      <b>Login</b>
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Please Login</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form v-on:click="validateForm">
              <div class="form-group">
                <label class="form-control-label" for="username">Username</label>
                <input class="form-control" type="text" v-model="username" v-bind:class="{ 'is-invalid': attemptSubmit && missingName }">
                <div class="invalid-feedback">username is required.</div>
              </div>
              <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" type="password" v-model="password" v-bind:class="{ 'is-invalid': attemptSubmit && missingPassword }">
                <div class="invalid-feedback">password is required.</div>
              </div>
            <RegisterCom/>
            <button type="button" class="btn btn-secondary mr-4" data-dismiss="modal">Cancel</button>
            <button class="btn btn-primary"  data-dismiss="modal" @click="onLogin">Login</button>
          </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterCom from '@/components/RegisterCom.vue'
import axios from 'axios'
import swal from 'sweetalert2'

export default {

  name: 'loginCom',
  components:{
    RegisterCom
  },
  data(){
    return{
      username: '',
      password: '',
      attemptSubmit: false,
    }
  },
  computed: {
    missingName: function () {
      return this.username === '';
    },
    missingPassword: function(){
      return this.password === '';
    }
  },
  methods: {
    onLogin: function(){
      if(this.attemptSubmit){
        this.login()
      }
    },
    validateForm: function (event) {
      this.attemptSubmit = true;
      if (this.missingName || this.missingPassword) event.preventDefault();
    },

    login:function(){
      let loginId = {
        username: this.username,
        password: this.password
      }
      axios.post('http://localhost:3000/users/login',loginId)
      .then((value) => {
        localStorage.setItem('token',value.data.token)
        localStorage.setItem('status', true)
        if(value.data.admin){
          localStorage.setItem('admin',true)
        }
        swal(
          'Good job!',
          'You have logged in',
          'success'
        )
        this.$emit('login', false)
      })
      .catch((err) => {
        swal(
          'Oooopppssss!',
          'wrong password or username',
          'error'
        )
      })
    }
  },
}

</script>

<style lang="css">
</style>
