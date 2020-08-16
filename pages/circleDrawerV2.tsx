import React, {
    useState,
    useEffect,
    useReducer,
    Dispatch
} from 'react'

import dynamic from 'next/dynamic'

import {
    Stage,
    Layer,
    Circle,
} from 'react-konva'

import {
    Row,
    Col,
    Space,
    Typography,
    Input,
    List,
    Button,
    Slider,
} from 'antd'

const {
    Text,
    Link,
} = Typography

function CircleDrawer() {

    interface ICircle {
        x: number,
        y: number,
        radius: number,
    }

    type Circles = ICircle[]
    type History = Circles[]

    const [historyIndex, setHistoryIndex] = useState(0)
    const [clickedIndex, setClickedIndex] = useState(-1)

    // should assume that the
    // initial state is also an empty array
    function stepsReducer(
        circles: Circles,
        {
            // type,
            value,
            index,
        } : {
            value: ICircle,
            index: number
        }
    ) {
        return circles
    }
    const [steps, setSteps] = useReducer()

    function addCircle(
        circles: Circles,
        circle: ICircle,
    ) {
        return [
            ...circles,
            circle
        ]
    }

    function changeRadius(radius: number) {
    }

    return <>
        <Space direction={"vertical"}>
            <Space>
                <Button
                    disabled={historyIndex === 0}
                    onClick={() => setHistoryIndex(historyIndex - 1)}
                >
                    Undo
                </Button>
                <Button
                    disabled={historyIndex === history.length - 1}
                    onClick={() => setHistoryIndex(historyIndex + 1)}
                >
                    Redo
                </Button>
            </Space>

            <Stage
                width={800}
                height={600}
                onClick={(evt => {
                    const x = evt.evt.offsetX
                    const y = evt.evt.offsetY

                    // TODO: better logic handling
                    addCircle({
                        x,
                        y,
                        radius: 10,
                    })
                })}
                // listening={false}
            >
                <Layer
                >
                    {
                        history[historyIndex].map(
                            (circle, index) =>
                                <Circle
                                    radius={circle.radius}
                                    key={index}
                                    x={circle.x}
                                    y={circle.y}
                                    stroke={"black"}
                                    fill={
                                        index === clickedIndex
                                            ? "gray"
                                            : ""
                                    }
                                    onClick={(evt) => {
                                        evt.cancelBubble = true
                                        if (index === clickedIndex) {
                                            setClickedIndex(-1)
                                        } else {
                                            setClickedIndex(index)
                                        }
                                    }}
                                    // listening={false}
                                />
                        )
                    }
                </Layer>
            </Stage>

            {
                clickedIndex === -1
                    ? <></>
                    : <Slider
                        defaultValue={
                            history
                                [historyIndex]
                                [clickedIndex]
                                .radius
                        }
                        onChange={
                            (value: number) => {
                                changeRadius(value)
                            }
                        }
                    />
            }

        </Space>
    </>
}

export default CircleDrawer
