import contexts from '../bootstrap-contexts';
import {capitalize} from "../utils";

export default (domc) => {
    const contexts_w_white = contexts.concat(['white']);
    const defaultType = domc.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    domc.addType('default', {
        // extend: 'default',
        model: {

            defaults:{
                ...defaultModel.prototype.defaults,
                tagName: 'div',
                traits: [
                    {
                        type: 'class_select',
                        options: [
                            {value: '', name: 'Default'},
                            {value: 'd-none', name: 'None'},
                            {value: 'd-inline', name: 'Inline'},
                            {value: 'd-inline-block', name: 'Inline-block'},
                            {value: 'd-block', name: 'Block'},
                            {value: 'd-grid', name: 'Grid'},
                            {value: 'd-table', name: 'Table'},
                            {value: 'd-table-cell', name: 'table-cell'},
                            {value: 'd-table-row', name: 'table-row'},
                            {value: 'd-flex', name: 'flex'},
                            {value: 'd-inline-flex', name: 'inline-flex'},
                        ],
                        label: 'Display'
                    },

                    {
                        type: 'class_select',
                        options: [
                            {value: '', name: 'Default'},
                            ... contexts_w_white.map(function(v) { return {value: 'text-'+v, name: capitalize(v)} })
                        ],
                        label: 'Text color'
                    },
                    {
                        type: 'class_select',
                        options: [
                            {value: '', name: 'Default'},
                            ... contexts_w_white.map(function(v) { return {value: 'bg-'+v, name: capitalize(v)} })
                        ],
                        label: 'Background color'
                    },
                    {
                        type: 'class_select',
                        options: [
                            {value: '', name: 'Default'},
                            {value: 'border', name: 'Full'},
                            {value: 'border-top', name: 'Top'},
                            {value: 'border-end', name: 'End'},
                            {value: 'border-bottom', name: 'Bottom'},
                            {value: 'border-start', name: 'Start'},
                            {value: 'border', name: 'All'}
                        ],
                        label: 'Border width'
                    },
                    {
                        type: 'class_select',
                        options: [
                            {value: '', name: 'Default'},
                            ... contexts_w_white.map(function(v) { return {value: 'border border-'+v, name: capitalize(v)} })
                        ],
                        label: 'Border color'
                    },
                    {
                        type: 'class_select',
                        options: [
                            {value: '', name: 'Default'},
                            {value: 'rounded', name: 'Rounded'},
                            {value: 'rounded-top', name: 'Rounded top'},
                            {value: 'rounded-end', name: 'Rounded end'},
                            {value: 'rounded-bottom', name: 'Rounded bottom'},
                            {value: 'rounded-start', name: 'Rounded start'},
                            {value: 'rounded-circle', name: 'Circle'},
                            {value: 'rounded-pill', name: 'Pill'},
                            {value: 'rounded-0', name: 'Square'},
                        ],
                        label: 'Border radius'
                    },
                    {
                        type: 'text',
                        label: 'ID',
                        name: 'id',
                        placeholder: 'my_element'
                    },
                    {
                        type: 'text',
                        label: 'Title',
                        name: 'title',
                        placeholder: 'My Element'
                    }
                ] 
                // .concat(defaultModel.prototype.defaults.traits)
            },
            init() {
                const classes = this.get('classes');
                classes.bind('add', this.classesChanged.bind(this));
                classes.bind('change', this.classesChanged.bind(this));
                classes.bind('remove', this.classesChanged.bind(this));
                this.init2();
            },
            /* BS comps use init2, not init */
            init2() {},
            /* method where we can check if we should changeType */
            classesChanged() {},
            /* replace the comp with a copy of a different type */
            changeType(new_type) {
                const coll = this.collection;
                const at = coll.indexOf(this);
                const button_opts = {
                    type: new_type,
                    style: this.getStyle(),
                    attributes: this.getAttributes(),
                    content: this.view.el.innerHTML
                }
                coll.remove(this);
                coll.add(button_opts, { at });
                this.destroy();
            }
        },
        view: defaultView
    });
}

// // Global hooks
// editor.on(`component:create`, model => console.log('Global hook: component:create', model.get('type')));
// editor.on(`component:mount`, model => console.log('Global hook: component:mount', model.get('type')));
// editor.on(`component:update:testprop`, model => console.log('Global hook: component:update:testprop', model.get('type')));
// editor.on(`component:remove`, model => console.log('Global hook: component:remove', model.get('type')));