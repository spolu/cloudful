# cloudful

The vision of cloudful is to provide the basic security and provisioning
infrastructure currently missing to web and mobile applications to
heavily (and hopefully soon entirely) rely on remote APIs. Our goal is
to unleash the power of APIs and *aaS to the point where development
of most applications can be done entirely on the client side. We call
'cloudful' programming such vision of
software design, freed from the requirement of server-side
programming.

Today, it is really difficult to take advantage of raw remote APIs and
services in a web-application: 

 *  If the API is public with low or no authentication other than an
    API key, developers are faced with the 'same-origin' policy issue
    which is a substantial technical barrier.
 *  If the API requires authentication, the previous problem still holds
    and there's generally additional burden left on the developer. In
    the particular and prominent case of OAuth 1.0a, the developer is
    forced to implement rather complicated server-side negotiation
    processes to retrieve their users' access tokens.

Moreover APIs generally require the application provider or
developer to keep a secret safe. Such secret (AWS Secret Access Key,
OAuth 1.0a Consumer Secret, or a simple API Key, ...) impose on the
developers the need for a server (as client-side code is always
accessible or traceable). One of the primary goal of cloudful is
to waive that requirement by providing a trusted third party in charge
of handling authentication negotiation with such remote services.

Oauth 2.0 is one of the few protocols (with its user agent flow) to
provide an escape door to circumvent these problems. The Facebook JS
SDK is a great example of how to provide a transparent way to access a
remote API client-side, authenticated as a user, without any
requirement for server-side code (thanks to OAuth 2.0 and the JS lib
reliance on cross-domain communication techniques)

The goal of cloudful is to generalize this ease of use to OAuth 1.0a,
and other security / authentication schemes by providing when needed a
trusted server to negotiate securely with each services and by
providing to application developers a ready to use library to
abstract and make totally painless any cross-domain communication
requirement.

Additionaly, some APIs are entirely designed to be solely integrated
with backend implementations (think S3 when writing), meaning
generally that they do not provide identities nor granular (user or
group granularity) access control. cloudful should provide the
building blocks necessary to create wrappers around such APIs to
augment them with granular access control so that they can be used
directly from client code without loss of security.

We think that the most important building block missing to
build such wrappers is the notion of identity, which is generally
provided and managed by the middleware running on today's application
servers. 

In that context, we deem important to provide an infrastructure to
uniquely identify devices / browsers and users with an easy to use
identity management interface to automatically store, retrieve and
exploit the tokens and security credentials associated with each API
or remote service security model. cloudful should expose these
identities to the applications client code through its library, but
also to authorized third-parties that would like to provide an
access-control mechanism but do not which to manage identities on
their own. 

_In other words, a user might like to sign in its
applications manually or using Facebook, and maybe later connect its
Twitter identity, but he probably would not appreciate signing up for
each of the DBaaS services on which rely the applications he's using_

These aggregated and reusable identities would obviously be specific
to each application and would flow only to the third-party services
granted by each of them. cloudful can be seen as an identity proxy
with various existing platform identities on one side (represented by
OAuth tokens or other authentification mechanisms) and a reusable
cloudful identity on the other side, available to the client code of
the application itself as well as authorized third parties so they can
provide granular acces control mechanisms around their services
without requiring users to sign-up directly.

The aim of cloudful is therefore to provide a substrate in charge of
identity management and authentication negotiation with remote
services and a client library making it easier for developers to rely
on such remote domain services & APIs.


## Client-Side



## Server-Side



## 3-Way API Setup