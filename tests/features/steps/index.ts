import { expect, request } from '@playwright/test';
import { Given, When, Then } from './fixtures.js';

const wireMockContext = await request.newContext({
    baseURL: 'http://localhost:8080',
});

const resetMock = async () => {
    const resp = await wireMockContext.delete('/__admin/requests');
    expect(resp.ok()).toBeTruthy();
}

Given('User exists', async ({ }) => {
    await resetMock();
});


When('\\/greet API is called with existing user id in body', async ({}) => {
   
    const context = await request.newContext({
        baseURL: 'http://localhost:3000',
    });

    const resp = await context.post('/greet', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        data: {
            slackUserID: 1
        }
    });
    expect(resp.ok()).toBeTruthy();

  });

Then('Slack API is called to post message for user', async ({ }) => {
    const resp = await wireMockContext.post('/__admin/requests/count', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        data: {
            method: "POST",
            url: "/api/messages",
            bodyPatterns: [
                { matchesJsonPath: "$[?(@.userId == '1')]" }
            ]
        }
    });
    const respBody = await resp.json()
    expect(respBody.count).toEqual(1);
});

Given('User does not exist', async ({ }) => {
    await resetMock();
});

When('\\/greet API is called with not existing user id in body', async ({}) => {
    const context = await request.newContext({
        baseURL: 'http://localhost:3000',
    });

    const resp = await context.post('/greet', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        data: {
            slackUserID: 15
        }
    });
    expect(resp.status()).toBe(404);
  });

Then('{int} is returned and Slack is not called', async ({ }, arg: number) => {
    const resp = await wireMockContext.post('/__admin/requests/count', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        data: {
            method: "POST",
            url: "/api/messages",
            bodyPatterns: [
                { matchesJsonPath: "$[?(@.userId == '15')]" }
            ]
        }
    });
    const respBody = await resp.json()
    expect(respBody.count).toEqual(0);
});

  