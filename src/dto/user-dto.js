import Joi from 'joi';

export const UserProperty = {
    // userId: 숫자, 필수
    userId: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'userId는 숫자여야 합니다.',
            'any.required': 'userId가 비어있습니다.',
        }),

    // nickname: 필수, 한글 또는 영문만 허용, 최대 7자 이하
    nickname: Joi.string()
        .pattern(/^[a-zA-Z가-힣]+$/)  // 정규 표현식으로 한글 또는 영문만 허용
        .max(7)  // 최대 길이 7자 이하
        .required()  // 필수 필드
        .messages({
            'string.pattern.base': 'nickname은(는) 한글 또는 영문만 가능합니다.',
            'string.max': 'nickname은(는) 최대 7자 이하만 가능합니다.',
            'any.required': 'nickname이 비어있습니다.',
        }),

    // deviceId: 필수, 최대 36자 이하
    deviceId: Joi.string()
        .max(36)
        .required()
        .messages({
            'string.max': 'deviceId는 최대 36자 이하만 가능합니다.',
            'any.required': 'deviceId가 비어있습니다.',
        }),

    // code: userCode: 필수, 최대 8자 이하
    userCode: Joi.string()
        .max(8)
        .required()
        .messages({
            'string.max': 'userCode는 최대 8자 이하만 가능합니다.',
            'any.required': 'userCode가 비어있습니다.',
        })
};

export const UserSchema = {
    postUserDto: Joi.object({
        nickname: UserProperty.nickname,
        deviceId: UserProperty.deviceId
    }),
    postIdentifyUserDto: Joi.object({
        deviceId: UserProperty.deviceId
    }),

};