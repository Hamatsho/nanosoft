import { useParams } from "react-router-dom"

const postList = [
    {
        id:1,
        title:"post1",
        desc:"post1kkkkkkkk"
    },
    {
        id:2,
        title:"post2",
        desc:"post1kkkkkkkk"
    },
    {
        id:3,
        title:"post3",
        desc:"post1kkkkkkkk"
    },
]
export default function Posts() {
   const {id} = useParams()
   console.log(id);
   const post = postList[id]
   if(post) 
    return (
        <div>
            <h1>{post.title} </h1>
           
            <p>{post.desc} </p>
        </div>
    )
    else return <div>Not</div>
}