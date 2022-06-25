<script setup>
import useData from '../js/use-data'
import { reactive, onMounted, toRefs } from "vue"


const data = reactive({
  areaTree: [],
  showList: [],
  chinaDayList: [],
  chinaTotal: [],
  china: [],
  sgData: {},
  mapType: 1,
  lineType: 1,
  lastUpdateTime: '',
  name: '',
  type: 1
})
const { chinaTotal, sgData } = toRefs(data);

onMounted(() => {
  useData(data)
})

const tabChange = (type) => {
  data.type = type
}

const mapTypeChange = (type) => {
  data.mapType = type
}

</script>

<template>
  <div class="box">
    <div class="top-box">
      <img class="bg-img" src="../assets/images/virus.jpeg" alt="" />
      <div class="title-text">
        <h1>科学防护 共渡难关</h1>
        <h2>肺炎疫情实时动态播报</h2>
      </div>

      <div v-if="chinaTotal.total" class="cover-cards">
        <div class="cover-tab">
          <div @click="tabChange(1)" :class="{ active: data.type === 1 }">
            全国疫情数据(含港澳台)
          </div>
          <div @click="tabChange(2)" :class="{ active: data.type === 2 }">
            新加坡疫情数据
          </div>
        </div>

        <div v-show="data.type === 1" class="cover-info">
          <div>
            <h4 class="title">境外输入</h4>
            <p class="number">{{ chinaTotal.total.input }}</p>
            <p class="tip">
              较昨日
              <span>+{{ chinaTotal.today.input }}</span>
            </p>
          </div>
          <div>
            <h4 class="title">无症状感染者</h4>
            <p class="number">{{ chinaTotal.extData.noSymptom }}</p>
            <p class="tip">
              较昨日
              <span>+{{ chinaTotal.extData.incrNoSymptom }}</span>
            </p>
          </div>
          <div>
            <h4 class="title">现有确诊</h4>
            <p class="number">
              {{
                  chinaTotal.total.confirm -
                  chinaTotal.today.dead -
                  chinaTotal.today.heal
              }}
            </p>
            <p class="tip">
              较昨日
              <span>+{{ chinaTotal.today.storeConfirm }}</span>
            </p>
          </div>
          <div>
            <h4 class="title">累计确诊</h4>
            <p class="number">{{ chinaTotal.total.confirm }}</p>
            <p class="tip">
              较昨日
              <span>+{{ chinaTotal.today.confirm }}</span>
            </p>
          </div>
          <div>
            <h4 class="title">累计死亡</h4>
            <p class="number">{{ chinaTotal.total.dead }}</p>
            <p class="tip">
              较昨日
              <span>+{{ chinaTotal.today.dead }}</span>
            </p>
          </div>
          <div>
            <h4 class="title">累计治愈</h4>
            <p class="number">{{ chinaTotal.total.heal }}</p>
            <p class="tip">
              较昨日
              <span>+{{ chinaTotal.today.heal }}</span>
            </p>
          </div>
        </div>
        <div v-show="data.type === 2" class="cover-info">
          <div>
            <h4 class="title">累计确诊</h4>
            <p class="number">{{ sgData.total.confirm }}</p>
            <p class="tip">
              较昨日
              <span>+{{ sgData.today.confirm }}</span>
            </p>
          </div>
          <div>
            <h4 class="title">累计死亡</h4>
            <p class="number">{{ sgData.total.dead }}</p>
            <p class="tip">
              较昨日
              <span>+{{ sgData.today.dead }}</span>
            </p>
          </div>
          <div>
            <h4 class="title">累计治愈</h4>
            <p class="number">{{ sgData.total.heal }}</p>
            <p class="tip">
              较昨日
              <span>+{{ sgData.today.heal }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- echarts -->
    <div class="data-map content">
      <h3>中国疫情</h3>
      <div class="map-box">
        <div :class="data.mapType == 1 ? 'to-left' : 'to-right'" id="map"></div>
        <div :class="data.mapType == 1 ? 'to-left' : 'to-right'" id="map2"></div>
      </div>
      <div class="map-btn">
        <div @click="mapTypeChange(1)" :class="{ active: data.mapType == 1 }">
          现有确诊
        </div>
        <div @click="mapTypeChange(2)" :class="{ active: data.mapType == 2 }">
          累计确诊
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes toRight {
  from {
    left: 0;
  }

  to {
    left: calc(0px - 100vw + 1rem);
  }
}

@keyframes toLeft {
  from {
    left: calc(0px - 100vw + 1rem);
  }

  to {
    left: 0;
  }
}

.bg-img {
  width: 100%;
}

.top-box {
  position: relative;

  .title-text {
    position: absolute;
    z-index: 2;
    color: #fff;
    top: 20px;
    left: 1rem;
  }

  .cover-cards {
    position: absolute;
    top: 120px;
    background: #fff;
    border-radius: 20px;
    width: calc(100% - 2rem);
    left: 1rem;
    overflow: hidden;
    box-shadow: 0 2px 20px rgb(0 0 0 / 10%);

    >div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;

      &.cover-tab {

        //div.cover-tab{}
        >div {
          width: 50%;
          background: #efefef;
          text-align: center;
          height: 40px;
          line-height: 40px;

          &.active {
            background: #fff;
          }
        }
      }

      &.cover-info {
        >div {
          width: 33%;
          text-align: center;
          margin: 10px 0;

          &:nth-child(2) {

            .number,
            span {
              color: #ffa352;
            }
          }

          &:nth-child(3) {

            .number,
            span {
              color: #791618;
            }
          }

          &:nth-child(4) {

            .number,
            span {
              color: #e44a3d;
            }
          }

          &:nth-child(5) {

            .number,
            span {
              color: #333;
            }
          }

          &:nth-child(6) {

            .number,
            span {
              color: #34aa70;
            }
          }

          .title {
            font-size: 12px;
          }

          .number {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 5px 0;
            color: #a31d13;

            span {
              color: #a31d13;
            }
          }

          .tip {
            font-size: 12px;
          }
        }
      }
    }
  }
}

.data-map,
.data-list {
  // margin-top: 200px;
  overflow: hidden;

  h3 {
    border-left: 8px solid #e10000;
    padding-left: 1rem;
  }
}

.map-box {
  display: flex;
  width: 200%;
}

#line,
#line1,
#line2 {
  height: 400px;
  width: 100%;
}

#map,
#map2 {
  height: 350px;
  width: 50%;
  animation-fill-mode: forwards;
}

.to-left {
  animation: toLeft 1s;
}

.to-right {
  animation: toRight 1s;
}

#map {
  margin-right: 2rem;
  // position: relative;
}

.map-btn,
.line-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;

  >div {
    width: 45%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #d2d2d2;
    box-shadow: 0 5px 7px 1px rgb(0 0 0 / 5%);
    border-radius: 5px;
    text-align: center;

    &.active {
      border-color: #ce4733;
      background-color: #fef7f7;
      color: #ce2c1e;
    }
  }
}

.line-btn {
  >div {
    width: 30%;
    height: 55px;
    line-height: 25px;
    padding-top: 5px;
  }
}

.data-list {
  margin-top: 20px;
}
</style>