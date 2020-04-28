const React = require('react');
const {mount} = require('enzyme');

const {overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const {overrideWebSocket} = require('../mytest-utils-ws');

const {Chat} = require('../../src/client/chat');
const {app} = require('../../src/server/app');

const {setUpDomEnvironment} = require('../jest-setup');

/*
    As for WS we are not using SuperTest directly, we need to start
    the server manually, binding it on an ephemeral port;
 */

let server;
let port;


beforeAll(done => {

    server = app.listen(0, ()=> {
        port = server.address().port;
        setUpDomEnvironment('http://localhost:' + port+"/");
        done();
    });
});

afterAll(done => {
    server && server.close(done);
});


test("Test new messages", async () => {

    overrideFetch(app);
    overrideWebSocket();

    const driver = mount(<Chat/>);

    const msg  = "Hello!";

    const predicate = () => {
        //needed if changed HTML since component was mounted
        driver.update();
        const html = driver.html();
        return html.includes(msg);
    };

    //message shouldn't be there... notice that this means this test will always run up to the timeout
    let displayedMessage;

    displayedMessage = await asyncCheckCondition(predicate, 500, 100);
    expect(displayedMessage).toBe(false);


    //create a new message
    const nameInput = driver.find('#nameInputId').at(0);
    const msgInput = driver.find('#msgInputId').at(0);
    const sendBtn = driver.find('#sendBtnId').at(0);

    nameInput.simulate('change', {target: {value: "foo"}});
    msgInput.simulate('change', {target: {value: msg}});
    sendBtn.simulate('submit');


    //if WS is working correctly, now the message should appear
    displayedMessage = await asyncCheckCondition(predicate, 3000, 100);
    expect(displayedMessage).toBe(true);

    driver.unmount();
});