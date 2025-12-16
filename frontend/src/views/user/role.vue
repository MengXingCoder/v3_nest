<template>
    <div class="container">
        <el-button @click="getUser"> 获取</el-button>
        <div>

            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="id" label="Id" width="180" />
                <el-table-column prop="username" label="Name" width="180" />
                <el-table-column label="性别" width="100">
                    <template #default="scope">
                        <span v-if="scope.row.profile">
                            {{ scope.row.profile.gender === 1 ? '男' : scope.row.profile.gender === 2 ? '女' : '其他' }}
                        </span>
                        <span v-else>—</span>
                    </template>
                </el-table-column>
                <el-table-column label="角色">
                    <template #default="scope">
                        <el-tag v-for="role in scope.row.roles" :key="role.id" size="small" style="margin-right: 4px">
                            {{ role.name }}
                        </el-tag>
                        <span v-if="scope.row.roles.length === 0">—</span>
                    </template>
                </el-table-column>
            </el-table>

        </div>
    </div>
</template>
<script setup lang="ts">
import { getUsers } from '@/utils/http';
import { onBeforeMount, onMounted } from 'vue';
onBeforeMount(() => { });
onMounted(() => { });
interface User {
    id: number;
    username: string;
    profile: { gender: number } | null;
    roles: { id: number; name: string }[];
}
const tableData = ref<User[]>([]);
const getUser = async () => {
    const res = await getUsers()
    console.log('userinfo', res)
    tableData.value = (res as any).data || res;
}
</script>
<style lang="scss" scoped></style>
