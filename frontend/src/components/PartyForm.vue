<template>
    <div>
        <Message :msg="msg" :msgClass="msgClass" />
        <form id="party-form" enctype="multipart/form-data" @submit="page === 'newparty' ? createParty($event) : update($event)">
            <input type="hidden" id="id" name="id" v-model="id">
            <input type="hidden" id="user_id" name="user_id" v-model="user_id">
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
            <div v-if="page === 'editparty' && showMiniImages" class="mini-images">
                <p>Imagens atuais:</p>
                <img v-for="(photo, index) in photos" :src="`${photo}`" :key="index">
            </div>
            <div class="input-container checkbox-container">
                <label for="privacy">Evento privado:</label>
                <input type="checkbox" id="privacy" name="privacy" v-model="privacy">
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
    data() {
        return{
            id: this.party._id || null,
            title: this.party.title || null,
            description: this.party.description || null,
            party_date: this.party.partyDate || null,
            photos: this.party.photos || [],
            privacy: this.party.privacy || false,
            user_id: this.party.userId || null,
            msg: null,
            msgClass: null,
            showMiniImages: true
        }
    },
    props: ["party", "page", "btnText"],
    components: {
        InputSubmit, Message
    },
    methods: {
        async createParty(e){

            e.preventDefault();

            const formData = new FormData();

            formData.append('title', this.title);
            formData.append('description', this.description);
            formData.append('party_date', this.party_date);
            formData.append('privacy', this.privacy);

            if(this.photos.length > 0) {
                for(const i of Object.keys(this.photos)) {
                    formData.append('photos', this.photos[i]);
                }
            }

            //Get token from store 
            const token = this.$store.getters.token;

            await fetch("https://p-time.onrender.com/api/party",{
                method: "POST",
                headers: {
                    "auth-token": token
                },
                body: formData
            })
            .then((resp) => resp.json())
            .then((data) =>{

                if(data.error) {
                    this.msg = data.error;
                    this.msgClass = "error"
                }else {
                    this.msg = data.msg;
                    this.msgClass = "success";
                }

                setTimeout(() => {
                    this.msg = null;

                    //Redirect
                    if(!data.error) {
                        this.$router.push('dashboard')
                    }

                }, 2000)
            })
        },
        onChange(e){

            this.photos = e.target.files;
            this.showMiniImages = false;

        },
        async update(e){

            e.preventDefault();

            const formData = new FormData();

            formData.append('id', this.id);
            formData.append('title', this.title);
            formData.append('description', this.description);
            formData.append('party_date', this.party_date);
            formData.append('privacy', this.privacy);
            formData.append('user_id', this.user_id);

            if(this.photos.length > 0) {
                for(const i of Object.keys(this.photos)) {
                    formData.append('photos', this.photos[i]);
                }
            }

            //Get token from store 
            const token = this.$store.getters.token;

            await fetch("https://p-time.onrender.com/api/party",{
                method: "PATCH",
                headers: {
                    "auth-token": token
                },
                body: formData
            })
            .then((resp) => resp.json())
            .then((data) =>{

                if(data.error) {
                    this.msg = data.error;
                    this.msgClass = "error"
                }else {
                    this.msg = data.msg;
                    this.msgClass = "success";
                }

                setTimeout(() => {
                    this.msg = null;

                }, 2000)
            })
        }
    }
}
</script>

<style scoped>
#party-form {
    max-width: 400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}

.input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    text-align: left;
}

.input-container label {
    margin-bottom: 10px;
    color: #555
}

.input-container input, 
.input-container textarea {
    padding: 10px;
    border: 1px solid #e8e8e8;
}

.checkbox-container {
    flex-direction: row;
}

.checkbox-container input {
    margin-left: 12px;
    margin-top: -10px;
}

.mini-images {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0px;
}

.mini-images p {
    width: 100%;
    font-weight: bold;
    margin-bottom: 15px;
    text-align: left;
}

.mini-images img {
    height: 50px;
    margin-left: 15px;
    margin-bottom: 15px;
}
</style>