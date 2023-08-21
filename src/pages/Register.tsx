import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useForm } from 'react-hook-form';
import { RegisterSchema } from '../Schema/Validation.Schema';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ValidatedInput from '../components/ValidatedInput';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
    reset,
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
  });
  const signIn = useSignIn();
  const navigaction = useNavigate();
  const onSubmit = async (data: any) => {
    try {
      const { data: response } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signup',
        data
      );

      signIn({
        token: response.token,
        tokenType: 'Bearer',
        authState: response.user,
        expiresIn: 60,
      });
      toast.success(response.message);
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
        title='Register'
        subTitle="Register if you don't have an account"
        className='w-full max-w-[700px]'
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col justify-center items-center gap-5 w-full'
        >
          <ValidatedInput
            id='name'
            placeholder='user name'
            register={register}
            errors={errors}
          />
          <ValidatedInput
            id='email'
            placeholder='example@email.com'
            register={register}
            errors={errors}
          />
          <ValidatedInput
            placeholder='password'
            id='password'
            type='password'
            register={register}
            errors={errors}
          />
          <ValidatedInput
            placeholder='Repassword'
            id='rePassword'
            type='password'
            register={register}
            errors={errors}
          />
          <ValidatedInput
            placeholder='+20 000 0000 000'
            id='phone'
            register={register}
            errors={errors}
          />
          <Button
            disabled={isLoading || isSubmitting}
            label='Register'
            title='Register'
          />
        </form>
      </Card>
    </div>
  );
};

export default Register;
