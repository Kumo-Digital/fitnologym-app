import { Formik, Field, Form, FormikHelpers } from "formik";
import { useState } from "react";

interface initialCredentials {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [error, setError] = useState('');

  async function loginUser(values: initialCredentials) {
    try {
      if (!values.email || !values.password) {
        setError('Por favor llene todos los campos');
        return;
      }

      const res = await fetch('api/v1/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
  
      if (res.ok) {
        console.log('jatsiemasz!');
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
          email: '',
          password: '',
        }}
        onSubmit={(
          values: initialCredentials,
          { setSubmitting }: FormikHelpers<initialCredentials>
        ) => loginUser(values)}
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
      {error && (
        <div>
          {error}
        </div>
      )}
    </div>
  );
}