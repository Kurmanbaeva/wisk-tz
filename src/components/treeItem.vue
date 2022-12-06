<template>
  <div>
    <div
      class="tr -item"
      :class="{ '-open': isOpen }"
      @click="isOpen = !isOpen"
    >
      <div class="td">
        <img
          :src="require('@/assets/icon/arrow.svg')"
          alt=""
          class="icon"
          v-if="issetChildren"
        />
        {{ item.name }}
      </div>
      <div class="td">{{ item.total }}</div>
      <div class="td">{{ item.actual }}</div>
      <div class="td">
        <button class="button -actions" @click.stop.prevent="showModal = true">
          <img :src="require('@/assets/icon/edit.svg')" alt="" />
        </button>
        <button class="button -actions" @click.stop.prevent="deleteItem" v-if="showRemove">
          <img :src="require('@/assets/icon/delete.svg')" alt="" />
        </button>
      </div>
    </div>
    <transition name="fade">
      <div
        v-show="isOpen"
        class="-children"
        :style="{ backgroundColor: `rgba(140,181,255, ${opacity})` }"
      >
        <TreeItem
          v-for="children in currentChildren"
          :key="children.id"
          :item="children"
          :opacity="opacity + 0.3"
        />
      </div>
    </transition>
    <ModalComponent
      v-if="showModal"
      @close="showModal = false"
      :treeItem="editedData"
      eventItem="edit"
    >
      <template #header>Изменить</template>
    </ModalComponent>
  </div>
</template>

<script setup>
import {computed, defineProps, ref} from "vue";
import { useTreeStore } from "@/stores/tree";
import ModalComponent from "./modalComponent.vue";

const props = defineProps({
  item: { type: Object, required: true },
  opacity: { type: Number, required: true },
});

const isOpen = ref(false);
const showModal = ref(false);

const store = useTreeStore();

const deleteItem = () => store.delete(props.item.id);

const issetChildren = computed(() => props.item?.children?.length > 0 || false)

const showRemove = computed(() => !issetChildren.value || false)

const currentChildren = computed(() => props.item?.children || [])

const editedData = computed(() => {
  const obj = Object.assign({}, props.item)
  delete obj.children
  return obj
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
