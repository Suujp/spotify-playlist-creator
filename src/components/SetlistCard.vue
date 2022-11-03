<template>
  <v-card tile>
    <v-card-title>{{ artist_name }} - {{ title }}</v-card-title>
    <v-card-text>{{ text }} - {{ date }}</v-card-text>
    <slot></slot>
  </v-card>
</template>

<script>
export default {
  name: 'SetlistCard',
  props: {
    artist_name: String,
    title: String,
    text: String,
    date: String
  }
}
</script>
