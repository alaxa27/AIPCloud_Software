import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, Form} from 'reactstrap';


class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }

    this.handleChangeUsername = this.handleChangeUsername.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleChangeUsername(e) {
    this.setState({username: e.target.value})
  }

  handleChangePassword(e) {
    this.setState({password: e.target.value})
  }

  handleLogin(e) {
    e.preventDefault();
    if (this.state.username === "demo001" && this.state.password === "defaultpassword") {
      this.props.history.push("/dashboard")
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <Form onSubmit={this.handleLogin}>
                      <InputGroup className="mb-3">
                        <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                      <Input type="text" placeholder="Username" onChange={this.handleChangeUsername}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                      <Input type="password" placeholder="Password" onChange={this.handleChangePassword}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" type="submit" value="submit" onClick={this.handleLogin}>Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                    </Col>
                  </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                    <p>To get access to this software you need to get in touch with JDC. Feel free to contact us</p>
                  <Button color="primary" className="mt-3" active>Contact us Now!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
