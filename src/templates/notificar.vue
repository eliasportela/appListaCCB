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
    <div class="w3-display-middle w3-text-white w3-center container background" style="width:80%;height:40vh;">
      <p>
        Receba notificações em seu e-mail de cadastros de listas da sua região
      </p>
      <br>
      <p class="w3-padding">Selecione a sua região</p>
      <a href="#/sel-regiao" class="w3-btn w3-round w3-teal w3-block">
        Selecionar <i class="fa fa-chevron-right"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
}
</script>
<style scoped>
</style>