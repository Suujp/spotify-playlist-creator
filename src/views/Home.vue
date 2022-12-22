<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-card-title>アーティストのセットリストからSpotifyのプレイリストを作成するアプリです。(version 0.1)</v-card-title>
          
          <v-card-text>
            <p class="text--primary">このアプリではSpotifyのWeb APIを利用するため認証が必要です。</p>
            <p class="text--primary">以下の「認証する」をクリックすると認証ページに移動します。</p>
            <p class="text--primary">使い方</p>
            <p class="text--primary">1. ホーム画面から「認証する」をクリックしてSpotifyの認証を行ってください。</p>
            <p class="text--primary">2. メニューの検索からプレイリストを作成したいアーティストを検索してください。</p>
            <p class="text--primary">3. 目的のアーティストが見つかりましたらセットリスト一覧が表示されます。</p>
            <p class="text--primary">4. セットリストを選択するとモーダルが開くので、プレイリスト名とプレイリストの説明を入力して「プレイリスト作成」をクリックしてください。</p>
            <p class="text--primary">5. Spotifyにプレイリストが作成されています。</p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col>
        <v-card class="mx-auto">
          <v-card-actions>
            <v-btn text @click="getAuth()" block>認証する</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data: function() {
    return {
      data: '',
      error_message: '',
      base_url: 'https://accounts.spotify.com/authorize?response_type=token',
      client_id: process.env.VUE_APP_CLIENT_ID,
      scope: 'playlist-modify-public playlist-modify-private playlist-read-private',
      redirect_uri: process.env.VUE_APP_REDIRECT_URI
    }
  },
  created: function() {
    if (this.$route.hash) {
      localStorage.setItem('token', this.getToken())
    }
  },
  methods: {
    getAuth: function() {
      let url = this.base_url
      url += '&client_id=' + encodeURIComponent(this.client_id)
      url += '&scope=' + encodeURIComponent(this.scope)
      url += '&redirect_uri=' + encodeURIComponent(this.redirect_uri)
      location.href = url
    },
    getToken: function() {
      // URLからハッシュフラグメントを取得
      const hash = this.$route.hash
      // ハッシュフラグメントからアクセストークンとトークンタイプを取得
      const tmp = hash.match(/=.*?&/g)
      const access_token = tmp[0].substring(1, tmp[0].length - 1)
      const token_type = tmp[1].substring(1, tmp[1].length - 1)
      // トークンを作成
      const token = token_type + ' ' + access_token
      return token
    }
  }
}
</script>
