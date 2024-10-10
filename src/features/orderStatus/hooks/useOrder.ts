import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getOrderList } from '../api'

const useOrder = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrderList,
  })

  console.log(data)

  return {
    orders: data?.response.orders,
    isLoading,
  }
}

export default useOrder
