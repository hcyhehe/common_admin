<template>
  <div class="genecode">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-circle-plus-outline" @click="addLine">添加</el-button>
    </div>

    <el-form class="elForm bb" :inline="true" label-width="80px">
      <el-form-item label="数据表名:">
        <el-input v-model="tableName" placeholder="数据表名" />
      </el-form-item>
      <el-form-item class="geInput2" label="排序:">
        <el-input v-model="sort" placeholder="排序" />
      </el-form-item>
    </el-form>

    <el-form v-for="(obj,index) in data" :key="obj+index">
      <el-form class="elForm" :inline="true" label-width="65px">
        <el-form-item class="geTitle" label="后端"></el-form-item>
        <el-form-item label="字段名:">
          <el-input class="geInput" v-model="obj.name" placeholder="字段名" />
        </el-form-item>
        <el-form-item label="类型:">
          <el-select class="geInput" v-model="obj.type" placeholder="请选择">
            <el-option v-for="(obj,index) in bgOptions" :key="obj+index" :label="obj.label" :value="obj.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="长度:">
          <el-input class="geInput2" v-model="obj.length" placeholder="长度" />
        </el-form-item>
        <el-form-item label="小数点:">
          <el-input class="geInput2" v-model="obj.decimal" placeholder="小数点" />
        </el-form-item>
        <el-form-item label="为空:">
          <el-checkbox v-model="obj.isNull"></el-checkbox>
        </el-form-item>
        <el-form-item label="默认值:">
          <el-input class="geInput2" v-model="obj.default" placeholder="默认值" />
        </el-form-item>
        <el-form-item label="主键:">
          <el-checkbox v-model="obj.mkey"></el-checkbox>
        </el-form-item>
        <el-form-item label="自增:">
          <el-checkbox v-model="obj.autoIncre"></el-checkbox>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input class="geInput" v-model="obj.remark" placeholder="备注" />
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="del(index)">删除</el-button>
        </el-form-item>
      </el-form>

      <el-form class="elForm bb" :inline="true" label-width="65px">
        <el-form-item class="geTitle" label="前端"></el-form-item>
        <el-form-item label="搜索项:">
          <el-checkbox v-model="obj.isSearch"></el-checkbox>
        </el-form-item>
        <el-form-item label="类型:">
          <el-select class="geInput3" v-model="obj.ftType" placeholder="请选择">
            <el-option v-for="(obj,index) in ftOptions" :key="obj+index" :label="obj.label" :value="obj.value"></el-option>
          </el-select>
          <el-form-item label="排序:">
            <el-checkbox v-model="obj.ftSort"></el-checkbox>
          </el-form-item>
          <el-form-item label="升降:">
            <el-select class="geInput" v-model="obj.upDown" placeholder="请选择">
              <el-option v-for="(obj,index) in udOptions" :key="obj+index" :label="obj.label" :value="obj.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
      </el-form>

    </el-form>

    <div class="filter-container submit">
      <el-button class="filter-item" type="primary" icon="el-icon-upload" @click="onSubmit">提交</el-button>
    </div>
    
  </div>
</template>

<script>
import base from '@/js/global'
import { aGet, aPost } from '@/js/request'
import { judgeNum1 } from '@/js/fun'
import moment from 'moment'


export default {
  data(){
    return {
      userInfo: {},
      tableName: '',
      sort: '',
      data:[
        {
          name:'', type:'', length:'', decimal:'', isNull:false, default:'', mkey:false, autoIncre:false, remark:'',
          isSearch: false, ftType: '', ftSort: false, upDown: '',
        }
      ],
      bgOptions:[
        { label: 'int', value: 'int' },
        { label: 'smallint', value: 'smallint' },
        { label: 'varchar', value: 'varchar' },
        { label: 'text', value: 'text' },
        { label: 'decimal', value: 'decimal' },
        { label: 'datetime', value: 'datetime' },
      ],
      ftOptions:[
        { label: 'input输入框', value: 1 },
        { label: 'select选择框', value: 2 },
        { label: 'textarea文本框', value: 3 },
        { label: '富文本框', value: 4 },
        { label: '图片上传', value: 5 },
        { label: '日期', value: 6 },
        { label: '时间', value: 7 },
        { label: '日期时间', value: 8 },
      ],
      udOptions: [
        { label: 'desc', value: 1 },
        { label: 'asc', value: 2 },
      ],
    }
  },
  methods:{
    addLine(){
      const obj = {
        name:'', type:'', length:'', decimal:'', isNull:false, default:'', mkey:false, autoIncre:false, remark:'',
        isSearch: false, ftType: '', ftSort: false, upDown: '',
      }
      this.data.push(obj);
    },

    del(index){
      this.data.splice(index, 1);
    },

    onSubmit(){
      let that = this;
      console.log('this.data', JSON.stringify(this.data));

      // aPost(base.questionAdd, that.params).then(res=>{
      //   if(res.data.code==2000000){
      //     that.$message.success('提交成功');
      //     that.$router.push({path:'/question/list'});
      //   } else {
      //     that.$message.warning(res.data.msg);
      //   }
      // }).catch(err=>{
      //   console.log(err);
      // });
    },

  },

  created(){
    this.userInfo = JSON.parse(localStorage.getItem('st_userinfo'));
  },

  mounted(){
    
  }
}
</script>

<style lang="scss">
.genecode{
  padding: 30px 30px;
  .elForm{
    padding-top: 13px;
    .geTitle{
      .el-form-item__label{
        font-size: 15px;
        font-weight: 600;
        color: #333;
      }
    }
  }
  .bb{
    border-bottom: 1px solid #ddd;
  }
  .geInput{
    input{ width: 130px; }
  }
  .geInput2{
    input{ width: 80px; }
  }
  .geInput3{
    input{ width: 160px; }
  }
  .el-input-number--medium{
    width: 130px;
  }
  .submit{
    margin-top: 20px;
  }
}
</style>
