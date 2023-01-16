<script setup>
  import grupo_element from './grupos_element.vue';
  defineProps({
    grupos:{
      type: Array,
      required: true
    }
  }); 
</script>
<template>
  <div class="grupos">
    <h2>GRUPOS</h2>

    <div class="grupos__carrousel">
      <grupo_element 
        v-for="element in grupos" :key="element.name" 
        :name = 'element.name' :background="element.background"
      />
    </div>
  </div>
</template>