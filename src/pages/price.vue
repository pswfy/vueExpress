<template>
  <div class="price">
    <div class="price-header">
      <div class="price-header-left">
        <el-date-picker
          v-model="dateForm"
          type="daterange"
          range-separator="至"
          size="small"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" size="small" style="margin-left: 20px">筛选</el-button>
      </div>
      <div class="price-header-right">
        <el-button type="primary" size="small" @click="handleAdd">添加</el-button>
      </div>
    </div>
    <div class="price-table">
      <el-table
        :data="table"
        max-height="450"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          fixed="left"
          label="序号"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建时间"
          align="center"
          width=230>
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="收支类型"
          align="center"
          width=150>
        </el-table-column>
        <el-table-column
          prop="describe"
          label="收支描述"
          align="center"
          width=120>
        </el-table-column>
        <el-table-column
          prop="inCode"
          label="收入"
          align="center"
          width=80>
          <template slot-scope="scope">
            <span style="color: #00d053">{{ scope.row.inCode }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="expend"
          label="支出"
          align="center"
          width=80>
          <template slot-scope="scope">
            <span style="color: #f56767">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cash"
          label="账户现金"
          align="center"
          width=100>
          <template slot-scope="scope">
            <span style="color: #4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" prop="operation" fixed="right" width="190">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="pageAdmin.page_index"
              :page-sizes="pageAdmin.page_sizes"
              :page-size="pageAdmin.page_size"
              :layout="pageAdmin.layout"
              :total="pageAdmin.total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
      {{dateForm}}
    </div>
    <Dialog :dialog='dialog' @updateTable="getTable"></Dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import Dialog from '../components/Dialog';

  export default {
    components: {
      Dialog
    },
    data() {
      return {
        table: [],//表格数据
        allTableData: [],
        dateForm:[],//时间
        dialog: {
          show: false
        },
        pageAdmin: {
          page_index: 1,//当前位于哪也
          total: 0,
          page_size: 5,
          page_sizes: [5, 10, 15, 20],
          layout: "total, sizes, prev, pager, next, jumper"
        }
      }
    },
    created() {
      this.getTable();
    },
    methods: {
      handleEdit(index, row) {
        console.log(row);
      },
      handleDelete(index, row) {
        console.log(row);
      },
      getTable() {
        this.$axios.get('http://localhost:3000/find').then(res => {
          this.allTableData = res.data;
          //设置分页数据
          this.setPageTableData();
        });
      },
      /*添加*/
      handleAdd() {
        this.dialog.show = true;
      },
      handleSizeChange(page_size) {
        this.pageAdmin.page_index = 1;
        this.pageAdmin.page_size = page_size;
        this.table = this.allTableData.filter((item, index) => {
          return index < page_size;
        })
      },
      handleCurrentChange(page) {
        //获取当前页
        let index = this.pageAdmin.page_size * (page - 1);
        //数据总数
        let muns = this.pageAdmin.page_size * page;
        //容器
        let tables = [];
        for (let i = index; i < muns; i++) {
          if(this.allTableData[i]){
            tables.push(this.allTableData[i])
          }
        }
        this.table = tables;
      },
      setPageTableData() {
        //分页属性设置
        this.pageAdmin.total = this.allTableData.length;
        this.pageAdmin.page_index = 1;
        this.pageAdmin.page_size = 5;
        //默认分页数据
        this.table = this.allTableData.filter((item, index) => {
          return index < this.pageAdmin.page_size;
        })
      }
    }
  };
</script>

<style scoped>
  .price {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 60px;
    padding-left: 160px;
  }

  .price-header {
    box-sizing: border-box;
    margin: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .price-header-left {
    flex: 1;
    height: 40px;
    display: flex;
    align-items: center;
  }

  .price-header-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .mag {
    font-size: 14px;
    margin-right: 10px;
    color: #999999;
    font-weight: 400;
  }

  .price-table {
    box-sizing: border-box;
    margin: 10px;
  }

  .pagination {
    text-align: right;
    margin-top: 10px;
  }
</style>
