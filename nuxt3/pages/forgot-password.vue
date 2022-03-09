<template>
    <div class="container">
        <div class="m-auto w-50 pt-5">
            <form
                @submit="onSubmit">
              <div class="row">
                <div class="col-12">
                    <h2>Forgot Password</h2>
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
import { Field, useForm,useField } from 'vee-validate';

export default {
    setup(){        
        const { handleSubmit, errors ,resetForm } = useForm({
            validationSchema: {
                email: 'required|email',
            }
        });

        const onSubmit = handleSubmit((values, actions) => {    
            // actions.resetForm();
        });

        function onResetForm(){
            resetForm();
        }

        const { email } = useField('email');

        return {
            onResetForm,
            onSubmit,
            email,
            errors
        }
    },
    components: {
        Field,
    },
}
</script>
