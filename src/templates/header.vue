<template>
  <div>
    <!--Cabecalho em desktop-->
    <div class="w3-text-white w3-hide-small w3-hide-medium">
      <div class="w3-display-topright">
        <a href="#/sel-estado" class="w3-btn">
          <h6 class="w3-opacity" style="font-size:0.9em"><b>PESQUISAR CIDADES</b></h6>
        </a>
        <a href="#/contato" class="w3-btn">
          <h6 class="w3-opacity" style="font-size:0.9em"><b>INFORMAÇÕES</b></h6>
        </a>
        <a href="https://listaccb.com/adm/login" class="w3-btn">
          <h6 class="w3-opacity" style="font-size:0.9em"><b>LOGIN</b></h6>
        </a>
      </div>
    </div>
    <!--Cabecalho em dispositivos moveis-->
    <div class="w3-text-white w3-hide-large">
      <button @click="menuAction" class="w3-btn w3-display-topright w3-hover">
        <h4 style="padding-right:8px;"><i class="fa fa-bars"></i></h4>
      </button>
    </div>
    <div v-show="menu" class="w3-display-bottommiddle w3-teal w3-round w3-text-white" style="width:100%;z-index:1">
      <div class="w3-cell-row w3-card-2" style="padding-top:5px">
        <a class="w3-cell w3-center" style="width:25%;" @click="home">
          <i class="fa fa-home"></i><br><small>Início</small>
        </a>
        <a class="w3-cell w3-center" style="width:25%" @click="estado">
          <i class="fa fa-map-marker"></i><br><small>Cidades</small>
        </a>  
        <a class="w3-cell w3-center" style="width:25%" @click="contato">
          <i class="fa fa-info-circle"></i><br><small>Informações</small>
        </a>  
        <a class="w3-cell w3-center linka" style="width:25%" href="https://listaccb.com/adm/login">
          <i class="fa fa-external-link"></i><br><small>Login</small>
        </a>  
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'app',
    data () {
      return {
        menu : false,
      }
    },
    methods: {
      menuAction() {
        this.menu = !this.menu;
      },
      home(){
        this.menu = false;
        window.location.href = '#/';
      },
      estado(){
        this.menu = false;
        window.location.href = '#/sel-estado';
      },
      contato(){
        this.menu = false;
        window.location.href = '#/contato';
      }
    }
}
</script>

<style scoped>
  .show {
    z-index: 1;
    margin-left: -14px;
    margin-right: -14px;
  }
  .selecionado {
    border-top: 2px solid #fff;
  }
</style>