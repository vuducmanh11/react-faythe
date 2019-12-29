import React, {Component} from 'react';

import Input from './form/Input';
import Button from './form/Button';
import Select from './form/Select';
import Global from '../env/faythe';
import SweetAlert from 'sweetalert-react';
import uuid from "uuid";
import '../../node_modules/sweetalert/dist/sweetalert.css';
import { Container, Row, Col } from 'reactstrap';

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
            query_epr_options: ['>', '<', '='],
            query_template: {
                'High cpu': '123',
                'High memory': `( avg by(stack_id) ((node_memory_MemTotal_bytes{stack_id=~"${stackid}"} -\
                (node_memory_MemFree_bytes{stack_id=~"${stackid}"} + node_memory_Buffers_bytes\
                {stack_id=~"${stackid}"} + node_memory_Cached_bytes{stack_id=~\
                "${stackid}"})) / node_memory_MemTotal_bytes{stack_id=~"${stackid}"} * 100)) > 20`,
                'custom': ''
            },
            query_options: ['High cpu', 'High memory', 'custom'],
            actions: [
                {   
                    id: 1,
                    action_key:'scaleup_policy',
                    action_url:'http://10.60.17.231:8000/v1/signal/',
                    // action_type:'',
                    // action_method: '',
                    action_attempts: 4,
                    action_delay: '50ms',
                    // action_delaytype: '',
                }
            ],
            scaler: {
                scaler_type: "VirtualMachine",
                cid: this.props.match.params.id,
                // cuser: "admin",
                // cpass: "",
                stack_id: "33e62d1d-69be-4a16-a60a-88e933ef8846",
                stack_name: "contrail",
                // query_template: {
                //     'High cpu': '123',
                //     'High memory': `( avg by(stack_id) ((node_memory_MemTotal_bytes{stack_id=~"${stackid}"} -\
                //     (node_memory_MemFree_bytes{stack_id=~"${stackid}"} + node_memory_Buffers_bytes\
                //     {stack_id=~"${stackid}"} + node_memory_Cached_bytes{stack_id=~\
                //     "${stackid}"})) / node_memory_MemTotal_bytes{stack_id=~"${stackid}"} * 100)) > 20`,
                //     'custom': ''
                // },
                // query_options: ['High cpu', 'High memory', 'custom'],
                query_type: '',
                query_epr: '',
                query_val: '',
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
        this.handleAction = this.handleAction.bind(this);
        this.handleAddAction = this.handleAddAction.bind(this);
        this.handleDeleteAction = this.handleDeleteAction.bind(this);
    }
    handleAddAction() {
        // console.log(this.state.actions);
        var actions = this.state.actions;
        const newAction = {
            id: uuid(),
            action_key: '',
            action_url: '',
            action_attempts: 4,
            action_delay: '50ms',
        };
        // console.log(actions)
        // this.setState({
        //     actions: [...actions, newAction],
        // })
        // console.log("fukkk");
        console.log(actions)
        console.log(Array.isArray(actions))
        actions.push(newAction)
        this.setState({
            actions: actions
        })
        console.log(Array.isArray(this.state.actions));
    }
    handleDeleteAction(index) {
        console.log(index);
        var actions = this.state.actions.slice();
        actions.splice(index, 1);
        this.setState({
            actions: actions
        })
    }
    handleAction(index, e) {
        let value = e.target.value;
        let name = e.target.name;
        console.log(index);
        console.log(name);
        console.log(value);
        var actions = this.state.actions.slice();
        console.log(actions[index])
        actions[index][name] = value
        console.log(actions)
        this.setState({actions: actions})
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
        // var action = this.state.scaler.action
        // console.log(action)
        var scaler = {
            cid : this.state.scaler.cid,
            // cuser: this.state.scaler.cuser,
            // cpass: this.state.scaler.cpass,
            stack_id: this.state.scaler.stack_id,
            stack_name: this.state.scaler.stack_name,
            query: this.state.query_template[this.state.scaler.query_type].concat(this.state.scaler.query_epr).concat(this.state.scaler.query_val),
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
        var actions = this.state.actions;
        for (var i = 0; i < actions.length; i++){
            scaler.actions[actions[i].action_key] = {
                url: actions[i].action_url,
                attempts: actions[i].action_attempts,
                delay: actions[i].action_delay,
            }
        }
        console.log(scaler)
        var json = JSON.stringify(scaler)
        console.log("prreview scaler");
        console.log(json)
        var xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
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
        })
        // xhr.open('POST', 'http://127.0.0.1:8600/clouds/openstack');
        xhr.open('POST', 'http://'.concat(Global.faythe_ip_addr).concat(":").concat(Global.faythe_port).concat("/scalers/").concat(scaler.cid))
        xhr.send(json)
    }
    render() {
        const If = (props) => {
            const condition = props.condition || false;
            const positive = props.then || null;
            const negative = props.else || null;
            
            return condition ? positive : negative;
          };
        const type = this.state.scaler.scaler_type === 'VirtualMachine';
        const actions = []
        for (const [index, value] of this.state.actions.entries()){
            actions.push(
                <Row>
                    <Col xs={3}>
                        <Input required inputType={'text'}
                        name={'action_key'} value={value.action_key}
                        placeholder = {'Enter your'}
                        handleChange = {this.handleAction.bind(this, index)} 
                        />
                    </Col>
                    <Col xs={7}>
                        <Input required inputType={'text'}
                        name={'action_url'} value={value.action_url}
                        placeholder = {'Enter your'}
                        handleChange = {this.handleAction.bind(this, index)}
                        />
                    </Col>
                    <Col xs={1}>
                        <button type="button" onClick = {this.handleAddAction}>Add</button>
                    </Col>
                    <Col xs={1}>
                        <button type="button" onClick = {this.handleDeleteAction.bind(this, index)}>Delete</button>
                    </Col>
                </Row>
            )
        }
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
                        <Row>
                            <Col xs={4}>
                                <Input required 
                                inputType={'text'}
                                title={"Cloud ID"}
                                name={'cid'}
                                value={this.state.scaler.cid}
                                placeholder = {'Fill cloud-id'}
                                handleChange = {this.handleInput}
                                />
                            </Col>
                            <Col xs={4}>
                                <Input required 
                                inputType={'text'}
                                title={"Stack ID"}
                                name={'stack_id'}
                                value={this.state.scaler.stack_id}
                                placeholder = {'Fill stackID'}
                                handleChange = {this.handleInput}
                                />
                            </Col>
                            <Col xs={4}>
                                <Input required 
                                inputType={'text'}
                                title={"Stack name"}
                                name={'stack_name'}
                                value={this.state.scaler.stack_name}
                                placeholder = {'Fill stack name'}
                                handleChange = {this.handleInput}
                                />
                            </Col>
                        </Row>
                        <Select title={'Select type query'} required
                            name={'query_type'}
                            options = {this.state.query_options} 
                            value = {this.state.scaler.query_type}
                            placeholder = {'Select Type'}
                            handleChange = {this.handleInput}
                            />
                        <Row>
                            <Col xs={8}>
                                <Input required 
                                    inputType={'text'}
                                    title={"Query"}
                                    name={'query'}
                                    value={this.state.query_template[this.state.scaler.query_type]}
                                    placeholder = {'Fill query'}
                                    handleChange = {this.handleInput}
                                    />
                            </Col>
                            <Col xs={2}>
                                <Select required
                                    
                                    title={'Expression'}
                                    name={'query_epr'}
                                    options={this.state.query_epr_options}
                                    value={this.state.scaler.query_epr}
                                    placeholder = {'Select Type'}
                                    handleChange = {this.handleInput}
                                />
                            </Col>
                            <Col xs={2}>
                                <Input required 
                                    inputType={'text'}
                                    title={"Value"}
                                    name={'query_val'}
                                    value={this.state.scaler.query_val}
                                    placeholder = {'Fill value'}
                                    handleChange = {this.handleInput}
                                />
                            </Col>
                        </Row>
                        
                        
                        <Row>
                            <Col xs={6}>
                                <Input required 
                                inputType={'text'}
                                title={"duration"}
                                name={'duration'}
                                value={this.state.scaler.duration}
                                placeholder = {'Enter your'}
                                handleChange = {this.handleInput}

                                />
                            </Col>
                            <Col xs={6}>
                                <Input required 
                                inputType={'text'}
                                title={"Interval"}
                                name={'interval'}
                                value={this.state.scaler.interval}
                                placeholder = {'Enter your'}
                                handleChange = {this.handleInput}

                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3}>
                                <p>Action key</p>
                            </Col>
                            <Col xs={7}>
                                <p>Action url</p>
                            </Col>
                            <Col xs={1}>
                                <button type="button" onClick = {this.handleAddAction}>Add</button>
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col xs={3}>
                                <Input required
                                inputType={'text'}
                                // title={"Action key"}
                                name={'action'}
                                value={this.state.scaler.action}
                                placeholder = {'Enter your'}
                                handleChange = {this.handleInput}
                                />    
                            </Col>
                            <Col xs={8}>
                                <Input required 
                                inputType={'text'}
                                // title={"Action Url"}
                                name={'url'}
                                value={this.state.scaler.url}
                                placeholder = {'Enter your'}
                                handleChange = {this.handleInput}
                                />
                            </Col>
                            <Col xs={1}>
                                <button type="button" title={'Add'} onClick = {this.handleAddAction}></button>
                            </Col>

                        </Row> */}
                        { actions}
                        {/* {this.state.actions.map(function(value, key){
                            return (
                                <Row>
                                    <Col xs={3}>
                                        <Input required inputType={'text'}
                                        name={'action'} value={value.action_key}
                                        placeholder = {'Enter your'}
                                        handleChange = {this.handleInput} 
                                        />
                                    </Col>
                                    <Col xs={8}>
                                        <Input required inputType={'text'}
                                        name={'url'} value={value.action_url}
                                        placeholder = {'Enter your'}
                                        handleChange = {this.handleInput}
                                        />
                                    </Col>
                                </Row>
                            )
                        })}                        */}
                        
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
                        <If condition={type}
                            then={<p></p>}
                            else={
                                <div><Input required inputType={'text'} title={"Service chain policy"} name={'sfc_policy'}
                                value={this.state.scaler.sfc_policy} placeholder={'Fill service chain policy'}
                                handleChange={this.handleInput} />
                                <Input required inputType={'text'} title={"Network client"} name={'networks'}
                                value={this.state.scaler.networks} handleChange={this.handleInput} /></div>
                            }
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

    }
}
const buttonStyle = {
    margin : '10px 10px 10px 10px'
}

export default CreateScaler;