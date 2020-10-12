import React from 'react';
import {fetchAPI} from 'lib/api/'
import e from 'cors';
const SingleExhibitor = (props) => {
    const { exhibitor } = props

    const [messages, addMessages] = React.useState(['ned', 'ned', 'ned'])
    const [question, changeQuestion] = React.useState('question')

    const handleMessage = (e) => {
        changeQuestion(e.target.value)
    }
    const addMessage = () => {
       let m = [...messages]
      m.push(question)
      addMessages(m)
      changeQuestion('')
    }
    return (
        <div>
            <h1>{exhibitor.FirstName} {exhibitor.LastName}</h1>
            {messages.map(message => {
                return <h4>{message}</h4>
            })}
            <input type="text" onChange={handleMessage} onKeyUp={(e)=>{
                if(e.key === 'Enter'){
                    addMessage();
                }
            }} value={question}/>
            <button onClick={addMessage} >AddMessage</button>
        </div>
    );
};

export default SingleExhibitor;

SingleExhibitor.getInitialProps = async (ctx) => {
    const data = await fetchAPI(
      `query getExhibitorDetail($id: String!){
        exhibitors(where: {
            id: $id 
        }) {
            FirstName
            LastName
            Company
            Website
            id
            Website
            Email
            event {
              EventName
            }
            Attachments{
              name
              url
              size
              ext
            }
          }
      }`,
      {
        variables: {
          id : ctx.query.exhibitor,
        },
      }
    );
  
    const exhibitor = await data.exhibitors[0]
    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return { exhibitor };
  };