import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useCrypto } from '../context/crypto-context.tsx';
import React from 'react';

interface DataType {
  key: React.Key;
  name: string | undefined;
  price: number;
  amount: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name!.length - b.name!.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Price, $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
];

export default function AssetsTable() {
  const { assets } = useCrypto();

  const data = assets.map((asset, key) => ({
    key: key,
    name: asset.name,
    price: asset.price,
    amount: asset.amount,
  }));

  return <Table pagination={false} columns={columns} dataSource={data} />;
}
