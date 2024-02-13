import { Modal } from 'antd';
import { CryptoAsset } from '../DataTypes/Assets/CryptoAsset.ts';
import { capitalize } from '../utils.ts';
import AddAssetForm from './AddAssetForm.tsx';

type EditModalProps = {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  asset: CryptoAsset;
};

export default function EditModal({ asset, isEditing, setIsEditing }: EditModalProps) {
  const handleOk = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
      <Modal title={capitalize(asset.name)} open={isEditing} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <AddAssetForm isEditing={isEditing} setIsEditing={setIsEditing} asset={asset} />
      </Modal>
    </>
  );
}
