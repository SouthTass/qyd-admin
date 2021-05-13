let config = {
  gender: ['男', '女'],
  domicileType: ['农业', '非农'],
  yesorno: ['是', '否'],
  work_status: ['无就业需求', '无业求职', '单位就业', '灵活就业', '自主创业'],
  work_none_desc: ['无劳动能力', '照顾家庭', '有其他资产收入', '在校学生', '孕期或哺乳期', '短期无需求'],
  item1:  ['全日制', '非全日制', '劳动派遣'],
  item2:  ['企业', '事业', '机关', '学校', '社区（村）', '个体'],
  item3:  ['一产', '二产', '三产'],
  item4:  ['学龄前', '在校生', '城乡劳动力', '超龄人员'],
  item5:  ['无', '城乡基本养老', '城乡基本医疗', '灵活就业三险', '在职职工社保'],
  item6:  ['城乡基本养老退休', '灵活就业', '三险退休', '在职职工退休'],
  item7:  ['3000以内', '3000至5000', '5000至7000', '7000至10000', '10000以上'],
  item8:  ['镇（街道）辖区内', '亦庄开发区', '机场地区', '区内其他地区', '区外'],
  item9:  ['无', '非等级', '初级', '中级', '高级', '技师', '高级技师'],
  item10: ['本市农业', '本市非农', '外埠农业', '外埠非农'],
  item11: ['户主', '之父', '之母', '之夫', '之妻', '之子', '之女', '兄弟', '姐妹', '儿媳', '女婿', '孙子', '孙女', '外孙', '外孙女'],
  item12: ['无', '外籍', '刑满释放', '退役军人', '随军家属', '应届毕业生'],
  item13: ['文盲或半文盲', '小学', '初中', '高中', '技工学校', '大学专科和专科学校', '本科', '研究生', '博士'],
  item14: ['汉族', '回族', '其他民族'],
  item15: ['中共党员', '中共预备党员', '共青团员', '民革会员', '其他党派', '群众'],
  item16: ['未婚', '初婚', '再婚', '丧偶'],
  item17: ['健康或良好', '一般或较弱', '有病', '有生理缺陷', '残疾'],
  item18: ['视力残疾一级盲', '视力残疾二级盲', '视力残疾一级低视力', '视力残疾二级低视力', 
    '听力残疾一级', '听力残疾二级', '听力残疾三级', '听力残疾四级', 
    '语言残疾一级', '语言残疾二级', '语言残疾三级', '语言残疾四级', 
    '智力残疾重度一级', '智力残疾重度二级', '智力残疾中度三级', '智力残疾中度四级', 
    '肢体残疾重度一级', '肢体残疾中度二级', '肢体残疾轻度三级', '肢体残疾轻度四级',
    '精神残疾重度一级', '精神残疾中度二级', '精神残疾轻度三级', '精神残疾轻度四级',
    '多重一级', '多重二级', '多重三级', '多重四级'
  ],
  

  //户籍
  domicile: {
    identity_number: "110000197905100002",
    domicile_name: "张三",
    domicile_type: "农业",
    domicile_address: "北京市大兴区青云店镇东店村001号"
  },
  //个人信息
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
  //工作
  work: {
    work_status: "单位就业",//就业状态
    work_desc: "",//说明
    company_name: "QL",//就业单位全称
    company_address: "北京大兴",//就业单位地址
    work_type: "民工",//职业工种
    work_shape: "全日制",//用工性质
    company_type: "企业",//单位性质
    company_industry: "三产",//单位产业
    start_time: "2021年1月31",//劳务合同开始时间
    end_time: "2021年12月31",//劳务合同结束时间
    start_end_time: [],
    contact_person: "小A",//单位联系人
    company_number: "111",//联系方式
    is_charitable: "否",//是否公益性质
    accord: {
      name: "",
      address: "",
      address_desc: "",
      desc: "",
      type: "",
      number: ""
    }
  },
  //社保
  social: {
    identity_type: "超龄人员",//人员身份
    social_one: "城乡基本养老",//社保信息（一）
    social_two: "无",//社保信息（二）
    is_rest: "否",//是否退休
    social_desc: "在职职工退休"//退休描述
  },
  //求职和培训，，，求职和培训相互冲突
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
  //系统
  record: {
    employment_number: "10010001",//转移就业证号
    employment_status: "无业求职",//系统状态
    employment_time: "2021-04-10",//查询时间
    unemployment_number: "30010001",//就失业等级证号
    unemployment_status: "失业",//系统状态
    unemployment_time: "2021-03-20"//查询时间
  }
}

module.exports = config