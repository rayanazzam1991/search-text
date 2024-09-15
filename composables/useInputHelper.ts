import {debounceInput, generateUniqueId} from "~/utils/helper";
import type {Ref} from "vue";

export const useInputHelper = (debouncedTextSearch: Ref<string>) => {

    const postKey = ref<string>('')

    function handleInput(value: string) {
        debouncedTextSearch.value = value;
        postKey.value = generateUniqueId()
    }

    const debouncedHandleInput = debounceInput(handleInput, 300);

    // we are using this debounce to prevent a lot of queries
    function handleChangeTextSearch(event: Event) {
        const target = event.target as HTMLInputElement;
        debouncedHandleInput(target.value);
    }

    // we are watching this value and generate new key to update component
    watch(() => debouncedTextSearch.value,
        () => {
            postKey.value = generateUniqueId();
        })

    return {
        handleChangeTextSearch,
        postKey
    }
}