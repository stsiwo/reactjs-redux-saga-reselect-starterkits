export type PageLinkType = {
  num: number
}

export type PaginationType = {
  curPage: number
  maxPage: number
  pageLinks: PageLinkType[]
}

export type PaginationPropsType = {
  onClick: React.EventHandler<React.MouseEvent<HTMLElement>>
} & PaginationType


