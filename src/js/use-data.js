import * as echarts from 'echarts'
import chinaJson from "../assets/images/china.json"
import axios from "axios"

export default function useData(data) {


    let mapDom = document.getElementById("map")
    let mapDom2 = document.getElementById("map2")
    let myMap = echarts.init(mapDom)
    let myMap2 = echarts.init(mapDom2)
    let mapData = []
    let mapData2 = []

    echarts.registerMap("china", (chinaJson))

    let optionMap = {
        title: {//标题内容
            // text: '中国疫情图',
            subtext: "单击省份可查看病例数",
        },
        tooltip: {//提示框组件
            trigger: "item",//触发类型 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
            formatter: "确诊病例<br/>{b}: {c} ",//提示框浮层内容格式器，支持字符串模板和回调函数两种形式
            //  模板变量有 { a }, { b }，{ c }，{ d }，{ e }，分别表示系列名，数据名，数据值等。 在 trigger 为 'axis' 的时候，会有多个系列的数据，此时可以通过 { a0 }, { a1 }, { a2 } 这种后面加索引的方式表示系列的索引。 不同图表类型下的 { a }，{ b }，{ c }，{ d } 含义不一样。 其中变量{ a }, { b }, { c }, { d } 在不同图表类型下代表数据含义为：
            // 折线（区域）图、柱状（条形）图、K线图: { a }（系列名称），{ b }（类目值），{ c }（数值）, { d }（无）
            // 散点图（气泡）图: { a }（系列名称），{ b }（数据名称），{ c }（数值数组）, { d }（无）
            // 地图: { a }（系列名称），{ b }（区域名称），{ c }（合并数值）, { d }（无）
            // 饼图、仪表盘、漏斗图: { a }（系列名称），{ b }（数据项名称），{ c }（数值）, { d }（百分比）
        },
        visualMap: {
            show: false,
        },
    }
    let series = {
        type: "map",//
        map: "china",
        colorBy: "series",//按照系列分配调色盘中的颜色，同一系列中的所有数据都是用相同的颜色
        zoom: 1.3,//当前视角的缩放比例
        top: 80,//组件离容器上侧的距离
        label: {
            show: true,
            color: "#333",
            fontSize: 10,
        },
    }

    myMap.showLoading()
    axios("/api/ug/api/wuhan/app/data/list-total?t=330415245809").then(
        (res) => {
            console.log(res)

            data.areaTree = res.data.data.areaTree
            data.chinaTotal = res.data.data.chinaTotal
            data.sgData = data.areaTree.find((v) => v.id === "3")

            data.china = data.areaTree.find((v) => v.id === "0").children
            data.china.map((v) => {
                mapData.push({
                    name: v.name,
                    value: v.total.confirm - v.total.dead - v.total.heal || 0,
                })
                mapData2.push({
                    name: v.name,
                    value: v.total.confirm,
                })
            })
            myMap.hideLoading()

            myMap.setOption({
                ...optionMap,
                series: {
                    ...series,
                    data: mapData
                }
            })
            myMap2.setOption({
                ...optionMap,
                series: {
                    ...series,
                    data: mapData2
                }
            })
        })
}
