<template>
  <div class="w3-padding w3-text-white">
    <!--Componete load-->
    <div class="w3-display-middle w3-center" style="width:90%" v-show="load">
      <i class="fa fa-spinner fa-spin fa-3x" v-show="!msg"></i><br>
    </div>
    <!--Botoes do cabecalho-->
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
    
    <!--Titulo-->
    <div class="w3-display-middle container" style="width:90%">
      <div class="w3-center">
        <div v-show="loadculto">
          <h5><i class="fa fa-th-list w3-text-white"></i></h5>
          <p>{{regiao}} <br class="w3-hide-large w3-hide-medium"> <span class="w3-hide-small"> - </span> {{mes}} de {{ano}}</p>  
        </div>
      </div>
      <!--Painel principal-->
      <div style="overflow-y:auto; height: 50vh;" class="background web" v-show="!load">
        <div v-show="loadculto">
          <a v-for="obj in listaculto" :href="'#/detalhes/'+ obj.id_lista_culto" class="w3-cell-row w3-border-bottom w3-center">
            <div class="w3-cell w3-cell-middle" style="width:20%">
              {{obj.data}}
            </div>
            <div class="w3-cell w3-cell-middle" style="width:65%">
              <p><small>{{obj.nome_servico}} - {{obj.nome_cidade}} ({{obj.ds_igreja}})</small></p>
            </div>
            <div class="w3-cell w3-cell-middle w3-hide-large w3-hide-medium" style="width:15%">
              <i class="fa fa-info-circle"></i>
            </div>  
            <div class="w3-cell w3-cell-middle w3-hide-small" style="width:15%">
              <button class="w3-btn w3-border">Informações</button>
            </div>  
          </a>
          <div class="w3-padding-8 w3-padding w3-center" v-show="baixar">
            <p>Baixar a lista no formato PDF</p>
            <a :href="'https://listaccb.com/adm/uploads/listas/' + lista.file_lista" class="w3-btn w3-teal w3-block" download>
              <i class="fa fa-cloud-download"></i>
              Baixar Lista
            </a>  
          </div>
          <div class="w3-margin-bottom w3-center w3-padding">
            <p>Receba as listas da sua região</p>
            <a href="#/receber-lista">
              <button class="w3-btn w3-teal w3-block"><i class="fa fa-envelope"></i> Cadastrar e-mail</button>  
            </a>
          </div>
        </div>
        <div class="w3-display-middle w3-center" style="width:90%" v-show="msg">
          <p>
            <i class="fa fa-frown-o fa-2x"></i>
          </p>
          {{msg}}
          <div class="w3-margin-bottom">
            <div v-show="baixar">
              <p>Baixar lista completa da região</p>
              <br>
              <a :href="'https://listaccb.com/adm/uploads/listas/' + lista.file_lista" class="w3-btn w3-teal w3-round" download>
                Baixar Lista
                <i class="fa fa-chevron-right"></i>
              </a>
            </div>
            <div class="w3-padding">
              <a href="#/receber-lista">
                <button class="w3-btn w3-teal w3-round w3-block"><i class="fa fa-envelope"></i> Cadastrar e-mail</button>
              </a>
            </div>
            <div class="w3-margin-top w3-center">
              <div v-show="loadBad" class="w3-padding">
                <a href="#/contato" class="w3-btn w3-teal w3-block">
                  <i class="fa fa-users"></i>
                  Junte-se a nós
                </a>
                <div class="w3-center w3-margin-bottom w3-hide">
                  <p>Lista desatualizada?</p>
                  <button class="w3-btn w3-teal w3-block"><i class="fa fa-info"></i> Informe-nos</button>  
                </div>
              </div>
            </div>  
          </div>
        </div>
      </div>
    </div>
    <div class="w3-display-bottommiddle w3-hide-large w3-hide-medium w3-center w3-margin-bottom" style="width:90%">
      <i class="fa fa-chevron-down"></i>
    </div>
    <!--Painel principal fim-->
    
    
  </div>  
</template>

<script>
import {focus} from 'vue-focus'


export default {
  name: 'app',
  directives: { focus: focus },
  data () {
    return {
      resourceLista: this.$resource('https://listaccb.com/adm/app/lista-id?id='+ this.$route.params.id),
      resource: this.$resource('https://listaccb.com/adm/app/lista?id=0&lista='+ this.$route.params.id),
      lista: [],
      listaculto: [],
      load: true,
      loadculto: false,
      loadlista: false,
      baixar: false,
      upload: false,
      loadBad: false,
      regiao: '',
      mes: '',
      ano: '',
      id_estado: '',
      msg: '',
      }
  },
    methods: {
      initialize () {
        
        this.resourceLista.get({}).then((response) => {
          this.lista = response.data[0];
          this.ano = this.lista.data_lista;
          this.mes = this.lista.nome_mes;
          this.regiao = this.lista.nome_regiao;
          this.id_estado = this.lista.id_estado;
          
          if (this.lista.file_lista) {
            this.baixar = true;
          }else{
            this.upload = true;
          }

          if (this.lista) {
            this.load = true;
            // se encontar a lista entao procura os cultos
              this.resource.get({}).then((response) => {
                this.listaculto = response.data;
                this.loadculto = true;
                this.load = false;
              },response => {
                  this.msg = "Lista desatualizada";
                  this.loadBad = true;
                  this.load = false;
                  this.baixar = false;
              });
              //termina consulta por cidadde
            this.loadlista = true;
          }
        },response => {
            this.msg = "Nenhuma lista cadastrada";
            this.load = false;
            this.loadBad = true;
            this.baixar = false;
        });
        //termina consulta da lista
     
      }
    },
    created: function () {
      //this.initialize(),
      this.load = true;
      this.initialize();
    }
  }  
</script>
<style scoped>
  a{
    text-decoration: none;
  }

</style>