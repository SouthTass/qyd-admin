import axios from "axios"
const _axios = axios.create({ timeout: 30000 });
import { Message } from 'element-ui'

class Api {
  constructor() {
    _axios.interceptors.request.use(req => {
      return req;
    }, err => {
      return err;
    });
    _axios.interceptors.response.use(res => {
      if(res.data.status == 0){
        return res.data
      }else{
        Message.error(res.data.message)
      }
      return res
    }, err => {
      return res;
    });
  }

  /** 
   * 用户登录
   * @param {string} account        用户名
   * @param {string} password       密码
   */
  async userLogin(account, password){
    return _axios.post(`/api/user/login`, {
      account, password
    });
  }

  /** 
   * 用户退出
   */
  async userLogout(){
    return _axios.post(`/api/user/logout`);
  }

  /** 
   * 分类列表
   * @param {string} name           分类名称
   */
   async categoryList(name){
    return _axios.get(`/api/category/list?category_names=${name}`);
  }

  /** 
   * 人员、异常、注销列表
   */
  async censusList(params){
    return _axios.get(`/api/census/list`, {params: {...params}});
  }

  /** 
   * 查询个人信息详情
   */
  async censusGet(id){
    return _axios.get(`/api/census/get?cencus_id=${id}`);
  }

  /** 
   * 查询个人变更记录
   */
  async censusLog(id){
    return _axios.get(`/api/census/log?census_id=${id}`);
  }

  /** 
   * 登记管理个人信息录入
   */
  async censusCreate(body){
    return _axios.post(`/api/census/create`, body);
  }

  /** 
   * 修改个人信息
   */
   async censusUpdate(body){
    return _axios.post(`/api/census/update`, body);
  }

  /** 
   * 个人信息注销
   */
  async censusDestroy(body){
    return _axios.post(`/api/census/destroy`, body);
  }

  /** 
   * 家庭查询
   */
  async domicileMemberList(params){
    return _axios.get(`/api/domicile/member/list`, {params: params});
  }

  /** 
   * 就业查询
   */
  async workList(params){
    return _axios.get(`/api/work/list`, {params: params});
  }

  /** 
   * 权限管理-账号管理-用户信息列表
   */
  async userList(){
    return _axios.get(`/api/user/list`);
  }

  /** 
   * 权限管理-账号管理-修改用户
   */
  async userSave(body){
    return _axios.post(`/api/user/save`, body);
  }

  /** 
   * 企业管理-查询所有的企业列表（搜索用）
   * @param {string} company_name                 企业名称
   */
  async companyList(params){
    return _axios.get(`/api/company/list`, {params: params});
  }

  /** 
   * 企业管理-查询所有的企业列表（搜索用）
   */
  async companyAll(){
    return _axios.get(`/api/company/all`);
  }

  /** 
   * 企业管理-企业保存/修改
   */
  async companySave(body){
    return _axios.post(`/api/company/save`, body);
  }

  /** 
   * 企业管理-企业删除
   */
  async companyRemove(body){
    return _axios.post(`/api/company/remove`, body);
  }
  
  /** 
   * 企业管理-企业员工列表
   * @param {string} company_id               企业ID
   */
  async companyMemberList(params){
    return _axios.get(`/api/company/member/list`, {params: params});
  }

  /** 
   * 企业管理-企业员工详情
   * @param {string} member_id                员工ID
   */
  async companyMemberGet(member_id){
    return _axios.get(`/api/company/member/get`, {params: {member_id: member_id}});
  }

  /** 
   * 企业管理-企业员工保存/修改
   */
  async companyMemberSave(body){
    return _axios.post(`/api/company/member/save`, body);
  }

  /** 
   * 企业管理-企业员工删除
   */
  async companyMemberRemove(body){
    return _axios.post(`/api/company/member/remove`, body);
  }

  /** 
   * 企业管理-企业招聘/培训列表
   * @param {string} company_id               企业ID
   * @param {string} type                     类型：1培训，2招聘
   */
  async companyRecruitList(params){
    return _axios.get(`/api/company/recruit/list`, {params: params});
  }

  /** 
   * 企业管理-企业招聘/培训信息修改/保存
   */
  async companyRecruitSave(body){
    return _axios.post(`/api/company/recruit/save`, body);
  }

  /** 
   * 企业管理-企业招聘/培训信息删除
   */
  async companyRecruitRemove(body){
    return _axios.post(`/api/company/recruit/remove`, body);
  }

  /** 
   * 综合查询图表
   */
  async integratedQuery(body){
    return _axios.post(`/api/integrated/query`, body);
  }

  /** 
   * 综合查询列表
   */
  async integratedList(body, params){
    return _axios.post(`/api/integrated/list`, body, {
      params: params
    });
  }
}
export default new Api();