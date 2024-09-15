<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type {Post} from "~/posts";

const {post} = defineProps<{
  post: Post
}>()
</script>

<template>
  <Card class="mt-4">
    <CardHeader class="border-b mb-4">
      <CardTitle class="text-xl">
        <p v-html="post.title"></p>
      </CardTitle>
    </CardHeader>
    <CardContent class="grid gap-4">
      <div class=" flex items-center space-x-4">
        <div class="flex-1 space-y-1">
          <p class="text-sm font-medium leading-none" v-html="post.body">
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>