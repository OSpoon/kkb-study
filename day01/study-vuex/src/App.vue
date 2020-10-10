<template>
<div id="app">
    <p>counter: {{ $store.state.counter }}</p>
    <p>double counter: {{ $store.getters.doubleCounter }}</p>
    <button @click="$store.commit('add')">增加</button>
    <button @click="$store.dispatch('add')">async增加</button>
</div>
</template>

<script>
export default {
    name: "App",
    components: {},
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
