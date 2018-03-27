<template>
  <div class="sales-board">
    <div class="sales-board-intro">
      <h2>流量分析</h2>
      <p>
        是指在获得网站访问量基本数据的情况下对有关数据进行统计、分析，从中发现用户访问网站的规律，并将这些规律与网络营销策略等相结合，从而发现目前网络营销活动中可能存在的问题，并为进一步修正或重新制定网络营销策略提供依据。当然这样的定义是站在网络营销管理的角度来考虑的</p>
    </div>
    <div class="sales-board-form">
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          购买数量:
        </div>
        <div class="sales-board-line-right">
          <v-counter @on-change="onParamChange('buyNum', $event)"></v-counter>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          产品类型:
        </div>
        <div class="sales-board-line-right">
          <v-selection @on-change="onParamChange('buyType', $event)" :selections="buyTypes"></v-selection>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          有效时间:
        </div>
        <div class="sales-board-line-right">
          <v-chooser @on-change="onParamChange('period', $event)" :selections="periodList"></v-chooser>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          产品版本:
        </div>
        <div class="sales-board-line-right">
          <v-mul-chooser @on-change="onParamChange('versions', $event)" :selections="versionList"></v-mul-chooser>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          总价:
        </div>
        <div class="sales-board-line-right">
          {{price}}
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left"></div>
        <div class="sales-board-line-right">
          <div class="button" @click="showPayDialog">立即购买</div>
        </div>
      </div>
    </div>
    <div class="sales-board-des">
      <h2>产品说明</h2>
      <p>网站访问统计分析报告的基础数据源于网站流量统计信息，但其价值远高于原始数据资料。专业的网站访问统计分析报告对网络营销的价值，正如专业的财务分析报告对企业经营策略的价值。</p>
      <h3>用户行为指标</h3>
      <ul>
        <li>用户行为指标主要反映用户是如何来到网站的、在网站上停留了多长时间、访问了哪些页面等，主要的统计指标包括：</li>
        <li>用户在网站的停留时间；</li>
        <li>用户来源网站（也叫“引导网站”）；</li>
        <li>用户所使用的搜索引擎及其关键词；</li>
        <li>在不同时段的用户访问量情况等。</li>
      </ul>

      <h3>浏览网站方式</h3>
      <ul>
        <li>用户上网设备类型</li>
        <li>用户浏览器的名称和版本</li>
        <li>访问者电脑分辨率显示模式</li>
        <li>用户所使用的操作系统名称和版本</li>
        <li>用户所在地理区域分布状况等</li>
      </ul>
    </div>
    <my-dialog :is-show="isShowPayDialog" @on-close = 'hidePayDialog'>
      <table class="buy-dialog-table">
        <tr>
          <th>购买数量</th>
          <th>产品类型</th>
          <th>有效时间</th>
          <th>产品版本</th>
          <th>总价</th>
        </tr>
        <tr>
          <td> {{buyNum}}</td>
          <td> {{buyType.label}} </td>
          <td> {{period.label}} </td>
          <td><span v-for="item in versions" :key="item.id">{{item.label}}</span> </td>
          <td> {{ price }} </td>
        </tr>
      </table>
      <h3>请选择银行</h3>
      <bank-chooser></bank-chooser>
      <div class="button buy-dialog-btn" @click="confirmBuy">确认购买</div>
    </my-dialog>
    <my-dialog :is-show="isShowErrDialog" @on-close="hideErrDialog">
      支付失败
    </my-dialog>
    <check-order :is-show-check-dialog="isShowCheckOrder" :order-id="orderId" @on-close-check-dialog="hideCheckOrder"></check-order>
  </div>
</template>

<script>
import VSelection from '../../components/base/selelction'
import VCounter from '../../components/base/counter'
import VChooser from '../../components/base/chooser'
import VMulChooser from '../../components/base/multiplyChooser'
import Dialog from '../../components/base/dialog'
import CheckOrder from '../../components/checkOrder'
import BankChooser from '../../components/bankChooser'
import _ from 'lodash'
export default {
  created () {
    this.getPrice()
  },
  components: {
    VSelection,
    VCounter,
    VChooser,
    VMulChooser,
    MyDialog: Dialog,
    CheckOrder,
    BankChooser
  },
  data () {
    return {
      price: 0,
      buyNum: 1,
      buyType: {
        label: '入门版',
        value: 0
      },
      versions: [
        {
          label: '客户版',
          value: 0
        }
      ],
      period: {
        label: '半年',
        value: 0
      },
      versionList: [
        {
          label: '客户版',
          value: 0
        },
        {
          label: '代理商版',
          value: 1
        },
        {
          label: '专家版',
          value: 2
        }
      ],
      periodList: [
        {
          label: '半年',
          value: 0
        },
        {
          label: '一年',
          value: 1
        },
        {
          label: '三年',
          value: 2
        }
      ],
      buyTypes: [
        {
          label: '入门版',
          value: 0
        },
        {
          label: '中级版',
          value: 1
        },
        {
          label: '高级版',
          value: 2
        }
      ],
      isShowPayDialog: false,
      isShowCheckOrder: false,
      isShowErrDialog: false,
      bankId: null,
      orderId: null
    }
  },
  methods: {
    onParamChange (key, val) {
      this[key] = val
      this.getPrice()
    },
    getPrice () {
      let buyVersionArray = _.map(this.versions, (item) => {
        return item.value
      })
      let reqParams = {
        buyNumber: this.buyNum,
        buyType: this.buyType.value,
        period: this.period.value,
        version: buyVersionArray.join(',')
      }
      console.log(reqParams)
      // 网络请求版
      // this.$http.post('/api/getPrice', reqParams).then(
      //   (res) => {
      //     this.price = res.data
      //   }, // 暂时忽略错误的返回结果
      //   (err) => {
      //     console.log(err)
      //     this.price = 1000
      //   }
      // )
      // 本地计算版
      this.calculatePrice(reqParams)
    },
    calculatePrice (params) {
      let totalPrice, num, type, period, version
      num = params.buyNumber
      if (params.buyType === 0) {
        type = 10
      } else if (params.buyType === 1) {
        type = 20
      } else {
        type = 30
      }
      if (params.period === 0) {
        period = 1
      } else if (params.period === 1) {
        period = 2
      } else {
        period = 3
      }
      version = 0
      if (params.version.indexOf('0') > -1) {
        version += 1
      }
      if (params.version.indexOf('1') > -1) {
        version += 2
      }
      if (params.version.indexOf('2') > -1) {
        version += 3
      }
      totalPrice = num * type * period * version
      this.price = totalPrice
    },
    showPayDialog () {
      this.isShowPayDialog = true
    },
    hidePayDialog () {
      this.isShowPayDialog = false
    },
    hideErrDialog () {
      this.isShowErrDialog = false
    },
    hideCheckOrder () {
      this.isShwoCheckOrder = false
    },
    confirmBuy () {
      console.log('paing ....')
      // 请求真正的支付接口
      this.isShowCheckOrder = true
      this.isShowPayDialog = false
    }
  }
}
</script>

<style scoped>

</style>
