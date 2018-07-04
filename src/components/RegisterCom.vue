<template>
  <div>
    <b>New Customer?</b>
    <!-- Button trigger modal -->
    <a href="" data-toggle="modal" data-target="#exampleModalLong">
      register here
    </a>

    <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Sign Up Form</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form v-on:click="validateForm">
              <div class="form-group">
                <label class="form-control-label" for="username">Username</label>
                <input class="form-control" type="text" v-model="username" v-bind:class="{ 'is-invalid': attemptSubmit && missingUsername }">
                <div class="invalid-feedback">username is required.</div>
              </div>
              <div class="form-group">
                <label class="form-control-label" for="name">Name</label>
                <input class="form-control" type="text" v-model="name" v-bind:class="{ 'is-invalid': attemptSubmit && missingName }">
                <div class="invalid-feedback">name is required.</div>
              </div>
              <div class="form-group">
                <label class="form-control-label" for="name">Email</label>
                <input class="form-control" type="email" v-model="email" v-bind:class="{ 'is-invalid': attemptSubmit && missingEmail }">
                <div class="invalid-feedback">email is required.</div>
              </div>
              <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" type="password" v-model="password" v-bind:class="{ 'is-invalid': attemptSubmit && missingPassword }">
                <div class="invalid-feedback">password is required.</div>
              </div>
            <button type="button" class="btn btn-secondary mr-4" data-dismiss="modal">Cancel</button>
            <button class="btn btn-primary" data-dismiss="modal" @click="registerId">Sign Up</button>
          </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import swal from "sweetalert2"

export default {
  data() {
    return {
      name: '',
      username: '',
      password: '',
      email: '',
      attemptSubmit: false
    }
  },
  computed: {
    missingName: function () {
      return this.name === '';
    },
    missingPassword: function(){
      return this.password === '';
    },
    missingEmail: function(){
      return this.email === '';
    },
    missingUsername: function(){
      return this.username === '';
    },
  },
  methods: {
    validateForm: function (event) {
      this.attemptSubmit = true;
      if (this.missingName || this.missingPassword || this.missingUsername || this.missingEmail) event.preventDefault();
    },

    registerId: function(){
      let newId ={
        name : this.name,
        username: this.username,
        password: this.password,
        email: this.email
      }
      axios.post('http://localhost:3000/users/createuser',newId)
      .then((value) => {
        swal(
          'Good job!',
          'You already Registered!',
          'success'
        )
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },
}
</script>

<style lang="css">
</style>
