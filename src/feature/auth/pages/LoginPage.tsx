import * as Yup from 'yup';
import { Button, Grid } from '@mui/material';
import { Auth } from '@feature/auth/models/Auth';
import BoxShadow from '@shared/containers/BoxShadow';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldErrors, useForm } from 'react-hook-form';
import useAuthService from '@core/services/useAuthService';
import CustomTextFieldLegacy from '@shared/components/CustomTextFieldLegacy';

const defaultValues: Auth = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Correo inválido').required('Correo es requerido'),
  password: Yup.string().required('Contraseña es requerido'),
});

export default function LoginPage() {
  const { signIn } = useAuthService();
  const navigate = useNavigate();

  const form = useForm<Auth>({
    defaultValues,
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const { register, formState, handleSubmit } = form;
  const { errors, isValid, isSubmitting } = formState;

  const onSubmit = (loginData: Auth) => {
    const { email, password } = loginData;
    if (email !== null && password != null) {
      signIn(email, password);
      navigate('/');
    }
  };

  const onError = (errors: FieldErrors<any>) => {
    console.log({ errors });
  };

  return (
    <section
      style={{
        display: 'flex',
        height: '100vh',
        marginTop: '-50px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <BoxShadow>
        <h2 className="text-center">Resume Builder</h2>

        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomTextFieldLegacy
                autoFocus
                type="text"
                name="email"
                label="Correo"
                register={register('email')}
                error={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomTextFieldLegacy
                type="password"
                name="password"
                label="Contraseña"
                register={register('password')}
                error={errors.password?.message}
              />
            </Grid>
          </Grid>

          <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} disabled={!isValid || isSubmitting}>
            Acceder
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/">Olvidé mi contraseña</Link>
            </Grid>
          </Grid>
        </form>
      </BoxShadow>
    </section>
  );
}
