<template>
    <div class="container">
        <div class="m-auto w-50 pt-5">
            <form
                @submit="onSubmit">
              <div class="row">
                <div class="col-12">
                    <h2>Signin</h2>
                </div>
                <div class="col-12 mt-2">
                    <div class="form-group mb-2">
                        <label for="email" class="mb-2">Email</label>
                        <Field
                            v-model="email"
                            name="email" 
                            type="text" 
                            class="form-control"
                            :class='errors.email ? "is-invalid" : ""'
                            />
                            <span class="invalid-feedback">{{ errors.email }}</span>
                    </div>                

                    <div class="form-group mb-2">
                        <label for="password" class="mb-2">Password</label>
                        <Field 
                            v-model="password"
                            name="password"
                            type="password"
                            class="form-control"
                            :class='errors.password ? "is-invalid" : ""'/>
                            <span class="invalid-feedback">{{ errors.password }}</span>
                    </div>
                </div>
                <div class="col-12 mt-4">
                    <button class="btn btn-primary"
                        type="submit">
                        <span v-if="!isLoadingForm">
                            Kirim
                        </span>
                        <span v-else>
                            . . .
                        </span>
                    </button>
                    <button class="btn btn-danger m-3"
                        type="button"
                        @click="onResetForm()">
                        Reset
                    </button>
                </div>
            </div>
         </form>                    
        </div>
    </div>
</template>

<script>
import { Field, useForm } from 'vee-validate';
export default {
    components: {
        Field,
    },
    head(){
        return {
            title : "Signin"
        }
    }, 
    setup(){        
        definePageMeta({
            middleware: ["no-auth"]
        })

        const nuxtApp = useNuxtApp();        
        const { vueApp } = useNuxtApp();    
        const token = useCookie("token")

        const isLoadingForm = useState('isLoadingForm',() => false);
        const email = useState('email');
        const password = useState('password');

        const { handleSubmit, errors ,resetForm } = useForm({
            validationSchema: {
                email: 'required|email',
                password: 'required|min:8',
            }
        });

        const onSubmit = handleSubmit(() => {    
            isLoadingForm.value = true;

            vueApp.$axios.post("/signin",{            
                password : password.value,
                email : email.value,        
            }).then(res => {       
                token.value = res.data.access_token;
                // tokewindow.localStorage.setItem("token",res.data.access_token);
                // console.log(res);
                nuxtApp.$router.push("/profil");
            })
            .catch(err => {
                isLoadingForm.value = false;

                console.log(err);

                if(err.response && err.response.status == 422){
                    vueApp.$toast.error(err.response.data.message || "Terjadi Kesalahan")
                }else{
                    vueApp.$toast.error("Terjadi Kesalahan");
                }
            });        
        });

        function onResetForm(){
            resetForm();
        }

        return {
            onResetForm,
            onSubmit,
            email,
            password,
            isLoadingForm,
            errors
        }
    }   
}
</script>
