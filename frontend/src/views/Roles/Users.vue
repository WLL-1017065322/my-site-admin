<template>
  <div>
    <div class="search-content">
      <a-form :model="formState">
        <a-row>
          <a-col :span="6">
            <a-form-item label="id">
              <a-input v-model:value="formState._id" />
            </a-form-item>
          </a-col>
        </a-row>
        <div class="search">
          <a-button @click="search">搜索</a-button>
          <a-button @click="addUser" style="margin-left: 10px">新增</a-button>
        </div>
      </a-form>
    </div>
    <div class="content">
      <a-table
        :rowKey="(record) => record.title"
        class="ant-table-striped"
        size="middle"
        :columns="columns"
        :data-source="data"
        :rowClassName="
          (record, index) => (index % 2 === 1 ? 'table-striped' : null)
        "
      >
        <template #operation="{ record }">
          <a-button style="margin-right: 5px" @click="modify(record)"
            >修改</a-button
          >
          <a-popconfirm title="确认删除?" @confirm="onDelete(record._id)">
            <a-button danger>删除</a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </div>

    <a-modal
      v-model:visible="showModal"
      :title="isAdd ? '新增' : '修改'"
      @ok="handleOk"
    >
      <a-form ref="modifyRef" :model="modifyState" :rules="modifyRules">
        <a-form-item label="用户名" name="username">
          <a-input v-model:value="modifyState.username" />
        </a-form-item>
        <a-form-item label="手机号" name="phone">
          <a-input v-model:value="modifyState.phone" />
        </a-form-item>
        <a-form-item label="账号" name="account">
          <a-input v-model:value="modifyState.account" />
        </a-form-item>
        <a-form-item label="角色" name="role">
          <a-input v-model:value="modifyState.role" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts">
import {
  reactive,
  onMounted,
  computed,
  toRefs,
  UnwrapRef,
  isReactive,
  ref,
  defineComponent,
} from "vue";
import { useRouter } from "vue-router";

import {
  queryBlogList,
  queryBlogDetail,
  delBlog,
  modifyBlog,
  addBlog,
} from "../../api/index.js";
import { message } from "ant-design-vue";
// import { useStore } from 'vuex'
const columns = [
  { title: "_id", dataIndex: "_id" },
  { title: "姓名", dataIndex: "username" },
  { title: "手机号", dataIndex: "phone" },
  { title: "账户", dataIndex: "account" },
  { title: "角色", dataIndex: "role" },
  {
    title: "操作",
    slots: { customRender: "operation" },
  },
];
interface FormState {
  _id: string;
}
interface Test {
  data: string[];
}
export default defineComponent({
  components: {},
  setup() {
    const router = useRouter();
    // const store = useStore();
    const formState: UnwrapRef<FormState> = reactive({
      _id: "",
    });
    let modifyState = reactive({
      username: "",
      phone: "",
      account: "",
      role: "",
    });
    // const data= reactive<Test>({data:[]})
    const obj = reactive({
      data: [],
    });

    const modifyRules = ref({});

    const showModal = ref(false);
    const handleOk = () => {
      showModal.value = false;
    };

    const search = async () => {
      console.log("formState", formState);
      const resp = await queryBlogList({ ...formState });
      const { code, errMsg = "", data = [] } = resp;
      if (code === 0) {
        obj.data = [].concat(data);
      } else {
        message.warn(errMsg);
        console.log(message);
      }
    };

    const isAdd = ref(true);
    const addUser = () => {
      console.log("showModal", showModal.value);
      showModal.value = true;
      isAdd.value = true;
    };

    const modify = (record) => {
      showModal.value = true;
      isAdd.value = false;
      modifyState = { ...modifyState, ...record };
    };

    const onDelete = async (_id) => {
      const resp = await delBlog({ _id });
      const { code, errMsg = "", data = [] } = resp;
      if (code === 0) {
        message.success("删除成功");
        search();
      } else {
        message.warn(errMsg);
        console.log(message);
      }
    };
    // let data = ref([]);
    // // let data = ref([]);
    // onMounted(async () => {
    //   let resp = await queryBlogList();
    //   data.value = [...resp];
    // });
    console.log(obj);
    return {
      ...toRefs(obj),
      columns,
      formState,
      modifyState,
      modifyRules,
      search,
      addUser,
      onDelete,
      modify,
      isAdd,
      showModal,
      handleOk,
    };
  },
});
</script>
<style lang="less" scoped>
</style>