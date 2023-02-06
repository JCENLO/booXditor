


import Default from "./components/Default";
import TextDefault from "./components/TextDefault";

import Header, { HeaderBlock } from "./components/typography/Header";
import Paragraph, { ParagraphBlock } from "./components/typography/Paragraph";



import Text, { TextBlock } from "./components/base/Text";
import Link, { LinkBlock } from "./components/base/Link";
import Image, {ImageBlock} from "./components/base/Image";
import Video, {VideoBlock} from "./components/video/Video";
import Embed from "./components/video/Embed";

import Container, { ContainerBlock } from "./components/layout/Container";
import Row, { RowBlock } from "./components/layout/Row";
import Column, { ColumnBlock } from "./components/layout/Column";
import ColumnBreak, { ColumnBreakBlock } from "./components/layout/ColumnBreak";
import MediaObject, { MediaObjectBlock } from "./components/layout/MediaObject";

import Alert, { AlertBlock } from "./components/bootstrapComponents/Alert";
import TabsNavigation, { TabsBlock } from "./components/bootstrapComponents/tabs/TabsNavigation";
import TabsPanes from "./components/bootstrapComponents/tabs/TabsPanes"; 
import Tab from "./components/bootstrapComponents/tabs/Tab";
import TabPane from "./components/bootstrapComponents/tabs/TabPane";// TODO: check traits
import Badge, { BadgeBlock } from "./components/bootstrapComponents/Badge";
import Card, { CardBlock } from "./components/bootstrapComponents/Card";
import Collapse, { CollapseBlock } from "./components/bootstrapComponents/Collapse"; //TODO
import Dropdown, { DropDownBlock } from "./components/bootstrapComponents/Dropdown";



import Form, { FormBlock } from "./components/forms/Form";
import Input, { InputBlock } from "./components/forms/Input";
import FileInput, { FileInputBlock } from "./components/forms/FileInput";

import InputGroup, { InputGroupBlock } from "./components/forms/InputGroup";
import Textarea, { TextareaBlock } from "./components/forms/Textarea";
import Select, { SelectBlock } from "./components/forms/Select"; //TODO
import Checkbox, { CheckboxBlock } from "./components/forms/Checkbox";
import Radio, { RadioBlock } from "./components/forms/Radio";
import Label, { LabelBlock } from "./components/forms/Label";
import Button, { ButtonBlock } from "./components/forms/Button";
import ButtonGroup, { ButtonGroupBlock } from "./components/forms/ButtonGroup";
import ButtonToolbar, { ButtonToolbarBlock } from "./components/forms/ButtonToolbar";



