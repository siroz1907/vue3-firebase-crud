<script>
import { mapGetters } from "vuex";

import Loader from "../components/Loader.vue";
import Movie from "../components/Movie.vue";

export default {
  components: {
    Loader,
    Movie,
  },
  data() {
    return { isLoading: true };
  },

  //computed property
  computed: {
    ...mapGetters(["gettersPersons", "getGroupPersons"]),
  },

  created() {
    this.$store.dispatch("getPersons").then(() => {
      this.isLoading = false;

      //console.log("ttt");
    });
  },
};
</script>


<template>
  <loader v-if="isLoading" />
  <section class="container card-group py-3">
    <div class="card-group" v-for="item in getGroupPersons" :key="item">
      <!-- state den direk çekerek bu şekilde
   <movie v-for="kisi in $store.state.kisiler" :key="kisi.id"/> 
   !-->
      <!-- statte tanımlı getter den çekmek bu şekilde !-->
      <movie v-for="person in item" :key="person.id" :person="person" />
    </div>
  </section>
</template>
