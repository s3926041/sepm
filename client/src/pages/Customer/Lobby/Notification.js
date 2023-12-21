import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const App = ({id}) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Found A Match with ID: ' + id);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setModalText('Move to The Chat Page after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('You Just Canceled The Conversation!');
        setOpen(false);
    };
    return (
        <>
             <Button type="primary" onClick={showModal}>
                Open Modal with async logic
            </Button> 
            <Modal
                title="Match Found"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        </>
    );
};
export default App;