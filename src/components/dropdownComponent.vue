<template>
  <div class="dropdown">
    <button class="dropdown-toggle" @click.stop.prevent="isOpen = !isOpen">
      {{ selected ? selected.name : "Выберите организацию" }}
    </button>
    <transition name="fade">
      <div class="dropdown-menu" v-show="isOpen">
        <dropdown-item
          v-for="item in tree"
          :key="item.id"
          :item="item"
          @changeSelected="selectedItem"
          @closeDropdown="closeDropdown"
        ></dropdown-item>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits } from "vue";
import { useTreeStore } from "../stores/tree";
import DropdownItem from "./dropdownItem.vue";
const tree = useTreeStore().tree;
const isOpen = ref(false);

const selected = ref("");

const selectedItem = (item) => (selected.value = item);

const closeDropdown = (item) => (isOpen.value = item);

const emit = defineEmits(["selected"]);

watch(selected, (val) => {
  emit("selected", val.id);
});
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