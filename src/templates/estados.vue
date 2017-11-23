<template>
  <div class="w3-padding w3-text-white">
    <div class="w3-text-white w3-hide-large">
      <a onclick="window.history.back()" class="w3-btn w3-display-topleft">
        <h5><i class="fa fa-chevron-left"></i> voltar</h5>
      </a>     
    </div>
    <div class="w3-text-white w3-hide-small w3-hide-medium">
      <a href="#/" class="w3-btn w3-display-topleft">
        <h5 class="w3-opacity"><b>LISTA CCB</b></h5>
      </a>
    </div>
    <div class="w3-display-middle container" style="width:90%;">
      <h5 class="w3-center w3-hide-small">Selecione o estado</h5>
      <div>
        <input class="w3-input" type="text" placeholder="Pesquisar estado" v-model="filtro">
      </div>
      <br>
      <div class="w3-display-middle" v-show="load">
        <i class="fa fa-spinner fa-spin fa-3x"></i>
      </div>
      <div class="background" style="overflow-y:auto; height: 55vh;">
        <a v-for="estado in limitBy(filterBy(estados, filtro), 27)" :href="'#/listas/' + estado.id_estado" class="w3-cell-row w3-border-bottom linka">
          <div class="w3-cell" style="width:80%">
            <p>{{estado.nome_estado}}</p>
          </div>
          <div class="w3-cell w3-right-align" style="width:10%">
            <i class="fa fa-chevron-right"></i>
          </div>
        </a>
        <div class="w3-margin-bottom w3-center w3-padding" v-show="!load">
          <p>Não encontrou o seu estado?</p>
          <p>Divulgue as lista de sua região no Lista CCB</p>
          <a href="#/inscrever" class="w3-btn w3-teal w3-round w3-block w3-hide-medium w3-hide-large">
            Saiba mais <i class="fa fa-chevron-right"></i>
          </a>
          <a href="#/contato" class="w3-btn w3-teal w3-round w3-hide-small">
            Saiba mais <i class="fa fa-chevron-right"></i>
          </a>
        </div>
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