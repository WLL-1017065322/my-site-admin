<template>
  <header>系统信息</header>
  <main>
    <section class="msg-items">
      <div class="item">文章总数：{{ msg.articleNums }}</div>
      <!-- <div class="item">页面总数：{{ msg.pageNums }}</div> -->
      <div class="item">用户总数：{{ msg.userNums }}</div>
      <!-- <div class="item">评论总数：{{ msg.commentNums }}</div> -->
      <!-- <div class="item">浏览总数：{{ msg.pageviewNums }}</div> -->
      <!-- <div class="item">分类总数：{{ msg.classifyNums }}</div> -->
      <div class="item">标签总数：{{ msg.tagNums }}</div>
      <div class="item">关键词总数：{{ msg.keywordsNums }}</div>
      <!-- <div class="item">运行时间：{{ msg.runTime }}</div> -->
      <div class="item">创建时间：{{ msg.createTime }}</div>
    </section>
  </main>
</template>
<script>
import { reactive, onMounted, computed, toRefs } from "vue";
import { getSysMsg } from "../../api/index";

// import { useRouter } from 'vue-router';
// import { useStore } from 'vuex'
export default {
  components: {},
  setup() {
    // const router = useRouter();
    // const store = useStore();
    const msg = reactive({
      articleNums: "",
      pageNums: "",
      userNums: "",
      commentNums: "",
      pageviewNums: "",
      keywordsNums: "",
      // classifyNums: '',
      tagNums: "",
      runTime: "",
      createTime: "",
    });

    const getInfo = async () => {
      try {
        const resp = await getSysMsg();
        const { code } = resp;
        if (code === 0) {
          Object.assign(msg, resp.data);
        } else {
          message.warning(resp.errMsg);
        }
      } catch (error) {
        console.log(error);
        message.error(error);
      }
    };
    onMounted(() => {
      getInfo();
    });

    return {
      msg,
    };
  },
};
</script>
<style lang="less" scoped>
.msg-items {
  display: flex;
  flex-wrap: wrap;
  .item {
    min-width: 200px;
    border: 1px solid #eee;
    padding: 10px 20px;
    background-color: #fff;
  }
}
</style>