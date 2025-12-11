export interface getUserDto {
    page: number,
    limit?: number,
    username: string,
    role: string,
    gender: number
}

// // getUser.dto.ts
// import { IsOptional, IsInt, Min, IsString } from 'class-validator';
// import { Transform, Type } from 'class-transformer';

// export class GetUserDto {
//   @IsOptional()
//   @Type(() => Number)
//   @IsInt()
//   @Min(1)
//   page: number = 1;

//   @IsOptional()
//   @Type(() => Number)
//   @IsInt()
//   @Min(1)
//   limit: number = 10;

//   @IsOptional()
//   @IsString()
//   @Transform(({ value }) => (value === '' ? undefined : value)) // 空字符串转 undefined
//   username?: string;

//   @IsOptional()
//   @IsString()
//   @Transform(({ value }) => (value === '' ? undefined : value))
//   role?: string; 

//   @IsOptional()
//   @Type(() => Number)
//   @IsInt()
//   gender?: number;
// }
