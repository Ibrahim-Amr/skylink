import { InputText } from 'primereact/inputtext';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface Props {
  id: 'email' | 'password';
  placeholder: string;
  type?: string;
  register: UseFormRegister<{
    email: string;
    password: string;
  }>;
  errors: FieldErrors<{
    email: string;
    password: string;
  }>;
}

const LoginInput: React.FC<Props> = ({
  id,
  placeholder,
  type,
  register,
  errors,
}) => {
  return (
    <div className='w-full'>
      <InputText
        type={type}
        id={id}
        placeholder={placeholder}
        {...register(id)}
        className={`
          w-full
          ${errors[id] ? '!border-red-500 !outline-red-500 !ring-red-500' : ''}
        `}
      />
      <div className='flex justify-start items-center w-full'>
        <p className='text-red-500 font-semibold text-lg text-start'>
          {errors[id]?.message}
        </p>
      </div>
    </div>
  );
};

export default LoginInput;
