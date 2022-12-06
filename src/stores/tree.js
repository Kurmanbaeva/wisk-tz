import { defineStore } from "pinia";
import data from "../assets/data/data.json";

export const useTreeStore = defineStore({
  id: "tree",
  state: () => ({
    tree: data,
  }),
  actions: {
    add(item, nodeId) {
      this.find(this.tree, nodeId, (el) => {
        el.children.push({
          ...item,
          id: Date.now()
        })
      })
    },
    delete(nodeId) {
      this.find(this.tree, nodeId, (el) => {
        el.children = el.children.filter((i) => i.id !== nodeId)
      })
    },
    edit(item) {
      const data = Object.assign({}, item)
      this.find(this.tree, data.id, (el) => {
        el.children = el.children.map((i) => i.id === data.id ? { ...data, children: i.children } : i)
      })
    },
    find(tree, idx, callback) {
      const len = tree?.length || 0;
      for (let i = 0; i < len; i++) {
        const childIDs = tree[i].children?.map((i) => i.id) || []
        if (childIDs.includes(idx)) {
          callback(tree[i])
        } else {
          this.find(tree[i]?.children || [], idx, callback)
        }
      }
    }
  },
});
