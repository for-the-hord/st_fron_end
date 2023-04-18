<template>
  <div class="bg">
    <div class="bg_tt">
      <p>晴雨表</p>
      <p style="margin-top: -5px">
        <img class="imgs" src="/image/nmind/tit.png" alt="" />
      </p>
    </div>
    <!-- <div class="hello">
      <span style="color: white"> demo6 page</span> -->
    <div class="maprelative">
      <div ref="maps" id="map"></div>
      <span
        class="point5 point"
        v-for="item in changepoint"
        :key="item"
        :style="{ top: item[1] + 'px', left: item[0] + 'px' }"
      ></span>
      <!-- <span class="point5 point" style="left: 35%; top: 37%"></span>
      <span
        style="
          position: absolute;
          left: 30%;
          top: 36%;
          color: white;
          font-size: 12px;
        "
        >美国</span
      >

      <span class="point" style="left: 50%; top: 33%"></span>
      <span
        style="
          position: absolute;
          left: 50%;
          top: 34%;
          color: white;
          font-size: 12px;
        "
        >英国</span
      >

      <span class="point5 point" style="left: 72%; top: 39%"></span>
      <span
        style="
          position: absolute;
          left: 69%;
          top: 39%;
          color: white;
          font-size: 12px;
        "
        >中国</span
      >

      <span class="point" style="left: 65%; top: 25.5%"></span>
      <span
        style="
          position: absolute;
          left: 67%;
          top: 25%;
          color: white;
          font-size: 12px;
        "
        >俄罗斯</span
      >

      <span class="point point3" style="left: 41%; top: 63%"></span>
      <span
        style="
          position: absolute;
          left: 40%;
          top: 60%;
          color: white;
          font-size: 12px;
        "
        >巴西</span
      >

      <span class="point point3" style="left: 75%; top: 66%"></span>
      <span
        style="
          position: absolute;
          left: 74%;
          top: 69%;
          color: white;
          font-size: 12px;
        "
        >澳大利亚</span
      > -->
    </div>
    <!-- <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="(items, index) in mapData"
          :key="index"
          :label="items.name"
          :value="items.name"
        ></el-option>
      </el-select>
    </div> -->
  </div>
</template>
<script>
// height: 60px;
// background: #0A3067;
// border-bottom: 1px solid #0a4967;
// 如需扩张更多省市,在此处引入对应的地图JSON数据
//
import world from "./mapData/world.json";
import china from "./mapData/china.json";
import anhui from "./mapData/anhui.json";
import aomen from "./mapData/aomen.json";
import fujian from "./mapData/fujian.json";
import gansu from "./mapData/gansu.json";
import guangdong from "./mapData/guangdong.json";
import guangxi from "./mapData/guangxi.json";

