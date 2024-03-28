import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Background } from '@components/background'
import { Button } from '@components/button'
import { CatImage } from '@components/catImage'
import { Center } from '@components/center'
import { Paper } from '@components/paper'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import LeaderBoardTable from './LeaderBoardTable'

import { usePage } from '@hooks/use-page'
import { PageInitArgs } from '@routes'
import { selectUser } from '@store/user/user-slice'
import { getUser } from '@store/user/user-thunks'
import styles from './styles.module.css'

const LeaderBoardPage: FC = () => {
  const navigate = useNavigate()

  usePage({ initPage: initLeaderBoardPage })

  return (
    <Background>
      <Center>
        <Space className={styles.container} gap="40px">
          <Space className={styles.titleWrapper}>
            <CatImage />
            <Typography
              tag="h1"
              align="center"
              fontSize="xxl"
              color="grey-with-shadow">
              Leaderboard
            </Typography>
          </Space>

          <Paper className={styles.table}>
            <LeaderBoardTable />
          </Paper>

          <Button onClick={() => navigate(-1)}>Back</Button>
        </Space>
      </Center>
    </Background>
  )
}

export const initLeaderBoardPage = async ({
  dispatch,
  state,
}: PageInitArgs) => {
  if (!selectUser(state)) {
    return dispatch(getUser())
  }
}

export default LeaderBoardPage
