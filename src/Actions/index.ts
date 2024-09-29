import axios from 'axios'
import { IDataResponse } from '../types'

const axiosInstance = axios.create();

export const getData = async (data: {
    petitionId: number
    pageNumber: number
}): Promise<IDataResponse | undefined> => {
    const { petitionId, pageNumber } = data
    try {
        const response = await axiosInstance.get(`https://petition.president.gov.ua/petition/${petitionId}/votes/${pageNumber}/json`)
        if (response) {
            return response.data
        }
        return
    } catch (e) {
        return
    }
}