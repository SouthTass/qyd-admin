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
   */
   async categoryList(name){
    return _axios.get(`/api/category/list?category_names=${name}`);
  }

  /** 
   * 登记管理查询信息列表
   */
  async censusList(){
    return _axios.get(`/api/census/list`);
  }

  /** 
   * 登记管理个人信息录入
   */
  async censusCreate(body){
    return _axios.post(`/api/census/create`, body);
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

  
}
export default new Api();