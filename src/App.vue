<template>
  <div id="app" class="site">
    <app-header></app-header>
    <main class="content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import AppHeader from '@/components/Header'

export default {
  name: 'app',
  components: {AppHeader},
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

.center{
  text-align: center;
}
@supports (display: grid) {
  @media screen and (min-width: 800px) {
    
    .site {
      display: grid;
      grid-template-rows: auto auto auto;
      grid-template-areas:
        "header"
        "content"
        "footer";
    }
    
    .header {
      grid-area: header;
    }
    
    .content {
      grid-area: content;
    }
    
    .footer {
      grid-area: footer;
    }
    
  }
}
</style>
