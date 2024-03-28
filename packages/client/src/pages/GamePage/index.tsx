import { usePage } from '@hooks/use-page'
import { PageInitArgs } from '@routes'
import { selectUser } from '@store/user/user-slice'
import { getUser } from '@store/user/user-thunks'
import { Canvas } from '@mechanics/canvas'
import React, { FC, useState } from 'react'
import { FullpageButton } from './FullpageButton'
import GameOver from './GameOver'
import { GameStart } from './GameStart'

type GameStatus = 'start' | 'game' | 'end'

const GamePage: FC = () => {
  const [status, setStatus] = useState<GameStatus>('start')
  const [score, setScore] = useState<number>(0)

  usePage({ initPage: initGamePage })

  const handleGameStatus = (status: GameStatus) => setStatus(status)
  const handleScore = (points: number) => setScore(points)

  return (
    <React.Fragment>
      {status === 'game' && (
        <React.Fragment>
          <Canvas
            handleScore={handleScore}
            handleEnd={() => handleGameStatus('end')}
          />
          <FullpageButton />
        </React.Fragment>
      )}
      {status === 'start' && (
        <GameStart handleStart={() => handleGameStatus('game')} />
      )}
      {status === 'end' && (
        <GameOver score={score} handleReplay={() => handleGameStatus('game')} />
      )}
    </React.Fragment>
  )
}

export const initGamePage = async ({ dispatch, state }: PageInitArgs) => {
  if (!selectUser(state)) {
    return dispatch(getUser())
  }
}

export default GamePage
