import { useMutation } from "@apollo/client";
import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { Button, Confirm, Icon } from "semantic-ui-react";
import { DELETE_POST } from "../utils/GraphqlQueries";

function DeleteButton({ postId }) {
  const [isOpen, setIsOpen] = useState(false);

  // const history = useHistory();

  const [deletePost] = useMutation(DELETE_POST, {
    update() {
      setIsOpen(false);
      // history.push("/");
    },
    variables: {
      postId,
    },
  });

  return (
    <>
      <Button
        as="div"
        floated="right"
        color="red"
        onClick={() => setIsOpen(true)}
      >
        <Icon name="trash" style={{ margin: "0" }} />
      </Button>
      <Confirm
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
}

export default DeleteButton;
