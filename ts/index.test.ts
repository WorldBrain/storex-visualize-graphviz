import * as expect from 'expect'
import { createTestStorageManager } from '@worldbrain/storex/lib/index.tests'
import { renderRegistryAsDot } from '.';

const EXPECTED_DOT_FILE = `
digraph {
    graph [pad="0.5", nodesep="0.5", ranksep="2"];
    node [shape=plain]
    rankdir=LR;

    
    user [label=<
<table border="0" cellborder="1" cellspacing="0">
    <tr><td port="NAME"><i>user</i></td></tr>
    <tr><td port="identifier">identifier</td></tr>
    <tr><td port="passwordHash">passwordHash</td></tr>
    <tr><td port="isActive">isActive</td></tr>
    <tr><td port="id">id</td></tr>
</table>>];

userEmail [label=<
<table border="0" cellborder="1" cellspacing="0">
    <tr><td port="NAME"><i>userEmail</i></td></tr>
    <tr><td port="email">email</td></tr>
    <tr><td port="isVerified">isVerified</td></tr>
    <tr><td port="isPrimary">isPrimary</td></tr>
    <tr><td port="id">id</td></tr>
    <tr><td port="userRel">userRel</td></tr>
</table>>];

userEmailVerificationCode [label=<
<table border="0" cellborder="1" cellspacing="0">
    <tr><td port="NAME"><i>userEmailVerificationCode</i></td></tr>
    <tr><td port="code">code</td></tr>
    <tr><td port="expiry">expiry</td></tr>
    <tr><td port="id">id</td></tr>
    <tr><td port="userEmailRel">userEmailRel</td></tr>
</table>>];

newsletter [label=<
<table border="0" cellborder="1" cellspacing="0">
    <tr><td port="NAME"><i>newsletter</i></td></tr>
    <tr><td port="name">name</td></tr>
    <tr><td port="id">id</td></tr>
</table>>];

newsletterSubscription [label=<
<table border="0" cellborder="1" cellspacing="0">
    <tr><td port="NAME"><i>newsletterSubscription</i></td></tr>
    <tr><td port="id">id</td></tr>
    <tr><td port="userRel">userRel</td></tr>
    <tr><td port="newsletterRel">newsletterRel</td></tr>
</table>>];


    user:NAME -> userEmail:userRel;

userEmail:NAME -> userEmailVerificationCode:userEmailRel;

user:NAME -> newsletterSubscription:userRel;
newsletter:NAME -> newsletterSubscription:newsletterRel;
}
`.trim()

describe('Storex Graphviz visualization', () => {
    it('should work', async () => {
        const storageManager = await createTestStorageManager({
            configure: () => null
        } as any)

        expect(renderRegistryAsDot(storageManager.registry)).toEqual(EXPECTED_DOT_FILE)
    })
})
