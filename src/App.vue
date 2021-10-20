<script>
import { mapGetters } from "vuex";

import {signInWithEmail} from './services/firebase_authantication.js'

import AppHeader from './components/AppHeader.vue';
import Login from './views/Login.vue';

export default {
  name: 'App',  
  components: {
    AppHeader,
    Login,
  },  
  data(){
    
    return{
      
      
    }
  },
  created() {
        

    const data = signInWithEmail("your-mail-adress", "6 character passs").then((res)=>{
      console.log("getUserFireBase finish ", res)      
    });

    console.log("data response :", data);

  },
  computed:{
    ...mapGetters(["getIsLogin"]),

  },
  
  methods: {
    
  },
}
</script>

<template>
  
  <AppHeader v-if="getIsLogin"/> 
  
  <Login v-if="!getIsLogin"/>

  <router-view  v-if="getIsLogin"/> 
  
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
