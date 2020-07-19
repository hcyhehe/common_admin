<template>
  <div class="genecode">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-circle-plus-outline" @click="addLine">添加</el-button>
    </div>

    <el-form class="elForm bb" :inline="true" label-width="80px">
      <el-form-item label="数据表名:">
        <el-input class="geInput4" v-model="params.name" placeholder="数据表名" />
      </el-form-item>
      <el-form-item label="中文名:">
        <el-input class="geInput4" v-model="params.cname" placeholder="中文名" />
      </el-form-item>
      <el-form-item label="排序:">
        <el-input class="geInput1" v-model="params.sort" placeholder="排序" />
      </el-form-item>
      <el-form-item label="图标:">
        <el-select class="geInput4" v-model="params.icon" placeholder="请选择">
          <el-option v-for="(obj,index) in icOptions" :key="obj+index" :label="obj.label" :value="obj.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="删除:">
        <el-select class="geInput2" v-model="params.is_deleted" placeholder="请选择">
          <el-option v-for="(obj,index) in delOptions" :key="obj+index" :label="obj.label" :value="obj.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单类:">
        <el-select class="geInput2" v-model="params.is_order" placeholder="请选择">
          <el-option v-for="(obj,index) in ifOptions" :key="obj+index" :label="obj.label" :value="obj.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-form v-for="(obj,index) in data" :key="obj+index">
      <el-form class="elForm" :inline="true" label-width="65px">
        <el-form-item class="geTitle" label="后端"></el-form-item>
        <el-form-item label="字段名:">
          <el-input class="geInput4" v-model="obj.name" placeholder="字段名" />
        </el-form-item>
        <el-form-item label="类型:">
          <el-select class="geInput3" v-model="obj.type" placeholder="请选择" @change="typeChange($event, index)">
            <el-option v-for="(obj,index) in bgOptions" :key="obj+index" :label="obj.label" :value="obj.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="长度:">
          <el-input class="geInput1" v-model="obj.leng" placeholder="长度" />
        </el-form-item>
        <el-form-item label="小数点:">
          <el-input class="geInput2" v-model="obj.deci" placeholder="小数点" />
        </el-form-item>
        <el-form-item label="为空:">
          <el-select class="geInput1" v-model="obj.is_null" placeholder="请选择">
            <el-option v-for="(obj,index) in ifOptions" :key="obj+index" :label="obj.label" :value="obj.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="默认值:">
          <el-input class="geInput2" v-model="obj.default_val" placeholder="默认值" />
        </el-form-item>
        <el-form-item label="主键:">
          <el-select class="geInput1" v-model="obj.is_mkey" placeholder="请选择">
            <el-option v-for="(obj,index) in ifOptions" :key="obj+index" :label="obj.label" :value="obj.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自增:">
          <el-select class="geInput1" v-model="obj.is_autoincre" placeholder="请选择">
            <el-option v-for="(obj,index) in ifOptions" :key="obj+index" :label="obj.label" :value="obj.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序:">
          <el-select class="geInput1" v-model="obj.is_sort" placeholder="请选择">
            <el-option v-for="(obj,index) in ifOptions" :key="obj+index" :label="obj.label" :value="obj.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="升降:">
          <el-select class="geInput2" v-model="obj.up_down" placeholder="请选择">
            <el-option v-for="(obj,index) in udOptions" :key="obj+index" :label="obj.label" :value="obj.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input class="geInput4" v-model="obj.remark" placeholder="备注" />
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="del(index)">删除</el-button>
        </el-form-item>
      </el-form>

      <el-form class="elForm bb" :inline="true" label-width="65px">
        <el-form-item class="geTitle" label="前端"></el-form-item>
        <el-form-item label="搜索项:">
          <el-select class="geInput1" v-model="obj.is_search" placeholder="请选择">
            <el-option v-for="(obj,index) in ifOptions" :key="obj+index" :label="obj.label" :value="obj.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型:">
          <el-select class="geInput4" v-model="obj.ft_type" placeholder="请选择">
            <el-option v-for="(obj,index) in ftOptions" :key="obj+index" :label="obj.label" :value="obj.value"></el-option>
          </el-select>
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
      params:{
        id: '',
        name: '',
        cname: '',
        sort: '',
        icon: 'list',
        is_deleted: 1,
        is_order: 1,
      },
      data:[
        {
          name:'', type:'int', leng:'', deci:0, is_null:1, default_val:'', is_mkey:1, is_autoincre:1, 
          remark:'', is_search: 1, ft_type: 1, is_sort: 1, up_down: 'desc',
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
        { label: '非表单时间记录', value: 9 },
        { label: '其他', value: 10 },
      ],
      icOptions: [
        { label: 'list', value: 'list' },
        { label: 'peoples', value: 'peoples' },
        { label: 'people', value: 'people' },
        { label: 'tree', value: 'tree' },
        { label: 'shopping', value: 'shopping' },
        { label: 'wechat', value: 'wechat' },
        { label: 'theme', value: 'theme' },
        { label: 'chart', value: 'chart' },
        { label: 'tab', value: 'tab' },
        { label: 'table', value: 'table' },
        { label: 'money', value: 'money' },
        { label: 'example', value: 'example' },
        { label: 'excel', value: 'excel' },
        { label: 'documentation', value: 'documentation' },
      ],
      udOptions: [
        { label: 'desc', value: 'desc' },
        { label: 'asc', value: 'asc' },
      ],
      ifOptions: [
        { label: '否', value: 1 },
        { label: '是', value: 2 },
      ],
      delOptions: [
        { label: '真', value: 1 },
        { label: '假', value: 2 },
      ],
    }
  },
  methods:{
    genecodeInfo(){
      let that = this;
      aGet(base.genecodeInfo, {id:this.params.id}).then(res=>{
        console.log('genecodeInfo', res.data);
        if(res.data.code==2000000){
          let data = res.data.data;
          that.params.name = data.name;
          that.params.cname = data.cname;
          that.params.sort = data.sort;
          that.params.icon = data.icon;
          that.params.is_deleted = data.is_deleted;
          that.params.is_order = data.is_order;
          that.data = data.detail;
        } 
      }).catch(err=>{
        console.log(err);
      });
    },

    addLine(){
      const obj = {
        name:'', type:'int', leng:'', deci:0, is_null:1, default_val:'', is_mkey:1, is_autoincre:1, 
        remark:'', is_search: 1, ft_type: 1, is_sort: 1, up_down: 'desc',
      }
      this.data.push(obj);
    },

    del(index){
      this.data.splice(index, 1);
    },

    typeChange(e, index){
      if(e == 'int'){
        this.data[index].leng = 11;
        this.data[index].deci = 0;
      }
      if(e == 'smallint'){
        this.data[index].leng = 4;
        this.data[index].deci = 0;
      }
      if(e == 'varchar'){
        this.data[index].leng = null;
        this.data[index].deci = 0;
      }
      if(e == 'text'){
        this.data[index].leng = 0;
        this.data[index].deci = 0;
      }
      if(e == 'decimal'){
        this.data[index].leng = 11;
        this.data[index].deci = 2;
      }
      if(e == 'datetime'){
        this.data[index].leng = 0;
        this.data[index].deci = 0;
      }
    },

    onSubmit(){
      let that = this;
      //console.log('this.params', JSON.stringify(this.params));
      //console.log('this.data', JSON.stringify(this.data));
      if(!this.params.name){
        return this.$message.warning('请填写数据表名');
      }
      if(!this.params.cname){
        return this.$message.warning('请填写数据表中文名');
      }
      if(!this.params.sort){
        return this.$message.warning('请填写排序');
      }
      if(!this.params.icon){
        return this.$message.warning('请选择图标');
      }
      if(this.data.length==0){
        return this.$message.warning('请至少添加一行前后端参数');
      }
      for(let i=0;i<this.data.length;i++){
        if(!String(this.data[i].name) || !String(this.data[i].type) || !String(this.data[i].leng) 
          || !String(this.data[i].deci) || !String(this.data[i].ft_type) ){
          return this.$message.warning(`请检查第${i+1}行前后端参数`);
        }
      }
      this.params.data = this.data;

      aPost(base.genecodeEdit, that.params).then(res=>{
        if(res.data.code==2000000){
          that.$message.success('编辑成功');
          that.$router.push({path:'/genecode/list'});
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
    this.params.id = this.$route.query.id;
  },

  mounted(){
    this.genecodeInfo();
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
    .icon{
      font-size: 18px;
      margin-left: 10px;
    }
  }
  .bb{
    border-bottom: 1px solid #ddd;
  }
  .geInput1{
    input{ width: 70px; }
  }
  .geInput2{
    input{ width: 100px; }
  }
  .geInput3{
    input{ width: 120px; }
  }
  .geInput4{
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
