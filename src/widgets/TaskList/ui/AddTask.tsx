import React, {useState} from 'react';
import {Button, Input, message, Space} from "antd";

function AddTask({onAdd}: {onAdd: (taskName: string) => void}) {
    const [inputValue, setInputValue] = useState<string>('');
    const [messageApi, contextHolder] = message.useMessage();

    async function handleClick() {
        if (inputValue.trim() === '') {
            await messageApi.warning('Field is required!');
            return;
        }

        onAdd(inputValue);
        setInputValue('');
    }

    async function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            await handleClick();
        }
    }

    return (
        <>
            <Space.Compact style={{ width: '100%' }}>
                {contextHolder}
                <Input
                    autoFocus={true}
                    size={"large"}
                    placeholder={"What needs to be done?"}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <Button size={"large"} type="primary" onClick={handleClick}>Add</Button>
            </Space.Compact>
        </>
    );
}

export default AddTask;
