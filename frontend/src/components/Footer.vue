<template>
    <footer>
        <h3>VncsSz &copy; - Project 2024</h3>
        <p>Affirmed</p>
    </footer>
</template>

<script>
export default{
    name:"Footer"
}
</script>

<style scoped>
footer{
    background-color: #25282e;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

footer h3{
    color: #FFF;
    margin-bottom: 15px;
    font-weight: 300;
    font-size: 1.6rem;
}

footer p {
    color: #c1b696
}
</style>