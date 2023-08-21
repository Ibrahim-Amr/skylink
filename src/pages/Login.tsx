import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '../Schema/Validation.Schema';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ValidatedInput from '../components/ValidatedInput';

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

  const onSubmit = (data: any) => {
    console.log(data);

    reset();
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
          <ValidatedInput
            id='email'
            placeholder='example@email.com'
            register={register}
            errors={errors}
          />
          <ValidatedInput
            placeholder='*** *** *** ***'
            id='password'
            register={register}
            errors={errors}
          />
          <Button
            disabled={isLoading || isSubmitting}
            label='Submit'
            title='Submit'
          />
        </form>
      </Card>
    </div>
  );
};

export default Login;
