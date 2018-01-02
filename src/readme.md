# Problem no.1: Dealing with the context

Currently, we pass the context (user + db transaction) as the first argument
of many functions and methods. We call it `utx`.

This sucks because:

* You CAN'T execute a method outside of a transaction, or anonymously. You MUST
  pass `utx`. This leads to weird workarounds where there's simply no authenticated
  user around.
* It's hard to chain "RPC methods" with service methods, because the former
  don't accept `utx` as an argument, while the latter do.
* You have to import `withUTX` whenever you want to use a service

# Problem no.2: Mocking an imported service

`DocumentStore` imports the Files service, the Emails service etc.  Or `Roles` service talks to Auth. But:

1. while testing we don't want to send real emails
2. when testing, we want to mock the internal API of Auth
3. in development, we want to use a mock service, while in production, we want the real thing

We currently solve 1. with conditionals (`if (env == 'production')`) in the initialization,
and 2. can be solved by overriding `require` with a library and injecting the fake service.

# Problem no.3: Exposing the class to the outside (via RPC)

We do this by creating a brand new RPC method for every class method of interest. Most
of the time, it's just a simple proxy function call (input and output aren't reshaped inside
the RPC method.)

This is tiring. Sometimes it takes more time to write the boilerplate code than to write
the service itself.

# Problem no.4: Declaring per-app tables and migrations

Even if each service defines its own tables and migrations, it's still weird how we merge
the definitions and migrations together. There's a single file in which we import all migrations
and db definitions, then we merge by hand.

We need a better mechanism for the service to say: "hi App, I exist, please to this and this
to the database so I can function properly. Oh, and expose this method and that one."

...