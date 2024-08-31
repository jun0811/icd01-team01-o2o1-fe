'use client'

import React from 'react'
import ImageUploader from './ImageUploader'
import Rating from './Rating'
import usePostReview from '@/features/reviews/hooks/usePostReview'

const ReviewForm = () => {
  const { postReview, isPending } = usePostReview()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const rating = formData.get('rating')
    const content = formData.get('content')

    postReview({
      rating: Number(rating),
      contents: content as string,
      reviewImages: [],
    })
  }

  return (
    <form className="px-10" onSubmit={handleSubmit}>
      <p className="mb-4 font-semibold">삼청당 고대안암점</p>
      <Rating />
      <textarea
        name="content"
        className="mb-4 h-40 w-full resize-none rounded border border-gray-300 p-4"
        placeholder="리뷰를 작성해주세요."
      ></textarea>
      <ImageUploader />
      <button
        className="absolute bottom-0 left-0 z-[100] h-24 w-full bg-main text-xl font-semibold text-white"
        type="submit"
      >
        등록하기
      </button>
    </form>
  )
}

export default ReviewForm
