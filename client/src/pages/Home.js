import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Grid } from "semantic-ui-react";
import { PostCard } from "../components/PostCard";

const FETCH_POSTS_QUERY = gql`
  {
    posts: getposts {
      id
      body
      userName
      createdAt
      comments {
        body
        createdAt
        userName
      }
      commentCount
      likes {
        userName
      }
      likeCount
    }
  }
`;

function Home() {
  const { data: { posts } = {}, loading } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns="2" className="posts">
      <Grid.Row>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h2 style={{ margin: "35vh auto" }}>Posts are loading...</h2>
        ) : (
          posts &&
          posts.map((post) => {
            return (
              <Grid.Column style={{ marginBottom: "1.2rem" }} key={post.id}>
                <PostCard post={post} />
              </Grid.Column>
            );
          })
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
