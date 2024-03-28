import { Action, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { LoadStatus, UserData } from '@core/types'
import {
  getUser,
  login,
  logout,
  signup,
  changeAvatar,
  changeProfileData,
  changePassword,
} from './user-thunks'
import { RootState } from '..'

type UserState = {
  currentUser: UserData | null
  status: LoadStatus
  error: string | null
}

const initialState: UserState = {
  currentUser: null,
  status: LoadStatus.INITIAL,
  error: null,
}

/**
 * Проверка action на 'pending'
 */
const isLoading = (action: Action) => action.type.endsWith('pending')

/**
 * Проверка action на 'rejected'
 */
const isError = (action: Action) => action.type.endsWith('rejected')

/**
 * Обработчик успешного действия с payload
 */
const onFulfilled = (state: UserState, action: PayloadAction<UserData>) => {
  state.status = LoadStatus.SUCCESS
  state.currentUser = action.payload
  state.error = null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUser.fulfilled, onFulfilled)
      .addCase(login.fulfilled, onFulfilled)
      .addCase(signup.fulfilled, onFulfilled)
      .addCase(changeProfileData.fulfilled, onFulfilled)
      .addCase(changeAvatar.fulfilled, onFulfilled)
      .addCase(changePassword.fulfilled, state => {
        state.status = LoadStatus.SUCCESS
        state.error = null
      })
      .addCase(logout.fulfilled, state => {
        state.status = LoadStatus.SUCCESS
        state.currentUser = null
        state.error = null
      })
      .addMatcher(isLoading, state => {
        state.status = LoadStatus.LOADING
        state.error = null
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.status = LoadStatus.ERROR
        state.error = action.payload
      })
  },
})

export const selectUser = (state: RootState) => state.user.currentUser

export const userReducer = userSlice.reducer