export default (editor, config = {}) => {
    
    const c = config;
    const domc = editor.DomComponents;
    const blocks = c.blocks;
    const bm = editor.BlockManager;
    const cats = c.blockCategories;

    const traits = {
        id: {
            name: "id",
            label: c.labels.trait_id,
        },
        for: {
            name: "for",
            label: c.labels.trait_for,
        },
        name: {
            name: "name",
            label: c.labels.trait_name,
        },
        placeholder: {
            name: "placeholder",
            label: c.labels.trait_placeholder,
        },
        value: {
            name: "value",
            label: c.labels.trait_value,
        },
        required: {
            type: "checkbox",
            name: "required",
            label: c.labels.trait_required,
        },
        checked: {
            label: c.labels.trait_checked,
            type: "checkbox",
            name: "checked",
            changeProp: 1,
        },
    };

    TextDefault(domc, traits);

    // TYPOGRAPHY
    if (cats.typography) {
        if (blocks.header) {
            HeaderBlock(bm, c.labels.header);
            Header(domc);
        }
        if (blocks.paragraph) {
            ParagraphBlock(bm, c.labels.paragraph);
            Paragraph(domc);
        }
    }



    if (cats.media) {
      if (blocks.image) {
        ImageBlock(bm, c.labels.image);
        Image(domc);
      }

      if (blocks.video) {
        Embed(domc);
        VideoBlock(bm, c.labels.video);
        Video(domc);
      }
    }

    // Rebuild the default component and add utility settings to it (border, bg, color, etc)
    if (cats.basic) {
        if (blocks.default) {
            Default(domc);
        }



        // // Rebuild the text component and add display utility setting
        if (blocks.text) {
            TextBlock(bm, c.labels.text);
            Text(domc);
            
        }

        // // Rebuild the link component with settings for collapse-control
        if (blocks.link) {
            LinkBlock(bm, c.labels.link);
            Link(editor, domc);
        }

        // Basic
        // if (blocks.list) {
        //   ListBlock(bm, c.labels.list)
        //   List(domc);
        // }

        /*if (blocks.description_list) {
    }*/
    }

    // LAYOUT
    if (cats.layout) {
        if (blocks.container) {
            ContainerBlock(bm, c.labels.container);
            Container(domc);
        }
        if (blocks.row) {
            RowBlock(bm, c.labels.row);
            Row(domc);
        }
        if (blocks.column) {
            ColumnBlock(bm, c.labels.column);
            Column(domc, editor);

            ColumnBreakBlock(bm, c.labels.column_break);
            ColumnBreak(domc);
        }
        // Media object
        if (blocks.media_object) {
            MediaObjectBlock(bm, c.labels.media_object);
            MediaObject(domc);
        }
    }

    // Bootstrap COMPONENTS
    if (cats.components) {
        // Alert
        if (blocks.alert) {
            AlertBlock(bm, c.labels.alert);
            Alert(domc);
        }

        if (blocks.tabs) {
            TabsBlock(bm, c);
            TabsNavigation(domc, config);
            Tab(domc, config);
            TabsPanes(domc, config);
            TabPane(domc, config);
        }

        // Badge
        if (blocks.badge) {
            BadgeBlock(bm, c.labels.badge);
            Badge(domc);
        }

        // Card
        if (blocks.card) {
            CardBlock(bm, c);
            Card(domc, editor);
        }

        // Collapse
        if (blocks.collapse) {
            CollapseBlock(bm, c.labels.collapse);
            Collapse(editor);
        }

        // Dropdown
        if (blocks.dropdown) {
            DropDownBlock(bm, c.labels.dropdown);
            Dropdown(editor);
        }
    }


    if (cats.forms) {
        if (blocks.form) {
            FormBlock(bm, c.labels.form);
            Form(domc, traits, config);
        }

        if (blocks.input) {
            InputBlock(bm, c.labels.input);
            Input(domc, traits, config);

            FileInputBlock(bm, c.labels.file_input);
            FileInput(domc, traits, config);
        }

        if (blocks.form_group_input) {
            InputGroupBlock(bm, c.labels.form_group_input);
            InputGroup(domc, traits, config);
        }

        if (blocks.textarea) {
            TextareaBlock(bm, c.labels.textarea);
            Textarea(domc, traits, config);
        }

        if (blocks.select) {
            SelectBlock(bm, c.labels.select);
            Select(editor, domc, traits, config);
        }

        if (blocks.checkbox) {
            CheckboxBlock(bm, c.labels.checkbox);
            Checkbox(domc, traits, config);
        }

        if (blocks.radio) {
            RadioBlock(bm, c.labels.radio);
            Radio(domc, traits, config);
        }

        if (blocks.label) {
            LabelBlock(bm, c.labels.label);
            Label(domc, traits, config);
        }

        if (blocks.button) {
            ButtonBlock(bm, c.labels.button);
            Button(domc);
        }

        if (blocks.button_group) {
            ButtonGroupBlock(bm, c.labels.button_group);
            ButtonGroup(domc);
        }

        if (blocks.button_toolbar) {
            ButtonToolbarBlock(bm, c.labels.button_toolbar, c);
            ButtonToolbar(domc);
        }
    }

// editor.on(`component:create`, model => console.log('Global hook: component:create', model.get('type')));
// editor.on(`component:mount`, model => console.log('Global hook: component:mount', model.get('type')));
// editor.on(`component:update:testprop`, model => console.log('Global hook: component:update:testprop', model.get('type')));
// editor.on(`component:remove`, model => console.log('Global hook: component:remove', model.get('type')));
};
