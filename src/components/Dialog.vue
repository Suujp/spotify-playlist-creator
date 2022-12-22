<template>
  <v-card-actions>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-btn text color="primary" dark @click.stop="dialog = true">セットリスト詳細</v-btn>

    <v-dialog
      v-model="dialog"
      scrollable
      max-width="1000px"
    >
      <v-card>

        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <v-card-title>セットリスト詳細</v-card-title>
              <v-divider></v-divider>
            </v-col>
            
            <v-col cols="12">
              <v-text-field label="プレイリスト名" clearable filled rounded v-model="playlist_name"></v-text-field>
              <v-textarea label="プレイリストの概要" rows="3" clearable filled rounded v-model="playlist_description"></v-textarea>
              <v-switch label="プレイリストを公開" color="green darken-1" v-model="isPublic"></v-switch>
            </v-col>
          </v-row>
        </v-container>
        
        <v-card-text>
          <v-container fluid>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="selectAllSong">全ての曲を選択</v-btn>
              <v-btn color="blue darken-1" text @click="deselectAllSong">選択を解除</v-btn>
            </v-card-actions>
            <v-list-item-group v-model="selected" multiple>
              <template v-for="(song_name, index) in song_names">
                <v-list-item :key="song_name">
                  <v-list-item-content>
                    <v-list-item-title>{{ index + 1 }}. {{ song_name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider v-if="index < song_names - 1" :key="song_name"></v-divider>
              </template>
            </v-list-item-group>
          </v-container> 
        </v-card-text>

        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn color="blue darken-1" text @click="dialog = false; createPlaylist()">プレイリストを作成</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>

      </v-card>
    </v-dialog>
  </v-card-actions>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Dialog',
  props: {
    set: Array,
    artist_name: String
  },
  data: function() {
    return {
      dialog: false,
      song_names: [],
      selected: [],
      isPublic: false,
      playlist_name: '',
      playlist_description: '',
      playlist_id: '',
      token: '',
      uris: [],
      isLoading: false,
      user_id: process.env.VUE_APP_USER_ID
    }
  },
  created: function() {
    const set = this.set
    set.forEach((set_obj) => {
      set_obj.song.forEach((song) => {
        this.song_names.push(song.name)
      })
    })
    this.token = localStorage.getItem('token')
  },
  methods: {
    selectAllSong: function() {
      const tmp = []
      for (let i = 0; i < this.song_names.length; i++) {
        tmp[i] = i
      }
      this.selected = tmp
    },
    deselectAllSong: function() {
      this.selected = [];
    },
    createPlaylist: async function() {
      this.isLoading = true
      const url = `https://api.spotify.com/v1/users/${this.user_id}/playlists`
      const data = {
        'name': this.playlist_name,
        'description': this.playlist_description,
        'public': this.isPublic
      }
      const config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.token
        }
      }

      await this.searchItem()
      console.log(this.uris)

      axios.post(url, data, config)
      .then((response) => {
        console.log(response)
        this.playlist_id = response.data.id

        const url2 = `https://api.spotify.com/v1/playlists/${this.playlist_id}/tracks`
        const data2 = {
          'uris': this.uris
        }

        axios.post(url2, data2, config)
        .then((response) => {
          console.log(response)
          this.isLoading = false
        })
        .catch((error) => {
          console.log(error)
          this.isLoading = false
        })
      })
      .catch((error) => {
        console.log(error)
        alert('データの取得に失敗しました。ホームに移動して認証ボタンをクリックしてください。')
        this.isLoading = false
      })
    },
    searchItem: async function() {
      this.uris = []
      const songArray = []
      
      for (let i = 0; i < this.selected.length; i++) {
        songArray.push(this.song_names[this.selected[i]])
      }
      
      for (let i = 0; i < songArray.length; i++) {
        const track = `track:${songArray[i]} `
        const artist = `artist:${this.artist_name}`
        const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(track)}${encodeURIComponent(artist)}&type=track&limit=1`
        const config = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.token
          }
        }
        
        await axios.get(url, config)
        .then((response) => {
          this.uris.push(response.data.tracks.items[0].uri)
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
      }
    }
  }
}
</script>
