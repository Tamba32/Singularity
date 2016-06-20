import React from 'react';
import classNames from 'classnames';
import Utils from '../../../utils';
import select2 from 'select2';

const DropDown = React.createClass({

    componentDidMount() {
        if (this.props.prop.generateSelectBox) {
            const generateSelectBox = () => {
                $(`#${this.props.id}`).select2(this.props.prop.selectBoxOptions).on('change', this.props.prop.updateFn);
            }
            generateSelectBox();
            // Delay needed because componentDidMount() is called before the entire document is rendered to HTML
            // There is no lifecycle method that runs as soon as the document is rendered as HTML...
            setTimeout(generateSelectBox, 1);
        }
    },

    getValue(element) {
        if (typeof element === 'object') {
            return element.value;
        } else {
            return element;
        }
    },

    getUserReadable(element) {
        if (typeof element === 'object') {
            return element.user;
        } else {
            return element;
        }
    },

    dropDownOpts() {
        return this.props.prop.choices.map((element, key) => {
            return (
                <option
                    key={key}
                    value={this.getValue(element)}>
                    {this.getUserReadable(element)}
                </option>
            );
        });
    },

    // Pass in choices to @props.prop.choices as
    // an array of primitives, objects with user and value
    // (where user is the user readable text and value is
    //  the value that is returned if that choice is chosen)
    // or a mixture
    render() {
        return (
            <select
                id={this.props.id}
                className={classNames('form-control', this.props.prop.customClass)}
                type={this.props.prop.inputType}
                onChange={this.props.prop.updateFn}
                value={this.props.prop.value}
                defaultValue={this.props.prop.defaultValue}
                required={this.props.prop.required ? true : false}>
                {this.props.prop.forceChooseValue ? undefined : <option key={0} value='' />}{this.dropDownOpts()}
            </select>
        );
    }
});

export default DropDown;

