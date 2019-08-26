<template>
  <div id="app">
      <nav>
        <router-link to="/home" class="logo border-left border-right">
          <img alt="MarvelLogo.svg" src="./assets/250px-MarvelLogo.svg.png" decoding="async" >
        </router-link>
        <div class="links">
          <router-link to="/home" class="selected border-left">Home</router-link>
          <a class="border-left">Movies</a>
          <a class="border-left">News</a>
          <a class="border-left border-right">More</a>
        </div>
        <a class="border-left border-right">Profile</a>
      </nav>
      <router-view class="main"/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Oswald:400,600,700&display=swap');

*{
  box-sizing: border-box;
}

:root{
  --primary: #ee171f;
  --secundary: #000000;
  --terciary: #ffffff;
}

body,html{
  margin: 0;
  background-color: var(--terciary);
}

nav{
  font-family: 'Oswald', sans-serif;
  background: var(--terciary);
  border-bottom: 2px solid black;
  height: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a{
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-decoration: none;
  color: var(--secundary);
  text-transform: uppercase;
  position: relative;
}

nav a.selected{
  background: var(--secundary);
  color: var(--primary);
}


.logo{
  background: var(--primary);
}
.logo img{
  max-height: 80%;
  max-width: 80px;
}

.links{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.border-left{
  border-left: 2px solid var(--secundary);
}

.border-right{
  border-right: 2px solid var(--secundary);
}

</style>
