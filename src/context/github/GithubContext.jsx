import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = import.meta.env.VITE_BASE_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  // Clear search user

  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  // Get search users (testing propose)
  const searchUser = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const { items } = await res.json();
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  // Get search users (testing propose)
  const getUser = async (login) => {
    setLoading();

    const res = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (res.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await res.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  // Get User Repos
  const getUserRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    const res = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await res.json();
    dispatch({
      type: "GET_USER_REPOS",
      payload: data,
    });
  };

  return (
    <GithubContext.Provider
      value={{
        loading: state.loading,
        users: state.users,
        user: state.user,
        repos: state.repos,
        searchUser,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
