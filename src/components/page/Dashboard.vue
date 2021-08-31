<template>
  <div>欢迎{{name}}</div>
</template>

<script>
export default {
  name: "dashboard",
  data() {
    return {
      name: localStorage.getItem("qyd_username")
    }
  },
  methods: {

  },
};
</script>