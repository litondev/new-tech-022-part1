<template>
    <div class="container">
        <div class="m-auto w-50 pt-5">
            <form
                @submit="onSubmit">
              <div class="row">
                <div class="col-12">
                    <h2>Reset Password</h2>
                </div>
                <div class="col-12 mt-2">
                    <div class="form-group mb-2">
                        <label for="token" class="mb-2">Token</label>
                        <Field
                            v-model="token"
                            name="token" 
                            type="text" 
                            class="form-control"
                            :class='errors.token ? "is-invalid" : ""'
                            />
                            <span class="invalid-feedback">{{ errors.token }}</span>
                    </div>          
                    <div class="form-group mb-2">
                        <label for="password" class="mb-2">Password</label>
                        <Field
                            v-model="password"
                            name="password" 
                            type="password_confirmation" 
                            class="form-control"
                            :class='errors.password ? "is-invalid" : ""'
                            />
                            <span class="invalid-feedback">{{ errors.password }}</span>
                    </div>          
                      <div class="form-group mb-2">
                        <label for="password_confirmation" class="mb-2">Password Konfirmasi</label>
                        <Field
                            v-model="password_confirmation"
                            name="password_confirmation" 
                            type="password" 
                            class="form-control"
                            :class='errors.password_confirmation ? "is-invalid" : ""'
                            />
                            <span class="invalid-feedback">{{ errors.password_confirmation }}</span>
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
import { Field, useForm, useField } from 'vee-validate';

export default {
    created(){
        if(!this.$route.query.email){
            this.$router.push("/signin");
        }

        this.email = this.$route.query.email;    
    },
    components: {
        Field,
    },
    head(){
        return {
            title : "Reset Password"
        }
    }, 
    setup(){       
        definePageMeta({
            middleware: ["no-auth"]
        })

        const nuxtApp = useNuxtApp();        
        const { vueApp } = useNuxtApp();    

        const isLoadingForm = useState('isLoadingForm',() => false);        
        const email = useState('email');
        const token = useState('token');
        const password = useState('password');
        const password_confirmation = useState('password_confirmation');

        const { handleSubmit, errors ,resetForm } = useForm({
            validationSchema: {
                token : 'required',
                password : 'required',
                password_confirmation : 'required'
            }
        });

        const onSubmit = handleSubmit(() => {    
            isLoadingForm.value = true;

            vueApp.$axios.post("/reset-password",{            
                token : token.value,
                password : password.value,
                password_confirmation : password_confirmation.value,
                email : email.value,        
            }).then(res => {            
                nuxtApp.$router.push("/signin");
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
            token,
            password,
            password_confirmation,
            isLoadingForm,
            errors
        }
    },   
}
</script>
