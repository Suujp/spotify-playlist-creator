<template>
  <v-card-actions>
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
              <v-text-field label="プレイリスト名" clearable filled rounded></v-text-field>
              <v-textarea label="プレイリストの概要" rows="3" clearable filled rounded></v-textarea>
              <v-switch label="プレイリストを公開" color="green darken-1"></v-switch>
            </v-col>
          </v-row>
        </v-container>
        
        <v-card-text>
          <v-container fluid>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="selectAllSong">全ての曲を選択</v-btn>
            </v-card-actions>
            <v-list-item-group v-model="selected" active-class="pink--text" multiple>
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
                <v-btn color="blue darken-1" text @click="dialog = false">プレイリストを作成</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>

      </v-card>
    </v-dialog>
  </v-card-actions>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    set: Array
  },
  data: function() {
    return {
      dialog: false,
      // song_data: [],
      song_names: [],
      selected: []
    }
  },
  created: function() {
    const set = this.set
    set.forEach((set_obj) => {
      set_obj.song.forEach((song) => {
        // this.song_data.push(song)
        this.song_names.push(song.name)
      })
    })
  },
  methods: {
    selectAllSong: function() {
      const tmp = []
      for (let i = 0; i < this.song_names.length; i++) {
        tmp[i] = i
      }
      this.selected = tmp
    }
  }
}
</script>
