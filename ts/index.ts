import { StorageRegistry, CollectionDefinition, isChildOfRelationship, isConnectsRelationship } from "@worldbrain/storex";

const GRAPH_HEADER = `
    graph [pad="0.5", nodesep="0.5", ranksep="2"];
    node [shape=plain]
    rankdir=LR;
`.trim()

export function renderRegistryAsDot(registry : StorageRegistry) {
    const renderedCollections = Object.values(registry.collections).map(renderCollectionAsDot).join('\n\n')
    const renderedRelationships = Object.values(registry.collections).map(renderCollectionRelationships).filter(rendered => rendered.length).join('\n\n')

    return `
digraph {
    ${GRAPH_HEADER}

    
    ${renderedCollections}


    ${renderedRelationships}
}`.trim()
}

export function renderCollectionAsDot(collection : CollectionDefinition) {
    return renderDotTable(collection.name, collection.name, Object.keys(collection.fields).map(name => [name, name] as [string, string]))
}

export function renderCollectionRelationships(collection : CollectionDefinition) {
    if (!Object.keys(collection.relationships).length) {
        return ''
    }

    return collection.relationships.map(relationship => {
        if (isChildOfRelationship(relationship)) {
            return `${relationship.targetCollection}:NAME -> ${collection.name}:${relationship.fieldName};`
        } else if (isConnectsRelationship(relationship)) {
            return (
                `${relationship.connects[0]}:NAME -> ${collection.name}:${relationship.fieldNames[0]};\n` +
                `${relationship.connects[1]}:NAME -> ${collection.name}:${relationship.fieldNames[1]};`
            )
        }
    }).join('\n')
}

export function renderDotTable(id: string, label : string, rows : [string, string][]) {
    return `${id} [label=<
<table border="0" cellborder="1" cellspacing="0">
    <tr><td port="NAME"><i>${label}</i></td></tr>
    ${rows.map(([rowId, rowLabel]) => `<tr><td port="${rowId}">${rowLabel}</td></tr>`).join('\n    ')}
</table>>];`.trim()
}
