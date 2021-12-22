import {get, post, del, put } from '../utils/request'

// 博客
export const queryBlogList = (data) => get('/articles/list', data)
export const queryBlogDetail = (data) => get('/articles/detail', data)
export const delBlog = (data) => del('/articles', data)
export const modifyBlog = (data) => put('/articles', data)
export const addBlog = (data) => post('/articles', data)

// 用户信息
export const queryUserList = (data) => get('/users/list', data)
export const delUser = (data) => del('/users', data)
export const modifyUser = (data) => put('/users', data)
export const addUser = (data) => post('/users', data)

// 标签
export const queryTagList = (data) => get('/tags', data)
export const delTag = (data) => del('/tags', data)
export const modifyTag = (data) => put('/tags', data)
export const addTag = (data) => post('/tags', data)

// 关键词
export const queryKeywordList = (data) => get('/keywords', data)
export const delKeyword = (data) => del('/keywords', data)
export const modifyKeyword = (data) => put('/keywords', data)
export const addKeyword = (data) => post('/keywords', data)

// 类型
export const queryTypeList = (data) => get('/types', data)
export const delType = (data) => del('/types', data)
export const modifyType = (data) => put('/types', data)
export const addType = (data) => post('/types', data)


// 个人信息
export const getMyInfo = (data) => get('/users/info', data)
export const modifyMyInfo = (data) => put('/users/info', data)


// 批量
export const getBatch = (data) => get('/batch', data)
export const updateBatch = (data) => put('/batch', data)


// 系统信息
export const getSysMsg = (data) => get('/info', data)

export const putSysMsg = (data) => put('/info', data)



export const login = (data) => post('/auth/login', data)


// export {
//     queryBlogList,
//     queryBlogDetail,
//     delBlog,
//     modifyBlog,
//     addBlog,
//     login,
//     queryUserList,
//     delUser,
//     modifyUser,
//     addUser,
//     modifyMyInfo,
//     getMyInfo,

//     getBatch
// }