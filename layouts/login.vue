<template>
   <div> 
  <nav class="navbar">
  <ul class="main-nav">
    <li><h1 class="logo">Campfire</h1></li>
    <li><nuxt-link class="navbar-item" to="/account/dashboard">My Dashboard</nuxt-link></li>
    <li><nuxt-link class="navbar-item" to="/account">My Account</nuxt-link></li>
    <li v-if="user"><nuxt-link class="navbar-item" v-text="user.email" to="/"></nuxt-link></li>
    <li v-else><nuxt-link class="navbar-item" to="/account/login">Login</nuxt-link></li>
  </ul>
</nav>
 <div class="container">
    <nuxt/>
  </div>
   </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState([
    'user'
  ])
};
</script>

<style lang="scss" scoped>

.container {
background-image: linear-gradient(270deg,#4cb4e1,#3e91cc,#2dcca7);
background-size: 600% 100%;
	-webkit-animation: bg-pan-left 8s both;
	        animation: bg-pan-left 8s both;
width: 100%;
}

@-webkit-keyframes bg-pan-left {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes bg-pan-left {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}


ul li {
  list-style-type: none
}
.navbar {
  width: 100%;
  box-shadow: 0 1px 10px rgba(0,0,0,0.2);
  background: rgba(250, 250, 250, 0.98);
  display: block;
  top:0;
  position: absolute;
}
.main-nav {
  display: -webkit-flex;
  display: flex;
  width: 60%;
  margin: 0 auto
  
}

.main-nav li:first-child {
  margin-right: auto;
}

.main-nav li:nth-child(2) a {
  border-radius: 5px 0 0 5px
}

.main-nav li:nth-child(3) a {
  border-radius: 0;
  border-right: none;
  border-left: none;
}

.main-nav li:nth-child(4) a {
  border-radius: 0 5px 5px 0
}

.main-nav a {
  margin: 16px 0 16px;
  border: 1px solid #60B99A;
  color: #60B99A;
  display: block;
  padding: 13px 15px;
  font-size: 1.15em;
  text-decoration: none;
  transition: all .2s ease;
  font-weight: 500;

&:nth-child(2n) {
   border-radius: 0 !important;
}
}
.nuxt-link-exact-active {
  background: #60B99A;
  color: white !important;
  font-weight: bold !important;
}


h1.logo {
  background: url("data:image/svg+xml,%3Csvg width='176' height='176' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3Cpath id='b' d='M52 0l47 94H5z'/%3E%3Cfilter x='-.5%25' y='-.5%25' width='101.1%25' height='102.1%25' filterUnits='objectBoundingBox' id='a'%3E%3CfeOffset dy='1' in='SourceAlpha' result='shadowOffsetOuter1'/%3E%3CfeColorMatrix values='0 0 0 0 0.676791029 0 0 0 0 0.676791029 0 0 0 0 0.676791029 0 0 0 0.5 0' in='shadowOffsetOuter1'/%3E%3C/filter%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle fill='%235ABBAA' cx='88' cy='88' r='88'/%3E%3Cg transform='translate(36 38)'%3E%3Cuse fill='%23000' filter='url(%23a)' xlink:href='%23b'/%3E%3Cuse fill='%23FFF' xlink:href='%23b'/%3E%3C/g%3E%3Cpath d='M58.5 98.5L146 135M36.5 134.5l83-35' stroke='%235ABBAA' stroke-width='4' stroke-linecap='square'/%3E%3C/g%3E%3C/svg%3E") no-repeat 3px 23px;
  background-size: 40px;
  padding: 18px 50px 0 56px;
  margin: 0;
  color: #5abbaa;
}

</style>
