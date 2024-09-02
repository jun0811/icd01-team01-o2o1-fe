import { OrderStatus } from '@/features/orderStatus/types'
import { create } from 'zustand'

interface OrderStatusStore {
  orderStatus: OrderStatus
  changeOrderStatus: (status: OrderStatus) => void
}

export const useOrderStatusStore = create<OrderStatusStore>()((set) => ({
  orderStatus: 'pending',
  changeOrderStatus: (status) => set({ orderStatus: status }),
}))