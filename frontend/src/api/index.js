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

// 个人信息
export const getMyInfo = (data) => get('/users/info', data)
export const modifyMyInfo = (data) => put('/users/info', data)


// 批量
export const getBatch = (data) => get('/batch', data)
export const updateBatch = (data) => put('/batch', data)





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