import React, {Component} from 'react'
import Input from 'rambler-ui/Input'
import FormGroup from 'rambler-ui/FormGroup'
import FieldStatus from 'rambler-ui/FieldStatus'
import RamblerMailIcon from 'rambler-ui/icons/services/RamblerMailIcon'

export default class InputExample extends Component {
  state = {
    value: ''
  }

  onChange = (event, value) => {
    this.setState({value})
  }

  render() {
    return (
      <div>
        <div>
          <h3>Form groups</h3>
          <div style={{display: 'flex'}}>
            {['regular', 'awesome', 'promo'].map((variation, i) => (
              <div style={{width: 196, marginLeft: i && 20}} key={variation}>
                <h4>{`Variation: ${variation}`}</h4>
                <FormGroup label="Input">
                  <Input
                    type="text"
                    value={this.state.value}
                    onChange={this.onChange}
                    placeholder="placeholder"
                    variation={variation}
                  />
                </FormGroup>
                <FormGroup label="Input password">
                  <Input
                    type="password"
                    value={this.state.value}
                    onChange={this.onChange}
                    placeholder="placeholder"
                    passwordIconTooltip="Показать пароль"
                    variation={variation}
                  />
                </FormGroup>
                <FormGroup label="Input isFocused">
                  <Input
                    isFocused={true}
                    type="text"
                    value={this.state.value}
                    onChange={this.onChange}
                    placeholder="placeholder"
                    variation={variation}
                    tabIndex={-1}
                  />
                </FormGroup>
                <FormGroup label="Input success">
                  <FieldStatus type="success" message="Success message">
                    <Input
                      status="success"
                      type="text"
                      value={this.state.value}
                      onChange={this.onChange}
                      placeholder="placeholder"
                      variation={variation}
                    />
                  </FieldStatus>
                </FormGroup>
                <FormGroup label="Input warning">
                  <FieldStatus type="warning" message="Warning message">
                    <Input
                      status="warning"
                      type="text"
                      value={this.state.value}
                      onChange={this.onChange}
                      placeholder="placeholder"
                      variation={variation}
                    />
                  </FieldStatus>
                </FormGroup>
                <FormGroup label="Input error">
                  <FieldStatus type="error" message="Error message">
                    <Input
                      status="error"
                      type="text"
                      value={this.state.value}
                      onChange={this.onChange}
                      placeholder="placeholder"
                      variation={variation}
                    />
                  </FieldStatus>
                </FormGroup>
                <FormGroup label="Input disabled">
                  <Input
                    disabled
                    type="text"
                    value={this.state.value}
                    onChange={this.onChange}
                    placeholder="placeholder"
                    variation={variation}
                  />
                </FormGroup>
                <FormGroup label="Input small" size="small">
                  <Input
                    size="small"
                    type="text"
                    value={this.state.value}
                    onChange={this.onChange}
                    placeholder="placeholder"
                    variation={variation}
                  />
                </FormGroup>
                <FormGroup label="Input with right icon">
                  <Input
                    iconRight={<RamblerMailIcon />}
                    type="text"
                    value={this.state.value}
                    onChange={this.onChange}
                    placeholder="placeholder"
                    variation={variation}
                  />
                </FormGroup>
                <FormGroup label="Input time (with placeholder)">
                  <Input
                    type="time"
                    value={this.state.value}
                    onChange={this.onChange}
                    placeholder="placeholder"
                    variation={variation}
                  />
                </FormGroup>
                <FormGroup label="Input date (without placeholder)">
                  <Input
                    type="date"
                    value={this.state.value}
                    onChange={this.onChange}
                    variation={variation}
                  />
                </FormGroup>
                <FormGroup label="Input month (without placeholder)">
                  <Input
                    type="month"
                    value={this.state.value}
                    onChange={this.onChange}
                    variation={variation}
                  />
                </FormGroup>
                <FormGroup label="Input password with left and right icon">
                  <Input
                    iconLeft={<RamblerMailIcon />}
                    iconRight={<RamblerMailIcon />}
                    type="password"
                    value={this.state.value}
                    onChange={this.onChange}
                    placeholder="placeholder"
                    variation={variation}
                    iconLeftClassName="leftIcon"
                    iconRightClassName="rightIcon"
                  />
                </FormGroup>
                <FormGroup
                  label="Input small password with left and right icon"
                  size="small">
                  <Input
                    size="small"
                    iconLeft={<RamblerMailIcon />}
                    iconRight={<RamblerMailIcon />}
                    type="password"
                    value={this.state.value}
                    onChange={this.onChange}
                    placeholder="placeholder"
                    variation={variation}
                  />
                </FormGroup>
              </div>
            ))}
          </div>
        </div>
        <div style={{width: '600px'}}>
          <h3>Inline form groups</h3>
          <FormGroup label="Input" inline={true}>
            <Input
              type="text"
              value={this.state.value}
              onChange={this.onChange}
              placeholder="placeholder"
            />
          </FormGroup>
          <FormGroup label="Input password" inline={true}>
            <Input
              type="password"
              value={this.state.value}
              onChange={this.onChange}
              placeholder="placeholder"
              passwordIconTooltip={type =>
                type === 'password' ? 'Показать пароль' : 'Скрыть пароль'
              }
            />
          </FormGroup>
          <FormGroup label="Input success" inline={true}>
            <FieldStatus type="success" message="Success message">
              <Input
                status="success"
                type="text"
                value={this.state.value}
                onChange={this.onChange}
                placeholder="placeholder"
              />
            </FieldStatus>
          </FormGroup>
          <FormGroup label="Input warning" inline={true}>
            <FieldStatus type="warning" message="Warning message">
              <Input
                status="warning"
                type="text"
                value={this.state.value}
                onChange={this.onChange}
                placeholder="placeholder"
              />
            </FieldStatus>
          </FormGroup>
          <FormGroup label="Input error" inline={true}>
            <FieldStatus type="error" message="Error message">
              <Input
                status="error"
                type="text"
                value={this.state.value}
                onChange={this.onChange}
                placeholder="placeholder"
              />
            </FieldStatus>
          </FormGroup>
          <FormGroup label="Input disabled" inline={true}>
            <Input
              disabled
              type="text"
              value={this.state.value}
              onChange={this.onChange}
              placeholder="placeholder"
            />
          </FormGroup>
          <FormGroup label="Input small" size="small" inline={true}>
            <Input
              size="small"
              type="text"
              value={this.state.value}
              onChange={this.onChange}
              placeholder="placeholder"
            />
          </FormGroup>
          <FormGroup label="Input with left icon" inline={true}>
            <Input
              iconLeft={<RamblerMailIcon />}
              type="text"
              value={this.state.value}
              onChange={this.onChange}
              placeholder="placeholder"
            />
          </FormGroup>
          <FormGroup label="Input with right icon" inline={true}>
            <Input
              iconRight={<RamblerMailIcon />}
              type="text"
              value={this.state.value}
              onChange={this.onChange}
              placeholder="placeholder"
            />
          </FormGroup>
          <FormGroup
            label="Input with max length restriction (10 chars)"
            inline={true}>
            <Input
              type="text"
              value={this.state.value}
              onChange={this.onChange}
              placeholder="placeholder"
              maxLength={10}
            />
          </FormGroup>
          <FormGroup
            label="Input with max length restriction and counter"
            inline={true}>
            <Input
              type="text"
              value={this.state.value}
              onChange={this.onChange}
              placeholder="placeholder"
              maxLength={10}
              characterCounter={true}
            />
          </FormGroup>
        </div>
      </div>
    )
  }
}
