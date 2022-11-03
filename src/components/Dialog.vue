<template>
  <v-card-actions>
    <v-btn text color="primary" dark @click.stop="dialog = true" @click="getSetlist">セットリスト詳細</v-btn>

    <v-dialog
      v-model="dialog"
      scrollable
      max-width="1000px"
    >
      <v-card v-if="data">
        <v-card-title>セットリスト詳細</v-card-title>

        <v-divider></v-divider>

        <div v-for="(song, index) in data.sets.set[0].song" :key="song.name">
          <v-card-text>{{ index + 1 }} {{ song.name }}</v-card-text>
        </div>

        <v-divider></v-divider>
        
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">プレイリストを作成</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card-actions>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Dialog',
  props: {
    id: String
  },
  data: function() {
    return {
      dialog: false,
      data: '',
      api_key: process.env.VUE_APP_API_KEY,
    }
  },
  methods: {
    getSetlist: function() {
      const url = `/rest/1.0/setlist/${encodeURIComponent(this.id)}`
      const config = {
        headers: {
          'Accept': 'application/json',
          'x-api-key': this.api_key
        }
      }
      axios.get(url, config)
      .then((response) => {
        this.data = response.data
      })
      .catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>
