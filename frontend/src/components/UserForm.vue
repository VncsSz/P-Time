<template>
    <div>
       <form action="" id="user-form">
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
            <input type="password" id="confirmpassword" v-model="confirmpassword" placeholder="confirme sua senha">
        </div>
        <InputSubmit :text="btnText" />
       </form>
    </div>
</template>

<script>
import InputSubmit from './form/InputSubmit.vue'

export default {    
    name: "RegisterForm",
    data(){
        return {
            name: null,
            email: null,
            password: null,
            confirmpassword: null,
            btnText: "Cadastrar"
        }
    },
    components: {
        InputSubmit
    }

}
</script>

<style scoped>

</style>