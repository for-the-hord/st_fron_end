/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"')
    .replace(/\+/g, ' ') +
    '"}'
  )
}

//判断车辆类型
export function vehicleTypeFun(type) {
  let name = ''
  switch (type) {
    case '1':
      name = '重型特殊结构货车'
      break;
    case '2':
      name = '混凝土搅拌运输车'
      break;
    case '3':
      name = '干混砂浆运输车'
      break;
    case '4':
      name = '散装水泥运输车'
      break;
    case '5':
      name = '小轿车'
      break;
    case '6':
      name = '面包车'
      break;
    case '7':
      name = '混凝土泵车'
      break;
    case '8':
      name = '渣土车'
      break;
    case '9':
      name = '其他'
      break;
    default:
      name = '--'
  }
  return name
}
//格式化传递参数
export function formatParams(data) {
  let obj = {};
  for (const key in data) {
    if (Array.isArray(data[key]) && data[key].length > 0) {
      obj[key] = data[key].slice();
    } else if (data[key] || data[key] === 0) {
      obj[key] = data[key];
    }
  }
  return obj;
}
//身份证号校验
export const checkIdNumberValid=(tex)=>{
  var tip = '输入的身份证号有误！';
  var num = tex;
  num = num.toUpperCase();
  var len, re;
  len = num.length;
  if(len == 0) return true;

  //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
  if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))){
      return false;
  }

  //验证前两位地区是否有效
  var aCity= {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",
      32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",
      44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",
      62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}

  if(aCity[parseInt(num.substr(0,2))] == null){
      return false;
  }

  //当身份证为15位时的验证出生日期。
  if (len == 15){
      re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
      var arrSplit = num.match(re);

      //检查生日日期是否正确
      var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
      var bGoodDay;
      bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
      if (!bGoodDay){
          return false;
      }
  }

  //当身份证号为18位时，校验出生日期和校验位。
  if (len == 18){
      re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
      var arrSplit = num.match(re);
      //检查生日日期是否正确
      var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
      var bGoodDay;
      bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
      if (!bGoodDay){
          return false;
      }
      else{
          //检验18位身份证的校验码是否正确。
          //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
          var valnum;
          var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
          var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
          var nTemp = 0, i;
          for(i = 0; i < 17; i ++){
              nTemp += num.substr(i, 1) * arrInt[i];
          }
          valnum = arrCh[nTemp % 11];
          if (valnum != num.substr(17, 1)){
              return false;
          }
      }
  }
  return true;
}
// 今日时间和七天前
  export function todayTimeArr(flag){
    var dd = new Date();
            dd.setDate(dd.getDate() -flag);//获取p_count天前的日期
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1;//获取当前月份的日期
            if( m <10){
                m = '0'+m;
            }
            var d = dd.getDate();
            if( d <10){
                d = '0'+d;
            }
            return y + "-" + m + "-" + d;
  }
  //本地保存图片
  export function getBase64Images(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var context = canvas.getContext("2d");
    context.drawImage(img, 0, 0, img.width, img.height);
    var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
    return url;
  }
  export function downImage(imgsrc, name) {
    var eleLink = document.createElement('a');
    eleLink.download = name;
    eleLink.style.display = 'none';
    var image = new Image();
    image.setAttribute("crossOrigin", "anonymous");
    image.src = imgsrc + '?v=' + Math.random();
    // image.crossOrigin("*");
    image.onload = function () {
      var base64 = getBase64Images(image);
      eleLink.href = base64;
      document.body.appendChild(eleLink);
      eleLink.click();
      document.body.removeChild(eleLink);
    };
  }

  //  let loading;
// export  function startLoading() {
//     loading = ElementUI.Loading.service({
//         lock: true,
//         text: "加载中...",
//         background: 'rgba(0,0,0,0.2)'
//     })
// }

// export  function endLoading() {
//     loading.close()
// }