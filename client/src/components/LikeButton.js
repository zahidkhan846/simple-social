import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";
import { LIKE_POST } from "../utils/GraphqlQueries";

function LikeButton({ post: { likes, likeCount, id }, user }) {
  const [liked, setLiked] = useState(false);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id },
  });

  useEffect(() => {
    if (user && likes.find((like) => like.userName === user.userName)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  let likeButton = user ? (
    liked ? (
      <Button color="pink">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button basic color="pink">
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button basic color="pink" to="/login" as={Link}>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      {likeButton}
      <Label basic color="pink" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}

export default LikeButton;
