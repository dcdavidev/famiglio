/**
 * @fileoverview GitHub Webhook handler for Express.
 *
 * Provides middleware to securely verify and dispatch GitHub webhook events
 * to registered handlers for a given GitHub App.
 */

import fs from 'node:fs';

import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import { App } from '@octokit/app';
import { Webhooks } from '@octokit/webhooks';

import { config } from '@famiglio/core';

/**
 * Creates and returns an Express router configured for GitHub webhook handling.
 *
 * @param {App} appInstance - Initialized GitHub App instance
 * @param {(webhooks: Webhooks) => void} registerHandlers - Callback to register event handlers
 * @returns {express.Router} Express router handling `/webhook` POST requests
 */
export function createWebhookRouter(
  appInstance: App,
  registerHandlers: (webhooks: Webhooks) => void
): express.Router {
  const router = express.Router();
  const webhooks = appInstance.webhooks;

  registerHandlers(webhooks);

  router.post(
    '/',
    express.json({ type: '*/*' }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const signature = req.headers['x-hub-signature-256'];
        if (!signature || typeof signature !== 'string') {
          return res.status(400).send('Missing X-Hub-Signature-256 header');
        }

        await webhooks.verifyAndReceive({
          id: req.headers['x-github-delivery'] as string,
          name: req.headers['x-github-event'] as string,
          payload: req.body,
          signature,
        });

        return res.status(200).send('Webhook received');
      } catch (error) {
        return next(error);
      }
    }
  );

  return router;
}

/**
 * Helper to initialize the GitHub App instance from env/config
 *
 * @returns {App} GitHub App instance
 */
export function initGitHubApp(): App {
  if (!config.github.privateKeyPath) {
    throw new Error('Missing GitHub App private key path in config');
  }

  const privateKey = fs.readFileSync(config.github.privateKeyPath, 'utf8');

  return new App({
    appId: Number(config.github.appId),
    privateKey,
    webhookSecret: config.github.webhookSecret,
  });
}
