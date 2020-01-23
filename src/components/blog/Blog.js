import React, { useState } from "react";
import { connect } from "react-redux";

import { showAler } from "actions/alert";
import { Button } from "react-bootstrap";

const Blog = ({ showAler }) => {
  const [count, setCount] = useState(0);
  const test = () => {
    showAler({
      title: `Test ${count}`,
      delay: 2000,
      message: "It is a test sagas work"
    });
    setCount(count + 1);
  };
  return (
    <div>
      <h2>Blog</h2>
      <Button onClick={test}>Press Me to Message</Button>
    </div>
  );
};

const actions = { showAler };

export default connect(null, actions)(Blog);
