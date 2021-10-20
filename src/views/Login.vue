<script>

import { reactive } from "vue";

import Loader from "../components/Loader.vue";

export default {
  components:{
      Loader,
  },
  data() {
    const form = reactive({
      personApartNo:-1,
      apartNo:-1,
    });

    return {form, isLoading: true };
  },
 
  created(){

    this.$store.dispatch("getPersons").then(() => {
      this.isLoading = false;

      //console.log("ttt");
    });
    
  },
  computed: {
    getAparts() {
      let aparts = new Array(35);
      //console.log(dairler.length);
      for (let i = 0; i < aparts.length; i++) {
        aparts[i] = { no: i, id: i };
      }      
      return aparts;
    },
    
  },
  methods:{
    onGirisClick(){
      
      const person = this.$store.state.persons.find(el=>el.no == this.form.personApartNo);
      const apart = this.getAparts.find(el=>el.no == this.form.apartNo);

      //console.log(kisi, this.form.kisiDaireNo);
      //console.log(apart,this.form.apartNo);
      
      const val =( (this.form.apartNo>0 && this.form.personApartNo>0) ? (apart.no == person.no ) :false);
      //console.log("val : ",val);



      this.$store.dispatch("actionSetIsLogin",val).then(() => {
        console.log('Login success', this.form);
      });      
      
    }

  }
};
</script>


<template>

  <Loader v-if="isLoading" />  

  <div v-if="!isLoading" class="container-fluid vh-100" style="margin-top: 300px">
    <div class="" style="margin-top: 200px">
      <div class="rounded d-flex justify-content-center">
        <div class="col-md-4 col-sm-12 shadow-lg p-5 bg-light">
          
          <form @submit.prevent="onGirisClick">
            <div class="p-4">
              <div class="input-group mb-3">
                <span class="input-group-text bg-primary"
                  ><i class="bi bi-person-plus-fill text-white"></i
                ></span>

                <select class="form-select mb-1" aria-label=".form-select example" v-model="form.personApartNo">
                  <option selected value="-1">Residents </option>
                  <option
                    v-for="person in this.$store.state.persons"
                    :key="person"
                    :value="person.no"
                  >
                    {{ person.adi }}
                  </option>
                </select>                
                
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text bg-primary"
                  ><i class="bi bi-key-fill text-white"></i
                ></span>

                <select class="form-select mb-1" aria-label=".form-select example" v-model="form.apartNo">
                  <option selected value="-1">Apart no choice !</option>
                  <option
                    v-for="apart in getAparts"
                    :key="apart"
                    :value="apart.no"
                  >
                    {{ apart.no }}
                  </option>
                </select>
              </div>
              <button class="btn btn-primary text-center mt-2">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>