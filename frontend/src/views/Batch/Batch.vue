<template>
  <header>批量处理</header>
  <main>
    <section>
      <div style="background: #ececec; padding: 30px">
        <a-card title="个人信息" :bordered="false" style="width: 100%">
          <div>
            <span>上传</span>
            <div class="upload">
              <a-upload v-model:file-list="fileList">
                <a-button>
                  <upload-outlined></upload-outlined>
                  Upload
                </a-button>
              </a-upload>
            </div>
          </div>

          <p>列表</p>
          <p>
            <a-button type="primary">数据库更新</a-button>
          </p>
        </a-card>
      </div>
    </section>
    <section>
      <div style="background: #ececec; padding: 30px">
        <a-card title="博客" :bordered="false" style="width: 100%">
          <div>
            <span>上传</span>
            <div class="upload">
              <a-upload v-model:file-list="fileList">
                <a-button>
                  <upload-outlined></upload-outlined>
                  Upload
                </a-button>
              </a-upload>
            </div>
          </div>
          <div class="blog-list">
            <span>博客列表</span>
            <div></div>
          </div>
          <p>
            <a-button type="primary">数据库更新</a-button>
          </p>
        </a-card>
      </div>
    </section>
  </main>
</template>
<script>
import { reactive, onMounted, computed, toRefs } from "vue";
// import { useRouter } from 'vue-router';
// import { useStore } from 'vuex'
export default {
  components: {},
  setup() {
    // const router = useRouter();
    // const store = useStore();
    return {};
  },
};
</script>
<style lang="less" scoped>
</style>