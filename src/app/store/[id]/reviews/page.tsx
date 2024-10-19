'use client'
import ReviewItem from '@/app/store/[id]/reviews/_components/ReviewItem'
import { useStoreReviewInfiniteQuery } from '@/features/reviews/hooks'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import ReviewSkeleton from './_components/ReviewSkeleton'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import throttle from 'lodash.throttle'
import ExceptionScreen from '@/components/shared/ExceptionScreen/ExceptionScreen'

export default function StoreReviewPage() {
  const params = useParams<{
    id: string
  }>()

  const router = useRouter()

  const {
    pages,
    storeName,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    refetch,
  } = useStoreReviewInfiniteQuery(params?.id || '')

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 400 && hasNextPage) {
        fetchNextPage()
      }
    }, 300)

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [fetchNextPage, hasNextPage])

  if (isError) {
    return (
      <ExceptionScreen refetch={refetch} message="리뷰 정보를 불러오는 중 에러가 발생했습니다." />
    )
  }

  return (
    <div className="pb-20">
      <div className="flex items-center gap-3 p-4">
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault()
            router.back()
          }}
        >
          <ArrowLeftIcon width={24} height={24} />
        </Link>
        <p className="font-semibold">{storeName}</p>
      </div>
      {isLoading && <ReviewSkeleton />}
      {pages &&
        pages.map((page) => {
          return page.response.reviews.map((review) => (
            <ReviewItem key={review.reviewId} review={review} />
          ))
        })}
      {isFetchingNextPage && (
        <div className="fixed bottom-40 flex w-full justify-center">
          <LoadingSpinner size="md" />
        </div>
      )}
    </div>
  )
}
