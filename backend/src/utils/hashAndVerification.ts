import * as bcrypt from 'bcrypt';

// 加密密码
export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
}

// 验证密码
export async function verificationPassword(
    plainTextPassword: string,
    hashedPassword: string,
): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
}
