import { useMemo } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";

let apolloClient;

function createIsomorphLink() {
  /*if (typeof window === "undefined") {
    const { SchemaLink } = require("@apollo/client/link/schema");
    const { schema } = require("./schema");
    return new SchemaLink({ schema });
  } else {
    const { HttpLink } = require("@apollo/client/link/http");
    return new HttpLink({
      uri: "/api/v1",
      credentials: "same-origin",
    });
    const { HttpLink } = require("@apollo/client/link/http");
    const devolopmentApiUrl = "http://localhost:3000/api";
    return new HttpLink({
      uri:
        process.env.NODE_ENV !== "production"
          ? devolopmentApiUrl
          : process.env.API_URL,
      credentials: "same-origin",
    });
  }*/

  const { HttpLink } = require("@apollo/client/link/http");
  const devolopmentApiUrl = "http://localhost:3000/api/v1";
  const prodApiUrl = "https://oyuncu-giyim.herokuapp.com/api/v1";
  return new HttpLink({
    uri: process.env.NODE_ENV !== "production" ? devolopmentApiUrl : prodApiUrl,
    credentials: "same-origin",
  });
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createIsomorphLink(),
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  /*if (initialState) {
    _apolloClient.cache.restore(initialState);
    
  }*/
  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({
      ...existingCache,
      ...initialState,
    });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
