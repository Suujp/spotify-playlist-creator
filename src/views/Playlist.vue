<template>
  <v-container>
    <v-alert v-if="error_message" type="error">{{ error_message }}</v-alert>
    
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-row>
      <v-col xl="2" lg="2" md="3" sm="6" cols="6" v-for="item in data.items" :key="item.id">
        <v-card v-if="item.images[0]">
          <v-img :src="item.images[0].url"></v-img>
          <v-card-title>{{ item.name }}</v-card-title>
        </v-card>
        <v-card v-else>
          <v-img src="../assets/no-image.jpg"></v-img>
          <v-card-title>{{ item.name }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Playlist',
  data: function() {
    return {
      data: '',
      isActive: false,
      isLoading: false,
      error_message: ''
    }
  },
  created: function() {
    this.isLoading = true
    const token = localStorage.getItem('token')
    const url = `https://api.spotify.com/v1/me/playlists`
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }

    axios.get(url, config)
    .then((response) => {
      console.log(response)
      this.data = response.data
      this.isLoading = false
    })
    .catch((error) => {
      console.log(error)
      this.isLoading = false
      this.error_message = `データの取得に失敗しました。ホームに移動して認証ボタンをクリックしてください。`
    })
  }
}
</script>
