import { Button, Modal } from 'antd';
import { useState } from 'react';
import SupabaseAuth from './auth/SupabaseAuth.tsx';

export function LoginRegisterModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function showModal() {
    setIsModalOpen(true);
  }

  function handleOk() {
    setIsModalOpen(false);
  }

  function handleCancel() {
    setIsModalOpen(false);
  }

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
