import { Button, Layout, Modal, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useCrypto } from '../../context/crypto-context.tsx';
import CryptoInfoModal from '../CryptoInfoModal.tsx';
import { CryptoResult } from '../../DataTypes/Crypto/CryptoResult.ts';

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
  const [coin, setCoin] = useState<CryptoResult | undefined>(undefined);
  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = (event: KeyboardEvent) => {
      if (event.key === '/') {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener('keypress', keypress);
    //if component gets destroyed
    return () => document.removeEventListener('keypress', keypress);
  }, []);
  function handleSelect(value: string) {
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  }
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
      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        {coin && <CryptoInfoModal coin={coin} />}
      </Modal>
    </Layout.Header>
  );
}
