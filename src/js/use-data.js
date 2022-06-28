import * as echarts from 'echarts'
import chinaJson from "../assets/images/china.json"
import axios from "axios"

export default async function useData(data) {

    let mapDom = document.getElementById("map")
    let mapDom2 = document.getElementById("map2")
    let myMap = echarts.init(mapDom)
    let myMap2 = echarts.init(mapDom2)
    let mapData = []
    let mapData2 = []

    echarts.registerMap("china", chinaJson)

    let mapOption = {
        title: {
            subtext: "单击省份可查看病例数"
        },
        tooltip: {
            trigger: "item",//触发类型 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
            formatter: "确诊病例<br/>{b}: {c} ",//提示框浮层内容格式器，支持字符串模板和回调函数两种形式
        },
        visualMap: {
            show: false,
        }
    }

    let series = {
        type: "map",
        map: "china",
        colorBy: "series",//按照系列分配调色盘中的颜色，也可以在data里加color属性自己配
        zoom: 1.3,//当前视角的缩放比例
        top: 80,
        label: {
            show: true,
            color: "#333",
            fontSize: 10,
        }
    }

    myMap.showLoading()
    let res = await axios("/api/ug/api/wuhan/app/data/list-total?t=330415245809")
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
        ...mapOption,
        series: {
            ...series,
            data: mapData
        }
    })

    myMap2.setOption({
        ...mapOption,
        series: {
            ...series,
            data: mapData2
        }
    })
}
