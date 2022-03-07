<template>
    <div class="container">
        <div class="m-auto w-50 pt-5">
            <form
                @submit="onSubmit">
              <div class="row">
                <div class="col-12">
                    <h2>Signin </h2>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <Field
                            v-model="email"
                            name="email" 
                            type="text" 
                            class="form-control"
                            rules="required"
                            />
                            <span>{{ errors.email }}</span>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <Field 
                            v-model="password"
                            name="password"
                            type="password"
                            class="form-control"
                            rules="required"
                            />
                            <span>{{ errors.password }}</span>
                    </div>
                </div>
                <div class="col-12 mt-2">
                    <button class="btn btn-primary">
                        Kirim
                    </button>
                    <a class="btn btn-danger"
                        @click="onResetForm()">
                        Reset
                    </a>
                </div>
            </div>
         </form>                    
        </div>
    </div>
</template>

<script>
import { Field, useForm,useField } from 'vee-validate';


export default {
    setup(){        
        const { handleSubmit, errors ,resetForm } = useForm({
            validationSchema: {
                email: 'required|email',
                password: 'required|min:8',
            }
        });

        const onSubmit = handleSubmit((values, actions) => {
            alert(JSON.stringify(values, null, 2));
            actions.resetForm();
        });

        function onResetForm(){
            resetForm();
        }

        const { email } = useField('email');
        const { password } = useField('password');

        return {
            onResetForm,
            onSubmit,
            email,
            password,
            errors
        }
    },
    components: {
        Field,
    },
}
</script>
