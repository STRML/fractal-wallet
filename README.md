# Fractal **POC** Data Wallet - Extension

A proof of concept data wallet browser extension using the [Kilt Protocol][kilt].

This project was bootstrapped with [Create React Extension](https://github.com/VasilyShelkov/create-react-extension).

Highlights:

- chrome only
- creates and stores a KILT identity
- stores arbitrary data entered by the user (key/value text pairs)
- allows the user to delete data
- stores credentials and shows their status (are they ledgered on KILT?)
- allows the user to delete credentials
- reacts to data sharing requests from Attester website (`accept` || `reject` || `ignore`)
- reacts to credential storage requests from Attester website (`accept` || `reject` || `ignore`)
- reacts to credential sharing requests from Publisher website (`accept` || `reject` || `ignore`)
- selective disclosure using zero knowledge proofs

**Table of Contents**

- [Setup](#setup)
- [Development](#development)
- [Deployment](#deployment)
- [Structure](#structure)
- [State Management](#state-management)
- [Fractal SDK](#fractal-sdk)
- [Communication](#communication)
- [Navigation](#navigation)
- [Sandbox](#sandbox)
- [Notes](#notes)

## Setup

To setup the project you need to follow these instructions:

- Clone or download this repository:

```sh
$ git clone git@github.com:subvisual/fractal-poc.git
```

- Go to the wallet project directory:
```sh
$ cd wallet
```

- Run the setup steps:

```sh
$ ./bin/setup
```

- Copy [`.env.example`](https://github.com/subvisual/fractal-poc/blob/master/wallet/.env.example) to `.env` and fill in the required secret values, eg:

```sh
$ cp .env.example .env
```

## Development

To start the development server, run:

```sh
$ ./bin/server
```

The page will automatically reload if you make changes to the code.
You will see the build errors and lint warnings in the console.

To build the assets only once, not watching for changes, run:

```sh
$ yarn build
```

## Deployment

To load an extension to Google Chrome you need to follow these instructions:

- Build an unpacked extension:

```sh
$ yarn build # or yarn dev
```

- Open your browser extensions page ([chrome://extensions](chrome://extensions)):

```
... -> More Tools -> Extensions
```

- Make sure you have developer mode **ON** so you can load an unpacked extension

- Click on **Load unpacked** and select the unpacked extension folder.

## Structure

The project's structure is the following:

```sh
.
├── bin
├── config
├── public
├── scripts
└── src
    ├── assets
    ├── index.js
    ├── models
    ├── options
    ├── popup
    ├── redux
    ├── scripts
    └── services
```

##### [`bin`](https://github.com/subvisual/fractal-poc/blob/master/wallet/bin)

Based on this [blog post](https://subvisual.com/blog/posts/unsucking-your-project-onboarding), this folder contains a set of scripts that aim to "smoothify" the onboarding of a new element to the project by wrapping all-important commands into a shell script.

In this particular project, we have two important scripts:

- [`bin/setup`](https://github.com/subvisual/fractal-poc/blob/master/wallet/bin/setup) - setups the project by installing all dependencies.
- [`bin/server`](https://github.com/subvisual/fractal-poc/blob/master/wallet/bin/server) - starts the development server.

##### [`config`](https://github.com/subvisual/fractal-poc/blob/master/wallet/config)

Webpack configuration files.

##### [`public`](https://github.com/subvisual/fractal-poc/blob/master/wallet/public)

Static files, such as the `*.html` files, the [`manifest.json`](https://github.com/subvisual/fractal-poc/blob/master/wallet/public/manifest.json), etc.

##### [`scripts`](https://github.com/subvisual/fractal-poc/blob/master/wallet/scripts)

Scripts to build, start and test the project's code.

##### [`src/assets`](https://github.com/subvisual/fractal-poc/blob/master/wallet/src/assets)

Assets folder.

##### [`src/index.js`](https://github.com/subvisual/fractal-poc/blob/master/wallet/src/index.js)

Project's entry file.

##### [`src/models`](https://github.com/subvisual/fractal-poc/blob/master/wallet/src/models)

Model classes used in this project.

##### [`src/options`](https://github.com/subvisual/fractal-poc/blob/master/wallet/src/options)

Files loaded by the extension's **options** page.

##### [`src/popup`](https://github.com/subvisual/fractal-poc/blob/master/wallet/src/popup)

Files loaded by the extension's **popup** page.

##### [`src/scripts`](https://github.com/subvisual/fractal-poc/blob/master/wallet/src/scripts)

Script files used by the extension, such as the **background script**, the **content script** and the **fractal sdk script**.

##### [`src/services`](https://github.com/subvisual/fractal-poc/blob/master/wallet/src/services)

Services used on this project, such as:

- [**Kilt Protocol Service**](https://github.com/subvisual/fractal-poc/blob/master/wallet/src/services/kilt.js) - an abstraction for the [`@kiltprotocol/sdk-js`](https://github.com/KILTprotocol/sdk-js) calls.
- [**Storage Service**](https://github.com/subvisual/fractal-poc/blob/master/wallet/src/services/storage.js) - an abstraction for storing key/value objects using the [Chrome extension storage API](https://developer.chrome.com/docs/extensions/reference/storage/).

## State Management

To maintain state consistency through all the extension's components, background script, content script and popup page, we are using an external dependency called [`webext-redux`][webext-redux].

This package enables the extension to work like a redux-powered web app. All redux store is centralized on the background script page in a way that this component becomes the single source of truth, i.e, it is the only one who has direct access to the store state and can mutate it. Under the hood this dependency wraps the redux state object and proxies all comunications to the background through the [Chrome extension messaging API](https://developer.chrome.com/docs/extensions/mv3/messaging/).

In the following diagram it's described how the components communication and interaction is made:

<p align="center">
 <img src="../docs/webext_diagram.png" width="30%">
</p>

On load the popup needs to wait for the background script to be ready to receive messages, so he sends him a message and waits for the reply to continue. Then he can start asking the background script for the store state or start dispatching actions to mutate it. Every action dispatched by the components is proxied to the background, which will soon handle it and broadcast the new state back to the components.

This architecture allows us not only to off-load computation work to the background script but also to have a centralized source of truth that can be shared through all extension's UI components.

For state persistence, we decided to use [Chrome extension storage API](https://developer.chrome.com/docs/extensions/reference/storage/), which will store the data on a Google server and automatically sync to any Chrome browser that the user is logged into.

## Navigation

For performing navigation between the extension's different pages, we decided to use [react-router](https://github.com/ReactTraining/react-router). This package offers a collection of navigational components that can be used to define bookmarkable URLs in a declarative way.

For the popup page, the routes are defined at the [`src/popup/app/index.js`](https://github.com/subvisual/fractal-poc/blob/master/wallet/src/popup/app/index.js) file, where it's possible to find a set of routes being mapped to the respective view components. These view components are defined in the [`src/popup/views`](https://github.com/subvisual/fractal-poc/blob/master/wallet/src/popup/views) folder.

## Fractal SDK

The `Attester` and `Publisher` webpages need to interact with the background script in order to register all kinds of requests, check if the extension is available on the browser, get the claimer public identity, etc.

In order to abstract this communication, we created an SDK that the content script will inject into the running page's window object. This SDK consists on a `Fractal` object with an `Attester` and `Publisher` objects, each one with a set of methods that will be called on each page and will be proxied by the content script to the background script to be handled.

There are 3 methods to highlight in this SDK. Before explaining them we should clarify one important privacy aspect. Every data sharing, credential storage or credential sharing requests to the wallet require the user to explicitly accept or decline it, or simply ignore this request which will result in a time out.

The way we do this is on every call to the methods `requestAttestation`, `broadcastCredential` and `requestCredential` a request with this information is stored and presented to the user so he can decide what to do with it. Until his decision, the call will be pending and only then it will resume. If no decision is made in a 30 seconds interval, the call will end up throwing a time out error.

We will explain now in detail every one of these methods:

---

```ts
Attester.requestAttestation(ctype: CType, target: Identity)
```
Receives a CType JSON object and the target's public identity, builds a request for attestation message and encrypts it with the target's public key.

---

```ts
Attester.broadcastCredential(message: EncryptedMessage, target: Identity)
```
Receives an encrypted message with a credential and the target's public identity, decrypts the message with the wallet's public key and stores the credential in the wallet alongside the target's public identity.

---

```ts
Publisher.requestCredential(message: EncryptedMessage, target: Identity)
```
Receives an encrypted message with a CType hash and the target's public identity, decrypts the message with the wallet's public key, finds the desired credential, builds a credential presentation message and encrypts it with the target's public key.

---


## Communication

Before understanding how the extension communicates, it's importante to read
these articles on the structure of a Chrome extension:

- [Architecture Overview](https://developer.chrome.com/docs/extensions/mv3/architecture-overview/)
- [Content Scripts](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)
- [Message Passing](https://developer.chrome.com/docs/extensions/mv3/messaging/)
- [Background Scripts](https://developer.chrome.com/docs/extensions/mv3/background_pages/)

Once you've gotten the gist of how the different extension components interact,
you should be able to understand how the communications within the extension are
defined. Essentially you have three components that must be able to pass
messages between themselves:

- **Inpage Script** - injected into the page, containing the SDK functions
  available to the attester and the publisher. Can only communicate with the
  content script.
- **Content Script** - capable of communicating with both the inpage script and
  the background worker. Mostly acts as a proxy between both.
- **Background worker** - capable of communcating with the content script and
  the React app.

With these pieces in mind, four communication classes were added:

- **Extension Connection** - Abstraction used by the inpage to communicate with
  the extension - more concretely with the content script.
- **Background Connection** - Chrome port used by the content script to
  communicate with the background worker.
- **Inpage Connection** - The other end of `ExtensionConnection`. Abstraction
  via `LocalMessageDuplexStream` for the content script to communicate with
  the inpage script.
- **ContentScript Connection** - The other end of `BackgroundConnection`. Chrome
  port used by the background worker to communicate with the content script.

## Sandbox

In this section, we explain **why** we need to use sandboxing and **how** to implement it.

### Why

Chrome's extension system enforces a default [Content Security Policy (CSP)][CSP]. Briefly, the policy restrictions are:
- script must be moved out-of-line into separate JavaScript files.
- inline event handlers must be converted to use addEventListener.
- `eval()` and eval-like constructs such as `new Function()` are disabled.

The problem for us came with the last restriction for two different scenarios:

#### **JSON Schema Validations**

The [`@kiltprotocol/sdk-js`][@kiltprotocol/sdk-js] package uses an external dependency called [`AJV`][ajv] to validate JSON Schemas. This is used when building CTypes and Claims classes from JSON objects. Internally [`AJV`][ajv] uses a `new Function()` constructor to take the JSON schema and compile a function at "run-time" to validate the schema.

The temporary solution that we found to work around this problem was to create a [`src/popup/models/Kilt/UnsafeClaim.ts`](https://github.com/subvisual/fractal-poc/blob/master/wallet/src/models/Kilt/UnsafeClaim.ts) and [`src/popup/models/Kilt/UnsafeCType.ts`](https://github.com/subvisual/fractal-poc/blob/master/wallet/src/models/Kilt/UnsafeClaim.ts) files that skip this schema check and return class that extends the intended `Claim` and `CType` classes.

#### **WebAssembly.compile(): Wasm code generation disallowed by embedder**

As it's possible to see in this [link](https://wiki.polkadot.network/docs/en/learn-wasm) WebAssembly is used in Polkadot and Substrate as the compilation target for the runtime. This raises a problem because Chrome requires `script-src: 'unsafe-eval'` [CSP][CSP] directive be active for WebAssembly compilation and Chrome Extensions default [CSP][CSP] restrictions do not allow `unsafe-eval`.

One solution could be lifting this restriction but Google strongly recommends against doing this because eval functions are notorious XSS attack vectors.

Not all are bad news, at least for now, because as it's described in this [link](https://polkadot.js.org/docs/util-crypto/FAQ/#i-am-having-trouble-initializing-the-wasm-interface), the `@polkadot/util-crypto` libraries have JS fallbacks in place for most operations, which makes this a non-critical issue as long as we can depend on these JS fallbacks.

### How

The perfect solution for the two problems described above is to move all [`@kiltprotocol/sdk-js`][@kiltprotocol/sdk-js] calls to a [sandbox environment](https://developer.chrome.com/docs/extensions/mv3/sandboxingEval).

We already have a [PR](https://github.com/subvisual/fractal-poc/pull/45) where it possible to see how to achieve this.
Briefly, we add an `iframe` with the sandbox page to the [`public/popup.html`](https://github.com/subvisual/fractal-poc/blob/master/wallet/public/popup.html) file and create a connection between this page and the background script. Whenever the background needs to run a kilt service call that needs to be sandboxed, he sends the sandbox page a call message and waits for it to execute and return the result.

## Notes

### Storing data on a chrome server may result in data breaches

Since the chrome storage area isn't encrypted, confidential user information should not be stored in plaintext. This can be easily fixed using a secure password-based encryption algorithm, where a user will need to insert his password every time he opens the browser.

[kilt]: https://kilt.io
[@kiltprotocol/sdk-js]: https://github.com/KILTprotocol/sdk-js
[ajv]: https://github.com/KILTprotocol/sdk-js
[webext-redux]: https://github.com/tshaddix/webext-redux
[CSP]: https://developers.google.com/web/fundamentals/security/csp
