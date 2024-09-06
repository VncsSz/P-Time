<template>
    <div class="data-containe">
        <Message :msg="msg" :msgClass="msgClass" />
        <div class="data-table-heading">
            <div class="data-id-heading">N°:</div>
            <div class="data-title-heading">Nome da Festa:</div>
            <div class="data-actions-heading">Ações:</div>
        </div>
        <div class="data-table-body">
            <div class="data-row" v-for="(party, index) in parties" :key="index">
                <div class="data-id-container">{{ index + 1 }}</div>
                <div class="data-title-container">
                    <router-link :to="`/party/${party._id}`">{{ party.title }}</router-link>
                </div>
                <div class="data-actions-container">
                    <router-link :to="`/editparty/${party._id}`" class="edit-btn">Editar</router-link>
                    <button class="remove-btn" @click="remove(party._id)">Remover</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { RouterLink } from "vue-router";
import Message from "./Message.vue";

export default {
    name: "DataTable",
    props: ["parties"],
    components: {
        Message
    },
    data() {
        return{
        msg: null,
        msgClass: null
        }
    }

}
</script>

<style scoped>

</style>