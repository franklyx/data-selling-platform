<template>
<div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
  <div class="slide-img">
    <a :href="slides[nowIndex].href">
      <transition name="slide-trans">
        <img :src="slides[nowIndex].src" v-if="isShow">
      </transition>
      <transition name="slide-trans-old">
        <img :src="slides[nowIndex].src" v-if="!isShow">
      </transition>
    </a>
  </div>
  <h2>{{ slides[nowIndex].title }}</h2>
  <ul class="slide-pages">
    <li @click="goTo(prevIndex)">&lt;</li>
    <li v-for="(item, index) in slides" @click="goTo(index)" :key="item.id">
      <a :class="{on : index === nowIndex}">{{ index + 1 }}</a>
    </li>
    <li @click="goTo(nextIndex)">&gt;</li>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      default () {
        return []
      }
    },
    inv: {
      type: Number,
      default () {
        return 1000
      }
    }
  },
  data () {
    return {
      nowIndex: 0,
      isShow: true
    }
  },
  computed: {
    prevIndex () {
      if (this.nowIndex === 0) {
        return this.slides.length - 1
      } else {
        return this.nowIndex - 1
      }
    },
    nextIndex () {
      if (this.nowIndex === this.slides.length - 1) {
        return 0
      } else {
        return this.nowIndex + 1
      }
    }
  },
  methods: {
    goTo (index) {
      this.isShow = false
      setTimeout(() => {
        this.isShow = true
        this.nowIndex = index
      }, 10)
    },
    runInv () {
      this.invId = setInterval(() => {
        this.goTo(this.nextIndex)
      }, this.inv)
    },
    clearInv () {
      clearInterval(this.invId)
    }
  },
  // 初始化轮播图
  mounted () {
    this.runInv()
  }
}
</script>

<style scoped>
  .slide-trans-enter-active {
    transition: all .5s;
  }

  .slide-trans-enter {
    transform: translateX(900px);
  }

  .slide-trans-old-leave-active {
    transition: all .5s;
    transform: translateX(-900px);
  }

  .slide-show {
    position: relative;
    margin: 15px 0 15px 20px;
    width: 880px;
    height: 500px;
    overflow: hidden;
  }

  .slide-show h2 {
    position: absolute;
    width: 100%;
    color: #fff;
    background: #000;
    opacity: .5;
    bottom: 0;
    height: 30px;
    line-height: 30px;
    text-align: left;
    padding-left: 15px;
  }

  .slide-img {
    width: 100%;
  }

  .slide-img img {
    width: 100%;
    position: absolute;
    top: 0;
  }

  .slide-pages {
    position: absolute;
    bottom: 10px;
    right: 15px;
  }

  .slide-pages li {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    color: #fff;
  }

  .slide-pages li .on {
    text-decoration: underline;
  }
</style>
