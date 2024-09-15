<script setup lang="ts">
import {MagnifyingGlassIcon, Cross1Icon} from '@radix-icons/vue'
import PostCard from "~/components/view/PostCard.vue";
import {type Post} from "~/posts";
import {useSearch} from "~/composables/useSearch";
import {useInputHelper} from "~/composables/useInputHelper";



const textSearchInput = ref<string>('')
const debouncedTextSearch = ref<string>('')

const {filteredPosts,clearSearch} = useSearch(debouncedTextSearch,textSearchInput)
const {handleChangeTextSearch,postKey} = useInputHelper(debouncedTextSearch)


</script>

<template>
  <div class="container px-4 mx-auto">
    <div class="text-4xl">Search</div>
    <div class="relative w-full max-w-sm items-center mt-12">
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <MagnifyingGlassIcon class="size-6 text-muted-foreground"/>
      </span>
      <Input v-model="textSearchInput" @input="handleChangeTextSearch" id="search" type="text" placeholder="Search..."
             class="pl-10"/>
      <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
        <Cross1Icon class="size-3 text-muted-foreground" @click="clearSearch"/>
      </span>
    </div>
    <div class="flex my-12" v-if="textSearchInput && filteredPosts.length > 0">
      <span class="font-bold mr-1">{{filteredPosts.length}} Posts </span> were found
    </div>
    <div v-if="filteredPosts.length === 0" class="flex justify-center items-center h-96">
      <h3 class="text-2xl"> No Posts found</h3>
    </div>

    <PostCard
        class="my-10"
        v-for="post in filteredPosts"
        :key="postKey"
        :post
    />
  </div>
</template>

<style scoped>

</style>