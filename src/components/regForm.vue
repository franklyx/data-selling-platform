<template>
  <div class="login-form">
    <div class="g-form-line">
      <span class="g-form-label">用户名:</span>
      <div class="g-form-input"><input type="text" placeholder="请输入用户名" v-model="usernameModel"></div>
    </div>
    <span class="g-form-error">{{ userErrors.errorText }}</span>
    <div class="g-form-line">
      <span class="g-form-label">密码:</span>
      <div class="g-form-input"><input type="text" placeholder="请输入密码" v-model="passwordModel"></div>
    </div>
    <span class="g-form-error">{{ passwordErrors.errorText }}</span>
    <div class="g-form-line">
      <span class="g-form-label">密码确认:</span>
      <div class="g-form-input"><input type="text" placeholder="请再次密码" v-model="passwordValidaModel"></div>
    </div>
    <span class="g-form-error">{{ passwordValidaErrors.errorText }}</span>
    <div class="g-form-line">
      <div class="g-form-btn">
        <a class="button" @click="registered">注册</a>
      </div>
    </div>
    <p>{{ errorText }}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      usernameModel: '',
      passwordModel: '',
      passwordValidaModel: '',
      errorText: ''
    }
  },
  computed: {
    userErrors () {
      let status, errorText
      if (!/@/g.test(this.usernameModel)) {
        status = false
        errorText = '必须包含@'
      } else {
        status = true
        errorText = ''
      }
      return {
        status,
        errorText
      }
    },
    passwordErrors () {
      let status, errorText
      if (!/^\w{1,6}$/g.test(this.passwordModel)) {
        status = false
        errorText = '密码不是1-6位'
      } else {
        status = true
        errorText = ''
      }
      return {
        status,
        errorText
      }
    },
    passwordValidaErrors () {
      let status, errorText
      if (this.passwordModel !== this.passwordValidaModel) {
        status = false
        errorText = '两次密码输入不一致'
      } else {
        status = true
        errorText = ''
      }
      return {
        status,
        errorText
      }
    }
  },
  methods: {
    registered () {
      if (!this.userErrors.status || !this.passwordErrors.status || !this.passwordValidaErrors.status) {
        this.errorText = '部分选项未通过'
      } else {
        this.errorText = ''
        this.$http.post('/api/register', {username: this.usernameModel, password: this.passwordModel}).then(
          (res) => {
            this.$emit('on-reg', res.data)
          },
          (err) => {
            console.log(err)
          }
        )
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .dialog-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .dialog-cover {
    background: #000;
    opacity: .3;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .dialog-content {
    width: 50%;
    position: fixed;
    max-height: 50%;
    overflow: auto;
    background: #fff;
    top: 20%;
    left: 50%;
    margin-left: -25%;
    z-index: 10;
    border: 2px solid #464068;
    padding: 2%;
    line-height: 1.6;
  }
  .dialog-close {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 20px;
    height: 20px;
    text-align: center;
    cursor: pointer;
  }
  .dialog-close:hover {
    color: #4fc08d;
  }
</style>
