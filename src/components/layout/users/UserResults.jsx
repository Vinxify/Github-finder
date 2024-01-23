import React, { useContext, useEffect, useState } from "react";
import UserItems from "./UserItems";
import GithubContext from "../../../context/github/GithubContext";
import Spinner from "../../../assets/Spinner";

function UserResults() {
  const { users, loading } = useContext(GithubContext);

  if (!loading) {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {users.map((user) => (
          <UserItems user={user} key={user.id} />
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default UserResults;
