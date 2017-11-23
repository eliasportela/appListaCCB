<template>
  <div class="w3-padding w3-text-white">
    <a href="#/" class="w3-button w3-display-topleft w3-hide-large">
      <h5><i class="fa fa-chevron-left"></i> voltar</h5>
    </a>
    <div class="w3-text-white w3-hide-small w3-hide-medium">
      <a href="#/" class="w3-btn w3-display-topleft">
        <h5 class="w3-opacity"><b>Lista CCB</b></h5>
      </a>
    </div>
    <div class="w3-display-middle container" style="width:90%">
      <div>
        <input class="w3-input" type="text" placeholder="Pesquisar estado" v-model="filtro">
      </div>
      <br>
      <div class="w3-display-middle" v-show="load">
        <i class="fa fa-spinner fa-spin fa-3x"></i>
      </div>
      <div class="background" style="overflow-y:auto; height: 60vh;">
        <a v-for="estado in limitBy(filterBy(estados, filtro), 7)" :href="'#/sel-cidade/' + estado.id_estado" class="w3-cell-row w3-border-bottom linka">
          <div class="w3-cell" style="width:80%">
            <p>{{estado.nome_estado}}</p>
          </div>
          <div class="w3-cell w3-right-align" style="width:10%">
            <i class="fa fa-chevron-right"></i>
          </div>
        </a>
      </div>
    </div>
  </div>  
</template>

<script>
import {focus} from 'vue-focus'

export default {
  directives: { focus: focus },
  name: 'app',
  data () {
    return {
      resource: this.$resource('https://listaccb.com/adm/app/estados'),
      filtro: '',
      estados: [],
      load : true,
      focus: true,
      }
  },
    methods: {
      initialize () {
        this.resource.get({}).then((response) => {
          this.estados = response.data
          this.load = false
        })
      }
    },
    created: function () {
      //this.initialize(),
      this.initialize();
    }
  }

</script>

<style>
 .title {
  display: none;
 }
</style>