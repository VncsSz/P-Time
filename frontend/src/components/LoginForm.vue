<template>
    <div>
        <Message :msg="msg" :msgClass = "msgClass" />
        <form id="login-form" @submit="login($event)">
            <div class="input-container">
                <label for="email">E-mail:</label>
                <input type ="email" name="email" id="email" v-model="email" placeholder="Digite seu e-mail">
            </div>
            <div class="input-container">
                <label for="password">Senha:</label>
                <input type ="password" name="password" id="password" v-model="password" placeholder="Digite sua senha">
            </div>
            <InputSubmit text="Entrar" />
        </form>
    </div>
</template>

<script>
import Message from './Message.vue'
import InputSubmit from './form/InputSubmit.vue'

export default {
    name: "LoginForm",
    components: {
        Message,
        InputSubmit
    },
    methods: {
        login(e) {

            e.preventDefault();

        }
    }
}
</script>

<style scoped>
#login-form {
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