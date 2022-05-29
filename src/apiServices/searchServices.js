import * as request from '~/utils/request';
//  ctrl shift z để hoàn tác lại thao tác vừa hoàn tác

export const search = async (q, type = 'less') => {
    try {
        const res = await request.get2('users/search', {
            params: {
                q,
                type
            }
        });
        return res.data;
    } catch (err) {
        console.log(err)        
    }
}

//  request.get2(`users/search`, {
//             params: {
//                 q: debounced,
//                 type: 'less'
//             }
//         })
//         .then(res => {
//             // console.log(res.data)
//             setSearchResult(res.data)
//             setLoading(false)
//         })
//         .catch(() => {
//             setLoading(false)
//         })