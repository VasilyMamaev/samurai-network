import React, { useState } from 'react'
import classes from './paginator.module.css'

type PropsType = {
  totalCount: number
  usersAtPageCount: number
  currentPage: number
  onPageClick: (page: number, portionNumber: number) => void
  portionSize?: number
  pagePortion: number
}

const Paginator: React.FC<PropsType> = React.memo(({totalCount, usersAtPageCount, currentPage, onPageClick, portionSize = 10, pagePortion}) => {
  
  let pagesCount = Math.ceil(totalCount / usersAtPageCount)
  let pages = []

  for (let i = 1; i <= pagesCount; i++ ) {
    pages.push(i)
  }

  const portionCount = Math.ceil(pagesCount / portionSize)
  const [portionNumber, setPortionNumber] = useState(pagePortion)
  const leftPortionPage = (portionNumber - 1) * portionSize + 1
  const rightPortionPage = leftPortionPage + portionSize

  return (
    <div>
      {portionNumber > 1 ?
      <button className={classes.pageBtn} onClick={() => {setPortionNumber(portionNumber - 1)}}>previous</button>
      : null}
      { pages.filter(p => p >= leftPortionPage && p <= rightPortionPage).map((page) => {
        return <span 
          key={page}
          className={page === currentPage ? classes.selectedPage : classes.unselectedPage}
          onClick={() => {onPageClick(page, portionNumber)}}
        >{page},</span>
        })
      }
      {portionCount > portionNumber ?
      <button className={classes.pageBtn} onClick={() => {setPortionNumber(portionNumber + 1)}}>next</button>
      : null}
    </div>
  )
})

export default Paginator
