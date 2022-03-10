<template>
    <div>
        {{user}}

        <br/>

        <Nuxt-link to="/example-state/see-user">Lihat User</Nuxt-link>

        <br/>

        <button @click="user = 'Change User'">Change User</button>
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: ["login-example"]
    })

    const user = useState("user");
</script>