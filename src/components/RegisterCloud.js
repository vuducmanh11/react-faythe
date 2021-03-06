import React, {Component} from 'react';

import Input from './form/Input';
import Button from './form/Button';
import Global from '../env/faythe';
import SweetAlert from 'sweetalert-react';

class RegisterCloud extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Content: "",
            cloud: "not fill",
            showAlert: false,
            titleAlert: '',
            textAlert: '',
            newcloud: {
                // auth: {
                    username: "",
                    auth_url: "http://10.60.17.231:35357/v3",
                    password: "contrail123",
                    project_name: "admin",
                // },
                // monitor: {
                    backend: "prometheus",
                    address: "http://127.0.0.1:9090",
                // },
                provider: "openstack"
            }
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleRegisterCloud = this.handleRegisterCloud.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
    }
    handleShowAlert() {
        this.setState({
            showAlert: true
        })
    }
    handleHideAlert() {
        this.setState({
            showAlert: false
        })
    }
    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState( prevState => ({ newcloud: 
            {...prevState.newcloud, [name]: value
        }
        }), () => console.log(this.state.newcloud))
    }
    handleRegisterCloud(e) {
        e.preventDefault();
        // this.setState({
        //     Content: "Let register cloud...."
        // });
        var xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            console.log(xhr.response);
            var response = JSON.parse(xhr.response.split('}')[0].concat('}'))
            if (response["Code"] !== 200) {
                this.setState({
                    titleAlert: response["Status"],
                    textAlert: response["Err"]
                })
            } else {
                this.setState({
                    titleAlert: "Create success"
                })
            }
            this.handleShowAlert();
            console.log(xhr.response)
            console.log("register succes");
        })
        // xhr.open('POST', 'http://127.0.0.1:8600/clouds/openstack');
        xhr.open('POST', 'http://'.concat(Global.faythe_ip_addr).concat(":").concat(Global.faythe_port).concat("/clouds/openstack"))
        xhr.send(JSON.stringify({
            "auth": {
                "username": this.state.newcloud.username,
                "auth_url": this.state.newcloud.auth_url,
                "password": this.state.newcloud.password,
                "project_name": this.state.newcloud.project_name
              },
              "monitor": {
                "backend": this.state.newcloud.backend,
                "address": this.state.newcloud.address
              },
              "provider": this.state.newcloud.provider
        }));
    }
    render() {
        return(
            <div>
                <SweetAlert
                        show={this.state.showAlert}
                        title={this.state.titleAlert}
                        text={this.state.textAlert}
                        showCancelButton
                        onOutsideClick={()  => this.setState({ showAlert: false })}
                        onEscapeKey={()     => this.setState({ showAlert: false })}
                        onCancel={()        => this.setState({ showAlert: false })}
                        onConfirm={()       => this.handleHideAlert()}
                    />
                <form className="container-fluid" onSubmit={this.handleRegisterCloud}>
                    <div>
                        <p>Auth section</p>
                        <Input 
                        inputType={'text'}
                        title={"Username"}
                        name={'username'}
                        value={this.state.newcloud.username}
                        placeholder = {'Enter your'}
                        handleChange = {this.handleInput}
                    />
                    <Input 
                        inputType={'text'}
                        title={"auth_url"}
                        name={'auth_url'}
                        value={this.state.newcloud.auth_url}
                        placeholder = {'Enter your'}
                        handleChange = {this.handleInput}

                    />
                    <Input 
                        inputType={'password'}
                        title={"Password"}
                        name={'password'}
                        value={this.state.newcloud.password}
                        placeholder = {'Enter your'}
                        handleChange = {this.handleInput}

                    />
                    </div>
                    <div>
                        <p>Monitor section</p>
                        <Input 
                        inputType={'text'}
                        title={"Monitor backend"}
                        name={'backend'}
                        value={this.state.newcloud.backend}
                        placeholder = {'Enter your'}
                        handleChange = {this.handleInput}

                    />
                    <Input 
                        inputType={'text'}
                        title={"Monitor Url"}
                        name={'address'}
                        value={this.state.newcloud.address}
                        placeholder = {'Enter your'}
                        handleChange = {this.handleInput}

                    />
                    </div>
                    <Input 
                        inputType={'text'}
                        title={"provider"}
                        name={'provider'}
                        value={this.state.newcloud.provider}
                        placeholder = {'Enter your'}
                        handleChange = {this.handleInput}

                    />
                    
                    <Button 
                        action = {this.handleRegisterCloud}
                        type = {'primary'} 
                        title = {'Register'}
                        style={buttonStyle}
                    />
                </form>
                <div>
                    {this.state.Content}
                </div>
            </div>
        );
    }
}
const buttonStyle = {
    margin : '10px 10px 10px 10px'
}

export default RegisterCloud;