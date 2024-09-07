<template>
    <div class="editparty">
        <h1>Edite sua Festa</h1>
        <PartyForm :party="party" page="editparty" btnText="Editar Festa" :key="componentKey"/>
    </div>
</template>

<script>
import PartyForm from '../components/PartyForm.vue';

export default {
    components:{
        PartyForm
    },
    data() {
        return {
            party: {},
            componentKey: 0
        }
    }
}
</script>

<style scoped>
.editparty{
    text-align: center;
    padding-top: 40px;
    padding-bottom: 100px;
}

.editparty h1{
    margin-bottom: 40px;
}
</style>