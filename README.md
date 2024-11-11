# Yet Another Programming Community

Share your new side project or publish posts.

Built with a series of "in-house" technologies that I maintain:

- natmfat: closed course design system
- [shitgen](https://github.com/natmfat/shitgen): a shit PostgreSQL type generator
- [remix-endpoint](https://github.com/natmfat/remix-endpoint): validate Remix forms

## Development

Run the Remix development server.

```bash
pnpm run dev
```

Generate database client and types.

```bash
pnpm run db:generate
```

Push database schema and seed with some initial data.

```bash
pnpm run db:seed
```
