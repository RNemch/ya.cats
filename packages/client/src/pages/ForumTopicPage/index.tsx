import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Background } from '@components/background'
import { Button } from '@components/button'
import { Center } from '@components/center'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import TopicController from '@controllers/topic-controller'
import { Topic } from '@core/types'
import { AddCommentForm } from './AddCommentForm'
import { TopicCommentsList } from './TopicCommentsList'

import styles from './styles.module.css'

const ForumTopicPage = () => {
  const [topic, setTopic] = useState<Topic>()
  const { topicId } = useParams()
  const navigate = useNavigate()

  const getTopic = async () => {
    if (topicId) {
      const data = await TopicController.getTopicById(+topicId)

      if (data) {
        setTopic(data)
      }
    }
  }

  useEffect(() => {
    getTopic()
  }, [])

  return (
    <Background>
      <Center>
        {topic && (
          <Space gap="40px" className={styles.container} flexAlign="center">
            {/*  className={styles.title} */}
            <Typography tag="h1" fontSize="xxl" align="center">
              {topic.topicName}
            </Typography>
            <TopicCommentsList comments={topic.comments} />
            <AddCommentForm />
            <Button onClick={() => navigate('/forum')}>Back</Button>
          </Space>
        )}
      </Center>
    </Background>
  )
}

export default ForumTopicPage
