import { FC, SyntheticEvent } from 'react'

import { Button } from '@components/button'
import { Input } from '@components/input'
import { Space } from '@components/space'
import { Typography } from '@components/typography'
import TopicController from '@controllers/topic-controller'
import { InputTypes, NewTopic } from '@core/types'

import styles from './styles.module.css'

const addNewTopic = async (data: NewTopic) => {
  await TopicController.addNewTopic(data)
}

const onSubmit = async (e: SyntheticEvent) => {
  e.preventDefault()

  const form = e.target as HTMLFormElement
  const formData = new FormData(form)

  const formJson = Object.fromEntries(formData.entries())

  try {
    await addNewTopic(formJson as NewTopic)
  } catch (error) {
    console.log(error)
  }
}

export const AddTopicModalContent: FC = () => {
  return (
    <Space gap="32px">
      <Typography align="center" tag="h2" fontSize="xl" color="white">
        Create new topic
      </Typography>

      <form onSubmit={onSubmit}>
        <Space gap="24px" className={styles.content} align="center">
          <Input
            type={InputTypes.text}
            label="Topic name"
            name="topicName"
            w="100%"
            h="48px"
          />

          <Button color="orange">Create</Button>
        </Space>
      </form>
    </Space>
  )
}
