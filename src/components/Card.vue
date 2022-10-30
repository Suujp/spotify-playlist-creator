<template>
  <v-card tile>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>{{ text }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: String,
    text: String
  }
}
</script>
