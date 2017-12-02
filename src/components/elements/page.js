// @flow

import React from 'react';
import type { Element } from 'react';

const style = {
    display: 'flex',
    padding: 40,
    flexDirection: 'column',
};

class Page extends React.Component<*, *> {
    render(): Element<*> {
        return (
            <div style={style}>
                {this.props.header && <h2>{this.props.header}</h2>}
                {this.props.children}
            </div>
        );
    }
}

export {
    Page as default, Page,
};
