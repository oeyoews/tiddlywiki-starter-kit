#!/usr/bin/env zx

import prompts from "prompts";
import { spinner } from "zx/experimental";
import bump from "./bump.mjs";
import build from "./build.mjs";
import start from "./start.mjs";
import service from "./service.mjs";

const index = {
  service,
  build,
  start,
  bump,
};

export default index;
