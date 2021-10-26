import React, { useState } from 'react'
import styled from 'styled-components'
import VideoBox__StickyTop from '../../VideoBoxes/Video__StickyTop'
import Fluid__iFrame from '../../iFrames/Fluid__iFrame'
import { useEffect } from 'react'
import { useRef } from 'react'
const BodyWrap = styled.div`
  min-height: 50vh;
  display: grid;
  grid-template-columns: ${(props) =>
    props.onlyVideo ? '100% 0%' : '66% 380px'};
  grid-template-rows: 100% 100%;
  background-color: ${(props) => props.theme.palette.background.primary};
  gap: 2rem;
  width: 100%;
  max-width: 1900px;
  margin: auto;
  justify-content: center;
  ${(props) => props?.styles?.wrap};
  @media all and (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`
const VideoBox = styled.div`
  height: 100%;
  width: 100%;
  transition: all 1500ms ease;
  display: flex;
  flex-direction: column;

  && .children {
    margin-top: 2rem;
  }

  @media all and (max-width: 1200px) {
    width: 96vw;
    margin: auto;
  }
`

const ChatBox = styled.div`
  height: clamp(550px, 100%, 700px);
  max-width: 450px;
  border: 2px solid rgba(203, 203, 203, 0.35);
  ${(props) => props?.styles?.chat};

  @media all and (max-width: 1200px) {
    max-width: 450px;
    width: 100%;
    margin: 0 auto;
  }
`
type PlayerWithChat__Props = {
  videoUrl: string
  chatUrl: string
  hasStarted: boolean
  children?: React.ReactNode
  videoComponent?: React.ReactNode
  chatComponent?: React.ReactNode
  styles?: {
    wrap?: any
    video?: any
    chat?: any
  }
}

const PlayerWithChat = ({
  videoUrl,
  chatUrl,
  hasStarted,
  children,
  videoComponent,
  chatComponent,
  styles,
}: PlayerWithChat__Props) => {
  const vidRef = useRef(null)
  const [onlyVideo, setOnlyVideo] = useState(true)

  useEffect(() => {
    if (!chatComponent && (!chatUrl || chatUrl === null)) {
      setOnlyVideo(true)
    } else {
      setOnlyVideo(false)
    }
    return () => {}
  }, [chatUrl])

  return (
    <BodyWrap onlyVideo={onlyVideo} styles={styles}>
      <VideoBox ref={vidRef}>
        <div className="video-holder">
          {videoComponent ? (
            videoComponent
          ) : (
            <VideoBox__StickyTop isStarted={hasStarted} src={videoUrl} />
          )}
        </div>
      </VideoBox>
      {!onlyVideo && (
        <ChatBox styles={styles}>
          {chatComponent ? (
            chatComponent
          ) : (
            <Fluid__iFrame src={chatUrl}></Fluid__iFrame>
          )}
        </ChatBox>
      )}
      <div className="children">{children}</div>
      <div> After Chat</div>
    </BodyWrap>
  )
}

export default PlayerWithChat
