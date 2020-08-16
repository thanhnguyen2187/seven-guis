import React, {useState, useEffect} from 'react'
import {
    Progress,
    Typography,
    Space,
    Row,
    Col,
    Button, Slider,
} from 'antd'

const {Text} = Typography

function Timer() {

    const [defaultMinDuration, defaultMaxDuration] = [10_000, 100_000]
    const [elapsedTime, setElapsedTime] = useState(0)
    const [duration, setDuration] = useState(defaultMinDuration)
    let getPercentage = () => {
        return ((elapsedTime / duration) * 100).toFixed(2)
    }

    useEffect(() => {
        const ms = 100
        const interval = setInterval(() => {
            setElapsedTime((previousElapsedTime) =>
                previousElapsedTime < duration ?
                    previousElapsedTime + ms :
                    previousElapsedTime
            )
        }, ms)

        return () => {
            clearInterval(interval)
        }
    })

    return (
        <>
            <Row>
                <Col flex={"150px"}>
                    <Text>Elapsed time:</Text>
                </Col>
                <Col flex={"200px"}>
                    <Progress percent={Number.parseFloat(getPercentage())}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Text>{elapsedTime / 1000} s</Text>
                </Col>
            </Row>
            <Row>
                <Col flex={"150px"}>
                    Duration
                </Col>
                <Col flex={"200px"}>
                    <Slider
                        min={defaultMinDuration / 1000}
                        max={defaultMaxDuration / 1000}
                        // @ts-ignore
                        onChange={(value: React.SetStateAction<number>) => setDuration(value * 1000)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button onClick={() => {
                        setElapsedTime(0)
                    }}>
                        Reset
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default Timer;