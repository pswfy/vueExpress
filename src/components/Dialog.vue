<template>
  <div class="dialog">
    <el-dialog title="添加资金信息" :visible.sync="dialog.show" :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="false">
      <div class="from">
        <el-form ref="from" :model="formData" :rules="from_rules" label-width="120px" style="margin: 10px;width:auto">
          <el-form-item label="收支类型:">
            <el-select v-model="formData.type" placehoder="收支类型" size="small" >
              <el-option :key="index" v-for="(fromType,index) in formatTypeList" :label="fromType" :value="fromType"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="describe" label="收支描述:">
            <el-input type="describe" v-model="formData.describe" size="small"></el-input>
          </el-form-item>
          <el-form-item prop="inCode" label="收入:">
            <el-input type="inCode" v-model="formData.inCode" size="small"></el-input>
          </el-form-item>
          <el-form-item prop="expend" label="支出:">
            <el-input type="expend" v-model="formData.expend" size="small"></el-input>
          </el-form-item>
          <el-form-item prop="cash" label="账户现金:">
            <el-input type="cash" v-model="formData.cash" size="small"></el-input>
          </el-form-item>
          <el-form-item prop="remark" label="备注:">
            <el-input type="remark" v-model="formData.remark" size="small"></el-input>
          </el-form-item>
          <el-form-item class="text-right">
            <el-button @click="dialog.show=false">取消</el-button>
            <el-button type="primary" @click="onSubmit('from')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      dialog:Object
    },
    data(){
      return{
        formData:{
          type:'',
          describe:'',
          inCode:'',
          expend:'',
          cash:'',
          remark:''
        },
        formatTypeList:[
          '体现',
          '体现手续费',
          '充值',
          '优惠券',
          '充值礼卷',
          '转账'
        ],
        from_rules:{
          describe:[
            {
              required:true,
              message:'收支描述不能为空',
              trigger:'blur'
            }
          ],
          inCode:[
            {
              required:true,
              message:'收入不能为空',
              trigger:'blur'
            }
          ],
          expend:[
            {
              required:true,
              message:'支出不能为空',
              trigger:'blur'
            }
          ],
          cash:[
            {
              required:true,
              message:'则户现金不能为空',
              trigger:'blur'
            }
          ]

        }
      }
    },
    methods:{
      onSubmit(from){
        this.$refs[from].validate(valid => {
          if(valid){
            this.$axios.post('http://localhost:3000/create',this.formData)
              .then(res=>{
                this.$message({
                  message:'数据添加成功',
                  type:'success'
                });
                this.dialog.show = false;
                this.$emit('updateTable');
              }).catch(err=>{
              this.$message({
                message:'数据不添加成功'
              });
            });
          }
        });
      }
    }
  };
</script>

<style scoped>
  .dialog{
    margin: 0;
    padding: 0;
  }
  .from{
    padding: 0;
    margin: 0;
  }
</style>
