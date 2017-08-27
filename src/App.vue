<template>
  <div id="app" class="site">
    <app-header></app-header>
    <editor></editor>
    <main class="content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import AppHeader from '@/components/Header'
import Editor from '@/components/Editor'

export default {
  name: 'app',
  components: {AppHeader, Editor},
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
  overflow-y: auto;
}

.center{
  text-align: center;
}
@supports (display: grid) {
  @media screen and (min-width: 800px) {
    
    .site {
      display: grid;
      grid-template-rows: auto auto auto;
      grid-template-columns: 20rem auto;
      grid-template-areas:
        "header header"
        "editor content"
        "footer footer";
    }
    
    .editor {
      grid-area: editor;
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
