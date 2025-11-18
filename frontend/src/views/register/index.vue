<template>
  <div class="auth-container">
    <el-card class="auth-card" shadow="never">
      <div class="logo">
        <h2>注册账号</h2>
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

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码（至少6位）"
            show-password
          />
        </el-form-item>

        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="form.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            show-password
          />
        </el-form-item>

        <el-button type="primary" class="submit-btn" round native-type="submit">
          注册
        </el-button>
      </el-form>

      <div class="footer-link">
        <el-link type="primary" @click="$router.push('/login')">
          已有账号？去登录
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
import type { FormItemRule, FormRules } from 'element-plus';

const router = useRouter();
const formRef = ref();

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const validateConfirmPassword = (
  rule: FormItemRule,
  value: string,
  callback: (error?: string | Error | string[]) => void
) => {
  if (value !== form.password) {
    callback(new Error('两次输入的密码不一致'));
  } else {
    callback();
  }
};

const rules = reactive<FormRules>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码不能少于6位', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' },
  ],
});

const handleSubmit = async () => {
  await formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      try {
        await axios.post('/api/register', {
          username: form.username,
          email: form.email,
          password: form.password,
        });
        ElMessage.success('注册成功！请登录');
        router.push('/login');
      } catch (err: any) {
        ElMessage.error(
          err.response?.data?.message || '注册失败，用户名或邮箱可能已被占用'
        );
      }
    }
  });
};
</script>

<style scoped>
/* 样式与登录页完全一致 */
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 20px;
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
