import city from "./city";
import user from "./users";
import article from "./article"
import comment from './comment'
const setRouter = (app)=>{
    app.use('/api/v1/user',user)
    app.use('/api/v1/city',city)
    app.use('/api/v1/article',article)
    app.use('/api/v1/comment',comment)
}
export default setRouter
