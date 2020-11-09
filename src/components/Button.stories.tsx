import React from "react";
import { text, select } from "@storybook/addon-knobs";
import Button from "./Button";

export default {
  title: "Button",
  component: Button,
};

export const Simple = () => {
  const content = text("content", "button!");
  const size = select("size", ["short", "medium", "long"], "medium");
  return <Button size={size}>{content}</Button>;
};
