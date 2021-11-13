<template>
  <div class="search-content">
    <a-form :model="formState">
      <a-row>
        <a-col :span="6">
          <a-form-item label="id">
            <a-input
              v-model:value="formState._id"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <div class="search">
        <a-button @click="search">搜索</a-button>
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
        <a-popconfirm title="Sure to delete?" @confirm="onDelete(record._id)">
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
import { message } from 'ant-design-vue';
// import { useStore } from 'vuex'
const columns = [
  { title: "_id", dataIndex: "_id" },
  { title: "标题", dataIndex: "title" },
  { title: "标签", dataIndex: "tags" },
  { title: "作者", dataIndex: "author" },
  {
    title: "操作",
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
  _id: string;
  title: string;
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
      _id: null,
      title: null
    });
    // const data= reactive<Test>({data:[]})
    const modify = () => {
      router.push("/blog/detail");
    };


    const obj = reactive({
      data: [],
    });

    const search = async () => {
      const resp = await queryBlogList({...formState});
      const { code, errMsg = '', data = [] } = resp;
      if (code === 0) {
        obj.data = [].concat(data);
      } else {
        message.warn(errMsg);
        console.log(message);
      }
    };
    
    const onDelete = async (_id) =>{
      const resp = await delBlog({_id});
      const { code, errMsg = '', data = [] } = resp;
      if (code === 0) {
        message.success('删除成功')
        search()
      } else {
        message.warn(errMsg);
        console.log(message);
      }
    }
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
      modify,
      search,
      onDelete,
    };
  },
});
</script>
<style lang="less" scoped>
</style>