import beijing from "./mapData/beijing.json";
import tianjin from "./mapData/tianjin.json";
import shanghai from "./mapData/shanghai.json";
import chongqing from "./mapData/chongqing.json";
import CQjiangbei from "./mapData/CQ_jiangbei.json";
// mapsA
import {
  top10,
  tuopuxialink,
  searchs4,
  orgid,
  census,
  mapsA,
} from "@/common/search.js";
// import value from "@/views/demo/components/editor-quill/value";
export default {
  name: "page6",
  data() {
    return {
      clientwidth_lds: "",
      oldpoint: [],
      contry: {
        澳大利亚: [139.884969, -24.408476],
        美国: [-104.431133, 40.190855],
        中国: [106.182816, 34.435666],
        冰岛: [-18.99821,65.405662],
        日本: [139.150772, 37.074625],
        印度: [78.366104, 22.778039],
        加拿大: [-111.199643, 54.814628],
        英国: [-1.697237, 53.166989],
        德国: [10.077033, 51.176525],
        俄罗斯: [101.033269, 65.057706],
      },
      newcontry: [],
      changepoint: [],
      points: [
        { value: [118.8062, 31.9208], itemStyle: { color: "#4ab2e5" } },
        { value: [127.9688, 45.368], itemStyle: { color: "#4fb6d2" } },
        { value: [110.3467, 41.4899], itemStyle: { color: "#52b9c7" } },
        { value: [125.8154, 44.2584], itemStyle: { color: "#5abead" } },
        { value: [116.4551, 40.2539], itemStyle: { color: "#f34e2b" } },
        { value: [123.1238, 42.1216], itemStyle: { color: "#f56321" } },
        { value: [114.4995, 38.1006], itemStyle: { color: "#f56f1c" } },
        { value: [117.4219, 39.4189], itemStyle: { color: "#f58414" } },
        { value: [112.3352, 37.9413], itemStyle: { color: "#f58f0e" } },
        { value: [109.1162, 34.2004], itemStyle: { color: "#f5a305" } },
        { value: [103.5901, 36.3043], itemStyle: { color: "#e7ab0b" } },
        { value: [106.3586, 38.1775], itemStyle: { color: "#dfae10" } },
        { value: [101.4038, 36.8207], itemStyle: { color: "#d5b314" } },
        { value: [103.9526, 30.7617], itemStyle: { color: "#c1bb1f" } },
        { value: [108.384366, 30.439702], itemStyle: { color: "#b9be23" } },
        { value: [113.0823, 28.2568], itemStyle: { color: "#a6c62c" } },
        { value: [102.9199, 25.46639], itemStyle: { color: "#96cc34" } },
        { value: [119.4543, 25.9222] },
      ],
      max: "",
      value: "world",
      myChart: null,
      //   注册地图json
      jsonMap: {
        world: world,
        中国: china,
        北京: beijing,
        天津: tianjin,
        上海: shanghai,
        重庆: chongqing,
        安徽: anhui,
        澳门: aomen,
        福建: fujian,
        甘肃: gansu,
        广东: guangdong,
        广西: guangxi,

        江北区: CQjiangbei,
      },
      // 全球数据
      worldData: [
        { name: "美国", gold: 46, silver: 29, copper: 29, value: 10 },
        { name: "中国", gold: 99999, silver: 27, copper: 23, value: 10 },
        { name: "英国", gold: 29, silver: 17, copper: 19, value: 10 },
        { name: "俄罗斯", gold: 24, silver: 25, copper: 33, value: 1 },
        { name: "韩国", gold: 13, silver: 8, copper: 7, value: 1 },
        { name: "德国", gold: 11, silver: 19, copper: 14, value: 1 },
        { name: "法国", gold: 11, silver: 11, copper: 12, value: 1 },
        { name: "意大利", gold: 8, silver: 9, copper: 11, value: 10 },
        { name: "匈牙利", gold: 8, silver: 4, copper: 5, value: 10 },
        { name: "澳大利亚", gold: 7, silver: 16, copper: 12, value: 10 },
        { name: "日本", gold: 7, silver: 14, copper: 17, value: 10 },
        { name: "哈萨克斯坦", gold: 7, silver: 1, copper: 5, value: 10 },
        { name: "荷兰", gold: 6, silver: 6, copper: 8, value: 10 },
        { name: "乌克兰", gold: 6, silver: 5, copper: 9, value: 10 },
        { name: "古巴", gold: 5, silver: 3, copper: 6, value: 10 },
        { name: "新西兰", gold: 5, silver: 3, copper: 5, value: 10 },
        { name: "伊朗", gold: 4, silver: 5, copper: 3, value: 10 },
        { name: "牙买加", gold: 4, silver: 4, copper: 4, value: 10 },
        { name: "捷克", gold: 4, silver: 3, copper: 3, value: 10 },
        { name: "朝鲜", gold: 4, silver: 0, copper: 2, value: 10 },
        { name: "西班牙", gold: 3, silver: 10, copper: 4, value: 10 },
        { name: "巴西", gold: 3, silver: 5, copper: 9, value: 10 },
        { name: "白俄罗斯", gold: 3, silver: 5, copper: 5, value: 10 },
        { name: "南非", gold: 3, silver: 2, copper: 1, value: 5 },
        { name: "埃塞俄比亚", gold: 3, silver: 1, copper: 3, value: 5 },
        { name: "克罗地亚", gold: 3, silver: 1, copper: 2, value: 5 },
        { name: "罗马尼亚", gold: 2, silver: 5, copper: 2, value: 5 },
        { name: "肯尼亚", gold: 2, silver: 4, copper: 5, value: 10 },
        { name: "丹麦", gold: 2, silver: 4, copper: 3, value: 10 },
        { name: "波兰", gold: 2, silver: 2, copper: 6, value: 10 },
        { name: "阿塞拜疆", gold: 2, silver: 2, copper: 6, value: 10 },
        { name: "土耳其", gold: 2, silver: 2, copper: 1, value: 5 },
        { name: "瑞士", gold: 2, silver: 2, copper: 0, value: 5 },
        { name: "立陶宛", gold: 2, silver: 1, copper: 2, value: 5 },
        { name: "挪威", gold: 2, silver: 1, copper: 1, value: 5 },
        { name: "加拿大", gold: 1, silver: 5, copper: 12, value: 10 },
        { name: "瑞典", gold: 1, silver: 4, copper: 3, value: 10 },
        { name: "哥伦比亚", gold: 1, silver: 3, copper: 4, value: 10 },
        { name: "格鲁吉亚", gold: 1, silver: 3, copper: 3, value: 5 },
        { name: "墨西哥", gold: 1, silver: 3, copper: 3, value: 5 },
        { name: "爱尔兰", gold: 1, silver: 1, copper: 3, value: 5 },
        { name: "塞尔维亚", gold: 1, silver: 1, copper: 2, value: 5 },
        { name: "斯洛文尼亚", gold: 1, silver: 1, copper: 2, value: 5 },
        { name: "阿根廷", gold: 1, silver: 1, copper: 2, value: 10 },
        { name: "突尼斯", gold: 1, silver: 1, copper: 1, value: 10 },
        { name: "多米尼加", gold: 1, silver: 1, copper: 0, value: 10 },
        { name: "乌兹别克斯坦", gold: 1, silver: 0, copper: 3, value: 10 },
        { name: "特立尼达和多巴哥", gold: 1, silver: 0, copper: 3, value: 10 },
        { name: "拉脱维亚", gold: 1, silver: 0, copper: 1, value: 5 },
        { name: "格林纳达", gold: 1, silver: 0, copper: 0, value: 1 },
        { name: "巴哈马", gold: 1, silver: 0, copper: 0, value: 1 },
        { name: "乌干达", gold: 1, silver: 0, copper: 0, value: 1 },
        { name: "委内瑞拉", gold: 1, silver: 0, copper: 0, value: 1 },
        { name: "阿尔及利亚", gold: 1, silver: 0, copper: 0, value: 1 },
        { name: "印度", gold: 0, silver: 2, copper: 4, value: 10 },
        { name: "蒙古", gold: 0, silver: 2, copper: 3, value: 5 },
        { name: "泰国", gold: 0, silver: 2, copper: 1, value: 5 },
        { name: "埃及", gold: 0, silver: 2, copper: 0, value: 5 },
        { name: "斯洛伐克", gold: 0, silver: 1, copper: 3, value: 10 },
        { name: "比利时", gold: 0, silver: 1, copper: 2, value: 5 },
        { name: "芬兰", gold: 0, silver: 1, copper: 2, value: 5 },
        { name: "亚美尼亚", gold: 0, silver: 1, copper: 2, value: 5 },
        { name: "马来西亚", gold: 0, silver: 1, copper: 1, value: 5 },
        { name: "中华台北", gold: 0, silver: 1, copper: 1, value: 5 },
        { name: "爱沙尼亚", gold: 0, silver: 1, copper: 1, value: 5 },
        { name: "保加利亚", gold: 0, silver: 1, copper: 1, value: 5 },
        { name: "印度尼西亚", gold: 0, silver: 1, copper: 1, value: 5 },
        { name: "波多黎各", gold: 0, silver: 1, copper: 1, value: 5 },
        { name: "黑山", gold: 0, silver: 1, copper: 0, value: 1 },
        { name: "博茨瓦纳", gold: 0, silver: 1, copper: 0, value: 1 },
        { name: "塞浦路斯", gold: 0, silver: 1, copper: 0, value: 1 },
        { name: "葡萄牙", gold: 0, silver: 1, copper: 0, value: 1 },
        { name: "加蓬", gold: 0, silver: 1, copper: 0, value: 1 },
        { name: "危地马拉", gold: 0, silver: 1, copper: 0, value: 1 },
        { name: "卡塔尔", gold: 0, silver: 0, copper: 2, value: 5 },
        { name: "新加坡", gold: 0, silver: 0, copper: 2, value: 5 },
        { name: "希腊", gold: 0, silver: 0, copper: 2, value: 5 },
        { name: "摩尔多瓦", gold: 0, silver: 0, copper: 2, value: 5 },
        { name: "巴林", gold: 0, silver: 0, copper: 1, value: 1 },
        { name: "塔吉克斯坦", gold: 0, silver: 0, copper: 1, value: 1 },
        { name: "中国香港", gold: 0, silver: 0, copper: 1, value: 1 },
        { name: "摩洛哥", gold: 0, silver: 0, copper: 1, value: 1 },
        { name: "沙特阿拉伯", gold: 0, silver: 0, copper: 1, value: 1 },
        { name: "科威特", gold: 0, silver: 0, copper: 1, value: 1 },
        { name: "阿富汗", gold: 0, silver: 0, copper: 1, value: 1 },
      ],
      // 全球地域中文映射
      nameMap: {
        Afghanistan: "阿富汗",
        Albania: "阿尔巴尼亚",
        Algeria: "阿尔及利亚",
        Andorra: "安道尔",
        Angola: "安哥拉",
        Antarctica: "南极洲",
        "Antigua and Barbuda": "安提瓜和巴布达",
        Argentina: "阿根廷",
        Armenia: "亚美尼亚",
        Australia: "澳大利亚",
        Austria: "奥地利",
        Azerbaijan: "阿塞拜疆",
        Bahamas: "巴哈马",
        Bahrain: "巴林",
        Bangladesh: "孟加拉",
        Barbados: "巴巴多斯",
        Belarus: "白俄罗斯",
        Belgium: "比利时",
        Belize: "伯利兹",
        Benin: "贝宁",
        Bermuda: "百慕大",
        Bhutan: "不丹",
        Bolivia: "玻利维亚",
        "Bosnia and Herz.": "波斯尼亚和黑塞哥维那",
        Botswana: "博茨瓦纳",
        Brazil: "巴西",
        Brunei: "文莱",
        Bulgaria: "保加利亚",
        "Burkina Faso": "布基纳法索",
        Burundi: "布隆迪",
        Cambodia: "柬埔寨",
        Cameroon: "喀麦隆",
        Canada: "加拿大",
        "Cape Verde": "佛得角",
        "Central African Rep.": "中非共和国",
        "Côte d'Ivoire": "科特迪瓦",
        Chad: "乍得",
        Chile: "智利",
        China: "中国",
        Colombia: "哥伦比亚",
        Comoros: "科摩罗",
        "Dem. Rep. Congo": "刚果共和国",
        Congo: "刚果",
        "Costa Rica": "哥斯达黎加",
        Croatia: "克罗地亚",
        Cuba: "古巴",
        Cyprus: "塞浦路斯",
        "Czech Rep.": "捷克共和国",
        Denmark: "丹麦",
        Djibouti: "吉布提",
        Dominica: "多米尼加",
        "Dominican Rep.": "多米尼加共和国",
        Ecuador: "厄瓜多尔",
        Egypt: "埃及",
        "El Salvador": "萨尔瓦多",
        "Eq. Guinea": "赤道几内亚",
        Eritrea: "厄立特里亚",
        Estonia: "爱沙尼亚",
        Ethiopia: "埃塞俄比亚",
        "Falkland Is.": "福克兰群岛",
        "Faroe Islands": "法罗群岛",
        Fiji: "斐济",
        Finland: "芬兰",
        France: "法国",
        "French Guiana": "法属圭亚那",
        "French Southern and Antarctic Lands": "法属南半球和南极领地",
        Gabon: "加蓬",
        Gambia: "冈比亚",
        "Gaza Strip": "加沙",
        Georgia: "格鲁吉亚",
        Germany: "德国",
        Ghana: "加纳",
        Greece: "希腊",
        Greenland: "格陵兰",
        Grenada: "格林纳达",
        Guadeloupe: "瓜德罗普",
        Guatemala: "危地马拉",
        Guinea: "几内亚",
        "Guinea-Bissau": "几内亚比绍",
        Guyana: "圭亚那",
        Haiti: "海地",
        Honduras: "洪都拉斯",
        "Hong Kong": "香港",
        Hungary: "匈牙利",
        Iceland: "冰岛",
        India: "印度",
        Indonesia: "印度尼西亚",
        Iran: "伊朗",
        Iraq: "伊拉克",
        "Iraq-Saudi Arabia Neutral Zone": "伊拉克阿拉伯中立区",
        Ireland: "爱尔兰",
        "Isle of Man": "马恩岛",
        Israel: "以色列",
        Italy: "意大利",
        "Ivory Coast": "科特迪瓦",
        Jamaica: "牙买加",
        "Jan Mayen": "扬马延岛",
        Japan: "日本",
        Jordan: "约旦",
        Kazakhstan: "哈萨克斯坦",
        Kenya: "肯尼亚",
        Kerguelen: "凯尔盖朗群岛",
        Kiribati: "基里巴斯",
        "North Korea": "朝鲜",
        //  North Korea
        Korea: "韩国",
        Kuwait: "科威特",
        Kyrgyzstan: "吉尔吉斯斯坦",
        "Lao PDR": "老挝",
        Latvia: "拉脱维亚",
        Lebanon: "黎巴嫩",
        Lesotho: "莱索托",
        Liberia: "利比里亚",
        Libya: "利比亚",
        Liechtenstein: "列支敦士登",
        Lithuania: "立陶宛",
        Luxembourg: "卢森堡",
        Macau: "澳门",
        Macedonia: "马其顿",
        Madagascar: "马达加斯加",
        Malawi: "马拉维",
        Malaysia: "马来西亚",
        Maldives: "马尔代夫",
        Mali: "马里",
        Malta: "马耳他",
        Martinique: "马提尼克",
        Mauritania: "毛里塔尼亚",
        Mauritius: "毛里求斯",
        Mexico: "墨西哥",
        Moldova: "摩尔多瓦",
        Monaco: "摩纳哥",
        Mongolia: "蒙古",
        Morocco: "摩洛哥",
        Mozambique: "莫桑比克",
        Myanmar: "缅甸",
        Namibia: "纳米比亚",
        Nepal: "尼泊尔",
        Netherlands: "荷兰",
        "New Caledonia": "新喀里多尼亚",
        "New Zealand": "新西兰",
        Nicaragua: "尼加拉瓜",
        Niger: "尼日尔",
        Nigeria: "尼日利亚",
        "Northern Mariana Islands": "北马里亚纳群岛",
        Norway: "挪威",
        Oman: "阿曼",
        Pakistan: "巴基斯坦",
        Panama: "巴拿马",
        "Papua New Guinea": "巴布亚新几内亚",
        Paraguay: "巴拉圭",
        Peru: "秘鲁",
        Philippines: "菲律宾",
        Poland: "波兰",
        Portugal: "葡萄牙",
        "Puerto Rico": "波多黎各",
        Qatar: "卡塔尔",
        Reunion: "留尼旺岛",
        Romania: "罗马尼亚",
        Russia: "俄罗斯",
        Rwanda: "卢旺达",
        "San Marino": "圣马力诺",
        "Sao Tome and Principe": "圣多美和普林西比",
        "Saudi Arabia": "沙特阿拉伯",
        Senegal: "塞内加尔",
        Seychelles: "塞舌尔",
        "Sierra Leone": "塞拉利昂",
        Singapore: "新加坡",
        Slovakia: "斯洛伐克",
        Slovenia: "斯洛文尼亚",
        "Solomon Is.": "所罗门群岛",
        Somalia: "索马里",
        "S. Sudan": "苏丹",
        "South Africa": "南非",
        Spain: "西班牙",
        "Sri Lanka": "斯里兰卡",
        "St. Christopher-Nevis": "圣",
        "St. Lucia": "圣露西亚",
        "St. Vincent and the Grenadines": "圣文森特和格林纳丁斯",
        Sudan: "苏丹",
        Suriname: "苏里南",
        Svalbard: "斯瓦尔巴特群岛",
        Swaziland: "斯威士兰",
        Sweden: "瑞典",
        Switzerland: "瑞士",
        Syria: "叙利亚",
        Taiwan: "台湾",
        Tajikistan: "塔吉克斯坦",
        "United Republic of Tanzania": "坦桑尼亚",
        Thailand: "泰国",
        Togo: "多哥",
        Tonga: "汤加",
        "Trinidad and Tobago": "特里尼达和多巴哥",
        Tunisia: "突尼斯",
        Turkey: "土耳其",
        Turkmenistan: "土库曼斯坦",
        Tanzania: "坦桑尼亚",
        "Turks and Caicos Islands": "特克斯和凯科斯群岛",
        Uganda: "乌干达",
        Ukraine: "乌克兰",
        "United Arab Emirates": "阿联酋",
        "United Kingdom": "英国",
        "United States": "美国",
        Uruguay: "乌拉圭",
        Uzbekistan: "乌兹别克斯坦",
        Vanuatu: "瓦努阿图",
        Venezuela: "委内瑞拉",
        Vietnam: "越南",
        "W. Sahara": "西撒哈拉",
        "Western Samoa": "西萨摩亚",
        Samoa: "美属萨摩亚",
        Yemen: "也门",
        Yugoslavia: "南斯拉夫",
        "Democratic Republic of the Congo": "刚果民主共和国",
        Zambia: "赞比亚",
        Zimbabwe: "津巴布韦",
        "South Sudan": "南苏丹",
        Somaliland: "索马里兰",
        Montenegro: "黑山",
        Kosovo: "科索沃",
        Serbia: "塞尔维亚",
        keshimier: "克什米尔(巴控)",
        keshimier2: "克什米尔(印控)",
        "Timor-Leste": "东帝汶",
        "S. Geo. and S. Sandw. Is.": "南乔治亚和南桑德威奇群岛",
        "Fr. S. Antarctic Lands": "法属南半球和南极领地",

        // "巴基斯坦":"巴基斯坦"
      },

      // 中国数据
      chinaData: [
        { name: "北京", value: Math.round(Math.random() * 100) },
        { name: "天津", value: Math.round(Math.random() * 100) },
        { name: "上海", value: Math.round(Math.random() * 100) },
        { name: "重庆", value: Math.round(Math.random() * 100) },
        { name: "河北", value: Math.round(Math.random() * 100) },
        { name: "河南", value: Math.round(Math.random() * 100) },
        { name: "云南", value: Math.round(Math.random() * 100) },
        { name: "辽宁", value: Math.round(Math.random() * 100) },
        { name: "黑龙江", value: Math.round(Math.random() * 100) },
        { name: "湖南", value: Math.round(Math.random() * 100) },
        { name: "安徽", value: Math.round(Math.random() * 100) },
        { name: "山东", value: Math.round(Math.random() * 100) },
        { name: "新疆", value: Math.round(Math.random() * 100) },
        { name: "江苏", value: Math.round(Math.random() * 100) },
        { name: "浙江", value: Math.round(Math.random() * 100) },
        { name: "江西", value: Math.round(Math.random() * 100) },
        { name: "湖北", value: Math.round(Math.random() * 100) },
        { name: "广西", value: Math.round(Math.random() * 100) },
        { name: "甘肃", value: Math.round(Math.random() * 100) },
        { name: "山西", value: Math.round(Math.random() * 100) },
        { name: "内蒙古", value: Math.round(Math.random() * 100) },
        { name: "陕西", value: Math.round(Math.random() * 100) },
        { name: "吉林", value: Math.round(Math.random() * 100) },
        { name: "福建", value: Math.round(Math.random() * 100) },
        { name: "贵州", value: Math.round(Math.random() * 100) },
        { name: "广东", value: Math.round(Math.random() * 100) },
        { name: "青海", value: Math.round(Math.random() * 100) },
        { name: "西藏", value: Math.round(Math.random() * 100) },
        { name: "四川", value: Math.round(Math.random() * 100) },
        { name: "宁夏", value: Math.round(Math.random() * 100) },
        { name: "海南", value: Math.round(Math.random() * 100) },
        { name: "台湾", value: Math.round(Math.random() * 100) },
        { name: "香港", value: Math.round(Math.random() * 100) },
        { name: "澳门", value: Math.round(Math.random() * 100) },
      ],
      // 北京数据
      beijingData: [
        { name: "东城区", value: 18163 },
        { name: "西城区", value: 52036 },
        { name: "海淀区", value: 59 },
        { name: "朝阳区", value: 58 },
        { name: "石景山区", value: 15 },
        { name: "大兴区", value: 56 },
        { name: "门头沟区", value: 11 },
        { name: "昌平区", value: 50 },
        { name: "通州区", value: 51 },
        { name: "房山区", value: 53 },
        { name: "丰台区", value: 53 },
        { name: "顺义区", value: 17 },
        { name: "怀柔区", value: 51 },
        { name: "密云区", value: 18 },
        { name: "延庆区", value: 52 },
        { name: "平谷区", value: 16 },
      ],
      // 重庆数据
      chongqingData: [
        { name: "万州区", value: 56 },
        { name: "开州区", value: 18 },
        { name: "北碚区", value: 18 },
        { name: "南川区", value: 10 },
        { name: "忠县", value: 15 },
        { name: "云阳县", value: 18 },
        { name: "两江新区", value: 13 },
        { name: "长寿区", value: 12 },
        { name: "石柱土家族自治县", value: 12 },
        { name: "酉阳土家族苗族自治县", value: 12 },
        { name: "大渡口区", value: 5 },
        { name: "渝北区", value: 12 },
        { name: "江北区", value: 18 },
        { name: "九龙坡区", value: 15 },
        { name: "合川区", value: 5 },
        { name: "垫江县", value: 13 },
        { name: "巫山县", value: 5 },
        { name: "巫溪县", value: 11 },
        { name: "綦江区", value: 10 },
        { name: "璧山区", value: 5 },
        { name: "奉节县", value: 5 },
        { name: "永川区", value: 5 },
        { name: "丰都县", value: 5 },
        { name: "江津区", value: 5 },
        { name: "铜梁区", value: 5 },
        { name: "潼南区", value: 5 },
        { name: "涪陵区", value: 5 },
        { name: "巴南区", value: 5 },
        { name: "大足区", value: 5 },
        { name: "梁平县", value: 5 },
        { name: "城口县", value: 5 },
        { name: "秀山土家族苗族自治县", value: 1 },
        { name: "黔江区", value: 5 },
        { name: "南岸区", value: 5 },
        { name: "武隆县", value: 1 },
        { name: "渝中区", value: 13 },
        { name: "荣昌区", value: 5 },
        { name: "沙坪坝区", value: 5 },
        { name: "彭水苗族土家族自治县", value: 5 },
      ],
      // 上海数据
      shanghaiData: [
        { name: "黄浦区", value: 519 },
        { name: "徐汇区", value: 539 },
        { name: "长宁区", value: 512 },
        { name: "静安区", value: 529 },
        { name: "普陀区", value: 589 },
        { name: "闸北区", value: 552 },
        { name: "虹口区", value: 529 },
        { name: "杨浦区", value: 532 },
        { name: "闵行区", value: 599 },
        { name: "宝山区", value: 139 },
        { name: "嘉定区", value: 540 },
        { name: "浦东新区", value: 59 },
        { name: "金山区", value: 552 },
        { name: "松江区", value: 515 },
        { name: "青浦区", value: 529 },
        { name: "奉贤区", value: 552 },
        { name: "崇明区", value: 599 },
      ],
      //  天津数据
      tianjinData: [
        { name: "和平区", value: 199 },
        { name: "河东区", value: 59 },
        { name: "河西区", value: 152 },
        { name: "南开区", value: 599 },
        { name: "河北区", value: 59 },
        { name: "红桥区", value: 52 },
        { name: "塘沽区", value: 5 },
        { name: "汉沽区", value: 552 },
        { name: "大港区", value: 59 },
        { name: "东丽区", value: 59 },
        { name: "西青区", value: 580 },
        { name: "津南区", value: 581 },
        { name: "北辰区", value: 582 },
        { name: "武清区", value: 583 },
        { name: "宝坻区", value: 584 },
        { name: "宁河区", value: 585 },
        { name: "静海区", value: 586 },
        { name: "蓟州区", value: 587 },
        { name: "滨海新区", value: 587 },
      ],
      // 江北区
      jiangbeiData: [
        {
          name: "江北区",
          value: 50,
        },
      ],
      // 下拉框
      mapData: [
        { name: "world", value: 10 },
        { name: "中国", value: 50 },
        { name: "安徽", value: 50 },
        { name: "澳门", value: 50 },
        { name: "福建", value: 50 },
        { name: "甘肃", value: 50 },
        { name: "广东", value: 50 },
        { name: "广西", value: 50 },

        { name: "北京", value: 50 },
        { name: "天津", value: 50 },
        { name: "上海", value: 10 },
        { name: "重庆", value: 50 },
        { name: "江北区", value: 50 },
      ],
    };
  },
  created() {
    //   循环注册地图
    for (let index in this.jsonMap) {
      this.$echarts.registerMap(index, this.jsonMap[index]);
    }
  },

  mounted() {
    //    初始化地图
    // this.chinaConfigure(this.value);
    this.clientwidth_lds = document.body.clientWidth;
    console.log(
      this.clientwidth_lds,
      "  this.clientwidth_lds = window.clientwidthYUANSHI;"
    );
    this.gomap();
    window.addEventListener("resize", () => {
      //   this.changepoint = [];
      //   this.chinaConfigure(this.value);
      this.clientwidth_lds = document.body.clientWidth;
      console.log(
        this.clientwidth_lds,
        "this.clientwidth_lds = window.clientwidthresize;"
      );
    });

    // window.onresize = () => {
    //   this.$nextTick(() => {
    //     this.clientwidth_lds = document.body.clientWidth;
    //   });
    //   console.log(
    //     this.clientwidth_lds,
    //     "  this.clientwidth_lds = window.clientwidth;"
    //   );
    // };
  },
  //   更新数据
  watch: {
    value(newVal) {
      this.myChart.dispose();
    },
    clientwidth_lds(news, oldnews) {
      if (oldnews) {
        this.changepoint = [];
        this.$nextTick(() => {
          setTimeout(() => {
            this.chinaConfigure(this.value);
          }, 100);
        });
        console.log(
          this.clientwidth_lds,
          "this.clientwidth_lds = window.clientwidth;watch"
        );
      }

      //   this.currentValue = value;
    },
  },
  beforeDestroy() {
    if (!this.myChart) {
      return;
    }
    this.myChart.dispose();
    this.myChart = null;
  },
  methods: {
    gomap() {
      mapsA().then((res) => {
        // console.log(res);
        this.worldData = res.data.maps;
        this.newcontry = res.data.top;
        this.oldpoint = [];
        this.newcontry.map((e) => {
          for (let item in this.contry) {
            if (e == item) {
              this.oldpoint.push(this.contry[item]);
            }
          }
        });
        this.oldpoint = this.oldpoint.slice(0, 5);
        console.log(this.oldpoint, "oldpoint");
        this.max = res.data.maps[3].value;
        this.chinaConfigure(this.value);
      });
    },
    chinaConfigure(area) {
      this.myChart = this.$echarts.init(document.getElementById("map")); //这里是为了获得容器所在位置
      window.onresize = this.myChart.resize;

      // chart.convertToPixel('geo',[116.0815,41.781])；经纬度坐标+++++++++++++++++++++++++转化窗口坐标方法

      let option = {
        // 进行相关配置
        backgroundColor: "#00000000",
        color: "#fff",

        tooltip: {
          trigger: "item",
          color: "#fff",
          backgroundColor: "#0a23518a", //标题背景色
          borderColor: "#000000de", //边框颜色
          borderWidth: 1, //边框线宽
          padding: 5, //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
          //   textStyle: mytextStyle, //文本样式
          textStyle: {
            // 提示框浮层的文本样式。
            color: "#fff",
            fontStyle: "normal",
            fontWeight: "normal",
            fontFamily: "sans-serif",
            fontSize: 14,
          },

          formatter: function (params) {
            var value = (params.value + "").split(".");
            value =
              value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") +
              "." +
              value[1];
            return params.name + "<br/>" + "威胁指标" + " : " + params.value;
          },
        },
        visualMap: {
          showLabel: true,
          max: this.max,
          calculable: true,
          text: ["威胁指标高", "威胁指标低"],

          inRange: {
            color: [
              " #263a65",
              "#cbb622",
              "#cbb622",
              "#b13944",
              "#dfa7ac",
              " #016ffc",
              " #db2535",
            ],
            Text: "威胁情报",
          },
          textStyle: {
            color: "#42daf9",
          },
        },

        series: [
          {
            type: "map",
            map: area,
            hoverable: true, //鼠标经过时，是否高亮显示
            // type: "effectScatter",

            // markPoint: {
            //   //   symbol: "image://image/nmind/home.gif",
            //   symbolSize: 8,
            //   symbol: "arrow",
            //   animation: true,
            //   animationDuration: 1000,
            //   silent: false,
            //   animationDurationUpdate: 3000,
            //   animationDelayUpdate: 1000,

            //   itemStyle: {
            //     normal: {
            //       borderColor: "#fff",
            //       borderWidth: 1,
            //       backgroundColor: "#fff",
            //       color: "#182026",
            //       label: { show: false },
            //     },
            //   },
            //   emphasis: {
            //     borderColor: "#53d9f6",
            //     borderWidth: 5,
            //     label: {
            //       show: false,
            //     },
            //   },

            //   data: [
            //     {
            //       name: "某个坐标",
            //       coord: [107.758961, 35.210557],
            //       value: 12,
            //     },
            //     {
            //       name: "某个2坐标",
            //       coord: [136.762867, -24.16587],
            //       value: 42,
            //     },
            //   ],
            // },
            //    线条问题
            // markLine: {
            //   symbolSize: 8,
            //   symbol: "arrow",
            //   animation: true,
            //   animationDuration: 1000,
            //   silent: false,
            //   animationDurationUpdate: 3000,
            //   animationDelayUpdate: 1000,
            //   precision: 2,
            //   data: [
            //     [
            //       {
            //         name: "top3受攻击指数",
            //         coord: [107.758961, 35.210557],
            //       },
            //       {
            //         coord: [136.762867, -24.16587],
            //       },
            //     ],
            //     [

            //       {name: "top3受攻击指数",
            //         coord: [136.762867, -24.16587],
            //       },
            //       {
            //         coord: [-104.269553, 39.858021],
            //       },
            //     ],
            //     [

            //       {
            //         name: "top3受攻击指数",

            //         coord: [-104.269553, 39.858021],
            //       },
            //        {
            //          coord: [107.758961, 35.210557],
            //       },
            //     ],
            //   ],
            // },

            itemStyle: {
              areaColor: "#fff",
              opacity: 0,
              normal: {
                borderColor: "rgba(0, 0, 0, 0.2)",
                backgroundColor: "black",
              },
              emphasis: {
                focus: "none",
                areaColor: "#0049A6",
                color: "#fff",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                borderWidth: 1,
                backgroundColor: "black",
                borderColor: "#35adce",
                label: {
                  show: true,
                  color: "#fff",
                },
              },
            },

            data: area == "world" ? this.worldData : area == "中国",
            // ? this.chinaData
            // : area == "重庆"
            // ? this.chongqingData
            // : area == "北京"
            // ? this.beijingData
            // : area == "上海"
            // ? this.shanghaiData
            // : area == "天津"
            // ? this.tianjinData
            // : area == "江北区"
            // ? this.jiangbeiData
            // : [],
            nameMap: area == "world" ? this.nameMap : {},
          },
          //   {
          //     type: "line",
          //     coordinateSystem: "geo",
          //     effect: {
          //       show: true,
          //       period: 100,
          //       constantSpeed: 1,
          //       trailLength: 0.2,
          //       loop: true,
          //     },
          //     data: [
          //       {
          //         coord: [120, 66],
          //       },
          //       {
          //         coord: [122, 67],
          //       },
          //     ],
          //   },

          //   {
          //     name: "Top 5",
          //     type: "scatter",
          //     coordinateSystem: "geo",
          //     symbol: "pin",
          //     symbolSize: [50, 50],

          //     itemStyle: {
          //       normal: {
          //         color: "#dfae10", //标志颜色
          //       },
          //     },
          //     data: [{ name: "中国", value: [116.404184, 39.914578] }],
          //     showEffectOn: "render",
          //     rippleEffect: {
          //       brushType: "stroke",
          //     },
          //     hoverAnimation: true,
          //     zlevel: 1,
          //   },

          //   {
          //     name: "Top 5",
          //     type: "effectScatter",
          //     coordinateSystem: "geo",
          //     data: [{ name: "中国", value: [116.404184, 39.914578] }],
          //     symbolSize: 44,
          //     encode: {
          //       value: 2,
          //     },
          //     showEffectOn: "render",
          //     rippleEffect: {
          //       brushType: "stroke",
          //     },
          //     label: {
          //       formatter: "{b}",
          //       position: "right",
          //       show: true,
          //     },
          //     itemStyle: {
          //       shadowBlur: 10,
          //       shadowColor: "#333",
          //     },
          //     emphasis: {
          //       scale: true,
          //     },
          //     zlevel: 1,
          //   },
          //   {
          //     coordinateSystem: "geo",
          //     type: "effectScatter",
          //     colorBy: "series",
          //     effectType: "ripple",
          //     rippleEffect: {
          //       //涟漪特效
          //       period: 4, //动画时间，值越小速度越快
          //       brushType: "stroke", //波纹绘制方式 stroke, fill
          //       scale: 3, //波纹圆环最大限制，值越大波纹越大
          //       color: "#00ffff",
          //     },
          //     symbolSize: 44,
          //     Symbol: "circle",
          //     encode: {
          //       value: 2,
          //     },
          //     data: [
          //       {
          //         name: "2112",
          //         value: [21, 3],
          //       },
          //     ],
          //   },

          //   {
          //     type: "effectScatter",
          //     coordinateSystem: "geo",
          //     zlevel: 3,
          //     rippleEffect: {
          //       //涟漪特效
          //       period: 4, //动画时间，值越小速度越快
          //       brushType: "stroke", //波纹绘制方式 stroke, fill
          //       scale: 3, //波纹圆环最大限制，值越大波纹越大
          //       color: "#00ffff",
          //     },
          //     label: {
          //       normal: {
          //         show: true,
          //         position: "right",
          //         color: "#00ffff",
          //         formatter: "{b}",
          //         textStyle: {
          //           color: "#00ffff",
          //         },
          //       },
          //       emphasis: {
          //         show: true,
          //       },
          //     },
          //     // symbol: "circle",
          //     // symbolSize: 15,
          //     symbol: "circle",
          //     symbolSize: [20, 10],
          //     symbolSize: [30, 15],
          //     itemStyle: {
          //       normal: {
          //         show: true,
          //       },
          //     },
          //     data: [
          //       [3.4, 4.5, 15, 43],
          //       [4.2, 2.3, 20, 91],
          //       [10.8, 9.5, 30, 18],
          //       [7.2, 8.8, 18, 57],
          //     ],
          //   },

          //被攻击点
        ],
      };

      this.myChart.setOption(option, true);
      // 此处为转换坐标
      console.log(this.myChart, "this.myChart");
      var seriesModel = this.myChart.getModel().getSeriesByIndex(0);
      console.log(seriesModel);
      var coordSys = seriesModel.coordinateSystem;
      console.log(coordSys);
      //   地理坐标
      this.oldpoint.map((e) => {
        this.changepoint.push(coordSys.dataToPoint(e));
      });
      console.log(this.changepoint, "changepoint");
      // 此处为转换坐标

      //   if (window.onresize) {
      //     // 此处为转换坐标
      //     console.log(this.myChart, "this.myChart");
      //     var seriesModel = this.myChart.getModel().getSeriesByIndex(0);
      //     console.log(seriesModel);
      //     var coordSys = seriesModel.coordinateSystem;
      //     console.log(coordSys);
      //     var point = coordSys.dataToPoint([112.967424, 37.785747]);
      //     console.log(point);
      //     this.changepoint = [];
      //     //   地理坐标
      //     this.oldpoint.map((e) => {
      //       this.changepoint.push(coordSys.dataToPoint(e));
      //     });
      //     console.log(this.changepoint, "changepoint");
      //     // 此处为转换坐标
      //     this.myChart.setOption(option, true);
      //     console.log("需要重新执行");
      //   }

      //     //   // 获取系列
      // var seriesModel = chart.getModel().getSeriesByIndex(idx)
      // // 获取地理坐标系实例
      // var coordSys = seriesModel.coordinateSystem;
      // // dataToPoint 相当于 getPosByGeo
      // var point = coordSys.dataToPoint([lng, lat]);
      // // pointToData 相当于 getGeoByPos
      // var coord = coordSys.dataToPoint(point);

      //   console.log(this.myChart.convertToPixel("geo", [116, 39]));
      //   console.log(this.myChart.convertToPixel({geoId: 'bb'}, [128.3324, 89.5344]));

      //let result = myechart.convertToPixel('geo', geoCoordMap[BJData[0][1].name])
      //   this.myChart.convertToPixel('geo', [116, 39]);
      //   this.myChart.convertToPixel('geo', [128.3324, 89.5344]);

      //     //   var seriesModel = chart.getModel().getSeriesByIndex(idx)
      // // 获取地理坐标系实例
      // var coordSys = seriesModel.coordinateSystem;
      // // dataToPoint 相当于 getPosByGeo
      // var point = coordSys.dataToPoint([lng, lat]);
      // // pointToData 相当于 getGeoByPos
      // var coord = coordSys.dataToPoint(point);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
// teixo
.point,
.point::before,
.point::after {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  content: "";
  pointer-events: none;
  z-index: 9999999999999999;
}
.point::before {
  animation: scale 0.5s infinite;
}
.point::after {
  animation: scale2 1.5s ease infinite;
}
@keyframes scale {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(5);
    opacity: 0;
  }
}
@keyframes scale2 {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(8);
    opacity: 0;
  }
}

.point,
.point::before,
.point::after {
  /* 设置颜色 */
  //   background-color: rgba(241, 34, 30, 0.9);
  background-color: red;
}
.point2,
.point2::before,
.point2::after {
  /* 设置颜色 */
  //   background-color: rgba(0, 221, 254, 0.9);
  background-color: #f3ff40;
}
.point3,
.point3::before,
.point3::after {
  /* 设置颜色 */
  //   background-color: rgba(1, 88, 255, 0.9);
  background-color: #f3f56c;
}
.point4,
.point4::before,
.point4::after {
  /* 设置颜色 */
  background-color: rgba(135, 229, 8, 0.9);
}

.point5,
.point5::before,
.point5::after {
  /* 设置颜色 */
  //   background-color: rgba(135, 229, 8, 0.9);
  background-color: #fff;
  //
}
//
.bg {
  padding: 20px;
  width: 97%;
  height: 660px;
  background-image: url("/image/nmind/qingbao.png");
  // background-position: left bottom;
  background-size: 100% 100%;
  //   border-radius: 50%;RGBA(3, 40, 96, 1)
  position: relative;
  //   top: 100px;

  .imgs {
    // width: 80%;
    height: 3px;
  }
  ul {
    padding-inline-start: 0;
    margin-block-start: 0;
    list-style-type: none;
    margin-block-end: 0;
  }
  .bg_content {
    .bg_c_c {
      width: 100%;

      list-style: none;
      height: 30px;
      line-height: 30px;
      font-weight: lighter;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      .tts {
        display: inline-block;
        width: 70%;
        overflow: hidden; /*超出部分隐藏*/
        white-space: nowrap; /*不换行*/
        text-overflow: ellipsis; /*超出部分文字以...显示*/
      }
      .times {
        display: inline-block;
        min-width: 25%;
        //   float: right;
        //   margin-right: 10px;
      }
    }
    //   width: 100%;
    .bg_c_c:nth-child(2n-1) {
      background: RGBA(3, 40, 96, 1);
      color: RGBA(236, 238, 242, 1);
    }
    .bg_c_c:nth-child(2n) {
      background: RGBA(0, 34, 84, 1);
      color: RGBA(236, 238, 242, 1);
    }
  }
  .bg_c_tt {
    padding-left: 10px;
    padding-right: 10px;
    //   width: 100%;
    height: 30px;
    background: RGBA(26, 74, 166, 1);
    color: rgba(255, 255, 255, 1);
    line-height: 33px;
  }
  .bg_tt {
    height: 30px;
    font-size: 14px;
    color: rgba(71, 225, 255, 1);
    text-align: left;
  }
}
.hello {
  position: relative;
  width: 100%;
  height: 100%;
}
>>> .el-select {
  position: absolute;
  left: 20px;
  top: 20px;
}
#map {
  //   position: absolute;
  //   width: 100%;
  height: 90%;
  cursor: none !important;
}
.maprelative {
  position: relative;
  height: 90%;
  //   cursor: none !important;
}
</style>
