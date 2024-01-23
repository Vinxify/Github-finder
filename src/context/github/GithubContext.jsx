import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = import.meta.env.VITE_BASE_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: true,
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  // Get initial users (testing propose)
  const fetchUser = async () => {
    setLoading;
    const res = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await res.json();
    dispatch({
      type: "GET_USERS",
      payload: data,
    });
  };

  return (
    <GithubContext.Provider
      value={{ loading: state.loading, users: state.users, fetchUser }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
