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
                        <Select title={'Select type query'} required
                            name={'query_template'}
                            options = {this.state.scaler.query_options} 
                            value = {this.state.scaler.query_template}
                            placeholder = {'Select Type'}
                            handleChange = {this.handleInput}
                            />
                        <Row>
                            <Col xs={8}>
                                <Input required 
                                    inputType={'text'}
                                    title={"Query"}
                                    name={'query'}
                                    value={this.state.scaler.query[this.state.scaler.query_template]}
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
