import axios from 'axios'
import { IData } from '../types'

//https://peticiya-ua-server.vercel.app
//http://localhost:5000
export const getData = async (): Promise<IData | undefined> => {
    try {
        const response = await axios.get(`https://peticiya-ua-server.vercel.app/api/getData`)
        if (response) {
            if (response.data.success) {
                return (response.data.data as IData).sort((a, b) => a.dateTimestamp - b.dateTimestamp)
            }
        }
        return
    } catch (e) {
        return
    }
}