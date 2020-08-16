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

    // TODO: refactor to useState
    //       as the code would be simpler
    const [history, dispatchHistory] = useReducer(
        (
            // tslint:disable-next-line:no-shadowed-variable
            history: History,
            {
                type,
                state,
                index,
            }: {
                type: string,
                state: Circles,
                index?: number,
            }
        ) => {
            switch (type) {
                case "add":
                    return [...history, state]
                case "replace":
                    return [...history.slice(0, index), state]
            }
            return [...history]
        },
        [[]]
    )
    const [historyIndex, setHistoryIndex] = useState(0)
    const [clickedIndex, setClickedIndex] = useState(-1)

    function addCircle(circle: ICircle) {
        // setCurrentCircles([...currentCircles, circle])
        dispatchHistory({
            type: "replace",
            state: [
                ...history[historyIndex],
                circle
            ],
            index: historyIndex + 1
        })
        setHistoryIndex(historyIndex + 1)
    }

    function changeRadius(radius: number) {

        const currentHistory = history[historyIndex].slice()
        currentHistory[clickedIndex].radius = radius
        // history[historyIndex][clickedIndex] = {
        //     ...history[historyIndex][clickedIndex],
        //     radius
        // }

        dispatchHistory({
            type: "add",
            state: currentHistory,
            // index: historyIndex
        })
        setHistoryIndex(historyIndex + 1)
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
