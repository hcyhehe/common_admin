<template>
  <div class="qna">
    <el-form ref="form" label-width="80px">
      <el-form-item label="排序">
        <el-input v-model.trim="params.sort" placeholder="请输入排序" style="width:200px;" clearable></el-input>
      </el-form-item>
      <el-form-item label="问题">
        <el-input v-model.trim="params.question" placeholder="请输入问题" style="width:200px;" clearable></el-input>
      </el-form-item>
      <el-form-item label="答案">
        <el-input v-model.trim="params.answer" placeholder="请输入答案" style="width:200px;" clearable></el-input>
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
        id: '',
        question: '',
        answer: '',
        sort: '',
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
      aPost(base.questionAdd2, that.params).then(res=>{
        if(res.data.code==2000000){
          that.$message.success('提交成功');
          that.$router.push({path:'/question/list2', query:{id: that.params.id}});
        } else {
          that.$message.warning(res.data.msg);
        }
      }).catch(err=>{
        console.log(err);
      })
    },
  },
  created(){
    this.userInfo = JSON.parse(localStorage.getItem('st_userinfo'));
  },
  mounted(){
    this.params.id = this.$route.query.id;
  }
}
</script>

<style lang="scss">
.qna{
  width: 1000px;
  padding: 30px 30px;
}
</style>
