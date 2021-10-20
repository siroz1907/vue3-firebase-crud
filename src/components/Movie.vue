<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Movie",
  props: {
    person: {
      type: Object,
      required: true,
    }
  },

  setup() {},

  computed:{
      oneTest(){
          return " Person ID :"+this.person.id;
      }

      ,PersonEditPath(){
          return `/Edit/${this.person.id}`;
      }
  }
});
</script>


<template>
  
    <div class="card">
      <router-link :to="PersonEditPath">
        <img class="card-img-top" :src="person.src" alt="Card image cap" />
      </router-link>

      <div class="card-body">
        <h5 class="card-title">{{person.adi}}</h5>
        <p class="card-text">
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </p>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago {{oneTest}} </small>
      </div>
    </div>
  
</template>

<style>
    .card{
        max-width: 400px;
        margin-bottom: 20px;
    }
</style>