import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('dateFormat', function(value, format){
  return dayjs(value).format(format || 'YYYY-MM-DD hh:mm:ss')
});

Vue.filter('level', function(value){
  let text = '未知';
  switch(value){
    case 1: text = '市'; break;
    case 2: text = '区'; break;
    case 3: text = '镇'; break;
    case 4: text = '村'; break;
  }
  return text;
});