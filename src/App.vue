<template>
  <div class="bgimg">
    <div style="height: 100vh; background-color:rgba(0,0,0,.4)" class="device">
      <menuh></menuh>
      <router-view></router-view>
    </div>  
  </div> 
</template>

<script>

import menuh from './templates/header.vue'
import bar from './templates/bar.vue'

export default {
  name: 'app',
  components: { menuh, bar },
  created: function () {
    /*/ comentar no modo producao
    setTimeout(function () {
        let viewheight = $(window).height();
        let viewwidth = $(window).width();
        let viewport = document.querySelector("meta[name=viewport]");
        viewport.setAttribute("content", "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0");
    }, 300);
    /*/
  }
}

</script>

<style>
 .w3-card {
  background-color: rgba(0, 0, 0, 0.4);
 }
 .w3-input {
  background-color: rgba(0,0,0,0);
  color: white;
 }
 *:focus {
    outline: none;
}
.w3-input{
    border-bottom: 2px solid white;
    color: white;
  }
  .w3-border-bottom{
    border-bottom: 2px solid #fff !important
  }
  .w3-btn:hover {
    box-shadow: none !important;
  }

@media screen and (min-width: 768px) {
  .container{width: 60% !important; padding: 5%;}
  p {font-size: 1.1em}
}

</style>
