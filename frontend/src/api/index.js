import {get, post, del, put } from '../utils/request'


const queryBlogList = (data) => get('/articles/list', data)
const queryBlogDetail = () => get('/articles')
const delBlog = () => del('/articles')
const modifyBlog = () => put('/articles')
const addBlog = () => post('/articles')

export { queryBlogList, queryBlogDetail, delBlog, modifyBlog, addBlog }