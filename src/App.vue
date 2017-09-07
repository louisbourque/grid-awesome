<template>
  <div id="app" class="site">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from '@/components/Header'

export default {
  name: 'app',
  components: { AppHeader },
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
  color: #000;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

.editor, .content{
  max-height: calc(100vh - 56px);
}

.center{
  text-align: center;
}
@supports (grid-area: auto) {
  @media screen {
    .site {
      display: grid;
      grid-template-rows: auto auto auto;
      grid-template-columns: auto;
      grid-template-areas:
        "header"
        "content"
        "footer";
    }
    .content {
      display: grid;
      grid-template-rows: auto auto;
      grid-template-columns: auto;
      grid-template-areas:
        "editor"
        "gridcontainer";
    }

    .grid-container {
      grid-area: gridcontainer;
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
@supports (grid-area: auto) {
  @media screen and (min-width: 768px) {
    
    .site {
      display: grid;
      grid-template-rows: auto auto auto;
      grid-template-columns: auto;
      grid-template-areas:
        "header"
        "content"
        "footer";
    }
    
  .content {
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: 20rem auto;
      grid-template-areas:
        "editor gridcontainer";
    }
  }
}
</style>
