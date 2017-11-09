<template>
  <div class="w3-padding w3-text-white">
    <a onclick="window.history.back()" class="w3-button w3-display-topleft">
      <h5><i class="fa fa-chevron-left"></i> voltar</h5>
    </a>
    <div class="w3-display-middle" style="width:90%">
      <div>
        <input class="w3-input" type="text" placeholder="Pesquisar cidade" v-model="filtro">
      </div>
      <br>
      <div class="w3-display-middle" v-show="load">
        <i class="fa fa-spinner fa-spin fa-3x"></i>
      </div>
      <div class="w3-border" style="overflow-y:auto; height: 60vh;">
        <a v-for="cidade in limitBy(filterBy(cidades, filtro), 20)" :href="'#/lista/' + cidade.id_cidade" class="w3-cell-row w3-border-bottom linka">
          <div class="w3-cell" style="width:80%">
            <p>{{cidade.nome_cidade}}</p>
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
      resource: this.$resource('https://listaccb.com/adm/app/cidades?id='+ this.$route.params.id),
      filtro: '',
      cidades: [],
      load : true,
      focus: true,
      }
  },
    methods: {
      initialize () {
        this.resource.get({}).then((response) => {
          this.cidades = response.data
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