<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input placeholder="订单编号" v-model.trim="params.order_id" style="width: 250px;" class="filter-item" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="search">搜索</el-button> -->
      <el-button v-waves class="filter-item" type="primary" icon="" @click="add">添加</el-button>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit stripe highlight-current-row 
      style="width: 100%;">
      <el-table-column label="排序" width="" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sort }}</span>
        </template>
      </el-table-column>
      <el-table-column label="模块名" align="center" width="">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图标" width="" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.icon }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time | t }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="220" class-name="small-padding fixed-width geLiBtn">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="remove(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="params.pages" :limit.sync="params.limit" @pagination="getList" />
    
  </div>
</template>

<script>
import waves from '@/directive/waves' //波纹效果
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import base from '@/js/global'
import { aGet, aPost } from '@/js/request'
import moment from 'moment'
import $ from 'jquery'

export default {
  components: { Pagination },
  directives: { waves },
  filters: {
    t(str){
      if(str){  
        return moment(str).format('YYYY-MM-DD HH:mm');
      } else {
        return '';
      }
    },
    s(int){
      if(int==1) return '已锁定';
      if(int==2) return '已失效';
      if(int==3) return '成功办理';
      if(int==4) return '已完成';
      if(int==5) return '已取消';
    },
  },
  data(){
    return {
      userInfo: {},
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      params: {
        pages: 1,
        limit: 10,
        order_id: '',
        username: '',
      },
      idArr: [],
      link: '',
      linkName: '',
    }
  },
  methods:{
    add(){
      this.$router.push({path:'/genecode/add'});
    },
    
    getList(){
      let that = this;
      aGet(base.genecodeList, this.params).then(res=>{
        console.log('genecodeList', res.data);
        that.list = res.data.data;
        that.total = res.data.count;
        that.listLoading = false;
      }).catch(err=>{
        that.listLoading = false;
        console.log(err);
      })
    },

    edit(id){
      this.$router.push({path:'/genecode/edit', query:{id} });
    },

    remove(id){
      let that = this;
      this.$confirm('确定删除此条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        aPost(base.genecodeDel, {id}).then(res=>{
          console.log('genecodeDel', res.data);
          if(res.data.code == 2000000){
            that.$message.success('删除成功');
            that.getList();
          } else {
            that.$message.warning(res.data.msg);
          }
        }).catch(err => {
          console.log(err);
        });
      }).catch(() => {});
    },

  },

  created(){
    this.userInfo = JSON.parse(localStorage.getItem('st_userinfo'));
  },

  mounted(){
    this.getList();
  }
}
</script>

<style lang="scss">
.qnImg{
  width: 30px;
}
.geLiBtn{
  .small-padding .cell{
    display: flex;
  }
}
</style>
