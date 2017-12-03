import React from 'react';
import ReactDOM from 'react-dom';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './app';

Enzyme.configure({ adapter: new Adapter() });

it('App renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    const wrapper = mount(<App />);
    expect(wrapper).toBeDefined();
});
