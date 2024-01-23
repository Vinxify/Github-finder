import React from "react";
import UserResults from "../components/layout/users/UserResults";
import UserSearch from "../components/layout/users/UserSearch";

function Home() {
  return (
    <>
      <UserSearch />
      <UserResults />
    </>
  );
}

export default Home;
