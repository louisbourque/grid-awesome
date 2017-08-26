<template>
	<header class="header">
      <router-link class="header__a" to="/">Home</router-link>
   </header>
</template>

<script>
export default {
  name: 'app-header'
}
</script>
<style type="text/css">
	.header{
		display: flex;
		flex-direction: row;
	}
	.header__a{
		color: #eee;
		text-decoration: none;
	  display: block;
	  position: relative;
	  font-size: 20px;
	  line-height: 1;
	  letter-spacing: .02em;
	  font-weight: 400;
	  box-sizing: border-box;
	  padding-top: 16px;
	  padding-right: 1rem;
	  padding-left: 1rem;
	}
	.right{
		position: absolute;
		right: 0;
	}
</style>