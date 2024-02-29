import { useGyms, useUsers } from "@/hooks/mock";

const Hooks = () => {
  const { users, isLoading } = useUsers();
  const { gyms, isLoading: isLoadingGyms } = useGyms();
  if (isLoading || isLoadingGyms) return <>loading</>;
  return (
    <>
      <div>Hooks</div>
      <p>{JSON.stringify(users)}</p>
      <p>{JSON.stringify(gyms)}</p>
    </>
  );
};

export default Hooks;
