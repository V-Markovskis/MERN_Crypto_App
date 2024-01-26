import { Button, Layout, Modal, Select, SelectProps, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useCrypto } from '../../context/crypto-context.tsx';
import { Simulate } from 'react-dom/test-utils';
import keyPress = Simulate.keyPress;

const headerStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === '/') {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener('keypress', keypress);
    //if component gets destroyed
    return () => document.removeEventListener('keypress', keypress);
  }, []);
  const handleSelect = (value) => {
    setModal(true);
  };
  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 250 }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value="press / to open"
        //{options} - data set that goes into select
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            {/*{option.data = label, value, icon}*/}
            <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label} /> {option.data.label}
          </Space>
        )}
      />
      <Button type="primary">Add Asset</Button>
      <Modal open={modal} onOk={() => setModal(false)} onCancel={() => setModal(false)}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </Layout.Header>
  );
}
