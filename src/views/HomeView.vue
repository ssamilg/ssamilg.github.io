<script>
export default {
  name: 'Home',
}
</script>

<template>
  <div id="home">
    <div class="flex justify-center wrapper">
      <div class="flex flex-col">       
        <div class="header">
          <div class="flex justify-center">
            <div class="avatar">
              <div class="w-24 mask mask-hexagon">
                <img src="https://pbs.twimg.com/profile_images/1545056575718432769/bbUr82yx_400x400.jpg" height="128" width="128"/>
              </div>
            </div>
          </div>

          <div class="flex justify-center">
            <h2 class="text-4xl font-bold">Hi!</h2>
          </div>

          <div class="flex justify-center">
            <h2 class="text-2xl font-bold">My name is</h2>
          </div>

          <div class="flex justify-center">
            <h2 class="text-5xl font-bold">Şehit Şamil Gökmen</h2>
          </div>

        </div>

        <div class="divider"/>
 
        <div class="content">
          <div class="flex justify-center">

            <div class="tabs tabs-boxed">
              <a class="tab">Me</a> 
              <a class="tab tab-active">Experience</a> 
              <a class="tab">Contact</a>
              <a class="tab">Blog</a>
              <a class="tab">Music</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1> -->
  </div>
</template>

<style lang="scss" scoped>
#home {
  height: 100vh;
  width: 100%;

  .wrapper {
    height: 100%;
    padding: 24px;

    .header {
      height: 35%;
      text-align: center;
    }

    .content {
      height: 65%;
    }
  }
}
</style>