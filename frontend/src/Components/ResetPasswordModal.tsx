import { Button, Modal } from 'antd';
import { useState } from 'react';
import SupabaseAuth from './auth/SupabaseAuth.tsx';

export function ResetPasswordModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <Button type="primary" onClick={showModal}>
        Login/Register
      </Button>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <SupabaseAuth />
      </Modal>
    </>
  );
}
