import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "axios";

export const FullPost = () => {
  const [data, setData] = React.useState()
  const [loading, setLoading] = React.useState(true)
  const {id} = useParams()
 


  React.useEffect(() => {
    axios
      .get(`http://localhost:4444/posts/${id}`)
      .then((response) => {
        // Access the response data
        const data = response.data;
        setData(data);
       console.log(data)
      })
      .then(()=> setLoading(false))
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      });
  }, []);


  
  if(loading){
    return <Post isloading={loading} isFullPost/>
  }

  return (
    <>
      <Post
        _id={1}
        title={data.title}
        //imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
        imageUrl={data.imageUrl}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <p>
          {data.text}
        </p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
