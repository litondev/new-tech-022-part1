export default defineNuxtRouteMiddleware(context => {
    const token = useCookie("token")
    
    if(token.value){
     return navigateTo("/profil");
    }
 })
   