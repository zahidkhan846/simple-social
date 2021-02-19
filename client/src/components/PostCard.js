import React from "react";
import moment from "moment";
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

export function PostCard({ post }) {
  const {
    body,
    createdAt,
    id,
    userName,
    likes,
    commnets,
    commentCount,
    likeCount,
  } = post;

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header as={Link} to={`/posts/${id}`}>
          {userName}
        </Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Button as="div" labelPosition="right">
            <Button basic color="pink">
              <Icon name="heart" />
            </Button>
            <Label basic color="pink" pointing="left">
              {likeCount}
            </Label>
          </Button>
          <Button as="div" labelPosition="right">
            <Button basic color="teal">
              <Icon name="comments" />
            </Button>
            <Label basic color="teal" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}
