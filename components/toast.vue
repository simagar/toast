<template>
  <transition name="slide-left">
    <div v-if="toastInstance.showToast && toastInstance.variant==='success'"
         class="fixed top-10 xl:w-2/12 w-11/12 md:left-10 left-0 bg-white border-l-[8px] border-green-500 leading-10  shadow-lg rounded-lg   z-[99999999] p-3 ">
      <!--      <div class="flex items-center gap-2">-->
      <!--        <DynamicIcon :icon="`CheckIcon`" class="fill-green-500"></DynamicIcon>-->
      <!--        <span>Success</span>-->
      <!--      </div>-->
      <p class="text-black px-1">{{ toastInstance.content }}</p>
    </div>

  </transition>
  <transition name="slide-left">
    <div v-if="toastInstance.showToast && toastInstance.variant==='error'"
         class="fixed top-10 xl:w-2/12 w-11/12 md:left-10 left-0 bg-white border-l-[8px] border-red-500 leading-10  shadow-lg rounded-lg   z-[99999999] p-3 ">
      <!--      <div class="flex items-center gap-2">-->
      <!--        <DynamicIcon :icon="`AlertIcon`" class="fill-red-500"></DynamicIcon>-->
      <!--        <span>Error</span>-->
      <!--      </div>-->
      <p class="text-black px-1 ">{{ toastInstance.content }}</p>
    </div>
  </transition>
  <transition name="slide-left">
    <div v-if="toastInstance.showToast && toastInstance.variant==='info'"
         class="fixed top-10 xl:w-2/12 bg-white w-full border-l-4   leading-10  shadow rounded-lg z-[99999999] p-4">
      <!--      <div class="flex items-center gap-2">-->
      <!--        <DynamicIcon :icon="`AlertIcon`" class="fill-red-500"></DynamicIcon>-->
      <!--        <span>Error</span>-->
      <!--      </div>-->
      <p class="text-black px-1 text-center">{{ toastInstance.content }}</p>

    </div>
  </transition>
</template>

<script lang="ts" setup>
import {useToastStore} from "~/stores/toast";

let toastStore = useToastStore()

interface ActionContext {
  name: string;
  store: any;
  args: any[];
  after: (callback: () => void) => void;
  onError: (callback: (error: any) => void) => void;
}

interface IToastInstance {
  showToast: boolean,
  variant?: string,
  content: string,
  timeout: null
}

let toastInstance = ref<IToastInstance>({
  showToast: false,
  variant: '',
  content: '',
  timeout: null
})
onMounted(() => {
  toastStore.$onAction((mutation: ActionContext) => {
    setToast(mutation)
  })
})


watch(() => toastInstance.value.showToast, async (val) => {
  if (val) {
    setTimeout(() => {
      toastInstance.value.showToast = false
    }, 3000)
  }
})

function setToast(mutation: ActionContext) {
  toastInstance.value.variant = mutation.name
  toastInstance.value.content = mutation.args[0]
  toastInstance.value.showToast = true
}
</script>

<style scoped>
.slide-left-enter-active {
  animation: slideRightAnm 0.5s ease-in-out;
}

.slide-left-leave-active {
  animation: slideRightAnm reverse 0.5s ease-in-out;
}

@keyframes slideRightAnm {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

</style>
