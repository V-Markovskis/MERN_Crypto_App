import { Layout } from 'antd';
import React from 'react';

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 60,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#001529',
};
export default function AppHeader() {
  return <Layout.Header style={headerStyle}>Header</Layout.Header>;
}
