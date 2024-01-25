import React from 'react';
import { Layout } from 'antd';

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};
export default function AppSider() {
  return (
    <Layout.Sider width="25%" style={siderStyle}>
      Sider
    </Layout.Sider>
  );
}
