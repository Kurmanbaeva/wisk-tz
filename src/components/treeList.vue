<template>
  <div class="table">
    <div class="tr -head">
      <div class="th"></div>
      <div class="th">Общее количество</div>
      <div class="th">Фактическое количество</div>
      <div class="th">Действия</div>
    </div>
    <TreeItem
      v-for="item in tree"
      :key="item.id"
      :item="item"
      :opacity="0.1"
    />
  </div>
</template>

<script setup>
import TreeItem from "@/components/treeItem.vue";
import { useTreeStore } from "@/stores/tree";

const tree = useTreeStore().tree;
</script>
