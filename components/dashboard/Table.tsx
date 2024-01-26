"use client";

import useUsers from "@/hooks/useUsers";

const Table = () => {
  const user = useUsers();
  return (
    <>
      table
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export default Table;
