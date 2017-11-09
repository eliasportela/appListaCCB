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
        <h5><b>Lista CCB</b></h5>
      </a>
    </div>
    <!--Titulo-->
    <div class="w3-display-middle" style="width:90%">
      <div class="w3-center">
        <div v-show="loadculto">
          <p>{{cidade}} <br> {{mes}} de {{ano}}</p>  
        </div>
        <div class="w3-padding" v-show="msg">
          <a href="#/receber-lista">
            <button class="w3-btn w3-teal w3-round w3-block"><i class="fa fa-envelope"></i> Cadastrar e-mail</button>
          </a>
        </div>
      </div>
      <!--Painel principal-->
      <div style="overflow-y:auto; height: 60vh;" class="w3-border" v-show="!load">
        <div v-show="loadculto" class="w3-border">
          <a href="#" v-for="obj in listaculto" class="w3-cell-row w3-border-bottom w3-center">
            <div class="w3-cell w3-cell-middle" style="width:20%">
              {{obj.data}}
            </div>
            <div class="w3-cell w3-cell-middle" style="width:70%">
              <p>{{obj.nome_servico}} <br> <small>{{obj.nome_cidade}}</small> <br> <small>{{obj.ds_igreja}}</small></p>
            </div>
            <div class="w3-cell w3-cell-middle" style="width:10%">
              <i class="fa fa-chevron-right"></i>
            </div>  
          </a>
          <div class="w3-padding-8 w3-padding w3-center" v-show="baixar">
            <p>Baixar a lista no formato PDF</p>
            <a :href="'http://adm.listaccb.com/uploads/listas/' + lista.file_lista" class="w3-btn w3-teal w3-block" download>
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
                <a :href="'http://adm.listaccb.com/uploads/listas/' + lista.file_lista" class="w3-btn w3-teal w3-block" download>
                  <i class="fa fa-cloud-download"></i>
                  Baixar Lista
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