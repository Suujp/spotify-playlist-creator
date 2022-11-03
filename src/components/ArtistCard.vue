<template>
  <v-card tile>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>{{ text }}</v-card-text>
    <v-card-actions>
      <v-btn text :to="`/search/${mbid}`">コンサート・ライブ一覧</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ArtistCard',
  props: {
    title: String,
    text: String,
    mbid: String
  }
}
</script>
