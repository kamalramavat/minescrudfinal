import "../styles/globals.css";
import Layout from "./Layout";
import { store } from "../store/store";
import { Provider } from "react-redux";
import Country from "./country";
import Edit from "./components/Edit";

function MyApp({ Component, pageProps }) {
  return (

    // <div>
    //   <Sample />
    // </div>
    <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </Provider>
  );
}

export default MyApp;
