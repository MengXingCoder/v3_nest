<template>
  <div class="auth-container">
    <el-card class="auth-card" shadow="never">
      <div class="logo">
        <h2>欢迎登录</h2>
      </div>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        @submit.prevent="handleSubmit"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>

        <el-button type="primary" class="submit-btn" round native-type="submit">
          登录
        </el-button>
      </el-form>

      <div class="footer-link">
        <el-link type="primary" @click="$router.push('/register')">
          没有账号？去注册
        </el-link>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import axios from 'axios';

const router = useRouter();
const formRef = ref();

const form = reactive({
  username: '',
  password: '',
});

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

const handleSubmit = async () => {
  await formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      try {
        const res = await axios.post('/api/login', form);
        const token = res.data.token || res.data.access_token;

        localStorage.setItem('token', token);
        ElMessage.success('登录成功！');

        // 跳转首页
        router.push('/');
      } catch (err: any) {
        ElMessage.error(
          err.response?.data?.message || '登录失败，请检查用户名或密码'
        );
      }
    }
  });
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
  /* padding: 20px; */
}

.auth-card {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.logo h2 {
  text-align: center;
  margin-bottom: 28px;
  color: #333;
}

.submit-btn {
  width: 100%;
  margin-top: 16px;
  padding: 12px;
  font-size: 16px;
}

.footer-link {
  text-align: center;
  margin-top: 20px;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 24px;
  }
}
</style>
