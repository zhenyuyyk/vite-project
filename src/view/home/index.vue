<script setup>
import {onMounted, onUnmounted} from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

const envName = import.meta.env.VITE_NAME
const envUrl = import.meta.env.VITE_BASE_URL
let map = null;
let AMap = null

onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: "bac9ab046f9ab402ec4243867b4c4bd2",
  };
  AMapLoader.load({
    key: "66215168aea8e4e8a8ca22e42d2d2d10", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [
      "AMap.Driving",
      "AMap.Transfer",
      "AMap.Walking",
      "AMap.Polyline",
    ], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
      .then((AMap) => {
        console.log(123)
        // AMap = AMap
        map = new AMap.Map("container", {
          // 设置地图容器id
          viewMode: "3D", // 是否为3D地图模式
          zoom: 15, // 初始化地图级别
          center: [120.483898, 36.179867], // 初始化地图中心点位置
        });
        var WalkingOne = new AMap.Walking()
        console.log(WalkingOne)
        let arrs = [
          ['青铁芳华地', '汉川路（地铁站）', '#b6a014'],
          ['卓越皇后道千山外', '汉川路（地铁站）', '#80a492'],
          ['新城香溢紫郡二期', '汉川路（地铁站）', '#8b7042'],
          ['卓越皇后道', '汉川路（地铁站）', '#f3a694'],
          ['新城香溢紫郡一期', '汉川路（地铁站）', '#f9d3e3'],
          ['和达璟城', '汉川路（地铁站）', '#beb1aa'],
          ['上流和苑', '东川路（地铁站）', '#e5a84b'],
          ['海尔博悦兰庭', '东川路（地铁站）', '#c0d695'],
          ['万科生态城熙景', '东川路（地铁站）', '#ba5b49'],
          ['万科生态城观澜', '东川路（地铁站）', '#f6bec8'],
          ['万科如园', '东川路（地铁站）', '#9aa7b1'],
          ['和达和城', '东川路（地铁站）', '#d2af9d'],
        ]
        for (let i = 0; i < arrs.length; i++) {
          let item = arrs[i]
          setTimeout(() => {
            search(item[0], item[1], WalkingOne, item[2])
          }, i * 1000)
        }

        // search('青铁芳华地', '汉川路（地铁站）', WalkingOne)
        // search('卓越皇后道千山外', '汉川路（地铁站）', WalkingOne)
        // search('新城香溢紫郡二期', '汉川路（地铁站）', WalkingOne)
        // search('卓越皇后道', '汉川路（地铁站）', WalkingOne)
        // search('新城香溢紫郡一期', '汉川路（地铁站）', WalkingOne)
        // search('和达璟城', '汉川路（地铁站）', WalkingOne)
        // search('上流和苑', '东川路（地铁站）', WalkingOne)
        // search('海尔博悦兰庭', '东川路（地铁站）', WalkingOne)
        // search('万科生态城熙景', '东川路（地铁站）', WalkingOne)
        // search('万科生态城观澜', '东川路（地铁站）', WalkingOne)
        // search('万科如园', '东川路（地铁站）', WalkingOne)
        // search('和达和城', '东川路（地铁站）', WalkingOne)
        function search(name1, name2, WalkingOne, color) {
          let points = [
            {keyword: name1, city: '青岛'},
            {keyword: name2, city: '青岛'}
          ]

          WalkingOne.search(points, (status, result) => {
            // 未出错时，result即是对应的路线规划方案
            console.log(status, result, result.originName, color)
            drawRoute(result.routes[0], result.originName, color)
          })


          function drawRoute(route, name, color) {
            let time = parseInt(route.time / 60)
            let distance = route.distance
            var path = parseRouteToPath(route)


            var routeLine = new AMap.Polyline({
              path: path,
              isOutline: true,
              outlineColor: color,
              borderWeight: 2,
              strokeWeight: 5,
              strokeColor: color,
              lineJoin: 'round'
            })

            routeLine.setMap(map)

            // 创建纯文本标记
            var text = new AMap.Text({
              text: `${name}</br>距离:${distance}米</br>步行用时:${time}分钟`,
              anchor: 'bottom-right', // 设置文本标记锚点
              draggable: true,
              cursor: 'pointer',
              style: {
                'margin-right': '3px',
                'margin-bottom': '3px',
                'border-width': 0,
                'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
                'font-size': '14px',
                'color': color
              },
              position: path[0]
            });

            text.setMap(map);

            // 调整视野达到最佳显示区域
            // map.setFitView([routeLine])
          }

          function parseRouteToPath(route) {
            var path = []

            for (var i = 0, l = route.steps.length; i < l; i++) {
              var step = route.steps[i]

              for (var j = 0, n = step.path.length; j < n; j++) {
                path.push(step.path[j])
              }
            }

            return path
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
});

onUnmounted(() => {
  map?.destroy();
});
</script>

<template>
  <!--  <h2>首页</h2>-->
  <!--  <p>环境name：{{envName}}</p>-->
  <!--  <p>环境baseUrl：{{envUrl}}</p>-->
  <div id="container"></div>
</template>

<style lang="less" scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 800px;
}
</style>
