import React from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import DateParse from 'components/__Assets__/DateParse'
import { LoadingDiv, LoadingImage } from 'components/Loading'
const SingleScheduleDay = styled.div`
  padding: 1rem;
  text-align: left;
`
const Item = styled.ul`
  margin: 0;
  padding: 0;
  && .title--wrap {
    margin-bottom: 0.5rem;
  }
  && hr {
    width: 65%;
    margin: 0.5rem 0;
  }
  &&.loading {
    height: 2.5rem;
    width: 80%;
    margin: 1rem auto 0rem auto;
    line-height: auto;
  }
`
const Item__Time = styled.div`
  display: inline;
  font-weight: 800;
  margin-right: 0.5rem;
  color: #3e3e3e;
`
const Item__Title = styled.div`
  display: inline;
  font-weight: 800;
  color: #3e3e3e;
`
const SubItem = styled.li`
  list-style: none;
  margin: 0 0 1rem 0rem;
  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: 200;
  padding: 0;
  color: ${(props) => props.theme.colors.grey || '#3e3e3e'};
  && span.title {
    color: ${(props) => props.theme.colors.secondary};
    font-weight: 200;
    display: block;
  }
  && ul {
    padding: 5px;
  }
`

const ListAgenda = ({ data }) => {
  return (
    <SingleScheduleDay>
      <h3>{data.name} Agenda</h3>
      {data?.items.map((item, index) => {
        if (!item.title) {
          return null
        } else {
          const itemHtml = item.presenter.replace(/\\/gi, '<br />')
          return (
            <Item key={`${item.title}--${index}`}>
              <hr />
              <div className="title--wrap">
                {item.start && (
                  <Item__Time>
                    <DateParse date={item.start} format={`h:mma`} />
                  </Item__Time>
                )}
                <Item__Title> {item.title}</Item__Title>
              </div>
              <SubItem>
                <ReactMarkdown
                  children={item.presenter}
                  components={{
                    p: ({ node, ...props }) => <div {...props} />,
                  }}
                />
              </SubItem>
            </Item>
          )
        }
      })}
    </SingleScheduleDay>
  )
}

const ListAgenda__Loading = ({ number = 10 }) => {
  const number_array = Array.from(Array(number).keys())

  return (
    <SingleScheduleDay>
      {number_array.map((n) => (
        <React.Fragment key={n}>
          <Item className="loading" key={n}>
            <LoadingImage delay={n * 40} />
          </Item>
        </React.Fragment>
      ))}
    </SingleScheduleDay>
  )
}

export { ListAgenda__Loading, ListAgenda }
export default ListAgenda
