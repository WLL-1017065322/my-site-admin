<template>
  <div class="search-content">
    <a-form :model="formState">
      <a-row>
        <a-col :span="6">
          <a-form-item label="_id">
            <a-input v-model:value="formState._id" placeholder="请输入id" />
          </a-form-item>
        </a-col>
      </a-row>
      <div class="search">
        <a-button type="primary" @click="query">搜索</a-button>
        <a-button type="primary" @click="add" style="margin-left: 10px"
          >新建</a-button
        >
      </div>
    </a-form>
  </div>
  <div class="content">
    <a-table
      :rowKey="(record) => record"
      class="ant-table-striped"
      size="middle"
      :columns="columns"
      :data-source="data"
      :rowClassName="
        (record, index) => (index % 2 === 1 ? 'table-striped' : null)
      "
    >
      <template #operation="{ record }">
        <a-button type="primary" @click="modify(record)">修改</a-button>
        <a-button
          type="danger"
          @click="del(record._id)"
          style="margin-left: 10px"
          >删除</a-button
        >
      </template>
    </a-table>
  </div>

  <a-modal
    v-model:visible="showModal"
    :title="isAdd ? '新增' : '修改'"
    @ok="handleOk"
  >
    <a-form ref="modifyRef" :model="typeState" :rules="typeRules">
      <a-form-item label="分类" name="type">
        <a-input v-model:value="typeState.type" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
import { reactive, onMounted, computed, toRefs, UnwrapRef, ref } from "vue";
import { queryTypeList, delType, modifyType, addType } from "../../api/index";
import { message } from "ant-design-vue";
// import { useRouter } from 'vue-router';
// import { useStore } from 'vuex'
const columns = [
  { title: "_id", dataIndex: "_id", width: 500 },
  { title: "分类", dataIndex: "type" },
  { title: "操作", slots: { customRender: "operation" }, width: 200 },
];
interface FormState {
  _id: string;
  type: string;
}
export default {
  components: {},
  setup() {
    // const router = useRouter();
    // const store = useStore();
    const formState: UnwrapRef<FormState> = reactive({
      _id: "",
      type: "",
    });
    let data = ref([]);
    const query = async () => {
      try {
        const resp = await queryTypeList({ _id: formState._id });
        const { code } = resp;
        if (code === 0) {
          data.value = resp.data;
        } else {
          data.value = [];
          message.warning(resp.errMsg);
        }
      } catch (error) {
        console.log(error);
        message.error(error);
      }
    };
    let showModal = ref(false);
    let isAdd = ref(true);
    const add = () => {
      typeState.type = "";
      showModal.value = true;
      isAdd.value = true;
    };
    const modify = (record) => {
      showModal.value = true;
      isAdd.value = false;
      typeState = Object.assign(typeState, record);
    };

    const del = async (_id) => {
      try {
        const resp = await delType({ _id });
        const { code } = resp;
        if (code === 0) {
          message.success("删除成功");
          query();
        } else {
          message.warning(resp.errMsg);
        }
      } catch (error) {
        console.log(error);
        message.error(error);
      }
    };

    let typeRules = ref({});
    let typeState = reactive({
      type: "",
    });
    const handleOk = async () => {
      if (isAdd.value) {
        console.log("typeState", typeState, { ...typeState });
        const resp = await addType({ ...typeState });
        console.log("addresp", resp);
        const { code } = resp;
        if (code === 0) {
          message.success("新增成功");
          showModal.value = false;
          typeState.type = "";
          query();
        }
        try {
        } catch (error) {
          console.log(error);
          message.error(error);
        }
      } else {
        const resp = await modifyType({ ...typeState });
        console.log("modifyresp", resp);
        const { code } = resp;
        if (code === 0) {
          message.success("修改成功");
          showModal.value = false;
          typeState.type = "";
          query();
        }
        try {
        } catch (error) {
          console.log(error);
          message.error(error);
        }
      }
    };

    return {
      add,
      modify,
      del,
      query,
      handleOk,

      data,
      showModal,
      isAdd,
      columns,
      formState,
      typeRules,
      typeState,
    };
  },
};
</script>
<style lang="less" scoped>
</style>