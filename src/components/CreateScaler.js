import React, {Component} from 'react';

import Input from './form/Input';
import InputNoLabel from './form/InputNoLabel';
import Button from './form/Button';
import Select from './form/Select';
import Global from '../env/faythe';
import SweetAlert from 'sweetalert-react';
import uuid from "uuid";
import '../../node_modules/sweetalert/dist/sweetalert.css';
import { Container, Row, Col } from 'reactstrap';
import 'font-awesome/css/font-awesome.min.css';

class CreateScaler extends Component {
    constructor(props) {
        var stackid = "33e62d1d-69be-4a16-a60a-88e933ef8846";
        super(props);
        this.state = {
            showAlert: false,
            stackid: stackid,
            titleAlert: '',
            textAlert: '',
            Content: "",
            cloud: "not fill",
            scale_options: ['VirtualMachine', 'ServiceChain'],
            state_options: [ 'false', 'true' ],
            query_epr_options: ['>', '<', '='],
            query_template: {
                'Cpu': `( count(count (node_cpu_seconds_total { stack_id="${stackid}",job="faythe_scale_test"}) \
                by (cpu, instance)) - avg(sum by (mode) (irate(node_cpu_seconds_total{  mode='idle', stack_id="${stackid}" \
                ,job="faythe_scale_test"}[5m] )))) * 100 / count(count (node_cpu_seconds_total { stack_id="${stackid}" \ 
                ,job="faythe_scale_test"  }) by (cpu, instance))`,

                'Memory': `( avg by(stack_id) ((node_memory_MemTotal_bytes{stack_id=~"${stackid}"} -\
                (node_memory_MemFree_bytes{stack_id=~"${stackid}"} + node_memory_Buffers_bytes\
                {stack_id=~"${stackid}"} + node_memory_Cached_bytes{stack_id=~\
                "${stackid}"})) / node_memory_MemTotal_bytes{stack_id=~"${stackid}"} * 100))`,

                'Bandwidth': `avg by(stack_id) (irate(node_network_receive_packets_total{job="faythe_scale_test", stack_id="${stackid}", device="br0"}[5m] ))`,
                'Custom': ''
            },
            query_options: ['Cpu', 'Memory', 'Bandwidth', 'Custom'],
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
                active: "",
                cooldown: "180s",
                tags: ["manhvd"],
                // networks: ["left-client","right-client"],
                // sfc_policy: "fw_policy"
                networks: "",
                sfc_policy: "fw_policy"
            }
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        console.log("fuck   ")
        let value = e.target.value;
        let name = e.target.name;
        // handle networks, tags entry
        if (name === "networks" || name === "tags") {
            console.log("fucckkk")
            this.setState( prevState => ({ scaler: 
                {...prevState.scaler, [name]: value.split(',')
            }
            }), () => console.log(this.state.scaler))
        } else if (name === "active") {
            var isActive = (value === 'true')
            this.setState( prevState => ({ scaler:
                {...prevState.scaler, [name]: isActive}
            }), ()=> console.log(this.state.scaler))
        }
        else
        {
            this.setState( prevState => ({ scaler: 
                {...prevState.scaler, [name]: value
            }
            }), () => console.log(this.state.scaler))
        }
    }
    handleChange(e) {
        let value = e.target.value;
        let name = e.target.name;
        let new_query_template = this.state.query_template
        let query_type = this.state.scaler.query_type
        new_query_template[query_type] = value
        this.setState({
            query_template: new_query_template
        })
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
        var scaler = {
            // cid : this.state.scaler.cid,
            // stack_id: this.state.scaler.stack_id,
            // stack_name: this.state.scaler.stack_name,
            query: this.state.query_template[this.state.scaler.query_type].concat(this.state.scaler.query_epr).concat(this.state.scaler.query_val)
            .split(this.state.stackid).join(this.state.scaler.stack_id),
            duration: this.state.scaler.duration,
            interval: this.state.scaler.interval,
            description: "",
            actions: {},
            active: this.state.scaler.active,
            cooldown: this.state.scaler.cooldown,
            tags: this.state.scaler.tags,
            // sfc_policy: this.state.scaler.sfc_policy,
            // networks: this.state.scaler.networks
        }
        var actions = this.state.actions;
        for (var i = 0; i < actions.length; i++){
            scaler.actions[actions[i].action_key] = {
                url: actions[i].action_url,
                // attempts: actions[i].action_attempts,
                // delay: actions[i].action_delay,
                // action: {
                    type: "http",
                    delay_type: "fixed",
                    method: "POST",
                    delay: "50ms"
                // }
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
        var url = 'http://'.concat(Global.faythe_ip_addr).concat(":").concat(Global.faythe_port).concat("/scalers/").concat(this.state.scaler.cid)
        console.log(url)
        xhr.open('POST', url)
        xhr.send(json)
    }
    render() {
        const handler = this.handleInput
        const If = (props) => {
            const condition = props.condition || false;
            const positive = props.then || null;
            const negative = props.else || null;
            
            return condition ? positive : negative;
          };
        const type = this.state.scaler.scaler_type === 'ServiceChain';
        const actions = []
        const ServiceOption = (props) => {
            return (
                <div>
                    <Input required inputType={'text'} title={"Service chain policy"} name={'sfc_policy'}
                        value={props.sfc_policy} placeholder={'Fill service chain policy'}
                        handleChange={props.handleInput} />
                    <Input required inputType={'text'} title={"Network client"} name={'networks'}
                        value={props.networks} handleChange={props.handleInput} />
                </div>
            )
        }
        for (const [index, value] of this.state.actions.entries()){
            actions.push(
                <Row>
                    <Col xs={3}>
                        <InputNoLabel required inputType={'text'}
                        name={'action_key'} value={value.action_key}
                        placeholder = {'Enter your'}
                        handleChange = {this.handleAction.bind(this, index)} 
                        />
                    </Col>
                    <Col xs={6}>
                        <InputNoLabel required inputType={'text'}
                        name={'action_url'} value={value.action_url}
                        placeholder = {'Enter your'}
                        handleChange = {this.handleAction.bind(this, index)}
                        />
                    </Col>
                    <Col xs={1}>
                        <button type="button" onClick = {this.handleAddAction}><i className="fa fa-plus"></i></button>
                    </Col>
                    <Col xs={1}>
                        <button type="button" onClick = {this.handleDeleteAction.bind(this, index)}><i className="fa fa-minus"></i></button>
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
                        <h2>Create scaler</h2>
                        {/* <Select title={'Select type scaler'}
                            name={'scaler_type'}
                            options = {this.state.scale_options} 
                            value = {this.state.scaler.scaler_type}
                            placeholder = {'Select Type'}
                            handleChange = {this.handleInput}
                            /> */}
                        <Row>
                            <Col xs={6}>
                                <Input required 
                                inputType={'text'}
                                title={"Cloud ID"}
                                name={'cid'}
                                value={this.state.scaler.cid}
                                placeholder = {'Fill cloud-id'}
                                handleChange = {this.handleInput}
                                />
                            </Col>
                            <Col xs={6}>
                                <Input required 
                                inputType={'text'}
                                title={"Stack ID"}
                                name={'stack_id'}
                                value={this.state.scaler.stack_id}
                                placeholder = {'Fill stackID'}
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
                            <Col xs={12} sm={12} md={8}>
                                <Input required 
                                    inputType={'text'}
                                    title={"Query"}
                                    name={'query'}
                                    value={this.state.query_template[this.state.scaler.query_type]}
                                    placeholder = {'Fill query'}
                                    handleChange = {this.handleChange}
                                    />
                            </Col>
                            <Col xs={6} sm={6} md={2}>
                                <Select required
                                    title={'Expression'}
                                    name={'query_epr'}
                                    options={this.state.query_epr_options}
                                    value={this.state.scaler.query_epr}
                                    placeholder = {'Select Type'}
                                    handleChange = {this.handleInput}
                                />
                            </Col>
                            <Col xs={6} sm={6} md={2}>
                                <Input required 
                                    inputType={'number'}
                                    min="0" step="1" pattern="\d*"
                                    title={"Value"}
                                    name={'query_val'}
                                    value={this.state.scaler.query_val}
                                    placeholder = {''}
                                    handleChange = {this.handleInput}
                                />
                            </Col>
                        </Row>
                        
                        
                        <Row>
                            <Col xs={6}>
                                <Input required 
                                inputType={'text'}
                                title={"Duration"}
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
                                <p>Key</p>
                            </Col>
                            <Col xs={6}>
                                <p>Action url</p>
                            </Col>
                            <Col xs={2}>
                                <button type="button" onClick = {this.handleAddAction}><i className="fa fa-plus" aria-hidden="true"></i></button>
                            </Col>
                        </Row>
                        { actions}
                        <Select title={'Choose state of scaler'}
                            name={'active'}
                            options = {this.state.state_options} 
                            value = {this.state.scaler.active}
                            placeholder = {'State of scaler'}
                            handleChange = {this.handleInput}
                            />
                        {/* <Input required 
                            inputType={'text'}
                            title={"Active"}
                            name={'active'}
                            value={this.state.scaler.active}
                            placeholder = {'Enter your'}
                            handleChange = {this.handleInput}
                        /> */}
                        <Input required 
                            inputType={'text'}
                            title={"Tags"}
                            name={'tags'}
                            value={this.state.scaler.tags}
                            placeholder = {'Enter your'}
                            handleChange = {this.handleInput}
                        />
                        
                        {/* {
                            type
                            ? (
                                <div>
                                    <Input required inputType={'text'} title={"Service chain policy"} name={'sfc_policy'}
                                        value={this.state.scaler.sfc_policy} placeholder={'Fill service chain policy'}
                                        handleChange={this.handleInput} />
                                    <Input required inputType={'text'} title={"Network client"} name={'networks'}
                                        value={this.state.scaler.networks} handleChange={this.handleInput} pattern="[a-z0-9._%+-]+,[a-z0-9._%+-]+" />
                                </div>
                            ) : (<p></p>) 
                        } */}
                        {/* <If condition={type}
                            then={<p></p>}
                            else={
                                // <div>
                                //     <Input required inputType={'text'} title={"Service chain policy"} name={'sfc_policy'}
                                //         value={this.state.scaler.sfc_policy} placeholder={'Fill service chain policy'}
                                //         handleChange={this.handleInput} />
                                //     <Input required inputType={'text'} title={"Network client"} name={'networks'}
                                //         value={this.state.scaler.networks} handleChange={this.handleInput} />
                                // </div>
                                <ServiceOption handleInput={this.handleInput} sfc_policy={this.state.scaler.sfc_policy} networks={this.state.scaler.networks} />
                            }
                            /> */}
                        <Button 
                            // action = {this.handleCreateScaler}
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
