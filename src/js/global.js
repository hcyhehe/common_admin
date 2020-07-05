const erp = erp || {};

erp.API_SECRET_KEY = 'commonApi88.admin';
erp.gaodeKey = '35982f18ea3de896092a670f25a11537';

const url = 'http://localhost:8088/common_api';

const bg = url + '/bg';

erp.upload = bg + '/upload';

erp.login = bg + '/login';

erp.adminList = bg + '/admin/list';
erp.adminAdd = bg + '/admin/add';
erp.adminMod = bg + '/admin/modify';
erp.adminDel = bg + '/admin/remove';

erp.userList = bg + '/user/list';

erp.questionList = bg + '/question/list';
erp.questionAdd = bg + '/question/add';
erp.questionInfo = bg + '/question/info';
erp.questionEdit = bg + '/question/edit';
erp.questionDel = bg + '/question/del';

erp.orderList = bg + '/order/list';

erp.genecodeAdd = bg + '/genecode/add';
erp.genecodeList = bg + '/genecode/list';
erp.genecodeInfo = bg + '/genecode/info';
erp.genecodeEdit = bg + '/genecode/edit';
erp.genecodeDel = bg + '/genecode/del';


export default erp;
