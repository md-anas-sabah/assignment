import { Provider } from "react-redux";
import store from "../redux/store";
import { Outlet } from "react-router-dom";
import Header from "../components/header/header";

export const AppLayout: React.FC = () => {
  return (
    <Provider store={store}>
      <Header />
      <Outlet />
    </Provider>
  );
};
