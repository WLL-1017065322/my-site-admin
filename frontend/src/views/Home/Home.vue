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
    <section class="auth-info">
      <a-form
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-row>
          <a-col>
            <a-form-item label="作者" name="author">
              <a-input v-model:value="formState.author" />
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="座右铭" name="motto">
              <a-input
                v-model:value="formState.motto"
                :title="formState.motto"
              />
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="qq" name="qq">
              <a-input v-model:value="formState.qq" /> </a-form-item
          ></a-col>
          <a-col>
            <a-form-item label="微信" name="wechat">
              <a-input v-model:value="formState.wechat" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-button type="primary" @click="updateInfo">更新</a-button>
    </section>
  </main>
</template>
<script>
import { reactive, onMounted, computed, toRefs } from "vue";
import { getSysMsg, putSysMsg } from "../../api/index";
import { message } from "ant-design-vue";

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
    const formState = reactive({
      author: "",
      motto: "",
      qq: "",
      wechat: "",
    });

    const getInfo = async () => {
      try {
        const resp = await getSysMsg();
        const { code } = resp;
        if (code === 0) {
          const { data = {} } = resp;
          Object.assign(msg, data);
          formState.author = data.author;
          formState.motto = data.motto;
          formState.qq = data.qq;
          formState.wechat = data.wechat;
        } else {
          message.warning(resp.errMsg);
        }
      } catch (error) {
        console.log(error);
        message.error(error);
      }
    };
    const updateInfo = async () => {
      try {
        const resp = await putSysMsg(formState);
        const { code } = resp;
        if (code === 0) {
          message.success("更新成功");
          getInfo();
        } else {
          message.warning("更新失败");
        }
      } catch (error) {
        console.log(error);
        message.warning(error);
      }
    };

    onMounted(() => {
      getInfo();
    });

    return {
      msg,
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      formState,
      updateInfo,
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
.auth-info {
  margin-top: 20px;
}
</style>