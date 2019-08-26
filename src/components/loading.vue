<template>
    <div id="loading">
        <div class="loading-bar">
            Loading ...
        </div>
    </div>
</template>

<style>
     #loading{
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 80;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.096);
    }

    .loading-bar{
        letter-spacing: 1px;
        padding: 15px;
        background-color: var(--terciary);
        border: 2px solid var(--secundary);
        color: var(--secundary);
        font-family: 'Oswald', sans-serif;
    }

</style>