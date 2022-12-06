<template>
  <div class="container">
    <div class="title">Организационная структура</div>
    <button class="button -add" id="show-modal" @click="handlerOpenModal">
      <img :src="require('@/assets/icon/add.svg')" alt="" /> Добавить
    </button>
    <TreeList />
  </div>
  <ModalComponent v-if="data.showModal" @close="handlerCloseModal" eventItem="add">
    <template #header>Добавить</template>
  </ModalComponent>
</template>

<script setup>
import { reactive } from "vue";
import TreeList from "./components/treeList.vue";
import ModalComponent from "./components/modalComponent.vue";

const data = reactive({
  showModal: false
})

const handlerCloseModal = () => {
  data.showModal = false
}

const handlerOpenModal = () => {
  data.showModal = true
}
</script>
