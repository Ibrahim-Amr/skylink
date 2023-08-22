import { Dialog } from 'primereact/dialog';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, Dispatch, SetStateAction } from 'react';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { AddProductSchema } from '../../Schema/Validation.Schema';
import AddProductInput from '../AddProduct/AddProductInput';
import { ProductType } from '../DataTable';

const EditProduct = ({
  setProducts,
}: {
  setProducts: Dispatch<SetStateAction<ProductType[]>>;
}) => {
  let [searchParams] = useSearchParams();
  const navigation = useNavigate();
  const id = searchParams.get('productId');
  const edit = searchParams.get('edit');

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
    reset,
    setValue,
  } = useForm<z.infer<typeof AddProductSchema>>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      title: '',
      description: '',
      brand: '',
      price: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const { data: response } = await axios.put(
        `https://dummyjson.com/products/${id}`,
        data
      );

      setProducts((prevState) => {
        const index = prevState.findIndex((item) => item.id === response.id);
        if (index !== -1) {
          prevState[index] = response;
        }
        return [...prevState];
      });
      navigation('/');
    } catch (err: any) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };

  const FetchData = useCallback(async () => {
    const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
    setValue('title', data.title);
    setValue('description', data.description);
    setValue('brand', data.brand);
    setValue('price', data.price?.toString() || '');
  }, [edit, id]);

  useEffect(() => {
    if (edit) {
      FetchData();
    }
  }, [edit, id]);

  return (
    <div className='flex justify-end items-center'>
      <Dialog
        header='Add Product'
        visible={edit == 'true' ? true : false}
        style={{ width: '50vw' }}
        onHide={() => {
          reset();
          navigation('/');
        }}
      >
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
            <Button
              disabled={isLoading || isSubmitting}
              label='Update'
              title='Update'
            />
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default EditProduct;
