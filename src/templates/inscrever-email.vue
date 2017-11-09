<template>
  <div class="w3-text-white">
    <div>
      <a onclick="window.history.back()" class="w3-button w3-display-topleft">
        <h5><i class="fa fa-chevron-left"></i> voltar</h5>
      </a>     
    </div>
    <div class="w3-display-middle w3-center" style="width:80%;z-index:1;display:none" id="load">
      <div class="w3-card-4 w3-padding-16 w3-white w3-text-teal w3-border">
        <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
        <p>Enviando, aguarde..</p>
      </div>
    </div>
    <div class="w3-display-middle w3-padding" style="width:90%;">
      <p class="w3-center">Preencha os dados abaixo para enviarmos as instruções em seu e-mail</p> 
        <label class="w3-cell-row">
          <div class="w3-cell" style="width:10%">
            <i class="fa fa-user"></i>
          </div>
          <div class="w3-cell">
            <input type="text" class="w3-input" name="nome" id="nome" placeholder="Nome" v-model="dados.nome">
          </div>
        </label>
        <br>
        <label class="w3-cell-row">
          <div class="w3-cell" style="width:10%">
            <i class="fa fa-envelope-o"></i>
          </div>
          <div class="w3-cell">
            <input type="text" class="w3-input" name="email" id="email" placeholder="E-mail" v-model="dados.email">
          </div>
        </label>
        <br>
        <div class="w3-margin-top w3-center">
          <button class="w3-button w3-round w3-teal w3-block" @click="enviar">
            Enviar <i class="fa fa-paper-plane"></i>
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
        "nome": ''
      },
    }
  },
  methods: {
      enviar(){
        if (this.dados.email == '') {
          return ''
        }else{
          // POST /someUrl
          $('#load').show();
          jQuery.ajax({
            type: "POST",
            url: 'https://listaccb.com/adm/app/email',
            data: this.dados,
            success: function(result){
              swal({title: "Sucesso!",  text: "Enviamos as instruções em seu e-mail! Verifique sua caixa de entrada",
                  type: "success"
              },
              function(){
                $('#load').hide();
                console.log(result);
              });
            },
            error: function(result)
            { 
              swal({title: "Erro!", text: "Erro ao enviar requisão ao servidor. Tente Novamente!", type: "error"},function(){
                $('#load').hide();
              });
            }
          });
          this.dados.nome = '';
          this.dados.email = '';
        }
      }
    }
}
</script>
<style scoped>
</style>