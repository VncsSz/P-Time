<template>
    <div class="profile">
        <h1>Edite seu perfil</h1>
        <UserForm page="profile" :user="user" btnText="Editar" :key="componentKey" />
    </div>
</template>

<script>
import UserForm from '../components/UserForm.vue'
export default {
    components: {
        UserForm
    },
    data() {
        return{
            user: {},
            componentKey: 0
        }
    },
    created() {
        //Load user
        this.getUser()
    },
    methods: {
        async getUser() {
            //Get id from token
            const id = this.$store.getters.userId;
            const token = this.$store.getters.token;

            await fetch(`https://p-time.onrender.com/api/user/${id}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "auth-token": token
                }
            })
            .then((resp) => resp.json())
            .then((data) => {
                
                this.user = data.user;
                this.componentKey += 1;

            })
            .catch((err) =>{
                console.log(err);
            })
        }
    }

}
</script>

<style scoped>
.profile{
    text-align: center;
    padding-top: 40px;
    padding-bottom: 100px;
}

.profile h1{
    margin-bottom: 40px;
}
</style>