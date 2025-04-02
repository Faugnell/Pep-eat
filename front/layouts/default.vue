<script setup lang='ts'>
import HeaderPepeat from '~/components/common/HeaderPepeat.vue';
import FooterPepeat from '~/components/common/FooterPepeat.vue';
</script>

<template>
    <div class="w-full h-full flex flex-col justify-between">
        <HeaderPepeat />
        <div class="w-full h-full overflow-auto">
            <slot/>
        </div>
        <FooterPepeat />
    </div>
</template>