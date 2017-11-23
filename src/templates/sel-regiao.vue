<template>
  <div class="w3-padding w3-text-white">
    <div class="w3-text-white w3-hide-large">
      <a onclick="window.history.back()" class="w3-btn w3-display-topleft">
        <h5><i class="fa fa-chevron-left"></i> voltar</h5>
      </a>     
    </div>
    <div class="w3-text-white w3-hide-small w3-hide-medium">
      <a href="#/" class="w3-btn w3-display-topleft">
        <h5 class="w3-opacity"><b>Lista CCB</b></h5>
      </a>
    </div>
    <div class="w3-display-middle" v-show="load">
      <i class="fa fa-spinner fa-spin fa-3x"></i>
    </div>
    <div class="w3-display-middle container" style="width:90%">
      <div class="w3-padding-16">
        <input class="w3-input" type="text" placeholder="Pesquisar Região" v-model="filtro">
      </div>
      <div class="background" style="overflow-y:auto; height: 60vh;">
        <a v-for="regiao in limitBy(filterBy(regioes, filtro), 20)" :href="'#/sel-email/' + regiao.id_regiao" class="w3-cell-row w3-border-bottom linka">
          <div class="w3-cell" style="width:80%">
            <p>{{regiao.nome_regiao}} - {{regiao.sigla_estado}}</p>
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
export default {
  name: 'app',
  directives: { focus: focus },
  data () {
    return {
      resource: this.$resource('https://listaccb.com/adm/app/regioes'),
      filtro: '',
      regioes: [],
      focus: true,
      load: true,
      }
  },
    methods: {
      initialize () {
        this.resource.get({}).then((response) => {
          this.regioes = response.data
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

<style scoped>
  li{
    cursor: pointer;
 }
</style>