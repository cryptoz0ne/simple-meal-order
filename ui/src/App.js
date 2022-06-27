import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table, Spinner } from "react-bootstrap";

function App() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/orders`)
    .then(response => response.json())
    .then(data => {
      setOrders(data);
      setLoading(false);
    });
  }, [setOrders])

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    setProcessing(true);

    await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: description
      })
    })
    .then(response => response.json())
    .then(data => {
      setOrders([...orders, data]);
    })
    .catch((error) => {
      setOrders([...orders, error]);
    })

    setDescription('');
    setProcessing(false);
  }

  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col>
          <h1>Meal Order Board</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Order Description</Form.Label>
              <Form.Control type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </Form.Group>
            <Button className="btn-submit" variant="primary" type="submit" disabled={processing || loading}>
              {processing ? <Spinner animation="border" /> : 'Submit'}
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col className="mt-3 text-center">
          <h5 className="mb-3">Order List</h5>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <tr>
                  <td colspan="3">
                    <p className="mb-0">Loading Orders....</p>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{order.description}</td>
                    <td>{order.status || order.error}</td>
                  </tr>
                ))}
              </tbody>
            )}
            
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
