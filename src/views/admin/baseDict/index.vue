<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="姓名或账户" v-model="listQuery.name"> </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" v-if="baseDictManager_btn_add" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="id" width="65">
      <template scope="scope">
        <span>{{scope.row.id}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="编码">
      <template scope="scope">
        <span>{{scope.row.code}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="值">
      <template scope="scope">
        <span>{{scope.row.value}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="权重">
      <template scope="scope">
        <span>{{scope.row.sort}}</span>
      </template>
    </el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="150"> <template scope="scope">
        <el-button v-if="baseDictManager_btn_edit" size="small" type="success" @click="handleUpdate(scope.row)">编辑
        </el-button>
        <el-button v-if="baseDictManager_btn_del" size="small" type="danger" @click="handleDelete(scope.row)">删除
        </el-button>
      </template> </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="编码" prop="code">
      <el-input v-model="form.code" placeholder="请输入编码"></el-input>
    </el-form-item>
        <el-form-item label="值" prop="value">
      <el-input v-model="form.value" placeholder="请输入值"></el-input>
    </el-form-item>
        <el-form-item label="权重" prop="sort">
      <el-input v-model="form.sort" placeholder="请输入权重"></el-input>
    </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
      page,
      addObj,
      getObj,
      delObj,
      putObj
  } from 'api/admin/baseDict/index';
  import { mapGetters } from 'vuex';
  export default {
    name: 'baseDict',
    data() {
      return {
        form: {
        code : undefined,        value : undefined,        sort : undefined          },
        rules: {
    code: [
  {
    required: true,
    message: '请输入编码',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
],   value: [
  {
    required: true,
    message: '请输入值',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
],   sort: [
  {
    required: true,
    message: '请输入权重',
    trigger: 'blur'
  },
  {
    min: 3,
    max: 20,
    message: '长度在 3 到 20 个字符',
    trigger: 'blur'
  }
]        },
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          name: undefined
        },
        dialogFormVisible: false,
        dialogStatus: '',
        baseDictManager_btn_edit: false,
        baseDictManager_btn_del: false,
        baseDictManager_btn_add: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0
      }
    },
    created() {
      this.getList();
      this.baseDictManager_btn_edit = this.elements['baseDictManager:btn_edit'];
      this.baseDictManager_btn_del = this.elements['baseDictManager:btn_del'];
      this.baseDictManager_btn_add = this.elements['baseDictManager:btn_add'];
    },
    computed: {
      ...mapGetters([
        'elements'
      ])
    },
    methods: {
      getList() {
        this.listLoading = true;
        page(this.listQuery)
            .then(response => {
          this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      })
      },
      handleFilter() {
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      handleCreate() {
        this.resetTemp();
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
      },
      handleUpdate(row) {
        getObj(row.id)
            .then(response => {
          this.form = response.data;
        this.dialogFormVisible = true;
        this.dialogStatus = 'update';
      });
      },
      handleDelete(row) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(() => {
          delObj(row.id)
      .then(() => {
          this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        });
        const index = this.list.indexOf(row);
        this.list.splice(index, 1);
      });
      });
      },
      create(formName) {
        const set = this.$refs;
        set[formName].validate(valid => {
        if (valid) {
        addObj(this.form)
        .then(() => {
        this.dialogFormVisible = false;
        this.getList();
        this.$notify({
        title: '成功',
        message: '创建成功',
        type: 'success',
        duration: 2000
        });
        })
        } else {
        return false;
        }
        });
      },
      cancel(formName) {
        this.dialogFormVisible = false;
        const set = this.$refs;
        set[formName].resetFields();
      },
      update(formName) {
        const set = this.$refs;
        set[formName].validate(valid => {
        if (valid) {
        this.dialogFormVisible = false;
        this.form.password = undefined;
        putObj(this.form.id, this.form).then(() => {
        this.dialogFormVisible = false;
        this.getList();
        this.$notify({
        title: '成功',
        message: '创建成功',
        type: 'success',
        duration: 2000
        });
        });
        } else {
        return false;
        }
        });
      },
      resetTemp() {
        this.form = {
          username: undefined,
          name: undefined,
          sex: '男',
          password: undefined,
          description: undefined
        };
      }
    }
  }
</script>
