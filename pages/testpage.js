import withApollo from '../lib/apollo'
 
const Page = props => <div>Hello World</div>
 
export default withApollo({ ssr: true })(Page);