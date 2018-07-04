<template>
  <div class="container">
    <div class="card mb-4 mr-4 ml-4 mt-4" style="width: 18rem;" v-for="(list,index) in listItem">
      <img class="card-img-top" :src="list.image" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title"> {{ list.item }}</h5>
        <p class="card-text"> <b>handphone description :</b></p>
        <p>{{ list.description}}</p>
        <p class="card-text"><b>Stock : </b>{{ list.stock}}</p>
        <h6 class="card-text"><b>Price : </b>{{ list.price}}</h6>
      </div>
      <div class="card-footer">
        <button  class="btn btn-warning mr-3" data-toggle="modal" data-target="#editItem" @click="openModalEdit(list)"><b>Edit Item</b></button>
        <button class="btn btn-danger" @click="deleteItem(list)"><b>Delete Item</b></button>
      </div>
    </div>
    <div class="modal fade" id="editItem" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Insert Your Item </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Item:</label>
                <input type="text" class="form-control" v-model="objItem.item">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Price:</label>
                <input type="text" class="form-control" v-model="objItem.price">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Stock:</label>
                <input type="text" class="form-control" v-model="objItem.stock">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Description:</label>
                <input type="text" class="form-control" v-model="objItem.description">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="edited()">Edit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import swal from 'sweetalert2'
  import Ngedit from '@/components/Ngedit.vue'

  export default {
    computed:{
      listItem(){
        return this.$store.state.listItem
      }
    },
    data(){
      return{
        objItem: {
          _id:'',
          item: '',
          price: '',
          description: '',
          stock: ''
        }
      }
    },
    methods:{
      edited () {
        axios.put('http://localhost:3000/items/update/'+this.objItem._id, {
          item: this.objItem.item,
          price: this.objItem.price,
          stock: this.objItem.stock,
          description: this.objItem.description
        })
        .then((value) => {
          this.$store.dispatch('loadData')
        })
        .catch((err) => {
          console.log(err);
        })
      },
      openModalEdit (list) {
        this.objItem._id = list._id
        this.objItem.item = list.item
        this.objItem.price = list.price
        this.objItem.stock = list.stock
        this.objItem.description = list.description
      },
      deleteItem(list){
        axios.delete('http://localhost:3000/items/delete/'+list._id)
        .then((value) => {
          this.$store.dispatch('loadData')
          swal(
            'Ooopppsss..',
            'You deleted an item',
            'error'
          )
        })
        .catch((err) => {
          console.log(err);
        })
      },

      cekAuth(){
        if(localStorage.getItem('token')){

        }else{
          this.$router.push('/')
        }
      }
    },
    created(){
      this.$store.dispatch('loadData')
      this.cekAuth()
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
