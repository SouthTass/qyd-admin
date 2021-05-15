let approve = {
  //户籍
  "domicile": {
    "identity_number": "",
    "domicile_name": "",
    "domicile_type": "",
    "domicile_address": ""
  },
  //个人信息
  "census": {
    "rapport": "",
    "census_name": "",
    "card_number": "",
    "sex": "",
    "birthday": "",
    "census_domicile_type": "", //户籍性质
    "work_register": "", //是否就业登记
    "phone_number": "",
    "census_identity": "", //特殊身份
    "education": "", //学历
    "profession": "", //专业
    "nation": "", //民族
    "political_status": "", //政治面貌
    "marriage_status": "", //婚姻状态
    "health_status": "", //健康状态
    "handicap_level": "", //伤残等级
    "allowance_status": "", //是否低保
    "domicile_city": "", //户籍市
    "domicile_area": "", //户籍区
    "domicile_town": "", //户籍镇
    "domicile_village": "", //户籍村
    "census_city": "", //居住市
    "census_area": "", //居住区
    "census_town": "", //居住镇
    "census_village": "", //居住村
    "house_number": "" //门牌号
  },
  //工作
  "work": {
    "work_status": "", //就业状态
    "work_desc": "", //说明
    "company_name": "", //就业单位全称
    "company_address": "", //就业单位地址
    "work_type": "", //职业工种
    "work_shape": "", //用工性质
    "company_type": "", //单位性质
    "company_industry": "", //单位产业
    "start_time": "", //劳务合同开始时间
    "end_time": "", //劳务合同结束时间
    "contact_person": "", //单位联系人
    "company_number": "", //联系方式
    "is_charitable": "", //是否公益性质
    "accord": {
      "name": "",
      "address": "",
      "address_desc": "",
      "address_array": [],
      "desc": "",
      "type": "",
      "number": ""
    }
  },
  //社保
  "social": {
    "identity_type": "", //人员身份
    "social_one": "", //社保信息（一）
    "social_two": "", //社保信息（二）
    "is_rest": "", //是否退休
    "social_desc": "" //退休描述
  },
  //求职和培训，，，求职和培训相互冲突
  "job": {
    "hunting": "",
    "hunting_list": [
      {
        "job_position": "",//求职岗位
        "job_salary": "",//薪资要求
        "job_area": "",//就业区域
      }
    ],
    "skill": '',
    "skill_list": [
      {
        "skill_name": "",//技能名称
        "skill_level": ""//技能等级
      }
    ]
  },
  //系统
  "record": {
    "employment_number": "", //转移就业证号
    "employment_status": "", //系统状态
    "employment_time": "", //查询时间
    "unemployment_number": "", //就失业等级证号
    "unemployment_status": "", //系统状态
    "unemployment_time": "" //查询时间
  }
}

module.exports = approve