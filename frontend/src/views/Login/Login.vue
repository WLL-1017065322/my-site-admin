<template>
  <main class="login">
    <section class="login-content">
      <header class="login-text">账户密码登录</header>
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="账号" name="account">
          <a-input v-model:value="formState.account" />
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input v-model:value="formState.password" />
        </a-form-item>
      </a-form>
      <a-row class="btns">
        <a-button type="primary" class="btn" @click="onSubmit">登录</a-button>
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
import { login } from "../../api/index.js";
import { useRouter, useRoute } from "vue-router";
import { message } from "ant-design-vue";

interface FormState {
  account: string;
  password: string;
}
// import { useRouter } from 'vue-router';
// import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const formRef = ref();
    const route = useRoute();
    const router = useRouter();

    const formState: UnwrapRef<FormState> = reactive({
      account: "",
      password: "",
    });
    const rules = {
      account: [
        {
          required: true,
          message: "请输入账号",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
      ],
    };
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(async () => {
          try {
            const resp = await login({ ...formState });
            console.log("resp", resp);
            const { code } = resp;
            if (code === 0) {
              const { data = {} } = resp;
              if (data.token) {
                message.success("登录成功");
                localStorage.setItem("Authorization", data.token);
                router.push("/");
              } else {
                message.warning("未返回token，登录失败");
              }
            } else {
              const { errMsg = "" } = resp;
              message.warning(errMsg);
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

    onMounted(async () => {});
    return {
      formRef,
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      formState,
      rules,
      onSubmit,
      resetForm,
    };
  },
  watch: {},
});
</script>
<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  .login-content {
    width: 400px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .login-text {
      padding: 20px 0;
      font-size: 16px;
    }
  }
}
</style>