import useGetMemberAddress from '@/features/member/hooks/useGetMemberAddress'
import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'
import { getStoreList } from '../api'
import useInfinityScroll from './useInfinityScroll'

interface useGetStoreList {
  category?: string
  keyword?: string
}

const useGetStoreList = ({ category, keyword }: useGetStoreList) => {
  const {
    data: addressData,
    isError: isAddressError,
    refetch: addressRefetch,
  } = useGetMemberAddress()

  const mainAddress = addressData?.addresses.find((address) => address.addressStatus === 'main')

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, isError, refetch } =
    useInfiniteQuery({
      queryKey: ['storeList', category, keyword],
      queryFn: ({ pageParam }) =>
        getStoreList({
          address: {
            latitude: mainAddress!!.latitude,
            longitude: mainAddress!!.longitude,
            address: mainAddress!!.address,
            addressDetail: '지하 1층',
            zipCode: '04536',
          },
          page: pageParam,
          category,
          keyword,
        }),
      enabled: !!mainAddress,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      staleTime: 0,
    })

  const { scrollPos } = useInfinityScroll({
    fetchNextPage,
    hasNextPage,
  })

  const refetchStoreList = () => {
    addressRefetch()
    refetch()
  }

  return {
    pages: data?.pages,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isError: isError || isAddressError,
    scrollPos,
    refetch: refetchStoreList,
  }
}

export default useGetStoreList
