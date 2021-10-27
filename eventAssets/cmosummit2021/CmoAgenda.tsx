import React from 'react'
import styled from 'styled-components'
import useGetAgenda from 'hooks/queryHooks/useGetAgenda'

const StyledWrap = styled.div``

const CmoAgenda = ({ eventUrl }) => {
  const { error, loading, data } = useGetAgenda(eventUrl)

  if (loading) {
    return <p>Loading....</p>
  }
  if (error) {
    return <div>{JSON.stringify(error)}</div>
  }
  if (data) {
    return <StyledWrap>{JSON.stringify(data)}</StyledWrap>
  }
}

export default CmoAgenda
