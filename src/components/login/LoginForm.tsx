import { API_URL_V1, apiUrls } from "@/lib/apiUrls";
import { Formik, Field, Form } from "formik";
import { useState } from "react";

interface initialCredentials {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [error, setError] = useState("");

  async function loginUser(values: initialCredentials) {
    try {
      if (!values.email || !values.password) {
        setError("Por favor llene todos los campos");
        return;
      }

      const res = await fetch(`${API_URL_V1}${apiUrls.auth.login}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        // router.push("/");
      } else {
        setError((await res.json()).error);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values: initialCredentials) => loginUser(values)}
      >
        <Form>
          <label htmlFor="email">E-mail</label>
          <Field
            id="email"
            name="email"
            placeholder="john@acme.com"
            type="email"
          />

          <label htmlFor="password">Contraseña</label>
          <Field id="password" type="password" name="password" />

          <button type="submit">Ingresar</button>
        </Form>
      </Formik>
      <hr />
      {error && <div>{error}</div>}
    </div>
  );
}
