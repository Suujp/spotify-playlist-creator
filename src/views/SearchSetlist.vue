<template>
  <v-container>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-row>
      <v-col cols="12" v-for="setlist in data.setlist" :key="setlist.id">
        <SetlistCard
          :artist_name="setlist.artist.name"
          :title="setlist.venue.name"
          :text="setlist.venue.city.name"
          :date="setlist.eventDate"
        >
          <Dialog :set="setlist.sets.set" :artist_name="setlist.artist.name"></Dialog>
        </SetlistCard>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-pagination v-if="isActive" v-model="page" :length="total" @input="getSetlist"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SetlistCard from '../components/SetlistCard.vue'
import Dialog from '../components/Dialog.vue'
import axios from 'axios'

export default {
  name: 'SearchSetlist',
  components: {
    SetlistCard: SetlistCard,
    Dialog: Dialog
  },
  data: function() {
    return {
      data: '',
      api_key: process.env.VUE_APP_API_KEY,
      mbid: this.$route.params.mbid,
      page: 1,
      total: 0,
      isActive: false,
      isLoading: false
    }
  },
  created: function() {
    this.getSetlist()
  },
  methods: {
    getSetlist: function() {
      this.isLoading = true
      const url = `/rest/1.0/artist/${encodeURIComponent(this.mbid)}/setlists?p=${encodeURIComponent(this.page)}`
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
        this.isLoading = false
        this.toTop()
      })
      .catch((error) => {
        console.error(error)
        this.isLoading = false
      })
    },
    toTop: function() {
      this.$vuetify.goTo(0)
    }
  }
}
</script>
