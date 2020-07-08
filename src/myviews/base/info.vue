<template>
  <div class="qna">
    <el-form ref="form" label-width="95px">
      <el-form-item label="项目名">
        <el-input v-model.trim="params.project_name" placeholder="请输入项目名" style="width:300px;" clearable></el-input>
      </el-form-item>
      <el-form-item label="端口">
        <el-input v-model.trim="params.port" placeholder="请输入端口" style="width:300px;" clearable></el-input>
      </el-form-item>
      <el-form-item label="后端说明">
        <el-input v-model.trim="params.bg_remark" placeholder="请输入后端说明" style="width:300px;" clearable></el-input>
      </el-form-item>
      <el-form-item label="前端说明">
        <el-input v-model.trim="params.ft_remark" placeholder="请输入前端说明" style="width:300px;" clearable></el-input>
      </el-form-item>
      <el-form-item label="Admin密钥">
        <el-input v-model.trim="params.akey" placeholder="请输入Admin密钥" style="width:300px;" clearable></el-input>
      </el-form-item>
      <el-form-item label="H5密钥">
        <el-input v-model.trim="params.hkey" placeholder="请输入H5密钥" style="width:300px;" clearable></el-input>
      </el-form-item>
      <el-form-item label="数据库名">
        <el-input v-model.trim="params.db_name" placeholder="请输入数据库名" style="width:300px;" clearable></el-input>
      </el-form-item>
      <el-form-item label="数据库账号">
        <el-input v-model.trim="params.db_user" placeholder="请输入数据库账号" style="width:300px;" clearable></el-input>
      </el-form-item>
      <el-form-item label="数据库密码">
        <el-input v-model.trim="params.db_pass" placeholder="请输入数据库密码" style="width:300px;" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
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
      params: {
        project_name: '',
        port: '',
        bg_remark: '',
        ft_remark: '',
        akey: '',
        hkey: '',
        db_name: '',
        db_user: '',
        db_pass: '',
      },
    }
  },
  methods:{
    getInfo(){
      let that = this;
      aGet(base.baseInfo).then(res=>{
        if(res.data.code==2000000){
          that.params = res.data.data;
        } else {
          that.$message.warning(res.data.msg);
        }
      }).catch(err=>{
        console.log(err);
      });
    },

    onSubmit(){
      let that = this;
      aPost(base.baseEdit, that.params).then(res=>{
        if(res.data.code==2000000){
          that.$message.success('编辑成功');
        } else {
          that.$message.warning(res.data.msg);
        }
      }).catch(err=>{
        console.log(err);
      });
    },
  },
  created(){
    this.userInfo = JSON.parse(localStorage.getItem('st_userinfo'));
  },
  mounted(){
    this.getInfo();
  }
}
</script>

<style lang="scss">
.qna{
  width: 1000px;
  padding: 30px 30px;
}
</style>
