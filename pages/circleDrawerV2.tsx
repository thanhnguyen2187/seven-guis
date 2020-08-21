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

    interface IStep {
        value: ICircle,
        index: number,
    }

    type Circles = ICircle[]
    type CircleState = Circles
    type CircleStates = CircleState[]

    const [clickedIndex, setClickedIndex] = useState(-1)
    const [circleStatesIndex, setCircleStatesIndex] = useState(0)
    const [temporalCircleState, setTemporalCircleState] = useState<CircleState>([])
    const [circleStates, dispatchCircleStates] = useReducer(
        (
            states: CircleStates,
            {
                index,
                state,
                action,
            }: {
                index: number,
                state: Circles,
                action: string,
            }
        ) => {

            switch (action) {
                case "add":
                    return [
                        ...states,
                        state,
                    ]
                case "modify":
                    return [
                        ...states.slice(0, index + 1),
                        state,
                    ]
            }

            return states
        },
        [[]]
    )

    function addCircle(circle: ICircle) {
        setTemporalCircleState([
            ...temporalCircleState,
            circle,
        ])
        dispatchCircleStates({
            action: "modify",
            index: circleStatesIndex,
            state: [
                ...temporalCircleState
            ]
        })
        setCircleStatesIndex(circleStatesIndex + 1)
    }

    // setTemporalCircleState(
    //     circleStates[
    //         circleStatesIndex
    //     ]
    // )

    return <>
        <Space direction={"vertical"}>
            <Space>
                <Button
                    disabled={circleStatesIndex === 0}
                    onClick={() => setCircleStatesIndex(circleStatesIndex - 1)}
                >
                    Undo
                </Button>
                <Button
                    disabled={circleStatesIndex === circleStates.length - 1}
                    onClick={() => setCircleStatesIndex(circleStatesIndex + 1)}
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

                    addCircle({
                        x,
                        y,
                        radius: 10,
                    })
                    setTemporalCircleState([
                        ...circleStates[circleStatesIndex]
                    ])
                })}
            >
                <Layer
                >
                    {
                        // circleStates[circleStatesIndex].map(
                        temporalCircleState.map(
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
                                        // setTemporalCircleState([
                                        //     ...circleStates[circleStatesIndex]
                                        // ])
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
                            // 0
                            temporalCircleState
                                [clickedIndex]
                                .radius
                            // circleStates
                            //     [circleStatesIndex]
                            //     [clickedIndex]
                            //     .radius
                        }
                        value={
                            temporalCircleState
                                [clickedIndex]
                                .radius
                        }
                        onChange={
                            (value: number) => {
                                const _temporalCircleState = [
                                    ...circleStates[circleStatesIndex]
                                ]
                                _temporalCircleState[clickedIndex] = {
                                    ..._temporalCircleState[clickedIndex],
                                    radius: value,
                                }
                                setTemporalCircleState(_temporalCircleState)
                            }
                        }
                        onAfterChange={
                            () => {
                                dispatchCircleStates({
                                    state: [...temporalCircleState],
                                    index: circleStatesIndex,
                                    action: "modify",
                                })
                                setCircleStatesIndex(circleStatesIndex + 1)
                            }
                        }
                    />
            }

        </Space>
    </>
}

export default CircleDrawer
