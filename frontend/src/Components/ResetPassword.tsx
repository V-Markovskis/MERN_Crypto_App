import { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient.ts';
import { Button, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

export function ResetPassword() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  useEffect(() => {
    // Get the access token and refresh token from the URL
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.hash.substring(1));
      setAccessToken(params.get('access_token') || '');
      setRefreshToken(params.get('refresh_token') || '');
    }
  }, []);

  useEffect(() => {
    // Authenticate the user using the access token and refresh token
    const getSessionWithTokens = async () => {
      if (accessToken && refreshToken) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          alert(`Error signing in: ${error.message}`);
        }
      }
    };

    // Call this function only when accessToken and refreshToken are available.
    if (accessToken && refreshToken) {
      getSessionWithTokens();
    }
  }, [accessToken, refreshToken]);

  const handlePasswordUpdate = async (newPassword: string) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error('Error updating password', error);
        return;
      }

      if (data) {
        alert('Password has been updated successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error updating password', error);
    }
  };

  type FieldType = {
    password: string;
  };

  const onFinish = (passwordFromInput: FieldType) => {
    handlePasswordUpdate(passwordFromInput.password);
  };

  return (
    <Form
      name="basic"
      // labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      // style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            maxWidth: 600,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '50px',
            border: '1px solid black',
            borderRadius: 10,
            backgroundColor: '#292952',
            padding: 100,
          }}
        >
          <Typography.Title>Reset password form</Typography.Title>
          <Form.Item<FieldType>
            label="New password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input />
          </Form.Item>

          <div style={{ display: 'flex', gap: '20px' }}>
            <Form.Item wrapperCol={{ span: 16 }}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 16 }}>
              <Button
                type="primary"
                style={{ backgroundColor: '#4e0cc4' }}
                onClick={async () => {
                  try {
                    await supabase.auth.signOut();
                  } catch (error) {
                    console.error('Error signing out:', error);
                  }
                  navigate('/');
                }}
              >
                Cancel
              </Button>
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
}
