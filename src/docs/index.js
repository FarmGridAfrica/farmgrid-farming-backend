import basicInfo from "./basicInfo.js";
import { user } from "./users/create-User.js";
import { components } from "./components.js";

export default {
  ...basicInfo,
  ...user,
  ...components,
};
