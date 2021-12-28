<template>
  <header>批量处理</header>
  <main>
    <section>
      <div style="background: #ececec; padding: 30px">
        <a-card title="个人信息" :bordered="false" style="width: 100%">
          <div style="margin-bottom: 10px">
            <span>上传：</span>
            <span class="upload">
              <a-upload
                v-model:file-list="uploadMyInfoList"
                :showUploadList="true"
                :multiple="true"
                action="/api/batch/myinfo"
              >
                <a-button>
                  <upload-outlined></upload-outlined>
                  Upload
                </a-button>
              </a-upload>
            </span>
          </div>

          <span>个人信息：</span>
          <span>
            <a-button
              type="primary"
              @click="myInfoQuery"
              style="margin-right: 20px"
              >查询</a-button
            >
            <!-- <a-button type="primary">数据库更新</a-button> -->
          </span>
          <div ref="myInfoRef">
            <!-- {{ myInfoData }} -->
          </div>
        </a-card>
      </div>
    </section>
    <section>
      <div style="background: #ececec; padding: 30px">
        <a-card title="博客" :bordered="false" style="width: 100%">
          <div style="margin-bottom: 10px">
            <span>上传： </span>
            <span class="upload">
              <a-upload
                v-model:file-list="fileList"
                :showUploadList="true"
                @change="handleChange"
                :multiple="true"
                action="/api/batch/upload"
              >
                <a-button>
                  <upload-outlined></upload-outlined>
                  Upload
                </a-button>
              </a-upload>
            </span>
          </div>
          <div class="blog-list">
            <div class="blog-title" style="margin-bottom: 10px">
              <span>博客列表{{ number > 0 ? `(${number}篇)` : "" }}</span>
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
<script lang="ts">
import { reactive, ref, onMounted, computed, toRefs, nextTick } from "vue";

import showdown from "showdown";
import highlight from "highlight.js";
import "highlight.js/styles/a11y-dark.css"; //样式文件

// import { useRouter } from 'vue-router';
// import { useStore } from 'vuex'
import { getBatch, updateBatch, getBatchMyInfo } from "../../api/index";
import { message } from "ant-design-vue";

interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
}
interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}

const columns = [
  { title: "标题", dataIndex: "title", width: 200, ellipsis: true },
  { title: "作者", dataIndex: "author", width: 150 },
  { title: "类型", dataIndex: "type", width: 150 },
  { title: "关键词", dataIndex: "keyword", width: 150 },
  { title: "标签", dataIndex: "tag", width: 150 },

  { title: "时间", dataIndex: "time", width: 150 },
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
    let number = ref(0);
    const blogQuery = async () => {
      const resp = await getBatch();
      const { code, data = [] } = resp;
      if (code === 0) {
        obj.data = data;
        number.value = data.length;
      } else {
        obj.data = [];
        number.value = 0;
        message.warning(resp.errMsg);
      }
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
      initMarkDown(record.content, markdownBatch);
    };
    const markdownBatch = ref();
    const initMarkDown = (content, Ref) => {
      console.log("Ref", Ref);
      const converter = new showdown.Converter();
      const markdownRef = Ref.value;
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

    const handleChange = (info: FileInfo) => {
      console.log("========", info);
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    };
    const fileList = ref([]);
    const uploadMyInfoList = ref([]);

    let myInfoData = ref("");
    const myInfoRef = ref();
    const myInfoQuery = async () => {
      try {
        const resp = await getBatchMyInfo({
          fileName: "myInfo.md",
        });
        const { code, errMsg } = resp;
        if (code === 0) {
          console.log("resp.data", resp.data);
          myInfoData.value = resp.data;

          console.log("myInfoRef", myInfoRef);
          initMarkDown(myInfoData.value, myInfoRef);
        } else {
          message.warning(errMsg);
        }
      } catch (error) {
        message.error(error);
        console.log(error);
      }
    };
    return {
      columns,
      showModal,
      number,
      fileList,
      uploadMyInfoList,
      myInfoData,
      myInfoRef,
      ...toRefs(obj),
      blogQuery,
      preview,
      markdownBatch,
      handleOk,
      update,
      handleChange,
      myInfoQuery,
    };
  },
};
</script>
<style lang="less" scoped>
</style>