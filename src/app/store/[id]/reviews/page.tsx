'use client'
import ReviewItem from '@/app/store/[id]/reviews/_components/ReviewItem'
import { useStoreReviewInfiniteQuery } from '@/features/reviews/hooks'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

export default function StoreReviewPage() {
  const params = useParams<{
    id: string
  }>()

  const router = useRouter()

  const { pages, storeName, isLoading } = useStoreReviewInfiniteQuery(params?.id || '')

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
      {isLoading && (
        <div className="flex h-screen w-full items-center justify-center">
          <p>로딩중...</p>
        </div>
      )}
      {pages &&
        pages.map((page) => {
          return page.response.reviews.map((review) => (
            <ReviewItem key={review.reviewId} review={review} />
          ))
        })}
    </div>
  )
}
