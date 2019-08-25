<template>
    <div id="loading">
        <div class="loading-bar">
            Loading ...
        </div>
    </div>
</template>

<style>
    #loading{
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        letter-spacing: 1px;
        position: fixed;
        top: auto;
        left: 45vw;
        z-index: 5;
    }

    .loading-bar{
        padding: 15px;
        background-color: var(--terciary);
        border: 1px white solid;
        border-radius: 10px;
        -webkit-box-shadow: 0px 0px 27px 0px rgba(0,0,0,0.46);
        -moz-box-shadow: 0px 0px 27px 0px rgba(0,0,0,0.46);
        box-shadow: 0px 0px 27px 0px rgba(0,0,0,0.46);
    }
</style>