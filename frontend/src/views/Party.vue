<template>
    <div class="party" v-if="party">
        <h1>{{ party.title }}</h1>
        <div class="party-container">
            <div class="party-images" v-if="party.photos">
                <div class="main-image" :style="{'background-image': 'url(' + party.photos[0] + ')'}"></div>
                <div class="party-mini-images" v-if="party.photos[1]">
                    <div class="mini-image" v-for="(photo, index) in party.photos.slice(1, party.photos.length)" :key="index" :style="{'background-image': 'url(' + party.photos[index + 1] + ')'}"></div>
                </div>
            </div>
            <div class="party-details">
                <p class="bold">Descrição:</p>
                <p class="party-description">{{  party.description  }}</p>
                <p class="bold">Data:</p>
                <p class="party-date">{{ party.partyDate }}</p>
            </div>
        </div>
    </div>
    <div class="party-error" v-else>
        <h1 class="party-error-private">Ops...Este evento é privado!</h1>
        <p class="party-redirect">Voltando para a página inicial.</p>
    </div>

</template>

<script>
export default {

    data() {
        return{
            party: {}
        }
    },
    created() {
        //Load party
        this.getParty();
    },
    methods: {
        async getParty() {

            //Get id from url and token from store
            const id = this.$route.params.id;
            const token = this.$store.getters.token;

            await fetch (`https://p-time.onrender.com/api/party/${id}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "auth-token": token
                }
            })
            .then((resp) => resp.json())
            .then((data) =>{

                if(data.error != null) {
                    setTimeout(() => {
                        this.$router.push('/');

                    }, 5000)
                }

                this.party = data.party;

                this.party.partyDate = new Date(this.party.partyDate).toLocaleDateString();

                this.party.photos.forEach((photo, index) => {

                    this.party.photos[index] = photo.replace("public", "https://p-time.onrender.com").replaceAll("\\", "/");
                });

            })
            .catch((err) =>{
                console.log(err);
            });
        }
    }

}
</script>

<style scoped>

.party {
    text-align: center;
    padding-top: 40px;
    padding-bottom: 100px;
    width: 1000px;
    margin: 0 auto;
}

.party h1 {
    margin-bottom: 40px;
}

.party-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; 
    text-align: center;
    padding: 20px;
}

.party-error-private {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.party-redirect {
    font-size: 16px;
    margin-top: 10px;
    color: #495057;
}

/* Adiciona uma animação de fade-in para a mensagem de erro */
.party-error {
    animation: fadeIn 2s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.party-container {
    display: flex;
}

.party-images {
    width: 380px;
    margin-right: 30px;
}

.main-image {
    width: 100%;
    height: 200px;
    background-color: #CCC;
    margin-bottom: 15px;
    background-position: center;
    background-size: cover;
}

.party-mini-images {
    display: flex;
    flex-wrap: wrap;
}

.mini-image {
    width: 80px;
    height: 80px;
    margin-right: 15px;
    margin-bottom: 15px;
    background-color: #CCC;
    background-position: center;
    background-size: cover;
}

.party-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.bold {
    margin-bottom: 12px;
    font-weight: bold;
}

.party-description, .party-date {
    margin-bottom: 20px;
}

</style>