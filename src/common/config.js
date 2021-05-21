let config = {
  // 户籍
  domicile: {
    identity_number: "110000197905100002",
    domicile_name: "张三",
    domicile_type: "农业",
    domicile_number: "",
    domicile_address: "北京市大兴区青云店镇东店村001号"
  },
  // 个人信息
  census: {
    rapport: "兄弟",
    census_name: "张四",
    card_number: "110000198105120003",
    sex: "男",
    birthday: "19810512",
    census_domicile_type: "本市农业",//户籍性质
    work_register: "否",//是否就业登记
    phone_number: "11111111113",
    census_identity: "无",//特殊身份
    education: "本科",//学历
    profession: "计算机",//专业
    nation: "汉族",//民族
    political_status: "党员",//政治面貌
    marriage_status: "未婚",//婚姻状态
    health_status: "健康或良好",//健康状态
    handicap_level: "无",//伤残等级
    allowance_status: "否",//是否低保
    domicile_city: "北京市",//户籍市
    domicile_area: "大兴区",//户籍区
    domicile_town: "青石店镇",//户籍镇
    domicile_village: "东孙村",//户籍村
    domicile_address: [],
    census_city: "北京市",//居住市
    census_area: "大兴区",//居住区
    census_town: "青石店镇",//居住镇
    census_village: "东孙村",//居住村
    census_address: [],
    house_number: "001"//门牌号
  },
  // 工作
  work: {
    work_status: "无就业需求",//就业状态
    work_desc: "",//说明
    company_name: "QL",//就业单位全称
    company_address: "北京大兴",//就业单位地址
    work_type: "民工",//职业工种
    work_shape: "全日制",//用工性质
    company_type: "企业",//单位性质
    company_industry: "三产",//单位产业
    start_time: "2021-10-31",//劳务合同开始时间
    end_time: "2022-12-31",//劳务合同结束时间
    start_end_time: [],
    contact_person: "小A",//单位联系人
    company_number: "111",//联系方式
    is_charitable: "否",//是否公益性质
    work_configs: "{}", //work_status为自主创时
    accord: {
      name: "",
      address: "",
      address_desc: "",
      address_array: [],
      desc: "",
      type: "",
      number: ""
    }
  },
  // 社保
  social: {
    identity_type: "超龄人员",//人员身份
    social_one: "城乡基本养老",//社保信息（一）
    social_two: "无",//社保信息（二）
    is_rest: "否",//是否退休
    social_desc: "在职职工退休"//退休描述
  },
  // 求职和培训，，，求职和培训相互冲突
  job: {
    hunting: "是",
    hunting_list: [
      {
        job_position: "金融民工",//求职岗位
        job_salary: "5000-7000",//薪资要求
        job_area: "北京市大兴区",//就业区域
      }
    ],
    skill: '是',
    skill_list: [
      {
        skill_name: "英语",//技能名称
        skill_level: "四"//技能等级
      }
    ]
  },
  // 系统
  record: {
    // employment_number: "10010001",//转移就业证号
    // employment_status: "无业求职",//系统状态
    // employment_time: "2021-04-10",//查询时间
    // unemployment_number: "30010001",//就失业等级证号
    // unemployment_status: "失业",//系统状态
    // unemployment_time: "2021-03-20"//查询时间

    employment_number: "",//转移就业证号
    employment_status: "",//系统状态
    employment_time: "",//查询时间
    unemployment_number: "",//就失业等级证号
    unemployment_status: "",//系统状态
    unemployment_time: ""//查询时间
  }
}

module.exports = config