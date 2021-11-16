<template>
  <header>{{ $route.query.id ? "修改" : "新建" }}文章</header>
  <main>
    <section class="content">
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="title" name="title">
          <a-input v-model:value="formState.title" />
        </a-form-item>
        <a-form-item label="subhead" name="subhead">
          <a-input v-model:value="formState.subhead" />
        </a-form-item>
        <a-form-item label="tags" name="tags">
          <a-input v-model:value="formState.tags" />
        </a-form-item>
        <a-form-item label="author" name="author">
          <a-input v-model:value="formState.author" />
        </a-form-item>
        <a-form-item label="date" name="date">
          <a-input v-model:value="formState.date" />
        </a-form-item>
        <a-form-item label="time" name="time">
          <a-input v-model:value="formState.time" />
        </a-form-item>
        <a-form-item label="type" name="type">
          <a-input v-model:value="formState.type" />
        </a-form-item>
        <a-form-item label="image" name="image">
          <a-input v-model:value="formState.image" />
        </a-form-item>
        <a-form-item label="keywords" name="keywords">
          <a-input v-model:value="formState.keywords" />
        </a-form-item>
        <a-form-item label="content" name="content">
          <!-- <a-input v-model:value="formState.content" /> -->
          <!-- <div ref="editorElemMenu"></div>
          <div ref="editorElemBody"></div> -->
          <a-textarea v-model:value="formState.content" :rows="10" />
          <div ref="markdownEdit" v-highlight></div>
        </a-form-item>
      </a-form>
      <a-row class="btns">
        <a-button type="primary" class="btn" @click="onSubmit">确认</a-button>
      </a-row>
    </section>
  </main>
</template>
<script lang="ts">
// import { reactive, onMounted, computed, toRefs } from "vue";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { Moment } from "moment";
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRaw,
  UnwrapRef,
} from "vue";
import { queryBlogDetail, modifyBlog, addBlog } from "../../api/index.js";
import { useRouter, useRoute } from "vue-router";
import { message } from "ant-design-vue";
import Wangeditor from "wangeditor";
import showdown from "showdown";
import highlight from "highlight.js";
import "highlight.js/styles/a11y-dark.css"; //样式文件

interface FormState {
  _id: string;
  content: string;
  title: string;
  subhead: string;
  tags: string;
  author: string;
  date: string;
  time: string;
  type: string;
  image: string;
  keywords: string;
  // region: string | undefined;
  // date1: Moment | undefined;
  // delivery: boolean;
  // type: string[];
  // resource: string;
  // desc: string;
}
// import { useRouter } from 'vue-router';
// import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const formRef = ref();
    const editorElemMenu = ref();
    const editorElemBody = ref();
    const markdownEdit = ref();
    const route = useRoute();
    const formState: UnwrapRef<FormState> = reactive({
      _id: "",
      content: "",
      title: "",
      subhead: "",
      tags: "",
      author: "",
      date: "",
      time: "",
      type: "",
      image: "",
      comment: "",
      keywords: "",
    });
    const rules = {
      title: [
        {
          required: true,
          message: "请输入标题",
          trigger: "blur",
        },
      ],
    };
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(async () => {
          try {
            if (route.query.id) {
              const resp = await modifyBlog({ ...formState });
              const { code } = resp;
              if (code === 0) {
                message.success("修改成功");
              } else {
                const { errMsg = "" } = resp;
                message.warning(errMsg);
              }
            } else {
              delete formState._id;
              const resp = await addBlog({ ...formState });
              const { code } = resp;
              if (code === 0) {
                message.success("新增成功");
              } else {
                const { errMsg = "" } = resp;
                message.warning(errMsg);
              }
            }
          } catch (error) {
            console.log(error);
            message.error("连接超时");
          }
        })
        .catch((error: ValidateErrorEntity<FormState>) => {
          console.log("error", error);
        });
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };

    const resetEdit = () => {
      const elemMenu = editorElemMenu.value;
      const elemBody = editorElemBody.value;
      const editor = new Wangeditor(elemMenu, elemBody);
      editor.create();
    };

    const initMarkDown = () => {
      const converter = new showdown.Converter();
      const markdownRef = markdownEdit.value;
      // console.log("converter", converter);
      // const html = converter.makeHtml(formState.content);
      const html = converter.makeHtml(formState.content);
      console.log('html',html);
      markdownRef.innerHTML = html;
    };

    onMounted(async () => {
      initMarkDown();
      if (route.query.id) {
        try {
          const resp = await queryBlogDetail({
            id: route.query.id,
          });
          const { code } = resp;
          if (code === 0) {
            const { data } = resp;
            // formState = Object.assign({},formState, data);\
            Object.assign(formState, data);
            console.log("formState", formState);
          } else {
            const { errMsg = "" } = resp;
            message.warning(errMsg);
          }
        } catch (error) {
          console.log(error);
          message.error("连接超时");
        }
      } else {
      }
    });
    return {
      formRef,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      formState,
      rules,
      onSubmit,
      resetForm,
      editorElemMenu,
      editorElemBody,
      markdownEdit,
      initMarkDown,
    };
  },
  directives: {
    highlight: {
      updated(el) {
        // el.focus();
        let blocks = el.querySelectorAll("pre code");
        blocks.forEach((block) => {
          highlight.highlightBlock(block);
        });
      },
    },
  },
  watch: {
    'formState.content': "initMarkDown",
  },
});
</script>
<style lang="less" scoped>
.content {
  .btns {
    display: flex;
    justify-content: center;
    align-self: center;
  }
}
</style>