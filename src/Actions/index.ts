import axios from 'axios'
import { IDataResponse } from '../types'

export const getData = async (data: {
    petitionId: number
    pageNumber: number
}): Promise<IDataResponse | undefined> => {
    const { petitionId, pageNumber } = data
    try {
        const response = await axios.get(`/petition/${petitionId}/votes/${pageNumber}/json`)
        if (response) {
            return response.data
        }
        return
    } catch (e) {
        return
    }
}