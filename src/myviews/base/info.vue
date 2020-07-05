<template>
  <div class="qna">
    <el-form ref="form" label-width="90px">
      <el-form-item label="项目名">
        <el-input v-model.trim="params.name" placeholder="请输入项目名" style="width:300px;" clearable></el-input>
      </el-form-item>
      <el-form-item label="端口">
        <el-input v-model.trim="params.port" placeholder="请输入端口" style="width:300px;" clearable></el-input>
      </el-form-item>
      <el-form-item label="Admin密钥">
        <el-input v-model.trim="params.akey" placeholder="请输入密钥" style="width:300px;" clearable></el-input>
      </el-form-item>
      <el-form-item label="H5密钥">
        <el-input v-model.trim="params.hkey" placeholder="请输入密钥" style="width:300px;" clearable></el-input>
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
        name: '',
        port: '',
        akey: '',
        hkey: '',
      },
    }
  },
  methods:{
    onSubmit(){
      let that = this;
      console.log('this.params', this.params);
      for(let i in this.params){
        if(!this.params[i]){
          return this.$message.warning('填写不完整');
        }
      }
      // aPost(base.questionAdd2, that.params).then(res=>{
      //   if(res.data.code==2000000){
      //     that.$message.success('提交成功');
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
.qna{
  width: 1000px;
  padding: 30px 30px;
}
</style>
