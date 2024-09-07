import { OptionalRestArgsOrSkip, useConvex } from "convex/react";
import {
  FunctionReference,
  getFunctionName,
  makeFunctionReference,
} from "convex/server";
import type { Value } from "convex/values";
import { useQuery } from "rakkasjs";

export function useConvexQuery<Query extends FunctionReference<"query">>(
  query: Query,
  ...args: OptionalRestArgsOrSkip<Query>
): Query["_returnType"] | undefined {
  const skip = args[0] === "skip";
  const argsObject = args[0] === "skip" ? {} : parseArgs(args[0]);

  // Create a unique key for the query
  const queryKey =
    "convex:" + getFunctionName(query) + "::" + JSON.stringify(args);

  const queryReference =
    typeof query === "string"
      ? makeFunctionReference<"query", any, any>(query)
      : query;

  const convex = useConvex();

  const result = useQuery(
    queryKey,
    () => convex.query(queryReference, argsObject),
    {
      enabled: !skip,
    },
  ).data;

  return result;
}

// The following helpers were copied from convex/src/common/index.ts

function parseArgs(
  args: Record<string, Value> | undefined,
): Record<string, Value> {
  if (args === undefined) {
    return {};
  }
  if (!isSimpleObject(args)) {
    throw new Error(
      `The arguments to a Convex function must be an object. Received: ${
        args as any
      }`,
    );
  }
  return args;
}

export function isSimpleObject(value: unknown) {
  const isObject = typeof value === "object";
  const prototype = Object.getPrototypeOf(value);
  const isSimple =
    prototype === null ||
    prototype === Object.prototype ||
    // Objects generated from other contexts (e.g. across Node.js `vm` modules) will not satisfy the previous
    // conditions but are still simple objects.
    prototype?.constructor?.name === "Object";
  return isObject && isSimple;
}