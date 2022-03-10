<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">{{user ? user.name : "-"}}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">          
              <Nuxt-link 
                to="/profil"
                class="nav-link active" 
                aria-current="page">
                Profil
              </Nuxt-link>
            </li>
            <li class="nav-item">
              <Nuxt-link 
                to="/product"
                class="nav-link active" 
                aria-current="page">
                Product
              </Nuxt-link>
            </li>
            <li class="nav-item">
              <a href="#"
                class="nav-link active"
                @click="onLogout">
                Keluar
              </a>
            </li>      
          </ul>  
        </div>
      </div>
    </nav>

    <div class="container">
      <slot />
    </div>
  </div>
</template>

<style>
body{
  padding:0px;
  margin:0px;
}

.container-fluid{
  padding:0px;
  margin:0px;
}
</style>

<script setup>
  const nuxtApp = useNuxtApp();        
  const { vueApp } = useNuxtApp();    
  const token = useCookie("token")
  const user = useState("user");

  const onLogout = () => {
    vueApp.$axios.post("/logout")
    .then(res => {
      token.value = null;
      nuxtApp.$router.push("/signin");
    })
    .catch(err => {
      console.log(err);
    })
  }

</script>
