<script setup>
import dispositivos_element from './disporitivos_element.vue'
import dispositivos_element_plus from './dispositivos_element_plus.vue'
defineProps({
  dispositivos: {
    type: Array,
    required: true
  }
});

// console.log(dispositivos);

</script>

<template>
  <div class="dispositivos">
    <h2 class="disposotivos--tittle">DISPOSITIVOS</h2>
    
    <div class="dispositivos__carrousel">
      <dispositivos_element
        v-for="element in dispositivos" :key="element.name" 
        :name = 'element.name' :icon="element.icon"
      />
      <dispositivos_element_plus
        name = 'Todos los dispositivos' icon="./icons/ellipsis-horizontal-outline.svg"
      />
      <!-- <dispositivos_element name = 'jose luis' icon = './icons/6541879.png'  /> -->
    </div>
  </div>
  

</template>