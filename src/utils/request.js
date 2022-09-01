
import axios from "axios";

const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/'
})

export const get2 = (path, options = {}) => {
    return request.get(path, options)
        .then(res => {
            return res.data
        })
}
export default request