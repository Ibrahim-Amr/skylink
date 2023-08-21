import { Dispatch, SetStateAction } from 'react';
import { ProductType } from '../DataTable';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { AddProductSchema } from '../../Schema/Validation.Schema';
import AddProductInput from './AddProductInput';

const ProductForm = ({
  setProducts,
  setOpenModal,
}: {
  setProducts: Dispatch<SetStateAction<ProductType[]>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
    reset,
  } = useForm<z.infer<typeof AddProductSchema>>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: { title: '', description: '', brand: '', price: '' },
  });

  const onSubmit = async (data: any) => {
    try {
      setProducts((prevState) => [...prevState, data]);
      toast.success('Product Added');
      reset();
      setOpenModal(false);
    } catch (err: any) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };
  return (
    <div className='w-full flex justify-center items-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col justify-center items-center gap-5 w-full'
      >
        <AddProductInput
          id='title'
          placeholder='title'
          register={register}
          errors={errors}
        />
        <AddProductInput
          placeholder='description'
          id='description'
          register={register}
          type='text'
          errors={errors}
        />
        <AddProductInput
          placeholder='price'
          id='price'
          register={register}
          type='text'
          errors={errors}
        />
        <AddProductInput
          placeholder='brand'
          id='brand'
          register={register}
          type='text'
          errors={errors}
        />
        <Button disabled={isLoading || isSubmitting} label='Add' title='Add' />
      </form>
    </div>
  );
};

export default ProductForm;
