'use client';

import React from 'react'
import { Button } from './Button'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/components/LanguageProvider'

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showFirstLast?: boolean
  siblingCount?: number
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({
    className,
    currentPage,
    totalPages,
    onPageChange,
    showFirstLast = true,
    siblingCount = 1,
    ...props
  }, ref) => {
    const { t } = useLanguage();
    
    const range = (start: number, end: number) => {
      const length = end - start + 1
      return Array.from({ length }, (_, i) => start + i)
    }

    const generatePagination = () => {
      const totalNumbers = siblingCount + 5
      const totalBlocks = totalNumbers + 2

      if (totalPages > totalBlocks) {
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

        const shouldShowLeftDots = leftSiblingIndex > 2
        const shouldShowRightDots = rightSiblingIndex < totalPages - 1

        const firstPageIndex = 1
        const lastPageIndex = totalPages

        if (!shouldShowLeftDots && shouldShowRightDots) {
          const leftItemCount = 3 + 2 * siblingCount
          const leftRange = range(1, leftItemCount)
          return [...leftRange, '...', totalPages]
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
          const rightItemCount = 3 + 2 * siblingCount
          const rightRange = range(totalPages - rightItemCount + 1, totalPages)
          return [1, '...', ...rightRange]
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
          const middleRange = range(leftSiblingIndex, rightSiblingIndex)
          return [1, '...', ...middleRange, '...', totalPages]
        }
      }

      return range(1, totalPages)
    }

    const paginationRange = generatePagination()

    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-center gap-2', className)}
        {...props}
      >
        {showFirstLast && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            {t("pagination.first")}
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {t("pagination.previous")}
        </Button>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="flex h-9 w-9 items-center justify-center text-sm text-hazelnut/60"
              >
                ...
              </span>
            )
          }

          return (
            <Button
              key={pageNumber}
              variant={currentPage === pageNumber ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(pageNumber as number)}
            >
              {pageNumber}
            </Button>
          )
        })}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {t("pagination.next")}
        </Button>
        {showFirstLast && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            {t("pagination.last")}
          </Button>
        )}
      </div>
    )
  }
)
Pagination.displayName = 'Pagination'

export { Pagination } 