<template>
  <div class="login-components">
    <el-card class="box-card">
      <!-- 标题部分 -->
      <div slot="header" class="clearfix">
        <span>登录后台管理</span>
      </div>
      <!-- 表单部分 -->
      <el-tabs v-model="activeName" stretch type="border-card" @tab-click="handleClick">
        <!-- 登录区域 -->
        <el-tab-pane label="登录" name="login">
          <!-- 登录表单 -->
          <el-form
            :model="loginForm"
            status-icon
            :rules="rules"
            ref="loginForm"
            label-width="55px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model.trim="loginForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model.trim="loginForm.password"
                autocomplete="off"
                @keyup.native.enter="submitForm('loginForm')"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
              <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 注册区域 -->
        <el-tab-pane label="注册" name="register">
          <!-- 注册表单 -->
          <el-form
            :model="registerForm"
            status-icon
            :rules="rules"
            ref="registerForm"
            label-width="70px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input
                type="text"
                v-model.trim="registerForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model.trim="registerForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="proofread">
              <el-input
                type="password"
                v-model.trim="registerForm.proofread"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input
                type="password"
                v-model.trim="registerForm.email"
                autocomplete="off"
                @keyup.native.enter="submitForm('registerForm')"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
              <el-button @click="resetForm('registerForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'MyLogin',
  data() {
    // 验证规则
    var checkName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名!'))
      } else {
        callback()
      }
    }
    var checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码!'))
      } else if (value.length < 3) {
        callback(new Error('密码长度不能少于3位!'))
      } else {
        callback()
      }
    }
    var checkPass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码!'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var checkEmail = (rule, value, callback) => {
      var reg = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/
      if (value === '') {
        callback(new Error('请输入邮箱!'))
      } else if (!reg.test(value)) {
        callback(new Error("邮箱必须由大小写字母，数字, '_-@'组成"))
      } else {
        callback()
      }
    }
    return {
      activeName: 'login',
      activeTab: 'login',
      loginForm: {
        username: '',
        password: '',
      },
      registerForm: {
        username: '',
        password: '',
        proofread: '',
        email: '',
      },
      rules: {
        username: [{ validator: checkName, trigger: 'blur' }],
        password: [{ validator: checkPass, trigger: 'blur' }],
        proofread: [{ validator: checkPass2, trigger: 'blur' }],
        email: [{ validator: checkEmail, trigger: 'blur' }],
      },
    }
  },
  methods: {
    ...mapMutations('login', ['setUser']),
    // tab栏切换
    handleClick(tab) {
      this.activeTab = tab.name
    },
    // 封装 登录 的请求
    http(nameForm) {
      this.$http.login(nameForm).then(res => {
        // 登录成功
        let obj = {
          username: res.data.username,
          token: res.data.token,
        }
        if (res.data.status === 200) {
          // 存储到 vuex
          this.setUser(obj)
          // 存储到本地
          localStorage.setItem('egotoken', JSON.stringify(obj))
          this.$message({
            showClose: true,
            message: '登录成功',
            type: 'success',
          })
          this.$router.push('/home')
        } // 登录失败
        else {
          this.$message({
            showClose: true,
            message: '登录失败, 用户名或密码错误',
            type: 'error',
          })
        }
      })
    },
    // 登录/注册 事件
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 发起 登录 请求
          if (this.activeTab === 'login') {
            this.http(this.loginForm)
          }
          // 发起 注册 请求
          if (this.activeTab === 'register') {
            this.$http.register(this.registerForm).then(res => {
              if (res.data.status === 200) {
                this.$confirm("点击 '确定' 直接登录", '注册成功!', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                })
                  .then(() => {
                    // 注册后 可执行登录操作
                    this.http(this.registerForm)
                  })
                  .catch(() => {
                    this.$message({
                      message: '已完成注册! 可前往登录!',
                      type: 'success',
                    })
                    this.$refs[formName].resetFields()
                  })
              } else {
                this.$message({
                  message: '注册失败, 请重新注册',
                  type: 'error',
                })
              }
            })
          }
        } else {
          return false
        }
      })
    },
    // 点击 重置 事件
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="less" scoped>
.login-components {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: cadetblue;
  .box-card {
    width: 500px;
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: whitesmoke;
  }
}
</style>
