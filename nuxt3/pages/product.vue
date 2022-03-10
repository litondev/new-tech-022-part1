<template>
    <div>
        Product
        <br/>
        {{user ? user.name : "-"}}
    </div>
</template>

<script>
export default {
    setup(){
        definePageMeta({
            middleware: ["auth"],
            layout: "auth",
        })

        const user = useState("user");

        return {
            user
        }
    }
}
</script>
