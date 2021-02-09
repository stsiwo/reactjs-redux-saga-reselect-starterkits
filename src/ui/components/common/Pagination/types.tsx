export type PageLinkType = {
  num: number
}

export type PaginationType = {
  offset: number
  limit: number
  total: number
  btnNum: number
}

export type PaginationPropsType = {
  onClick: React.EventHandler<React.MouseEvent<HTMLElement>>
} & PaginationType


