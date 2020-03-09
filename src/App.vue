<!-- Главное окно приложения, навигация -->
<template>
  <div id="app">
    <h2>Игра в слова</h2>
    <div id="nav" class="header">
      <router-link to="/">Игра</router-link>
      <router-link to="/score">Таблица</router-link>
    </div>
    <div>
        <router-view/>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px;
  border-bottom: 1px solid #b3b3b3;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  display: inline-block;
  margin-right: 30px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
