# Cross language schema definitions with Bazel
Repo demonstrates how to take a protocol buffer schema definition as an input into a code generating Bazel rules.
This particulr example generates two things:
  1) A TypeScript library for building objects which conform to our schema using `ts_proto_library`
  2) A Java interface to implement which conforms to our schema definition using `java_proto_library`

## Repo overview
- `app` Contains the TypeScript client written with Angular
- `backend` Constains the Java API server
- `schema` Contains the protocol buffer schema defintion

## Running the code
- `bazel run @yarn//:yarn` Installs npm dependencies
- `yarn start` Starts a TypeScript development server on port `5432` and a Java API server at port `8080`
- Navigate to [`http://localhost:8080`](http://localhost:8080) to load the TypeScript client
