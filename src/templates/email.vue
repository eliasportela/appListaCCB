<template>
  <div>
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
    <div class="w3-display-middle w3-text-white container background" style="width:90%">
      <div class="w3-center">
        <i class="fa fa-spinner fa-spin fa-2x" v-show="!load"></i>
      </div>
      <p class="w3-center w3-padding">Preencha os dados abaixo para cadastrarmos seu e-mail</p>
      <label class="w3-margin-bottom">
        <i class="fa fa-user"></i> Nome*
        <input type="text" class="w3-input" name="nome" id="nome" placeholder="Informe-nos seu nome" v-model="dados.nome">
      </label>
      <br>
      <label class="w3-margin-bottom">
        <i class="fa fa-envelope"></i> E-mail*
        <input type="text" class="w3-input" name="email" id="email" placeholder="Informe-nos seu e-mail" v-model="dados.email">
      </label>
      <br>
      <div class="w3-center w3-padding">
        <button class="w3-button w3-round w3-teal w3-block" @click="enviar">
          <i class="fa fa-paper-plane"></i> Cadastrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      email: '',
      dados: {
        "email": '',
        "nome": '',
        "regiao:": ''
      },
      load: true,
    }
  },
  methods: {
      enviar(){
        if ((this.dados.email == '')||(this.dados.nome == '')||(this.dados.regiao == '')) {
          swal("Erro!","Todos os campos são obrigatórios. Tente Novamente!","error");
          return ''
        }else{
          this.dados.regiao = this.$route.params.id;
          this.load = false;
          console.log(this.dados.regiao);
          // POST /someUrl
          jQuery.ajax({
            type: "POST",
            url: 'https://listaccb.com/adm/app/assinar',
            data: this.dados,
            success: function(result){
              swal({title: "Sucesso!", text: result, type: "success"},
                function(){
                  this.load = true;
                });
            },
            error: function(result)
            { 
              console.log(result);
              swal("Erro!",result.responseText,"error");
            }
          });
          this.load = true;
        }
      }
    }
}
</script>
<style scoped>  
  .w3-input{
    border-bottom: 2px solid white;
  }
</style>