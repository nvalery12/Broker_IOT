<script setup>

  import dispositivos from './components/dispositivos.vue';
  import favoritos from './components/favoritos.vue';
  import grupos from './components/grupos.vue';
  import { ref, computed } from 'vue';

  const name = 'vue dinamico';
  const styleColor = "color: blue";
  let nro = ref(0);

  const handleClick = () =>{ 
    console.log('me activaste');
    nro.value++;
    console.log(nro.value);
  };

  const icons = {
    flash: './icons/flash.svg',
    flash_aoutline: './icons/flash-outline.svg',
    ligthBulb: './icons/LightBulb.svg',
    ligthBulb_outline: './components/icons/LightBulb-outline.svg',
    notFound: './icons/notFound.svg',
    plus: './icons/Plus.svg',
    thermometer: './icons/thermometer.svg',
    termometer_outline: './components/icons/thermometer-outline.svg',
    tv: './icons/Tv.svg',
    tv_outline: './icons/Tv-outline.svg',
    videoCamera: './icons/VideoCamera.svg',
    videoCamera_outline: './components/icons/VideoCamera-outline.svg',
    volumenHigh: './icons/volume-high.svg',
    volumenHigh_outline: './icons/volume-high-outline.svg'
  }

  const dispositivosElementos = [
    {name: 'Luces', icon: icons.ligthBulb_outline}, 
    {name: 'Termometros', icon: icons.termometer_outline},
    {name: "TV's", icon: icons.tv_outline},
    {name: 'Enchufes', icon: icons.flash_aoutline}
  ];

  const dispositivosFavoritos = [
  {name: 'Aire', estado: false, icon: icons.notFound}, 
  {name: 'Camara', estado:true, icon: icons.videoCamera_outline},
  {name: "TV Room 1", estado: true, icon: icons.tv_outline},
  {name: 'Luz Tele', estado: false, icon: icons.ligthBulb_outline},
  {name: 'Mesa Raquel', estado: false, icon: icons.volumenHigh_outline},
  {name: 'Mueble', estado: true, icon: icons.notFound}
  ];

  const gruposElementos = [
    {name:'baño', background:'background-color: #181818;'},
    {name:'Cuarto2', background:'background-color: #00BD7E;'}
  ];

  // const classCounter = computed(() =>{
  //   return;
  // });

</script>

<template>
  <dispositivos :dispositivos="dispositivosElementos"/>
  <favoritos :favoritos="dispositivosFavoritos"/>
  <grupos :grupos = "gruposElementos"/>

</template>

<style>

  :root{
    --background: #fff;
    --backgroundComp: #E8E9E9;
    --focus: #D8D7D8;
    --on: #2074A4;
    --letra: #0E0B0F;
  }
  *{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--background);
    color: var(--letra);

    transition: 0.3s;
  }
  .dispositivos,
  .favoritos
  .grupos{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .dispositivos__carrousel,
  .favoritos__carrousel,
  .grupos__carrousel
  {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .dispositivos__carrousel__element,
  .favoritos__carrousel__element,
  .grupos__carrousel__element
  {

    height: 150px;
    width: 150px;
    margin: 5px;
    padding: 10px;
    border-radius: 15px;

    background-color: var(--backgroundComp);
    
    transition: 0.3s;
    user-select: none;
  }
  .dispositivos__carrousel__element:hover,
  .favoritos__carrousel__element:hover,
  .grupos__carrousel__element:hover{
    cursor: pointer;
  }
  .dispositivos__carrousel__element:focus,
  .favoritos__carrousel__element:focus,
  .grupos__carrousel__element:focus{
    background-color: var(--focus);
  }
  .dispositivos__carrousel__element p,
  .favoritos__carrousel__element p,
  .grupos__carrousel__element p
  {
    background-color: #0e0b0f00;
  }
  img
  {
    height: 50px;
    object-fit: contain;
  }
  svg{
    background-color: #0e0b0f00;
    height: 35px;
  }
</style>