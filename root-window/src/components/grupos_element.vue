<script setup>
  defineProps({
    name:{
      type: String,
      required: true
    },
    background:{
      type: String,
      required: true
    }
  });

</script>

<template>
  <div class="grupos__carrousel__element" :style="background">
    <h3 class="grupos__grupo__element--title">{{ name }}</h3>
  </div>
</template>