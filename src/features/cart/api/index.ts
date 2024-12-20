import axiosInst from '@/lib/axiosInst'
import { OrderType, OrderResponse } from '../types'

export const order = async (formData: OrderType) => {
  const { data } = await axiosInst.post<OrderResponse>('/order', { ...formData })
  return data
}
