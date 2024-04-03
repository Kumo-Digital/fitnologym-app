import { Formik, Field, Form, FormikHelpers } from "formik";
import { useState } from "react";

interface initialValues {
  fullname: string;
  dni: string;
  email: string;
}

export default function RegisterForm() {
  const [error, setError] = useState("");

  async function registerUser(values: initialValues) {
    try {
      if (!values.email || !values.fullname || !values.dni) {
        setError("Por favor llene todos los campos");
        return;
      }

      const res = await fetch("api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        console.log(await res.json());
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Formik
        initialValues={{
          fullname: "",
          email: "",
          dni: "",
        }}
        onSubmit={(
          values: initialValues,
          { setSubmitting }: FormikHelpers<initialValues>
        ) => registerUser(values)}
      >
        <Form>
          <label htmlFor="fullname">Nombre completo</label>
          <Field
            id="fullname"
            name="fullname"
            placeholder="John Salchichon"
            type="text"
          />

          <label htmlFor="email">E-mail</label>
          <Field
            id="email"
            name="email"
            placeholder="john@acme.com"
            type="email"
          />

          <label htmlFor="dni">DNI</label>
          <Field id="dni" type="text" name="dni" />

          <button type="submit">Registrar</button>
        </Form>
      </Formik>
      <hr />
      {error && <div>{error}</div>}
    </div>
  );
}
