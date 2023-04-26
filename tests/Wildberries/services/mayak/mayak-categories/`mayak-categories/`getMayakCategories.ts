/* eslint-disable no-console */
import axios from 'axios'

import { API_HOST, from_date, to_date, period, Cookie } from './`Mayak-options'

export default getMayakCategories

export interface GetMayakCategoriesOpts {
    groupId: null | number
    fbs: boolean
}
type getMayakCategories = typeof getMayakCategories
async function getMayakCategories(options: GetMayakCategoriesOpts): Promise<unknown> {
    const { groupId, fbs } = options

    const { data } = await axios.get(`${API_HOST}/wb/categories/details`, {
        params: {
            wb_group_id: groupId,
            fbs: fbs.toString(),
            from_date,
            to_date,
            period,
            favourite: '',
        },
        headers: { Cookie },
    })

    if (!data.categories) {
        throw Error('Auth')
    }

    return data.categories
}
