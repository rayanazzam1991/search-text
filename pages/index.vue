<script setup lang="ts">
import {MagnifyingGlassIcon,Cross1Icon} from '@radix-icons/vue'
import PostCard from "~/components/view/PostCard.vue";
import {type Post, posts} from "~/posts";

const filteredPosts = computed(() => {
  if (!debouncedTextSearch.value.trim()) {
    return posts;
  }
  let filtered: Post[] = posts.filter((post: Post) => {
    return (
        post.title.toLowerCase().includes(debouncedTextSearch.value.toLowerCase()) ||
        post.body.toLowerCase().includes(debouncedTextSearch.value.toLowerCase())
    )
  });
  return filtered.map((post: Post) => {
    if (!debouncedTextSearch.value.trim()) {
      return post;
    }
    const regex = new RegExp(`(${debouncedTextSearch.value})`, 'gi');

    let newPost: Post = {} as Post;
    newPost.id = post.id
    newPost.body = post.body.replace(regex,
        '<span class="bg-red-700 text-white">$1</span>')
    newPost.title = post.title.replace(regex,
        '<span class="bg-red-700 text-white">$1</span>')
    return newPost;
  });
})
const textSearch = ref<string>('')
const debouncedTextSearch = ref<string>('')
const postKey = ref<string>('')

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number = 500): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null;

  return function (this: any, ...args: Parameters<T>): void {
    if (timer) {
      clearTimeout(timer);
    }

    const context = this;

    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

function handleInput(value: string) {
  debouncedTextSearch.value = value;
  postKey.value = generateUniqueId()
}

const debouncedHandleInput = debounce(handleInput, 300);

function handleChangeTextSearch(event: Event) {
  const target = event.target as HTMLInputElement;
  debouncedHandleInput(target.value);
}

function generateUniqueId() {
  return Math.random().toString(36).slice(2, 9);
}
const clearSearch = ()=>{
  textSearch.value = ''
  debouncedTextSearch.value = ''
  postKey.value = generateUniqueId()
}
</script>

<template>
  <div class="container px-4 mx-auto">
    <div class="text-4xl">Search</div>
    <div class="relative w-full max-w-sm items-center mt-12">
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <MagnifyingGlassIcon class="size-6 text-muted-foreground"/>
      </span>
      <Input v-model="textSearch" @input="handleChangeTextSearch" id="search" type="text" placeholder="Search..."
             class="pl-10"/>
      <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
        <Cross1Icon class="size-3 text-muted-foreground" @click="clearSearch"/>
      </span>
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