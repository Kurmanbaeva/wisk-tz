<template>
  <div class="dropdown-item">
    <label :for="`item${item.id}`">
      <input
        type="radio"
        :value="item"
        :id="`item${item.id}`"
        v-model="selected"
      />
      {{ item.name }}</label
    >
    <dropdown-item
      v-for="child in item.children"
      :key="child.id"
      :item="child"
      class="-children"
      @changeSelected="selectedItem"
    ></dropdown-item>
  </div>
</template>

<script setup>
import { watch, ref, defineProps, defineEmits } from "vue";
import DropdownItem from "./dropdownItem.vue";

const props = defineProps({
  item: { type: Object, required: true },
});

const emit = defineEmits(["changeSelected", "closeDropdown"]);

props.item;

const selected = ref("");
const selectedItem = (item) => (selected.value = item);

watch(selected, (val) => {
  emit("changeSelected", val);
  emit("closeDropdown", false);
});
</script>