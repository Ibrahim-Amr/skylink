import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dispatch, SetStateAction, useState } from 'react';
import ProductForm from './ProductForm';
import { ProductType } from '../DataTable';

const AddProductModal = ({
  setProducts,
}: {
  setProducts: Dispatch<SetStateAction<ProductType[]>>;
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <div className='flex justify-end items-center'>
      <Button
        label='Add'
        size='small'
        severity='success'
        onClick={() => setOpenModal(true)}
        className='!w-full'
      />
      <Dialog
        header='Add Product'
        visible={openModal}
        style={{ width: '50vw' }}
        onHide={() => setOpenModal(false)}
      >
        <ProductForm setProducts={setProducts} setOpenModal={setOpenModal} />
      </Dialog>
    </div>
  );
};

export default AddProductModal;
