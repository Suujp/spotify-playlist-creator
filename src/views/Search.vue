<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-text-field label="アーティスト名を入力してください" filled rounded prepend-inner-icon="mdi-magnify" @keydown.enter="getArtistName" v-model="artist_name"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8" v-for="artist in data.artist" :key="artist.mbid">
        <Card :title="artist.name" :text="artist.mbid"></Card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from '../components/Card.vue'
import axios from 'axios'

export default {
  name: 'Search',
  components: {
    Card: Card
  },
  data: function() {
    return {
      data: '',
      artist_name: '',
      api_key: process.env.VUE_APP_API_KEY
    }
  },
  methods: {
    getArtistName: function() {
      const url = '/rest/1.0/search/artists?artistName=' + encodeURIComponent(this.artist_name) + '&p=1&sort=sortName'
      const config = {
        headers: {
          'Accept': 'application/json',
          'x-api-key': this.api_key
        }
      }
      axios.get(url, config)
      .then((response) => {
        this.data = response.data
        console.log(this.data)
      })
      .catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>
