import { withRootLayout } from "@/utils/layouts";
import { Title } from "@mantine/core";

function Login() {
  return (
    <>
      <Title>Page for Testing Components</Title>
    </>
  );
}

withRootLayout(Login);
export default Login;
