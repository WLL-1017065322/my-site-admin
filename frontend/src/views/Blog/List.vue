<template>
  <div class="search-content">
    <a-form :model="formState">
      <a-row>
        <a-col :span="6">
          <a-form-item label="Field A">
            <a-input
              v-model:value="formState.fieldA"
              placeholder="input placeholder"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <div class="search">
        <a-button>搜索</a-button>
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
        <a-button style="margin-right: 5px" @click="modify">修改</a-button>
        <a-popconfirm title="Sure to delete?" @confirm="onDelete(record.key)">
          <a-button danger>删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
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
} from "vue";
import { useRouter } from "vue-router";

import { queryBlogList } from "../../api/index.js";
// import { useStore } from 'vuex'
const columns = [
  { title: "title", dataIndex: "title" },
  { title: "Name", dataIndex: "name" },
  { title: "Age", dataIndex: "age" },
  { title: "Address", dataIndex: "address" },
  {
    title: "operation",
    dataIndex: "address",
    slots: { customRender: "operation" },
  },
];
// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sidney No. 1 Lake Park",
//   },
//   {
//     key: "4",
//     name: "Ben Kang",
//     age: 15,
//     address: "Sidney No. 1 Lake Park",
//   },
// ];
interface FormState {
  fieldA: string;
  fieldB: string;
}
interface Test {
  data: string[];
}
export default {
  components: {},
  setup() {
    const router = useRouter();
    // const store = useStore();
    const formState: UnwrapRef<FormState> = reactive({
      fieldA: "",
      fieldB: "",
    });
    // const data= reactive<Test>({data:[]})
    const modify = () => {
      router.push("/blog/detail");
    };

    const obj = reactive({
      data:[]
    })
      onMounted(async () => {
      let resp = await queryBlogList();
      obj.data = [...resp];
    });
    // let data = ref([]);
    // // let data = ref([]);
    // onMounted(async () => {
    //   let resp = await queryBlogList();
    //   data.value = [...resp];
    // });

    return {
      ...toRefs(obj),
      columns,
      formState,
      modify,
    };
  },
};
</script>
<style lang="less" scoped>
</style>