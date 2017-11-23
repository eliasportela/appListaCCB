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
          <p>{{cidade}} <br> <small>{{mes}} de {{ano}}</small></p>  
        </div>
      </div>
      <!--Painel principal-->
      <div style="overflow-y:auto; height: 50vh;" class="background" v-show="!load">
        <div v-show="loadculto">
          <a v-for="obj in listaculto" :href="'#/detalhes/'+ obj.id_lista_culto" class="w3-cell-row w3-border-bottom w3-center">
            <div class="w3-cell w3-cell-middle" style="width:15%">
              {{obj.data}}
            </div>
            <div class="w3-cell w3-cell-middle" style="width:75%">
              <p><small>{{obj.nome_servico}} - {{obj.nome_cidade}} ({{obj.ds_igreja}})</small></p>
            </div>
            <div class="w3-cell w3-cell-middle" style="width:10%">
              <i class="fa fa-info-circle"></i>
            </div>  
          </a>
          <div class="w3-padding-8 w3-padding w3-center" v-show="baixar">
            <p>Baixar a lista no formato PDF</p>
            <a :href="'https://listaccb.com/adm/uploads/listas/' + lista.file_lista" class="w3-btn w3-teal w3-block" download>
              <i class="fa fa-cloud-download"></i>
              Baixar Lista
            </a>  
          </div>
          <div class="w3-center w3-padding">
            <a :href="'#/cultos/' + lista.id_lista" class="w3-btn w3-teal w3-block">
              Acessar Lista
              <i class="fa fa-chevron-right"></i>
            </a>     
          </div>
          <div class="w3-margin-bottom w3-center w3-padding">
            <p>Receba as listas da sua região</p>
            <a href="#/receber-lista">
              <button class="w3-btn w3-teal w3-block"><i class="fa fa-envelope"></i> Cadastrar e-mail</button>  
            </a>
          </div>
        </div>
        <div class="w3-center w3-padding-32" v-show="msg">
          <i class="fa fa-frown-o fa-2x"></i>
          <p>{{msg}}</p>
          <div class="w3-margin-bottom">
            <div class="w3-margin-top w3-center">
              <div v-show="baixar" class="w3-padding">
                <a :href="'https://listaccb.com/adm/uploads/listas/' + lista.file_lista" class="w3-btn w3-teal w3-block" download>
                  <i class="fa fa-cloud-download"></i>
                  Baixar Lista da Região
                </a>     
              </div>
              <div v-show="loadlista" class="w3-padding">
                <a :href="'#/cultos/' + lista.id_lista" class="w3-btn w3-teal w3-block">
                  Acessar Lista
                  <i class="fa fa-chevron-right"></i>
                </a>     
              </div>
              <div v-show="loadBad" class="w3-padding">
                <a href="#/contato" class="w3-btn w3-teal w3-block">
                  <i class="fa fa-cloud-upload"></i>
                  Envie-nos a lista
                </a>
              </div>
            </div>  
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import {focus} from 'vue-focus'


export default {
  name: 'app',
  directives: { focus: focus },
  data () {
    return {
      resourceLista: this.$resource('https://listaccb.com/adm/app/lista?id='+ this.$route.params.id),
      resource: this.$resource('https://listaccb.com/adm/app/lista-cidade?id='+ this.$route.params.id),
      lista: [],
      listaculto: [],
      load: true,
      loadculto: false,
      loadlista: false,
      baixar: false,
      loadBad: false,
      cidade: '',
      ano: '',
      mes: '',
      id_lista: '',
      msg: '',
      }
  },
    methods: {
      initialize () {
        
        this.resourceLista.get({}).then((response) => {
          this.lista = response.data[0];
          this.mes = this.lista.nome_mes;
          this.id_lista = this.lista.id_lista;
          this.ano = this.lista.data_lista;
          
          if (this.lista.file_lista) {
            this.baixar = true;
          }

          if (this.lista) {
            this.load = true;
            // se encontar a lista entao procura a cidade
              this.resource.get({}).then((response) => {
                this.listaculto = response.data;
                this.cidade = this.listaculto[0].nome_cidade;
                this.loadculto = true;
                this.load = false;
              },response => {
                  this.msg = "Nenhum serviço de culto disponível para esta cidade";
                  this.load = false;
              });
              //termina consulta por cidadde
            this.loadlista = true;
          }
        },response => {
            this.msg = "Nenhuma lista cadastrada para a região desta cidade";
            this.load = false;
            this.loadBad = true;
            this.load = false;
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
  .list {
    cursor: pointer;
}
  a{
    text-decoration: none;
  }
</style>