<script setup>
import {onMounted, onUnmounted} from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

const envName = import.meta.env.VITE_NAME
const envUrl = import.meta.env.VITE_BASE_URL
let map = null;
let AMap = null

onMounted(() => {
  // 6671221b83e61156f6c34c20bebc2a82	9d16719165d4022fb78a23ca8c97bed6
  window._AMapSecurityConfig = {
    securityJsCode: "9d16719165d4022fb78a23ca8c97bed6",
  };
  AMapLoader.load({
    key: "6671221b83e61156f6c34c20bebc2a82", // 申请好的Web端开发者Key，首次调用 load 时必填
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
          // ['青铁芳华地营销中心', '汉川路（地铁站）', '#b6a014','青铁芳华地南门'],
          // ['喜客超市(卓越皇后道千山外店)', '汉川路（地铁站）', '#80a492', '卓越皇后道千山外南门'],
          // ['友客便利(新城香溢紫郡二期)', '汉川路（地铁站）', '#8b7042','新城香溢紫郡二期北门',],
          // ['卓越皇后道南门', '汉川路（地铁站）', '#f3a694','卓越皇后道南门'],
          // ['新城香溢紫郡一期南门', '汉川路（地铁站）', '#f9d3e3','新城香溢紫郡一期南门'],
          // ['和达璟城', '汉川路（地铁站）', '#beb1aa','和达璟城'],
          // ['青岛春田食品科技有限公司', '东川路（地铁站）', '#e5a84b','上流和苑东南门'],
          // ['托马斯乐学成长中心', '东川路（地铁站）', '#c0d695','海尔博悦兰庭南门'],
          // ['同房药业(万科生态城熙景店)', '东川路（地铁站）', '#ba5b49','万科生态城熙景西门'],
          // ['毛公地宾川路公交站', '东川路（地铁站）', '#f6bec8', '万科生态城观澜西门'],
          // ['恒星便利(万科如园)', '东川路（地铁站）', '#9aa7b1','万科如园北门'],
          ['大丰烟酒茶(和达和城)', '东川路（地铁站）', '#d2af9d','和达和城东北门'],
        ]
        let arrs2 = [
          ['青铁芳华地南门', '李沧区松乐汀商业广场', '#b6a014'],
          ['卓越皇后道千山外东门', '李沧区松乐汀商业广场', '#80a492'],
          ['新城香溢紫郡二期西门', '李沧区松乐汀商业广场', '#8b7042'],
          ['卓越皇后道南门', '李沧区松乐汀商业广场', '#f3a694'],
          ['新城香溢紫郡一期南门', '李沧区松乐汀商业广场', '#f9d3e3'],
          ['和达璟城', '李沧区松乐汀商业广场', '#beb1aa'],
          ['上流和苑西门', '李沧区松乐汀商业广场', '#e5a84b'],
          ['海尔博悦兰庭南门', '李沧区松乐汀商业广场', '#c0d695'],
          ['万科生态城熙景北1门', '李沧区松乐汀商业广场', '#ba5b49'],
          ['万科生态城观澜西门', '李沧区松乐汀商业广场', '#f6bec8'],
          ['万科如园北门', '李沧区松乐汀商业广场', '#9aa7b1'],
          ['和达和城东北门', '李沧区松乐汀商业广场', '#d2af9d'],
        ]
        let arrs3 = [
          ['青铁芳华地南门', '青岛市第八人民医院(东院区)', '#b6a014'],
          ['卓越皇后道千山外东门', '青岛市第八人民医院(东院区)', '#80a492'],
          ['新城香溢紫郡二期西门', '青岛市第八人民医院(东院区)', '#8b7042'],
          ['卓越皇后道南门', '青岛市第八人民医院(东院区)', '#f3a694'],
          ['新城香溢紫郡一期南门', '青岛市第八人民医院(东院区)', '#f9d3e3'],
          ['和达璟城', '青岛市第八人民医院(东院区)', '#beb1aa'],
          ['上流和苑西门', '青岛市第八人民医院(东院区)', '#e5a84b'],
          ['海尔博悦兰庭南门', '青岛市第八人民医院(东院区)', '#c0d695'],
          ['万科生态城熙景北1门', '青岛市第八人民医院(东院区)', '#ba5b49'],
          ['万科生态城观澜西门', '青岛市第八人民医院(东院区)', '#f6bec8'],
          ['万科如园北门', '青岛市第八人民医院(东院区)', '#9aa7b1'],
          ['和达和城东门北', '青岛市第八人民医院(东院区)', '#d2af9d'],
        ]
        for (let i = 0; i < arrs.length; i++) {
          let item = arrs[i]
          let address1 = item[0]
          let address2 = item[1]
          let color = item[2]
          let name = item[3]
          setTimeout(() => {
            console.log("item", item[0], item[1],)
            search(address1, address2, WalkingOne, color, name)
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
        function search(name1, name2, WalkingOne, color, name) {
          let points = [
            {keyword: name1, city: '青岛'},
            {keyword: name2, city: '青岛'}
          ]
          console.log("points", points)
          WalkingOne.search(points, (status, result) => {
            // 未出错时，result即是对应的路线规划方案
            console.log(status, result, result.originName, color)
            if (status !== 'error') {
              drawRoute(result.routes[0], name, color)
            }
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
