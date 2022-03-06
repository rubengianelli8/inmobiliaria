import { Provider } from "next-auth/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  makeVar,
} from "@apollo/client";
import "tailwindcss/tailwind.css";

export const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Provider session={session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
