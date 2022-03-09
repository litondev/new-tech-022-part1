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
                        Kirim
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
    setup(){        
        const { handleSubmit, errors ,resetForm } = useForm({
            validationSchema: {
                token : 'required',
                password : 'required',
                password_confirmation : 'required'
            }
        });


        function onResetForm(){
            resetForm();
        }

        // const email = useRef("");
        const { email } = useField('email');
        const { token } = useField('token');
        const { password } = useField('password');
        const { password_confirmation } = useField('password_confirmation');

        const onSubmit = handleSubmit((values, actions) => {    
            console.log(values);
            // actions.resetForm();
        });

        return {
            onResetForm,
            onSubmit,
            email,
            token,
            password,
            password_confirmation,
            errors
        }
    },
    created(){
        if(!this.$route.query.email){
            this.$router.push("/signin");
        }

        this.email = this.$route.query.email;    
    },
    components: {
        Field,
    },
}
</script>
