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
            <div class="blog-title">
              <span>博客列表</span>
              <a-button
                type="primary"
                style="margin-left: 20px"
                @click="blogQuery"
                >查询</a-button
              >
              <a-button type="primary" style="margin-left: 20px"
                >全部更新</a-button
              >
            </div>
            <div class="content">
              <a-table
                :rowKey="(record) => record.title"
                :columns="columns"
                :data-source="data"
                :rowClassName="
                  (record, index) => (index % 2 === 1 ? 'table-striped' : null)
                "
              >
                <template #operation="{ record }">
                  <a-button
                    style="margin-right: 5px"
                    @click="preview(record)"
                    type="primary"
                    >预览</a-button
                  >
                  <a-button
                    style="margin-right: 5px"
                    @click="update(record)"
                    type="primary"
                    >更新</a-button
                  >
                </template>
              </a-table>
            </div>
          </div>
          <p></p>
        </a-card>
      </div>
    </section>

    <a-modal v-model:visible="showModal" @ok="handleOk" width="1000px">
      <div ref="markdownBatch" v-highlight></div>
    </a-modal>
  </main>
</template>
<script>
import { reactive, ref, onMounted, computed, toRefs, nextTick } from "vue";

import showdown from "showdown";
import highlight from "highlight.js";
import "highlight.js/styles/a11y-dark.css"; //样式文件

// import { useRouter } from 'vue-router';
// import { useStore } from 'vuex'
import { getBatch, updateBatch } from "../../api/index";

const columns = [
  { title: "标题", dataIndex: "title", width: 300 },
  { title: "内容", dataIndex: "content", ellipsis: true },
  { title: "操作", slots: { customRender: "operation" }, width: 200 },
];
export default {
  components: {},
  directives: {
    highlight: {
      updated(el) {
        console.log(111);
        // el.focus();
        // let blocks = el.querySelectorAll("pre code");
        // blocks.forEach((block) => {
        //   highlight.highlightBlock(block);
        // });
      },
    },
  },
  setup(prop, ctx) {
    // const router = useRouter();
    // const store = useStore();
    const obj = reactive({
      data: [],
    });

    const blogQuery = async () => {
      const resp = await getBatch();
      obj.data = resp.data;
      console.log(resp);
    };

    const showModal = ref(false);
    const preview = async (record) => {
      console.log("markdownBatch", markdownBatch);
      console.log("record", record);
      // ctx.emit(() => {
      //   console.log("markdownBatch1", markdownBatch);
      // });
      console.log("markdownBatch1", markdownBatch);
      showModal.value = true;
      await nextTick();
      initMarkDown(record.content);
    };
    const markdownBatch = ref();
    const initMarkDown = (content) => {
      const converter = new showdown.Converter();
      const markdownRef = markdownBatch.value;
      // console.log("converter", converter);
      // const html = converter.makeHtml(formState.content);
      const html = converter.makeHtml(content);
      // console.log("html", html);
      // console.log("markdownRef", markdownRef);
      markdownRef.innerHTML = html;
      // console.log('markdownRef',markdownRef);
      let blocks = markdownRef.querySelectorAll("pre code");
      blocks.forEach((block) => {
        highlight.highlightBlock(block);
      });
    };
    const handleOk = () => {
      showModal.value = false;
    };

    const update = async (record) => {
      try {
        const resp = await updateBatch(record);
        console.log("resp", resp);
      } catch (error) {
        console.log(error);
      }
    };
    return {
      columns,
      showModal,
      ...toRefs(obj),
      blogQuery,
      preview,
      markdownBatch,
      handleOk,
      update,
    };
  },
};
</script>
<style lang="less" scoped>
</style>