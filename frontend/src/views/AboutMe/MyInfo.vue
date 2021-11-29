<template>
  <header>个人信息</header>
  <main>
    <section class="content">
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="username" name="username">
          <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item label="account" name="account">
          <a-input v-model:value="formState.account" />
        </a-form-item>
        <a-form-item label="gender" name="gender">
          <a-input v-model:value="formState.gender" />
        </a-form-item>
        <a-form-item label="age" name="age">
          <a-input v-model:value="formState.age" />
        </a-form-item>
        <a-form-item label="selfIntroduction" name="selfIntroduction">
          <a-input v-model:value="formState.selfIntroduction" />
        </a-form-item>
        <a-form-item label="phone" name="phone">
          <a-input v-model:value="formState.phone" />
        </a-form-item>
        <a-form-item label="wechat" name="wechat">
          <a-input v-model:value="formState.wechat" />
        </a-form-item>
        <a-form-item label="qq" name="qq">
          <a-input v-model:value="formState.qq" />
        </a-form-item>
        <a-form-item label="github" name="github">
          <a-input v-model:value="formState.github" />
        </a-form-item>
        <a-form-item label="gitee" name="gitee">
          <a-input v-model:value="formState.gitee" />
        </a-form-item>
        <a-form-item label="skill" name="skill">
          <a-input v-model:value="formState.skill" />
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
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRaw,
  UnwrapRef,
} from "vue";
import { getMyInfo, modifyMyInfo } from "../../api/index.js";
import { useRouter, useRoute } from "vue-router";
import { message } from "ant-design-vue";
import Wangeditor from "wangeditor";
import showdown from "showdown";
import highlight from "highlight.js";
import "highlight.js/styles/a11y-dark.css"; //样式文件

interface FormState {
  _id: string;
  content: string;
  username: string;
  gender: string;
  age: string;
  selfIntroduction: string;
  phone: string;
  wechat: string;
  qq: string;
  github: string;
  gitee: string;
  skill: string;
  // region: string | undefined;
  // phone1: Moment | undefined;
  // delivery: boolean;
  // qq: string[];
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
      account: "",
      content: "",
      username: "",
      gender: "",
      age: "",
      selfIntroduction: "",
      phone: "",
      wechat: "",
      qq: "",
      github: "",
      comment: "",
      gitee: "",
      skill: "",
    });
    const rules = {
      username: [
        {
          required: true,
          message: "请输入姓名",
          trigger: "blur",
        },
      ],
    };
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(async () => {
          try {
            console.log(1111);
            const resp = await modifyMyInfo({ ...formState });
            const { code } = resp;
            if (code === 0) {
              message.success("修改成功");
            } else {
              const { errMsg = "" } = resp;
              message.warning(errMsg);
            }
            queryMyInfo();
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

    const queryMyInfo = async () => {
      try {
        resetForm();
        const resp = await getMyInfo();
        const { code, errMsg = "请求失败", data = {} } = resp;
        console.log("resp", resp);
        if (code === 0) {
          Object.assign(formState, data);
        } else {
          message.warning(errMsg);
        }
      } catch (error) {
        console.log(error);
        message.warning(error);
      }
    };

    onMounted(() => {
      queryMyInfo();
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
  watch: {},
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