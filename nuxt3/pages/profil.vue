<template>
    <div>
        Profil
    </div>
</template>

<script>
export default {
    setup(){
        definePageMeta({
            middleware: ["auth"],
            layout: "auth",
        })
    }
}
</script>
