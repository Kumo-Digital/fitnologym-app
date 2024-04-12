const AuthLayout = ({ children }: any) => {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {children}
    </main>
  );
};

export default AuthLayout;
