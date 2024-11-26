export function notFound() {
  return new Response(null, { status: 404 });
}

export function notAuthorized() {
  return new Response(null, { status: 401 });
}
