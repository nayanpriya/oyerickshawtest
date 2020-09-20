import React from 'react';
import * as styles from './index.css'

export default class Button extends React.Component {
    render() {
        const {
            onClick,
            className,
            name,
        } = this.props;

        return (
            <button
                onClick={onClick}
                className={className}
                type="button"
            >
                {this.props.name}
            </button>
        );
    }
}


