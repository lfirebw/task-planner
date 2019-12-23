<template>
    <div class="container">
        <p>Agregar al tipo: {{ type }}</p>
        <button type="button" @click.prevent="goBack">Volver</button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            type: 0
        }
    },
    mounted(){
        this.type = this.$route.params.type
    },
    methods:{
        goBack(){
            this.$router.push('/')

        }
    }
}
</script>
