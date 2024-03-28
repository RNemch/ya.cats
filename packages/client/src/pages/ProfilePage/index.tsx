import { Background } from '@components/background'
import { Button } from '@components/button'
import { Center } from '@components/center'
import { Input } from '@components/input'
import { Modal } from '@components/modal'
import { Paper } from '@components/paper'
import { Space } from '@components/space'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { AvatarUpload } from './AvatarUpload'
import { EditPasswordModalContent } from './EditPasswordModalContent'

import { usePage } from '@hooks/use-page'
import { PageInitArgs } from '@routes'
import { selectUser } from '@store/user/user-slice'
import { Spinner } from '@components/spinner'
import { validation } from '@core/constants'
import { InputTypes, LoadStatus, UserProfileData } from '@core/types'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { changeProfileData, getUser } from '@store/user/user-thunks'
import styles from './styles.module.css'

const DEFAULT_VALUES = {
  first_name: '',
  second_name: '',
  login: '',
  email: '',
  phone: '',
  display_name: '',
}

const ProfilePage: FC = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserProfileData>({ defaultValues: DEFAULT_VALUES })

  const { currentUser, status } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  usePage({ initPage: initProfilePage })

  useEffect(() => {
    if (currentUser) {
      reset(currentUser)
    }
  }, [currentUser])

  const onSubmit: SubmitHandler<UserProfileData> = data => {
    dispatch(changeProfileData(data))
  }

  return (
    <Background>
      <Center>
        {status === LoadStatus.LOADING && <Spinner />}
        <Paper className={styles.container}>
          <Space align="center">
            <AvatarUpload />
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.inputs}>
                <Input
                  type={InputTypes.text}
                  label="Name"
                  placeholder="Name"
                  w="100%"
                  h="48px"
                  {...register('first_name', {
                    ...validation.first_name,
                  })}
                  errorMessage={errors.first_name?.message}
                />
                <Input
                  type={InputTypes.tel}
                  label="Phone"
                  placeholder="+0(000)000-00-00"
                  w="100%"
                  h="48px"
                  {...register('phone', { ...validation.phone })}
                  errorMessage={errors.phone?.message}
                />
                <Input
                  type={InputTypes.text}
                  label="Second name"
                  placeholder="Second name"
                  w="100%"
                  h="48px"
                  {...register('second_name', {
                    ...validation.second_name,
                  })}
                  errorMessage={errors.second_name?.message}
                />
                <Input
                  type={InputTypes.text}
                  label="Login"
                  placeholder="Login"
                  w="100%"
                  h="48px"
                  {...register('login', { ...validation.login })}
                  errorMessage={errors.login?.message}
                />
                <Input
                  type={InputTypes.text}
                  label="Display name"
                  placeholder="Display name"
                  w="100%"
                  h="48px"
                  {...register('display_name')}
                  errorMessage={errors.display_name?.message}
                />
                <Input
                  type={InputTypes.email}
                  label="Email"
                  placeholder="test@test.com"
                  w="100%"
                  h="48px"
                  {...register('email', { ...validation.email })}
                  errorMessage={errors.email?.message}
                />
              </div>
              <Button type="submit" color="orange">
                Edit
              </Button>
            </form>
            <Space className={styles.links} gap="8px" align="center">
              <button
                className={styles.link}
                onClick={() => setShowModal(true)}>
                Change password
              </button>
              <a className={styles.link} onClick={() => navigate(-1)}>
                Back
              </a>
            </Space>
          </Space>
        </Paper>
      </Center>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPasswordModalContent />
        </Modal>
      )}
    </Background>
  )
}

export const initProfilePage = async ({ dispatch, state }: PageInitArgs) => {
  if (!selectUser(state)) {
    return dispatch(getUser())
  }
}

export default ProfilePage
