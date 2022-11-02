<template>
  <v-card tile>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>{{ text }}</v-card-text>
    <v-card-actions>
      <v-btn text :to="`/search/${mbid}/${id}`">セットリスト詳細</v-btn>
      {{ date }}
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: String,
    text: String,
    mbid: String,
    id: String,
    date: String
  }
}
</script>
