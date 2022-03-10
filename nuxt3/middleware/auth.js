export default defineNuxtRouteMiddleware(() => {
   const token = useCookie("token")
   
   if(!token.value){
    return navigateTo("/");
   }

   const user = useState("user");

   if(!user.value){
      const { vueApp } = useNuxtApp();    

      vueApp.$axios.get("/me")
      .then(res => {       
         user.value = res.data;
      })
      .catch(err => {
         console.log(err);
         token.value = "";
         return navigateTo("/");
      })
   }
})
  