<template>
  <div class="qna">
    <el-form ref="form" label-width="80px">
      <el-form-item label="排序">
        <el-input v-model.trim="params.sort" placeholder="请输入排序" style="width:200px;" clearable></el-input>
      </el-form-item>
      <el-form-item label="问题分类">
        <el-input v-model.trim="params.name" placeholder="请输入问题分类" style="width:200px;" clearable></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="upload-demo"
          :limit="limit"
          :action="upload"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :on-success="handleSuccess"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
        </el-upload>
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
        sort: '',
        name: '',
        icon: '',
      },
      upload: base.upload,
      fileList: [],
      limit: 1,
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
      if(!judgeNum1(this.params.sort)){
        return this.$message.warning('排序不是非负整数');
      }
      aPost(base.questionAdd, that.params).then(res=>{
        if(res.data.code==2000000){
          that.$message.success('提交成功');
          that.$router.push({path:'/question/list'});
        } else {
          that.$message.warning(res.data.msg);
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    handleRemove(file, fileList){
      this.params.icon = '';
    },
    handleExceed(file, fileList){
      this.$message.warning('只能上传一张图片，请删除后再重新上传');
    },
    handleSuccess(res, file, fileList){
      this.params.icon = res.fileurl;
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
