import { Button, Modal } from 'antd';
import { CryptoAsset } from '../DataTypes/Assets/CryptoAsset.ts';
import { useState } from 'react';

type EditModalProps = {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  asset: CryptoAsset;
};

export default function EditModal({ asset, isEditing, setIsEditing }: EditModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal title={asset.name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>{asset.amount}</p>
        <p>{asset.price}</p>
      </Modal>
    </>
  );
}
