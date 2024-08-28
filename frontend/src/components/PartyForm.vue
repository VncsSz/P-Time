<template>
    <div>
        <Message :msg="msg" :msgClass="msgClass" />
        <form id="register-form" enctype="multipart/form-data" @submit="page === 'newparty' ? createParty($event) : uptade($event)">
            <input type="hidden" id="id" name="name" v-model="id">
            <div class="input-container">
                <label for="title">Nome do Evento:</label>
                <input type="text" id="title" name="title" v-model="title" placeholder="Digite o nome do evento">
            </div>
            <div class="input-container">
                <label for="description">Descrição:</label>
                <textarea id="description" name="description" v-model="description" placeholder="Diga como vai ser o evento"></textarea>
            </div>      
            <div class="input-container">
                <label for="party_date">Data do Evento:</label>
                <input type="date" id="party_date" name="party_date" v-model="party_date">
            </div>
            <div class="input-container">
                <label for="photos">Imagens:</label>
                <input type="file" multiple="multiple" id="photos" name="photos" ref="file" @change="onChange">
            </div>
            <div v-if="page === 'editparty' && ShowMiniImages" class="mini-images">
                <p>Imagens atuais:</p>
                <img v-for="(photo, index) in photos" :src="`${photos}`" :key="index">
            </div>
            <div class="input-container">
                <label for="privacy">Evento privado?</label>
                <input type="checkbox" id="privacy" name="privacy">
            </div>    
            <InputSubmit :text="btnText" />
        </form>
    </div>
</template>

<script>
import Message from './Message.vue';
import InputSubmit from './form/InputSubmit.vue';

export default {
    name: "PartyForm",
    props: ["party", "page", "btnText"],
    components: {
        InputSubmit, Message
    },
    methods: {
        async createParty(e){

            e.preventDefault();

        },
        onChange(e){

            this.photos = e.target.files;
            this.ShowMiniImages = false;

        },
        async uptade(e){

            e.preventDefault();

        }
    }
}
</script>

<style scoped>

</style>