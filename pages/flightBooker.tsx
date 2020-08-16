import React, {useState} from 'react'
import {
    Dropdown,
    Typography,
    Space,
    Input,
    Menu,
    Select,
    Button,
} from 'antd'

const {
    Text,
    Link,
} = Typography

const flightTypes: {
    oneWayFlight: string,
    returnFlight: string,
} = {
    oneWayFlight: "one-way flight",
    returnFlight: "return flight",
}

function FlightBooker() {

    const [validState, setValidState] = useState<boolean>(false)
    const [firstDateString, setFirstDateString] = useState<string>()
    const [secondDateString, setSecondDateString] = useState<string>()

    // tslint:disable-next-line:no-shadowed-variable
    function validateDateStrings(firstDateString: string | undefined, secondDateString: string | undefined): boolean {
        let firstDate: number = 0;
        let secondDate: number = 0;
        if (firstDateString && secondDateString) {
            firstDate = Date.parse(firstDateString)
            secondDate = Date.parse(secondDateString)
        }

        return firstDate <= secondDate // the first date is earlier than the second date
    }

    function validateDateString(
        dateString: string | undefined,
    ): boolean {
       if (dateString === '' || dateString === undefined) {
           return true
       }
       else {
           return Boolean(Date.parse(dateString as string))
       }
    }

    return (
        <Space direction={"vertical"}>
            <Select defaultValue={Object.keys(flightTypes)[0]}>
                {
                    Object.entries(flightTypes).map(([key, value]) => (
                        <Select.Option value={key}>
                            {value}
                        </Select.Option>
                    ))
                }
            </Select>
            <Input
                value={firstDateString}
                onChange={event => setFirstDateString(event.target.value)}
                style={validateDateString(firstDateString) ? {} : {backgroundColor: 'red'}}
            />
            <Input
                value={secondDateString}
                onChange={event => setSecondDateString(event.target.value)}
                style={validateDateString(secondDateString) ? {} : {backgroundColor: 'red'}}
            />
            <Button disabled={!validateDateStrings(firstDateString, secondDateString)}>
                Book
            </Button>
        </Space>
    )
}

export default FlightBooker