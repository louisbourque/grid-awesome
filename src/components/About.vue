<template>
	<div class="about">
		<div class="about-content padded">
			<h3 class="center">About Grid Awesome</h3>
			<div class="center"><strong>Quickly and easily create css <span style="color:#428E9C;">display<span style="color:#000;">:</span> grid</span>; boilerplate.</strong></div>
			<p>Use Grid-Awesome to generate boilerplate css for grid layouts using the css <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout"><span style="color:#428E9C;">display<span style="color:#000;">:</span> grid</span>;</a> property.</p> 
      <p>Combined with media queries, completely customize the site layout with just a few lines of CSS (hide area 3 and change display order on mobile):</p>
      <pre>@supports (grid-area: auto) 
  /* mobile first */
  .grid-container{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
    "area2"
    "area1"
    "area4";
  }
  .area1 {
    grid-area: area1;
  }
  .area2 {
    grid-area: area2;
  }
  .area3 {
    grid-area: area3;
  }
  .area4 {
    grid-area: area4;
  }

  /* desktop */
  @media screen and (min-width: 768px) {
    .grid-container{
      display: grid;
      grid-template-columns: 3fr 4fr;
      grid-template-rows: 10rem 15rem 20rem;
      grid-template-areas:
      "area1 area1"
      "area2 area3"
      "area4 area4";
    }
  }
}</pre>
HTML:
<pre>
&lt;div class="grid-container">
  &lt;div class="area1">&lt;/div>
  &lt;div class="area2">&lt;/div>
  &lt;div class="area3">&lt;/div>
  &lt;div class="area4">&lt;/div>
&lt;/div>

</pre>
		</div>
		<div class="footer">
      <div><a href="https://github.com/louisbourque/grid-awesome">View in GitHub</a></div>
			<div class="div--margintop">Powered by <a href="https://vuejs.org/"><img src="static/img/vue-logo.png"></a></div>
			<div class="div--margintop">Built by <a href="http://louisbourque.ca/">Louis Bourque</a>.</div>
		</div>
  </div>
</template>

<script>
export default {
  name: 'about',
}
</script>
<style type="text/css">
.about {
	height: calc(100vh - 56px);
	position: relative;
}
.about-content{
	height: 80%;
}
.footer{
	margin: 1rem 0;
	color: #333;
	font-size: 90%;
	text-align: center;
}
.footer a {
	color: #77c;
	text-decoration: none;
	transition: color .25s linear;
}
.footer a:hover {
	color: #C9444D;
}
.div--margintop{
	margin-top: 1rem;
}
.padded{
	padding: 0 1rem;
}
@supports (grid-area: auto) {
  .about{
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto 8rem;
    grid-row-gap: 1rem;
    grid-template-areas:
    "aboutcontent"
    "footer";
  }
  .about-content {
    grid-area: aboutcontent;
  }
  .footer {
    grid-area: footer;
  }
}

</style>