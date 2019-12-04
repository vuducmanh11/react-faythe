import React, {Component} from 'react';

import Input from './form/Input';
import Button from './form/Button';
import Select from './form/Select';
import Global from '../env/faythe';
import SweetAlert from 'sweetalert-react';
import '../../node_modules/sweetalert/dist/sweetalert.css';

class CreateScaler extends Component {
    constructor(props) {
        var stackid = "33e62d1d-69be-4a16-a60a-88e933ef8846";
        super(props);
        this.state = {
            showAlert: false,
            titleAlert: '',
            textAlert: '',
            Content: "",
            cloud: "not fill",
            scale_options: ['VirtualMachine', 'ServiceChain'],
            scaler: {
                scaler_type: "",
                cid: this.props.match.params.id,
                // cuser: "admin",
                // cpass: "",
                stack_id: "33e62d1d-69be-4a16-a60a-88e933ef8846",
                stack_name: "contrail",
                query: `( avg by(stack_id) ((node_memory_MemTotal_bytes{stack_id=~"${stackid}"} -\
                (node_memory_MemFree_bytes{stack_id=~"${stackid}"} + node_memory_Buffers_bytes\
                {stack_id=~"${stackid}"} + node_memory_Cached_bytes{stack_id=~\
                "${stackid}"})) / node_memory_MemTotal_bytes{stack_id=~"${stackid}"} * 100)) > 20`,
                duration: "4m",
                interval: "30s",
                action: "scaleup_policy",
                url: "http://10.60.17.231:8000/v1/signal/",
                attempts: 4,
                delay: "50ms",
                type: "http",
                delay_type: "backoff",
                method: "POST",
                active: false,
                cooldown: "400s",
                tags: ["manhvd"],
                networks: ["left-client","right-client"],
                sfc_policy: "fw_policy"
            }
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleCreateScaler = this.handleCreateScaler.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
    }
    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        if (name === "networks" || name === "tags") {
            this.setState( prevState => ({ scaler: 
                {...prevState.scaler, [name]: value.split(',')
            }
            }), () => console.log(this.state.scaler))
        } else {
            this.setState( prevState => ({ scaler: 
                {...prevState.scaler, [name]: value
            }
            }), () => console.log(this.state.scaler))
        }
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
    handleCreateScaler(e) {
        e.preventDefault();
        var action = this.state.scaler.action
        console.log(action)
        var scaler = {
            cid : this.state.scaler.cid,
            // cuser: this.state.scaler.cuser,
            // cpass: this.state.scaler.cpass,
            stack_id: this.state.scaler.stack_id,
            stack_name: this.state.scaler.stack_name,
            query: this.state.scaler.query,
            duration: this.state.scaler.duration,
            interval: this.state.scaler.interval,
            actions: {},
            active: this.state.scaler.active,
            cooldown: this.state.scaler.cooldown,
            // tags: this.state.scaler.tags.split(','),
            tags: this.state.scaler.tags,
            sfc_policy: this.state.scaler.sfc_policy,
            // networks: this.state.scaler.networks.split(',')
            networks: this.state.scaler.networks
        }
        scaler.actions[action] = {
            url: this.state.scaler.url,
            attempts: this.state.scaler.attempts,
            delay: this.state.scaler.delay,
            // type: this.state.scaler.type,
            // delay_type: this.state.scaler.delay_type,
            // method: this.state.scaler.method,
        }
        console.log(scaler)
        var json = JSON.stringify(scaler)
        console.log("prreview scaler");
        console.log(json)
        var xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            var response = JSON.parse(xhr.response.split('}')[0].concat('}'))
            if (response["Code"] != 200) {
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
        })
        // xhr.open('POST', 'http://127.0.0.1:8600/clouds/openstack');
        xhr.open('POST', 'http://'.concat(Global.faythe_ip_addr).concat(":").concat(Global.faythe_port).concat("/scalers/").concat(scaler.cid))
        xhr.send(json)
    }
    render() {
        // const {data} = this.props.location
        // console.log("fuckkk ", data)
        // console.log(this.props)
        
        if (this.state.scaler.scaler_type === "VirtualMachine") {
            return (
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
                    
                    <form className="container-fluid" onSubmit={this.handleCreateScaler}>
                    {/* <form className="container-fluid" onSubmit={this.handleShowAlert}> */}
                        <h2>Select type scaler</h2>
                        <Select title={'Select type scaler'} required
                            name={'scaler_type'}
                            options = {this.state.scale_options} 
                            value = {this.state.scaler.scaler_type}
                            placeholder = {'Select Type'}
                            handleChange = {this.handleInput}
                            />
                        <Input required 
                        inputType={'text'}
                        title={"Cloud ID"}
                        name={'cid'}
                        value={this.state.scaler.cid}
                        placeholder = {'Fill cloud-id'}
                        handleChange = {this.handleInput}
                        />
                        <Input required 
                        inputType={'text'}
                        title={"Stack ID"}
                        name={'stack_id'}
                        value={this.state.scaler.stack_id}
                        placeholder = {'Fill stackID'}
                        handleChange = {this.handleInput}
                        />
                        <Input required 
                        inputType={'text'}
                        title={"Stack name"}
                        name={'stack_name'}
                        value={this.state.scaler.stack_name}
                        placeholder = {'Fill stack name'}
                        handleChange = {this.handleInput}
                        />
                        <Input required 
                        inputType={'text'}
                        title={"query"}
                        name={'query'}
                        value={this.state.scaler.query}
                        placeholder = {'Fill query'}
                        handleChange = {this.handleInput}
                        />
                        <Input required 
                            inputType={'text'}
                            title={"duration"}
                            name={'duration'}
                            value={this.state.scaler.duration}
                            placeholder = {'Enter your'}
                            handleChange = {this.handleInput}

                        />
                        <Input required 
                            inputType={'text'}
                            title={"Interval"}
                            name={'interval'}
                            value={this.state.scaler.interval}
                            placeholder = {'Enter your'}
                            handleChange = {this.handleInput}

                        />
                        <Input required
                            inputType={'text'}
                            title={"Action key"}
                            name={'action'}
                            value={this.state.scaler.action}
                            placeholder = {'Enter your'}
                            handleChange = {this.handleInput}
                        />    
                        <Input required 
                            inputType={'text'}
                            title={"Url trigger scale"}
                            name={'url'}
                            value={this.state.scaler.url}
                            placeholder = {'Enter your'}
                            handleChange = {this.handleInput}
                        />
                        <Input required 
                            inputType={'text'}
                            title={"Active"}
                            name={'active'}
                            value={this.state.scaler.active}
                            placeholder = {'Enter your'}
                            handleChange = {this.handleInput}
                        />
                        <Input required 
                            inputType={'text'}
                            title={"Tags"}
                            name={'tags'}
                            value={this.state.scaler.tags}
                            placeholder = {'Enter your'}
                            handleChange = {this.handleInput}
                        />
                        
                        <Button 
                            action = {this.handleCreateScaler}
                            type = {'primary'} 
                            title = {'Register'}
                            style={buttonStyle}
                        />
                    </form>    
                </div>
            )
        } else if (this.state.scaler.scaler_type === "ServiceChain") {        
        return(
            <div>
                <form className="container-fluid" onSubmit={this.handleCreateScaler}>
                    <div>
                        <h2>Select type scaler</h2>
                        <Select title={'Select type scaler'}
                            name={'scaler_type'}
                            options = {this.state.scale_options} 
                            value = {this.state.scaler.scaler_type}
                            placeholder = {'Select Type'}
                            handleChange = {this.handleInput}
                            />
                        <Input required 
                        inputType={'text'}
                        title={"Cloud ID"}
                        name={'cid'}
                        value={this.state.scaler.cid}
                        placeholder = {'Fill cloud-id'}
                        handleChange = {this.handleInput}
                        />
                        <Input required 
                        inputType={'text'}
                        title={"Stack ID"}
                        name={'stack_id'}
                        value={this.state.scaler.stack_id}
                        placeholder = {'Fill stackID'}
                        handleChange = {this.handleInput}
                        />
                        <Input required 
                        inputType={'text'}
                        title={"Stack name"}
                        name={'stack_name'}
                        value={this.state.scaler.stack_name}
                        placeholder = {'Fill stack name'}
                        handleChange = {this.handleInput}
                        />
                        <Input required inputType={'text'} title={"Service chain policy"} name={'sfc_policy'}
                            value={this.state.scaler.sfc_policy} placeholder={'Fill service chain policy'}
                            handleChange={this.handleInput} />
                        <Input required inputType={'text'} title={"Network client"} name={'networks'}
                            value={this.state.scaler.networks} handleChange={this.handleInput} />
                        <Input required 
                        inputType={'text'}
                        title={"query"}
                        name={'query'}
                        value={this.state.scaler.query}
                        placeholder = {'Fill query'}
                        handleChange = {this.handleInput}
                        />
                        <Input required 
                            inputType={'text'}
                            title={"duration"}
                            name={'duration'}
                            value={this.state.scaler.duration}
                            placeholder = {'Enter your'}
                            handleChange = {this.handleInput}

                        />
                        <Input required 
                            inputType={'text'}
                            title={"Interval"}
                            name={'interval'}
                            value={this.state.scaler.interval}
                            placeholder = {'Enter your'}
                            handleChange = {this.handleInput}

                        />
                        <Input required
                            inputType={'text'}
                            title={"Action key"}
                            name={'action'}
                            value={this.state.scaler.action}
                            placeholder = {'Enter your'}
                            handleChange = {this.handleInput}
                        />    
                        <Input required 
                            inputType={'text'}
                            title={"Url trigger scale"}
                            name={'url'}
                            value={this.state.scaler.url}
                            placeholder = {'Enter your'}
                            handleChange = {this.handleInput}
                        />
                        <Input required 
                            inputType={'text'}
                            title={"Active"}
                            name={'active'}
                            value={this.state.scaler.active}
                            placeholder = {'Enter your'}
                            handleChange = {this.handleInput}
                        />
                        <Input required 
                            inputType={'text'}
                            title={"Tags"}
                            name={'tags'}
                            value={this.state.scaler.tags}
                            placeholder = {'Enter your'}
                            handleChange = {this.handleInput}
                        />
                        
                        <Button 
                            action = {this.handleCreateScaler}
                            type = {'primary'} 
                            title = {'Register'}
                            style={buttonStyle}
                        />
                    </div>
                </form>
                <div>
                    {this.state.Content}
                </div>
            </div>
        );
        } else {
            return(
                <div>
                    <form className="container-fluid" onSubmit={this.handleCreateScaler}>
                        <div>
                            <h2>Select type scaler</h2>
                            <Select title={'Select type scaler'}
                                name={'scaler_type'}
                                options = {this.state.scale_options} 
                                value = {this.state.scaler.scaler_type}
                                placeholder = {'Select Type'}
                                handleChange = {this.handleInput}
                                />
                        </div>
                    </form>
                    <div>
                        {this.state.Content}
                    </div>
                </div>
            );

        }
    }
}
const buttonStyle = {
    margin : '10px 10px 10px 10px'
}

export default CreateScaler;