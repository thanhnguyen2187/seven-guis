import React, {useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function Calculator() {

    const [value, setValue] = useState(0)

    return <Container>
        <Row>
            <Col xs lg="2">
                <Form.Text>{value}</Form.Text>
            </Col>
            <Col xs lg="2">
                <Button onClick={() => {
                    setValue(value + 1)
                }}>Count</Button>
            </Col>
        </Row>
    </Container>
}

export default Calculator