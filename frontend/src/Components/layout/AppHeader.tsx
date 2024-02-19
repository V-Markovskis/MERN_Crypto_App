import { Button, Drawer, Layout, Modal, Select, Space, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { useCrypto } from '../../context/crypto-context.tsx';
import CryptoInfoModal from '../CryptoInfoModal.tsx';
import { CryptoResult } from '../../DataTypes/Crypto/CryptoResult.ts';
import AddAssetForm from '../AddAssetForm.tsx';
import { ResetPasswordModal } from '../ResetPasswordModal.tsx';

const headerStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

type AppHeaderProps = {
  isDarkTheme: boolean;
  setIsDarkTheme: (isDarkTheme: boolean) => void;
};

export default function AppHeader({ isDarkTheme, setIsDarkTheme }: AppHeaderProps) {
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
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
      <Switch
        checkedChildren="Dark Mode On"
        unCheckedChildren="Dark Mode Off"
        defaultChecked
        onClick={() => setIsDarkTheme(!isDarkTheme)}
      />
      <ResetPasswordModal />
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
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Asset
      </Button>

      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        {coin && <CryptoInfoModal coin={coin} />}
      </Modal>

      <Drawer width={600} title="Add Asset" onClose={() => setDrawer(false)} open={drawer} destroyOnClose>
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}
