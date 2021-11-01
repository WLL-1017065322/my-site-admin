import {get, post } from '../utils/request'


const queryBlogList = () => get('/articles')

export { queryBlogList }