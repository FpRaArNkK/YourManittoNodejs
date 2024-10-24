import { ConstantResponseStatus, StatusCodes } from '../../common/index.js';
import { sendResponse, throwError } from '../../common/response-helper.js';
import { createUser, searchUser } from '../service/user-service.js';
import { UserSchema } from '../dto/user-dto.js';
import asyncHandler from 'express-async-handler';

export const UserController = {
    postUser: asyncHandler(async (req, res) => {
        const { error, value } = UserSchema.postUserDto.validate(req.body);  // Joi 스키마를 사용한 유효성 검사
        if (error) { throwError(StatusCodes.BAD_REQUEST, error.details[0].message); } // 유효성 검사 에러 발생 시
        const { nickname, deviceId } = value; // Joi 검증을 통과한 유효한 데이터 추출
        const userCode = await createUser(nickname, deviceId); // 서비스에서 유저 생성 로직 처리
        return sendResponse(res, ConstantResponseStatus.CREATED, { "userCode": userCode });
    }),
    postIdentifyUser: asyncHandler(async (req, res) => {
        const { error, value } = UserSchema.postIdentifyUserDto.validate(req.body);
        if (error) { throwError(StatusCodes.BAD_REQUEST, error.details[0].message); }
        const { deviceId } = value;
        const user = await searchUser(deviceId);
        return sendResponse(res, ConstantResponseStatus.SUCCESS, { "userCode": user.code });
    })
};