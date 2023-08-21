import { InputText } from 'primereact/inputtext';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface Props {
  id: 'name' | 'email' | 'password' | 'rePassword' | 'phone';
  placeholder: string;
  type?: string;
  register: UseFormRegister<{
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
  }>;
  errors: FieldErrors<{
    name?: string;
    email: string;
    password: string;
    rePassword?: string;
    phone?: string;
  }>;
}

const ValidatedInput: React.FC<Props> = ({
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

export default ValidatedInput;
