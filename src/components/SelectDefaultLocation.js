import React, { useState } from 'react';
import { Modal, Select } from 'antd';
import ListProvince from '../settings/list-province.json'
import { updateUserLocation } from '../lib/firebase'
const { Option } = Select;
const children = [];

ListProvince.forEach((provinceName, index) => {
    children.push(<Option key={provinceName}>{provinceName}</Option>);

})



function SelectDefaultLocation({ open, setOpen, user, setBindLocation }) {

    const [defaultLocation, setDefaultLocation] = useState(null)
    return (
        <>
            <Modal
                title="デフォルト町を選択"
                centered
                visible={open}
                onOk={() => {
                    setOpen(false)
                    updateUserLocation(user, defaultLocation)
                    setBindLocation(defaultLocation)
                }
                }
                onCancel={() => setOpen(false)}
                width={700}
                maskClosable={false}
            >
                <p>some contents...</p>
                {/* <Select
                    mode="tags"
                    style={{
                        width: '100%',
                    }}
                    placeholder="Tags Mode"
                    onChange={handleChange}
                >
                    {children}
                </Select> */}

                <Select
                    showSearch
                    placeholder="町を選択します"
                    optionFilterProp="children"
                    onSelect={(e) => {
                        setDefaultLocation(e)
                    }}
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                >
                    {children}
                </Select>
            </Modal>
        </>
    );
}

export default SelectDefaultLocation;