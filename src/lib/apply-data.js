import assign from 'object-assign';
import { parseDOM as parse } from 'htmlparser2';
import { selectAll, selectOne } from 'css-select';
import serialize from 'dom-serializer';

export default function applyData(source, data) {
    const dom = parse(source, { xmlMode: true });
    const svg = dom ? selectOne('svg', dom) : null;

    if (!svg) {
        throw Error('Invalid loaded xml format');
    }

    data = data || {};
    const root = data.root || {};
    const selectors = data.selectors || {};

    assign(svg.attribs, root);

    Object.keys(selectors).forEach(selector => {
        const attribs = selectors[selector];
        const elements = selectAll(selector, svg);

        elements.forEach(element => {
            assign(element.attribs, attribs);
        });
    });

    return serialize(dom);
}