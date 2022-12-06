<template>
  <Transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">Добавить</slot>
            <button @click="$emit('close')" class="button -close">
              <img :src="require('@/assets/icon/close.svg')" alt="" />
            </button>
          </div>

          <div class="modal-body">
            <form action="" @submit.stop.prevent="eventTree" class="form">
              <dropdown-component
                v-if="eventItem == 'add'"
                @selected="selected"
              ></dropdown-component>
              <input
                type="text"
                placeholder="Название"
                required
                v-model="item.name"
              />
              <input
                type="number"
                placeholder="Общее количество"
                required
                v-model="item.total"
              />
              <input
                type="number"
                placeholder="Фактическое количество"
                required
                v-model="item.actual"
              />
              <button class="button -blue">Ok</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { defineProps, ref, defineEmits } from "vue";
import { useTreeStore } from "@/stores/tree";
import DropdownComponent from "./dropdownComponent.vue";

const props = defineProps({
  treeItem: { type: Object },
  eventItem: { type: String, required: true },
});

const item = ref({ name: "", total: null, actual: null, children: [] });

const test = ref(props.treeItem);

if (props.eventItem === "edit") {
  item.value = test.value;
}

const parentId = ref(null);

const selected = (id) => (parentId.value = id);

const store = useTreeStore();
const emit = defineEmits(["close"]);

const eventTree = () => {
  if (props.eventItem === "edit") {
    store.edit(item.value);
  } else {
    store.add(item.value, parentId.value);
  }
  emit("close", false);
};
</script>
