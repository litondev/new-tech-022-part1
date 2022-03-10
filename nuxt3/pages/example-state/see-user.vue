<template>
    <div>
        {{user}}
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: ["login-example"]
    })

    const user = useState("user");
</script>