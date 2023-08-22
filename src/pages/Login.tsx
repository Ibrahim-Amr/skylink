import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '../Schema/Validation.Schema';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import LoginInput from '../components/Login/LoginInput';
import { Link } from 'react-router-dom';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
    reset,
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  });
  const navigaction = useNavigate();
  const signIn = useSignIn();

  const onSubmit = async (data: any) => {
    try {
      const { data: response } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signin',
        data
      );

      signIn({
        token: response.token,
        tokenType: 'Bearer',
        authState: response.user,
        expiresIn: 60,
      });
      toast.success(response.message + `Welcome, ${response.user.name}`);
      reset();
      navigaction('/');
    } catch (err: any) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className='min-h-screen w-full flex justify-center items-center'>
      <Card
        title='Login'
        subTitle='Login to have access to the website'
        className='w-full max-w-[700px]'
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col justify-center items-center gap-5 w-full'
        >
          <LoginInput
            id='email'
            placeholder='example@email.com'
            register={register}
            errors={errors}
          />
          <LoginInput
            placeholder='*** *** *** ***'
            id='password'
            register={register}
            type='password'
            errors={errors}
          />
          <Button
            disabled={isLoading || isSubmitting}
            label='Login'
            title='Login'
          />
        </form>
        <p className='font-medium'>
          Already have an account?{' '}
          <Link to='/register' className='text-blue-600 hover:underline'>
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
