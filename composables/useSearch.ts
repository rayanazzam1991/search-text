import {type Post, posts} from "~/posts";
import type {Ref} from "vue";
import {generateUniqueId} from "~/utils/helper";

export const useSearch = (search: Ref<string>,
                          input: Ref<string>) => {

    const filteredPosts = computed(() => {
        if (!search.value.trim()) {
            return posts;
        }
        let filtered: Post[] = posts.filter((post: Post) => {
            return (
                post.title.toLowerCase().includes(search.value.toLowerCase()) ||
                post.body.toLowerCase().includes(search.value.toLowerCase())
            )
        });
        return filtered.map((post: Post) => {
            if (!search.value.trim()) {
                return post;
            }
            // this regex to search without case-sensitive problem.
            const regex = new RegExp(`(${search.value})`, 'gi');

            let newPost: Post = {} as Post;
            newPost.id = post.id
            newPost.body = post.body.replace(regex,
                '<span class="bg-red-700 text-white">$1</span>')
            newPost.title = post.title.replace(regex,
                '<span class="bg-red-700 text-white">$1</span>')
            return newPost;
        });
    })


    const clearSearch = () => {
        search.value = ''
        input.value = ''
    }
    return {
        filteredPosts,
        clearSearch,
    }
}