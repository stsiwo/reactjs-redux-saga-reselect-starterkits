// global app config
declare type appConfigType = {
  baseUrl: string
  debounceTime: number
}

export const appConfig: appConfigType = {
  baseUrl: "https://kitsu.io/api/edge",
  debounceTime: 500,
}
