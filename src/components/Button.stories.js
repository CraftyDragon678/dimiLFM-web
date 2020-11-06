import React from "react";
import { text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Button } from "./Button";

export default {
  title: "Button",
  component: Button,
};

export const Text = () => {
  const content = text("content", "button!");
  return <Button>{content}</Button>;
};

export const Emoji = () => (
  <Button onClick={action("clicked")}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);
