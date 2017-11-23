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
    <div class="w3-display-middle container" style="width:90%">
      <div class="w3-center" v-show="loadlista">
        <h5><i class="fa fa-th-list w3-text-white"></i></h5>
        <p>{{culto.nome_cidade}} <br> <small>{{culto.nome_servico}}</small></p>
      </div>
      <div class="w3-display-middle" v-show="load">
        <i class="fa fa-spinner fa-spin fa-3x"></i>
      </div>
      <div class="background" style="overflow-y:auto; height: 53vh" v-show="loadlista">
        <div class="w3-cell-row w3-border-bottom w3-center">
          <div class="w3-cell w3-cell-middle" style="width:10%">
            <i class="fa fa-map-marker w3-hide-medium w3-hide-large"></i> <span class="w3-hide-small">Igreja</span>
          </div>  
          <div class="w3-cell w3-cell-middle" style="width:75%">
            <p>{{culto.ds_igreja}}</p>
          </div>
        </div>
        <div class="w3-cell-row w3-border-bottom w3-center">
          <div class="w3-cell w3-cell-middle" style="width:10%">
            <i class="fa fa-calendar w3-hide-medium w3-hide-large"></i> <span class="w3-hide-small">Data</span>
          </div>  
          <div class="w3-cell w3-cell-middle" style="width:75%">
            <p>{{culto.data}}</p>
          </div>
        </div>
        <div class="w3-cell-row w3-border-bottom w3-center">
          <div class="w3-cell w3-cell-middle" style="width:10%">
            <i class="fa fa-clock-o w3-hide-medium w3-hide-large"></i> <span class="w3-hide-small">Horário</span>
          </div>  
          <div class="w3-cell w3-cell-middle" style="width:75%">
            <p>{{culto.horario}}</p>
          </div>
        </div>
        <div class="w3-cell-row w3-border-bottom w3-center">
          <div class="w3-cell w3-cell-middle" style="width:10%">
            <i class="fa fa-user w3-hide-medium w3-hide-large"></i> <span class="w3-hide-small">Ancião</span>
          </div>  
          <div class="w3-cell w3-cell-middle" style="width:75%">
            <p>{{culto.anciao}}</p>
          </div>
        </div>
        <div class="w3-cell-row w3-border-bottom w3-center" v-show="loadEnsaio">
          <div class="w3-cell w3-cell-middle" style="width:10%">
            <i class="fa fa-music w3-hide-medium w3-hide-large"></i> <span class="w3-hide-small">Encarregado</span>
          </div>  
          <div class="w3-cell w3-cell-middle" style="width:75%">
            <p>{{culto.encarregado}}</p>
          </div>
        </div>
      </div>
      <div v-show="loadBad" class="w3-display-middle w3-center" style="width:90%">
        <i class="fa fa-frown-o fa-2x"></i>
        <p>Infelizmente ainda não temos cadastros de listas neste estado.</p>
        <hr>
        <p>Divulgue as lista de sua região no Lista CCB</p>
        <a href="#/contato" class="w3-button w3-teal w3-round">
          Saiba mais <i class="fa fa-chevron-right"></i>
        </a>
      </div>          
    </div>
  </div>  
</template>

<script>

export default {
  directives: { focus: focus },
  name: 'app',
  data () {
    return {
      resource: this.$resource('https://listaccb.com/adm/app/culto-detalhes?id='+ this.$route.params.id),
      filtro: '',
      culto: [],
      load : true,
      loadlista: false,
      loadEnsaio: false,
      loadBad: false,
      }
  },
    methods: {
      initialize () {
        this.resource.get({}).then((response) => {
          this.culto = response.data[0]
          this.load = false
          this.loadlista = true;
          if (this.culto.id_servico == 5) {
            this.loadEnsaio = true;
          }
        },response => {
            this.load = false;
            this.loadBad = true;
        });
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
 a {
  text-decoration: none;
 }
</style>