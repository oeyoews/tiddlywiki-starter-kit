#!/usr/bin/env zx

import { spinner } from "zx/experimental";

// With a message.
await spinner(" ", () => $`make build`);
