import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import axios from "axios";

export default new Vuex.Store({
  state: {
    listItem : [],
    listCart : [],
    admin: false,
  },
  mutations: {
    updateListItem:(state,dataItem)=>{
      state.listItem = dataItem;
    },
    updateAdm:(state,statusAdmin)=>{
      state.admin = statusAdmin;
    },
    updateListCart:(state,dataCart)=>{
      let item  = dataCart.stock -= 1;
      if(item  >= 0){
        let obj = {
          id : dataCart._id,
          name : dataCart.item,
          price : dataCart.price,
          stock : dataCart.stock,
          Qty : 1
        };
        if(state.listCart.length === 0){
          state.listCart.push(obj);
        }else{
          let checkItem = false;
          for(let i = 0 ; i < state.listCart.length ; i++){
            if(state.listCart[i].name === obj.name){
              state.listCart[i].price += obj.price;
              state.listCart[i].Qty += 1;
              checkItem = true;
            }
          }
          if (!checkItem) {
            state.listCart.push(obj);
          }
        }
      }else{
        dataCart.stock = 0;
      }
    },

    deleteListCart: (state,itemName)=>{
      for(let i = 0 ; i < state.listCart.length ; i++){
        if(state.listCart[i].id === itemName.id){
          state.listCart.splice(i,1);
          for(let j = 0 ; j < state.listItem.length ; j++){
            if(state.listItem[j]._id === itemName.id){
              state.listItem[j].stock += itemName.Qty;
            }
          }
        }
      }
    },

    makeCartEmpty: (state)=>{
      console.log('masuk empty');
      state.listCart = [];
    }
  },
  actions: {
    loadData({
      commit
    }){
      axios.get('http://localhost:3000/items/allitem')
      .then((value) => {
        commit('updateListItem',value.data.dataItem);
      })
      .catch((err) => {
        console.log(err);
      });
    },

    cekAdm({
      commit
    }){
      let statusAdmin = localStorage.getItem('admin');
      commit('updateAdm',statusAdmin);
    },

    buyItem({
      commit
    },payload){
      commit('updateListCart',payload);
    },

    undoCart({
      commit
    },payload){
      commit('deleteListCart',payload);
    },

    emptyCart({
      commit
    }){
      commit('makeCartEmpty');
    }
  }
});
