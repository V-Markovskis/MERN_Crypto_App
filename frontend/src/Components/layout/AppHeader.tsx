import { Button, ConfigProvider, Drawer, Layout, Modal, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useCrypto } from '../../context/crypto-context.tsx';
import CryptoInfoModal from '../CryptoInfoModal.tsx';
import { CryptoResult } from '../../DataTypes/Crypto/CryptoResult.ts';
import AddAssetForm from '../AddAssetForm.tsx';
import { LoginRegisterModal } from '../LoginRegisterModal.tsx';
import { useAuth } from '../../context/auth-context.tsx';
import { handleLogout } from '../auth/SupabaseAuth.tsx';

const headerStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#0a0b1e',
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [coin, setCoin] = useState<CryptoResult | undefined>(undefined);
  const { crypto } = useCrypto();
  const { session, setSession } = useAuth();

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

  function handleExit() {
    handleLogout();
    setSession(null);
  }

  return (
    <Layout.Header style={headerStyle}>
      {session ? (
        <Button type="primary" danger onClick={() => handleExit()}>
          Logout
        </Button>
      ) : (
        <LoginRegisterModal />
      )}
      <Select
        style={{ width: 250 }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value="View Coin Info"
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
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Asset
      </Button>

      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
        styles={{
          content: {
            backgroundColor: '#292952',
          },
        }}
      >
        {coin && <CryptoInfoModal coin={coin} />}
      </Modal>

      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: '#292952',
          },
        }}
      >
        <Drawer
          width={600}
          title="Add Asset"
          onClose={() => setDrawer(false)}
          open={drawer}
          destroyOnClose
          style={{ backgroundColor: '#1b1b3a' }}
        >
          <AddAssetForm onClose={() => setDrawer(false)} />
        </Drawer>
      </ConfigProvider>
    </Layout.Header>
  );
}
