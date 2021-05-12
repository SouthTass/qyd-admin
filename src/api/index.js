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
   * 查询信息列表
   */
   async censusList(){
    return _axios.get(`/api/census/list`);
  }

  /** 
   * 用户退出
   */
   async censusCreate(body){
    return _axios.post(`/api/census/create`, body);
  }
}
export default new Api();