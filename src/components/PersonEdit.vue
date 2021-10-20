<script>
import { mapGetters } from "vuex";

import { defineComponent, reactive } from "vue";

import { createPerson } from "../services/app_manage";
import Loader from "./Loader.vue";

export default defineComponent({
  components: {
    Loader,
  },
  data() {
    const form = reactive({
      name: "",
      no: "",
      id: "",
    });

    const onSubmit = async () => {
      //console.log(form);

      createPerson({ ...form }).then((res) => {
        //console.log("res");

        console.log(res);
      });
    };

    return { form, onSubmit, isLoading: true, personId: 0 };
  },
  //created mounted e göre life cycle da daha önce çalışıyor. mounted dom'a yüklenmesini bekliyorken, created : komponent oluşurken
  created() {
    this.personId = this.$route.params.kid;
    this.form.name = "";
    
    this.$store.dispatch("getPersonDetail", this.personId).then(() => {
      //console.log("getPersonDetail then ....");

      this.form.name = this.getPersonDetail.adi;

      this.isLoading = false;
    }).catch((err)=>{
        console.log("error :",err);
    }) ;
  },
  mounted() {
    //console.log('mounted ',this.kisiId, this.getKisiDetay);
  },
  computed: {
    toplamTutar: 0,
    ...mapGetters(["getPersonDetail"]),
  },
});
</script>


<template>
  <loader v-if="isLoading" />

  <div class="container" v-show="!isLoading">
    <div class="card card-body mt-4">
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label>Name</label>
          <input v-model="form.name" class="form-control" required />
        </div>

        <div class="form-group mt-3">
          <label>No</label>
          <input v-model="form.no" class="form-control" required />
        </div>

        <div class="form-group mt-2">
          <label>ID</label>
          <input v-model="form.id" class="form-control" required />
        </div>

        <button type="submit" class="btn btn-success mt-3">Create New</button>
      </form>
    </div>
    <div>
      <h1>Summary Payment : {{ getPersonDetail.totalPay }}</h1>
    </div>
  </div>
</template>