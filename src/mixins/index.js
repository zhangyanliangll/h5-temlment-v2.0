export default {
  methods: {
    // 格式化时间
    formatDate (val = new Date(), cal = 'isoDate') {
      val = val || new Date()
      return new Date(val).format(cal)
    },
    // 跳转
    jump (path, query = {}) {
      this.$router.push({
        path,
        query,
      });
    }
  },
};
