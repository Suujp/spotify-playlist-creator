<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-text-field
          label="アーティスト名を入力してください"
          filled
          rounded
          prepend-inner-icon="mdi-magnify"
          @keydown.enter="getArtist($event)"
          v-model="artist_name"
        >
        </v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" v-for="artist in data.artist" :key="artist.mbid">
        <ArtistCard :title="artist.name" :text="artist.disambiguation" :mbid="artist.mbid"></ArtistCard>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-pagination v-if="isActive" v-model="page" :length="total" @input="getArtist($event)"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ArtistCard from '../components/ArtistCard.vue'
import axios from 'axios'

export default {
  name: 'SearchArtist',
  components: {
    ArtistCard: ArtistCard
  },
  data: function() {
    return {
      data: '',
      artist_name: '',
      api_key: process.env.VUE_APP_API_KEY,
      page: 1,
      total: 0,
      isActive: false
    }
  },
  methods: {
    getArtist: function(event) {
      if (event.key === 'Enter') {
        this.page = 1
      }
      const url = `/rest/1.0/search/artists?artistName=${encodeURIComponent(this.artist_name)}&p=${encodeURIComponent(this.page)}&sort=sortName`
      const config = {
        headers: {
          'Accept': 'application/json',
          'x-api-key': this.api_key
        }
      }
      axios.get(url, config)
      .then((response) => {
        this.data = response.data
        this.total = Math.ceil(this.data.total / this.data.itemsPerPage)
        this.isActive = true
        this.toTop()
      })
      .catch((error) => {
        console.error(error)
      })
    },
    toTop: function() {
      this.$vuetify.goTo(0)
    }
  }
}
</script>
