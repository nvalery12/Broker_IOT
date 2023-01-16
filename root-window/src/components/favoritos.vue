<script setup>
  import dispositivo from './favoritos_element.vue';

  defineProps({
    favoritos: {
      type: Array,
      required: true
    }
  });
</script>

<template>
  <div class="favoritos">
    <h2>FAVORITOS</h2>
    <div class="favoritos__carrousel">
      <dispositivo v-for="element in favoritos" :key="element.name" :dispositivo="element"/>
    </div>
  </div>
</template>