import { useEffect } from 'react'
import { PageInitArgs } from '../routes'
import { useAppDispatch, useAppSelector, useAppStore } from '@store/hooks'
import {
  selectPageHasBeenInitializedOnServer,
  setPageHasBeenInitializedOnServer,
} from '@store/ssr/ssr-slice'

type PageProps = {
  initPage: (data: PageInitArgs) => Promise<unknown>
}

export const usePage = ({ initPage }: PageProps) => {
  const dispatch = useAppDispatch()
  const pageHasBeenInitializedOnServer = useAppSelector(
    selectPageHasBeenInitializedOnServer
  )
  const store = useAppStore()

  useEffect(() => {
    if (pageHasBeenInitializedOnServer) {
      dispatch(setPageHasBeenInitializedOnServer(false))
      return
    }
    initPage({ dispatch, state: store.getState() })
  }, [])
}
