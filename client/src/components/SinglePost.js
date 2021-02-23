import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Grid, Icon, Image, Label } from "semantic-ui-react";
import { useAuth } from "../store/AuthReducer";
import { FETCH_SINGLE_POST } from "../utils/GraphqlQueries";
import LikeButton from "./LikeButton";
import moment from "moment";
import DeleteButton from "./DeleteButton";

function SinglePost() {
  const { user } = useAuth();

  const { postId } = useParams();

  const { data: { getPost } = {} } = useQuery(FETCH_SINGLE_POST, {
    variables: {
      postId: postId,
    },
  });

  if (!getPost) {
    return <p>Loading...</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      userName,
      comments,
      likes,
      commentCount,
      likeCount,
    } = getPost;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated="right"
              size="small"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{userName}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <Button as="div" labelPosition="right" onClick={() => {}}>
                  <Button basic color="teal">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="teal" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.userName === userName && (
                  <DeleteButton postId={id} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default SinglePost;
