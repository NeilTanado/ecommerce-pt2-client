<template>
  <div>
    <button  class="btn btn-outline-danger mr-3" data-toggle="modal" data-target="#exampleModal"><b>Add Item</b></button>

    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Insert Your Item</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Item:</label>
                <input type="text" class="form-control" v-model="item">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Price:</label>
                <input type="text" class="form-control" v-model="price">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Stock:</label>
                <input type="text" class="form-control" v-model="stock">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Description:</label>
                <input type="text" class="form-control" v-model="description">
              </div>
              <div class="form-group">
                <label class="col-form-label">Image:</label>
                <input type="file" class="form-control" @change="fileName">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="postImage()">Add Item</button>
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
  name: 'Admin',
  data(){
    return{
      item : '',
      price : '',
      stock : '',
      description: '',
      file: null,
    }
  },
  methods:{
    fileName (event) {
      this.file = event.target.files[0]
    },
    postImage: function(){
      let formData = new FormData()
      formData.append('item', this.item)
      formData.append('price', this.price)
      formData.append('stock', this.stock)
      formData.append('description', this.description)
      formData.append('image', this.file)
      axios.post('http://localhost:3000/items/upload', formData ,{
        headers:{
          token : localStorage.getItem('token')
        }
      })
      .then((value) => {
        this.$store.dispatch('loadData')
        swal(
          'Success!',
          'You added the Item!',
          'success'
        )
      })
      .catch((err) => {
        swal(
          'Wrong!!',
          'Please Insert Some Item',
          'error'
        )
      })
    },
  }
}
</script>

<style lang="css">
</style>
