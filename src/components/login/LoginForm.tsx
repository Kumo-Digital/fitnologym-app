import { Formik, Field, Form, FormikHelpers } from "formik";

interface initialValues {
  email: string;
  password: string;
}

async function loginUser(values: initialValues) {
  try {
    const res = await fetch('api/v1/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    if (res.ok) {
      console.log('jatsiemasz!');
    }
  } catch (err) {
    console.log(err);
  }
  alert(JSON.stringify(values));
}

export default function LoginForm() {
  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(
          values: initialValues,
          { setSubmitting }: FormikHelpers<initialValues>
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
    </div>
  );
}