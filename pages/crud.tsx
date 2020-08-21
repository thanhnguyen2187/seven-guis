import React, {
    useState,
    useEffect,
    useReducer, Dispatch
} from 'react'

import {
    Row,
    Col,
    Space,
    Typography,
    Input,
    List, Button,
} from 'antd'

const {
    Text,
    Link,
} = Typography

function Crud() {

    interface Person {
        id: number,
        name: string,
        surname: string
    }

    // const getBackgroundColor = (id: number, currentId: number) =>
    //     id === currentId
    //         ? {"backgroundColor": "green"}
    //         : {}
    const getBackgroundColor = (id: number) =>
        id === currentPerson.id
            ? {"backgroundColor": "green"}
            : {}

    // let people: Array<Person> = []
    const [currentPerson, setCurrentPerson] = useState<Person>({
        id: 0,
        name: "",
        surname: "",
    })

    // const [people, setPeople] = useState<Array<Person>>([])
    const [people, dispatchPeople] = useReducer(
        // tslint:disable-next-line:no-shadowed-variable
        (people: Person[], {type, person}: { type: string, person: Person }) => {
            switch (type) {
                case "add":
                    return [...people, {
                        ...person,
                        id: people.length + 1
                    }]
                case "update":
                    return people.map(
                        _person =>
                            _person.id === person.id
                                ? person
                                : _person
                    )
                case "delete":
                    return people.filter(
                        _person =>
                            _person.id !== person.id
                    )
                default:
                    return []
            }
        },
        // (): Array<Person> => [],
        []
    )

    return <Space direction={"vertical"}>
        <Row>
            <Col>
                <Space>
                    <Text>Filter prefix:</Text>
                    <Input/>
                </Space>
            </Col>
        </Row>
        <Row>
            <Space>
                <Col>
                    <List
                        size={"small"}
                        style={{
                            "width": 200
                        }}
                        dataSource={people}
                        renderItem={
                            item =>
                                <List.Item
                                    onClick={() => {
                                        setCurrentPerson({
                                            ...currentPerson,
                                            id: item.id
                                        })
                                    }}
                                    style={getBackgroundColor(item.id)}
                                >
                                    {item.name}, {item.surname}
                                </List.Item>
                        }
                    />
                </Col>
                <Col>
                    <Space direction={"vertical"}>
                        <Row>
                            <Col style={{"width": 100}}>Name: </Col>
                            <Col>
                                <Input
                                    value={currentPerson.name}
                                    onChange={event => setCurrentPerson(
                                        {
                                            ...currentPerson,
                                            name: event.target.value
                                        }
                                    )}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{"width": 100}}>Surname: </Col>
                            <Col>
                                <Input
                                    value={currentPerson.surname}
                                    onChange={event => setCurrentPerson(
                                        {
                                            ...currentPerson,
                                            surname: event.target.value
                                        }
                                    )}
                                />
                            </Col>
                        </Row>
                    </Space>
                </Col>
            </Space>
        </Row>
        <Row>
            <Col>
                <Space>
                    <Button
                        onClick={
                            () => dispatchPeople(
                                {type: "add", person: currentPerson}
                            )
                        }
                    >Create</Button>
                    <Button
                        onClick={
                            () => dispatchPeople(
                                {type: "update", person: currentPerson}
                            )
                        }
                    >Update</Button>
                    <Button
                        onClick={
                            () => dispatchPeople(
                                {type: "delete", person: currentPerson}
                            )
                        }
                    >Delete</Button>
                </Space>
            </Col>
        </Row>
    </Space>
}

export default Crud;