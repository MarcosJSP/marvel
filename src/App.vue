<template>
  <div id="app">
      <nav>
        <router-link to="/home" class="logo">

          <img alt="MarvelLogo.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/0/04/MarvelLogo.svg/220px-MarvelLogo.svg.png" decoding="async" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/0/04/MarvelLogo.svg/330px-MarvelLogo.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/0/04/MarvelLogo.svg/440px-MarvelLogo.svg.png 2x" data-file-width="1000" data-file-height="402">
        
        </router-link>
      </nav>
      <router-view class="main"/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Marvel:400,700&display=swap');
@import url('https://fonts.googleapis.com/css?family=Marvel:400,700|Roboto&display=swap');
:root{
  --primary: #ee171f;
  --secundary: #121212;
  --terciary: #282828;
}

body,html{
  margin: 0;
  background-color: var(--secundary);
  font-family: 'Marvel', sans-serif;
}

.main {
  display: flex;
  flex-direction: column;
  height: 93vh;
}

nav{
  height: 7vh;
  display: flex;
  align-items: center;
  padding: 0 7px;
  background-color: var(--primary);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 5;
  -webkit-box-shadow: 0px 5px 15px 0px rgba(0,0,0,0.46);
  -moz-box-shadow: 0px 5px 15px 0px rgba(0,0,0,0.46);
  box-shadow: 0px 5px 15px 0px rgba(0,0,0,0.46);
}

nav a{
  display: flex;
  align-items: center;
  height: 30px;
  width: 60px;
  max-height: 100%;
}

.logo{
  text-decoration: none;
  font-weight: bolder;
  color: black;
}
.logo img{ 
  max-height: 100%;
  max-width: 100%;
}

</style>
