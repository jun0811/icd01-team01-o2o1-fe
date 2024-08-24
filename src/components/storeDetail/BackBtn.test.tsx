import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import BackBtn from './BackBtn'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('BackBtn', () => {
  it('storeTitle이 올바르게 렌더링되는지 확인한다', () => {
    const mockBack = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({ back: mockBack })

    render(<BackBtn storeTitle="Test Store" />)

    expect(screen.getByText('Test Store')).toBeInTheDocument()
  })

  it('버튼 클릭 시 router.back()이 호출되는지 확인한다', () => {
    const mockBack = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({ back: mockBack })

    render(<BackBtn storeTitle="Test Store" />)

    fireEvent.click(screen.getByLabelText('Go back'))

    expect(mockBack).toHaveBeenCalled()
  })
})
