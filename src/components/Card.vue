<template>
  <v-card tile>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>{{ text }}</v-card-text>
    <v-card-actions>
      <v-btn text :to="mbid">ライブ一覧</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: String,
    text: String,
    mbid: String
  }
}
</script>
