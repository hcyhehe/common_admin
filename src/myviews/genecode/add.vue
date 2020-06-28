<template>
  <div class="genecode">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-circle-plus-outline" @click="addLine">添加</el-button>
    </div>

    <el-form :inline="true" label-width="65px" v-for="(obj,index) in data" :key="obj+index">
      <el-form-item label="字段名:">
        <el-input class="geInput" v-model="obj.name" placeholder="字段名" />
      </el-form-item>
      <el-form-item label="类型:">
        <el-select class="geInput" v-model="obj.type" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
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
      data:[
        { name:'', type:'', length:'', decimal:'', isNull:false, default:'', mkey:false, autoIncre:false, remark:'' },
      ],
    }
  },
  methods:{
    addLine(){
      const obj = { name:'', type:'', length:'', decimal:'', isNull:false, default:'', mkey:false, autoIncre:false, remark:'' };
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
  .geInput{
    input{
      width: 130px;
    }
  }
  .geInput2{
    input{
      width: 80px;
    }
  }
  .el-input-number--medium{
    width: 130px;
  }
  .submit{
    margin-top: 20px;
  }
}
</style>
