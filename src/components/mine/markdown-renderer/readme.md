## TLDR

Use the server component one.

## Note

- This component is not split into two parts (client and server component).
- This component has two separated and isolated components:
    - one is a client component that convert markdown to html (on the browser) then render it.
      It is slowest to render compared to the server component one, and need libraries in the client bundle.
    - one is a server component that convert markdown to html (on the server) then render it.
      It is fast to render compared to the client component one, and does not need libraries in the client bundle.

