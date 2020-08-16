import React, {useState} from 'react'
import {
    Typography,
    Space,
    Input,
} from 'antd'

const {
    Text,
    Link,
} = Typography

function TemperatureConverter() {
    const [C, setC] = useState(0)
    const [F, setF] = useState(32)
    return (
        <Space
            align={"baseline"}
            direction={"horizontal"}
        >
            <Input
                addonBefore={"Celsius"}
                onChange={
                    (event) => {
                        const value = Number.parseFloat(event.target.value)
                        setC(value)
                        setF(value * 9/5 + 32)
                    }
                }
                value={C}
            />
            <Input
                addonBefore={"Fahrenheit"}
                onChange={
                    (event) => {
                        const value = Number.parseFloat(event.target.value)
                        setC((value - 32) * 5/9)
                        setF(value)
                    }
                }
                value={F}
            />
        </Space>
    )
}

export default TemperatureConverter