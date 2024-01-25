import { Layout } from 'antd';
import React from 'react';

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#0958d9',
};
export default function AppContent() {
  return <Layout.Content style={contentStyle}>Content</Layout.Content>;
}
