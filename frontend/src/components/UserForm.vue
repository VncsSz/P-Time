<template>
    <div>
        <Message :msg="msg" :msgClass="msgClass" />
       <form id="user-form" @submit="page === 'register' ? register($event) : update($event)">
        <input type ="hidden" name="id" id="id" v-model="id">
        <div class="input-container">
            <label for="name">Nome:</label>
            <input type="text" id="name" v-model="name" placeholder="Digite seu nome">
        </div>
        
        <div class="input-container">
            <label for="email">E-mail:</label>
            <input type="text" id="email" v-model="email" placeholder="Digite seu e-mail">
        </div>
        
        <div class="input-container">
            <label for="password">Senha:</label>
            <input type="password" id="password" v-model="password" placeholder="Digite sua senha">
        </div>

        <div class="input-container">
            <label for="confirmpassword">Senha:</label>
            <input type="password" id="confirmpassword" v-model="confirmpassword" placeholder="Confirme sua senha">
        </div>
        <InputSubmit :text="btnText" />
       </form>
    </div>
</template>

<script>
import InputSubmit from './form/InputSubmit.vue'
import Message from './Message.vue'

export default {    
    name: "RegisterForm",
    data(){
        return {
            id: this.user._id || null,
            name: this.user.name || null,
            email: this.user.email || null,
            password: null,
            confirmpassword: null,
            msg: null,
            msgClass: null
        }
    },
    props: ["user", "page", "btnText"],
    components: {
        InputSubmit,
        Message
    },
    methods: {
        async register(e){

            e.preventDefault();

            const data = {
                name: this.name,
                email: this.email,
                password: this.password,
                confirmpassword: this.confirmpassword
            }

            const jsonData = JSON.stringify(data)

            
            await fetch("https://p-time.onrender.com/api/auth/register",{
                method: "POST",
                headers:{"Content-type": "application/json"},
                body: jsonData
            })
            .then((resp) => resp.json())
            .then((data) =>{
                
                let auth = false;
                
                if(data.error){
                    this.msg = data.error;
                    this.msgClass = "error";
                } else{

                    auth = true;

                    this.msg = data.msg;
                    this.msgClass = "success";

                    //Emit event for auth an user
                    this.$store.commit("authenticate", {token: data.token, userId: data.userId})
                }

                setTimeout(() =>{
                    if(!auth){
                        this.msg = null;
                    } else {
                        //Redirect
                        this.$router.push("dashboard")
                    }

                }, 2000)
            })
            .catch((err) => {
                console.log(err)
            })
        },
        async update(e) {

            e.preventDefault();

            const data = {
                id: this.id,
                name: this.name,
                email: this.email,
                password: this.password,
                confirmpassword: this.confirmpassword
            }

            const jsonData = JSON.stringify(data)

            //Get token from store
            const token = this.$store.getters.token;
            
            await fetch("https://p-time.onrender.com/api/user",{
                method: "PATCH",
                headers:{
                    "Content-type": "application/json",
                    "auth-token": token
                },
                body: jsonData
            })
            .then((resp) => resp.json())
            .then((data) =>{

                if(data.error){
                    this.msg = data.error;
                    this.msgClass = "error";
                } else {
                    this.msg = data.msg;
                    this.msgClass = "success";
                }

                setTimeout(() =>{

                    this.msg = null;
                
                }, 2000)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

}
</script>

<style scoped>
#user-form{
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

.input-container label{
    margin-bottom: 10px;
    color: #555
}

.input-container input{
    padding: 10px;
    border: 1px solid #e8e8e8;
}
</style>